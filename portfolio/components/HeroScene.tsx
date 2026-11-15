'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { prefersReducedMotion } from '@/lib/browser';
import { useAccent } from '@/lib/useAccent';

type HeroSceneProps = { onReady: () => void };

/**
 * The hero's 3D scene: a glossy iridescent knot inside a wireframe shell, surrounded
 * by a slow particle field. It follows the cursor, responds to scrolling, uses the
 * site's accent colour, and only renders while it is on screen.
 */
export function HeroScene({ onReady }: HeroSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollOffset = useRef(0);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);
  const accent = useAccent();

  useEffect(() => {
    setReduce(prefersReducedMotion());

    const el = wrapRef.current;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (el) observer.observe(el);

    let lastY = window.scrollY;
    const onScroll = () => {
      scrollOffset.current += (window.scrollY - lastY) * 0.0015;
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="hero-canvas" ref={wrapRef}>
      <Canvas
        dpr={[1, 2]}
        // Animate only while visible and when motion is allowed; otherwise render on demand (a still frame)
        frameloop={visible && !reduce ? 'always' : 'demand'}
        camera={{ position: [0, 0, 8], fov: 36 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        onCreated={() => onReady()}
      >
        <Scene color={accent} reduce={reduce} scrollOffset={scrollOffset} />
      </Canvas>
    </div>
  );
}

type SceneProps = {
  color: string;
  reduce: boolean;
  scrollOffset: RefObject<number>;
};

function Scene({ color, reduce, scrollOffset }: SceneProps) {
  const knot = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const particles = useRef<THREE.Points>(null);
  const rim = useRef<THREE.PointLight>(null);
  const smoothScroll = useRef(0);

  // Particles are scattered once, on a shell around the object
  const positions = useMemo(() => {
    const count = 900;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const px = reduce ? 0 : state.pointer.x;
    const py = reduce ? 0 : state.pointer.y;

    smoothScroll.current = THREE.MathUtils.damp(smoothScroll.current, scrollOffset.current, 4, delta);

    if (knot.current) {
      knot.current.rotation.y = t * 0.22 + px * 0.6 + smoothScroll.current;
      knot.current.rotation.x = Math.sin(t * 0.35) * 0.18 + py * 0.35;
      knot.current.position.y = Math.sin(t * 0.9) * 0.12;
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.1 - px * 0.2;
      shell.current.rotation.x = t * 0.05 + py * 0.15;
    }
    if (particles.current) {
      particles.current.rotation.y = t * 0.025;
      particles.current.rotation.x = py * 0.05;
    }
    if (rim.current) {
      rim.current.position.x = Math.cos(t * 0.6) * 4;
      rim.current.position.z = 3 + Math.sin(t * 0.6) * 1.5;
    }
  });

  return (
    <>
      <StudioEnvironment />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <pointLight ref={rim} color={color} intensity={30} distance={30} position={[-3, -2, 3]} />

      <mesh ref={knot}>
        <torusKnotGeometry args={[1, 0.34, 280, 48]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.15}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.06}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessMinimum={180}
          iridescenceThicknessMaximum={620}
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[2.3, 2]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.14} />
      </mesh>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.03} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
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
