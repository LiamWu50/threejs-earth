import * as THREE from "three";
import EarthSceneConfig from "../../../config/scene-config";
import { cityList, bizLines } from "../../../config/index";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { Line2 } from "three/examples/jsm/lines/Line2";

/**
 * 加载城市之间的飞线
 * @param {THREE.Scene} threeScene
 */
export default function loadFlyingLine(threeScene) {
  const { earthRadius } = EarthSceneConfig;
  const animateDots = []
  const group = new THREE.Group()

  for (const key in bizLines) {
    const fromCity = cityList[bizLines[key].from];
    const v0 = lon2xyz(earthRadius, fromCity.longitude, fromCity.latitude);

    bizLines[key].to.forEach((city) => {
      const toCity = cityList[city];
      const v3 = lon2xyz(earthRadius, toCity.longitude, toCity.latitude);
      const { curve, lineMesh } = addLines(v0, v3);
      animateDots.push(curve)
      group.add(lineMesh)
    });
  }

  const aGroup = loadFlyingBlock(animateDots, threeScene);
  aGroup.children.forEach(item=> {
    group.add(item)
  })

  threeScene.add(group);
  return group
}

function addLines(v0, v3) {
  // 夹角
  const angle = (v0.angleTo(v3) * 3) / Math.PI / 0.1; // 0 ~ Math.PI
  const aLen = angle * 0.4,
    hLen = angle * angle * 12;
  const p0 = new THREE.Vector3(0, 0, 0);
  // 法线向量
  const rayLine = new THREE.Ray(p0, getVCenter(v0.clone(), v3.clone()));
  // 顶点坐标
  const vtop = rayLine.at(
    hLen / rayLine.at(1, new THREE.Vector3()).distanceTo(p0),
    new THREE.Vector3()
  );
  // 控制点坐标
  const v1 = getLenVcetor(v0.clone(), vtop, aLen);
  const v2 = getLenVcetor(v3.clone(), vtop, aLen);

  // 绘制三维三次贝赛尔曲线
  const curve = new THREE.CubicBezierCurve3(v0, v1, v2, v3);
  const geometry = new LineGeometry();
  const points = curve.getPoints(50);
  const positions = [];
  const colors = [];
  const color = new THREE.Color();

  /**
   * HSL中使用渐变
   * h — hue value between 0.0 and 1.0
   * s — 饱和度 between 0.0 and 1.0
   * l — 亮度 between 0.0 and 1.0
   */
  points.forEach((point, i) => {
    // color.setHSL(0.31666 + i * 0.005, 0.7, 0.7); //绿色
    color.setHSL(0.81666 + i, 0.88, 0.715 + i * 0.0025); //粉色
    colors.push(color.r, color.g, color.b);
    positions.push(point.x, point.y, point.z);
  });
  geometry.setPositions(positions);
  geometry.setColors(colors);
  const matLine = new LineMaterial({
    linewidth: 0.001,
    vertexColors: true,
    dashed: false,
  });

  return {
    curve: curve,
    lineMesh: new Line2(geometry, matLine),
  };
}

/**
 * 加载飞行的块
 * @param {Array} animateDots
 */
function loadFlyingBlock(animateDots, threeScene) {
  const aGroup = new THREE.Group()
  for (let i = 0; i < animateDots.length; i++) {
    const aGeo = new THREE.SphereGeometry(0.03, 0.03, 0.03);
    const aMater = new THREE.MeshPhongMaterial({ color: "#F8D764" });
    const aMesh = new THREE.Mesh(aGeo, aMater);
    aGroup.add(aMesh);
  }
  let vIndex = 0;
  function animateLine() {
    aGroup.children.forEach((ele, index) => {
      const v = animateDots[index].getPoints(100)[vIndex];
      ele.position.set(v.x, v.y, v.z);
    });
    vIndex++;
    if (vIndex > 100) {
      vIndex = 0;
    }
    setTimeout(animateLine, 20);
  }
  threeScene.add(aGroup)
  animateLine();

  return aGroup
}

//求两点中的中点 : 将两个向量相加然后除以二
function getVCenter(v1, v2) {
  const v = v1.add(v2);
  return v.divideScalar(2);
}

//获取两点间指定比例位置坐标
function getLenVcetor(v1, v2, len) {
  //两点间的距离
  const v1v2Len = v1.distanceTo(v2);
  return v1.lerp(v2, len / v1v2Len);
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
