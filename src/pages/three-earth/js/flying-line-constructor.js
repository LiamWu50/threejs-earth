import * as THREE from "three";
import EarthSceneConfig from "../../../config/scene-config";
import { cityList, bizLines } from "../../../config/index";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { Line2 } from "three/examples/jsm/lines/Line2";

/**
 * 加载城市之间的飞线
 * @param {THREE.Scene} scene
 */
export default function loadFlyingLine(scene) {
  for (const key in bizLines) {
    const bizLine = bizLines[key];
    const fromCity = cityList[bizLine.from];
    const v0 = lon2xyz(
      EarthSceneConfig.earthRadius,
      fromCity.longitude,
      fromCity.latitude
    );
    bizLine.to.forEach((city) => {
      const toCity = cityList[city];
      const v3 = lon2xyz(
        EarthSceneConfig.earthRadius,
        toCity.longitude,
        toCity.latitude
      );
      const { curve, lineMesh } = addLines(v0, v3);
      scene.add(lineMesh);
    });
  }
}

function addLines(v0, v3) {
  // 夹角
  const angle = (v0.angleTo(v3) * 5) / Math.PI / 0.1; // 0 ~ Math.PI
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
  for (let j = 0; j < points.length; j++) {
    // color.setHSL( .31666+j*0.005,0.7, 0.7); //绿色
    color.setHSL(0.81666 + j, 0.88, 0.715 + j * 0.0025); //粉色
    colors.push(color.r, color.g, color.b);
    positions.push(points[j].x, points[j].y, points[j].z);
  }
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
