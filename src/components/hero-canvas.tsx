"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Monolith() {
  const mesh = useRef<THREE.Mesh>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1d21"),
        metalness: 0.92,
        roughness: 0.28,
        emissive: new THREE.Color("#9a8b72"),
        emissiveIntensity: 0.06,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <mesh ref={mesh} material={material} scale={[1.15, 1.55, 1.15]}>
      <icosahedronGeometry args={[1.15, 1]} />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#f0ebe3" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#9a8b72" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.4}
        penumbra={1}
        intensity={1.4}
        color="#c4b49a"
      />
    </>
  );
}

export function HeroCanvas() {
  const [ready, setReady] = useState(false);

  return (
    <div
      className="absolute inset-0 opacity-0 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        frameloop="always"
      >
        <Lights />
        <Monolith />
      </Canvas>
    </div>
  );
}
