import * as THREE from "three";
import haloImage from "@/assets/images/three-earth/halo.png";
import smallEarthImage from "@/assets/images/three-earth/smallEarth.png";

/**
 * 加载卫星环绕效果
 * @param {THREE.Scene} threeScene
 */
export default function loadSatelliteOrbit(threeScene) {
  const globeTextureLoader = new THREE.TextureLoader();
  const haloTexture = globeTextureLoader.load(haloImage);
  const smallEarthTexture = globeTextureLoader.load(smallEarthImage);
  const group = new THREE.Group();

  const haloGeometry = new THREE.PlaneGeometry(16, 16);
  const haloMaterial = new THREE.MeshLambertMaterial({
    map: haloTexture,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(haloGeometry, haloMaterial);
  group.add(mesh);

  const p1 = new THREE.Vector3(-8, 0, 0);
  const p2 = new THREE.Vector3(8, 0, 0);
  const points = [p1, p2];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.PointsMaterial({
    map: smallEarthTexture,
    transparent: true,
    side: THREE.DoubleSide,
    size: 1,
    depthWrite: false,
  });
  const earthPoints = new THREE.Points(geometry, material);
  group.add(earthPoints);

  group.rotation.set(1.9, 0.5, 1);
  threeScene.add(group);
  return group;
}
