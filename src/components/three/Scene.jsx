import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import IceCream from "./IceCream";
import Particles from "./Particles";
import { useFlavor } from "../../lib/FlavorContext";

function Lights() {
  const { activeFlavor } = useFlavor();
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 6]} intensity={1.4} />
      <directionalLight position={[-6, -3, 4]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 2, 4]} intensity={14} color={activeFlavor.accent} />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 7], fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      className="!fixed inset-0 z-0 bg-transparent"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "transparent", // let the background video show through
      }}
    >
      <Lights />
      <Suspense fallback={null}>
        <IceCream />
        <Particles />
      </Suspense>
    </Canvas>
  );
}