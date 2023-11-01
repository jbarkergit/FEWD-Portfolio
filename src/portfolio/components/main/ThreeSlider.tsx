import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { myProjects } from './data/myProjects';

const ThreeSlider = () => {
  /** useRef */
  const canvas = useRef<HTMLCanvasElement>(null);
  const [layout, setLayout] = useState<string>('row');

  useEffect(() => {
    /** three.js Scene */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    /** Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.current as HTMLCanvasElement });
    renderer.setSize(window.innerWidth, window.innerHeight);

    /** Camera */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 1);
    camera.rotation.set(0, 0, -10);
    camera.scale.set(1, 1.25, 1);

    /** Lighting */
    const spotlight = new THREE.SpotLight(0xffffff, 1);
    spotlight.position.set(5, 10, 7.5);
    spotlight.angle = 0.135;
    scene.add(spotlight);

    /** Object Constructor */
    const objectConstructor = (imageUrl: string, index: number) => {
      // Geometry
      const planeGeometry = new THREE.PlaneGeometry(1, 1, 1);

      // Texture Loader
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin('anonymous');

      // Material Constructor
      const materialConstructor = (imageUrl: string) => {
        return new Promise<THREE.MeshStandardMaterial>((resolve) => {
          textureLoader.load(imageUrl, (texture) => {
            const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.FrontSide });
            resolve(material);
          });
        });
      };

      // Object Creation
      materialConstructor(imageUrl).then((material) => {
        const object = new THREE.Mesh(planeGeometry, material);
        object.position.set(0, index * -2, 0);
        object.rotation.set(0, 0, 0);
        object.scale.set(1, 1, 1);

        scene.add(object);
        renderer.render(scene, camera);
      });
    };

    /** Envoke Object Constructor */
    myProjects.forEach((project, index: number) => {
      const imageUrl: string = project.imageSrc;
      objectConstructor(imageUrl, index);
    });
  }, []);

  return (
    <div id='threeSlider'>
      <canvas ref={canvas} />
    </div>
  );
};

export default ThreeSlider;
