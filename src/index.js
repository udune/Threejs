import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import createTree from "./mesh/tree.js";
import createTangerine from "./mesh/tangerine.js";

const $result = document.getElementById("result");

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene과 Camera를 화면에 그려주는 역할
const renderer = new THREE.WebGLRenderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize($result.clientWidth, $result.clientHeight);

// 4. Light: 조명
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 4, 3);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-2, 2, 0);
directionalLight.target.position.set(0, 2, 0);
scene.add(directionalLight);

const dlHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1,
  0xff0000
);
scene.add(dlHelper);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

const plHelper = new THREE.PointLightHelper(pointLight, 0.3, 0x00ff00);
scene.add(plHelper);

const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 6, 0.5);
spotLight.position.y = 2;
scene.add(spotLight);

const slHelper = new THREE.SpotLightHelper(spotLight, 0x0000ff);
scene.add(slHelper);

const hemisphereLight = new THREE.HemisphereLight(0xffaaaa, 0x00ff00, 1);
scene.add(hemisphereLight);

// 5. Meshes: 3D 객체들
const tree = createTree();
scene.add(tree);

const tangerine = createTangerine();
tangerine.scale.set(0.3, 0.3, 0.3);
scene.add(tangerine);

const axes = new THREE.AxesHelper(3);
scene.add(axes);

// 6. Controls: 카메라 조작
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.minPolarAngle = Math.PI / 4;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;
controls.enableDamping = true;

// 7. Animation: 애니메이션 루프
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// 8. Responsive: 반응형 처리
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
