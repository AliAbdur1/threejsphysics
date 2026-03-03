import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

function Example() {
    const canvasRef = useRef(null);

  useEffect(() => {
    // Debug GUI
    const gui = new GUI({
      title: 'Debug UI Settings',
      width: 300,
      closeFolders: true
    });
    gui.close();

    const toggleGUI = (event) => {
      if (event.key === 'h') {
        gui.show(gui._hidden); // toggle debug UI
      }
    };
    window.addEventListener('keydown', toggleGUI);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 3;
    scene.add(camera);

    

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Resize handler
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      console.log('window is resized');
    };
    window.addEventListener('resize', handleResize);

    // Fullscreen toggle
    const handleDblClick = () => {
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

      if (!fullscreenElement) {
        if (canvasRef.current.requestFullscreen) {
          canvasRef.current.requestFullscreen();
        } else if (canvasRef.current.webkitRequestFullscreen) {
          canvasRef.current.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
      console.log('double clicked');
    };
    window.addEventListener('dblclick', handleDblClick);

    // Animation loop
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Example animation
    //   cube.rotation.y = elapsedTime;
    //   cube.rotation.x = elapsedTime * 0.5;

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      gui.destroy();
      window.removeEventListener('keydown', toggleGUI);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('dblclick', handleDblClick);
      renderer.dispose();
      // geometry.dispose();
      // material.dispose();
    };

}, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="exampleOnScreen"
        id="example_canvas"
      ></canvas>
    </div>
  )
}

export default Example
