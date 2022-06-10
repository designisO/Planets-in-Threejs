import './style.css'

import * as THREE from 'three'; // importing threejs

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Sphere } from 'three';

const scene = new THREE.Scene();

// Camera: multiple types, but prespective camera is the most common.
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//renderer for the graphics of the scene.
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight ); // full screen window
camera.position.setZ(30); // moved 30 on the Z axis.

renderer.render( scene, camera );

// Creating shape and material
const geometry = new THREE.TorusGeometry( 10, 3, 15, 100 );
const material = new THREE.MeshStandardMaterial({ color: 0x32a852, wireframe: false });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial ({ color: 0xffffff})
  const star = new THREE.Mesh(geometry, material );

  // placing stars in the random position.
  const [x , y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// loading space background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// texture mapping : 2d pixels mapped to a 3d geometry

// Moon:
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.png')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3.5, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture

  })
);

scene.add(moon);

moon.position.z = 30; // moon position axis
moon.position.setX(-10);




// Camera moving function





// so we can see the graphics. Instead of calling it over and over. Make an animate function. :)
// similar to a game loop.
function animate() {
  requestAnimationFrame( animate );
  
  torus.rotation.x += 0.01; // rotation of the x,y,z axis 
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();




  renderer.render (scene, camera);
}

animate()
