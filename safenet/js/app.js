/* =========================================================
   app.js — Navegación, temas de "Aprende", "¿Qué hago si me pasó?" y Recursos
   ========================================================= */

/* ---------- 1. Menú responsive y enlace activo ---------- */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", String(open));
});

// Al pulsar un enlace en móvil, cerramos el menú
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Resaltar el enlace de la sección visible
const sections = [...document.querySelectorAll("main section[id]")];
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach((l) => {
        l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

// Animación de entrada de tarjetas
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
function observeReveals() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}

/* ---------- 2. Modal reutilizable ---------- */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function openModal(title, html) {
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}
modal.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

/* ---------- 3. Temas educativos ---------- */
const TEMAS = [
  {
    icono: "🔑",
    color: "icon--blue",
    titulo: "Contraseñas seguras",
    resumen: "Cómo crear y administrar contraseñas difíciles de adivinar.",
    puntos: [
      "Una contraseña segura es larga (12 caracteres o más) y combina letras, números y símbolos.",
      "Usa una contraseña diferente en cada cuenta: si una se filtra, las demás siguen protegidas.",
      "Evita datos personales como tu nombre, fecha de nacimiento, equipo favorito o número de documento.",
      "Activa la autenticación de dos factores (2FA): además de la contraseña se pide un código temporal.",
      "Un gestor de contraseñas te permite guardarlas sin necesidad de memorizarlas todas."
    ]
  },
  {
    icono: "🎣",
    color: "icon--red",
    titulo: "Phishing y suplantación",
    resumen: "Aprende a reconocer intentos de fraude por correo, mensajes y sitios falsos.",
    puntos: [
      "El phishing es un engaño en el que alguien se hace pasar por una entidad conocida para obtener tus datos.",
      "Señales de alerta: urgencia (\"tu cuenta será bloqueada hoy\"), errores de redacción y remitentes extraños.",
      "Revisa la dirección real del enlace antes de pulsarlo; los dominios falsos imitan al original con letras cambiadas.",
      "Ninguna entidad seria pide contraseñas ni códigos de verificación por mensaje o llamada.",
      "Si dudas, entra a la plataforma escribiendo tú mismo la dirección oficial, no desde el enlace recibido."
    ]
  },
  {
    icono: "📱",
    color: "icon--violet",
    titulo: "Redes sociales seguras",
    resumen: "Configura tu privacidad y evita compartir información delicada.",
    puntos: [
      "Revisa quién puede ver tus publicaciones, historias y lista de amigos.",
      "Evita publicar tu dirección, tu documento, tu horario diario o fotos de tarjetas y boletos.",
      "Los perfiles falsos suelen tener pocas publicaciones, fotos recientes y contactos en común dudosos.",
      "Desactiva la ubicación en las publicaciones si no es necesaria.",
      "Cierra sesión en dispositivos que no reconozcas desde la configuración de seguridad."
    ]
  },
  {
    icono: "🦠",
    color: "icon--green",
    titulo: "Malware",
    resumen: "Qué es un programa malicioso y cómo llega a un dispositivo.",
    puntos: [
      "Malware es cualquier programa creado para dañar un dispositivo o robar información.",
      "Llega en archivos adjuntos, programas \"gratis\" de páginas no oficiales, USB desconocidas o falsas actualizaciones.",
      "Descarga aplicaciones solo desde tiendas oficiales o del sitio del fabricante.",
      "Mantén el sistema y las aplicaciones actualizados: las actualizaciones corrigen fallos de seguridad.",
      "Señales de alerta: el equipo se vuelve muy lento, aparecen ventanas o programas que no instalaste."
    ]
  },
  {
    icono: "🔗",
    color: "icon--blue",
    titulo: "Enlaces peligrosos",
    resumen: "Señales que indican que un enlace puede ser sospechoso.",
    puntos: [
      "Dominios que imitan a los reales cambiando letras (por ejemplo, banc0 en lugar de banco).",
      "Enlaces acortados que ocultan el destino real.",
      "Direcciones con muchos guiones, números o palabras como \"premio\", \"gratis\" o \"verificar\".",
      "Páginas que piden tu usuario y contraseña justo después de pulsar un enlace recibido.",
      "En el computador, deja el cursor sobre el enlace para ver la dirección real antes de abrirlo."
    ]
  },
  {
    icono: "👤",
    color: "icon--violet",
    titulo: "Información personal",
    resumen: "Qué datos conviene proteger y no compartir públicamente.",
    puntos: [
      "Protege: documento de identidad, dirección, datos bancarios, contraseñas y códigos de verificación.",
      "Comparte lo mínimo necesario en formularios: pregúntate si realmente hacen falta esos datos.",
      "Antes de enviar una foto de un documento, comprueba que el destinatario es oficial.",
      "Revisa los permisos que pides a las aplicaciones (cámara, contactos, ubicación).",
      "Recuerda que lo que se publica puede ser copiado y difundido por otras personas."
    ]
  }
];

const topicsGrid = document.getElementById("topicsGrid");
TEMAS.forEach((tema, i) => {
  const card = document.createElement("article");
  card.className = "card card--topic reveal";
  card.innerHTML = `
    <span class="icon ${tema.color}">${tema.icono}</span>
    <h3>${tema.titulo}</h3>
    <p>${tema.resumen}</p>
    <button class="btn btn--outline" data-topic="${i}">Aprender más</button>`;
  topicsGrid.appendChild(card);
});

topicsGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-topic]");
  if (!btn) return;
  const tema = TEMAS[Number(btn.dataset.topic)];
  openModal(
    `${tema.icono} ${tema.titulo}`,
    `<p>${tema.resumen}</p><h4>Ideas clave</h4><ul>${tema.puntos.map((p) => `<li>${p}</li>`).join("")}</ul>`
  );
});

/* ---------- 4. ¿Qué hago si me pasó? ---------- */
const SITUACIONES = [
  {
    icono: "🔐",
    titulo: "Creo que robaron mi cuenta",
    pasos: [
      "Intenta recuperar la cuenta mediante los mecanismos oficiales de la plataforma.",
      "Cambia la contraseña por una nueva que no hayas usado antes.",
      "Revisa las sesiones activas y cierra las que no reconozcas.",
      "Activa la autenticación de dos factores.",
      "Comprueba que el correo y el teléfono de recuperación no hayan sido modificados.",
      "Avisa a tus contactos si desde la cuenta se enviaron mensajes extraños.",
      "Contacta al soporte oficial de la plataforma."
    ]
  },
  {
    icono: "🔗",
    titulo: "Hice clic en un enlace sospechoso",
    pasos: [
      "Cierra la página sin escribir ningún dato.",
      "Si alcanzaste a escribir una contraseña, cámbiala de inmediato en el sitio oficial.",
      "Revisa si iniciaste sesión y cierra las sesiones desconocidas.",
      "Analiza el dispositivo con la herramienta de seguridad que tengas instalada.",
      "Vigila tus cuentas y movimientos durante los días siguientes."
    ]
  },
  {
    icono: "📥",
    titulo: "Descargué un archivo extraño",
    pasos: [
      "No lo abras y elimínalo de la carpeta de descargas.",
      "Si ya lo abriste, desconecta el equipo de internet mientras lo revisas.",
      "Realiza un análisis completo del dispositivo.",
      "Cambia las contraseñas más importantes desde otro dispositivo de confianza.",
      "Si el equipo sigue con un comportamiento raro, busca apoyo técnico."
    ]
  },
  {
    icono: "💳",
    titulo: "Me estafaron o me pidieron dinero",
    pasos: [
      "Reúne las pruebas: capturas de pantalla, números, enlaces y comprobantes.",
      "Contacta cuanto antes a tu banco o al medio de pago utilizado.",
      "Bloquea y reporta el perfil o el número desde el que te contactaron.",
      "Presenta el reporte ante las autoridades competentes de tu país.",
      "No pagues más dinero para \"recuperar\" lo perdido: suele ser parte del mismo engaño."
    ]
  },
  {
    icono: "📱",
    titulo: "Perdí mi dispositivo (celular o computador)",
    pasos: [
      "Usa la función de localización o bloqueo remoto desde otro dispositivo.",
      "Cambia las contraseñas de las cuentas que tenías abiertas allí.",
      "Cierra las sesiones activas de correo, redes y banca.",
      "Pide a tu operador el bloqueo de la línea y de la tarjeta SIM.",
      "Reporta la pérdida o el robo ante las autoridades."
    ]
  }
];

const helpList = document.getElementById("helpList");
const helpDetail = document.getElementById("helpDetail");

SITUACIONES.forEach((s, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<button class="help__item" data-help="${i}">
      <span aria-hidden="true">${s.icono}</span> ${s.titulo}
      <span class="arrow" aria-hidden="true">›</span>
    </button>`;
  helpList.appendChild(li);
});

function mostrarSituacion(index) {
  const s = SITUACIONES[index];
  helpDetail.innerHTML = `
    <h3>${s.icono} ${s.titulo}</h3>
    <p>Sigue estos pasos con calma, en este orden:</p>
    <ol>${s.pasos.map((p) => `<li>${p}</li>`).join("")}</ol>`;
  helpList.querySelectorAll(".help__item").forEach((b) =>
    b.classList.toggle("is-active", Number(b.dataset.help) === index)
  );
}

helpList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-help]");
  if (btn) mostrarSituacion(Number(btn.dataset.help));
});
mostrarSituacion(0); // mostramos la primera por defecto

/* ---------- 5. Recursos ---------- */
const RECURSOS = [
  { categoria: "Seguridad de cuentas", titulo: "Verificación en dos pasos de Google", descripcion: "Guía oficial para activar el segundo factor en tu cuenta de Google.", url: "https://support.google.com/accounts/answer/185839" },
  { categoria: "Seguridad de cuentas", titulo: "Centro de seguridad de Microsoft", descripcion: "Cómo revisar la actividad y proteger tu cuenta Microsoft.", url: "https://support.microsoft.com/es-es/security" },
  { categoria: "Phishing", titulo: "Cómo evitar el phishing (Google)", descripcion: "Explicación oficial sobre correos y mensajes fraudulentos.", url: "https://support.google.com/mail/answer/8253" },
  { categoria: "Phishing", titulo: "Mensajes sospechosos en WhatsApp", descripcion: "Recomendaciones oficiales frente a mensajes de desconocidos.", url: "https://faq.whatsapp.com/1155000844173168" },
  { categoria: "Redes sociales", titulo: "Privacidad en Instagram", descripcion: "Configura quién puede ver y comentar tu contenido.", url: "https://help.instagram.com/196883487377501" },
  { categoria: "Redes sociales", titulo: "Seguridad en Facebook", descripcion: "Centro oficial de privacidad y seguridad de la cuenta.", url: "https://www.facebook.com/help/285695718429403" },
  { categoria: "Privacidad", titulo: "Comprobación de privacidad de Google", descripcion: "Herramienta oficial para revisar tus datos y permisos.", url: "https://myaccount.google.com/privacycheckup" },
  { categoria: "Seguridad en dispositivos", titulo: "Encontrar mi dispositivo (Android)", descripcion: "Localiza, bloquea o borra tu teléfono a distancia.", url: "https://support.google.com/android/answer/6160491" },
  { categoria: "Seguridad en dispositivos", titulo: "Buscar mi iPhone (Apple)", descripcion: "Guía oficial de Apple para dispositivos perdidos.", url: "https://support.apple.com/es-es/HT210515" },
  { categoria: "Protección de datos", titulo: "Guías de INCIBE (España)", descripcion: "Material educativo público sobre seguridad para ciudadanos.", url: "https://www.incibe.es/ciudadania" },
  { categoria: "Protección de datos", titulo: "Have I Been Pwned", descripcion: "Consulta si tu correo apareció en filtraciones de datos conocidas.", url: "https://haveibeenpwned.com/" },
  { categoria: "Seguridad de cuentas", titulo: "Sesiones activas en TikTok", descripcion: "Cómo revisar los dispositivos conectados a tu cuenta.", url: "https://support.tiktok.com/es/account-and-privacy/account-privacy-settings" }
];

const resourcesGrid = document.getElementById("resourcesGrid");
const resourceFilters = document.getElementById("resourceFilters");
const categorias = ["Todos", ...new Set(RECURSOS.map((r) => r.categoria))];

categorias.forEach((cat, i) => {
  const btn = document.createElement("button");
  btn.className = "chip" + (i === 0 ? " is-active" : "");
  btn.textContent = cat;
  btn.dataset.cat = cat;
  resourceFilters.appendChild(btn);
});

function pintarRecursos(categoria = "Todos") {
  const lista = categoria === "Todos" ? RECURSOS : RECURSOS.filter((r) => r.categoria === categoria);
  resourcesGrid.innerHTML = lista
    .map(
      (r) => `<article class="card reveal">
        <span class="tag">${r.categoria}</span>
        <h3>${r.titulo}</h3>
        <p>${r.descripcion}</p>
        <p><a class="btn btn--outline" href="${r.url}" target="_blank" rel="noopener noreferrer">Ver recurso</a></p>
      </article>`
    )
    .join("");
  observeReveals();
}

resourceFilters.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  resourceFilters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-active", c === chip));
  pintarRecursos(chip.dataset.cat);
});

pintarRecursos();
observeReveals();
