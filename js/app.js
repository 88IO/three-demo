const view = () => {
  // サイト幅, 高さの取得
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラ作成, DOM追加
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0x777777, 1.0);
  renderer.gammaOutput = true;
  document.body.appendChild(renderer.domElement);

  // シーン, カメラ, ライトの追加
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300);
  camera.position.set(0, 1, 5);
  const ambientLight = new THREE.AmbientLight(0xf0f0f0, 1);
  const directLight = new THREE.DirectionalLight(0xffffff, 1)
  scene.add(ambientLight, directLight);

  // ヘルパー追加
  const axisHelper = new THREE.AxisHelper(10);
  scene.add(axisHelper);

  // メッシュ追加
  const grid = new THREE.GridHelper(30, 3);
  scene.add(grid);

  // 3Dオブジェクト追加
  const loader = new THREE.GLTFLoader();
  const model = '/three-demo/model/glasses.glb';
  loader.load(model, (data) => {
    const gltf = data;
    const obj = gltf.scene;
    scene.add(obj);
  });

  // OrbitControlsの追加
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.userPan = false;
  controls.userPanSpeed = 0.0;
  controls.maxDistance = 300.0;
  controls.maxPolarAngle = Math.PI;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  // レンダリング
  const animation = () => {
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(animation);
  };

  animation();
}
