/**
 * Jaya Chandran - 3D Developer Portfolio Interactive Engine
 * Aesthetic: Dark 3D Obsidian Luxury Experience
 * Architecture: Modular JS, Central Data Store, WebGL 3D Workstation, Interactive Tech Globe & Magnetic Physics
 */

import { portfolioData } from './portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all core interactive modules
  initPreloader();
  initCustomCursor();
  initStickyNavbar();
  initScrollProgressBar();
  initScrollSpy();
  initScrollAnimations();
  initThreeJsHero();
  initTechGlobe();
  init3DTilt();
  initMagneticButtons();
});

/* ==========================================================================
   1. PRELOADER LOGIC (RELIABLE DISMISSAL)
   ========================================================================== */
function initPreloader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  function dismissLoader() {
    if (!loader.classList.contains('loaded')) {
      loader.classList.add('loaded');
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(dismissLoader, 150);
  } else {
    window.addEventListener('load', () => setTimeout(dismissLoader, 150));
    // Hard fallback: guarantee preloader dismissal after 600ms
    setTimeout(dismissLoader, 600);
  }
}

/* ==========================================================================
   2. CUSTOM DESKTOP CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Touch device check: automatically disable custom cursor on touch screens
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  // Smooth lerp for outer ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover expansion on interactive elements
  const hoverElements = document.querySelectorAll('a, button, input, textarea, .tilt-card, .social-icon-btn, .tool-badge');
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   3. STICKY NAVBAR & TOP SCROLL PROGRESS BAR
   ========================================================================== */
function initStickyNavbar() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Auto-collapse mobile nav menu on link click
  const navCollapse = document.getElementById('portfolioNav');
  const navLinks = document.querySelectorAll('#portfolioNav .nav-link, #portfolioNav .btn');
  if (navCollapse && navLinks.length) {
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          if (window.bootstrap && window.bootstrap.Collapse) {
            const bsCollapse = window.bootstrap.Collapse.getInstance(navCollapse) || new window.bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
          } else {
            navCollapse.classList.remove('show');
          }
        }
      });
    });
  }
}

function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  });
}

/* ==========================================================================
   4. SCROLLSPY ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#portfolioNav .nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 220;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. INTERSECTION OBSERVER SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('active'));
    return;
  }

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  elements.forEach((el) => {
    // Immediately reveal elements already inside initial viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('active');
    }
    observer.observe(el);
  });
}

/* ==========================================================================
   6. THREE.JS 3D HERO SCENE (WITH WEBGL CAPABILITY DETECTION & FALLBACK)
   ========================================================================== */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function initThreeJsHero() {
  const canvas = document.getElementById('hero3dCanvas');
  if (!canvas) return;

  // Fallback for non-WebGL devices or missing Three.js library
  if (!isWebGLAvailable() || typeof THREE === 'undefined') {
    canvas.style.display = 'none';
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'glass-card p-5 text-center text-light my-auto';
    fallbackDiv.innerHTML = '<i class="fab fa-python text-warning display-3 mb-3"></i><h4 class="font-outfit fw-bold">Python / Django Workstation</h4><p class="small text-muted mb-0">Full Stack Developer Engine</p>';
    canvas.parentElement.appendChild(fallbackDiv);
    return;
  }

  const container = canvas.parentElement;
  let width = container.clientWidth || 300;
  let height = container.clientHeight || 300;

  // Scene & Camera setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting Setup (Gold & White Ambient + Dual Point Lights)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xd4af37, 2.8, 20);
  pointLight1.position.set(4, 4, 4);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x38bdf8, 2.0, 20);
  pointLight2.position.set(-4, -4, 4);
  scene.add(pointLight2);

  // 3D Developer Group
  const devGroup = new THREE.Group();
  scene.add(devGroup);

  // Laptop Screen Mesh
  const laptopGeometry = new THREE.BoxGeometry(2.4, 1.5, 0.12);
  const laptopMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f111a,
    metalness: 0.9,
    roughness: 0.15
  });
  const laptopMesh = new THREE.Mesh(laptopGeometry, laptopMaterial);
  devGroup.add(laptopMesh);

  // Glowing Screen Screen Inner Mesh
  const screenGeometry = new THREE.PlaneGeometry(2.2, 1.3);
  const screenMaterial = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    transparent: true,
    opacity: 0.35
  });
  const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
  screenMesh.position.z = 0.07;
  devGroup.add(screenMesh);

  // Laptop Base (Keyboard)
  const baseGeometry = new THREE.BoxGeometry(2.6, 0.1, 1.8);
  const baseMesh = new THREE.Mesh(baseGeometry, laptopMaterial);
  baseMesh.position.set(0, -0.85, 0.8);
  baseMesh.rotation.x = 0.15;
  devGroup.add(baseMesh);

  // Floating Wireframe Orb (Python Symbol Representation)
  const orbGeometry = new THREE.IcosahedronGeometry(0.5, 2);
  const orbMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0xf39c12,
    emissiveIntensity: 0.45,
    wireframe: true
  });
  const orbMesh = new THREE.Mesh(orbGeometry, orbMaterial);
  orbMesh.position.set(1.8, 1.1, 0.5);
  devGroup.add(orbMesh);

  // Floating Code Objects (Gold & Silver Cubes)
  const cubeGeometry = new THREE.BoxGeometry(0.35, 0.35, 0.35);

  const cube1 = new THREE.Mesh(cubeGeometry, new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 }));
  cube1.position.set(-1.8, 1.2, 0.2);
  devGroup.add(cube1);

  const cube2 = new THREE.Mesh(cubeGeometry, new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 }));
  cube2.position.set(-2.0, -0.6, 0.4);
  devGroup.add(cube2);

  // Background Particles Field (Golden & Cyan Dust)
  const isMobile = window.innerWidth < 640;
  const particleCount = isMobile ? 50 : 130;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 12;
    positions[i + 1] = (Math.random() - 0.5) * 12;
    positions[i + 2] = (Math.random() - 0.5) * 8;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.045,
    color: 0xd4af37,
    transparent: true,
    opacity: 0.75
  });
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Mouse Parallax Interaction
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX = (e.clientX - windowHalfX) / windowHalfX;
    mouseY = (e.clientY - windowHalfY) / windowHalfY;
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate developer group slowly
    devGroup.rotation.y = elapsedTime * 0.25;

    // Floating orb & cube animations
    orbMesh.rotation.x = elapsedTime * 0.5;
    orbMesh.rotation.y = elapsedTime * 0.7;
    orbMesh.position.y = 1.1 + Math.sin(elapsedTime * 2) * 0.12;

    cube1.rotation.x = elapsedTime * 0.8;
    cube1.position.y = 1.2 + Math.cos(elapsedTime * 2) * 0.1;

    cube2.rotation.z = elapsedTime * 0.6;
    cube2.position.y = -0.6 + Math.sin(elapsedTime * 1.5) * 0.08;

    // Rotate particle field
    particleSystem.rotation.y = elapsedTime * 0.05;

    // Smooth mouse parallax
    targetRotationY = mouseX * 0.4;
    targetRotationX = mouseY * 0.3;

    devGroup.rotation.y += (targetRotationY - devGroup.rotation.y) * 0.05;
    devGroup.rotation.x += (targetRotationX - devGroup.rotation.x) * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/* ==========================================================================
   7. INTERACTIVE 3D TECH TAG GLOBE
   ========================================================================== */
function initTechGlobe() {
  const canvas = document.getElementById('techGlobeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const tags = portfolioData.skills.tools.concat(['Python', 'Django', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'PostgreSQL']);

  let width = canvas.width;
  let height = canvas.height;
  const radius = Math.min(width, height) * 0.38;

  // Compute spherical 3D points
  const points = tags.map((text, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / tags.length);
    const theta = Math.sqrt(tags.length * Math.PI) * phi;
    return {
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
      text: text
    };
  });

  let angleX = 0.003;
  let angleY = 0.003;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Mouse & Touch events for rotating globe
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    angleY = dx * 0.002;
    angleX = -dy * 0.002;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => isDragging = false);

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseX;
    const dy = e.touches[0].clientY - lastMouseY;
    angleY = dx * 0.003;
    angleX = -dy * 0.003;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  });

  canvas.addEventListener('touchend', () => isDragging = false);

  function rotateX(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y = p.y * cos - p.z * sin;
    const z = p.y * sin + p.z * cos;
    return { ...p, y, z };
  }

  function rotateY(p, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = p.x * cos + p.z * sin;
    const z = -p.x * sin + p.z * cos;
    return { ...p, x, z };
  }

  function renderGlobe() {
    ctx.clearRect(0, 0, width, height);

    points.forEach((p, idx) => {
      points[idx] = rotateX(p, angleX);
      points[idx] = rotateY(points[idx], angleY);
    });

    points.sort((a, b) => b.z - a.z);

    points.forEach((p) => {
      const scale = (p.z + radius * 2) / (radius * 3);
      const alpha = Math.max(0.2, (p.z + radius) / (radius * 2));
      const projX = width / 2 + p.x;
      const projY = height / 2 + p.y;

      ctx.save();
      ctx.font = `${Math.floor(13 * scale + 8)}px Outfit, sans-serif`;
      ctx.fillStyle = (p.text === 'Python' || p.text === 'Django')
        ? `rgba(212, 175, 55, ${alpha})`
        : `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
      ctx.shadowBlur = 10 * alpha;
      ctx.fillText(p.text, projX, projY);
      ctx.restore();
    });

    if (!isDragging) {
      angleX *= 0.98;
      angleY *= 0.98;
      if (Math.abs(angleX) < 0.002) angleX = 0.002;
      if (Math.abs(angleY) < 0.002) angleY = 0.002;
    }

    requestAnimationFrame(renderGlobe);
  }

  renderGlobe();
}

/* ==========================================================================
   8. VANILLA 3D CARD TILT EFFECT
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   9. REUSABLE MAGNETIC BUTTONS INTERACTION
   ========================================================================== */
function initMagneticButtons() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const magneticBtns = document.querySelectorAll('.btn-gradient, .btn-glass, .btn-gradient-outline, .social-icon-btn');

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}
