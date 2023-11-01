import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const myProjects = [
  { key: 'ecommerce', imageSrc: '/src/portfolio/assets/compressed-project-images/Ecommerce-Landing.png' },
  { key: 'hyundai', imageSrc: '/src/portfolio/assets/compressed-project-images/hyundai-preview.jpg' },
];

const ThreeSlider = () => {
  /** useRef */
  const canvas = useRef<HTMLCanvasElement>(null);

  /** Global Scope variables */
  const [globalScope, setGlobalScope] = useState({ windowX: window.innerWidth, windowY: window.innerHeight, windowPxRatio: window.devicePixelRatio });

  useEffect(() => {
    /** three.js Scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    /** Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current as HTMLCanvasElement });
    renderer.setSize(globalScope.windowX, globalScope.windowY);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /** Camera */
    const camera = new THREE.PerspectiveCamera(75, globalScope.windowX / globalScope.windowY, 0.1, 1000);
    camera.position.set(0, 0, 1);
    // camera.rotation.set(0, 0, 0);
    camera.scale.set(1, 1.25, 1);

    /** Lighting */
    const spotLight = new THREE.SpotLight(0xffffff, 100);
    spotLight.position.set(5, 10, 7.5);
    spotLight.angle = 0.135;
    spotLight.distance = 0;
    scene.add(spotLight);

    // Lighting Helper
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    /** Geometry */
    // const geometryAspectRatio = ;
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 1);

    /** Texture Loader */
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    /** Object Constructor */
    myProjects.forEach((project, index: number) => {
      textureLoader.load(project.imageSrc, (texture) => {
        const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.FrontSide });
        const object = new THREE.Mesh(planeGeometry, material);
        object.position.set(index * 2, 0, 0);
        scene.add(object);
        renderer.render(scene, camera);
      });
    });

    function windowResizeHandler() {
      // setGlobalScope({ ...globalScope, windowX = window.innerWidth, windowY = window.innerHeight });
      // camera.aspect = globalScope.windowX / globalScope.windowY;
      // camera.updateProjectionMatrix();
      // renderer.setSize(globalScope.windowX, globalScope.windowY);
      // renderer.setPixelRatio(Math.min(globalScope.windowPxRatio, 2));
    }

    function userWheel(e: WheelEvent) {
      if (e.deltaY < 0) {
        // Up
      } else {
        // Down
      }
    }

    function userPointerUp(e: PointerEvent) {}

    window.addEventListener('resize', windowResizeHandler);
    window.addEventListener('wheel', userWheel);
    canvas.current?.addEventListener('pointerup', userPointerUp);

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
      window.removeEventListener('wheel', userWheel);
      canvas.current?.removeEventListener('pointerup', userPointerUp);
    };
  }, []);

  return (
    <div id='threeSlider'>
      <canvas ref={canvas} />
    </div>
  );
};

export default ThreeSlider;
