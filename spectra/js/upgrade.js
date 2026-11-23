/* Spectra · camada nova sobre o protótipo aprovado.
   Nada aqui muda texto, ordem ou estrutura: só troca os desenhos por vetores melhores e dá movimento. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = (html, cls, vb) => {
    const el = document.createElementNS(NS, 'svg');
    el.setAttribute('viewBox', vb);
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('class', cls);
    el.innerHTML = html;
    return el;
  };
  document.documentElement.classList.add('sx-js');

  /* ------------------------------------------------------------ títulos palavra a palavra */
  function splitWords(el) {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span');
            s.className = 'sx-w';
            s.style.setProperty('--i', i++);
            s.textContent = p;
            frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    el.setAttribute('aria-label', el.textContent.trim());
    walk(el);
  }
  const heroTitle = $('.hero h1');
  if (heroTitle && !RM) splitWords(heroTitle);

  /* ------------------------------------------------------------ entradas ao rolar */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('sx-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -10% 0px', threshold: .1 });
  function reveal(sel, type) {
    const seen = new Map();
    $$(sel).forEach(el => {
      const p = el.parentElement, n = seen.get(p) || 0;
      seen.set(p, n + 1);
      el.setAttribute('data-sx', type || 'up');
      el.style.setProperty('--sx-d', n);
      if (type === 'words' && !RM) splitWords(el);
      io.observe(el);
    });
  }
  reveal('.thesis h2, .v5-section-head h2, .v10-showcase-head h2, .insights-head h2, .memory h2, .cta h2', 'words');
  reveal('.thesis .eyebrow, .thesis-grid > p, .v5-section-head .eyebrow, .v10-showcase-head .eyebrow, .insights-head .eyebrow, .memory-grid > div:first-child > .eyebrow, .memory-grid > div:first-child > p, .cta .eyebrow, .cta p, .cta .action');
  reveal('.v5-strategy-nav, .v5-strategy-panel, .v10-cap, .memory-item');
  reveal('.v10-showcase-shell', 'shell');

  /* ------------------------------------------------------------ cabeçalho */
  const header = $('.header');
  const onScrollHeader = () => header && header.classList.toggle('sx-scrolled', scrollY > 30);

  /* ------------------------------------------------------------ topo: luz, órbitas, minigráficos, inclinação */
  const hero = $('.hero'), concept = $('.concept'), shell = $('.concept-shell');
  if (hero) {
    const glow = document.createElement('div');
    glow.className = 'sx-glow';
    glow.setAttribute('aria-hidden', 'true');
    glow.innerHTML = '<i></i><i></i>';
    hero.prepend(glow);
  }
  if (concept) {
    concept.prepend(svg(`
      <defs>
        <linearGradient id="sxo1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6342A1"/><stop offset="1" stop-color="#A2DFDA"/></linearGradient>
      </defs>
      <circle class="r draw" pathLength="1" cx="300" cy="300" r="214" opacity=".55"/>
      <circle class="r" cx="300" cy="300" r="268" opacity=".2"/>
      <g class="spin"><circle class="r" cx="300" cy="300" r="296" opacity=".3" stroke-dasharray="2 9"/>
        <circle cx="300" cy="4" r="4" fill="#6342A1"/></g>
      <g class="spin b"><path class="r" d="M300 86 A214 214 0 0 1 514 300" stroke="url(#sxo1)" style="stroke:url(#sxo1);stroke-width:2.4" stroke-linecap="round"/>
        <circle cx="514" cy="300" r="5" fill="#A2DFDA"/></g>
      <g class="spin c"><circle class="r" cx="300" cy="300" r="160" opacity=".3" stroke-dasharray="1 7"/>
        <circle cx="140" cy="300" r="3.5" fill="#B9A6DD"/></g>`, 'sx-orbit', '0 0 600 600'));
  }
  const sparks = [[100, 102, 108, 111, 121, 125, 133, 134], [100, 102, 98, 96, 96, 92, 93, 89], [100, 101, 100, 103, 102, 104, 105, 106]];
  $$('.v5-hero-signals > div').forEach((card, k) => {
    const d = sparks[k]; if (!d) return;
    const min = Math.min(...d), max = Math.max(...d), W = 80, H = 24;
    const pts = d.map((v, i) => [i * W / (d.length - 1), H - 2 - (v - min) / (max - min || 1) * (H - 4)]);
    const last = pts[pts.length - 1];
    card.appendChild(svg(`<path pathLength="1" d="${smooth(pts)}"/><circle cx="${last[0]}" cy="${last[1].toFixed(1)}" r="2.6"/>`, 'sx-spark', `0 0 ${W} ${H}`));
  });
  if (concept && shell && !RM && matchMedia('(hover:hover) and (min-width:1101px)').matches) {
    concept.addEventListener('pointermove', e => {
      const r = shell.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      shell.style.setProperty('--ry', ((x - .5) * 5).toFixed(2) + 'deg');
      shell.style.setProperty('--rx', ((.5 - y) * 4).toFixed(2) + 'deg');
      shell.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      shell.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });
    concept.addEventListener('pointerleave', () => { shell.style.setProperty('--ry', '0deg'); shell.style.setProperty('--rx', '0deg'); });
  }

  /* ------------------------------------------------------------ curvas suaves */
  function smooth(p, t = .8) {
    let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
    for (let i = 0; i < p.length - 1; i++) {
      const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
      d += ` C${(b[0] + (c[0] - a[0]) / 6 * t).toFixed(1)} ${(b[1] + (c[1] - a[1]) / 6 * t).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6 * t).toFixed(1)} ${(c[1] - (e[1] - b[1]) / 6 * t).toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
    }
    return d;
  }

  /* ------------------------------------------------------------ ponto de partida: anéis */
  const thesis = $('.thesis');
  if (thesis) {
    thesis.appendChild(svg(`
      <circle cx="300" cy="300" r="298"/>
      <circle cx="300" cy="300" r="262" opacity=".45"/>
      <g class="spin"><circle cx="300" cy="300" r="226" stroke-dasharray="2 10" opacity=".8"/><circle class="dot" cx="300" cy="74" r="2.6"/></g>
      <g class="spin b"><path class="lav" fill="none" d="M38 300 A262 262 0 0 0 300 562" stroke-width="1.6" opacity=".7"/><circle class="dot" cx="38" cy="300" r="3.2"/></g>`, 'sx-rings', '0 0 600 600'));
  }

  /* ------------------------------------------------------------ estratégia: desenho por objetivo e troca animada */
  const glyphs = [
    '<g class="g0"><circle class="w" cx="37" cy="37" r="33"/><circle class="w" cx="37" cy="37" r="33"/><circle class="w" cx="37" cy="37" r="33"/><circle class="f" cx="37" cy="37" r="4.5"/></g>',
    '<g class="g1"><path class="soft" d="M10 20H64M10 37H64M10 54H64"/><path class="l" pathLength="1" d="M10 20H52"/><path class="l" pathLength="1" d="M10 37H64"/><path class="l" pathLength="1" d="M10 54H40"/><circle class="f" cx="10" cy="20" r="3"/><circle class="f" cx="10" cy="37" r="3"/><circle class="f" cx="10" cy="54" r="3"/></g>',
    '<g class="g2"><path class="soft" d="M12 56 C26 56 26 22 44 22 L58 22" stroke-dasharray="2 5"/><rect x="6" y="50" width="12" height="12" rx="3"/><path d="M52 15 L60 22 L52 29"/><circle class="m f" r="4"/></g>'
  ];
  const token = $('.v5-profile-token'), panel = $('.v5-strategy-panel');
  let glyph;
  if (token) { glyph = svg(glyphs[0], 'sx-glyph', '0 0 74 74'); token.prepend(glyph); }
  $$('.v5-strategy-tab').forEach((b, i) => {
    const swap = () => {
      if (glyph) glyph.innerHTML = glyphs[i];
      if (!panel || RM) return;
      panel.classList.remove('sx-swap'); void panel.offsetWidth; panel.classList.add('sx-swap');
    };
    b.addEventListener('click', swap);
    b.addEventListener('keydown', e => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) requestAnimationFrame(() => { const k = $$('.v5-strategy-tab').findIndex(t => t.getAttribute('aria-selected') === 'true'); if (glyph && k >= 0) glyph.innerHTML = glyphs[k]; }); });
  });

  /* ------------------------------------------------------------ painel: gráfico de duas trajetórias */
  const old = $('.v5-wide-chart');
  if (old) {
    const X0 = 48, X1 = 714, Y = v => 158 - (v - 100) * 2.9;
    const A = [100, 102.4, 107.6, 111.4, 121, 124.5, 133.1, 134], B = [100, 102.1, 97.9, 95.5, 96.2, 91.7, 93.4, 89];
    const xs = A.map((_, i) => X0 + i * (X1 - X0) / (A.length - 1));
    const pa = A.map((v, i) => [xs[i], Y(v)]), pb = B.map((v, i) => [xs[i], Y(v)]);
    const la = smooth(pa, .7), lb = smooth(pb, .7);
    const chart = svg(`
      <defs>
        <linearGradient id="sxga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A2DFDA" stop-opacity=".34"/><stop offset="1" stop-color="#A2DFDA" stop-opacity="0"/></linearGradient>
        <linearGradient id="sxgb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#D5C3FF" stop-opacity=".3"/><stop offset="1" stop-color="#D5C3FF" stop-opacity="0"/></linearGradient>
      </defs>
      <path class="grid" d="M48 42H723M48 100H723M48 216H723"/>
      <path class="base" d="M48 158H723"/>
      <g><text x="12" y="46">140</text><text x="12" y="104">120</text><text x="12" y="162">100</text><text x="12" y="220">80</text>
        <text x="48" y="248">CICLO 1</text><text x="${xs[3].toFixed(0)}" y="248" text-anchor="middle">CICLO 4</text><text x="714" y="248" text-anchor="end">CICLO 8</text></g>
      <path class="area" fill="url(#sxga)" d="${la} L714 158 L48 158 Z"/>
      <path class="area" fill="url(#sxgb)" d="${lb} L714 158 L48 158 Z"/>
      <path class="line a" pathLength="1" stroke="#A2DFDA" d="${la}"/>
      <path class="line b" pathLength="1" stroke="#D5C3FF" d="${lb}"/>
      ${pa.slice(0, -1).map((p, i) => `<circle class="pt" style="--n:${i}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.6" fill="#1D2729" stroke="#A2DFDA" stroke-width="1.6"/>`).join('')}
      ${pb.slice(0, -1).map((p, i) => `<circle class="pt" style="--n:${i}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.6" fill="#1D2729" stroke="#D5C3FF" stroke-width="1.6"/>`).join('')}
      <g class="end"><circle class="halo" cx="714" cy="${Y(134).toFixed(1)}" r="6" fill="#A2DFDA"/><circle cx="714" cy="${Y(134).toFixed(1)}" r="6" fill="#A2DFDA"/>
        <circle class="halo" cx="714" cy="${Y(89).toFixed(1)}" r="6" fill="#D5C3FF" style="animation-delay:1.3s"/><circle cx="714" cy="${Y(89).toFixed(1)}" r="6" fill="#D5C3FF"/>
        <text x="702" y="${(Y(134) - 13).toFixed(1)}" text-anchor="end" style="fill:#A2DFDA;font-weight:650;font-size:13px">134</text>
        <text x="702" y="${(Y(89) + 22).toFixed(1)}" text-anchor="end" style="fill:#D5C3FF;font-weight:650;font-size:13px">89</text></g>
      <line class="cross" x1="0" x2="0" y1="34" y2="222"/>
      <circle class="hot ha" r="6" fill="#A2DFDA" stroke="#1D2729" stroke-width="3"/>
      <circle class="hot hb" r="6" fill="#D5C3FF" stroke="#1D2729" stroke-width="3"/>`, 'v5-wide-chart sx-chart', '0 0 760 266');
    chart.setAttribute('role', 'img');
    chart.removeAttribute('aria-hidden');
    chart.setAttribute('aria-label', old.getAttribute('aria-label') || '');
    old.replaceWith(chart);
    const frame = chart.closest('.v5-chart-frame');
    const tip = document.createElement('div');
    tip.className = 'sx-tip'; tip.setAttribute('aria-hidden', 'true');
    frame.appendChild(tip);
    const cross = $('.cross', chart), ha = $('.ha', chart), hb = $('.hb', chart);
    const fmt = v => String(Math.round(v));
    const move = e => {
      const r = chart.getBoundingClientRect(), fr = frame.getBoundingClientRect();
      const ux = (e.clientX - r.left) / r.width * 760;
      const i = Math.max(0, Math.min(A.length - 1, Math.round((ux - X0) / ((X1 - X0) / (A.length - 1)))));
      cross.setAttribute('x1', xs[i]); cross.setAttribute('x2', xs[i]);
      ha.setAttribute('cx', xs[i]); ha.setAttribute('cy', Y(A[i]));
      hb.setAttribute('cx', xs[i]); hb.setAttribute('cy', Y(B[i]));
      tip.innerHTML = `<b>CICLO ${i + 1}</b><span><i style="--c:#62BDB5">Alcance</i><strong>${fmt(A[i])}</strong></span><span><i style="--c:#9B7FD6">Eng. de valor / alcance</i><strong>${fmt(B[i])}</strong></span>`;
      const px = r.left - fr.left + xs[i] / 760 * r.width, py = r.top - fr.top + Y(Math.max(A[i], B[i])) / 266 * r.height;
      const tw = tip.offsetWidth, th = tip.offsetHeight;
      tip.style.setProperty('--x', Math.max(8, Math.min(fr.width - tw - 8, px - tw / 2)) + 'px');
      tip.style.setProperty('--y', Math.max(8, py - th - 18) + 'px');
      chart.classList.add('sx-hover'); tip.classList.add('on');
    };
    chart.addEventListener('pointermove', move);
    chart.addEventListener('pointerdown', move);
    chart.addEventListener('pointerleave', () => { chart.classList.remove('sx-hover'); tip.classList.remove('on'); });
    io.observe(chart);
  }

  /* matriz de frentes × formatos vira mapa de calor */
  let hn = 0;
  $$('.v5-topic-matrix > div:not(.v5-matrix-head) > span').forEach(s => {
    const v = parseFloat(s.textContent);
    if (isNaN(v)) return;
    s.classList.add('sx-heat');
    s.style.setProperty('--k', (v / 6).toFixed(2));
    s.style.setProperty('--n', hn++);
  });
  $$('.v5-dash-counters > div').forEach((d, i) => d.style.setProperty('--n', i));

  /* ------------------------------------------------------------ distribuição: pontos caem, a exceção sobe */
  const dist = $('.distribution-chart svg');
  if (dist) {
    $$('circle', dist).forEach((c, i) => c.style.setProperty('--n', i));
    const out = $$('circle', dist).find(c => c.getAttribute('r') === '11');
    if (out) {
      out.classList.add('sx-out');
      const trail = document.createElementNS(NS, 'path');
      trail.setAttribute('d', 'M612 212 V50'); trail.setAttribute('pathLength', '1');
      trail.setAttribute('class', 'sx-trail'); trail.setAttribute('fill', 'none');
      trail.setAttribute('stroke', '#9F7BCF'); trail.setAttribute('stroke-width', '1.4'); trail.setAttribute('stroke-dasharray', '1');
      out.before(trail);
      const label = out.nextElementSibling;
      if (label && label.tagName.toLowerCase() === 'text') label.classList.add('sx-late');
    }
  }

  /* ------------------------------------------------------------ números contam até o valor */
  const counted = new WeakSet();
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting || counted.has(e.target)) return;
    counted.add(e.target); cio.unobserve(e.target); count(e.target);
  }), { threshold: .6 });
  function count(el) {
    const full = el.textContent.trim();
    const m = full.match(/^([+−-]?)(\d[\d.]*)(?:,(\d+))?(%?)$/);
    if (!m || RM) return;
    const thousands = m[2].includes('.'), int = parseInt(m[2].replace(/\./g, ''), 10), dec = m[3] ? m[3].length : 0;
    const target = int + (dec ? parseInt(m[3], 10) / 10 ** dec : 0), t0 = performance.now(), dur = 1300;
    const fmt = v => {
      let s = dec ? v.toFixed(dec) : String(Math.round(v));
      let [a, b] = s.split('.');
      if (thousands) a = a.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return m[1] + a + (b ? ',' + b : '') + m[4];
    };
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = k < 1 ? fmt(target * e) : full;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  $$('.v5-hero-signals strong, .v5-dash-counters strong, .case-metric strong, .barcompare b, .v5-bar-item b').forEach(el => cio.observe(el));

  /* ------------------------------------------------------------ seções em vista (dispara barras e mapa) */
  const vio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('sx-inview'); vio.unobserve(e.target); } }), { threshold: .18 });
  $$('.v10-showcase').forEach(s => vio.observe(s));

  /* ------------------------------------------------------------ chamada final: o símbolo em faixas */
  const cta = $('.cta');
  if (cta) {
    let bars = '';
    const R = 200;
    [-150, -100, -50, 0, 50, 100, 150].forEach((y, n) => {
      const half = Math.sqrt(R * R - y * y) - 6;
      bars += `<rect class="bar" style="--n:${n}" x="${(300 - half).toFixed(1)}" y="${300 + y - 13}" width="${(half * 2).toFixed(1)}" height="26" rx="13"/>`;
    });
    cta.prepend(svg(`${bars}
      <circle class="ring" cx="300" cy="300" r="236"/>
      <g class="spin"><circle class="ring" cx="300" cy="300" r="282" stroke-dasharray="2 9"/><circle cx="300" cy="18" r="3.4" fill="#6342A1" opacity=".7"/></g>`, 'sx-cta-art', '0 0 600 600'));
  }

  /* ------------------------------------------------------------ ranking: formato na miniatura, coluna ativa, troca animada */
  const formats = ['Card', 'Reels', 'Carrossel', 'Reels', 'Carrossel'];
  const right = $('.v5-ranking-right');
  const markCol = i => $$('#v5-ranking-table-body tr').forEach(tr => [...tr.children].forEach((td, j) => td.classList.toggle('sx-col', j === i + 1)));
  $$('.v5-rank-card').forEach((c, i) => {
    const th = $('.v5-rank-thumb', c);
    if (th) th.setAttribute('data-format', formats[i] || '');
    c.addEventListener('click', () => {
      markCol(i);
      if (!right || RM) return;
      right.classList.remove('sx-swap'); void right.offsetWidth; right.classList.add('sx-swap');
    });
  });
  markCol(0);

  /* ------------------------------------------------------------ rolagem: faixas que abrem e anéis que giram */
  const bands = $$('.thesis, .cta'); bands.forEach(b => b.classList.add('sx-band'));
  const rings = $('.sx-rings');
  let q = 0;
  const frame = () => {
    q = 0; onScrollHeader();
    const H = innerHeight;
    bands.forEach(b => {
      const r = b.getBoundingClientRect();
      if (r.bottom < 0 || r.top > H) return;
      const k = RM ? 1 : Math.min(1, Math.max(0, (H - r.top) / (H * .7)));
      if (k >= 1) { b.style.clipPath = 'none'; return; }
      const m = (Math.min(40, innerWidth * .026) * (1 - k)).toFixed(1), R = ((1 - k) * 34).toFixed(1);
      b.style.clipPath = `inset(0 ${m}px 0 ${m}px round ${R}px ${R}px 0 0)`;
    });
    if (rings && thesis && !RM) {
      const r = thesis.getBoundingClientRect();
      if (r.bottom > 0 && r.top < H) rings.style.transform = `rotate(${((H - r.top) / (H + r.height) * 40 - 20).toFixed(2)}deg)`;
    }
  };
  addEventListener('scroll', () => { if (!q) q = requestAnimationFrame(frame); }, { passive: true });
  addEventListener('resize', frame);
  frame();
})();
