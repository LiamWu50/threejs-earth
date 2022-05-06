import * as THREE from "three";

/**
 * 加载卫星环绕效果
 * @param {THREE.Scene} scene
 */
export default function loadSatelliteOrbit(scene) {
  const globeTextureLoader = new THREE.TextureLoader();
  const haloTexture = globeTextureLoader.load("/source/halo.png");
  const smallEarthTexture = globeTextureLoader.load("/source/smallEarth.png");
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
  scene.add(group);
}