'use strict';

// Navigation and lightweight scroll animations — no external dependencies.
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
menuToggle.addEventListener('click', () => {
  const opened = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.setAttribute('aria-label', opened ? 'Cerrar menú' : 'Abrir menú');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}));
document.querySelector('#year').textContent = String(new Date().getFullYear());
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('js-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// TSJ Arcade / Bug Hunt — intentionally simple, accessible vanilla JavaScript.
const COLS = 9;
const ROWS = 7;
const WIN_SCORE = 5;
const gameBoard = document.querySelector('#gameBoard');
const gameOverlay = document.querySelector('#gameOverlay');
const scoreValue = document.querySelector('#scoreValue');
const livesValue = document.querySelector('#livesValue');
const startButton = document.querySelector('#startGame');
const gameMessage = document.querySelector('#gameMessage');
const directions = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0], w:[0,-1], s:[0,1], a:[-1,0], d:[1,0] };
let game = null;

function id(pos) { return pos.y * COLS + pos.x; }
function equal(a, b) { return a.x === b.x && a.y === b.y; }
function randomFree(used) {
  const free = [];
  for (let y=0; y<ROWS; y++) for (let x=0; x<COLS; x++) {
    const pos = {x,y};
    if (!used.some(other => equal(pos, other))) free.push(pos);
  }
  return free[Math.floor(Math.random() * free.length)];
}
function renderGame() {
  const tiles = Array.from({length:ROWS * COLS}, () => '<div class="cell" aria-hidden="true"></div>');
  if (game) {
    game.bugs.forEach(bug => {tiles[id(bug)] = '<div class="cell bug" aria-hidden="true">✕</div>';});
    if (game.idea) tiles[id(game.idea)] = '<div class="cell idea" aria-hidden="true">✦</div>';
    tiles[id(game.player)] = '<div class="cell player" aria-hidden="true">&lt;/&gt;</div>';
    scoreValue.textContent = `${game.score}/${WIN_SCORE}`;
    livesValue.textContent = '♥'.repeat(game.lives) + '♡'.repeat(3-game.lives);
    gameBoard.setAttribute('aria-label', `Bug Hunt: ${game.score} de ${WIN_SCORE} ideas, ${game.lives} vidas. Personaje en columna ${game.player.x+1}, fila ${game.player.y+1}`);
  }
  gameBoard.innerHTML = tiles.join('');
}
function startGame() {
  game = { player: {x:0,y:3}, bugs: [], idea:null, score:0, lives:3, active:true, moves:0 };
  const occupied = [game.player];
  for(let i=0;i<7;i++) { const bug = randomFree(occupied); game.bugs.push(bug); occupied.push(bug); }
  game.idea = randomFree(occupied);
  gameOverlay.hidden = true;
  gameMessage.textContent = '¡En marcha! Recoge los destellos ✦ y esquiva los bugs ✕.';
  startButton.innerHTML = 'REINICIAR JUEGO <span aria-hidden="true">↻</span>';
  renderGame();
}
function endGame(won) {
  game.active = false;
  gameOverlay.hidden = false;
  gameOverlay.innerHTML = won
    ? '<span class="overlay-pixel">✳ ✳ ✳</span><strong>¡LEVEL<br>COMPLETE!</strong><span>5 IDEAS · SIN EXCUSAS · REINICIA PARA JUGAR</span>'
    : '<span class="overlay-pixel">✕ ✕ ✕</span><strong>GAME<br>OVER</strong><span>LOS BUGS GANARON ESTA RONDA · REINTENTA</span>';
  gameMessage.textContent = won ? '¡Excelente! Has recogido las 5 ideas. 🏆' : 'Perdiste tus 3 vidas. ¡Puedes intentarlo otra vez!';
  renderGame();
}
function moveGame(dx, dy) {
  if (!game || !game.active) return;
  const next = {x:Math.max(0,Math.min(COLS-1,game.player.x+dx)), y:Math.max(0,Math.min(ROWS-1,game.player.y+dy))};
  if (equal(next,game.player)) return;
  game.player=next;
  game.moves++;
  if (game.bugs.some(bug=>equal(bug,next))) {
    game.lives--;
    if (game.lives <= 0) {endGame(false);return;}
    gameMessage.textContent=`¡Uy, un bug! Te quedan ${game.lives} vidas.`;
    game.player={x:0,y:3};
  } else if (game.idea && equal(next,game.idea)) {
    game.score++;
    if(game.score === WIN_SCORE){endGame(true);return;}
    game.idea=randomFree([game.player,...game.bugs]);
    gameMessage.textContent=`¡Idea capturada! ${WIN_SCORE - game.score} para ganar.`;
  }
  renderGame();
}
startButton.addEventListener('click',startGame);
document.addEventListener('keydown',event => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  const step = directions[key];
  if (!step || !game || !game.active) return;
  if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
  event.preventDefault();
  moveGame(...step);
});
document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click',() => {
  const key='Arrow'+button.dataset.direction[0].toUpperCase()+button.dataset.direction.slice(1);
  moveGame(...directions[key]);
}));
renderGame();

// TSJ TERMINAL — Comandos reales sin eval, sin API y sin dependencias.
(() => {
  const form = document.querySelector('#terminalForm');
  const field = document.querySelector('#terminalInput');
  const log = document.querySelector('#terminalLog');
  const section = document.querySelector('#terminal');
  if (!form || !field || !log || !section) return;

  const commands = {
    ayuda: { message: 'Comandos disponibles:\nquien · proyectos · campus · stack · arcade · contacto · github · sorpresa · limpiar' },
    quien: { message: 'Soy Thomas Serrano Jácome. Estudio desarrollo de software en Campuslands y me gusta construir soluciones web, trabajar con datos y seguir aprendiendo.', href: '#sobre-mi', link: 'CONOCER MI PERFIL ↗' },
    proyectos: { message: 'Mis proyectos destacados: Campus Pulse (hackatón), Acme School, Cola Virtual y MatchUp.', href: '#proyectos', link: 'EXPLORAR PROYECTOS ↗' },
    campus: { message: 'CAMPUS PULSE / HACKATÓN\nAplicación en equipo: mapa de espacios, reservas, recursos, incidencias y herramientas de IA. Mi rol: datos oficiales y pruebas de datos y fechas. El repositorio del equipo es privado.', href: '#proyectos', link: 'VER PROYECTO DESTACADO ↗' },
    stack: { message: 'Tecnologías: Java, JavaScript, Python, SQL, HTML/CSS, APIs REST. Estoy aprendiendo Spring Boot y desarrollo backend.', href: '#habilidades', link: 'VER HABILIDADES ↗' },
    arcade: { message: 'Desafío desbloqueado: Bug Hunt. Atrapa cinco ideas y esquiva los bugs. Se juega con WASD, flechas o controles táctiles.', href: '#arcade', link: 'IR A BUG HUNT ↗' },
    contacto: { message: '¿Tienes un proyecto? Escríbeme a thomasserranojacome@gmail.com.', href: 'mailto:thomasserranojacome@gmail.com?subject=Proyecto%20desde%20TSJ%20Terminal', link: 'ENVIAR CORREO ↗' },
    github: { message: 'Mis repositorios y proyectos de aprendizaje están en GitHub.', href: 'https://github.com/ThomasSerranoJacome', link: 'ABRIR GITHUB ↗' },
    sorpresa: { message: '      [ TSJ / LEVEL UNLOCKED ]\n      BUILD  →  TEST  →  SHIP\n      ¡Encontraste el comando secreto!\n      Curiosidad + constancia = progreso.', href: '#arcade', link: 'DESBLOQUEAR EL ARCADE ↗' }
  };

  function addEntry(command, response, isError = false) {
    const entry = document.createElement('div');
    entry.className = 'terminal-entry' + (isError ? ' terminal-error' : '');
    const echo = document.createElement('p');
    echo.className = 'terminal-echo';
    echo.textContent = 'visitor@tsj:~$ ' + command;
    const answer = document.createElement('p');
    answer.className = 'terminal-answer';
    answer.textContent = response.message;
    entry.append(echo, answer);
    if (response.href) {
      const link = document.createElement('a');
      link.href = response.href;
      link.className = 'terminal-action';
      link.textContent = response.link;
      if (response.href.startsWith('https://')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      entry.append(link);
    }
    log.append(entry);
    const entries = log.querySelectorAll('.terminal-entry');
    if (entries.length > 8) entries[0].remove();
    log.scrollTop = log.scrollHeight;
  }

  function runCommand(raw) {
    const command = raw.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/^\/+/, '');
    if (!command) return;
    field.value = '';
    if (command === 'limpiar' || command === 'clear') {
      log.replaceChildren();
      addEntry(command, { message: 'Pantalla limpia. Escribe ayuda para ver los comandos.' });
      return;
    }
    const key = command === 'help' ? 'ayuda' : command === 'quien-soy' || command === 'about' ? 'quien' : command === 'skills' ? 'stack' : command === '?' ? 'sorpresa' : command;
    const response = commands[key];
    if (response) addEntry(command, response);
    else addEntry(command, { message: 'Comando no reconocido. Prueba con ayuda, proyectos, stack o contacto.' }, true);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    runCommand(field.value);
  });
  document.querySelectorAll('[data-terminal-command]').forEach((button) => {
    button.addEventListener('click', () => {
      runCommand(button.dataset.terminalCommand);
      if (window.matchMedia('(hover: hover)').matches) field.focus({ preventScroll: true });
    });
  });
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      field.focus({ preventScroll: true });
    }
    if (event.key === 'Escape' && document.activeElement === field) field.blur();
  });
})();


// SCROLL STORIES / V7 — progreso, secciones activas y revelados progresivos.
(() => {
  const progress = document.querySelector('#siteProgressBar');
  const chapterNo = document.querySelector('#scrollChapterNo');
  const chapterName = document.querySelector('#scrollChapterName');
  const toggle = document.querySelector('#motionToggle');
  const toggleState = document.querySelector('#motionToggleState');
  const chapters = [
    ['inicio', 'INICIO'], ['terminal', 'TERMINAL'],
    ['sobre-mi', 'SOBRE MÍ'], ['proyectos', 'PROYECTOS'],
    ['habilidades', 'STACK'], ['servicios', 'SERVICIOS'],
    ['arcade', 'ARCADE'], ['contacto', 'CONTACTO']
  ].map(([id, name]) => ({ element: document.getElementById(id), id, name }))
   .filter((item) => item.element);
  if (!progress || !toggle || !chapters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let effectsOn = !prefersReduced.matches;
  let currentId = '';

  function updateEffects() {
    document.body.classList.toggle('motion-paused', !effectsOn);
    toggle.setAttribute('aria-pressed', String(effectsOn));
    toggle.setAttribute('aria-label', effectsOn ? 'Desactivar efectos de movimiento' : 'Activar efectos de movimiento');
    toggleState.textContent = effectsOn ? 'ON' : 'OFF';
  }
  updateEffects();
  toggle.addEventListener('click', () => { effectsOn = !effectsOn; updateEffects(); });

  const observed = [
    ...document.querySelectorAll('.section-kicker, .service-item, .skill-panel, .project-card, .contact-bottom, .identity-facts')
  ].filter((element) => !element.classList.contains('reveal'));
  if ('IntersectionObserver' in window && !prefersReduced.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('motion-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

    observed.forEach((element, i) => {
      element.classList.add('motion-item');
      if (element.classList.contains('section-kicker')) element.classList.add(i % 2 ? 'motion-from-right' : 'motion-from-left');
      if (element.classList.contains('project-card')) element.classList.add('motion-scale');
      observer.observe(element);
    });
  }

  let scheduled = false;
  function updateScroll() {
    scheduled = false;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const percent = Math.min(1, Math.max(0, window.scrollY / max));
    progress.style.transform = 'scaleX(' + percent + ')';

    let current = chapters[0];
    const guide = window.innerHeight * 0.42;
    chapters.forEach((chapter) => {
      if (chapter.element.getBoundingClientRect().top <= guide) current = chapter;
    });
    if (current.id !== currentId) {
      currentId = current.id;
      chapters.forEach((chapter) => chapter.element.classList.toggle('is-current', chapter.id === current.id));
      chapterNo.textContent = String(chapters.indexOf(current) + 1).padStart(2, '0') + ' / ' + String(chapters.length).padStart(2, '0');
      chapterName.textContent = current.name;
      document.querySelectorAll('#navLinks a[href^="#"]').forEach((link) => {
        if (link.getAttribute('href') === '#' + current.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    if (effectsOn && !prefersReduced.matches && window.innerWidth > 760) {
      const panel = document.querySelector('.identity-panel');
      if (panel) panel.style.setProperty('--hero-parallax', Math.min(22, Math.max(0, window.scrollY * 0.06)).toFixed(1) + 'px');
    }
  }
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
  onScroll();

  const previews = document.querySelectorAll('.project-preview');
  previews.forEach((preview) => {
    preview.addEventListener('pointermove', (event) => {
      if (!effectsOn || prefersReduced.matches || event.pointerType === 'touch') return;
      const bounds = preview.getBoundingClientRect();
      preview.style.setProperty('--glow-x', ((event.clientX - bounds.left) / bounds.width * 100).toFixed(1) + '%');
      preview.style.setProperty('--glow-y', ((event.clientY - bounds.top) / bounds.height * 100).toFixed(1) + '%');
    }, { passive: true });
    preview.addEventListener('pointerleave', () => {
      preview.style.removeProperty('--glow-x');
      preview.style.removeProperty('--glow-y');
    });
  });
})();


// V8 / CINEMATIC 3D — perspectiva real en CSS, sin WebGL ni dependencias.
(() => {
  const stage = document.querySelector('#cinemaStage');
  const world = document.querySelector('#cinemaWorld');
  const toggle = document.querySelector('#cinemaToggle');
  const explorer = document.querySelector('#cinemaExplore');
  const visual = document.querySelector('.hero-visual--editorial');
  if (!stage || !world || !toggle || !visual) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const suitableDesktop = window.matchMedia('(min-width: 761px) and (pointer: fine)');
  let enabled = suitableDesktop.matches && !reducedMotion.matches;
  let visible = true;
  let pointerPending = false;
  let pointX = 0;
  let pointY = 0;

  function resetRotation() {
    world.style.setProperty('--cinema-rotate-x', '0deg');
    world.style.setProperty('--cinema-rotate-y', '0deg');
  }

  function canAnimate() {
    return enabled && visible && !reducedMotion.matches && !document.body.classList.contains('motion-paused') && !document.hidden;
  }

  function syncState() {
    document.body.classList.toggle('cinema-enabled', enabled);
    toggle.textContent = enabled ? 'VISTA CLÁSICA ↙' : 'ACTIVAR VISTA 3D ↗';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Volver a la portada clásica' : 'Activar portada tridimensional');
    stage.setAttribute('aria-hidden', 'true');
    stage.classList.toggle('cinema-sleep', !canAnimate());
    if (!canAnimate()) resetRotation();
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    syncState();
  });

  // Sin animación fuera de la pantalla: ahorra CPU y batería.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      syncState();
    }, { threshold: 0.02 });
    observer.observe(visual);
  }

  visual.addEventListener('pointermove', (event) => {
    if (!canAnimate() || event.pointerType !== 'mouse') return;
    const rect = visual.getBoundingClientRect();
    pointX = ((event.clientX - rect.left) / rect.width - 0.5) * 15;
    pointY = (0.5 - (event.clientY - rect.top) / rect.height) * 11;
    if (pointerPending) return;
    pointerPending = true;
    requestAnimationFrame(() => {
      pointerPending = false;
      if (!canAnimate()) return;
      world.style.setProperty('--cinema-rotate-y', pointX.toFixed(2) + 'deg');
      world.style.setProperty('--cinema-rotate-x', pointY.toFixed(2) + 'deg');
    });
  }, { passive: true });
  visual.addEventListener('pointerleave', resetRotation);

  if (explorer) {
    explorer.addEventListener('click', () => {
      if (!canAnimate()) return;
      visual.classList.add('cinema-exiting');
      window.setTimeout(() => visual.classList.remove('cinema-exiting'), 600);
    });
  }

  document.addEventListener('visibilitychange', syncState);
  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) enabled = false;
    syncState();
  });
  new MutationObserver(syncState).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  syncState();
})();


// V9 / CINEMATIC INTRO — accesible, una vez por pestaña, sin dependencias.
(() => {
  if (!document.documentElement.classList.contains('intro-pending')) return;
  const overlay = document.querySelector('#introOverlay');
  const skip = document.querySelector('#skipIntro');
  if (!overlay || !skip) { document.documentElement.classList.remove('intro-pending'); return; }
  let finished = false;
  function onIntroKey(event) {
    if (event.key === 'Escape') { event.preventDefault(); finishIntro(); }
  }
  function finishIntro() {
    if (finished) return;
    finished = true;
    document.removeEventListener('keydown', onIntroKey);
    document.documentElement.classList.remove('intro-pending');
    overlay.hidden = true;
    try { sessionStorage.setItem('tsj-intro-seen-v9', '1'); } catch (_) {}
    if (document.activeElement === skip) {
      const hero = document.querySelector('#heroTitle');
      if (hero) { hero.setAttribute('tabindex', '-1'); hero.focus({ preventScroll: true }); }
    }
  }
  skip.addEventListener('click', finishIntro);
  document.addEventListener('keydown', onIntroKey);
  window.setTimeout(finishIntro, 3800);
  if (document.hidden) finishIntro();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) finishIntro();
  });
  if (!finished) skip.focus({ preventScroll: true });
})();


// V10 / SCROLL DIRECTOR — secciones narrativas sin librerías externas.
(() => {
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 1001px) and (min-height: 710px) and (pointer: fine)');
  const hero = document.getElementById('inicio');
  const scene = document.querySelector('#cinemaWorld');
  const visual = document.querySelector('.hero-visual--editorial');
  const heroCopy = document.querySelector('.hero-copy');
  const emblem = document.getElementById('scrollEmblem');
  const network = document.getElementById('skillNetwork');
  const campusStory = document.getElementById('campusStory');
  const campusPlan = campusStory?.closest('.campus-plan');
  const campusProject = document.querySelector('.project-featured');
  const gallery = document.getElementById('projectGallery');
  const gallerySticky = document.getElementById('projectGallerySticky');
  const galleryTrack = document.getElementById('projectGalleryTrack');
  const galleryNumber = document.getElementById('projectGalleryIndex');
  const galleryProgress = document.getElementById('projectGalleryProgress');
  const portals = Array.from(document.querySelectorAll('[data-story-portal]'));
  const skillButtons = Array.from(document.querySelectorAll('[data-skill-key]'));
  const skillDetail = document.getElementById('skillNetworkDetail');
  const campusButtons = Array.from(document.querySelectorAll('[data-campus-phase]'));
  let campusManual = false;
  let currentPhase = -1;
  let galleryDistance = 0;
  let galleryStart = 0;
  let framePending = false;
  let lastEffectsOn = null;

  const effectsEnabled = () => !reduce.matches && !document.body.classList.contains('motion-paused');
  const animatedGallery = () => effectsEnabled() && desktop.matches;

  const skills = {
    java: ['01 / JAVA', 'Práctica de programación orientada a objetos, lógica y estructuras. Sigo fortaleciendo mis proyectos en Java.'],
    javascript: ['02 / JAVASCRIPT', 'Interfaces interactivas, proyectos web y lógica del navegador. Proyectos: Acme School, Cola Virtual y este portafolio.'],
    spring: ['03 / SPRING BOOT', 'Backend en formación: creación de APIs REST, persistencia y arquitectura en Java. Todavía en proceso de aprendizaje.'],
    sql: ['04 / SQL', 'Consultas y modelado de bases de datos como parte de mi formación y ejercicios de práctica.'],
    ia: ['05 / IA APLICADA', 'Campus Pulse integra funciones asistidas por IA como proyecto de equipo. Mi participación fue en datos oficiales y pruebas de datos y fechas.'],
    github: ['06 / GITHUB', 'Versionamiento, repositorios, colaboración y trabajo con ramas. Aquí puedes explorar el código real de mis proyectos.']
  };

  function setSkill(key) {
    const data = skills[key];
    if (!data || !skillDetail) return;
    skillButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.skillKey === key)));
    const tag = skillDetail.querySelector('.mono');
    const description = skillDetail.querySelector('p');
    if (tag) tag.textContent = data[0];
    if (description) description.textContent = data[1];
  }
  skillButtons.forEach((button) => button.addEventListener('click', () => setSkill(button.dataset.skillKey)));

  const campusStates = [
    { title: 'ESPACIOS / VISTA GENERAL', detail: 'Consulta visual de salas, estados y capacidades.' },
    { title: 'RESERVAS / SALAS SELECCIONADAS', detail: 'Dos salas resaltadas como ejemplo de solicitudes de reserva.' },
    { title: 'INCIDENCIAS / ALERTA SIMULADA', detail: 'Un espacio marcado con incidencia para ilustrar su gestión.' }
  ];
  function setCampusPhase(number) {
    const phase = Math.min(2, Math.max(0, number));
    if (!campusPlan || phase === currentPhase) return;
    currentPhase = phase;
    campusPlan.dataset.campusActive = String(phase);
    campusButtons.forEach((button) => {
      const selected = Number(button.dataset.campusPhase) === phase;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    const status = document.getElementById('campusStoryStatus');
    const detail = document.getElementById('campusStoryDetail');
    if (status) status.textContent = campusStates[phase].title;
    if (detail) detail.textContent = campusStates[phase].detail;
  }
  campusButtons.forEach((button) => button.addEventListener('click', () => {
    campusManual = true;
    setCampusPhase(Number(button.dataset.campusPhase));
  }));
  setCampusPhase(0);

  function layoutGallery() {
    if (!gallery || !gallerySticky || !galleryTrack) return;
    gallery.classList.remove('is-scroll-driven');
    gallery.style.removeProperty('height');
    galleryTrack.style.removeProperty('--rail-x');
    galleryDistance = 0;
    if (!animatedGallery()) return;

    // Medir en el layout normal para que el carril funcione sin JavaScript.
    const distance = Math.ceil(galleryTrack.scrollWidth - gallerySticky.clientWidth);
    if (distance < 50) return;
    galleryDistance = distance;
    const galleryHead = gallery.querySelector('.project-gallery-head');
    const headerHeight = galleryHead ? galleryHead.getBoundingClientRect().height + 16 : 0;
    gallery.style.height = Math.ceil(gallerySticky.offsetHeight + distance + headerHeight + 115) + 'px';
    gallery.classList.add('is-scroll-driven');
    galleryStart = gallery.getBoundingClientRect().top + window.scrollY + headerHeight - 96;
  }

  function updateGallery() {
    if (!gallery || !galleryTrack || !galleryNumber) return;
    if (gallery.classList.contains('is-scroll-driven') && galleryDistance) {
      const amount = clamp((window.scrollY - galleryStart) / galleryDistance);
      galleryTrack.style.setProperty('--rail-x', (-galleryDistance * amount).toFixed(1) + 'px');
      gallery.style.setProperty('--rail-progress', Math.max(.04, amount).toFixed(3));
      const count = galleryTrack.querySelectorAll('.project-card').length;
      const index = Math.min(count, Math.floor(amount * count) + 1);
      galleryNumber.textContent = String(index).padStart(2, '0') + ' / ' + String(count).padStart(2, '0');
    } else {
      const scrollMax = Math.max(1, gallerySticky.scrollWidth - gallerySticky.clientWidth);
      const amount = clamp(gallerySticky.scrollLeft / scrollMax);
      const count = galleryTrack.querySelectorAll('.project-card').length;
      galleryNumber.textContent = String(Math.min(count, Math.floor(amount * count) + 1)).padStart(2, '0') + ' / ' + String(count).padStart(2, '0');
      gallery.style.setProperty('--rail-progress', Math.max(.04, amount).toFixed(3));
    }
  }

  // Al navegar con teclado, hacer accesible la tarjeta correspondiente
  // aunque el carril se encuentre desplazado horizontalmente.
  galleryTrack?.addEventListener('focusin', (event) => {
    if (!gallery?.classList.contains('is-scroll-driven')) return;
    const card = event.target.closest('.project-card');
    if (!card) return;
    const destination = galleryStart + Math.min(galleryDistance, Math.max(0, card.offsetLeft));
    window.scrollTo({ top: destination, behavior: 'auto' });
  });
  gallerySticky?.addEventListener('scroll', () => {
    if (!gallery?.classList.contains('is-scroll-driven')) updateGallery();
  }, { passive:true });

  function updateScrollEffects() {
    framePending = false;
    const enabled = effectsEnabled();
    document.body.classList.toggle('scroll-story-active', enabled);

    if (hero && scene && visual && heroCopy) {
      const heroRect = hero.getBoundingClientRect();
      const progress = clamp(-heroRect.top / Math.max(1, heroRect.height * .82));
      if (enabled && window.innerWidth > 900) {
        scene.style.setProperty('--story-scale', (1 - progress * .57).toFixed(3));
        scene.style.setProperty('--story-y', (-progress * 54).toFixed(1) + 'px');
        scene.style.setProperty('--story-turn', (progress * 105).toFixed(1) + 'deg');
        visual.style.setProperty('--story-classic-scale', (1 - progress * .25).toFixed(3));
        heroCopy.style.setProperty('--story-copy-y', (-progress * 25).toFixed(1) + 'px');
        heroCopy.style.setProperty('--story-copy-opacity', (1 - progress * .25).toFixed(3));
        emblem?.classList.toggle('is-visible', progress > .58 && heroRect.bottom > -window.innerHeight * .7);
      } else {
        scene.style.removeProperty('--story-scale');
        scene.style.removeProperty('--story-y');
        scene.style.removeProperty('--story-turn');
        visual.style.removeProperty('--story-classic-scale');
        heroCopy.style.removeProperty('--story-copy-y');
        heroCopy.style.removeProperty('--story-copy-opacity');
        emblem?.classList.remove('is-visible');
      }
    }
    if (network) {
      const rect = network.getBoundingClientRect();
      const phase = clamp((window.innerHeight * .92 - rect.top) / Math.max(1, window.innerHeight * .95));
      network.style.setProperty('--network-progress', enabled ? phase.toFixed(3) : '1');
    }
    if (campusStory && campusProject && !campusManual) {
      const rect = campusProject.getBoundingClientRect();
      if (rect.top < window.innerHeight * .92 && rect.bottom > window.innerHeight * .1) {
        const phaseProgress = clamp((window.innerHeight * .8 - rect.top) / Math.max(1, rect.height * .65));
        setCampusPhase(!enabled ? 0 : phaseProgress < .34 ? 0 : phaseProgress < .72 ? 1 : 2);
      }
    }
    portals.forEach((portal) => {
      const rect = portal.getBoundingClientRect();
      if (rect.top > window.innerHeight * 1.1 || rect.bottom < -100) return;
      const p = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      portal.style.setProperty('--portal-progress', enabled ? p.toFixed(3) : '.55');
    });
    updateGallery();
  }

  function scheduleFrame() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateScrollEffects);
  }
  function onLayoutChange() {
    layoutGallery();
    scheduleFrame();
  }

  // El interruptor existente EFECTOS ON/OFF controla las nuevas animaciones.
  const watcher = new MutationObserver(() => {
    const on = effectsEnabled();
    if (on === lastEffectsOn) return;
    lastEffectsOn = on;
    onLayoutChange();
  });
  watcher.observe(document.body, { attributes:true, attributeFilter:['class'] });
  lastEffectsOn = effectsEnabled();
  window.addEventListener('scroll', scheduleFrame, { passive:true });
  window.addEventListener('resize', onLayoutChange, { passive:true });
  window.addEventListener('load', onLayoutChange);
  reduce.addEventListener?.('change', onLayoutChange);
  desktop.addEventListener?.('change', onLayoutChange);
  onLayoutChange();
})();
