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
