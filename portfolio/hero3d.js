/* Hero 3D scene (Three.js, vendored locally in vendor/three).
   If WebGL or the module fails to load, the CSS fallback in the hero stays visible.
   The scene pauses when the hero is off-screen and renders a single still frame
   for visitors who prefer reduced motion. */
import * as THREE from 'three';
import { RoomEnvironment } from './vendor/three/RoomEnvironment.js';

(function () {
  'use strict';

  var canvas = document.getElementById('hero-3d');
  if (!canvas) return;

  var hero = canvas.closest('.hero');
  var host = canvas.parentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  } catch (err) {
    return; // No WebGL: keep the CSS fallback
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  var scene = new THREE.Scene();
  var pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  /* ---- Colours follow the site theme (--accent) ---- */
  var accent = new THREE.Color('#5b5bf0');

  function readAccent() {
    var value = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    try {
      accent.set(value || '#5b5bf0');
    } catch (e) {
      accent.set('#5b5bf0');
    }
  }
  readAccent();

  /* ---- Hero object: glossy, iridescent torus knot ---- */
  var knotMaterial = new THREE.MeshPhysicalMaterial({
    color: accent.clone(),
    metalness: 0.15,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    iridescence: 1,
    iridescenceIOR: 1.5,
    iridescenceThicknessRange: [180, 620]
  });
  var knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.34, 280, 48), knotMaterial);
  scene.add(knot);

  /* ---- Wireframe shell around it for depth ---- */
  var shellMaterial = new THREE.MeshBasicMaterial({
    color: accent.clone(),
    wireframe: true,
    transparent: true,
    opacity: 0.14
  });
  var shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.3, 2), shellMaterial);
  scene.add(shell);

  /* ---- Particle field ---- */
  var COUNT = 900;
  var positions = new Float32Array(COUNT * 3);
  for (var i = 0; i < COUNT; i++) {
    var r = 3.4 + Math.random() * 2.8;
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  var particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  var particleMaterial = new THREE.PointsMaterial({
    color: accent.clone(),
    size: 0.03,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
    depthWrite: false
  });
  var particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  /* ---- Lights ---- */
  var key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(3, 4, 5);
  scene.add(key);

  var rim = new THREE.PointLight(0xffffff, 30, 30);
  rim.color.copy(accent);
  rim.position.set(-3, -2, 3);
  scene.add(rim);

  /* ---- Sizing ---- */
  function resize() {
    var w = host.clientWidth;
    var h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();

  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(host);
  } else {
    window.addEventListener('resize', resize);
  }

  /* ---- Pointer and scroll input ---- */
  var pointer = { x: 0, y: 0 };
  var scrollSpin = 0;
  var lastScrollY = window.scrollY;

  hero.addEventListener('pointermove', function (event) {
    var rect = hero.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  }, { passive: true });

  hero.addEventListener('pointerleave', function () {
    pointer.x = 0;
    pointer.y = 0;
  });

  window.addEventListener('scroll', function () {
    scrollSpin += (window.scrollY - lastScrollY) * 0.0015;
    lastScrollY = window.scrollY;
  }, { passive: true });

  /* ---- Render loop ---- */
  var clock = new THREE.Clock();
  var running = false;
  var rafId = 0;
  var ready = false;

  function drawFrame(time) {
    var smoothX = pointer.x;
    var smoothY = pointer.y;

    knot.rotation.y = time * 0.22 + smoothX * 0.6 + scrollSpin;
    knot.rotation.x = Math.sin(time * 0.35) * 0.18 + smoothY * 0.35;
    knot.position.y = Math.sin(time * 0.9) * 0.12;

    shell.rotation.y = -time * 0.1 - smoothX * 0.2;
    shell.rotation.x = time * 0.05 + smoothY * 0.15;

    particles.rotation.y = time * 0.025;
    particles.rotation.x = smoothY * 0.05;

    rim.position.x = Math.cos(time * 0.6) * 4;
    rim.position.z = 3 + Math.sin(time * 0.6) * 1.5;

    renderer.render(scene, camera);

    if (!ready) {
      ready = true;
      hero.classList.add('webgl-ready');
    }
  }

  function loop() {
    if (!running) return;
    drawFrame(clock.getElapsedTime());
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    clock.start();
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  if (reduceMotion) {
    drawFrame(2.4); // one still frame, no animation
  } else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        start();
      } else {
        stop();
      }
    }, { threshold: 0 }).observe(canvas);
  } else {
    start();
  }

  /* ---- Re-colour when the theme changes ---- */
  function applyTheme() {
    readAccent();
    knotMaterial.color.copy(accent);
    shellMaterial.color.copy(accent);
    particleMaterial.color.copy(accent);
    rim.color.copy(accent);
    if (reduceMotion) drawFrame(2.4);
  }

  new MutationObserver(applyTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  if (systemDark.addEventListener) systemDark.addEventListener('change', applyTheme);
})();
