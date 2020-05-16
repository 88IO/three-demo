const view = () => {
  // サイト幅, 高さの取得
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラ作成, DOM追加
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0xf3f3f3, 1.0);
  renderer.gammaOutput = true;
  document.body.appendChild(renderer.domElement);

  // シーン, カメラ, ライトの追加
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300);
  camera.position.set(0, 1, 5);
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  // メッシュ追加
  const grid = new THREE.GridHelper(10, 5);
  // const sphere = new THREE.Mesh(
  //   new THREE.SphereGeometry(1),
  //   new THREE.MeshPhongMaterial({color: 0x0074df})
  // );
  // sphere.position.set(0, 1, 0);
  scene.add(grid);
  const loader = new THREE.GLTFLoader();
  const model = '/model/glasses.glb';
  loader.load(model, (data) => {
    const gltf = data;
    const obj = gltf.scene;
    scene.add(obj);
  });

  // OrbitControlsの追加
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.userPan = false;
  controls.userPanSpeed = 0.0;
  controls.maxDistance = 5000.0;
  controls.maxPolarAngle = Math.PI * 0.5;
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
