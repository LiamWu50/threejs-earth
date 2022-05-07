import * as THREE from "three";
import EarthSceneConfig from "../../../config/scene-config";

/**
 * 构造地球模型
 * @param {THREE.Scene} threeScene
 */
export default function loadEarthModel(threeScene) {
<<<<<<< HEAD
  const texture = new THREE.TextureLoader().load("/source/earth.png");
=======
  const texture = new THREE.TextureLoader().load("/source/earth3.jpeg");
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc
  const { earthRadius } = EarthSceneConfig;
  const globeGgeometry = new THREE.SphereGeometry(earthRadius, 96, 96);
  const globeMaterial = new THREE.MeshStandardMaterial({ map: texture });
  const globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
  threeScene.add(globeMesh);
<<<<<<< HEAD
  return globeMesh
=======
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc
}
