'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { prefersReducedMotion } from '@/lib/browser';
import { useAccent } from '@/lib/useAccent';

type OrbSceneProps = { onReady: () => void };

/**
 * A calm liquid-metal orb with an orbit ring, contained in its tile. It turns slowly,
 * leans toward the cursor only while you hover the tile, and pauses when off screen.
 */
export function OrbScene({ onReady }: OrbSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);
  const { accent, secondary } = useAccent();

  useEffect(() => {
    setReduce(prefersReducedMotion());

    const el = wrapRef.current;
    const tile = el?.closest<HTMLElement>('.tile') ?? null;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (el) observer.observe(el);

    const onMove = (event: PointerEvent) => {
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    tile?.addEventListener('pointermove', onMove, { passive: true });
    tile?.addEventListener('pointerleave', onLeave);

    return () => {
      observer.disconnect();
      tile?.removeEventListener('pointermove', onMove);
      tile?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="orb-canvas" ref={wrapRef}>
      <Canvas
        dpr={[1, 2]}
        // Animate only while visible and when motion is allowed; otherwise render one still frame
        frameloop={visible && !reduce ? 'always' : 'demand'}
        camera={{ position: [0, 0, 7], fov: 38 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        onCreated={() => onReady()}
      >
        <OrbModel color={accent} secondary={secondary} pointer={pointer} reduce={reduce} />
      </Canvas>
    </div>
  );
}

type OrbModelProps = {
  color: string;
  secondary: string;
  pointer: RefObject<{ x: number; y: number }>;
  reduce: boolean;
};

function OrbModel({ color, secondary, pointer, reduce }: OrbModelProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const moon = useRef<THREE.Mesh>(null);
  const blob = useMemo(() => createBlob(), []);
  useEffect(() => () => blob.geometry.dispose(), [blob]);

  useFrame((state, delta) => {
    const t = reduce ? 0 : state.clock.elapsedTime;
    deformBlob(blob, t);

    if (mesh.current) {
      const damp = THREE.MathUtils.damp;
      mesh.current.rotation.y = damp(mesh.current.rotation.y, t * 0.15 + pointer.current.x * 0.5, 3, delta);
      mesh.current.rotation.x = damp(mesh.current.rotation.x, pointer.current.y * 0.35, 3, delta);
    }
    if (moon.current) {
      const angle = t * 0.45 + 1.2;
      moon.current.position.set(Math.cos(angle) * 1.62, Math.sin(angle) * 1.62, 0);
    }
  });

  return (
    <>
      <StudioEnvironment />
      <directionalLight position={[3, 4, 5]} intensity={0.9} />
      <pointLight color={secondary} intensity={35} distance={20} position={[-3, -1.5, 2.5]} />
      <pointLight color={color} intensity={25} distance={20} position={[3, 2, 2]} />

      <mesh ref={mesh} geometry={blob.geometry}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={0.4}
          iridescenceIOR={1.3}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* A fine orbit ring with a small moon travelling slowly around it */}
      <group rotation={[1.25, 0.2, 0.3]}>
        <mesh>
          <torusGeometry args={[1.62, 0.008, 8, 256]} />
          <meshBasicMaterial color={secondary} transparent opacity={0.55} />
        </mesh>
        <mesh ref={moon}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.9} />
        </mesh>
      </group>
    </>
  );
}

/** A smooth icosphere, with its original vertex positions kept so it can be deformed each frame. */
function createBlob() {
  let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(1.2, 24);
  geometry.deleteAttribute('normal');
  geometry.deleteAttribute('uv');
  geometry = mergeVertices(geometry);
  geometry.computeVertexNormals();
  const base = Float32Array.from(geometry.attributes.position.array);
  return { geometry, base };
}

/** Gently pushes and pulls the surface with slow waves, so the orb breathes. */
function deformBlob(blob: ReturnType<typeof createBlob>, t: number) {
  const position = blob.geometry.attributes.position as THREE.BufferAttribute;
  const base = blob.base;
  for (let i = 0; i < position.count; i++) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const z = base[i * 3 + 2];
    const wave = Math.sin(x * 1.8 + t * 0.6) * Math.cos(y * 1.6 - t * 0.5) + Math.sin(z * 2.2 - t * 0.7 + y) * 0.5;
    const scale = 1 + wave * 0.07;
    position.setXYZ(i, x * scale, y * scale, z * scale);
  }
  position.needsUpdate = true;
  blob.geometry.computeVertexNormals();
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
