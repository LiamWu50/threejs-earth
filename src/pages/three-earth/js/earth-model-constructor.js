import * as THREE from "three";
import EarthSceneConfig from "../../../config/scene-config";

/**
 * 构造地球模型
 * @param {THREE.Scene} threeScene
 */
export default function loadEarthModel(threeScene) {
  const texture = new THREE.TextureLoader().load("/source/earth3.jpeg");
  const { earthRadius } = EarthSceneConfig;
  const globeGgeometry = new THREE.SphereGeometry(earthRadius, 96, 96);
  const globeMaterial = new THREE.MeshStandardMaterial({ map: texture });
  const globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
  threeScene.add(globeMesh);
}
