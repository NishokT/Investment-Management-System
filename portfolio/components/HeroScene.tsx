'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { prefersReducedMotion } from '@/lib/browser';
import { useAccent } from '@/lib/useAccent';

type Pointer = { x: number; y: number };
type Theme = ReturnType<typeof useAccent>;
type HeroSceneProps = { onReady: () => void };

/**
 * The full-screen hero scene: a liquid-metal orb inside a disc of glowing particles,
 * floating in a field of dust. It drifts toward the cursor, ripples harder the faster
 * the cursor moves, sinks slowly as you scroll, and pauses when off screen.
 */
export function HeroScene({ onReady }: HeroSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);
  const theme = useAccent();

  useEffect(() => {
    setReduce(prefersReducedMotion());

    const el = wrapRef.current;
    const hero = el?.closest<HTMLElement>('.hero') ?? null;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (el) observer.observe(el);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5);
    };

    onScroll();
    hero?.addEventListener('pointermove', onMove, { passive: true });
    hero?.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      hero?.removeEventListener('pointermove', onMove);
      hero?.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="hero-canvas" ref={wrapRef}>
      <Canvas
        dpr={[1, 1.75]}
        // Animate only while visible and when motion is allowed; otherwise render still frames
        frameloop={visible && !reduce ? 'always' : 'demand'}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          onReady();
        }}
      >
        <Scene theme={theme} pointer={pointer} scroll={scroll} reduce={reduce} />
      </Canvas>
    </div>
  );
}

type SceneProps = {
  theme: Theme;
  pointer: RefObject<Pointer>;
  scroll: RefObject<number>;
  reduce: boolean;
};

function Scene({ theme, pointer, scroll, reduce }: SceneProps) {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);

  const rig = useRef<THREE.Group>(null);
  const orb = useRef<THREE.Mesh>(null);
  const discRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);
  const moonA = useRef<THREE.Mesh>(null);
  const moonB = useRef<THREE.Mesh>(null);
  const energy = useRef(0);
  const lastPointer = useRef<Pointer>({ x: 0, y: 0 });

  const blob = useMemo(() => createBlob(), []);
  const disc = useMemo(() => createDisc(4200), []);
  const dust = useMemo(() => createDust(1400), []);
  const sprite = useMemo(() => createSprite(), []);

  useEffect(
    () => () => {
      blob.geometry.dispose();
      disc.dispose();
      dust.dispose();
      sprite.dispose();
    },
    [blob, disc, dust, sprite],
  );

  // Recolour the particles whenever the theme colours change
  useEffect(() => {
    paintDisc(disc, theme.accent, theme.secondary, theme.tertiary, theme.dark);
    paintDust(dust, theme.accent, theme.tertiary, theme.dark);
    invalidate();
  }, [disc, dust, theme.accent, theme.secondary, theme.tertiary, theme.dark, invalidate]);

  // Wide screens: the orb sits to the right of the headline. Narrow: centred above it.
  const wide = size.width / Math.max(size.height, 1) > 1.05;
  const radius = wide
    ? Math.min(viewport.height * 0.25, viewport.width * 0.15)
    : Math.min(viewport.width * 0.3, viewport.height * 0.125);
  const target = {
    x: wide ? viewport.width * 0.25 : 0,
    y: wide ? viewport.height * 0.02 : viewport.height * 0.245,
    scale: radius / 1.2,
  };

  useFrame((state, delta) => {
    const t = reduce ? 0 : state.clock.elapsedTime;
    const dt = Math.min(delta, 0.1);
    // With reduced motion the scene renders still frames, so jump straight to the target
    const damp = (current: number, goal: number, lambda: number, step: number) =>
      reduce ? goal : THREE.MathUtils.damp(current, goal, lambda, step);
    const p = pointer.current;
    const s = scroll.current;

    // Fast cursor movement charges up "energy", which makes the surface ripple harder
    const speed = Math.hypot(p.x - lastPointer.current.x, p.y - lastPointer.current.y) / Math.max(dt, 0.001);
    lastPointer.current.x = p.x;
    lastPointer.current.y = p.y;
    energy.current = damp(energy.current, reduce ? 0 : Math.min(speed * 0.12, 1), speed > 0.05 ? 6 : 1.4, dt);
    deformBlob(blob, t, 0.065 + energy.current * 0.09);

    if (rig.current) {
      const r = rig.current;
      r.position.x = damp(r.position.x, target.x + p.x * 0.18, 2.4, dt);
      r.position.y = damp(r.position.y, target.y + p.y * 0.12 - s * viewport.height * 0.28, 3, dt);
      const scale = damp(r.scale.x, target.scale * (1 - s * 0.12), 2.2, dt);
      r.scale.setScalar(scale);
      r.rotation.y = damp(r.rotation.y, p.x * 0.28, 2.5, dt);
      r.rotation.x = damp(r.rotation.x, -p.y * 0.2, 2.5, dt);
      r.rotation.z = damp(r.rotation.z, s * 0.35, 3, dt);
    }
    if (orb.current) {
      orb.current.rotation.y = t * 0.18;
      orb.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (discRef.current) discRef.current.rotation.y = t * 0.06;
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.012;
      dustRef.current.position.x = damp(dustRef.current.position.x, -p.x * 0.35, 2, dt);
      dustRef.current.position.y = damp(dustRef.current.position.y, -p.y * 0.2 + s * 0.6, 2, dt);
    }
    if (moonA.current) {
      const a = t * 0.5 + 1.2;
      moonA.current.position.set(Math.cos(a) * 1.62, 0, Math.sin(a) * 1.62);
    }
    if (moonB.current) {
      const a = -t * 0.22 + 4;
      moonB.current.position.set(Math.cos(a) * 3.35, 0, Math.sin(a) * 3.35);
    }
  });

  return (
    <>
      <StudioEnvironment />
      <directionalLight position={[3, 4, 5]} intensity={0.9} />
      <pointLight color={theme.secondary} intensity={40} distance={24} position={[-3, -1.5, 3]} />
      <pointLight color={theme.accent} intensity={30} distance={24} position={[4, 2.5, 2.5]} />
      <pointLight color={theme.tertiary} intensity={22} distance={24} position={[1, -4, 3]} />

      <points ref={dustRef} geometry={dust}>
        <pointsMaterial
          key={theme.dark ? 'dust-dark' : 'dust-light'}
          map={sprite}
          size={0.06}
          sizeAttenuation
          vertexColors
          transparent
          opacity={theme.dark ? 0.75 : 0.55}
          depthWrite={false}
          blending={theme.dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>

      <group ref={rig} scale={0.001}>
        <mesh ref={orb} geometry={blob.geometry}>
          <meshPhysicalMaterial
            color={theme.accent}
            metalness={0.9}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.05}
            iridescence={0.5}
            iridescenceIOR={1.3}
            envMapIntensity={1.35}
          />
        </mesh>

        {/* A tilted plane holding the particle disc, two fine orbit rings and their moons */}
        <group rotation={[0.42, 0, 0.32]}>
          <points ref={discRef} geometry={disc}>
            <pointsMaterial
              key={theme.dark ? 'disc-dark' : 'disc-light'}
              map={sprite}
              size={0.085}
              sizeAttenuation
              vertexColors
              transparent
              opacity={theme.dark ? 1 : 0.85}
              depthWrite={false}
              blending={theme.dark ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
          </points>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.62, 0.006, 8, 256]} />
            <meshBasicMaterial color={theme.secondary} transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.35, 0.004, 8, 320]} />
            <meshBasicMaterial color={theme.tertiary} transparent opacity={0.4} />
          </mesh>

          <mesh ref={moonA}>
            <sphereGeometry args={[0.07, 24, 24]} />
            <meshStandardMaterial color={theme.secondary} emissive={theme.secondary} emissiveIntensity={1} />
          </mesh>
          <mesh ref={moonB}>
            <sphereGeometry args={[0.1, 24, 24]} />
            <meshStandardMaterial color={theme.tertiary} emissive={theme.tertiary} emissiveIntensity={0.9} />
          </mesh>
        </group>
      </group>
    </>
  );
}

/* ---------- Geometry ---------- */

/** A smooth icosphere, with its original vertex positions kept so it can be deformed each frame. */
function createBlob() {
  let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1.2, 28);
  geometry.deleteAttribute('normal');
  geometry.deleteAttribute('uv');
  geometry = mergeVertices(geometry);
  geometry.computeVertexNormals();
  const base = Float32Array.from(geometry.attributes.position.array);
  return { geometry, base };
}

/** Pushes and pulls the surface with slow overlapping waves, so the orb breathes. */
function deformBlob(blob: ReturnType<typeof createBlob>, t: number, amplitude: number) {
  const position = blob.geometry.attributes.position as THREE.BufferAttribute;
  const base = blob.base;
  for (let i = 0; i < position.count; i++) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const z = base[i * 3 + 2];
    const wave =
      Math.sin(x * 1.8 + t * 0.7) * Math.cos(y * 1.6 - t * 0.55) +
      Math.sin(z * 2.2 - t * 0.8 + y) * 0.5 +
      Math.sin((x + z) * 3.1 + t * 1.3) * 0.18;
    const scale = 1 + wave * amplitude;
    position.setXYZ(i, x * scale, y * scale, z * scale);
  }
  position.needsUpdate = true;
  blob.geometry.computeVertexNormals();
}

/** A thin disc of particles in the XZ plane, denser toward the inner edge, like a planetary ring. */
function createDisc(count: number) {
  const positions = new Float32Array(count * 3);
  const radii = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 1.85 + Math.pow(Math.random(), 1.7) * 1.9;
    const angle = Math.random() * Math.PI * 2;
    const spread = (Math.random() - 0.5) * 0.08 * r;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = spread;
    positions[i * 3 + 2] = Math.sin(angle) * r;
    radii[i] = (r - 1.85) / 1.9;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.userData.radii = radii;
  return geometry;
}

/** Loose dust spread through the whole frame, in front of and behind the orb. */
function createDust(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = -9 + Math.random() * 11;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  return geometry;
}

function paintDisc(geometry: THREE.BufferGeometry, accent: string, secondary: string, tertiary: string, dark: boolean) {
  const colors = geometry.attributes.color as THREE.BufferAttribute;
  const radii = geometry.userData.radii as Float32Array;
  const a = new THREE.Color(accent);
  const b = new THREE.Color(secondary);
  const d = new THREE.Color(tertiary);
  const white = new THREE.Color('#ffffff');
  const c = new THREE.Color();
  for (let i = 0; i < colors.count; i++) {
    // Blue at the inner edge, violet through the middle, mint at the rim
    const r = radii[i];
    if (r < 0.5) c.copy(a).lerp(b, r * 2);
    else c.copy(b).lerp(d, (r - 0.5) * 2);
    if (dark && Math.random() < 0.22) c.lerp(white, 0.65);
    const brightness = (dark ? 0.7 : 0.75) + Math.random() * 0.7;
    colors.setXYZ(i, c.r * brightness, c.g * brightness, c.b * brightness);
  }
  colors.needsUpdate = true;
}

function paintDust(geometry: THREE.BufferGeometry, accent: string, secondary: string, dark: boolean) {
  const colors = geometry.attributes.color as THREE.BufferAttribute;
  const a = new THREE.Color(accent);
  const b = new THREE.Color(secondary);
  const white = new THREE.Color('#ffffff');
  const c = new THREE.Color();
  for (let i = 0; i < colors.count; i++) {
    c.copy(Math.random() < 0.5 ? a : b);
    if (dark) c.lerp(white, 0.35 + Math.random() * 0.4);
    const brightness = (dark ? 0.25 : 0.6) + Math.random() * 0.5;
    colors.setXYZ(i, c.r * brightness, c.g * brightness, c.b * brightness);
  }
  colors.needsUpdate = true;
}

/** A soft round dot used for every particle, drawn once on a small canvas. */
function createSprite() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Soft studio lighting for the metallic reflections. Generated once, then released. */
function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = target.texture;

    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}
