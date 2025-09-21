import * as THREE from "three"; // three.js 모듈을 모두 불러옴

const $result = document.getElementById("result"); // 캔버스 요소 선택

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene(); // 3D 공간
scene.background = new THREE.Color(0xffe287); // 배경색 설정

// 2. Camera: Scene을 바라 볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50, // 시야각(FOV)
  $result.clientWidth / $result.clientHeight, // 종횡비(Aspect)
  0.1, // near
  1000 // far
);
camera.position.set(2, 2, 2); // 카메라 위치 설정
camera.lookAt(0, 0, 0); // 카메라가 바라보는 위치 설정

// 3. Renderer: SceneCamera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({
  canvas: $result,
  antialias: true,
}); // 캔버스 요소를 렌더러에 연결
// renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 크기 설정
renderer.setSize($result.clientWidth, $result.clientHeight); // 캔버스 요소 크기에 맞게 렌더러 크기 설정
// document.body.appendChild(renderer.domElement); // 렌더러를 body에 추가

// 3-1. Light: 빛
const light = new THREE.DirectionalLight(0xffffff, 1); // 색상, 강도
light.position.set(2, 4, 3); // 조명 위치 설정
scene.add(light); // 씬에 조명 추가

// 4. Mesh: 도형(Geometry) + 재질(Material)
const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로, 세로, 깊이
const material = new THREE.MeshStandardMaterial({ color: 0x2e6ff2 }); // 색상
const box = new THREE.Mesh(geometry, material); // 도형과 재질을 합침
scene.add(box); // 씬에 도형 추가
renderer.render(scene, camera); // scene과 camera를 렌더러에 넣어줌

// 애니메이션 함수
function animate() {
  box.rotation.y += 0.01; // y축으로 회전
  renderer.render(scene, camera); // 매 프레임마다 렌더링
  requestAnimationFrame(animate); // 브라우저에 애니메이션을 요청
}

animate(); // 애니메이션 실행

// 반응형
window.addEventListener("resize", () => {
  // 1. 카메라 종횡비 조정
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영 행렬 갱신

  // 2. 렌더러 크기 조정
  renderer.setSize(window.innerWidth, window.innerHeight);
});
