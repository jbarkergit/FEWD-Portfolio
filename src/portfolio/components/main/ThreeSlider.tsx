import { useEffect, useRef, useState } from 'react';
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
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10); // Color, Intensity
    directionalLight.position.set(0, 0, 1); // Set the light's position
    scene.add(directionalLight);

    /** Camera */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10); // Set camera position
    camera.lookAt(0, 0, 1);

    /** Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current as HTMLCanvasElement });
    renderer.setSize(window.innerWidth, window.innerHeight);

    /** Object Constructor */
    myProjects.forEach((project, index) => {
      // Dynamically load textures from myProjects array of objects into textureLoader
      const texture = new THREE.TextureLoader().load(project.imageSrc);

      // Create material with loaded textures
      const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.FrontSide });

      // Geometry
      const planeGeometry = new THREE.PlaneGeometry(1, 1);

      // Geometry object
      const object = new THREE.Mesh(planeGeometry, material);

      // Geometry object positioning
      object.position.x = index * 2;

      // Add new geometry object to scene
      scene.add(object);
    });

    /** Render Scene && attach to DOM element */
    if (canvas.current) {
      renderer.render(scene, camera);
    } else {
      setTimeout(() => {
        renderer.render(scene, camera);
      }, 500);
    }

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
