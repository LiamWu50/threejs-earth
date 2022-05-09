import * as THREE from "three";
import chinaJson from "@/assets/json/中华人民共和国.json";
import EarthSceneConfig from "@/config/scene-config";

/**
 * 加载中国边界范围线
 * @param {THREE.Scene} threeScene
 */
export default function laodChinaBoundry(threeScene) {
  // 遍历省份构建模型
  chinaJson.features.forEach((elem) => {
    // 新建一个省份容器：用来存放省份对应的模型和轮廓线
    const province = new THREE.Object3D();
    const coordinates = elem.geometry.coordinates;
    coordinates.forEach((multiPolygon) => {
      multiPolygon.forEach((polygon) => {
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xf19553 }); //0x3BFA9E
        const positions = [];
        const linGeometry = new THREE.BufferGeometry();
        // console.log(polygon);
        // for (let i = 0; i < polygon.length; i++) {
        const pos = lglt2xyz(
          EarthSceneConfig.earthRadius,
          polygon[0],
          polygon[1]
        );
        // console.log(pos);
        positions.push(pos.x, pos.y, pos.z);
        // }
        linGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        const line = new THREE.Line(linGeometry, lineMaterial);
        province.add(line);
      });
    });
    threeScene.add(province);
  });
}

// 经纬度转地球坐标
function lglt2xyz(radius, longitude, latitude) {
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
