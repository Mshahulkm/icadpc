/* ============================================
   LIVE LEADERBOARD — Google Sheets integration
   Fetches the "Current Point Table" tab as CSV
   from a publicly-viewable Google Sheet and
   refreshes automatically every 30 seconds.
   No backend required.
   ============================================ */

(function () {
  const SHEET_ID = '1suZ3904y0P-SLDcGwFQCzyte-tS7KJJq';
  const SHEET_NAME = 'Current Point Table';
  const REFRESH_MS = 30000;

  const CSV_URL =
    'https://docs.google.com/spreadsheets/d/' +
    SHEET_ID +
    '/gviz/tq?tqx=out:csv&sheet=' +
    encodeURIComponent(SHEET_NAME);

  const lbBody = document.getElementById('lbBody');
  if (!lbBody) return;

  function escapeHTML(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Minimal RFC-4180-ish CSV parser (handles quoted fields, commas, escaped quotes, CRLF)
  function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else { inQuotes = false; }
        } else {
          field += c;
        }
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
        else if (c === '\r') { /* skip */ }
        else field += c;
      }
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function showStatus(message) {
    lbBody.innerHTML =
      '<tr><td colspan="3" class="text-center text-muted py-4">' +
      escapeHTML(message) +
      '</td></tr>';
  }

  function render(entries) {
    if (!entries.length) {
      showStatus('No standings published yet. Check back soon!');
      return;
    }
    lbBody.innerHTML = entries
      .map(function (p) {
        const cls =
          p.rank === 1 ? 'gold' :
          p.rank === 2 ? 'silver' :
          p.rank === 3 ? 'bronze' : '';
        return (
          '<tr>' +
          '<td><span class="rank-badge ' + cls + '">' + p.rank + '</span></td>' +
          '<td>' + escapeHTML(p.name) + '</td>' +
          '<td class="text-end fw-bold text-gold">' + escapeHTML(p.points) + '</td>' +
          '</tr>'
        );
      })
      .join('');
  }

  function normalizeHeader(s) {
    return String(s || '').trim().toLowerCase();
  }

  function buildEntries(rows) {
    if (!rows.length) return [];
    // Find header row (the one containing both a name column and a "total" column)
    let headerIdx = -1;
    let nameIdx = -1;
    let totalIdx = -1;
    for (let r = 0; r < Math.min(rows.length, 5); r++) {
      const cells = rows[r].map(normalizeHeader);
      const ni = cells.findIndex(function (c) { return c.indexOf('participant') !== -1 || c === 'name' || c.indexOf(' name') !== -1; });
      const ti = cells.findIndex(function (c) { return c === 'total' || c.indexOf('total') !== -1 || c === 'points'; });
      if (ni !== -1 && ti !== -1) { headerIdx = r; nameIdx = ni; totalIdx = ti; break; }
    }
    if (headerIdx === -1) return [];

    const entries = [];
    for (let r = headerIdx + 1; r < rows.length; r++) {
      const row = rows[r];
      const name = (row[nameIdx] || '').trim();
      const totalRaw = (row[totalIdx] || '').trim();
      if (!name) continue;
      const points = Number(totalRaw.replace(/[^\d.\-]/g, '')) || 0;
      entries.push({ name: name, points: points });
    }

    entries.sort(function (a, b) { return b.points - a.points; });
    entries.forEach(function (e, i) { e.rank = i + 1; });
    return entries;
  }

  async function load() {
    try {
      const res = await fetch(CSV_URL + '&_=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const text = await res.text();
      const rows = parseCSV(text);
      const entries = buildEntries(rows);
      render(entries);
    } catch (err) {
      console.error('Leaderboard load failed:', err);
      if (!lbBody.children.length || lbBody.querySelector('td[colspan]')) {
        showStatus('Could not load live standings. Retrying...');
      }
    }
  }

  showStatus('Loading live standings...');
  load();
  setInterval(load, REFRESH_MS);
})();
