import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import loadStarryScene from "./starry-scene-constructor";
import loadEarthModel from "./earth-model-constructor";
import loadSatelliteOrbit from "./satellite-orbit-constructor";
import loadDynamicAperture from "./dynamic-aperture-constructor";
import loadFlyingLine from "./flying-line-constructor";
<<<<<<< HEAD
import laodChinaBoundry from "./chinae-boundry-constructor";
=======
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc

/**
 * Three场景构建工具
 */
export default new (class ThreeSceneConstructorHelper {
  constructor() {
    this._renderer = null;
    this._camera = null;
    this._scene = null;
    this._light = null;
    this._controls = null;
<<<<<<< HEAD
    //各类加载的对象
    this._satelliteOrbiGroup = null
    this._earthMesh = null
    this._dynamicApertureGroup = null
    this._flyingLineGroup = null
=======
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc
  }

  get initThreeScene() {
    return this._initThreeScene;
  }

  get loadSceneModel() {
    return this._loadSceneModel;
  }

  /**
   * @description 初始化整个场景
   */
  _initThreeScene() {
    this._initRenderer();
    this._initCamera();
    this._initScene();
    this._initControls();
    this._initLight();
<<<<<<< HEAD
    this._loadSceneModel()
=======
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc
    this._animate();

    window.addEventListener("resize", this._onWindowResize.bind(this), false);

    return {
      renderer: this._renderer,
      camera: this._camera,
      scene: this._scene,
      light: this._light,
      controls: this._controls,
    };
  }

  /**
   * 加载场景各种模型
   */
  _loadSceneModel() {
    //加载星空背景
    loadStarryScene(this._scene);
    //加载地球模型
<<<<<<< HEAD
    this._earthMesh = loadEarthModel(this._scene);
    //加载卫星环绕效果
    this._satelliteOrbiGroup = loadSatelliteOrbit(this._scene);
    //加载动态光圈
    this._dynamicApertureGroup = loadDynamicAperture(this._scene);
    //加载城市飞线
    this._flyingLineGroup = loadFlyingLine(this._scene);
    //加载中国区划边界
    // laodChinaBoundry(this._scene);
=======
    loadEarthModel(this._scene);
    //加载卫星环绕效果
    loadSatelliteOrbit(this._scene);
    //加载动态光圈
    loadDynamicAperture(this._scene);
    //加载城市飞线
    loadFlyingLine(this._scene);
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc
  }

  /**
   * @description 初始化渲染场景
   */
  _initRenderer() {
    const containerDom = document.querySelector("#container");
    const width = containerDom.clientWidth,
      height = containerDom.clientHeight;
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(width, height);
    containerDom.appendChild(this._renderer.domElement);
  }

  /**
   * @description 初始化相机
   */
  _initCamera() {
    const containerDom = document.querySelector("#container");
    const width = containerDom.clientWidth,
      height = containerDom.clientHeight;
    this._camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
<<<<<<< HEAD
    this._camera.position.set(5, -20, 20);
=======
    this._camera.position.set(5, -20, 50);
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc
    this._camera.lookAt(0, 3, 0);
  }

  /**
   * @description 初始化场景
   */
  _initScene() {
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0x020924);
    this._scene.fog = new THREE.Fog(0x020924, 200, 1000);
  }

  /**
   * 初始化用户交互
   **/
  _initControls() {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.enableDamping = true;
    this._controls.enableZoom = true;
    this._controls.autoRotate = false;
    this._controls.autoRotateSpeed = 2;
    this._controls.enablePan = true;
  }

  /**
   * @description 初始化光
   */
  _initLight() {
    const ambientLight = new THREE.AmbientLight(0xcccccc, 1.1);
    this._scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(1, 0.1, 0).normalize();
    let directionalLight2 = new THREE.DirectionalLight(0xff2ffff, 0.2);
    directionalLight2.position.set(1, 0.1, 0.1).normalize();
    this._scene.add(directionalLight);
    this._scene.add(directionalLight2);
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
    hemiLight.position.set(0, 1, 0);
    this._scene.add(hemiLight);
    let directionalLight3 = new THREE.DirectionalLight(0xffffff);
    directionalLight3.position.set(1, 500, -20);
    directionalLight3.castShadow = true;
    directionalLight3.shadow.camera.top = 18;
    directionalLight3.shadow.camera.bottom = -10;
    directionalLight3.shadow.camera.left = -52;
    directionalLight3.shadow.camera.right = 12;
    this._scene.add(directionalLight3);
  }

  /**
   * 窗口变动
   **/
  _onWindowResize() {
    this._camera.aspect = innerWidth / innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(innerWidth, innerHeight);
    this._renders();
  }

  /**
   * @description 渲染
   */
  _renders() {
    this._renderer.clear();
    this._renderer.render(this._scene, this._camera);
  }

  /**
   * 更新
   **/
  _animate() {
    window.requestAnimationFrame(() => {
      if (this._controls) this._controls.update();
<<<<<<< HEAD
      this._satelliteOrbiGroup.rotation.z = this._satelliteOrbiGroup.rotation.z + 0.01;
      this._earthMesh.rotation.y = this._earthMesh.rotation.y + 0.001;
      this._dynamicApertureGroup.rotation.y = this._dynamicApertureGroup.rotation.y + 0.001;
      this._flyingLineGroup.rotation.y = this._flyingLineGroup.rotation.y + 0.001;

=======
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc
      this._renders();
      this._animate();
    });
  }
})();
