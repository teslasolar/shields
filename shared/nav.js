// Shared grouped navigation for all shield pages
// Inject by adding <script src="../shared/nav.js"></script> before </body>
(function(){
  const CURRENT = location.pathname.split('/').filter(Boolean).pop();

  const GROUPS = [
    { label:'GEOMETRY', color:'#604', items:[
      {id:'orb',color:'#604'},{id:'flat',color:'#0f8'},{id:'spiral',color:'#f0f'},{id:'hexagon',color:'#ff4'},{id:'fractal',color:'#f0a'}
    ]},
    { label:'NUMBER THEORY', color:'#0ad', items:[
      {id:'number',color:'#0ff'},{id:'sieve',color:'#8f0'},{id:'twin',color:'#f80'},{id:'perfect',color:'#0cf'},{id:'fibonacci',color:'#fc0'},{id:'goldbach',color:'#4ff'}
    ]},
    { label:'ORGANIC', color:'#4a4', items:[
      {id:'breath',color:'#a4f'},{id:'tree',color:'#4a4'},{id:'cascade',color:'#fa0'},{id:'flow',color:'#0f8'}
    ]},
    { label:'SYSTEMS', color:'#fc0', items:[
      {id:'drug',color:'#f44'},{id:'network',color:'#fc0'},{id:'harmony',color:'#f4a'}
    ]}
  ];

  // Find which group the current page belongs to
  let activeGroup = -1;
  GROUPS.forEach((g, gi) => {
    g.items.forEach(it => { if (it.id === CURRENT) activeGroup = gi; });
  });

  // Remove existing nav
  const oldNav = document.querySelector('nav, #shield-nav, #nav');
  if (oldNav) oldNav.remove();

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #shield-nav-v2{position:fixed;top:0;left:0;right:0;z-index:99999;display:flex;align-items:center;gap:0;height:36px;background:rgba(6,6,16,.97);border-bottom:1px solid rgba(0,170,255,.15);backdrop-filter:blur(8px);padding:0 10px;font-family:'Courier New',monospace}
    #shield-nav-v2 .brand{font-size:9px;letter-spacing:2px;color:#556;margin-right:10px;white-space:nowrap}
    #shield-nav-v2 .gallery-btn{font-size:8px;letter-spacing:1.5px;text-decoration:none;padding:6px 10px;border-radius:4px;color:#0af;font-weight:bold;transition:all .2s;white-space:nowrap;border:1px solid transparent}
    #shield-nav-v2 .gallery-btn:hover{background:rgba(0,170,255,.08)}
    #shield-nav-v2 .sep{color:#223;margin:0 4px;font-size:10px}
    .sn2-group{position:relative;display:inline-flex;align-items:center}
    .sn2-group-btn{font-size:8px;letter-spacing:1.5px;text-decoration:none;padding:6px 10px;border-radius:4px;transition:all .2s;white-space:nowrap;border:1px solid transparent;cursor:pointer;background:none;font-family:'Courier New',monospace;display:flex;align-items:center;gap:4px}
    .sn2-group-btn:hover{background:rgba(0,170,255,.08)}
    .sn2-group-btn .arrow{font-size:6px;opacity:.5;transition:transform .2s}
    .sn2-group:hover .arrow{transform:rotate(180deg)}
    .sn2-group-btn.has-active{border-color:rgba(0,170,255,.2);background:rgba(0,170,255,.06)}
    .sn2-dropdown{display:none;position:absolute;top:100%;left:0;min-width:180px;background:rgba(6,6,16,.97);border:1px solid rgba(0,170,255,.15);border-radius:0 6px 6px 6px;padding:4px 0;backdrop-filter:blur(12px);box-shadow:0 8px 32px rgba(0,0,0,.6)}
    .sn2-group:hover .sn2-dropdown{display:block}
    .sn2-dropdown a{display:flex;align-items:center;gap:8px;font-size:8px;letter-spacing:1.5px;text-decoration:none;padding:7px 14px;transition:all .15s;white-space:nowrap}
    .sn2-dropdown a:hover{background:rgba(0,170,255,.08)}
    .sn2-dropdown a.active{background:rgba(0,170,255,.1)}
    .sn2-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
  `;
  document.head.appendChild(style);

  // Build nav
  const nav = document.createElement('nav');
  nav.id = 'shield-nav-v2';

  nav.innerHTML = '<span class="brand">M₇</span>' +
    '<a href="../" class="gallery-btn">◀ GALLERY</a>' +
    '<span class="sep">|</span>';

  GROUPS.forEach((g, gi) => {
    const group = document.createElement('div');
    group.className = 'sn2-group';

    const btn = document.createElement('button');
    btn.className = 'sn2-group-btn' + (gi === activeGroup ? ' has-active' : '');
    btn.style.color = g.color;
    btn.innerHTML = g.label + ' <span class="arrow">▼</span>';

    const dropdown = document.createElement('div');
    dropdown.className = 'sn2-dropdown';

    g.items.forEach(it => {
      const a = document.createElement('a');
      a.href = '../' + it.id + '/';
      if (it.id === CURRENT) a.className = 'active';
      a.innerHTML = '<span class="sn2-dot" style="background:' + it.color + '"></span>' +
        '<span style="color:' + it.color + '">' + it.id.toUpperCase() + '</span>';
      dropdown.appendChild(a);
    });

    group.appendChild(btn);
    group.appendChild(dropdown);
    nav.appendChild(group);
  });

  document.body.prepend(nav);

  // Adjust body padding so content isn't hidden behind nav
  document.body.style.paddingTop = document.body.style.paddingTop || '';
})();
