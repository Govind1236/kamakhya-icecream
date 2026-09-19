import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

globalThis.FileReader = class {
  static _read(blob) {
    if (typeof blob === "string") return Promise.resolve(blob);
    if (ArrayBuffer.isView(blob)) return Promise.resolve(Buffer.from(blob.buffer));
    if (blob instanceof ArrayBuffer) return Promise.resolve(Buffer.from(blob));
    if (typeof blob.arrayBuffer === "function") return blob.arrayBuffer().then((ab) => Buffer.from(ab));
    return Promise.resolve(Buffer.from(blob || []));
  }
  readAsArrayBuffer(blob) {
    FileReader._read(blob).then((buf) => {
      this.result = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
  readAsDataURL(blob) {
    FileReader._read(blob).then((buf) => {
      this.result = "data:application/octet-stream;base64," + buf.toString("base64");
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
};

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public", "models");
mkdirSync(outDir, { recursive: true });

const scene = new THREE.Scene();

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.9, 2.2, 48, 1, true),
  new THREE.MeshStandardMaterial({ name: "cone", color: 0xd9a55f, roughness: 0.75 })
);
cone.position.y = -1.2;
cone.rotation.x = Math.PI; // wide rim up, tip down
scene.add(cone);

const scoop = new THREE.Mesh(
  new THREE.SphereGeometry(0.95, 48, 32),
  new THREE.MeshStandardMaterial({ name: "scoop", color: 0xff8fb1, roughness: 0.32 })
);
scoop.position.y = 0.3;
scene.add(scoop);

const tip = new THREE.Mesh(
  new THREE.SphereGeometry(0.38, 24, 16),
  new THREE.MeshStandardMaterial({ name: "tip", color: 0xff8fb1, roughness: 0.4 })
);
tip.position.set(0.34, 1.18, 0.2);
scene.add(tip);

const cherry = new THREE.Mesh(
  new THREE.SphereGeometry(0.26, 24, 16),
  new THREE.MeshStandardMaterial({ name: "cherry", color: 0xc22741, roughness: 0.18 })
);
cherry.position.set(0, 1.68, 0);
scene.add(cherry);

const exporter = new GLTFExporter();
const result = await exporter.parseAsync(scene, { binary: false });
const gltf = typeof result === "string" ? result : JSON.stringify(result, null, 2);
writeFileSync(join(outDir, "icecream.gltf"), gltf, "utf8");
console.log("written:", join(outDir, "icecream.gltf"), "-", gltf.length, "bytes");