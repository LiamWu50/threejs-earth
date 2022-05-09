import * as THREE from "three";
import { cityList, bizLines } from "@/config/index";
import EarthSceneConfig from "@/config/scene-config";
import dynamicApertureImage from "@/assets/images/three-earth/apertur.png";

/**
 * 加载动态光圈
 * @param {THREE.Scene} threeScene
 */
export default function loadDynamicAperture(threeScene) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(dynamicApertureImage);
  const waveMeshArr = [];
  const group = new THREE.Group();

  for (const key in cityList) {
    const city = cityList[key];
    const pos = lon2xyz(
      EarthSceneConfig.earthRadius,
      city.longitude,
      city.latitude
    );
    const mesh = createPointMesh(pos, texture);
    waveMeshArr.push(mesh);
    group.add(mesh);
  }
  animate(waveMeshArr);
  threeScene.add(group);
  return group;
}

function createPointMesh(pos, texture) {
  const planGeometry = new THREE.PlaneBufferGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x22ffcc,
    transparent: true, //使用背景透明的png贴图，注意开启透明计算
    // side: THREE.DoubleSide, //双面可见
    depthWrite: false, //禁止写入深度缓冲区数据
  });
  const mesh = new THREE.Mesh(planGeometry, material);
  const size = EarthSceneConfig.earthRadius * 0.08; //矩形平面Mesh的尺寸
  mesh.size = size;
  mesh.scale.set(size, size, size); //设置mesh大小
  mesh._s = Math.random() * 1.0 + 1.0;
  mesh.position.set(pos.x, pos.y, pos.z);
  // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
  const coordVec3 = new THREE.Vector3(pos.x, pos.y, pos.z).normalize();
  // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
  const meshNormal = new THREE.Vector3(0, 0, 1);
  // 四元数属性.quaternion表示mesh的角度状态
  //.setFromUnitVectors();计算两个向量之间构成的四元数值
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
  return mesh;
}

function cityWaveAnimate(waveMeshArr) {
  // 所有波动光圈都有自己的透明度和大小状态
  // 一个波动光圈透明度变化过程是：0~1~0反复循环
  waveMeshArr.forEach((mesh) => {
    mesh._s += 0.007;
    mesh.scale.set(
      mesh.size * mesh._s,
      mesh.size * mesh._s,
      mesh.size * mesh._s
    );
    if (mesh._s <= 1.5) {
      mesh.material.opacity = (mesh._s - 1) * 2; //2等于1/(1.5-1.0)，保证透明度在0~1之间变化
    } else if (mesh._s > 1.5 && mesh._s <= 2) {
      mesh.material.opacity = 1 - (mesh._s - 1.5) * 2; //2等于1/(2.0-1.5) mesh缩放2倍对应0 缩放1.5被对应1
    } else {
      mesh._s = 1.0;
    }
  });
}

function animate(waveMeshArr) {
  window.requestAnimationFrame(() => {
    cityWaveAnimate(waveMeshArr);
    animate(waveMeshArr);
  });
}

// 经纬度转地球坐标
function lon2xyz(radius, longitude, latitude) {
  let lon = (longitude * Math.PI) / 180; //转弧度值
  const lat = (latitude * Math.PI) / 180; //转弧度值
  lon = -lon; // three.js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  const x = radius * Math.cos(lat) * Math.cos(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return new THREE.Vector3(x, y, z);
}
