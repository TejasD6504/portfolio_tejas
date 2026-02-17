import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// -------------------------
// SCENE
// -------------------------
const scene = new THREE.Scene();

// -------------------------
// CAMERA
// -------------------------
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(0, 2, 6);
camera.lookAt(0, 0, 0);

// -------------------------
// RENDERER
// -------------------------
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

const container = document.getElementById("container3d");
container.appendChild(renderer.domElement);

// Get container dimensions for proper sizing
function getContainerSize() {
  const rect = container.getBoundingClientRect();
  return { width: rect.width || window.innerWidth, height: rect.height || window.innerHeight };
}

// Initial sizing - use container size on mobile
const isMobileInit = window.innerWidth < 768;
if (isMobileInit) {
  const initSize = getContainerSize();
  renderer.setSize(initSize.width || window.innerWidth, initSize.height || window.innerHeight);
  camera.aspect = (initSize.width || window.innerWidth) / (initSize.height || window.innerHeight);
} else {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
camera.updateProjectionMatrix();

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

// -------------------------
// LIGHTING
// -------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const newfloorGlow = new THREE.PointLight(0xffb703, 10, 2, 1);
newfloorGlow.position.set(1.54, -1.2, -2.1);
scene.add(newfloorGlow);

const onfloorGlow = new THREE.PointLight(0xffb703, 7, 0);
onfloorGlow.position.set(1.8, -0.8, 1.2);
scene.add(onfloorGlow);

const sidefloorGlow = new THREE.PointLight(0xffb703, 10);
sidefloorGlow.position.set(4, -0.9, -1);
scene.add(sidefloorGlow);

const backfloorGlow = new THREE.PointLight(0xffb703, 10);
backfloorGlow.position.set(2, 1.5, 0);
scene.add(backfloorGlow);

// -------------------------
// FLOOR
// -------------------------
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshStandardMaterial({
    color: 'black',
    roughness: 0.9,
    metalness: 0.0,
  })
);

floor.rotation.x = -1.5;
floor.rotation.z = 1;
floor.position.set(2, -1.47, 0);
scene.add(floor);

// -------------------------
// MODEL LOADING
// -------------------------
const loader = new GLTFLoader();
let laptopGroup;

loader.load("./model/laptop.glb", (gltf) => {
  const model = gltf.scene;

  // Center model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  // Group wrapper
  const group = new THREE.Group();
  group.add(model);

  // Initial scale & position
  group.scale.set(9, 9, 9);
  group.position.set(1.8, -0.3, 0);
  group.rotation.y = -0.7;
  group.rotation.x = -0.1;

  scene.add(group);
  laptopGroup = group;
  window.laptopGroup = group;

  // Apply responsive adjustments immediately
  updateResponsiveSettings();
});

// -------------------------
// RESPONSIVE SETTINGS
// -------------------------
function updateResponsiveSettings() {
  const containerSize = getContainerSize();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isPortrait = height > width;

  // Update renderer to container size on mobile
  if (isMobile) {
    renderer.setSize(containerSize.width, containerSize.height);
    camera.aspect = containerSize.width / containerSize.height;
  } else {
    renderer.setSize(width, height);
    camera.aspect = width / height;
  }

  if (laptopGroup) {
    if (isMobile) {
      // Mobile devices - center model in container, bigger scale
      if (isPortrait) {
        laptopGroup.scale.set(8, 8, 8);  // Increased from 5 to 8
        laptopGroup.position.set(0, 0, 0);  // Centered
        camera.position.set(0, 0.8, 4);  // Closer camera
        camera.fov = 55;
      } else {
        // Mobile landscape
        laptopGroup.scale.set(7, 7, 7);
        laptopGroup.position.set(0, 0, 0);  // Centered
        camera.position.set(0, 0.8, 4.5);
        camera.fov = 50;
      }
    } else if (isTablet) {
      // Tablet devices
      laptopGroup.scale.set(8, 8, 8);
      laptopGroup.position.set(1.6, -0.35, 0);
      camera.position.set(0, 2, 6.5);
      camera.fov = 45;
    } else {
      // Desktop
      laptopGroup.scale.set(9, 9, 9);
      laptopGroup.position.set(1.8, -0.3, 0);
      camera.position.set(0, 2, 6);
      camera.fov = 45;
    }

    camera.updateProjectionMatrix();
  }
}

// -------------------------
// ANIMATION LOOP
// -------------------------
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// -------------------------
// RESPONSIVE RESIZE HANDLER
// -------------------------
let resizeTimeout;
window.addEventListener("resize", () => {
  // Debounce resize events for better performance
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const containerSize = getContainerSize();
    const isMobile = window.innerWidth < 768;

    // Update camera aspect ratio
    if (isMobile) {
      camera.aspect = containerSize.width / containerSize.height;
      renderer.setSize(containerSize.width, containerSize.height);
    } else {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    camera.updateProjectionMatrix();

    // Update renderer pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update responsive settings
    updateResponsiveSettings();
  }, 100);
});

// Handle orientation change
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    const containerSize = getContainerSize();
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      camera.aspect = containerSize.width / containerSize.height;
      renderer.setSize(containerSize.width, containerSize.height);
    } else {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    camera.updateProjectionMatrix();
    updateResponsiveSettings();
  }, 100);
});