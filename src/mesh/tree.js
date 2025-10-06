import * as THREE from "three";

export default function createTree() {
  const tree = new THREE.Group();
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1);

  // 줄기 1 (하단)
  const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
  tree.add(trunk1);

  // 줄기 2 (중단)
  const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk2.position.set(0.1, 1.3, 0);
  trunk2.scale.set(0.9, 0.9, 0.9);
  trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
  tree.add(trunk2);

  // 줄기 3 (상단)
  const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk3.position.set(0.2, 2.5, 0);
  trunk3.scale.set(0.8, 0.8, 0.8);
  trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
  tree.add(trunk3);

  // 가지
  const branch = new THREE.Mesh(trunkGeometry, trunkMaterial);
  branch.position.set(0.7, 0.7, 0.7);
  branch.scale.set(0.3, 3.5, 0);
  branch.rotation.z = THREE.MathUtils.degToRad(-8);
  tree.add(branch);

  return tree;
}
