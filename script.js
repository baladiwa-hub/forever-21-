(function () {
  'use strict';

  /* ---------- Data (prices and names from the live site's current homepage, to be confirmed before launch) ---------- */
  var COL = { Black:'#1A1A1A', Ivory:'#F3EBDD', Brown:'#6B4A35', Leopard:'#B58B4C', Blue:'#4B74A8', Oasis:'#4E9A8F', 'Colony Blue':'#3F6FA8', Saffron:'#E3A72F', Violet:'#7A5BB5', Juniper:'#4B6B57', Gray:'#8D9096', Green:'#5E7A52', Tan:'#C2A57C', Navy:'#1F2D4F', White:'#FFFFFF', 'Ice Wash':'#C9D6E0', 'Grey Wash':'#9AA1A8', 'Tint Wash':'#7E98B2', Birch:'#D9CBB5', 'Plein Air':'#B9C3B5', "Baby's Breath":'#E9EEF7' };
  var TINTS = ['#ECE8DF', '#E3E8EC', '#EFE4E1', '#E5EBE3', '#EDE9F1'];
  function P(id, name, price, was, colors) { return { id: id, name: name, price: price, was: was || 0, colors: colors }; }
  var ROWS = [
    { id: 'new', title: 'New in for her', sub: 'Full-price drops from this week', cta: "Shop all women's new in", bg: '#fff', items: [
      P('w1', 'Satin & Lace Shorts', 24.99, 0, ['Black', 'Ivory']),
      P('w2', 'Cropped Scoop Neck Top', 16.99, 0, ['Black', 'Brown', 'Ivory']),
      P('w3', 'Satin Lace Cutout Mini Dress', 19.99, 0, ['Black']),
      P('w4', 'Active High Waist Ruched Leggings', 19.99, 0, ['Oasis']),
      P('w5', 'Active Cross Back Longline Sports Bra', 19.99, 0, ['Saffron'])] },
    { id: 'sale', title: 'Markdowns up to 71% off', sub: 'Real savings, with the regular price shown', cta: 'Shop all sale', bg: '#FFD600', items: [
      P('s1', 'Polka Dot Mesh Ruched Crop Top', 9.99, 34.99, ['Black']),
      P('s2', 'Denim Bermuda Shorts', 13.99, 34.99, ['Leopard', 'Blue']),
      P('s3', 'Polka Dot Halter Mini Dress', 19.99, 49.99, ['Black', 'White']),
      P('s4', 'Foldover Off-The-Shoulder Top', 14.99, 19.99, ['Black', 'Ivory', 'Brown']),
      P('s5', 'Scoop Neck Bodysuit', 14.99, 19.99, ['Black', 'Brown', 'Ivory'])] },
    { id: 'men', title: 'New in for him', sub: 'Graphic tees, washed denim and fleece', cta: "Shop all men's new in", bg: '#fff', items: [
      P('m1', "Men's Guardian Angel Graphic T-Shirt", 19.99, 0, ['White']),
      P('m2', 'Mineral Wash Racing Graphic Tee', 24.99, 0, ['Gray', 'Green', 'Tan']),
      P('m3', 'Washed Denim Trucker Jacket', 49.99, 0, ['Ice Wash', 'Grey Wash', 'Tint Wash']),
      P('m4', 'Mineral Wash Fleece Full Zip Hoodie', 39.99, 0, ['Plein Air', 'Gray', 'Green', 'Black']),
      P('m5', 'Contrast Trim Notch Neck Polo Shirt', 19.99, 24.99, ['Navy', "Baby's Breath"])] },
    { id: 'active', title: 'Activewear', sub: 'Move in it, wear it out', cta: 'Shop all activewear', bg: '#F4F4F2', items: [
      P('a1', 'Active Ruched Mini Skirt', 24.99, 0, ['Birch']),
      P('a2', 'Active Biker Short With Pockets', 24.99, 0, ['Birch', 'Colony Blue']),
      P('a3', 'Active Fitted Cami Top', 24.99, 0, ['Violet']),
      P('a4', 'Active Quarter Zip Cropped Jacket', 29.99, 0, ['Birch', 'Colony Blue']),
      P('a5', 'Active Racerback Mini Dress', 34.99, 0, ['Juniper', 'Oasis'])] }
  ];

var PRODUCT_IMAGES = {
  w1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85',
  w2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85',
  w3: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85',
  w4: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85',
  w5: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=85',

  s1: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=85',
  s2: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85',
  s3: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85',
  s4: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=85',
  s5: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=85',

  m1: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85',
  m2: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85',
  m3: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=85',
  m4: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85',
  m5: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=700&q=85',

  a1: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=85',
  a2: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=85',
  a3: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=85',
  a4: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85',
  a5: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=85'
};

var CATEGORY_IMAGES = {
  Women: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=85',
  Plus: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=85',
  Men: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=500&q=85',
  Dresses: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=500&q=85',
  Activewear: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=85',
  Accessories: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=85',
  Sale: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=85'
};
  var RAIL = ['Women', 'Plus', 'Men', 'Dresses', 'Activewear', 'Accessories', 'Sale'];
  var FOOTER = [
    { t: 'Help', l: ['My account', 'Track my order', 'Return Center', 'Contact us', 'Size guide'] },
    { t: 'Offers', l: ['All offers and codes', 'Get the app'] },
    { t: 'Policies', l: ['Shipping policy', 'Return policy', 'Privacy policy', 'Terms of service', 'Accessibility statement'] },
    { t: 'About', l: ['Our mission', 'FAQs', 'Product recalls'] }
  ];
  var SUGGEST = ['Dresses', 'Denim', 'Hoodies', 'Polka dot', 'Activewear', 'Graphic tees', 'Plus size dresses'];
  var SIZES = ['XS', 'S', 'M', 'L', 'XL'];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return '$' + n.toFixed(2); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------- Render ---------- */
  var state = { bag: 0, wish: {}, lastFocus: null, pending: null };
  var wishSvg = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.6A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/></svg>';

  function card(p, i) {
    var pct = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    var sale = pct >= 20;
    var shown = p.colors.slice(0, 4);
    return '<article class="card" data-id="' + p.id + '">' +
      
      '<div class="card__img" style="background:' + TINTS[i % 5] + '">' +
      (sale ? '<span class="badge">-' + pct + '%</span>' : '') +
      '<button class="wish" aria-pressed="false" aria-label="Save ' + esc(p.name) + ' to wishlist">' + wishSvg + '</button>' +
      '<img class="card__photo" src="' + (PRODUCT_IMAGES[p.id] || '') + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="swatches" role="group" aria-label="Colors for ' + esc(p.name) + '">' +
      shown.map(function (c, k) { return '<button class="sw" aria-pressed="' + (k === 0) + '" aria-label="' + esc(c) + '"><i style="background:' + (COL[c] || '#ccc') + '"></i></button>'; }).join('') +
      (p.colors.length > 4 ? '<span class="more">+' + (p.colors.length - 4) + '</span>' : '') + '</div>' +
      '<a class="card__name" href="#' + p.id + '">' + esc(p.name) + '</a>' +
      '<div class="price"><strong class="' + (sale ? 'sale' : '') + '">' + money(p.price) + '</strong>' + (sale ? '<s><span class="sr">Was </span>' + money(p.was) + '</s>' : '') + '</div>' +
      '<button class="pick" data-pick="' + p.id + '">Select size</button></article>';
  }

  $('#rows').innerHTML = ROWS.map(function (r) {
    return '<section class="row" id="' + r.id + '" style="background:' + r.bg + '" aria-labelledby="h-' + r.id + '">' +
      '<div class="row__head"><div><h2 id="h-' + r.id + '">' + r.title + '</h2><p>' + r.sub + '</p></div><a class="link" href="#' + r.id + '">' + r.cta + '</a></div>' +
      '<div class="grid">' + r.items.map(card).join('') + '</div></section>';
  }).join('');

  
$('#rail').innerHTML = RAIL.map(function (l, i) {
  var image = CATEGORY_IMAGES[l] || '';

  return '<li>' +
    '<a href="#' + (l === 'Sale' ? 'sale' : 'new') + '"' +
    (l === 'Sale' ? ' style="color:#C8102E;border-color:#C8102E"' : '') +
    '>' +
    '<span class="tile" style="background-image:url(&quot;' +
    image + '&quot;)"></span>' +
    '<span class="tile__label">' + esc(l) + '</span>' +
    '</a>' +
    '</li>';
}).join('');
  $('#ugc').innerHTML = [0, 1, 2, 3, 4, 5].map(function (i) { return '<li><a href="#looks" style="background:' + TINTS[i % 5] + '"><span class="ph">@handle · shop 3 items</span></a></li>'; }).join('');
  $('#footerCols').innerHTML = FOOTER.map(function (c) {
    return '<details class="footer__col" open><summary><h3>' + c.t + '</h3></summary><ul>' + c.l.map(function (x) { return '<li><a href="#help">' + x + '</a></li>'; }).join('') + '</ul></details>';
  }).join('');

  /* ---------- Toast + counters ---------- */
  var toastT;
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2400); }
  function setCount(el, btn, n, label) { el.textContent = n; el.classList.toggle('is-zero', n === 0); btn.setAttribute('aria-label', label + ', ' + n + ' item' + (n === 1 ? '' : 's')); }
  function syncCounts() {
    setCount($('#bagCount'), $('#bagBtn'), state.bag, 'Bag');
    setCount($('#wishCount'), $('#wishBtn'), Object.keys(state.wish).length, 'Wishlist');
  }
  syncCounts();

  /* ---------- Cards: wishlist, swatches, size picker ---------- */
  document.addEventListener('click', function (e) {
    var w = e.target.closest('.wish');
    if (w) {
      var id = w.closest('.card').dataset.id, on = w.getAttribute('aria-pressed') !== 'true';
      w.setAttribute('aria-pressed', on);
      if (on) state.wish[id] = 1; else delete state.wish[id];
      syncCounts(); toast(on ? 'Saved to wishlist' : 'Removed from wishlist'); return;
    }
    var sw = e.target.closest('.sw');
    if (sw) { $$('.sw', sw.parentNode).forEach(function (b) { b.setAttribute('aria-pressed', b === sw); }); return; }
    var pk = e.target.closest('.pick');
    if (pk) { openSheet(pk); }
  });

  var sheet = $('#sizeSheet');
  function stockFor(id, s) { return !((id.charCodeAt(1) + s.charCodeAt(0)) % 7 === 0); } // demo stock
  function openSheet(btn) {
    var c = btn.closest('.card'); state.lastFocus = btn; state.pending = c.dataset.id;
    $('#sheetName').textContent = $('.card__name', c).textContent + ' · ' + $('.price strong', c).textContent;
    $('#sizes').innerHTML = SIZES.map(function (s) {
      var ok = stockFor(state.pending, s);
      return '<button data-size="' + s + '"' + (ok ? '' : ' disabled aria-label="' + s + ', sold out"') + '>' + s + '</button>';
    }).join('');
    sheet.hidden = false; document.body.style.overflow = 'hidden';
    var first = $('#sizes button:not([disabled])'); if (first) first.focus();
  }
  function closeSheet() { sheet.hidden = true; document.body.style.overflow = ''; if (state.lastFocus) state.lastFocus.focus(); }
  $('#sheetClose').addEventListener('click', closeSheet);
  sheet.addEventListener('click', function (e) {
    if (e.target === sheet) return closeSheet();
    var b = e.target.closest('[data-size]');
    if (b && !b.disabled) { state.bag++; syncCounts(); var name = $('#sheetName').textContent.split(' · ')[0]; closeSheet(); toast('Added to bag: ' + name + ', size ' + b.dataset.size); }
  });

  /* ---------- Desktop mega menu (disclosure pattern) ---------- */
  var trig = $('#womenTrigger'), mega = $('#mega-women'), navLi = trig.parentNode, hoverT;
  function openMega() { mega.hidden = false; trig.setAttribute('aria-expanded', 'true'); }
  function closeMega(focus) { mega.hidden = true; trig.setAttribute('aria-expanded', 'false'); if (focus) trig.focus(); }
  trig.addEventListener('click', function () { // on hover devices the pointer already opened it, so a click must not toggle it shut
    if (mega.hidden || !matchMedia('(hover:hover)').matches) { mega.hidden ? openMega() : closeMega(); } });
  navLi.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) { clearTimeout(hoverT); openMega(); } });
  navLi.addEventListener('mouseleave', function () { hoverT = setTimeout(function () { closeMega(); }, 180); }); // small delay so the pointer can travel to the panel
  document.addEventListener('click', function (e) { if (!mega.hidden && !navLi.contains(e.target)) closeMega(); });
  navLi.addEventListener('focusout', function (e) { if (!navLi.contains(e.relatedTarget)) closeMega(); });

  /* ---------- Mobile drawer with drill-down ---------- */
  var drawer = $('#drawer'), scrim = $('#scrim'), body = $('#drawerBody'), backBtn = $('#drawerBack'), titleEl = $('#drawerTitle'), menuBtn = $('#menuBtn');
  var MENU = {
    root: { title: 'Shop', items: [['New In', '#new'], ['Women', 'women'], ['Plus', '#plus'], ['Men', '#men'], ['Kids', '#new'], ['Accessories', '#new'], ['Shoes', '#new'], ['Sale', '#sale', 'sale']] },
    women: { title: 'Women', parent: 'root', all: '#new', items: [['Dresses', 'dresses'], ['Tops', '#new'], ['Bottoms', '#new'], ['Jackets and coats', '#new'], ['Sweaters', '#new'], ['Activewear', '#active'], ['Accessories', '#new']] },
    dresses: { title: 'Dresses', parent: 'women', all: '#new', items: [['Mini dresses', '#new'], ['Midi dresses', '#new'], ['Maxi dresses', '#new'], ['Going out', '#new'], ['Polka dot', '#sale']] }
  };
  var stack = ['root'];
  function renderDrawer() {
    var key = stack[stack.length - 1], m = MENU[key], html = '';
    if (m.all) html += '<a class="viewall" href="' + m.all + '" data-close>View all ' + m.title + '</a>';
    html += m.items.map(function (it) {
      var chev = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
      return MENU[it[1]] ? '<button class="item" data-go="' + it[1] + '">' + it[0] + chev + '</button>' : '<a href="' + it[1] + '" class="' + (it[2] || '') + '" data-close>' + it[0] + '</a>';
    }).join('');
    if (key === 'root') html += '<div class="quick"><a href="#account" data-close>Account</a><a href="#wish" data-close>Wishlist</a><a href="#help" data-close>Help</a></div>';
    body.innerHTML = html; titleEl.textContent = m.title; backBtn.hidden = stack.length < 2;
  }
  function openDrawer() { stack = ['root']; renderDrawer(); scrim.hidden = false; drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; $('#drawerClose').focus(); }
  function closeDrawer() { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); scrim.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; menuBtn.focus(); }
  menuBtn.addEventListener('click', openDrawer);
  $('#drawerClose').addEventListener('click', closeDrawer);
  scrim.addEventListener('click', closeDrawer);
  backBtn.addEventListener('click', function () { stack.pop(); renderDrawer(); });
  body.addEventListener('click', function (e) {
    var g = e.target.closest('[data-go]'); if (g) { stack.push(g.dataset.go); renderDrawer(); var f = $('.viewall', body) || $('.item,a', body); if (f) f.focus(); return; }
    if (e.target.closest('[data-close]')) closeDrawer();
  });

  /* ---------- Search ---------- */
  var q = $('#q'), sug = $('#suggest'), header = $('.header'), stg = $('#searchToggle');
  function mobile() { return matchMedia('(max-width:960px)').matches; }
  function syncSearch() { if (mobile()) { header.classList.add('search-closed'); stg.setAttribute('aria-expanded', 'false'); } else { header.classList.remove('search-closed'); } }
  syncSearch(); addEventListener('resize', syncSearch);
  stg.addEventListener('click', function () { var open = header.classList.toggle('search-closed') === false; stg.setAttribute('aria-expanded', open); if (open) q.focus(); });
  function showSuggest() {
    var v = q.value.trim().toLowerCase();
    var list = SUGGEST.filter(function (s) { return !v || s.toLowerCase().indexOf(v) > -1; }).slice(0, 6);
    sug.innerHTML = list.map(function (s) { return '<li><a href="#new">' + esc(s) + '</a></li>'; }).join('');
    sug.hidden = !list.length; q.setAttribute('aria-expanded', String(!sug.hidden));
  }
  q.addEventListener('focus', showSuggest); q.addEventListener('input', showSuggest);
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) { sug.hidden = true; q.setAttribute('aria-expanded', 'false'); } });
  $('#searchForm').addEventListener('submit', function (e) { e.preventDefault(); sug.hidden = true; toast(q.value.trim() ? 'Search for "' + q.value.trim() + '" (demo only)' : 'Type something to search'); });
  q.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { var a = $('a', sug); if (a) { e.preventDefault(); a.focus(); } } });
  sug.addEventListener('keydown', function (e) {
    var links = $$('a', sug), i = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown' && i < links.length - 1) { e.preventDefault(); links[i + 1].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? links[i - 1] : q).focus(); }
  });

  /* ---------- Bag + wishlist buttons (demo) ---------- */
  $('#bagBtn').addEventListener('click', function () { toast(state.bag ? state.bag + ' item(s) in your bag (cart page not part of this concept)' : 'Your bag is empty'); });
  $('#wishBtn').addEventListener('click', function () { toast(Object.keys(state.wish).length + ' saved item(s)'); });

  /* ---------- Newsletter ---------- */
  $('#newsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var em = $('#em'), m = $('#emMsg'), ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim());
    em.setAttribute('aria-invalid', String(!ok)); m.className = 'msg' + (ok ? '' : ' err');
    m.textContent = ok ? 'Thanks! Check your inbox for your 15% off code (demo: no email is sent).' : 'Enter a valid email address, like you@example.com.';
    if (!ok) em.focus();
  });

  /* ---------- Footer accordion on mobile ---------- */
  function syncFooter() { var mob = matchMedia('(max-width:700px)').matches; $$('.footer__col').forEach(function (d) { d.open = !mob; }); }
  syncFooter(); addEventListener('resize', syncFooter);
  $$('.footer__col summary').forEach(function (s) { s.addEventListener('click', function (e) { if (!matchMedia('(max-width:700px)').matches) e.preventDefault(); }); });

  /* ---------- Escape handling ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!sheet.hidden) return closeSheet();
    if (drawer.classList.contains('is-open')) return closeDrawer();
    if (!mega.hidden) return closeMega(true);
    if (!sug.hidden) { sug.hidden = true; q.focus(); }
  });
  // keep focus inside the open drawer / sheet
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var box = !sheet.hidden ? sheet : drawer.classList.contains('is-open') ? drawer : null; if (!box) return;
    var f = $$('button:not([disabled]),a[href]', box).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
