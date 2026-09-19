import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useFlavor } from "../../lib/FlavorContext";

export default function IceCream() {
  const group = useRef(null);
  const outer = useRef(null);
  const { activeFlavor } = useFlavor();

  const { scene } = useGLTF(activeFlavor.model ?? "/models/icecream.gltf");

  // Clone so we can re-tint freely without mutating the cached GLTF.
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Re-tint the scoop/tip material whenever the flavor changes.
  useEffect(() => {
    const targets = [];
    model.traverse((obj) => {
      const mat = obj.material;
      if (mat && ["scoop", "tip"].includes(mat.name)) targets.push(mat);
    });
    const color = new THREE.Color(activeFlavor.scoopColor);
    targets.forEach((mat) => {
      gsap.to(mat.color, {
        r: color.r,
        g: color.g,
        b: color.b,
        duration: 0.9,
        ease: "power2.inOut",
      });
    });
    return () => {
      targets.forEach((mat) => gsap.killTweensOf(mat.color));
    };
  }, [model, activeFlavor.scoopColor]);

  useFrame((state, delta) => {
    if (!group.current || !outer.current) return;
    const t = state.clock.elapsedTime;

    // Continuous slow rotation.
    group.current.rotation.y += delta * 0.25;

    // Subtle bobbing float.
    group.current.position.y = Math.sin(t * 0.8) * 0.08;

    // Parallax sway tied to pointer.
    const targetRotX = state.pointer.y * 0.12;
    const targetRotZ = state.pointer.x * 0.14;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 3, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotZ, 3, delta);

    outer.current.position.x = THREE.MathUtils.damp(outer.current.position.x, state.pointer.x * 0.35, 2.5, delta);
    outer.current.position.y = THREE.MathUtils.damp(outer.current.position.y, 0.6 + state.pointer.y * 0.25, 2.5, delta);
  });

  return (
    <group ref={outer}>
      <group ref={group} position={[0, 0.6, 0]} scale={1.15}>
        <primitive object={model} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/icecream.gltf");