import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { myProjects } from './data/myProjects';

const ThreeSlider = () => {
  /** useRef */
  const canvas = useRef<HTMLCanvasElement>(null);

  /** Three.js */
  useEffect(() => {
    /** Initialize Scene */
    const scene = new THREE.Scene();

    /** Lighting */
    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
    directionalLight.position.set(0, 0, 1); // Set the light's position
    scene.add(directionalLight);

    /** Camera */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 2); // Set camera position
    camera.lookAt(0, 0, 1);

    /** Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current as HTMLCanvasElement });
    renderer.setSize(window.innerWidth, window.innerHeight);

    /** Object Constructor */
    myProjects.forEach((project, index) => {
      //Texture Loader
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin('anonymous');

      // Geometry
      const planeGeometry = new THREE.PlaneGeometry(1, 1);

      // Dynamically load textures from myProjects array of objects into textureLoader
      textureLoader.load(project.imageSrc, (texture) => {
        // Create material with loaded textures
        const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.FrontSide });

        // Geometry object
        const object = new THREE.Mesh(planeGeometry, material);

        // Geometry object positioning
        object.position.y = index * -2;

        // Add new geometry object to scene
        scene.add(object);

        /** Render Scene && attach to DOM element */
        renderer.render(scene, camera);
      });
    });

    /** Window resize handler */
    // const windowResizeHandler = () => {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   new THREE.WebGLRenderer({ canvas: canvas.current as HTMLCanvasElement }).setSize(window.innerWidth, window.innerHeight);
    // };

    // /** Ensure the scene is rendered and mounted correctly on DOM */
    // windowResizeHandler();

    // window.addEventListener('resize', windowResizeHandler);
    // return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);

  return (
    <div id='threeSlider'>
      <canvas ref={canvas} />
    </div>
  );
};

export default ThreeSlider;
