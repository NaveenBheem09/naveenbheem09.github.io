(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  doc.classList.add("js");

  document.getElementById("year").textContent = "© " + new Date().getFullYear();

  /* Mobile menu */
  var menuBtn = document.getElementById("menu");
  var links = document.getElementById("links");
  menuBtn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* Scroll reveal + count-up + progress bar */
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = end.toFixed(dec) + suffix; return; }
    var t0 = null, dur = 1200;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var revealEls = document.querySelectorAll(".reveal, .stats");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        en.target.querySelectorAll("[data-count]").forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
      el.querySelectorAll("[data-count]").forEach(countUp);
    });
  }

  /* Card spotlight follows the pointer */
  document.querySelectorAll(".spot").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* Active nav link */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".links a"));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { if (s) so.observe(s); });
  }

  /* Terminal typing */
  var pre = document.getElementById("term");
  if (pre && !reduce) {
    var lines = JSON.parse(pre.getAttribute("data-lines"));
    var started = false;
    function typeTerminal() {
      pre.textContent = "";
      var li = 0, ci = 0;
      var out = document.createElement("code");
      var caret = document.createElement("span");
      caret.className = "caret";
      pre.appendChild(out);
      pre.appendChild(caret);
      function render(done) {
        out.textContent = done.join("\n");
      }
      var done = [];
      var cur = "";
      (function tick() {
        if (li >= lines.length) return;
        var line = lines[li];
        var isCmd = line.indexOf("❯") === 0;
        if (ci < line.length) {
          cur += line.charAt(ci++);
          render(done.concat([cur]));
          setTimeout(tick, isCmd ? 55 : 14);
        } else {
          done.push(cur);
          cur = ""; ci = 0; li++;
          render(done);
          setTimeout(tick, isCmd ? 350 : 90);
        }
      })();
    }
    if ("IntersectionObserver" in window) {
      var to = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !started) { started = true; typeTerminal(); to.disconnect(); }
      }, { threshold: 0.4 });
      to.observe(pre);
    }
  }
})();
