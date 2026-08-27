(() => {
  "use strict";

  /* ---------- Nav ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById("cursorGlow");
  window.addEventListener(
    "mousemove",
    (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    },
    { passive: true }
  );

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Rotating "currently learning" text ---------- */
  const rotatorWords = ["Software Development", "AI & Machine Learning", "Automation", "Systems", "Entrepreneurship"];
  const rotatorEl = document.getElementById("rotator");
  let rIndex = 0;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (rotatorEl && !prefersReduced) {
    setInterval(() => {
      rIndex = (rIndex + 1) % rotatorWords.length;
      rotatorEl.style.opacity = "0";
      setTimeout(() => {
        rotatorEl.textContent = rotatorWords[rIndex];
        rotatorEl.style.opacity = "1";
      }, 220);
    }, 2400);
    rotatorEl.style.transition = "opacity 0.22s ease";
  }

  /* ---------- Render: Projects ---------- */
  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid && typeof projects !== "undefined") {
    projectsGrid.innerHTML = projects
      .map((p) => {
        const tags = p.technologies.map((t) => `<span class="tag">${t}</span>`).join("");
        const links = [];
        if (p.github) links.push(`<a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>`);
        if (p.demo) links.push(`<a href="${p.demo}" target="_blank" rel="noopener">Live demo ↗</a>`);
        const linksHtml = links.length
          ? `<div class="project-links">${links.join("")}</div>`
          : `<p class="project-links-empty">no public repo yet</p>`;
        return `
          <article class="project-card reveal" data-tilt>
            <div class="project-top">
              <h3 class="project-title">${p.title}</h3>
              <span class="status-badge ${p.status} mono">${p.status}</span>
            </div>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">${tags}</div>
            ${linksHtml}
          </article>`;
      })
      .join("");

    projectsGrid.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });

    projectsGrid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Render: Experiments ---------- */
  const expGrid = document.getElementById("expGrid");
  if (expGrid && typeof experiments !== "undefined") {
    expGrid.innerHTML = experiments
      .map(
        (group) => `
        <div class="exp-card reveal">
          <h3>${group.category}</h3>
          <ul>${group.items.map((i) => `<li>${i}</li>`).join("")}</ul>
        </div>`
      )
      .join("");
    expGrid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Render: Stack ---------- */
  const stackGrid = document.getElementById("stackGrid");
  if (stackGrid && typeof stack !== "undefined") {
    stackGrid.innerHTML = Object.entries(stack)
      .map(
        ([group, items]) => `
        <div class="stack-group">
          <h3>${group}</h3>
          <div class="pill-row">${items.map((i) => `<span class="pill">${i}</span>`).join("")}</div>
        </div>`
      )
      .join("");
  }

  /* ---------- Email buttons (only if configured) ---------- */
  const email = typeof SITE !== "undefined" ? SITE.email : null;
  ["emailBtn", "footerEmailBtn"].forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (email) {
      btn.href = `mailto:${email}`;
    } else {
      btn.href = "https://github.com/" + (SITE.githubUsername || "AhmdoDev");
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
      btn.title = "Email not public yet — reach out on GitHub or LinkedIn";
    }
  });

  /* ---------- Terminal typing sequence ---------- */
  const termBody = document.getElementById("terminalBody");
  const termLines = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "ahmdodev" },
    { type: "cmd", text: "interests" },
    { type: "out", text: "software · artificial intelligence · automation · systems · entrepreneurship" },
    { type: "cmd", text: "status" },
    { type: "out", text: "building..." },
  ];

  function typeTerminal() {
    if (!termBody) return;
    termBody.innerHTML = "";
    let i = 0;

    function nextLine() {
      if (i >= termLines.length) {
        const hint = document.createElement("p");
        hint.className = "terminal-hint mono";
        hint.textContent = "psst — try typing “sudo ahmdodev” anywhere on this page.";
        termBody.appendChild(hint);
        return;
      }
      const line = termLines[i];
      const p = document.createElement("p");
      if (line.type === "cmd") {
        p.innerHTML = `<span class="prompt">$</span> `;
        termBody.appendChild(p);
        typeText(p, line.text, () => {
          i++;
          setTimeout(nextLine, 260);
        });
      } else {
        p.className = "out";
        p.textContent = line.text;
        termBody.appendChild(p);
        i++;
        setTimeout(nextLine, 420);
      }
    }

    function typeText(el, text, done) {
      if (prefersReduced) {
        el.innerHTML += text;
        done();
        return;
      }
      let j = 0;
      const speed = 32;
      const timer = setInterval(() => {
        el.innerHTML = `<span class="prompt">$</span> ` + text.slice(0, j + 1);
        j++;
        if (j >= text.length) {
          clearInterval(timer);
          done();
        }
      }, speed);
    }

    nextLine();
  }

  const termObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeTerminal();
          termObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  const terminalEl = document.getElementById("terminal");
  if (terminalEl) termObserver.observe(terminalEl);

  /* ---------- Easter egg: type "sudo ahmdodev" anywhere ---------- */
  let buffer = "";
  const secret = "sudo ahmdodev";
  window.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key).slice(-secret.length).toLowerCase();
    if (buffer === secret) {
      buffer = "";
      triggerEasterEgg();
    }
  });

  let clickCount = 0;
  let clickTimer = null;
  const logo = document.getElementById("logo");
  logo.addEventListener("click", (e) => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => (clickCount = 0), 900);
    if (clickCount >= 5) {
      e.preventDefault();
      clickCount = 0;
      triggerEasterEgg();
    }
  });

  function triggerEasterEgg() {
    if (document.getElementById("easterOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "easterOverlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Easter egg terminal");
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 999; background: rgba(4,4,6,0.86);
      display: flex; align-items: center; justify-content: center; padding: 20px;
      backdrop-filter: blur(6px);`;
    overlay.innerHTML = `
      <div style="width:min(520px,92vw); background:#050507; border:1px solid rgba(255,255,255,0.12); border-radius:12px; overflow:hidden; box-shadow:0 40px 100px -30px rgba(0,0,0,0.8); font-family:'JetBrains Mono',monospace;">
        <div style="display:flex;align-items:center;gap:8px;padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.1); color:#64666f; font-size:0.72rem;">
          <span style="width:8px;height:8px;border-radius:50%;background:#ff5f56;display:inline-block;"></span>
          <span style="width:8px;height:8px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>
          <span style="width:8px;height:8px;border-radius:50%;background:#27c93f;display:inline-block;"></span>
          <span style="margin-left:8px;">root@ahmdodev</span>
        </div>
        <div style="padding:22px 20px; color:#a9e6a1; font-size:0.86rem; line-height:1.9;">
          <p><span style="color:#5B8CFF;">$</span> sudo ahmdodev</p>
          <p style="color:#9a9ca6;">[sudo] permission granted: you found it.</p>
          <p style="color:#9a9ca6;">access level: curious developer</p>
          <p style="color:#9a9ca6;">no admin rights included. just a hello 👋</p>
          <p style="margin-top:14px;"><span style="color:#5B8CFF;">$</span> exit <span style="color:#64666f;">— press Esc or click outside</span></p>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", esc);
      }
    });
  }
})();
