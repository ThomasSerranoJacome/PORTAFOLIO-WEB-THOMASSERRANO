# Thomas Serrano Jácome · Portafolio interactivo

![Tecnologías](https://img.shields.io/badge/HTML5-CSS3%20%7C%20JavaScript-5066de?style=flat-square)
![Estado](https://img.shields.io/badge/Estado-en%20desarrollo-7c57ed?style=flat-square)

Portafolio web personal de **Thomas Serrano Jácome**, estudiante de Desarrollo de Software en **Campuslands**, Bucaramanga, Colombia. Presento proyectos reales, habilidades, servicios que me interesan desarrollar y un minijuego hecho desde cero.

> **Identidad visual (noviembre 2026):** negro profundo, azul eléctrico y blanco, con acentos morados puntuales. Presentación editorial de alto contraste y tarjetas oscuras, sin ilustraciones decorativas.

## ✨ ¿Qué encontrarás?

| Sección | Contenido |
| --- | --- |
| Inicio | Presentación, identidad visual y acceso a los proyectos |
| Sobre mí | Perfil y motivaciones de aprendizaje |
| Proyectos | Ejemplos de trabajos alojados en mi propio GitHub |
| Habilidades | Tecnologías utilizadas y herramientas en aprendizaje |
| Servicios | Áreas de desarrollo e intereses profesionales |
| TSJ Arcade | **Bug Hunt**, juego interactivo de ideas y bugs |
| Contacto | Correo y perfil de GitHub |

### Proyectos destacados

1. **Campus Pulse** — hackatón colaborativa de Campuslands. Mapa de espacios, reservas, recursos, incidencias y apoyo de IA. Mi responsabilidad, según el README del equipo, fue trabajar en **datos oficiales y pruebas de datos y fechas**. El repositorio de `250930/HAKATON_CAMPSULAND` es **privado** y por ello no se publica un enlace externo inaccesible.
2. [Acme School — plataforma de exámenes](https://github.com/ThomasSerranoJacome/ProyectoAcmeschool_JavaScript_Ca-izares_Serrano_Carvajal) — aporté gestión de usuarios y gestión de exámenes.
3. [Cola Virtual — sistema web de turnos](https://github.com/ThomasSerranoJacome/n8n-workflow) — interfaz para solicitudes y consultas de turnos.
4. [MatchUp — catálogo de camisetas](https://github.com/ThomasSerranoJacome/MatchUp-Pagina-Web-) — proyecto frontend.

Los enlaces a repositorios públicos son reales. Los componentes gráficos de la portada son **representaciones ilustrativas**, no capturas del sistema en producción.

## 🕹️ TSJ Arcade: Bug Hunt

El visitante controla un personaje **</>** sobre un tablero de 9 × 7 casillas. Debe reunir **5 ideas ✦** y evitar los bugs **✕**, con un máximo de **3 vidas**.

- Teclado: flechas o **WASD**.
- Móvil: controles táctiles.
- Botón de iniciar/reiniciar, marcador y mensajes de victoria o derrota.
- Todo el juego está escrito en JavaScript puro.

## 🧰 Tecnologías

**HTML5, CSS3 y JavaScript vanilla.** No requiere React, Node.js, npm, dependencias externas de JavaScript, base de datos ni compilación. Se utilizan fuentes de Google Fonts opcionales.

## 📂 Estructura principal

```text
PORTAFOLIO-WEB-THOMASSERRANO/
├── index.html       # Sitio, secciones, proyectos y metadatos
├── styles.css       # Diseño, colores, animaciones y responsive
├── main.js          # Navegación, scroll y juego Bug Hunt
└── README.md        # Documentación
```

**Nota:** el repositorio se reutilizó por decisión de continuidad. Es posible que conserve recursos del proyecto anterior que no sean necesarios para la nueva portada; el sitio principal usa los archivos listados aquí. Antes del rediseño se creó la rama de respaldo [`backup-antes-rediseño-2026`](../../tree/backup-antes-rediseño-2026) para preservar la versión anterior.

## 🚀 Cómo ejecutarlo

1. Clona este repositorio o descarga los archivos.
2. Abre la carpeta en Visual Studio Code.
3. Abre `index.html` en el navegador o usa **Live Server**.
4. Explora las secciones e inicia **Bug Hunt** al final.

No es necesario instalar paquetes.

## 🌐 Publicación en GitHub Pages

Para habilitar el despliegue estático:

1. Ve a **Settings → Pages** dentro del repositorio.
2. En **Build and deployment**, selecciona **Deploy from a branch**.
3. Configura la rama **main** y la carpeta **/(root)**.
4. Guarda y comprueba el enlace que GitHub Pages muestre tras publicar.

La URL esperada, **una vez activado y completado el despliegue**, es:

https://thomasserranojacome.github.io/PORTAFOLIO-WEB-THOMASSERRANO/

El hecho de que la URL esté escrita aquí **no confirma que GitHub Pages ya esté habilitado**.

## 🎨 Personalización

- **Colores:** variables CSS `--ink`, `--paper`, `--cream`, `--lime` (acento morado) y `--orange` (acento azul; nombre técnico heredado). Los nombres se conservaron para no romper estilos.
- **Textos y enlaces de proyectos:** `index.html`.
- **Juego e interacciones:** `main.js`.
- **Responsive y efectos:** `styles.css`.

Los cambios de este rediseño son independientes de los demás repositorios y no alteran los proyectos enlazados.

## ✉️ Autor y contacto

**Thomas Serrano Jácome**  
Estudiante de Desarrollo de Software | Bucaramanga, Colombia

- [GitHub](https://github.com/ThomasSerranoJacome)
- [Correo electrónico](mailto:thomasserranojacome@gmail.com)

---

*Proyecto personal en evolución · 2026.*


## Actualización visual · noviembre de 2026

- **Barlow Condensed (800):** encabezados grandes y nombres de proyectos, con una estética editorial más firme.
- **Inter:** textos y navegación más limpios.
- **Space Mono:** etiquetas técnicas y elementos de interfaz.
- **Paleta más sobria:** fondos navy y grafito, texto blanco, acentos desaturados y menos colores diferentes entre proyectos.
- Se mantiene íntegra la lógica de **TSJ Arcade / Bug Hunt** y los enlaces de proyectos.


## Revisión de diseño · V4

La última revisión incrementa el contraste sin saturar: fondo casi negro, secciones navy, acento azul eléctrico y toques morados. Elimina dibujos flotantes y reemplaza la ilustración principal por un panel tipográfico «TSJ». Prioriza Campus Pulse y proyectos de software sobre ejemplos pequeños. Mantiene el minijuego **Bug Hunt** sin cambiar su lógica.


## TSJ Terminal — experiencia interactiva (noviembre de 2026)

La web incluye una terminal funcional antes de la sección «Sobre mí». Permite explorar el portafolio escribiendo comandos o pulsando atajos táctiles:

- `ayuda`: muestra las opciones disponibles.
- `quien`, `proyectos`, `campus`, `stack`, `arcade`, `contacto`, `github`: responden con información y enlaces reales a las secciones o recursos públicos.
- `sorpresa`: comando secreto.
- `limpiar`: limpia el historial visible.
- **Ctrl + K** (o **⌘ + K** en macOS): desplaza a la terminal y enfoca la entrada.

La experiencia es 100 % **HTML, CSS y JavaScript puro**, sin servicios de terceros ni procesamiento de comandos arbitrarios. La terminal no envía el texto a ningún servidor. Se conserva el videojuego **Bug Hunt** y no se enlaza públicamente al repositorio privado de Campus Pulse.


## Scroll Stories — transiciones y microinteracciones (versión 7)

El portafolio incorpora una capa de movimiento progresivo sin frameworks:

- **Barra de progreso superior** que acompaña el desplazamiento vertical.
- **Indicador de capítulo activo** (Inicio, Terminal, Sobre mí, Proyectos, Stack, Servicios, Arcade y Contacto) y marcado automático de la navegación.
- **Entradas por secciones**: encabezados, tecnologías y servicios aparecen al llegar a ellos, con variaciones de movimiento y retrasos sutiles.
- **Proyectos interactivos** con iluminación suave siguiendo al cursor en dispositivos compatibles.
- **Panel TSJ con leve movimiento de profundidad** en escritorio.
- **Control «EFECTOS ON/OFF»** para desactivar animaciones; se respeta la preferencia del sistema `prefers-reduced-motion`.

Los efectos son decorativos: la lectura, los enlaces, la terminal interactiva y **Bug Hunt** funcionan independientemente de ellos. No se instalaron dependencias adicionales.


## Experiencia 3D cinematográfica (V8 — noviembre de 2026)

La portada incluye una escena tridimensional ligera implementada solo con **transformaciones CSS 3D** (perspectiva, planos rotados y profundidad) y JavaScript nativo. No necesita descargar Three.js, WebGL, modelos 3D ni videos.

- Núcleo TSJ con profundidad, órbitas luminosas, perspectiva y parrilla tecnológica.
- El movimiento del mouse en escritorio inclina suavemente la escena.
- Botón accesible **VISTA CLÁSICA / ACTIVAR VISTA 3D**, sin sacrificar la portada anterior.
- En escritorio compatible se activa 3D por defecto. En móvil y con `prefers-reduced-motion` se ofrece de entrada la vista clásica; el usuario puede optar por una escena estática 3D.
- El escenario se pausa fuera del área visible, cuando la pestaña está oculta o si el visitante apaga los efectos generales.
- La capa 3D es decorativa y queda fuera del árbol de accesibilidad; el contenido semántico de presentación, navegación y proyectos permanece en HTML.
- El enlace «ENTRAR A PROYECTOS» conserva navegación por ancla y añade una transición ligera.
- No modifica TSJ Terminal, Campus Pulse, Scroll Stories, ni el juego Bug Hunt.

Es 3D en CSS y no un motor WebGL; para una fase posterior podrían añadirse modelos ligeros solo si aportan valor y el dispositivo lo permite.


## Entrada cinematográfica TSJ (V9 — noviembre de 2026)

Al entrar por primera vez en una pestaña, se reproduce una intro de aprox. 3,8 segundos: el logo **TSJ** con anillos tridimensionales emerge del fondo, se amplía a gran tamaño y luego se minimiza para revelar el portafolio.

- Animación mediante CSS 3D, reutilizando la identidad de la portada, sin nuevas dependencias.
- Intro una vez por pestaña (`sessionStorage`); para reproducirla otra vez, usa el parámetro `?intro=1`.
- No bloquea enlaces directos a otras secciones (`#proyectos`, `#terminal`, etc.).
- Botón **Saltar intro**, tecla **Escape** y foco de teclado al contenido principal.
- Respeta `prefers-reduced-motion`; un fallback de CSS revela la web incluso si el JavaScript principal falla.
- No elimina el modo clásico, la escena 3D existente, TSJ Terminal, Campus Pulse ni Bug Hunt.
