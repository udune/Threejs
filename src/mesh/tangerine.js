import * as THREE from "three";

export default function createTangerine() {
  const tangerine = new THREE.Group();

  // 귤 몸통 (하단)
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xff7f00 });
  const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
  const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
  tangerine.add(bottom);

  // 귤 몸통 (상단)
  const topGeometry = new THREE.TetrahedronGeometry(1, 2);
  const top = new THREE.Mesh(topGeometry, bodyMaterial);
  top.position.y = 1.7;
  tangerine.add(top);

  // 줄기
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x008000,
    side: THREE.DoubleSide,
  });
  const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
  const stem = new THREE.Mesh(stemGeometry, leafMaterial);
  stem.position.y = 2.5;
  tangerine.add(stem);

  // 잎
  const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
  const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);
  leafMesh.position.set(0, 3, 2);
  leafMesh.rotation.set(Math.PI / -2, Math.PI / 2, 0);
  tangerine.add(leafMesh);

  return tangerine;
}
