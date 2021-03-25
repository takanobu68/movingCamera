let scene, camera, renderer;
let cubes = [];
let spheres = [];
let clinders = [];
let Icosahedrons = [];
let ADD = 1;
let Y = 0.01;
let rotation = 0.03;
const LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40;

let randomInRange = function (from, to) {
  let x = Math.random() * (to - from);
  return x + from;
};

let createCube = function () {
  let w = randomInRange(1, 3);
  let h = randomInRange(1, 3);
  let d = randomInRange(1, 3);
  let geometry = new THREE.BoxGeometry(w, h, d);
  let material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff,
  });
  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = randomInRange(-40, 40);
  cube.position.z = randomInRange(-40, 40);
  cubes.push(cube);
};

let createSphere = function () {
  let r = randomInRange(0.1, 0.5);
  let geometry = new THREE.SphereGeometry(r, 30, 30);
  let material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff,
  });
  let sphere = new THREE.Mesh(geometry, material);
  sphere.position.x = randomInRange(-40, 40);
  // sphere.position.y = randomInRange(1, 10)
  sphere.position.z = randomInRange(-40, 40);
  spheres.push(sphere);
};

let createCylinder = function () {
  let w = randomInRange(1, 1.5);
  let h = randomInRange(1, 3);
  let geometry = new THREE.CylinderGeometry(0, w, h, 0);
  let material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff,
  });
  let clinder = new THREE.Mesh(geometry, material);
  clinder.position.x = randomInRange(-40, 40);
  clinder.position.z = randomInRange(-40, 40);
  clinders.push(clinder);
};

let createIcosahedron = function () {
  let r = randomInRange(0.5, 1);
  let geometry = new THREE.IcosahedronGeometry(r);
  let material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff,
  });
  let Icosahedron = new THREE.Mesh(geometry, material);
  Icosahedron.position.x = randomInRange(-40, 40);
  Icosahedron.position.z = randomInRange(-40, 40);
  Icosahedrons.push(Icosahedron);
};

let onKeyDown = function (e) {
  if (e.keyCode == LEFT) camera.position.x -= 0.2;
  else if (e.keyCode == RIGHT) camera.position.x += 0.2;
  else if (e.keyCode == UP) camera.position.y += 0.2;
  else if (e.keyCode == DOWN) camera.position.y -= 0.2;
};

let init = function () {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffee);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 100;

  var light = new THREE.DirectionalLight(0xffffff);

  let hLight = new THREE.HemisphereLight(0x00ff00, 0x0000ff);

  scene.add(light);
  scene.add(hLight);

  for (let i = 1; i <= 100; i++) {
    createCube();
    createSphere();
    createCylinder();
    createIcosahedron();
  }
  cubes.forEach((cube) => scene.add(cube));
  spheres.forEach((sphere) => scene.add(sphere));
  clinders.forEach((clinder) => scene.add(clinder));
  Icosahedrons.forEach((Icosahedron) => scene.add(Icosahedron));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  document.addEventListener("keydown", onKeyDown, false);
};

let mainLoop = function () {
  camera.position.z -= 0.1;
  spheres.forEach((sphere) => (sphere.position.y += Y));
  Icosahedrons.forEach((Icosahedron) => {
    Icosahedron.rotation.x += rotation;
    Icosahedron.rotation.z += rotation;
  });
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

init();
mainLoop();
