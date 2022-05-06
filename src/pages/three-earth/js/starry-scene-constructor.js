import * as THREE from "three";

/**
 * 构造星空场景
 * @param {THREE.Scene} threeScene
 */
export default function loadStarryScene(threeScene) {
  const geometry = new THREE.BufferGeometry();
  const texture = new THREE.TextureLoader().load(
    "/source/starry-background.png"
  );
  const positions = [];
  const colors = [];

  new Array(10000).fill().forEach(() => {
    const color = getRandomColorGroup();
    const vertex = getRandomPositionGroup();
    colors.push(color.r, color.g, color.b);
    positions.push(vertex.x, vertex.y, vertex.z);
  });

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const starsMaterial = new THREE.PointsMaterial({
    map: texture,
    size: 1,
    transparent: true,
    opacity: 1,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(geometry, starsMaterial);
  stars.scale.set(300, 300, 300);
  threeScene.add(stars);
}

function getRandomColorGroup() {
  const color = new THREE.Color();
  color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
  return color;
}

function getRandomPositionGroup() {
  const vertex = new THREE.Vector3();
  vertex.x = Math.random() * 2 - 1;
  vertex.y = Math.random() * 2 - 1;
  vertex.z = Math.random() * 2 - 1;
  return vertex;
}
