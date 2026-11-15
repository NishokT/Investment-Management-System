'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '@/lib/browser';
import { useAccent } from '@/lib/useAccent';

const COUNT = 5200;
const RADIUS = 1.85;

/**
 * A fixed full-screen particle cloud that morphs through four shapes as the visitor scrolls:
 * sphere, knot, cube, ring. Each particle eases into its new place at a slightly different
 * moment, so the transition ripples instead of snapping.
 */
export function ParticleStageScene() {
  const accent = useAccent();
  const progress = useRef(0);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = prefersReducedMotion();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6.5], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <Particles color={accent} progress={progress} reduce={reduce} />
    </Canvas>
  );
}

/** Draws COUNT points at random from a geometry's vertices, scaled to a common radius. */
function samplePoints(geometry: THREE.BufferGeometry): Float32Array {
  const position = geometry.attributes.position;
  geometry.computeBoundingSphere();
  const scale = RADIUS / (geometry.boundingSphere?.radius || 1);
  const out = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const index = Math.floor(Math.random() * position.count);
    out[i * 3] = position.getX(index) * scale + (Math.random() - 0.5) * 0.04;
    out[i * 3 + 1] = position.getY(index) * scale + (Math.random() - 0.5) * 0.04;
    out[i * 3 + 2] = position.getZ(index) * scale + (Math.random() - 0.5) * 0.04;
  }
  return out;
}

function buildShapes(): Float32Array[] {
  const geometries = [
    new THREE.SphereGeometry(1, 96, 96),
    new THREE.TorusKnotGeometry(1, 0.36, 400, 40),
    new THREE.BoxGeometry(1, 1, 1, 40, 40, 40),
    new THREE.TorusGeometry(1, 0.42, 96, 240),
  ];
  return geometries.map((geometry) => {
    const points = samplePoints(geometry);
    geometry.dispose();
    return points;
  });
}

type ParticlesProps = {
  color: string;
  progress: RefObject<number>;
  reduce: RefObject<boolean>;
};

function Particles({ color, progress, reduce }: ParticlesProps) {
  const shapes = useMemo(() => buildShapes(), []);
  const seeds = useMemo(() => Float32Array.from({ length: COUNT }, () => Math.random()), []);
  const positions = useMemo(() => new Float32Array(COUNT * 3), []);
  const attribute = useRef<THREE.BufferAttribute>(null);
  const points = useRef<THREE.Points>(null);
  const smooth = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const still = reduce.current ? 0 : 1;

    // Which pair of shapes we are between, and how far along
    smooth.current = THREE.MathUtils.damp(smooth.current, progress.current, 3.5, delta);
    const x = smooth.current * (shapes.length - 1);
    const i = Math.min(Math.floor(x), shapes.length - 2);
    const local = x - i;
    const from = shapes[i];
    const to = shapes[i + 1];

    for (let p = 0; p < COUNT; p++) {
      // Staggered easing: each particle starts and finishes its move at its own moment
      const k = THREE.MathUtils.clamp((local - seeds[p] * 0.35) / 0.65, 0, 1);
      const e = k * k * (3 - 2 * k);
      const j = p * 3;
      const wobble = Math.sin(t * 1.3 + seeds[p] * 12) * 0.03 * still;
      positions[j] = from[j] + (to[j] - from[j]) * e + wobble;
      positions[j + 1] = from[j + 1] + (to[j + 1] - from[j + 1]) * e + wobble * 0.7;
      positions[j + 2] = from[j + 2] + (to[j + 2] - from[j + 2]) * e + wobble * 0.5;
    }
    if (attribute.current) attribute.current.needsUpdate = true;

    if (points.current) {
      const wide = state.viewport.width / state.viewport.height > 1.05;
      const target = points.current;
      target.rotation.y = t * 0.12 * still + smooth.current * Math.PI * 1.2;
      target.rotation.x = 0.15 + 0.08 * Math.sin(t * 0.3) * still;
      target.position.x = THREE.MathUtils.damp(target.position.x, wide ? state.viewport.width * 0.24 : 0, 4, delta);
      target.position.y = THREE.MathUtils.damp(target.position.y, wide ? 0 : state.viewport.height * 0.26, 4, delta);
      target.scale.setScalar(THREE.MathUtils.damp(target.scale.x, wide ? 1 : 0.55, 4, delta));
    }
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute ref={attribute} attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.024} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
    </points>
  );
}
