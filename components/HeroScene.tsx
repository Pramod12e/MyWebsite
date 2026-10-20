"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type PointerRef = React.RefObject<{ x: number; y: number }>;

// Tiny seeded random generator, so the scene is the same on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Whole scene leans slightly toward the mouse. */
function Rig({
  pointer,
  children,
}: {
  pointer: PointerRef;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      pointer.current.x * 0.14,
      0.05
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -pointer.current.y * 0.09,
      0.05
    );
  });

  return <group ref={ref}>{children}</group>;
}

/** Soft glowing particles spread through the whole hero. */
function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const rand = mulberry32(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * viewport.width * 1.3;
      arr[i * 3 + 1] = (rand() - 0.5) * viewport.height * 1.3;
      arr[i * 3 + 2] = (rand() - 0.5) * 9;
    }
    return arr;
  }, [count, viewport.width, viewport.height]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.012;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#67e8f9"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/** A 3D network of connected nodes, like a neural net. */
function Network({ count, small }: { count: number; small: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const w = viewport.width;
  const h = viewport.height;
  const cx = small ? 0 : w * 0.38;
  const cy = small ? h * 0.22 : 0;
  const sx = small ? w * 0.45 : w * 0.12;
  const sy = small ? h * 0.14 : h * 0.42;

  const { nodePositions, linePositions } = useMemo(() => {
    const rand = mulberry32(7);
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      nodes.push(
        new THREE.Vector3(
          (rand() - 0.5) * 2 * sx,
          (rand() - 0.5) * 2 * sy,
          (rand() - 0.5) * 2
        )
      );
    }

    const nodeArray = new Float32Array(count * 3);
    nodes.forEach((node, i) => node.toArray(nodeArray, i * 3));

    const limit = Math.max(sx, sy) * 0.6;
    const segments: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodes[i].distanceTo(nodes[j]) < limit) {
          segments.push(...nodes[i].toArray(), ...nodes[j].toArray());
        }
      }
    }

    return {
      nodePositions: nodeArray,
      linePositions: new Float32Array(segments),
    };
  }, [count, sx, sy]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.35;
    ref.current.rotation.x = Math.cos(clock.elapsedTime * 0.25) * 0.12;
  });

  return (
    <group ref={ref} position={[cx, cy, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.28} />
      </lineSegments>

      <Points positions={nodePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a5f3fc"
          size={0.1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

/** Floating wireframe shapes. */
function Shapes({ small }: { small: boolean }) {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;
  const scale = small ? 0.5 : 1;

  return (
    <>
      <Float speed={1.4} rotationIntensity={1.3} floatIntensity={1.4}>
        <mesh position={[w * (small ? 0.3 : 0.28), h * 0.32, -1]} scale={0.8 * scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.6} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={1.6} floatIntensity={1.2}>
        <mesh position={[w * (small ? -0.3 : 0.42), -h * 0.3, -1.5]} scale={scale}>
          <torusGeometry args={[0.8, 0.06, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.55} />
        </mesh>
      </Float>

      {!small && (
        <Float speed={1.8} rotationIntensity={1.8} floatIntensity={1.6}>
          <mesh position={[-w * 0.4, h * 0.34, -2]} scale={0.45}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.5} />
          </mesh>
        </Float>
      )}
    </>
  );
}

export default function HeroScene({
  small,
  active,
}: {
  small: boolean;
  active: boolean;
}) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, small ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ alpha: true, antialias: !small, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
    >
      <Rig pointer={pointer}>
        <Dust count={small ? 350 : 900} />
        <Network count={small ? 26 : 44} small={small} />
        <Shapes small={small} />
      </Rig>
    </Canvas>
  );
}