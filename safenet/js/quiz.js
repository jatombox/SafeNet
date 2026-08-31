/* =========================================================
   quiz.js — Módulo "Evalúa tus conocimientos"
   10 preguntas, 4 opciones, explicación y puntuación automática.
   ========================================================= */

const PREGUNTAS = [
  {
    pregunta: "¿Cuál de estas prácticas es más segura?",
    opciones: [
      "Utilizar la misma contraseña en todas las cuentas.",
      "Compartir la contraseña con amigos de confianza.",
      "Utilizar contraseñas diferentes y activar autenticación de dos factores.",
      "Escribir la contraseña en una publicación privada."
    ],
    correcta: 2,
    explicacion: "Contraseñas distintas evitan que una filtración afecte todas tus cuentas, y el segundo factor añade una barrera extra."
  },
  {
    pregunta: "Recibes un mensaje que dice que ganaste un premio y pide tus datos. ¿Qué haces?",
    opciones: [
      "Registro mis datos rápido antes de que se venza.",
      "No respondo, no abro el enlace y elimino el mensaje.",
      "Reenvío el mensaje a mis contactos.",
      "Llamo al número que aparece en el mensaje."
    ],
    correcta: 1,
    explicacion: "Los premios inesperados son una señal clásica de estafa. Lo más seguro es no interactuar con el mensaje."
  },
  {
    pregunta: "¿Qué es el phishing?",
    opciones: [
      "Un programa que acelera el computador.",
      "Un tipo de conexión Wi-Fi pública.",
      "Un engaño en el que alguien se hace pasar por una entidad conocida para obtener tus datos.",
      "Una copia de seguridad automática."
    ],
    correcta: 2,
    explicacion: "El phishing suplanta identidades de bancos, redes sociales o empresas para conseguir contraseñas o datos personales."
  },
  {
    pregunta: "¿Cuál de estas contraseñas es más fuerte?",
    opciones: ["12345678", "Mi nombre y mi año de nacimiento", "contraseña2026", "Rr7#lunaVerde_42"],
    correcta: 3,
    explicacion: "Es larga, mezcla mayúsculas, minúsculas, números y símbolos, y no contiene datos personales ni palabras comunes."
  },
  {
    pregunta: "¿Para qué sirve la autenticación de dos factores (2FA)?",
    opciones: [
      "Para tener dos cuentas al mismo tiempo.",
      "Para pedir una segunda comprobación además de la contraseña.",
      "Para recordar la contraseña automáticamente.",
      "Para navegar más rápido."
    ],
    correcta: 1,
    explicacion: "Aunque alguien conozca tu contraseña, sin el segundo código no puede entrar a tu cuenta."
  },
  {
    pregunta: "¿Cuál de estos enlaces resulta más sospechoso?",
    opciones: [
      "https://accounts.google.com",
      "http://actualiza-tu-banc0-seguro.click/login",
      "https://www.instagram.com",
      "https://support.microsoft.com"
    ],
    correcta: 1,
    explicacion: "Imita el nombre de un banco cambiando una letra, usa un dominio poco común y pide iniciar sesión."
  },
  {
    pregunta: "¿Qué información NO conviene publicar en redes sociales?",
    opciones: [
      "Una foto de un paisaje.",
      "Tu documento de identidad y tu dirección.",
      "El nombre de tu libro favorito.",
      "Una publicación sobre un partido."
    ],
    correcta: 1,
    explicacion: "Los datos de identificación y ubicación pueden usarse para suplantarte o localizarte."
  },
  {
    pregunta: "¿Cómo puede llegar un malware a tu dispositivo?",
    opciones: [
      "Solo por correo electrónico.",
      "Solo desde memorias USB.",
      "Por adjuntos, programas de páginas no oficiales, USB desconocidas o falsas actualizaciones.",
      "Únicamente si el equipo es antiguo."
    ],
    correcta: 2,
    explicacion: "Hay muchas vías de entrada; descargar solo desde fuentes oficiales reduce bastante el riesgo."
  },
  {
    pregunta: "Un amigo te escribe por chat pidiendo el código de verificación que te llegó por SMS. ¿Qué haces?",
    opciones: [
      "Se lo envío, es mi amigo.",
      "No lo comparto y confirmo con él por otro medio.",
      "Lo publico en mi estado.",
      "Le envío también mi contraseña."
    ],
    correcta: 1,
    explicacion: "Los códigos de verificación nunca se comparten: es una técnica frecuente para robar cuentas desde perfiles suplantados."
  },
  {
    pregunta: "¿Por qué es importante mantener las aplicaciones actualizadas?",
    opciones: [
      "Solo para cambiar el diseño.",
      "Porque corrigen fallos de seguridad que podrían ser aprovechados.",
      "Para consumir más batería.",
      "No es importante."
    ],
    correcta: 1,
    explicacion: "Las actualizaciones incluyen parches que cierran vulnerabilidades conocidas."
  }
];

const LETRAS = ["A", "B", "C", "D"];

const quizApp = document.getElementById("quizApp");
let qIndex = 0;
let puntaje = 0;
let bloqueado = false;

function pintarPregunta() {
  const total = PREGUNTAS.length;

  if (qIndex >= total) return pintarResultado();

  const q = PREGUNTAS[qIndex];
  bloqueado = false;

  quizApp.innerHTML = `
    <div class="scam__meta">
      <span>${qIndex + 1} de ${total}</span>
      <span class="progress"><span class="progress__bar" style="width:${(qIndex / total) * 100}%"></span></span>
      <span>Aciertos: ${puntaje}</span>
    </div>

    <p class="quiz__question">${qIndex + 1}. ${q.pregunta}</p>
    <div class="options">
      ${q.opciones
        .map(
          (op, i) => `<button class="option" data-option="${i}">
            <span class="option__key">${LETRAS[i]})</span><span>${op}</span>
          </button>`
        )
        .join("")}
    </div>
    <div id="quizFeedback"></div>`;
}

function elegirOpcion(i) {
  if (bloqueado) return;
  bloqueado = true;

  const q = PREGUNTAS[qIndex];
  const correcto = i === q.correcta;
  if (correcto) puntaje++;

  quizApp.querySelectorAll(".option").forEach((btn) => {
    const idx = Number(btn.dataset.option);
    btn.disabled = true;
    if (idx === q.correcta) btn.classList.add("is-correct");
    if (idx === i && !correcto) btn.classList.add("is-wrong");
  });

  const ultima = qIndex === PREGUNTAS.length - 1;
  document.getElementById("quizFeedback").innerHTML = `
    <div class="feedback ${correcto ? "feedback--ok" : "feedback--bad"}">
      <h4>${correcto ? "Respuesta correcta ✅" : "Respuesta incorrecta ❌"}</h4>
      <p style="margin:0">${q.explicacion}</p>
    </div>
    <div class="actions-row">
      <button class="btn btn--primary" id="quizNext">${ultima ? "Ver mi resultado" : "Siguiente pregunta"}</button>
    </div>`;

  document.getElementById("quizNext").addEventListener("click", () => {
    qIndex++;
    pintarPregunta();
  });
}

// Devuelve el nivel según la puntuación obtenida
function calcularNivel(p) {
  if (p <= 3) return { texto: "🔵 Nivel inicial", mensaje: "Buen punto de partida. Empieza por la sección Aprende." };
  if (p <= 6) return { texto: "🟡 Nivel básico", mensaje: "Ya reconoces varias señales. Repasa phishing y contraseñas." };
  if (p <= 8) return { texto: "🟢 Buen nivel de conocimientos", mensaje: "Identificas bien la mayoría de los riesgos." };
  return { texto: "🟢 Excelente nivel", mensaje: "Dominas las buenas prácticas. Comparte lo aprendido." };
}

function pintarResultado() {
  const total = PREGUNTAS.length;
  const nivel = calcularNivel(puntaje);

  quizApp.innerHTML = `
    <div class="quiz__result">
      <p class="score">${puntaje}/${total}</p>
      <span class="level">${nivel.texto}</span>
      <p>${nivel.mensaje}</p>
      <div class="actions-row" style="justify-content:center">
        <button class="btn btn--primary" id="quizRetry">Intentar nuevamente</button>
        <a class="btn btn--outline" href="#aprende">Ir a Aprende</a>
      </div>
    </div>`;

  document.getElementById("quizRetry").addEventListener("click", () => {
    qIndex = 0;
    puntaje = 0;
    pintarPregunta();
  });
}

quizApp.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-option]");
  if (btn) elegirOpcion(Number(btn.dataset.option));
});

pintarPregunta();
