/* =========================================================
   Contact form handling.
   Currently just shows a confirmation message — replace the
   fetch() below with your real form backend (e.g. Formspree,
   Netlify Forms, your own endpoint) when you have one.
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var note = document.getElementById("formNote");
    var lang = (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
    var messages = {
      en: "Thanks — replace this with a real form handler (Formspree, Netlify Forms, etc.) to actually receive submissions.",
      es: "Gracias — sustituye esto por un gestor de formularios real (Formspree, Netlify Forms, etc.) para recibir los envíos."
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (note) note.textContent = messages[lang] || messages.en;
      // TODO: send form data to your endpoint here.
    });
  });
})();
