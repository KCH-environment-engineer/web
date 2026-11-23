// Pure Vanilla JS (Global THREE & THREE.OrbitControls)
const OrbitControls = THREE.OrbitControls;

// ==========================================
// 1. 전역 상태 및 데이터 명세
// ==========================================
const SHAPE_DATA = {
  cube: {
    name: '정육면체 (Cube)',
    unit: '초등 5-2 직육면체와 정육면체',
    desc: '합동인 정사각형 6개로 이루어진 다면체입니다. 실을 당기면 바닥면을 중심으로 4개의 옆면이 수직(90°)으로 서고 윗면 덮개가 닫힙니다.',
    faces: '6개 (정사각형)',
    edges: '12개',
    vertices: '8개',
    formulaTitle: "오일러 다면체 정리 (Euler's Formula)",
    formulaMath: '꼭짓점(8) - 모서리(12) + 면(6) = 2',
    formulaDesc: '구멍이 없는 모든 다면체에서 V - E + F = 2 가 항상 성립합니다.',
    tips: [
      '실을 당기면 바닥면 주변 4개 면이 수직(90도)으로 일어섭니다.',
      '서로 마주보는 면(밑면과 윗면, 앞과 뒤, 좌와 우)은 평행하고 합동입니다.',
      '전개도에서 떨어져 있던 모서리들이 닫히며 12개의 모서리가 완성됩니다.'
    ]
  },
  cuboid: {
    name: '직육면체 (Cuboid)',
    unit: '초등 5-2 직육면체의 전개도와 겨냥도',
    desc: '직사각형 6개로 둘러싸인 입체도형입니다. 마주보는 세 쌍의 면이 각각 서로 평행하고 합동입니다.',
    faces: '6개 (직사각형)',
    edges: '12개',
    vertices: '8개',
    formulaTitle: "직육면체의 겉넓이와 부피 공식",
    formulaMath: '부피 = 가로 × 세로 × 높이',
    formulaDesc: '겉넓이는 합동인 마주보는 세 쌍의 면의 넓이 합: 2(ab + bc + ca)',
    tips: [
      '접었을 때 만나는 모서리의 길이가 반드시 같아야 상자가 닫힙니다.',
      '마주보는 면끼리는 서로 마주보며 평행을 이룹니다.',
      '초등 시험 단골 문제: "접었을 때 면 ㉮와 평행한 면 찾기"의 원리입니다.'
    ]
  },
  tetrahedron: {
    name: '정사면체 / 삼각뿔 (Tetrahedron)',
    unit: '초등 6-1 각기둥과 각뿔',
    desc: '밑면이 삼각형이고 옆면 3개가 모두 삼각형인 각뿔입니다. 세 삼각형의 꼭짓점을 실로 묶어 당기면 물리적으로 한 점(Apex)으로 수렴합니다.',
    faces: '4개 (정삼각형)',
    edges: '6개',
    vertices: '4개',
    formulaTitle: "정사면체의 기하학적 성질",
    formulaMath: '꼭짓점(4) - 모서리(6) + 면(4) = 2',
    formulaDesc: '모든 면이 정삼각형인 가장 단순한 플라톤의 정다면체입니다.',
    tips: [
      '3개의 옆면 삼각형이 기울어지며(이면각 약 70.5°) 한 점에서 만납니다.',
      '꼭짓점 펀칭 구멍을 관통한 실이 꼭대기에서 하나로 조여집니다.',
      '삼각형의 구조적 안정성(트러스 구조)을 체득할 수 있습니다.'
    ]
  },
  hexPrism: {
    name: '육각기둥 (Hexagonal Prism)',
    unit: '초등 6-1 각기둥과 각뿔',
    desc: '두 밑면이 서로 평행하고 합동인 정육각형이며, 옆면 6개가 직사각형인 다면체 기둥입니다.',
    faces: '8개 (육각형 2 + 직사각형 6)',
    edges: '18개',
    vertices: '12개',
    formulaTitle: "각기둥의 구성 요소 법칙",
    formulaMath: '꼭짓점(2n) | 모서리(3n) | 면(n + 2)',
    formulaDesc: 'n각기둥 공식 (n=6): 꼭짓점 12개, 모서리 18개, 면 8개',
    tips: [
      '밑면의 변의 수(6개)만큼 옆면 직사각형이 필요합니다.',
      '밑면의 수가 많아질수록 둥근 원기둥 형태로 수렴해 갑니다.',
      '두 밑면은 서로 평행하며 옆면과 수직을 이룹니다.'
    ]
  },
  hexPyramid: {
    name: '별모양 육각뿔 (Hexagonal Pyramid)',
    unit: '초등 6-1 각기둥과 각뿔 (DIY 교구 모델)',
    desc: '밑면이 정육각형이고 옆면 6개가 이등변삼각형으로 이루어진 별 모양 전개도입니다. 중앙 실을 위로 당기면 순식간에 3D 육각뿔로 기립합니다.',
    faces: '7개 (육각형 1 + 삼각형 6)',
    edges: '12개',
    vertices: '7개',
    formulaTitle: "각뿔의 구성 요소 법칙",
    formulaMath: '꼭짓점(n + 1) | 모서리(2n) | 면(n + 1)',
    formulaDesc: 'n각뿔 공식 (n=6): 꼭짓점 7개, 모서리 12개, 면 7개',
    tips: [
      '별 모양 전개도의 6개 뾰족한 끝에 펀칭을 하고 실을 뀁니다.',
      '실을 위로 당기면 6개의 삼각형 모서리가 서로 맞물리며 꼭대기에서 만납니다.',
      '홈메이드 DIY로 가장 쉽게 만들 수 있는 역동적인 팝업 교구입니다.'
    ]
  },
  cylinder: {
    name: '원기둥 (Cylinder)',
    unit: '초등 6-2 원기둥, 원뿔, 구',
    desc: '평평한 직사각형 옆면이 둥글게 말려 원형 밑면과 결합하는 회전체/곡면 입체입니다. 가로 길이가 밑면 원주(2πr)와 완벽히 일치해야 닫힙니다.',
    faces: '3개 (원 2 + 곡면 1)',
    edges: '2개 (곡면 모서리)',
    vertices: '0개',
    formulaTitle: "원기둥의 핵심 수학 공식",
    formulaMath: '옆면 가로 = 밑면 둘레 = 2 × π × r',
    formulaDesc: '반지름 1.0일 때 원주 약 6.28. 직사각형이 휘어지며 원을 감쌉니다.',
    tips: [
      '직사각형 옆면이 실의 장력으로 점진적으로 둥글게 휘어집니다.',
      '밑면 원의 둘레(2πr)와 직사각형 가로 길이가 정확히 같음을 체득합니다.',
      '종이의 유연성을 이용해 평면에서 곡면으로 변환되는 마법 같은 구조입니다.'
    ]
  }
};

const QUIZ_LIST = [
  {
    shapeKey: 'cube',
    question: '화면에 펼쳐진 정사각형 6개 전개도의 실을 당기면 어떤 입체도형이 완성될까요?',
    options: ['정육면체', '직육면체', '사각뿔', '삼각기둥'],
    answer: 0,
    explanation: '합동인 정사각형 6개로 둘러싸인 상자 모양의 도형은 [정육면체]입니다.'
  },
  {
    shapeKey: 'tetrahedron',
    question: '중앙과 주변에 정삼각형 4개로 이루어진 전개도를 당기면 어떤 입체도형이 될까요?',
    options: ['정육면체', '사면체 (삼각뿔)', '육각뿔', '원뿔'],
    answer: 1,
    explanation: '정삼각형 4개의 꼭짓점이 하나로 모여 완성되는 도형은 [사면체(정삼각뿔)]입니다.'
  },
  {
    shapeKey: 'hexPyramid',
    question: '가운데 정육각형 밑면과 주변 6개의 뾰족한 이등변삼각형이 별 모양인 전개도의 완성형은?',
    options: ['육각기둥', '정육면체', '육각뿔', '원기둥'],
    answer: 2,
    explanation: '밑면이 육각형이고 옆면 삼각형들이 한 꼭짓점으로 모이는 도형은 [육각뿔]입니다.'
  },
  {
    shapeKey: 'cylinder',
    question: '직사각형 1개와 위아래 원 2개로 이루어진 전개도를 당겨 말면 어떤 입체도형이 될까요?',
    options: ['원뿔', '원기둥', '구', '육각기둥'],
    answer: 1,
    explanation: '직사각형이 둥글게 말려 두 원형 밑면과 결합하는 도형은 [원기둥]입니다.'
  },
  {
    shapeKey: 'hexPrism',
    question: '정육각형 2개와 직사각형 6개로 구성된 전개도를 당기면 어떤 도형이 완성될까요?',
    options: ['육각뿔', '육각기둥', '직육면체', '사각기둥'],
    answer: 1,
    explanation: '두 밑면이 정육각형이고 옆면이 직사각형인 기둥 모양은 [육각기둥]입니다.'
  }
];

// ==========================================
// 2. Three.js 씬 및 렌더러 초기화
// ==========================================
let scene, camera, renderer, controls;
let currentShapeGroup = null;
let currentShapeKey = 'cube';
let tension = 0; // 0 (flat) ~ 1 (fully folded 3D)
let isPlaying = false;
let playDirection = 1;
let isXray = false;
let showLabels = true;
let stringMesh = null;

const container = document.getElementById('canvas-container');

function initThree() {
  const width = container.clientWidth || 800;
  const height = container.clientHeight || 500;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x090d16);

  // 안개 효과
  scene.fog = new THREE.FogExp2(0x090d16, 0.035);

  // 카메라 설정 (Perspective)
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 7.5, 9);

  // 렌더러 설정
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 + 0.15; // 바닥 아래로 너무 내려가지 않도록
  controls.minDistance = 3;
  controls.maxDistance = 25;
  controls.target.set(0, 0.6, 0);

  // 조명 설정
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 1.4);
  dirLight1.position.set(6, 12, 8);
  dirLight1.castShadow = true;
  dirLight1.shadow.mapSize.width = 2048;
  dirLight1.shadow.mapSize.height = 2048;
  dirLight1.shadow.bias = -0.0005;
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 0.6);
  dirLight2.position.set(-8, 6, -6);
  scene.add(dirLight2);

  // 바닥 그리드 및 그림자 평면
  const gridHelper = new THREE.GridHelper(16, 16, 0x334155, 0x1e293b);
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  const planeGeo = new THREE.PlaneGeometry(30, 30);
  const planeMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  const floor = new THREE.Mesh(planeGeo, planeMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  floor.receiveShadow = true;
  scene.add(floor);

  // 윈도우 리사이즈 대응
  window.addEventListener('resize', onWindowResize);

  // 첫 번째 도형 로드
  buildShape(currentShapeKey);

  // 렌더 루프 시작
  animate();
}

function onWindowResize() {
  if (!container || !renderer || !camera) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// ==========================================
// 3. 재질(Material) 생성기 & 헬퍼
// ==========================================
const palette = {
  yellow: 0xf59e0b,
  amber: 0xd97706,
  blue: 0x3b82f6,
  indigo: 0x6366f1,
  emerald: 0x10b981,
  rose: 0xf43f5e,
  violet: 0x8b5cf6,
  string: 0xfacc15 // 가이드 실 색상 (선명한 형광 노랑)
};

function createFaceMaterial(colorHex, name = '') {
  return new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.45,
    metalness: 0.05,
    side: THREE.DoubleSide,
    transparent: isXray,
    opacity: isXray ? 0.45 : 1.0,
    wireframe: false
  });
}

function createEdgeLines(geometry, color = 0xffffff) {
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    color: color,
    linewidth: 2,
    transparent: true,
    opacity: 0.75
  }));
  return line;
}

// ==========================================
// 4. 6종 입체도형 폴딩 모델링 엔진
// ==========================================
let foldingAnimators = []; // 매 텐션 변경 시 호출할 콜백 모음
let stringKeypointsGetter = null; // 실의 꼭짓점 위치 계산기

function clearCurrentShape() {
  if (currentShapeGroup) {
    scene.remove(currentShapeGroup);
    currentShapeGroup.traverse(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    });
  }
  if (stringMesh) {
    scene.remove(stringMesh);
    if (stringMesh.geometry) stringMesh.geometry.dispose();
    if (stringMesh.material) stringMesh.material.dispose();
    stringMesh = null;
  }
  foldingAnimators = [];
  stringKeypointsGetter = null;
}

function buildShape(shapeKey) {
  clearCurrentShape();
  currentShapeKey = shapeKey;
  currentShapeGroup = new THREE.Group();

  switch (shapeKey) {
    case 'cube':
      buildCubeModel();
      break;
    case 'cuboid':
      buildCuboidModel();
      break;
    case 'tetrahedron':
      buildTetrahedronModel();
      break;
    case 'hexPrism':
      buildHexPrismModel();
      break;
    case 'hexPyramid':
      buildHexPyramidModel();
      break;
    case 'cylinder':
      buildCylinderModel();
      break;
  }

  scene.add(currentShapeGroup);
  updateTension(tension);
  updateUIInfo(shapeKey);
}

// ----------------------------------------------------
// (1) 정육면체 (Cube)
// ----------------------------------------------------
function buildCubeModel() {
  const S = 2.0; // 한 변 크기
  const half = S / 2;

  // 바닥면 (Base Face)
  const baseGeo = new THREE.PlaneGeometry(S, S);
  baseGeo.rotateX(-Math.PI / 2);
  const baseMat = createFaceMaterial(palette.yellow);
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  baseMesh.add(createEdgeLines(baseGeo));
  currentShapeGroup.add(baseMesh);

  // 옆면 4개 및 덮개 피벗
  // 1. 앞면 (Z+)
  const pFront = new THREE.Object3D();
  pFront.position.set(0, 0, half);
  const frontGeo = new THREE.PlaneGeometry(S, S);
  frontGeo.translate(0, half, 0); // 회전 중심을 아래쪽 변으로
  const frontMesh = new THREE.Mesh(frontGeo, createFaceMaterial(0xfbbf24));
  frontMesh.add(createEdgeLines(frontGeo));
  frontMesh.castShadow = true;
  pFront.add(frontMesh);
  currentShapeGroup.add(pFront);

  // 2. 뒷면 (Z-) 및 윗면 덮개
  const pBack = new THREE.Object3D();
  pBack.position.set(0, 0, -half);
  const backGeo = new THREE.PlaneGeometry(S, S);
  backGeo.translate(0, half, 0);
  const backMesh = new THREE.Mesh(backGeo, createFaceMaterial(0xfbbf24));
  backMesh.add(createEdgeLines(backGeo));
  backMesh.castShadow = true;
  pBack.add(backMesh);

  // 윗면 덮개 (뒷면 상단에 연결)
  const pTop = new THREE.Object3D();
  pTop.position.set(0, S, 0);
  const topGeo = new THREE.PlaneGeometry(S, S);
  topGeo.translate(0, half, 0);
  const topMesh = new THREE.Mesh(topGeo, createFaceMaterial(0xf59e0b));
  topMesh.add(createEdgeLines(topGeo));
  topMesh.castShadow = true;
  pTop.add(topMesh);
  backMesh.add(pTop);
  currentShapeGroup.add(pBack);

  // 3. 왼쪽면 (X-)
  const pLeft = new THREE.Object3D();
  pLeft.position.set(-half, 0, 0);
  const leftGeo = new THREE.PlaneGeometry(S, S);
  leftGeo.rotateY(Math.PI / 2);
  leftGeo.translate(0, half, 0);
  const leftMesh = new THREE.Mesh(leftGeo, createFaceMaterial(0xfcd34d));
  leftMesh.add(createEdgeLines(leftGeo));
  leftMesh.castShadow = true;
  pLeft.add(leftMesh);
  currentShapeGroup.add(pLeft);

  // 4. 오른쪽면 (X+)
  const pRight = new THREE.Object3D();
  pRight.position.set(half, 0, 0);
  const rightGeo = new THREE.PlaneGeometry(S, S);
  rightGeo.rotateY(-Math.PI / 2);
  rightGeo.translate(0, half, 0);
  const rightMesh = new THREE.Mesh(rightGeo, createFaceMaterial(0xfcd34d));
  rightMesh.add(createEdgeLines(rightGeo));
  rightMesh.castShadow = true;
  pRight.add(rightMesh);
  currentShapeGroup.add(pRight);

  // 전개도 펼침 위치 세팅: tension=0 일 때 모두 평면(0도 각도)
  // 평면 상태일 때 pFront는 X축 -90도, pBack은 X축 +90도, pTop은 X축 0도, pLeft는 Z축 +90도, pRight는 Z축 -90도
  foldingAnimators.push((t) => {
    // t=0 (flat), t=1 (3D box)
    const angleSide = (Math.PI / 2) * t; // 0 -> 90도
    // 앞면: 평면(X축 +90도 누움) -> 기립(0도)
    pFront.rotation.x = (Math.PI / 2) * (1 - t);
    // 뒷면: 평면(X축 -90도 누움) -> 기립(0도)
    pBack.rotation.x = -(Math.PI / 2) * (1 - t);
    // 윗면: 평면(뒷면과 일직선) -> 덮임(-90도)
    pTop.rotation.x = -(Math.PI / 2) * t;
    // 왼쪽면: 평면(Z축 +90도 누움) -> 기립(0도)
    pLeft.rotation.z = (Math.PI / 2) * (1 - t);
    // 오른쪽면: 평면(Z축 -90도 누움) -> 기립(0도)
    pRight.rotation.z = -(Math.PI / 2) * (1 - t);
  });

  // 실(String) 궤적 포인트 계산기
  stringKeypointsGetter = () => {
    const pts = [];
    const pullApex = new THREE.Vector3(0, S * (1.1 + (1 - tension) * 0.8), 0);
    // 각 모서리 펀칭 위치 월드 좌표
    const corners = [
      new THREE.Vector3(-half, S, 0),
      new THREE.Vector3(half, S, 0),
      new THREE.Vector3(0, S, half),
      new THREE.Vector3(0, S, -half)
    ];
    corners.forEach(c => {
      pts.push(c);
      pts.push(pullApex);
    });
    return { pts, pullApex };
  };
}

// ----------------------------------------------------
// (2) 직육면체 (Cuboid)
// ----------------------------------------------------
function buildCuboidModel() {
  const W = 2.6; // 가로
  const D = 1.8; // 세로(깊이)
  const H = 1.4; // 높이
  const halfW = W / 2;
  const halfD = D / 2;

  // 바닥면 (W x D)
  const baseGeo = new THREE.PlaneGeometry(W, D);
  baseGeo.rotateX(-Math.PI / 2);
  const baseMesh = new THREE.Mesh(baseGeo, createFaceMaterial(0x3b82f6));
  baseMesh.add(createEdgeLines(baseGeo));
  currentShapeGroup.add(baseMesh);

  // 앞면 (W x H)
  const pFront = new THREE.Object3D();
  pFront.position.set(0, 0, halfD);
  const frontGeo = new THREE.PlaneGeometry(W, H);
  frontGeo.translate(0, H / 2, 0);
  const frontMesh = new THREE.Mesh(frontGeo, createFaceMaterial(0x60a5fa));
  frontMesh.add(createEdgeLines(frontGeo));
  pFront.add(frontMesh);
  currentShapeGroup.add(pFront);

  // 뒷면 (W x H) + 윗면 (W x D)
  const pBack = new THREE.Object3D();
  pBack.position.set(0, 0, -halfD);
  const backGeo = new THREE.PlaneGeometry(W, H);
  backGeo.translate(0, H / 2, 0);
  const backMesh = new THREE.Mesh(backGeo, createFaceMaterial(0x60a5fa));
  backMesh.add(createEdgeLines(backGeo));
  pBack.add(backMesh);

  const pTop = new THREE.Object3D();
  pTop.position.set(0, H, 0);
  const topGeo = new THREE.PlaneGeometry(W, D);
  topGeo.translate(0, D / 2, 0);
  const topMesh = new THREE.Mesh(topGeo, createFaceMaterial(0x2563eb));
  topMesh.add(createEdgeLines(topGeo));
  pTop.add(topMesh);
  backMesh.add(pTop);
  currentShapeGroup.add(pBack);

  // 왼쪽면 (D x H)
  const pLeft = new THREE.Object3D();
  pLeft.position.set(-halfW, 0, 0);
  const leftGeo = new THREE.PlaneGeometry(D, H);
  leftGeo.rotateY(Math.PI / 2);
  leftGeo.translate(0, H / 2, 0);
  const leftMesh = new THREE.Mesh(leftGeo, createFaceMaterial(0x93c5fd));
  leftMesh.add(createEdgeLines(leftGeo));
  pLeft.add(leftMesh);
  currentShapeGroup.add(pLeft);

  // 오른쪽면 (D x H)
  const pRight = new THREE.Object3D();
  pRight.position.set(halfW, 0, 0);
  const rightGeo = new THREE.PlaneGeometry(D, H);
  rightGeo.rotateY(-Math.PI / 2);
  rightGeo.translate(0, H / 2, 0);
  const rightMesh = new THREE.Mesh(rightGeo, createFaceMaterial(0x93c5fd));
  rightMesh.add(createEdgeLines(rightGeo));
  pRight.add(rightMesh);
  currentShapeGroup.add(pRight);

  foldingAnimators.push((t) => {
    pFront.rotation.x = (Math.PI / 2) * (1 - t);
    pBack.rotation.x = -(Math.PI / 2) * (1 - t);
    pTop.rotation.x = -(Math.PI / 2) * t;
    pLeft.rotation.z = (Math.PI / 2) * (1 - t);
    pRight.rotation.z = -(Math.PI / 2) * (1 - t);
  });
}

// ----------------------------------------------------
// (3) 정사면체 / 삼각뿔 (Tetrahedron)
// ----------------------------------------------------
function buildTetrahedronModel() {
  const S = 3.0; // 한 변 길이
  const hTri = (Math.sqrt(3) / 2) * S; // 정삼각형 높이
  const rIn = hTri / 3; // 내접원 반경
  const rOut = (2 * hTri) / 3; // 외접원 반경

  // 1개 정삼각형 기하 생성 함수
  function createTriGeo() {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -S / 2, 0, -rIn,
      S / 2, 0, -rIn,
      0, 0, rOut
    ]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    return geo;
  }

  // 밑면
  const baseGeo = createTriGeo();
  const baseMesh = new THREE.Mesh(baseGeo, createFaceMaterial(0x10b981));
  baseMesh.add(createEdgeLines(baseGeo));
  currentShapeGroup.add(baseMesh);

  // 3개 옆면 피벗
  // 정사면체 이면각: arccos(1/3) = ~70.528도. 즉 평면(180도)에서 접히는 각도는 180 - 70.528 = 109.471도
  const foldMaxAngle = Math.PI - Math.acos(1 / 3);

  const pivots = [];
  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3;
    const pivot = new THREE.Object3D();
    // 힌지 위치: 정삼각형 각 변의 중점
    const midDist = rIn;
    pivot.position.set(
      Math.sin(angle) * midDist,
      0,
      Math.cos(angle) * midDist
    );
    pivot.rotation.y = angle;

    // 연결될 삼각형
    const sideGeo = new THREE.BufferGeometry();
    const sideVerts = new Float32Array([
      -S / 2, 0, 0,
      S / 2, 0, 0,
      0, 0, hTri
    ]);
    sideGeo.setAttribute('position', new THREE.BufferAttribute(sideVerts, 3));
    sideGeo.computeVertexNormals();

    const sideMesh = new THREE.Mesh(sideGeo, createFaceMaterial(0x34d399));
    sideMesh.add(createEdgeLines(sideGeo));
    pivot.add(sideMesh);

    currentShapeGroup.add(pivot);
    pivots.push(pivot);
  }

  foldingAnimators.push((t) => {
    pivots.forEach(p => {
      // 바깥쪽 평면(0) -> 안쪽으로 foldMaxAngle 만큼 접힘
      p.rotation.x = foldMaxAngle * t;
    });
  });

  // 실 궤적
  stringKeypointsGetter = () => {
    const pts = [];
    const pullApex = new THREE.Vector3(0, Math.sqrt(6) / 3 * S * tNormalized() + 0.8, 0);
    pivots.forEach(p => {
      const tip = new THREE.Vector3(0, 0, hTri);
      p.localToWorld(tip);
      pts.push(tip);
      pts.push(pullApex);
    });
    return { pts, pullApex };
  };
}

// ----------------------------------------------------
// (4) 육각기둥 (Hexagonal Prism)
// ----------------------------------------------------
function buildHexPrismModel() {
  const R = 1.4; // 육각형 외접 반경
  const H = 2.4; // 기둥 높이
  const S = R; // 정육각형 한 변 길이 = R
  const inR = (Math.sqrt(3) / 2) * R;

  // 바닥 육각형
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const x = Math.cos(a) * R;
    const y = Math.sin(a) * R;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const baseGeo = new THREE.ShapeGeometry(shape);
  baseGeo.rotateX(-Math.PI / 2);
  const baseMesh = new THREE.Mesh(baseGeo, createFaceMaterial(0x8b5cf6));
  baseMesh.add(createEdgeLines(baseGeo));
  currentShapeGroup.add(baseMesh);

  // 6개 옆면 직사각형
  const sidePivots = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 + Math.PI / 6;
    const pivot = new THREE.Object3D();
    pivot.position.set(Math.cos(a) * inR, 0, Math.sin(a) * inR);
    pivot.rotation.y = -a + Math.PI / 2;

    const wallGeo = new THREE.PlaneGeometry(S, H);
    wallGeo.translate(0, H / 2, 0);
    const wallMesh = new THREE.Mesh(wallGeo, createFaceMaterial(0xa78bfa));
    wallMesh.add(createEdgeLines(wallGeo));
    pivot.add(wallMesh);

    // 0번 옆면 위에 윗면 육각형 부착
    if (i === 0) {
      const topPivot = new THREE.Object3D();
      topPivot.position.set(0, H, 0);
      const topGeo = new THREE.ShapeGeometry(shape);
      topGeo.rotateX(-Math.PI / 2);
      topGeo.translate(0, 0, inR);
      const topMesh = new THREE.Mesh(topGeo, createFaceMaterial(0x7c3aed));
      topMesh.add(createEdgeLines(topGeo));
      topPivot.add(topMesh);
      wallMesh.add(topPivot);
      pivot.topPivot = topPivot;
    }

    currentShapeGroup.add(pivot);
    sidePivots.push(pivot);
  }

  foldingAnimators.push((t) => {
    sidePivots.forEach(p => {
      p.rotation.x = -(Math.PI / 2) * (1 - t);
      if (p.topPivot) {
        p.topPivot.rotation.x = -(Math.PI / 2) * t;
      }
    });
  });
}

// ----------------------------------------------------
// (5) 별 모양 육각뿔 (Hexagonal Pyramid) - DIY 주력 모델
// ----------------------------------------------------
function buildHexPyramidModel() {
  const R = 1.5; // 밑면 정육각형 반경
  const inR = (Math.sqrt(3) / 2) * R;
  const triH = 2.6; // 옆면 삼각형 높이
  const S = R; // 한 변 길이

  // 바닥 육각형
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const x = Math.cos(a) * R;
    const y = Math.sin(a) * R;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const baseGeo = new THREE.ShapeGeometry(shape);
  baseGeo.rotateX(-Math.PI / 2);
  const baseMesh = new THREE.Mesh(baseGeo, createFaceMaterial(0xf43f5e));
  baseMesh.add(createEdgeLines(baseGeo));
  currentShapeGroup.add(baseMesh);

  // 6개 이등변삼각형 (별 모양 날개)
  const triPivots = [];
  const maxFoldAngle = Math.acos(inR / triH); // 입체로 완전히 닫힐 때 수직 대비 각도

  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 + Math.PI / 6;
    const pivot = new THREE.Object3D();
    pivot.position.set(Math.cos(a) * inR, 0, Math.sin(a) * inR);
    pivot.rotation.y = -a + Math.PI / 2;

    const triGeo = new THREE.BufferGeometry();
    const verts = new Float32Array([
      -S / 2, 0, 0,
      S / 2, 0, 0,
      0, 0, triH
    ]);
    triGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    triGeo.computeVertexNormals();

    const triMesh = new THREE.Mesh(triGeo, createFaceMaterial(0xfb7185));
    triMesh.add(createEdgeLines(triGeo));
    pivot.add(triMesh);

    currentShapeGroup.add(pivot);
    triPivots.push(pivot);
  }

  foldingAnimators.push((t) => {
    // 0: 평면 (바닥에 완전히 누움), 1: 3D 뿔로 모임
    const foldAngle = (Math.PI / 2 + maxFoldAngle) * t;
    triPivots.forEach(p => {
      p.rotation.x = foldAngle;
    });
  });

  // 실 꿰기(String) 궤적: 6개 꼭짓점을 차례로 통과하여 위쪽 손잡이로 수렴
  stringKeypointsGetter = () => {
    const pts = [];
    const pullApex = new THREE.Vector3(0, Math.sqrt(triH * triH - inR * inR) + 0.8 * (2 - tension), 0);
    const tips = [];
    triPivots.forEach(p => {
      const tip = new THREE.Vector3(0, 0, triH);
      p.localToWorld(tip);
      tips.push(tip);
    });

    // 6개 꼭짓점을 순환 연결하고 중앙 손잡이로 모임
    for (let i = 0; i < tips.length; i++) {
      pts.push(tips[i]);
      pts.push(tips[(i + 1) % tips.length]);
      // 중앙 손잡이와 연결
      pts.push(tips[i]);
      pts.push(pullApex);
    }
    return { pts, pullApex };
  };
}

// ----------------------------------------------------
// (6) 원기둥 (Cylinder - 곡면 힌지 체인)
// ----------------------------------------------------
function buildCylinderModel() {
  const r = 1.0;
  const H = 2.2;
  const segments = 24; // 곡면 분할 수
  const circumference = 2 * Math.PI * r;
  const segW = circumference / segments;
  const dTheta = (2 * Math.PI) / segments;

  // 세그먼트 체인 루트
  const rootChain = new THREE.Object3D();
  rootChain.position.set(-circumference / 2, 0, 0);
  currentShapeGroup.add(rootChain);

  let currentParent = rootChain;
  const segmentJoints = [];

  for (let i = 0; i < segments; i++) {
    const joint = new THREE.Object3D();
    if (i > 0) joint.position.set(segW, 0, 0);

    const segGeo = new THREE.PlaneGeometry(segW, H);
    segGeo.translate(segW / 2, H / 2, 0);
    const segMesh = new THREE.Mesh(segGeo, createFaceMaterial(0x0284c7));
    segMesh.add(createEdgeLines(segGeo, 0x38bdf8));
    joint.add(segMesh);

    currentParent.add(joint);
    segmentJoints.push(joint);
    currentParent = joint;
  }

  // 상/하 원형 밑면
  const circleGeo = new THREE.CircleGeometry(r, 32);
  circleGeo.rotateX(-Math.PI / 2);

  const bottomCircle = new THREE.Mesh(circleGeo, createFaceMaterial(0x0369a1));
  bottomCircle.position.set(0, 0, -r);
  bottomCircle.add(createEdgeLines(circleGeo));
  currentShapeGroup.add(bottomCircle);

  const topCirclePivot = new THREE.Object3D();
  topCirclePivot.position.set(0, H, 0);
  const topCircle = new THREE.Mesh(circleGeo, createFaceMaterial(0x0369a1));
  topCircle.position.set(0, 0, -r);
  topCircle.add(createEdgeLines(circleGeo));
  topCirclePivot.add(topCircle);
  currentShapeGroup.add(topCirclePivot);

  foldingAnimators.push((t) => {
    // 세그먼트들이 dTheta * t 만큼 각각 꺾이며 원으로 말림
    segmentJoints.forEach((joint, idx) => {
      if (idx > 0) {
        joint.rotation.y = -dTheta * t;
      }
    });

    // 전체 중심 보정
    rootChain.position.x = -circumference / 2 * (1 - t);
    rootChain.position.z = r * t;

    // 밑면 원 위치 동기화
    bottomCircle.position.z = -r * (1 - t);
    topCirclePivot.position.y = H * t;
    topCirclePivot.position.z = -r * (1 - t);
  });
}

function tNormalized() {
  return tension;
}

// ==========================================
// 5. 가이드 실(Pull-String) 렌더링 갱신
// ==========================================
function updateStringMesh() {
  if (!stringKeypointsGetter) {
    if (stringMesh) stringMesh.visible = false;
    return;
  }

  const { pts, pullApex } = stringKeypointsGetter();
  if (!pts || pts.length === 0) return;

  const positions = new Float32Array(pts.length * 3);
  for (let i = 0; i < pts.length; i++) {
    positions[i * 3] = pts[i].x;
    positions[i * 3 + 1] = pts[i].y;
    positions[i * 3 + 2] = pts[i].z;
  }

  if (!stringMesh) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: palette.string,
      linewidth: 3,
      transparent: true,
      opacity: 0.95
    });
    stringMesh = new THREE.LineSegments(geo, mat);
    scene.add(stringMesh);
  } else {
    stringMesh.visible = true;
    stringMesh.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    stringMesh.geometry.attributes.position.needsUpdate = true;
  }
}

// ==========================================
// 6. 텐션 갱신 & UI 바인딩
// ==========================================
function updateTension(val) {
  tension = Math.max(0, Math.min(1, val));
  foldingAnimators.forEach(anim => anim(tension));
  updateStringMesh();

  // 슬라이더 및 텍스트 동기화
  const slider = document.getElementById('tension-slider');
  const percentLabel = document.getElementById('tension-percent');
  const statusText = document.getElementById('status-text');

  if (slider && parseFloat(slider.value) !== Math.round(tension * 100)) {
    slider.value = tension * 100;
  }
  if (percentLabel) {
    percentLabel.textContent = `${Math.round(tension * 100)}%`;
  }

  if (statusText) {
    if (tension <= 0.05) {
      statusText.textContent = '평면 전개도 (0%) - 실을 당겨보세요!';
    } else if (tension >= 0.95) {
      statusText.textContent = '🎉 3D 입체도형 완성 (100%)!';
    } else {
      statusText.textContent = `실 당기는 중 (${Math.round(tension * 100)}%) - 면이 맞물립니다!`;
    }
  }
}

// ==========================================
// 7. 메인 렌더 루프
// ==========================================
function animate() {
  requestAnimationFrame(animate);

  // 자동 재생 애니메이션 처리
  if (isPlaying) {
    let nextTension = tension + playDirection * 0.012;
    if (nextTension >= 1.0) {
      nextTension = 1.0;
      playDirection = -1;
    } else if (nextTension <= 0.0) {
      nextTension = 0.0;
      playDirection = 1;
    }
    updateTension(nextTension);
  }

  controls.update();
  renderer.render(scene, camera);
}

// ==========================================
// 8. UI 이벤트 핸들러 & 사이드바 데이터 갱신
// ==========================================
function updateUIInfo(shapeKey) {
  const data = SHAPE_DATA[shapeKey];
  if (!data) return;

  document.getElementById('explore-unit').textContent = data.unit;
  document.getElementById('explore-title').textContent = data.name;
  document.getElementById('explore-desc').textContent = data.desc;
  document.getElementById('metric-faces').textContent = data.faces;
  document.getElementById('metric-edges').textContent = data.edges;
  document.getElementById('metric-vertices').textContent = data.vertices;
  document.getElementById('formula-title').textContent = data.formulaTitle;
  document.getElementById('formula-math').textContent = data.formulaMath;
  document.getElementById('formula-desc').textContent = data.formulaDesc;

  const tipsUl = document.getElementById('explore-tips');
  tipsUl.innerHTML = '';
  data.tips.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    tipsUl.appendChild(li);
  });
}

function setupEventListeners() {
  // 1. 도형 선택 버튼들
  const shapeButtons = document.querySelectorAll('.shape-btn');
  shapeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      shapeButtons.forEach(b => {
        b.classList.remove('active', 'bg-amber-500', 'text-slate-950');
        b.classList.add('bg-slate-700/70', 'text-slate-200');
      });
      btn.classList.add('active', 'bg-amber-500', 'text-slate-950');
      btn.classList.remove('bg-slate-700/70', 'text-slate-200');

      const shape = btn.getAttribute('data-shape');
      tension = 0;
      buildShape(shape);
    });
  });

  // 2. 텐션 슬라이더
  const slider = document.getElementById('tension-slider');
  slider.addEventListener('input', (e) => {
    isPlaying = false;
    updatePlayButton();
    updateTension(parseFloat(e.target.value) / 100);
  });

  // 3. 빠른 펼치기 / 접기
  document.getElementById('btn-unfold').addEventListener('click', () => {
    isPlaying = false;
    updatePlayButton();
    smoothTransitionTo(0);
  });
  document.getElementById('btn-fold').addEventListener('click', () => {
    isPlaying = false;
    updatePlayButton();
    smoothTransitionTo(1);
  });

  // 4. 자동 재생 버튼
  const playBtn = document.getElementById('btn-play');
  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    updatePlayButton();
  });

  // 5. 카메라 뷰 버튼들
  document.getElementById('view-top').addEventListener('click', () => {
    controls.reset();
    camera.position.set(0, 11, 0.001);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
  });
  document.getElementById('view-iso').addEventListener('click', () => {
    controls.reset();
    camera.position.set(7, 6, 7);
    camera.lookAt(0, 0.6, 0);
    controls.target.set(0, 0.6, 0);
  });
  document.getElementById('view-reset').addEventListener('click', () => {
    controls.reset();
    camera.position.set(0, 7.5, 9);
    camera.lookAt(0, 0.6, 0);
    controls.target.set(0, 0.6, 0);
  });

  // 6. X-ray 투시 토글
  const xrayBtn = document.getElementById('btn-xray');
  xrayBtn.addEventListener('click', () => {
    isXray = !isXray;
    document.getElementById('xray-label').textContent = `X-Ray 투시: ${isXray ? 'ON' : 'OFF'}`;
    buildShape(currentShapeKey);
  });

  // 7. 모드 탭 전환 (탐구 / 퀴즈 / DIY)
  const tabExplore = document.getElementById('mode-explore');
  const tabQuiz = document.getElementById('mode-quiz');
  const tabDiy = document.getElementById('mode-diy');

  const panelExplore = document.getElementById('panel-explore');
  const panelQuiz = document.getElementById('panel-quiz');
  const panelDiy = document.getElementById('panel-diy');

  function switchTab(activeBtn, showPanel) {
    [tabExplore, tabQuiz, tabDiy].forEach(b => {
      b.classList.remove('bg-indigo-600', 'text-white', 'shadow');
      b.classList.add('text-slate-300');
    });
    activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow');
    activeBtn.classList.remove('text-slate-300');

    [panelExplore, panelQuiz, panelDiy].forEach(p => p.classList.add('hidden'));
    showPanel.classList.remove('hidden');
  }

  tabExplore.addEventListener('click', () => switchTab(tabExplore, panelExplore));
  tabQuiz.addEventListener('click', () => {
    switchTab(tabQuiz, panelQuiz);
    startQuiz();
  });
  tabDiy.addEventListener('click', () => switchTab(tabDiy, panelDiy));

  // 8. DIY 도안 인쇄 & SVG 다운로드
  document.getElementById('btn-print-pattern').addEventListener('click', printPatternSVG);
  document.getElementById('btn-download-svg').addEventListener('click', downloadPatternSVG);
}

function updatePlayButton() {
  const icon = document.getElementById('play-icon');
  if (isPlaying) {
    icon.className = 'ph-fill ph-pause';
  } else {
    icon.className = 'ph-fill ph-play';
  }
}

function smoothTransitionTo(targetVal) {
  const startVal = tension;
  const startTime = performance.now();
  const duration = 600; // ms

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    // easeInOutQuad
    const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    updateTension(startVal + (targetVal - startVal) * ease);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

// ==========================================
// 9. 인터랙티브 퀴즈 로직
// ==========================================
let currentQuizIdx = 0;
let quizScore = 0;

function startQuiz() {
  currentQuizIdx = 0;
  quizScore = 0;
  document.getElementById('quiz-score').textContent = `점수: 0 / ${QUIZ_LIST.length}`;
  loadQuizQuestion(currentQuizIdx);
}

function loadQuizQuestion(index) {
  const quiz = QUIZ_LIST[index];
  document.getElementById('quiz-step').textContent = `QUESTION ${index + 1} OF ${QUIZ_LIST.length}`;
  document.getElementById('quiz-question').textContent = quiz.question;

  // 3D 뷰를 해당 도형의 전개도 상태(0%) 및 상단 뷰로 자동 세팅
  const shapeBtn = document.querySelector(`[data-shape="${quiz.shapeKey}"]`);
  if (shapeBtn) shapeBtn.click();
  updateTension(0);

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = '';
  document.getElementById('quiz-feedback').classList.add('hidden');

  quiz.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.className = 'w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between group';
    btn.innerHTML = `
      <span>${optIdx + 1}. ${optText}</span>
      <i class="ph-bold ph-caret-right text-slate-500 group-hover:text-amber-400"></i>
    `;
    btn.addEventListener('click', () => handleQuizAnswer(optIdx, quiz));
    optionsContainer.appendChild(btn);
  });
}

function handleQuizAnswer(selectedIdx, quiz) {
  const isCorrect = (selectedIdx === quiz.answer);
  const feedback = document.getElementById('quiz-feedback');
  const resultTitle = document.getElementById('quiz-result-title');
  const resultDesc = document.getElementById('quiz-result-desc');

  if (isCorrect) {
    quizScore++;
    feedback.className = 'p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 flex flex-col gap-2';
    resultTitle.innerHTML = '<i class="ph-bold ph-check-circle text-lg"></i> 정답입니다! 축하합니다!';
  } else {
    feedback.className = 'p-4 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 flex flex-col gap-2';
    resultTitle.innerHTML = '<i class="ph-bold ph-x-circle text-lg"></i> 아쉽네요! 정답을 확인해보세요.';
  }

  resultDesc.textContent = quiz.explanation;
  feedback.classList.remove('hidden');
  document.getElementById('quiz-score').textContent = `점수: ${quizScore} / ${QUIZ_LIST.length}`;

  // 정답 맞춤과 동시에 실을 당겨 3D 입체도형 완성 애니메이션 연출!
  smoothTransitionTo(1);

  // 다음 문제 버튼
  const nextBtn = document.getElementById('btn-next-quiz');
  if (currentQuizIdx < QUIZ_LIST.length - 1) {
    nextBtn.textContent = '다음 문제 풀기 →';
    nextBtn.onclick = () => {
      currentQuizIdx++;
      loadQuizQuestion(currentQuizIdx);
    };
  } else {
    nextBtn.textContent = '퀴즈 처음부터 다시하기 ↺';
    nextBtn.onclick = () => startQuiz();
  }
}

// ==========================================
// 10. DIY 별모양 육각뿔 전개도 SVG 생성 & 인쇄
// ==========================================
function generateHexPyramidSVG() {
  const width = 600;
  const height = 600;
  const cx = 300;
  const cy = 300;
  const R = 80;
  const triH = 170;

  let hexPoints = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    hexPoints.push({
      x: cx + R * Math.cos(a),
      y: cy + R * Math.sin(a)
    });
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
    <style>
      .cut-line { stroke: #000; stroke-width: 2; fill: #fef08a; }
      .fold-line { stroke: #4f46e5; stroke-width: 1.5; stroke-dasharray: 4,4; fill: none; }
      .punch-hole { fill: #ef4444; stroke: #000; stroke-width: 1; }
      .label-text { font-family: Pretendard, sans-serif; font-size: 11px; fill: #1e293b; font-weight: bold; }
    </style>
    <rect width="${width}" height="${height}" fill="#ffffff" />
    <text x="30" y="40" font-size="16" font-weight="bold" fill="#0f172a">★ 매직 입체도형 DIY: 별모양 육각뿔 실습 전개도</text>
    <text x="30" y="60" font-size="11" fill="#64748b">실선: 가위로 오리기 | 점선: 접는 선 길들이기 | 빨간 원: 1공 펀치 구멍</text>
  `;

  // 6개 이등변삼각형 날개
  for (let i = 0; i < 6; i++) {
    const p1 = hexPoints[i];
    const p2 = hexPoints[(i + 1) % 6];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const angle = ((i * 2 + 1) * Math.PI) / 6;
    const tipX = cx + (R + triH) * Math.cos(angle);
    const tipY = cy + (R + triH) * Math.sin(angle);

    // 날개 외곽선 (자르는 선)
    svg += `<polygon points="${p1.x},${p1.y} ${tipX},${tipY} ${p2.x},${p2.y}" class="cut-line" />`;
    // 접는 선
    svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="fold-line" />`;
    // 꼭짓점 펀치 구멍 (빨간색)
    svg += `<circle cx="${tipX}" cy="${tipY}" r="5" class="punch-hole" />`;
    svg += `<text x="${tipX - 12}" y="${tipY - 8}" class="label-text">구멍 ${i + 1}</text>`;
  }

  // 중앙 정육각형 밑면
  const hexStr = hexPoints.map(p => `${p.x},${p.y}`).join(' ');
  svg += `<polygon points="${hexStr}" fill="#fde047" stroke="#4f46e5" stroke-dasharray="4,4" stroke-width="2" />`;
  svg += `<text x="${cx - 24}" y="${cy + 4}" class="label-text" font-size="14">밑면(정육각형)</text>`;

  svg += `</svg>`;
  return svg;
}

function printPatternSVG() {
  const printArea = document.getElementById('print-area');
  printArea.innerHTML = generateHexPyramidSVG();
  window.print();
}

function downloadPatternSVG() {
  const svgContent = generateHexPyramidSVG();
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '매직_입체도형_별모양_육각뿔_전개도.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 초기화 진입점
window.addEventListener('DOMContentLoaded', () => {
  initThree();
  setupEventListeners();
});
