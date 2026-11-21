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
