/* =========================================================
   PERSONALIZA AQUÍ
   Cambia los textos entre comillas por los tuyos.
   ========================================================= */
const CONFIG = {
  nombreElla: "Mi Amor",
  nombreEl: "Tu enamorado",

  cita: {
    fecha: "Sábado 26 de septiembre",
    hora: "7:00 PM",
    lugar: "Un lugar muy especial (sorpresa 🤫)",
    plan: "Cena romántica + paseo bajo las estrellas",
  },

  corazonesParaGanar: 15,

  // correcta: índice de la respuesta correcta (empieza en 0). Usa -1 si todas son correctas.
  preguntas: [
    {
      pregunta: "¿Quién es la mujer más hermosa del mundo?",
      opciones: ["Una actriz famosa", "Tú, obviamente", "Nadie"],
      correcta: 1,
    },
    {
      pregunta: "¿Cuánto te amo?",
      opciones: ["Mucho", "Muchísimo", "Más que a nada en el universo 🌌"],
      correcta: 2,
    },
    {
      pregunta: "¿Qué es lo que más me gusta de ti?",
      opciones: ["Tu sonrisa", "Tus ojos", "Todo, absolutamente todo"],
      correcta: -1,
    },
    {
      pregunta: "¿Qué pasa con mi corazón cuando te veo?",
      opciones: ["Nada", "Late a mil por hora", "Se duerme"],
      correcta: 1,
    },
    {
      pregunta: "¿Con quién quiero pasar el resto de mi vida?",
      opciones: ["Contigo", "Contigo", "Contigo"],
      correcta: -1,
    },
  ],

  razones: [
    "Por tu sonrisa, que ilumina hasta mis peores días.",
    "Por cómo me miras, que me hace sentir en casa.",
    "Porque contigo todo es más bonito.",
    "Por tu risa, mi sonido favorito del mundo.",
    "Porque eres increíblemente inteligente y fuerte.",
    "Por lo bien que se siente abrazarte.",
    "Porque me haces querer ser mejor cada día.",
    "Porque simplemente eres tú, y eso es perfecto.",
  ],

  carta: `Mi amor:

Desde que llegaste a mi vida, todo tiene más color. Cada mensaje tuyo me saca una sonrisa, cada momento contigo se convierte en mi recuerdo favorito.

Eres la mujer más hermosa del mundo, por fuera y por dentro. Gracias por existir, por tu paciencia, por tu cariño y por dejarme quererte.

Quiero seguir creando mil momentos más a tu lado... y por eso tengo algo que preguntarte.`,

  mensajesNo: [
    "¿Segura?",
    "Piénsalo bien...",
    "Ese botón no funciona.",
    "Mi corazón se está rompiendo.",
    "Te compro chocolates.",
    "Y flores.",
    "Por favor, por favor.",
    "Ya no hay escapatoria.",
  ],
};

/* ========================================================= */

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ---------- Textos personalizados ----------
$$(".her-name").forEach((el) => (el.textContent = CONFIG.nombreElla));
$$(".his-name").forEach((el) => (el.textContent = CONFIG.nombreEl));
$("#catch-goal").textContent = CONFIG.corazonesParaGanar;
$(".catch-goal-2").textContent = CONFIG.corazonesParaGanar;
$("#date-fecha").textContent = CONFIG.cita.fecha;
$("#date-hora").textContent = CONFIG.cita.hora;
$("#date-lugar").textContent = CONFIG.cita.lugar;
$("#date-plan").textContent = CONFIG.cita.plan;

// ---------- Sonidos (Web Audio, sin archivos) ----------
let audioCtx = null;
function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function tone(freq, dur = 0.15, type = "sine", vol = 0.15, when = 0) {
  try {
    const c = ctx();
    const t = c.currentTime + when;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  } catch (e) {}
}
const sfx = {
  pop: () => tone(880, 0.12, "sine", 0.15),
  bad: () => tone(180, 0.25, "triangle", 0.15),
  good: () => { tone(660, 0.12); tone(990, 0.2, "sine", 0.15, 0.1); },
  win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.3, "sine", 0.15, i * 0.12)),
};

// Musiquita romántica en bucle
const melody = [
  [523, 0.5], [659, 0.5], [784, 0.5], [659, 0.5],
  [587, 0.5], [698, 0.5], [880, 0.5], [698, 0.5],
  [523, 0.5], [659, 0.5], [784, 0.5], [1047, 0.5],
  [988, 0.5], [784, 0.5], [659, 1], [0, 0.5],
];
let musicOn = false;
let musicTimer = null;
let noteIdx = 0;
function playNextNote() {
  if (!musicOn) return;
  const [f, d] = melody[noteIdx % melody.length];
  if (f) {
    tone(f, d * 0.9, "sine", 0.06);
    tone(f / 2, d * 0.9, "triangle", 0.03);
  }
  noteIdx++;
  musicTimer = setTimeout(playNextNote, d * 600);
}
function toggleMusic(force) {
  musicOn = typeof force === "boolean" ? force : !musicOn;
  $("#music-btn").classList.toggle("off", !musicOn);
  clearTimeout(musicTimer);
  if (musicOn) playNextNote();
}
$("#music-btn").classList.add("off");
$("#music-btn").addEventListener("click", () => toggleMusic());

// ---------- Partículas de fondo ----------
let bgRate = 380;
function spawnBgHeart() {
  const h = document.createElement("span");
  const petal = Math.random() < 0.28;
  h.className = petal ? "bg-heart petal" : "bg-heart";
  h.style.left = Math.random() * 100 + "vw";
  h.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
  if (!petal) {
    const size = 1.5 + Math.random() * 3;
    h.style.width = size + "px";
    h.style.height = size + "px";
  }
  h.style.animationDuration = 8 + Math.random() * 8 + "s";
  h.addEventListener("animationend", () => h.remove());
  $("#bg-hearts").appendChild(h);
  setTimeout(spawnBgHeart, bgRate);
}
spawnBgHeart();

function burst(x, y, n = 28) {
  const marks = ["✦", "·", "✧", "◦"];
  for (let i = 0; i < n; i++) {
    const b = document.createElement("span");
    b.className = "burst";
    b.textContent = marks[Math.floor(Math.random() * marks.length)];
    const ang = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 200;
    b.style.left = x + "px";
    b.style.top = y + "px";
    b.style.fontSize = 10 + Math.random() * 16 + "px";
    b.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    b.style.setProperty("--dy", Math.sin(ang) * dist + "px");
    b.style.setProperty("--rot", Math.random() * 360 + "deg");
    b.addEventListener("animationend", () => b.remove());
    document.body.appendChild(b);
  }
}

// ---------- Navegación ----------
const levelOf = { "s-catch": 0, "s-quiz": 1, "s-memory": 2, "s-reasons": 3, "s-letter": 4 };
let levelsDone = 0;

function setProgress(n) {
  levelsDone = Math.max(levelsDone, n);
  $$("#progress span").forEach((s, i) => {
    const on = i < levelsDone;
    if (on && !s.classList.contains("on")) s.classList.add("on");
    if (!on) s.classList.remove("on");
  });
}

let transitioning = false;

function activate(id) {
  $$(".screen").forEach((s) => s.classList.remove("active"));
  const next = $("#" + id);
  next.classList.add("active");
  const card = next.querySelector(".card");
  if (card) {
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "";
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  if (id in levelOf) setProgress(levelOf[id]);
  if (id === "s-question" || id === "s-yes") setProgress(5);
  if (id === "s-quiz") startQuiz();
  if (id === "s-memory") startMemory();
  if (id === "s-reasons") startReasons();
  if (id === "s-letter") startLetter();
  if (id === "s-question") startQuestion();
}

function go(id) {
  if (transitioning) return;
  const current = document.querySelector(".screen.active");
  if (current && current.id === id) return;

  const next = $("#" + id);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!current || reduce) {
    activate(id);
    return;
  }

  transitioning = true;
  const overlay = $("#transition");
  $("#tr-kicker").textContent = (next.querySelector(".kicker") || {}).textContent || "";
  $("#tr-title").textContent = (next.querySelector("h1, h2") || {}).innerText || "";
  overlay.classList.remove("hide");
  overlay.classList.add("show");
  sfx.good();
  burst(window.innerWidth / 2, window.innerHeight / 2, 18);

  setTimeout(() => activate(id), 480);
  setTimeout(() => {
    overlay.classList.remove("show");
    overlay.classList.add("hide");
  }, 980);
  setTimeout(() => {
    overlay.classList.remove("show", "hide");
    transitioning = false;
  }, 1450);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (!btn || transitioning) return;
  sfx.pop();
  if (btn.dataset.go === "s-catch" && !musicOn && !$("#music-btn").dataset.touched) {
    $("#music-btn").dataset.touched = "1";
    toggleMusic(true);
  }
  go(btn.dataset.go);
});

// ---------- NIVEL 1: Atrapa corazones ----------
const arena = $("#arena");
const basket = $("#basket");
let catchState = null;

function moveBasket(clientX) {
  const r = arena.getBoundingClientRect();
  const x = Math.max(24, Math.min(r.width - 24, clientX - r.left));
  basket.style.left = x + "px";
}
arena.addEventListener("pointermove", (e) => moveBasket(e.clientX));
arena.addEventListener("pointerdown", (e) => moveBasket(e.clientX));
document.addEventListener("keydown", (e) => {
  if (!catchState) return;
  const r = arena.getBoundingClientRect();
  const cur = parseFloat(basket.style.left) || r.width / 2;
  if (e.key === "ArrowLeft") moveBasket(r.left + cur - 30);
  if (e.key === "ArrowRight") moveBasket(r.left + cur + 30);
});

$("#catch-start").addEventListener("click", () => {
  $("#arena-start").classList.add("hidden");
  arena.querySelectorAll(".falling").forEach((f) => f.remove());
  catchState = { score: 0, items: [], last: performance.now(), spawnIn: 0 };
  $("#catch-score").textContent = 0;
  requestAnimationFrame(catchLoop);
});

function floatText(txt, x, y) {
  const t = document.createElement("span");
  t.className = "float-text";
  t.textContent = txt;
  t.style.left = x + "px";
  t.style.top = y + "px";
  t.addEventListener("animationend", () => t.remove());
  arena.appendChild(t);
}

function catchLoop(now) {
  if (!catchState) return;
  const s = catchState;
  const dt = Math.min(50, now - s.last) / 1000;
  s.last = now;
  const W = arena.clientWidth;
  const H = arena.clientHeight;

  s.spawnIn -= dt;
  if (s.spawnIn <= 0) {
    s.spawnIn = 0.55 + Math.random() * 0.4;
    const bad = Math.random() < 0.18;
    const el = document.createElement("span");
    el.className = bad ? "falling bad" : "falling";
    el.textContent = bad ? "💔" : ["💖", "💗", "💕", "💘", "💝"][Math.floor(Math.random() * 5)];
    const x = 10 + Math.random() * (W - 40);
    el.style.left = x + "px";
    arena.appendChild(el);
    s.items.push({ el, x, y: -40, speed: 120 + Math.random() * 90 + s.score * 4, bad });
  }

  const bx = parseFloat(basket.style.left) || W / 2;
  const catchY = H - 60;

  s.items = s.items.filter((it) => {
    it.y += it.speed * dt;
    it.el.style.transform = `translateY(${it.y}px)`;
    const cx = it.x + 16;
    if (it.y > catchY - 10 && it.y < catchY + 30 && Math.abs(cx - bx) < 42) {
      it.el.remove();
      if (it.bad) {
        s.score = Math.max(0, s.score - 1);
        sfx.bad();
        floatText("-1", cx, catchY - 20);
      } else {
        s.score++;
        sfx.pop();
        floatText("+1", cx, catchY - 20);
        basket.classList.remove("hit");
        void basket.offsetWidth;
        basket.classList.add("hit");
      }
      $("#catch-score").textContent = s.score;
      return false;
    }
    if (it.y > H) {
      it.el.remove();
      return false;
    }
    return true;
  });

  if (s.score >= CONFIG.corazonesParaGanar) {
    s.items.forEach((it) => it.el.remove());
    catchState = null;
    sfx.win();
    const r = arena.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    setProgress(1);
    $("#catch-done").classList.remove("hidden");
    return;
  }
  requestAnimationFrame(catchLoop);
}

// ---------- NIVEL 2: Quiz ----------
let quizIdx = 0;
function startQuiz() {
  quizIdx = 0;
  $("#quiz-done").classList.add("hidden");
  renderQuestion();
}
function renderQuestion() {
  const q = CONFIG.preguntas[quizIdx];
  $("#quiz-counter").textContent = `Pregunta ${quizIdx + 1} de ${CONFIG.preguntas.length}`;
  $("#quiz-question").textContent = q.pregunta;
  $("#quiz-feedback").textContent = "";
  const box = $("#quiz-options");
  box.innerHTML = "";
  q.opciones.forEach((op, i) => {
    const b = document.createElement("button");
    b.className = "option";
    b.textContent = op;
    b.addEventListener("click", () => answer(b, i));
    box.appendChild(b);
  });
}
function answer(btn, i) {
  const q = CONFIG.preguntas[quizIdx];
  const ok = q.correcta === -1 || q.correcta === i;
  if (!ok) {
    sfx.bad();
    btn.classList.remove("wrong");
    void btn.offsetWidth;
    btn.classList.add("wrong");
    const msgs = ["Casi. Inténtalo otra vez.", "Esa no es, mi amor.", "Piénsalo otra vez."];
    $("#quiz-feedback").textContent = msgs[Math.floor(Math.random() * msgs.length)];
    return;
  }
  sfx.good();
  btn.classList.add("right");
  $$(".option").forEach((b) => (b.disabled = true));
  const yay = ["Correcto.", "Exacto, mi vida.", "Eso es.", "Me conoces tan bien."];
  $("#quiz-feedback").textContent = yay[Math.floor(Math.random() * yay.length)];
  const r = btn.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 12);
  setTimeout(() => {
    quizIdx++;
    if (quizIdx < CONFIG.preguntas.length) renderQuestion();
    else {
      $("#quiz-options").innerHTML = "";
      $("#quiz-question").textContent = "";
      $("#quiz-counter").textContent = "";
      $("#quiz-feedback").textContent = "";
      sfx.win();
      setProgress(2);
      $("#quiz-done").classList.remove("hidden");
    }
  }, 1100);
}

// ---------- NIVEL 3: Memoria ----------
let mem = null;
function startMemory() {
  const icons = ["💖", "🌹", "💌", "🍫", "🧸", "💍"];
  const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
  mem = { first: null, lock: false, matched: 0, moves: 0 };
  $("#mem-moves").textContent = 0;
  $("#mem-done").classList.add("hidden");
  const grid = $("#memory");
  grid.innerHTML = "";
  deck.forEach((icon) => {
    const c = document.createElement("button");
    c.className = "mem-card";
    c.dataset.icon = icon;
    c.innerHTML = `<div class="mem-inner"><div class="mem-face mem-front">♥</div><div class="mem-face mem-back">${icon}</div></div>`;
    c.addEventListener("click", () => flip(c));
    grid.appendChild(c);
  });
}
function flip(c) {
  if (mem.lock || c.classList.contains("flipped") || c.classList.contains("matched")) return;
  sfx.pop();
  c.classList.add("flipped");
  if (!mem.first) {
    mem.first = c;
    return;
  }
  mem.moves++;
  $("#mem-moves").textContent = mem.moves;
  const a = mem.first;
  mem.first = null;
  if (a.dataset.icon === c.dataset.icon) {
    a.classList.add("matched");
    c.classList.add("matched");
    sfx.good();
    mem.matched++;
    if (mem.matched === 6) {
      setTimeout(() => {
        sfx.win();
        burst(window.innerWidth / 2, window.innerHeight / 2);
        setProgress(3);
        $("#mem-done").classList.remove("hidden");
      }, 500);
    }
  } else {
    mem.lock = true;
    setTimeout(() => {
      a.classList.remove("flipped");
      c.classList.remove("flipped");
      mem.lock = false;
    }, 850);
  }
}

// ---------- NIVEL 4: Razones ----------
function startReasons() {
  const box = $("#reasons");
  box.innerHTML = "";
  $("#reasons-done").classList.add("hidden");
  $("#reason-box").textContent = "Toca un corazón.";
  let opened = 0;
  const hearts = ["💖", "💗", "💓", "💕", "💘", "💝", "💞", "❤️"];
  CONFIG.razones.forEach((razon, i) => {
    const b = document.createElement("button");
    b.className = "reason-heart";
    b.textContent = hearts[i % hearts.length];
    b.addEventListener("click", () => {
      const rb = $("#reason-box");
      rb.textContent = razon;
      rb.classList.remove("show");
      void rb.offsetWidth;
      rb.classList.add("show");
      if (!b.classList.contains("opened")) {
        b.classList.add("opened");
        opened++;
        sfx.good();
        const r = b.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, 10);
        if (opened === CONFIG.razones.length) {
          setTimeout(() => {
            sfx.win();
            setProgress(4);
            $("#reasons-done").classList.remove("hidden");
          }, 600);
        }
      } else sfx.pop();
    });
    box.appendChild(b);
  });
}

// ---------- NIVEL 5: Carta ----------
let typing = null;
function startLetter() {
  clearTimeout(typing);
  $("#envelope").classList.remove("open", "hidden");
  $("#letter").classList.add("hidden");
  $("#letter-done").classList.add("hidden");
  $("#letter-hint").classList.remove("hidden");
  $("#letter-text").textContent = "";
  $("#letter-text").classList.remove("finished");
}
$("#envelope").addEventListener("click", () => {
  const env = $("#envelope");
  if (env.classList.contains("open")) return;
  env.classList.add("open");
  sfx.win();
  $("#letter-hint").classList.add("hidden");
  setTimeout(() => {
    env.classList.add("hidden");
    $("#letter").classList.remove("hidden");
    typeLetter(CONFIG.carta);
  }, 800);
});
function typeLetter(text) {
  const el = $("#letter-text");
  let i = 0;
  const step = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) {
      const ch = text[i - 1];
      typing = setTimeout(step, ch === "\n" ? 250 : ".,".includes(ch) ? 180 : 32);
    } else {
      el.classList.add("finished");
      setProgress(5);
      $("#letter-done").classList.remove("hidden");
    }
  };
  step();
}
// Tocar la carta mientras se escribe la muestra completa
$("#letter").addEventListener("click", () => {
  const el = $("#letter-text");
  if (el.classList.contains("finished")) return;
  clearTimeout(typing);
  el.textContent = CONFIG.carta;
  el.classList.add("finished");
  setProgress(5);
  $("#letter-done").classList.remove("hidden");
});

// ---------- La pregunta ----------
let noCount = 0;
function resetNoButton() {
  const no = $("#btn-no");
  no.classList.remove("running");
  no.style.left = no.style.top = "";
  $(".answer-buttons").appendChild(no);
}
function startQuestion() {
  noCount = 0;
  const no = $("#btn-no");
  resetNoButton();
  no.textContent = "No";
  no.className = "btn no";
  $("#btn-yes").style.transform = "";
  $("#no-msg").textContent = "";
}

function runAway(e) {
  const no = $("#btn-no");
  if (no.classList.contains("yes")) return;
  if (e) e.preventDefault();

  if (noCount >= CONFIG.mensajesNo.length) {
    resetNoButton();
    no.classList.remove("no");
    no.classList.add("yes");
    no.textContent = "Sí";
    $("#no-msg").textContent = "Ahora los dos botones dicen que sí.";
    return;
  }

  $("#no-msg").textContent = CONFIG.mensajesNo[noCount];
  noCount++;
  sfx.bad();

  const pad = 20;
  const w = no.offsetWidth;
  const h = no.offsetHeight;
  const x = pad + Math.random() * (window.innerWidth - w - pad * 2);
  const y = 80 + Math.random() * (window.innerHeight - h - 100);
  // .card usa backdrop-filter, que rompe position: fixed en sus hijos
  if (no.parentElement !== document.body) document.body.appendChild(no);
  no.classList.add("running");
  no.style.left = x + "px";
  no.style.top = y + "px";

  const scale = 1 + noCount * 0.15;
  $("#btn-yes").style.transform = `scale(${scale})`;
}

const btnNo = $("#btn-no");
let lastRun = 0;
const runOnce = (e) => {
  if (Date.now() - lastRun < 400) return;
  lastRun = Date.now();
  runAway(e);
};
btnNo.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") runOnce(); });
btnNo.addEventListener("pointerdown", runOnce);
btnNo.addEventListener("click", (e) => {
  if (Date.now() - lastRun < 400) return;
  if (btnNo.classList.contains("yes")) sayYes();
  else runOnce(e);
});

function sayYes() {
  resetNoButton();
  sfx.win();
  go("s-yes");
  bgRate = 120;
  const celebrate = (k) => {
    if (k <= 0) return;
    burst(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7, 30);
    setTimeout(() => celebrate(k - 1), 400);
  };
  burst(window.innerWidth / 2, window.innerHeight / 2, 80);
  celebrate(8);
  if (!musicOn) toggleMusic(true);
}
$("#btn-yes").addEventListener("click", sayYes);

$("#btn-restart").addEventListener("click", () => {
  bgRate = 450;
  levelsDone = 0;
  setProgress(0);
  $("#catch-done").classList.add("hidden");
  $("#arena-start").classList.remove("hidden");
  go("s-intro");
});
