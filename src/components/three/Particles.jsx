import { useCallback, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useFlavor } from "../../lib/FlavorContext";

const SHAPES = {
  berry: (props) => <sphereGeometry {...props} />,
  sprinkle: (props) => <cylinderGeometry {...props} />,
  chip: (props) => <boxGeometry {...props} />,
  cube: (props) => <boxGeometry {...props} />,
  nut: (props) => <icosahedronGeometry {...props} />,
  leaf: (props) => <coneGeometry {...props} />,
};

const SHAPE_ARGS = {
  berry: [1, 20, 14],
  sprinkle: [0.5, 0.5, 3.2, 6],
  chip: [1, 1, 1],
  cube: [1, 1, 1],
  nut: [1, 0],
  leaf: [1, 2, 7],
};

let uid = 0;

function makeInstances(ingredient) {
  return Array.from({ length: ingredient.count }, () => {
    const spread = 2.1 + Math.random() * 1.8;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.acos(2 * Math.random() - 1);
    const base = new THREE.Vector3(
      spread * Math.sin(theta) * Math.cos(phi),
      spread * Math.cos(theta) * 0.6 + 0.4,
      spread * Math.sin(theta) * Math.sin(phi)
    );
    return {
      base,
      seed: Math.random() * Math.PI * 2,
      rot: new THREE.Euler(Math.random(), Math.random(), Math.random()),
      rotSpeed: (Math.random() - 0.5) * 1.2,
      scale: 1 + (Math.random() - 0.5) * 0.5,
      floatSpeed: 0.4 + Math.random() * 0.5,
      floatAmp: 0.15 + Math.random() * 0.2,
    };
  });
}

/**
 * One flock of instanced ingredient meshes for a single flavor.
 * - phase "enter"/"idle": pops in with a GSAP elastic ease.
 * - phase "exit": drops on the y-axis and fades opacity to 0.
 */
function ParticleField({ flavor, phase, onExitDone }) {
  const group = useRef(null);
  const refs = useRef([]);
  const proxies = useRef({ enter: 0, exit: 0 });
  const onExitDoneRef = useRef(onExitDone);
  useEffect(() => {
    onExitDoneRef.current = onExitDone;
  }, [onExitDone]);

  const instancesRef = useRef(flavor.ingredients.map((ing) => makeInstances(ing)));
  const dummy = useRef(new THREE.Object3D());

  useEffect(() => {
    const proxiesRef = proxies.current;
    if (phase === "exit") {
      gsap.killTweensOf(proxiesRef);
      gsap.timeline({ onComplete: () => onExitDoneRef.current() })
        .to(proxiesRef, {
          enter: 0,
          duration: 0.3,
          ease: "power2.in",
        }, 0)
        .to(proxiesRef, {
          exit: 1,
          duration: 0.65,
          ease: "power3.in",
        }, 0.12);
      return () => gsap.killTweensOf(proxiesRef);
    }
    // Entrance: elastic pop-in once on mount.
    gsap.killTweensOf(proxiesRef);
    gsap.fromTo(
      proxiesRef,
      { enter: 0, exit: 0 },
      { enter: 1, duration: 1.1, ease: "elastic.out(1, 0.55)", delay: 0.25 }
    );
    return () => gsap.killTweensOf(proxiesRef);
  }, [phase]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { enter, exit } = proxies.current;
    refs.current.forEach((mesh, typeIndex) => {
      if (!mesh) return;
      const ingredient = flavor.ingredients[typeIndex];
      const instances = instancesRef.current[typeIndex];
      const material = mesh.material;

      const drift = enter * (1 - exit);
      const opacity = Math.max(0, drift);
      if (material && material.transparent) material.opacity = opacity;

      instances.forEach((inst, i) => {
        const dropY = inst.base.y - exit * 4.5;
        const eased = drift;
        const scale = ingredient.size * inst.scale * Math.max(0.01, eased);
        const o = dummy.current;
        o.position.set(
          inst.base.x + Math.sin(t * 0.35 + inst.seed) * 0.16 * eased,
          dropY + Math.sin(t * inst.floatSpeed + inst.seed) * inst.floatAmp * eased,
          inst.base.z + Math.cos(t * 0.28 + inst.seed) * 0.16 * eased
        );
        o.rotation.set(
          inst.rot.x + t * inst.rotSpeed,
          inst.rot.y + t * inst.rotSpeed * 0.7,
          inst.rot.z
        );
        o.scale.setScalar(scale);
        o.updateMatrix();
        mesh.setMatrixAt(i, o.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });

    if (group.current) {
      group.current.rotation.y += (1 - exit) * 0.03;
    }
  });

  return (
    <group ref={group} scale={[1, 1, 1]}>
      {flavor.ingredients.map((ingredient, idx) => {
        const makeGeometry = SHAPES[ingredient.shape] ?? SHAPES.berry;
        return (
          <instancedMesh
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            args={[undefined, undefined, ingredient.count]}
            frustumCulled={false}
          >
            {makeGeometry({ args: SHAPE_ARGS[ingredient.shape] })}
            <meshStandardMaterial
              color={ingredient.color}
              transparent
              opacity={0}
              roughness={0.4}
              metalness={0.05}
            />
          </instancedMesh>
        );
      })}
    </group>
  );
}

/**
 * Orchestrates flavor transitions: marks current fields as exiting,
 * spawns the new flavor's field, and removes exited fields once done.
 */
export default function Particles() {
  const { activeId, activeFlavor } = useFlavor();
  const [fields, setFields] = useState([]);
  const first = useRef(true);

  const removeField = useCallback((id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      setFields([{ id: uid++, flavor: activeFlavor, phase: "enter" }]);
      return;
    }
    setFields((prev) => [
      ...prev.map((f) => ({ ...f, phase: "exit" })),
      { id: uid++, flavor: activeFlavor, phase: "enter" },
    ]);
  }, [activeId, activeFlavor]);

  return (
    <group>
      {fields.map((field) => (
        <ParticleField
          key={field.id}
          flavor={field.flavor}
          phase={field.phase}
          onExitDone={() => removeField(field.id)}
        />
      ))}
    </group>
  );
}