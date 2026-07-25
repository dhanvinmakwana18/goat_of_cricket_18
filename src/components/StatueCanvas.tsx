import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, Sparkles, Trophy, ZoomIn, ZoomOut } from 'lucide-react';
import worldCupTrophyImg from '../assets/images/icc_world_cup_trophy_1784831119282.jpg';

export const StatueCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [spotlightOn, setSpotlightOn] = useState(true);

  // Refs for animation & scene objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const trophyGroupRef = useRef<THREE.Group | null>(null);
  const keyLightRef = useRef<THREE.SpotLight | null>(null);

  const targetRotationX = useRef(0.15);
  const targetRotationY = useRef(0);
  const targetZoom = useRef(6.0);
  const isDragging = useRef(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera (FOV: 45, Position x:0, y:2, z:6 per prompt specs)
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0.2, 0);
    cameraRef.current = camera;

    // 3. Renderer with PBR, ShadowMap & Anti-aliasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // 4. Studio Lighting Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Primary Soft Studio Key Light
    const keyLight = new THREE.SpotLight(0xfffbeb, 4.0);
    keyLight.position.set(4, 8, 6);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.6;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    keyLightRef.current = keyLight;
    scene.add(keyLight);

    // Chrome Highlight Spot
    const chromeHighlight = new THREE.SpotLight(0xdfeafe, 3.0);
    chromeHighlight.position.set(-5, 6, 4);
    chromeHighlight.angle = Math.PI / 3;
    chromeHighlight.penumbra = 0.8;
    scene.add(chromeHighlight);

    // Warm Gold Backlight
    const goldBacklight = new THREE.PointLight(0xf59e0b, 2.5, 15);
    goldBacklight.position.set(0, 3, -4);
    scene.add(goldBacklight);

    // Bottom Rim Fill Light
    const bottomFill = new THREE.DirectionalLight(0xd3122a, 0.8);
    bottomFill.position.set(0, -4, 3);
    scene.add(bottomFill);

    // Ground Shadow Plane
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.ShadowMaterial({ opacity: 0.35 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.25;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 5. Materials (Exact Prompt Specs)
    // Gold Material: color #D4AF37, metalness: 1, roughness: 0.12
    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF37'),
      metalness: 1.0,
      roughness: 0.12,
    });

    // Chrome Material: color #FFFFFF, metalness: 1, roughness: 0.05
    const chromeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      metalness: 1.0,
      roughness: 0.05,
    });

    // Black Base Material: color #111111, metalness: 0.7, roughness: 0.25
    const blackBaseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111111'),
      metalness: 0.7,
      roughness: 0.25,
    });

    // White Dots Material: color #FFFFFF, roughness: 0.5
    const whiteDotMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      metalness: 0.1,
      roughness: 0.5,
    });

    // 6. Trophy Group Assembly
    const trophyGroup = new THREE.Group();
    trophyGroup.position.y = -0.2; // center vertically in viewport
    trophyGroupRef.current = trophyGroup;

    // --- STRUCTURE STEP 6: Base (Large circular black glossy base with stacked rings) ---
    // Tier 1 Base Bottom Ring
    const baseTier1 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.8, 0.25, 64),
      blackBaseMat
    );
    baseTier1.position.y = -2.1;
    baseTier1.castShadow = true;
    baseTier1.receiveShadow = true;
    trophyGroup.add(baseTier1);

    // Gold Accent Ring between Tier 1 & 2
    const baseGoldRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.61, 0.03, 16, 64),
      goldMat
    );
    baseGoldRing1.rotation.x = Math.PI / 2;
    baseGoldRing1.position.y = -1.97;
    trophyGroup.add(baseGoldRing1);

    // Tier 2 Middle Glossy Base (holds the white circular inlays)
    const baseTier2Height = 0.55;
    const baseTier2 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.55, baseTier2Height, 64),
      blackBaseMat
    );
    baseTier2.position.y = -1.68;
    baseTier2.castShadow = true;
    baseTier2.receiveShadow = true;
    trophyGroup.add(baseTier2);

    // --- STRUCTURE STEP 7: White Circular Inlays around the base ---
    const inlayCount = 12;
    const inlayRadius = 0.11;
    for (let i = 0; i < inlayCount; i++) {
      const angle = (i / inlayCount) * Math.PI * 2;
      const baseR = 1.38; // Radius on sloping surface of baseTier2
      const x = Math.cos(angle) * baseR;
      const z = Math.sin(angle) * baseR;

      const inlayMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(inlayRadius, inlayRadius, 0.04, 32),
        whiteDotMat
      );
      inlayMesh.position.set(x, -1.68, z);

      // Rotate inlay to align flush with base perimeter tangent
      inlayMesh.rotation.y = -angle + Math.PI / 2;
      inlayMesh.rotation.z = Math.PI / 2;
      inlayMesh.rotation.x = 0.18; // tilt along sloped edge

      trophyGroup.add(inlayMesh);
    }

    // Gold Accent Ring top of Tier 2
    const baseGoldRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.26, 0.035, 16, 64),
      goldMat
    );
    baseGoldRing2.rotation.x = Math.PI / 2;
    baseGoldRing2.position.y = -1.39;
    trophyGroup.add(baseGoldRing2);

    // Tier 3 Top Pedestal Cap
    const baseTier3 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 1.22, 0.2, 64),
      blackBaseMat
    );
    baseTier3.position.y = -1.28;
    baseTier3.castShadow = true;
    trophyGroup.add(baseTier3);

    // --- STRUCTURE STEP 5: Gold Connector ---
    // Small polished gold connector joining stem to base
    const connectorBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.75, 0.12, 48),
      goldMat
    );
    connectorBase.position.y = -1.13;
    connectorBase.castShadow = true;
    trophyGroup.add(connectorBase);

    const connectorRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.045, 16, 48),
      goldMat
    );
    connectorRing.rotation.x = Math.PI / 2;
    connectorRing.position.y = -1.04;
    trophyGroup.add(connectorRing);

    const connectorCup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.48, 0.12, 48),
      goldMat
    );
    connectorCup.position.y = -0.96;
    connectorCup.castShadow = true;
    trophyGroup.add(connectorCup);

    // --- STRUCTURE STEP 4: Center Stem ---
    // Metallic chrome blade-like stem tapering smoothly
    const stemGeo = new THREE.CylinderGeometry(0.2, 0.28, 2.1, 32);
    const stemMesh = new THREE.Mesh(stemGeo, chromeMat);
    stemMesh.position.y = 0.12;
    stemMesh.scale.set(0.65, 1.0, 1.25); // Elliptic blade-like cross-section
    stemMesh.castShadow = true;
    trophyGroup.add(stemMesh);

    // --- STRUCTURE STEP 3: Vertical Supports ---
    // Six identical chrome supports evenly spaced around sphere, curved inward
    const supportCount = 6;
    const supportCurveRadiusTop = 0.76;
    const supportCurveRadiusMid = 0.96;
    const supportCurveRadiusBot = 0.52;

    for (let i = 0; i < supportCount; i++) {
      const angle = (i / supportCount) * Math.PI * 2;

      // 4 control points creating iconic inward curvature
      const p0 = new THREE.Vector3(
        Math.cos(angle) * supportCurveRadiusBot,
        -0.92,
        Math.sin(angle) * supportCurveRadiusBot
      );
      const p1 = new THREE.Vector3(
        Math.cos(angle) * supportCurveRadiusMid,
        0.0,
        Math.sin(angle) * supportCurveRadiusMid
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle) * supportCurveRadiusTop,
        1.25,
        Math.sin(angle) * supportCurveRadiusTop
      );
      const p3 = new THREE.Vector3(
        Math.cos(angle) * 0.68,
        1.72,
        Math.sin(angle) * 0.68
      );

      const supportCurve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
      const tubeGeo = new THREE.TubeGeometry(supportCurve, 48, 0.038, 16, false);
      const supportMesh = new THREE.Mesh(tubeGeo, chromeMat);
      supportMesh.castShadow = true;
      trophyGroup.add(supportMesh);
    }

    // --- STRUCTURE STEP 1: Top Sphere ---
    // Perfect metallic gold sphere (#D4AF37, metalness: 1, roughness: 0.12)
    const sphereRadius = 0.72;
    const topSphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const topSphereMesh = new THREE.Mesh(topSphereGeo, goldMat);
    topSphereMesh.position.y = 1.72;
    topSphereMesh.castShadow = true;
    trophyGroup.add(topSphereMesh);

    // Decorative Globe Seam lines on Gold Sphere
    const seamMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#B8860B'),
      metalness: 0.9,
      roughness: 0.2,
    });

    const equatorSeam = new THREE.Mesh(
      new THREE.TorusGeometry(sphereRadius + 0.005, 0.012, 16, 64),
      seamMat
    );
    equatorSeam.rotation.x = Math.PI / 2.2;
    equatorSeam.position.y = 1.72;
    trophyGroup.add(equatorSeam);

    const meridianSeam = new THREE.Mesh(
      new THREE.TorusGeometry(sphereRadius + 0.005, 0.01, 16, 64),
      seamMat
    );
    meridianSeam.rotation.y = Math.PI / 3;
    meridianSeam.position.y = 1.72;
    trophyGroup.add(meridianSeam);

    // --- STRUCTURE STEP 2: Top Ring ---
    // Thin chrome ring wrapping around the sphere with slight engraving band
    const topRingGeo = new THREE.TorusGeometry(sphereRadius + 0.035, 0.04, 20, 64);
    const topRingMesh = new THREE.Mesh(topRingGeo, chromeMat);
    topRingMesh.position.y = 1.72;
    topRingMesh.rotation.x = Math.PI / 18; // Slight angle wrapper
    topRingMesh.castShadow = true;
    trophyGroup.add(topRingMesh);

    // Create Canvas Texture for Engraved Text: "Championship Trophy" / "ICC Cricket World Cup"
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 1024;
    textCanvas.height = 128;
    const ctx = textCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 128);
      ctx.fillStyle = '#111111';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'ICC CRICKET WORLD CUP  ★  CHAMPIONSHIP TROPHY  ★  KING KOHLI 2011',
        512,
        64
      );
    }
    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.wrapS = THREE.RepeatWrapping;
    textTexture.repeat.set(2, 1);

    const textBandMat = new THREE.MeshStandardMaterial({
      map: textTexture,
      metalness: 0.9,
      roughness: 0.1,
      side: THREE.DoubleSide,
    });

    const textBandMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(sphereRadius + 0.042, sphereRadius + 0.042, 0.07, 64, 1, true),
      textBandMat
    );
    textBandMesh.position.y = 1.72;
    textBandMesh.rotation.x = Math.PI / 18;
    trophyGroup.add(textBandMesh);

    // Floating Ambient Gold Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 7;
      positions[i + 1] = (Math.random() - 0.5) * 5 + 0.2;
      positions[i + 2] = (Math.random() - 0.5) * 7;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#D4AF37'),
      size: 0.035,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(trophyGroup);

    // 7. Animation Loop (rotation += 0.003 per prompt spec)
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (trophyGroupRef.current) {
        trophyGroupRef.current.rotation.y +=
          (targetRotationY.current - trophyGroupRef.current.rotation.y) * 0.1;
        trophyGroupRef.current.rotation.x +=
          (targetRotationX.current - trophyGroupRef.current.rotation.x) * 0.1;

        if (!isDragging.current && autoRotate) {
          targetRotationY.current += 0.003; // Smooth exact prompt rotation speed
        }
      }

      if (cameraRef.current) {
        cameraRef.current.position.z +=
          (targetZoom.current - cameraRef.current.position.z) * 0.1;
      }

      particles.rotation.y += 0.0012;
      renderer.render(scene, camera);
    };

    animate();

    // 8. Drag & Interactive Controls
    const handleMove = (x: number, y: number) => {
      if (isDragging.current) {
        const deltaX = x - mouseX.current;
        const deltaY = y - mouseY.current;
        targetRotationY.current += deltaX * 0.008;
        targetRotationX.current += deltaY * 0.006;
        // Clamp vertical tilt
        targetRotationX.current = Math.max(-0.4, Math.min(0.6, targetRotationX.current));
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

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom.current = Math.max(3.8, Math.min(8.5, targetZoom.current + e.deltaY * 0.003));
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
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 9. Responsive Resize Observer
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
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [autoRotate]);

  // Toggle Studio Lighting
  useEffect(() => {
    if (keyLightRef.current) {
      keyLightRef.current.intensity = spotlightOn ? 4.0 : 1.2;
    }
  }, [spotlightOn]);

  const resetCamera = () => {
    targetRotationX.current = 0.15;
    targetRotationY.current = 0;
    targetZoom.current = 6.0;
    if (trophyGroupRef.current) {
      trophyGroupRef.current.rotation.x = 0.15;
      trophyGroupRef.current.rotation.y = 0;
    }
  };

  const handleZoomIn = () => {
    targetZoom.current = Math.max(3.8, targetZoom.current - 0.8);
  };

  const handleZoomOut = () => {
    targetZoom.current = Math.min(8.5, targetZoom.current + 0.8);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[520px] lg:h-[580px] relative flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Soft Studio Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d3122a]/10 via-amber-500/10 to-transparent blur-[100px] rounded-full pointer-events-none"></div>

      {/* Top Left Title Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-[#07090d]/90 p-3 border border-[#d3122a]/40 backdrop-blur-md shadow-2xl">
        <img
          src={worldCupTrophyImg}
          alt="2011 ICC Cricket World Cup Trophy"
          className="w-10 h-10 object-contain filter drop-shadow-md shrink-0"
          referrerPolicy="no-referrer"
        />
        <div>
          <span className="text-[9px] font-bold text-[#d3122a] uppercase tracking-[0.2em] block">
            Hyper-Realistic 3D Render
          </span>
          <p className="text-xs sm:text-sm font-black text-amber-400 uppercase font-brand leading-none">
            Championship Trophy
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing z-10 touch-none"
      />

      {/* Premium Controls Stack */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-[#07090d]/90 p-2 border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
          className="p-2.5 bg-white/5 hover:bg-[#d3122a] text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          {autoRotate ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400" />}
        </button>

        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2.5 bg-white/5 hover:bg-[#d3122a] text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2.5 bg-white/5 hover:bg-[#d3122a] text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={resetCamera}
          title="Reset View"
          className="p-2.5 bg-white/5 hover:bg-[#d3122a] text-white transition-colors flex items-center justify-center cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setSpotlightOn(!spotlightOn)}
          title={spotlightOn ? "Dim Studio Lights" : "Brighten Studio Lights"}
          className={`p-2.5 transition-colors flex items-center justify-center cursor-pointer ${
            spotlightOn ? 'bg-[#d3122a] text-white' : 'bg-white/5 text-white/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Label & Interaction Instructions */}
      <div className="absolute bottom-4 z-20 flex flex-col items-center gap-1.5 pointer-events-none text-center px-4">
        <div className="flex items-center gap-2 bg-[#07090d]/90 px-4 py-1.5 border border-amber-400/30 backdrop-blur-md shadow-lg">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 font-brand">
            2011 ICC Cricket World Cup Champion
          </span>
        </div>
        <p className="text-[10px] text-white/50 tracking-[0.25em] font-bold uppercase animate-pulse flex items-center gap-1">
          <span>Drag to Rotate • Scroll to Zoom</span>
        </p>
      </div>
    </div>
  );
};
