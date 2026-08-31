/* =========================================================
   scams.js — Módulo "Detecta una estafa"
   Todos los mensajes son EJEMPLOS FICTICIOS con fines educativos.
   ========================================================= */

const ESCENARIOS = [
  {
    app: "WhatsApp",
    avatar: "💬",
    remitente: "+57 300 000 00 00",
    hora: "11:45 a. m.",
    mensaje: `🎉 ¡Felicidades! Has sido seleccionado para recibir un premio de $2.000.000.<br><br>
      Para reclamarlo debes ingresar inmediatamente al siguiente enlace y registrar tus datos:<br>
      <span class="fake-link">www.premios-seguros-2026.com/ganador</span>`,
    esEstafa: true,
    titulo: "Premio falso",
    senales: [
      "Promete dinero inesperado sin que hayas participado en nada.",
      "Crea urgencia: pide actuar \"inmediatamente\".",
      "Solicita datos personales a través de un formulario.",
      "El enlace no pertenece a ninguna empresa oficial."
    ]
  },
  {
    app: "SMS",
    avatar: "🏦",
    remitente: "BANCO-ALERTA",
    hora: "08:12 a. m.",
    mensaje: `Estimado cliente: detectamos un movimiento no autorizado de $890.000.<br><br>
      Si no fue usted, valide su identidad aquí:
      <span class="fake-link">http://banco-verificacion.online/clientes</span><br>
      Su cuenta será bloqueada en 2 horas.`,
    esEstafa: true,
    titulo: "Mensaje bancario falso",
    senales: [
      "Genera miedo con un supuesto cobro no autorizado.",
      "Impone un plazo corto para que no lo pienses.",
      "El dominio no es el del banco (\".online\" y con guiones).",
      "Los bancos no piden validar claves ni datos por enlaces enviados en SMS."
    ]
  },
  {
    app: "Correo electrónico",
    avatar: "📧",
    remitente: "soporte@instagram-seguridad-cuenta.com",
    hora: "Ayer, 9:03 p. m.",
    mensaje: `Tu cuenta fue reportada por actividad inusual y será desactivada.<br><br>
      Para evitarlo, confirma tu usuario y contraseña en este formulario:
      <span class="fake-link">instagram-seguridad-cuenta.com/apelacion</span>`,
    esEstafa: true,
    titulo: "Cuenta de red social supuestamente bloqueada",
    senales: [
      "El remitente imita a la plataforma, pero el dominio es distinto.",
      "Pide la contraseña: ninguna red social lo hace por correo.",
      "Amenaza con eliminar la cuenta para presionarte.",
      "Lo correcto es entrar a la app oficial y revisar las notificaciones allí."
    ]
  },
  {
    app: "Correo electrónico",
    avatar: "💼",
    remitente: "recursoshumanos@empleos-rapidos.net",
    hora: "10:20 a. m.",
    mensaje: `¡Trabaja desde casa 2 horas al día y gana $4.000.000 al mes!<br><br>
      No se requiere experiencia. Solo debes pagar $80.000 por el kit de inscripción
      y enviar una foto de tu documento por este chat.`,
    esEstafa: true,
    titulo: "Oferta de empleo sospechosa",
    senales: [
      "Ofrece ganancias muy altas por muy poco trabajo.",
      "Pide un pago por adelantado para \"inscribirte\".",
      "Solicita documentos personales por un canal informal.",
      "Un proceso de selección real no cobra por contratar."
    ]
  },
  {
    app: "SMS",
    avatar: "📦",
    remitente: "ENVIOS-24",
    hora: "3:41 p. m.",
    mensaje: `Su paquete está retenido en aduana. Pague $9.900 de gestión para liberarlo:
      <span class="fake-link">envios24-pagos.click/tracking</span>`,
    esEstafa: true,
    titulo: "Mensaje de entrega de un paquete",
    senales: [
      "Habla de un envío que quizá no esperas.",
      "Pide un pago pequeño para que no lo dudes.",
      "El enlace usa un dominio raro (\".click\") con guiones.",
      "Verifica siempre el número de guía en la web oficial de la transportadora."
    ]
  },
  {
    app: "Correo electrónico",
    avatar: "🎓",
    remitente: "notificaciones@universidad.edu.co",
    hora: "7:15 a. m.",
    mensaje: `Buenos días. Se publicaron las notas del segundo corte.<br><br>
      Ingresa al portal académico desde la página oficial de la universidad con tu usuario habitual.
      Este mensaje no solicita ningún dato.`,
    esEstafa: false,
    titulo: "Mensaje legítimo",
    senales: [
      "No pide contraseñas, datos ni pagos.",
      "No incluye enlaces sospechosos y remite al portal oficial.",
      "No usa urgencia ni promesas de dinero.",
      "Aun así, entra siempre escribiendo tú mismo la dirección del portal."
    ]
  }
];

/* ---------- Estado del módulo ---------- */
const scamApp = document.getElementById("scamApp");
let scamIndex = 0;
let respondido = false;
let acertados = 0;

function pintarEscenario() {
  const total = ESCENARIOS.length;

  // Pantalla final
  if (scamIndex >= total) {
    scamApp.innerHTML = `
      <div class="quiz__result">
        <span class="icon icon--green">🛡️</span>
        <h3>Completaste todos los escenarios.</h3>
        <p>Identificaste correctamente <strong>${acertados} de ${total}</strong> mensajes.</p>
        <button class="btn btn--primary" id="scamRestart">Volver a empezar</button>
      </div>`;
    document.getElementById("scamRestart").addEventListener("click", reiniciarEscenarios);
    return;
  }

  const esc = ESCENARIOS[scamIndex];
  respondido = false;

  scamApp.innerHTML = `
    <div class="scam__meta">
      <span>Escenario ${scamIndex + 1} de ${total}</span>
      <span class="progress"><span class="progress__bar" style="width:${(scamIndex / total) * 100}%"></span></span>
      <span>Ejemplo educativo</span>
    </div>

    <div class="chat">
      <div class="chat__head">
        <span class="chat__avatar" aria-hidden="true">${esc.avatar}</span>
        <span>${esc.remitente}<br><span class="chat__time">${esc.app} · ${esc.hora}</span></span>
      </div>
      <div class="chat__bubble">${esc.mensaje}</div>
    </div>

    <p style="margin-top:1.1rem;font-weight:600">¿Este mensaje parece seguro o es una posible estafa?</p>
    <div class="answers">
      <button class="btn btn--safe" data-answer="segura">🟢 Parece seguro</button>
      <button class="btn btn--danger" data-answer="estafa">🔴 Es una posible estafa</button>
    </div>
    <div id="scamFeedback"></div>`;
}

function responder(respuesta) {
  if (respondido) return;
  respondido = true;

  const esc = ESCENARIOS[scamIndex];
  const correcto = (respuesta === "estafa") === esc.esEstafa;
  if (correcto) acertados++;

  scamApp.querySelectorAll("[data-answer]").forEach((b) => (b.disabled = true));

  const ultimo = scamIndex === ESCENARIOS.length - 1;
  document.getElementById("scamFeedback").innerHTML = `
    <div class="feedback ${correcto ? "feedback--ok" : "feedback--bad"}">
      <h4>${correcto ? "¡Correcto! 🛡️" : "Cuidado. Revisemos este mensaje."}</h4>
      <p style="margin-bottom:.5rem">${
        esc.esEstafa
          ? "Este mensaje es un <strong>ejemplo de posible estafa</strong>: " + esc.titulo + "."
          : "Este mensaje <strong>no presenta señales de alerta</strong>."
      }</p>
      <ul>${esc.senales.map((s) => `<li>${s}</li>`).join("")}</ul>
    </div>
    <div class="actions-row">
      <button class="btn btn--primary" id="scamNext">${ultimo ? "Ver resultado" : "Siguiente ejemplo"}</button>
      <button class="btn btn--outline" id="scamReset">Volver a empezar</button>
    </div>`;

  document.getElementById("scamNext").addEventListener("click", () => {
    scamIndex++;
    pintarEscenario();
  });
  document.getElementById("scamReset").addEventListener("click", reiniciarEscenarios);
}

function reiniciarEscenarios() {
  scamIndex = 0;
  acertados = 0;
  pintarEscenario();
}

// Delegación de eventos: funciona aunque el contenido se vuelva a dibujar
scamApp.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-answer]");
  if (btn) responder(btn.dataset.answer);
});

pintarEscenario();
