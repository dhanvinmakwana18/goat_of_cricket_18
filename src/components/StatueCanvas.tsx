import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, Sparkles, Layers } from 'lucide-react';

export const StatueCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [materialTheme, setMaterialTheme] = useState<'gold' | 'platinum' | 'emerald'>('gold');

  // Refs for animation & scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const statueGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{ [key: string]: THREE.MeshStandardMaterial }>({});

  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);
  const isDragging = useRef(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 7);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xfef08a, 2.5);
    spotLight.position.set(5, 10, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(-5, 2, 2);
    scene.add(pointLight);

    const fillLight = new THREE.DirectionalLight(0xeab308, 0.8);
    fillLight.position.set(0, -5, -2);
    scene.add(fillLight);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x422006,
      emissiveIntensity: 0.25,
    });

    const platinumMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x1e293b,
      emissiveIntensity: 0.2,
    });

    const emeraldMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x022c22,
      emissiveIntensity: 0.3,
    });

    materialsRef.current = {
      gold: goldMaterial,
      platinum: platinumMaterial,
      emerald: emeraldMaterial,
    };

    const currentMat = materialsRef.current[materialTheme] || goldMaterial;

    // Group
    const statueGroup = new THREE.Group();
    statueGroupRef.current = statueGroup;

    // Base Platform
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.3,
    });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, 0.5, 32), baseMat);
    base.position.y = -2;
    statueGroup.add(base);

    const subBase = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.2, 0.2, 32), baseMat);
    subBase.position.y = -2.35;
    statueGroup.add(subBase);

    // Ball
    const ball = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), currentMat);
    ball.position.y = 0.2;
    statueGroup.add(ball);

    // Cricket Seams (Decorative Torus)
    const seamGeo = new THREE.TorusGeometry(1.01, 0.02, 16, 64);
    const seamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const seam = new THREE.Mesh(seamGeo, seamMat);
    seam.rotation.x = Math.PI / 2;
    seam.position.y = 0.2;
    statueGroup.add(seam);

    // Crossed Bats
    const batGeo = new THREE.CylinderGeometry(0.12, 0.08, 3.6, 16);
    const bat1 = new THREE.Mesh(batGeo, currentMat);
    bat1.rotation.z = 0.5;
    bat1.position.set(-0.85, 0.5, 0);
    statueGroup.add(bat1);

    const bat2 = new THREE.Mesh(batGeo, currentMat);
    bat2.rotation.z = -0.5;
    bat2.position.set(0.85, 0.5, 0);
    statueGroup.add(bat2);

    // Top Ring
    const ringGeo = new THREE.TorusGeometry(1.35, 0.06, 16, 100);
    const ring = new THREE.Mesh(ringGeo, currentMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.85;
    statueGroup.add(ring);

    // Small Crown / Star Accent at top
    const crownGeo = new THREE.ConeGeometry(0.3, 0.5, 6);
    const crown = new THREE.Mesh(crownGeo, currentMat);
    crown.position.y = 2.3;
    crown.rotation.y = Math.PI / 6;
    statueGroup.add(crown);

    // Floating Particles / Sparkles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(statueGroup);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth Rotation Damping
      if (statueGroupRef.current) {
        statueGroupRef.current.rotation.y +=
          (targetRotationY.current - statueGroupRef.current.rotation.y) * 0.1;
        statueGroupRef.current.rotation.x +=
          (targetRotationX.current - statueGroupRef.current.rotation.x) * 0.1;

        if (!isDragging.current && autoRotate) {
          targetRotationY.current += 0.006;
        }
      }

      // Slowly rotate background particles
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Event Handlers
    const handleMove = (x: number, y: number) => {
      if (isDragging.current) {
        const deltaX = x - mouseX.current;
        const deltaY = y - mouseY.current;
        targetRotationY.current += deltaX * 0.01;
        targetRotationX.current += deltaY * 0.01;
        mouseX.current = x;
        mouseY.current = y;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging.current = true;
        mouseX.current = e.touches[0].clientX;
        mouseY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [autoRotate]);

  // Handle material theme switch dynamically
  useEffect(() => {
    if (!statueGroupRef.current || !materialsRef.current[materialTheme]) return;
    const newMaterial = materialsRef.current[materialTheme];

    statueGroupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
        child.material = newMaterial;
      } else if (child instanceof THREE.Mesh && child.geometry instanceof THREE.CylinderGeometry && child.geometry.parameters.height === 3.6) {
        child.material = newMaterial;
      } else if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry && child.geometry.parameters.radius === 1.35) {
        child.material = newMaterial;
      } else if (child instanceof THREE.Mesh && child.geometry instanceof THREE.ConeGeometry) {
        child.material = newMaterial;
      }
    });
  }, [materialTheme]);

  const resetCamera = () => {
    targetRotationX.current = 0;
    targetRotationY.current = 0;
    if (statueGroupRef.current) {
      statueGroupRef.current.rotation.x = 0;
      statueGroupRef.current.rotation.y = 0;
    }
  };

  return (
    <div ref={containerRef} class="w-full h-[480px] lg:h-[540px] relative flex justify-center items-center">
      {/* Glow Backdrop */}
      <div class="absolute inset-0 bg-yellow-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        class="w-full h-full cursor-grab active:cursor-grabbing z-10 touch-none"
      />

      {/* Interactive Controls Overlay */}
      <div class="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-gray-950/80 p-2 rounded-2xl border border-gray-800 backdrop-blur-md">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
          class="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-yellow-400 hover:text-yellow-300 transition-colors flex items-center justify-center"
        >
          {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={resetCamera}
          title="Reset 3D View"
          class="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Material Selector Controls */}
      <div class="absolute bottom-10 z-20 flex items-center gap-2 bg-gray-950/80 px-3 py-1.5 rounded-full border border-gray-800/80 backdrop-blur-md">
        <span class="text-[10px] text-gray-400 font-mono uppercase tracking-wider flex items-center gap-1 mr-1">
          <Layers className="w-3 h-3 text-yellow-500" /> Material:
        </span>
        <button
          onClick={() => setMaterialTheme('gold')}
          class={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full transition-all ${
            materialTheme === 'gold'
              ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/20'
              : 'text-gray-400 hover:text-white bg-gray-900'
          }`}
        >
          Gold
        </button>
        <button
          onClick={() => setMaterialTheme('platinum')}
          class={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full transition-all ${
            materialTheme === 'platinum'
              ? 'bg-slate-200 text-black shadow-md shadow-slate-200/20'
              : 'text-gray-400 hover:text-white bg-gray-900'
          }`}
        >
          Platinum
        </button>
        <button
          onClick={() => setMaterialTheme('emerald')}
          class={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full transition-all ${
            materialTheme === 'emerald'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'text-gray-400 hover:text-white bg-gray-900'
          }`}
        >
          Emerald
        </button>
      </div>

      {/* Instructional Hint */}
      <div class="absolute bottom-2 text-[10px] text-gray-500 tracking-[0.25em] font-bold uppercase animate-pulse z-10 flex items-center gap-1.5 pointer-events-none">
        <Sparkles className="w-3 h-3 text-yellow-500" />
        Drag or Swipe to Rotate 3D Trophy
      </div>
    </div>
  );
};
