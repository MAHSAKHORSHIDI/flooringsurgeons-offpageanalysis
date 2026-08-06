/* ==========================================================================
   script.js
   Password gate + charts + interactive tables for the off-page audit page.
   ========================================================================== */

/* --------------------------------------------------------------------------
   0. PASSWORD GATE
   ----------------------------------------------------------------------------
   IMPORTANT — read this before relying on it:
   This is a client-side gate only. Everything in this file, including the
   password hash below, ships to the visitor's browser. Anyone who opens
   dev tools can read the hash, brute-force short passwords offline, or just
   read the DOM/data.js directly. This is a *soft deterrent* (keeps casual
   visitors and search engines out), NOT real security. Do not put anything
   here you'd be upset to see leaked — for real protection, use a private
   repo with GitHub Pages access controls (GitHub Pro/Team/Enterprise), or
   host behind actual auth.

   To change the password:
     1. Open a browser console anywhere and run:
          crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourNewPassword'))
            .then(buf => console.log([...new Uint8Array(buf)]
              .map(b => b.toString(16).padStart(2,'0')).join('')))
     2. Copy the printed hex string into PASSWORD_HASH below.
   -------------------------------------------------------------------------- */

const PASSWORD_HASH = "937a741e188106d0fa6cf66398af672caa9d0b30ded4a3d96bba60d3f68e78e1"; // default: "flooring2026"
const SESSION_KEY = "fs_audit_unlocked";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function showApp() {
  document.getElementById("gate").remove();
  const app = document.getElementById("app");
  app.hidden = false;
}

async function initGate() {
  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    showApp();
    initAppOnce();
    return;
  }

  const form = document.getElementById("gate-form");
  const input = document.getElementById("gate-input");
  const errorEl = document.getElementById("gate-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hash = await sha256Hex(input.value.trim());
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem(SESSION_KEY, "1");
      showApp();
      initAppOnce();
    } else {
      errorEl.textContent = "That's not it — try again.";
      input.value = "";
      input.focus();
    }
  });

  document.getElementById("gate-input")?.focus();
}

let appInitialized = false;
function initAppOnce() {
  if (appInitialized) return;
  appInitialized = true;

  document.getElementById("lock-btn").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  });

  renderFieldPosition();
  renderWeaknessesTable();
  renderSummaryTable();
  renderOverlapTable();
  renderOpportunitiesTable();
  renderStrongestTable();
  initCharts();
}

initGate();

/* --------------------------------------------------------------------------
   1. FIELD POSITION (signature hero element)
   -------------------------------------------------------------------------- */
function renderFieldPosition() {
  const container = document.getElementById("field-position");
  const metrics = [
    { label: "Unique referring domains", key: "refDomains", format: v => v.toLocaleString() },
    { label: "Average domain rating (DR)", key: "avgDR", format: v => v.toFixed(1) },
  ];

  metrics.forEach(m => {
    const values = SUMMARY.map(s => s[m.key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const row = document.createElement("div");
    row.className = "fp-row";

    const label = document.createElement("div");
    label.className = "fp-row__label";
    label.innerHTML = `<span>${m.label}</span><b>range: ${m.format(min)} &ndash; ${m.format(max)}</b>`;
    row.appendChild(label);

    const track = document.createElement("div");
    track.className = "fp-track";
    const line = document.createElement("div");
    line.className = "fp-track__line";
    track.appendChild(line);

    SUMMARY.forEach(s => {
      const pct = ((s[m.key] - min) / range) * 100;
      const dot = document.createElement("div");
      dot.className = "fp-dot" + (s.isUs ? " fp-dot--us" : "");
      dot.style.left = pct + "%";
      dot.title = `${s.domain}: ${m.format(s[m.key])}`;
      if (s.isUs) {
        const tag = document.createElement("div");
        tag.className = "fp-dot__tag";
        tag.textContent = "you are here";
        dot.appendChild(tag);
      }
      track.appendChild(dot);
    });

    row.appendChild(track);
    container.appendChild(row);
  });
}

/* --------------------------------------------------------------------------
   2. WEAKNESSES TABLE
   -------------------------------------------------------------------------- */
function renderWeaknessesTable() {
  const table = document.getElementById("weaknesses-table");
  const fmt = (v) => {
    if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
    return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  let html = `<thead><tr>
    <th>Metric</th><th class="num">Our value</th><th class="num">Competitors avg</th>
    <th class="num">Best competitor</th><th class="num">Gap vs. avg</th><th>Status</th>
  </tr></thead><tbody>`;

  WEAKNESSES.forEach(w => {
    const pillClass = w.status === "Weakness" ? "status-pill--weakness"
                     : w.status === "Strength" ? "status-pill--strength"
                     : "status-pill--info";
    html += `<tr>
      <td>${w.metric}</td>
      <td class="num">${fmt(w.ours)}</td>
      <td class="num">${fmt(w.avg)}</td>
      <td class="num">${fmt(w.best)}</td>
      <td class="num">${w.gap > 0 ? "+" : ""}${fmt(w.gap)}</td>
      <td><span class="status-pill ${pillClass}">${w.status}</span></td>
    </tr>`;
  });

  html += "</tbody>";
  table.innerHTML = html;
}

/* --------------------------------------------------------------------------
   3b. OVERLAP TABLE
   -------------------------------------------------------------------------- */
function renderOverlapTable() {
  const table = document.getElementById("overlap-table");
  const rows = [...OVERLAP].sort((a, b) => a.sharedPct - b.sharedPct);

  let html = `<thead><tr>
    <th>Competitor</th><th class="num">Their referring domains</th>
    <th class="num">Shared with us</th><th class="num">Shared %</th><th class="num">Untapped (theirs only)</th>
  </tr></thead><tbody>`;

  rows.forEach(r => {
    html += `<tr>
      <td>${r.competitor}</td>
      <td class="num">${r.theirDomains.toLocaleString()}</td>
      <td class="num">${r.sharedWithUs.toLocaleString()}</td>
      <td class="num">${r.sharedPct.toFixed(1)}%</td>
      <td class="num">${r.onlyTheirs.toLocaleString()}</td>
    </tr>`;
  });
  html += "</tbody>";
  table.innerHTML = html;
}

/* --------------------------------------------------------------------------
   3c. STRONGEST REFERRERS TABLE (our own best links)
   -------------------------------------------------------------------------- */
function renderStrongestTable() {
  const table = document.getElementById("strongest-table");
  const rows = [...OUR_TOP_REFERRERS].sort((a, b) => b.dr - a.dr);

  let html = `<thead><tr>
    <th>Referring domain</th><th class="num">Domain rating</th>
    <th class="num">Domain traffic</th><th class="num">Backlinks</th>
  </tr></thead><tbody>`;

  rows.forEach(r => {
    html += `<tr>
      <td>${r.domain}</td>
      <td class="num">${r.dr}</td>
      <td class="num">${r.traffic.toLocaleString()}</td>
      <td class="num">${r.backlinks}</td>
    </tr>`;
  });
  html += "</tbody>";
  table.innerHTML = html;
}

/* --------------------------------------------------------------------------
   4. SORTABLE SUMMARY TABLE (all 13 sites)
   -------------------------------------------------------------------------- */
const summaryColumns = [
  { key: "domain",      label: "Domain",             type: "string" },
  { key: "refDomains",  label: "Referring domains",  type: "number" },
  { key: "avgDR",       label: "Avg DR",              type: "number" },
  { key: "dofollow",    label: "Dofollow %",          type: "number" },
  { key: "spam",        label: "Spam %",              type: "number" },
  { key: "lost",        label: "Lost %",              type: "number" },
  { key: "avgTraffic",  label: "Avg ref. traffic",    type: "number" },
];
let summarySortState = { key: "refDomains", dir: "desc" };

function renderSummaryTable() {
  const table = document.getElementById("summary-table");
  const rows = [...SUMMARY];
  sortRows(rows, summaryColumns, summarySortState);

  let thead = "<thead><tr>";
  summaryColumns.forEach(col => {
    const isSorted = summarySortState.key === col.key;
    const arrow = isSorted ? (summarySortState.dir === "asc" ? "&uarr;" : "&darr;") : "";
    thead += `<th class="${col.type === 'number' ? 'num' : ''} ${isSorted ? 'is-sorted' : ''}" data-key="${col.key}" data-type="${col.type}">${col.label} <span class="sort-arrow">${arrow}</span></th>`;
  });
  thead += "</tr></thead>";

  let tbody = "<tbody>";
  rows.forEach(r => {
    tbody += `<tr class="${r.isUs ? 'is-us' : ''}">
      <td>${r.domain}${r.isUs ? " <span class='tag'>you</span>" : ""}</td>
      <td class="num">${r.refDomains.toLocaleString()}</td>
      <td class="num">${r.avgDR.toFixed(1)}</td>
      <td class="num">${r.dofollow.toFixed(1)}%</td>
      <td class="num">${r.spam.toFixed(1)}%</td>
      <td class="num">${r.lost.toFixed(1)}%</td>
      <td class="num">${r.avgTraffic.toLocaleString()}</td>
    </tr>`;
  });
  tbody += "</tbody>";

  table.innerHTML = thead + tbody;

  table.querySelectorAll("thead th").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (summarySortState.key === key) {
        summarySortState.dir = summarySortState.dir === "asc" ? "desc" : "asc";
      } else {
        summarySortState = { key, dir: th.dataset.type === "string" ? "asc" : "desc" };
      }
      renderSummaryTable();
    });
  });
}

/* --------------------------------------------------------------------------
   4. OPPORTUNITIES TABLE (search + filter + sort)
   -------------------------------------------------------------------------- */
const BULK_PATTERNS = [
  "directory", "directories", "worldzone", "topviral", "besttop", "topdomain",
  "socialzone", "webguestpost", "mediapost", "superbhub", "linkpitcher",
  "websitehubs", "worldwebsites", "sbyme.com", "list.show", "highseo",
  "ratingfacts", "p.eurekster",
];
function isBulkDirectory(domain) {
  const d = domain.toLowerCase();
  return BULK_PATTERNS.some(p => d.includes(p));
}

let oppSortState = { key: "competitors", dir: "desc" };

function getOpportunityRows() {
  return LINK_GAP.map(([domain, nCompetitors, competitorList, maxDR]) => ({
    domain,
    competitors: nCompetitors,
    competitorList,
    maxDR,
    bulk: isBulkDirectory(domain),
  }));
}

function renderOpportunitiesTable() {
  const table = document.getElementById("opportunities-table");
  const searchInput = document.getElementById("opp-search");
  const hideToggle = document.getElementById("opp-hide-directories");
  const countEl = document.getElementById("opp-count");

  function draw() {
    let rows = getOpportunityRows();
    const q = searchInput.value.trim().toLowerCase();
    if (q) rows = rows.filter(r => r.domain.toLowerCase().includes(q));
    if (hideToggle.checked) rows = rows.filter(r => !r.bulk);

    const cols = { competitors: "number", domain: "string", maxDR: "number" };
    rows.sort((a, b) => {
      const dir = oppSortState.dir === "asc" ? 1 : -1;
      const av = a[oppSortState.key], bv = b[oppSortState.key];
      if (cols[oppSortState.key] === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });

    countEl.textContent = `${rows.length} domain${rows.length === 1 ? "" : "s"} shown`;

    let thead = `<thead><tr>
      <th data-key="domain" class="${oppSortState.key === 'domain' ? 'is-sorted' : ''}">Domain <span class="sort-arrow">${oppSortState.key === 'domain' ? (oppSortState.dir === 'asc' ? '&uarr;' : '&darr;') : ''}</span></th>
      <th class="num ${oppSortState.key === 'competitors' ? 'is-sorted' : ''}" data-key="competitors">Linked to N competitors <span class="sort-arrow">${oppSortState.key === 'competitors' ? (oppSortState.dir === 'asc' ? '&uarr;' : '&darr;') : ''}</span></th>
      <th class="num ${oppSortState.key === 'maxDR' ? 'is-sorted' : ''}" data-key="maxDR">Max DR seen <span class="sort-arrow">${oppSortState.key === 'maxDR' ? (oppSortState.dir === 'asc' ? '&uarr;' : '&darr;') : ''}</span></th>
      <th>Type</th>
    </tr></thead>`;

    let tbody = "<tbody>";
    rows.forEach(r => {
      tbody += `<tr>
        <td>${r.domain}</td>
        <td class="num">${r.competitors}</td>
        <td class="num">${r.maxDR}</td>
        <td>${r.bulk ? '<span class="tag tag--bulk">directory / bulk</span>' : '<span class="tag" style="color:var(--sage)">worth reviewing</span>'}</td>
      </tr>`;
    });
    tbody += "</tbody>";

    table.innerHTML = thead + tbody;

    table.querySelectorAll("thead th[data-key]").forEach(th => {
      th.addEventListener("click", () => {
        const key = th.dataset.key;
        if (oppSortState.key === key) {
          oppSortState.dir = oppSortState.dir === "asc" ? "desc" : "asc";
        } else {
          oppSortState = { key, dir: "desc" };
        }
        draw();
      });
    });
  }

  searchInput.addEventListener("input", draw);
  hideToggle.addEventListener("change", draw);
  draw();
}

/* --------------------------------------------------------------------------
   5. Generic sort helper (used by summary table)
   -------------------------------------------------------------------------- */
function sortRows(rows, columns, state) {
  const col = columns.find(c => c.key === state.key);
  const dir = state.dir === "asc" ? 1 : -1;
  rows.sort((a, b) => {
    const av = a[state.key], bv = b[state.key];
    if (col.type === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}

/* --------------------------------------------------------------------------
   6. CHARTS (Chart.js)
   -------------------------------------------------------------------------- */
const COLOR = {
  brass: "#CBA24C",
  slate: "#8393A0",
  sage: "#7BAB8E",
  rust: "#C0603F",
  text: "#A99A87",
  grid: "rgba(255,255,255,0.06)",
};

Chart.defaults.font.family = "'IBM Plex Mono', monospace";
Chart.defaults.font.size = 11;
Chart.defaults.color = COLOR.text;

function siteColor(domain) {
  return domain === OWN_DOMAIN ? COLOR.brass : COLOR.slate;
}

function initCharts() {
  drawGrowthChart();
  drawDRChart();
  drawAnchorChart();
  drawFollowChart();
  drawHomepageChart();
  drawDiversityChart();
}

function drawGrowthChart() {
  const ctx = document.getElementById("chart-growth");
  const datasets = Object.entries(GROWTH_SERIES).map(([domain, values]) => {
    const isUs = domain === OWN_DOMAIN;
    return {
      label: domain,
      data: values,
      borderColor: isUs ? COLOR.brass : COLOR.slate,
      backgroundColor: isUs ? COLOR.brass : COLOR.slate,
      borderWidth: isUs ? 3 : 1.25,
      pointRadius: 0,
      opacity: isUs ? 1 : 0.5,
      order: isUs ? 0 : 1,
      tension: 0.2,
    };
  });

  new Chart(ctx, {
    type: "line",
    data: { labels: GROWTH_MONTHS, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => items[0]?.label,
          },
        },
      },
      scales: {
        x: { grid: { color: COLOR.grid }, ticks: { maxTicksLimit: 10 } },
        y: { grid: { color: COLOR.grid }, title: { display: true, text: "Cumulative referring domains", color: COLOR.text } },
      },
    },
  });
}

function drawDRChart() {
  const ctx = document.getElementById("chart-dr");
  // normalize each site's bucket counts to % of that site's total backlinks
  const labels = DR_DISTRIBUTION.map(d => d.domain);
  const totals = DR_DISTRIBUTION.map(d => d.buckets.reduce((a, b) => a + b, 0));
  const bucketColors = ["#C0603F","#C7754A","#CE8A56","#D59F62","#DCB46E","#CBA24C","#9FB37E","#7BAB8E","#5F9E8B","#4A8F8E"];

  const datasets = DR_BUCKET_LABELS.map((label, i) => ({
    label: "DR " + label,
    data: DR_DISTRIBUTION.map((d, si) => (d.buckets[i] / totals[si]) * 100),
    backgroundColor: bucketColors[i],
    stack: "dr",
  }));

  new Chart(ctx, {
    type: "bar",
    data: { labels: labels.map(l => l === OWN_DOMAIN ? "\u25CF " + l : l), datasets },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.x.toFixed(1)}%` } },
      },
      scales: {
        x: { stacked: true, max: 100, grid: { color: COLOR.grid }, ticks: { callback: v => v + "%" } },
        y: { stacked: true, grid: { display: false }, ticks: { font: (ctx) => ({ weight: labels[ctx.index] === OWN_DOMAIN ? "600" : "400" }) } },
      },
    },
  });
}

function drawAnchorChart() {
  const ctx = document.getElementById("chart-anchor");
  const sorted = [...ANCHOR_CATEGORIES];
  const labels = sorted.map(d => d.domain);
  const series = [
    { key: "branded", label: "Branded", color: COLOR.sage },
    { key: "generic", label: "Generic", color: COLOR.slate },
    { key: "keyword", label: "Keyword-rich", color: COLOR.rust },
    { key: "naked", label: "Naked URL", color: "#5F9E8B" },
    { key: "empty", label: "Empty/Image", color: "#4A403420" },
  ];

  const datasets = series.map(s => ({
    label: s.label,
    data: sorted.map(d => d[s.key]),
    backgroundColor: s.color,
    stack: "anchor",
  }));

  new Chart(ctx, {
    type: "bar",
    data: { labels: labels.map(l => l === OWN_DOMAIN ? "\u25CF " + l : l), datasets },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.x.toFixed(1)}%` } },
      },
      scales: {
        x: { stacked: true, max: 100, grid: { color: COLOR.grid }, ticks: { callback: v => v + "%" } },
        y: { stacked: true, grid: { display: false } },
      },
    },
  });
}

function drawFollowChart() {
  const ctx = document.getElementById("chart-follow");
  const sorted = [...FOLLOW_STATUS].sort((a, b) => b.dofollow - a.dofollow);
  const labels = sorted.map(d => d.domain);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels.map(l => l === OWN_DOMAIN ? "\u25CF " + l : l),
      datasets: [
        { label: "Dofollow %", data: sorted.map(d => d.dofollow), backgroundColor: sorted.map(d => siteColor(d.domain)) },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `Dofollow: ${c.parsed.x}%` } } },
      scales: {
        x: { max: 100, grid: { color: COLOR.grid }, ticks: { callback: v => v + "%" } },
        y: { grid: { display: false } },
      },
    },
  });
}

function drawHomepageChart() {
  const ctx = document.getElementById("chart-homepage");
  const sorted = [...HOMEPAGE_INTERNAL].sort((a, b) => b.homepage - a.homepage);
  const labels = sorted.map(d => d.domain);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels.map(l => l === OWN_DOMAIN ? "\u25CF " + l : l),
      datasets: [
        { label: "Homepage %", data: sorted.map(d => d.homepage), backgroundColor: COLOR.brass, stack: "hp" },
        { label: "Internal page %", data: sorted.map(d => d.internal), backgroundColor: COLOR.slate, stack: "hp" },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } },
        tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${c.parsed.x.toFixed(1)}%` } },
      },
      scales: {
        x: { stacked: true, max: 100, grid: { color: COLOR.grid }, ticks: { callback: v => v + "%" } },
        y: { stacked: true, grid: { display: false } },
      },
    },
  });
}

function drawDiversityChart() {
  const ctx = document.getElementById("chart-diversity");
  const sorted = [...ANCHOR_DIVERSITY].sort((a, b) => b.ratio - a.ratio);
  const labels = sorted.map(d => d.domain);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels.map(l => l === OWN_DOMAIN ? "\u25CF " + l : l),
      datasets: [
        { label: "Diversity ratio", data: sorted.map(d => d.ratio), backgroundColor: sorted.map(d => siteColor(d.domain)) },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `Ratio: ${c.parsed.x.toFixed(3)}` } } },
      scales: {
        x: { max: 0.7, grid: { color: COLOR.grid } },
        y: { grid: { display: false } },
      },
    },
  });
}