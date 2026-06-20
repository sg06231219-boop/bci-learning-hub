// BCI Learning Hub - Main App v1.0.1
(function(){
'use strict';
const SIDEBAR_STATE='bci-sidebar-groups';
const PROGRESS_KEY='bci-progress';
const BOOKMARKS_KEY='bci-bookmarks';
const THEME_KEY='bci-theme';
const FOCUS_KEY='bci-focus';

// === State ===
let currentChapter=null, currentPage='home', allChapters=[], searchTimer=null;
const PAGES={};
// Build all chapters from CHAPTERS + APPENDICES
allChapters=CHAPTERS.concat(APPENDICES.map(a=>({
  id:'app'+a.id, title:'附录'+a.id+': '+a.title, slug: a.slug,
  summary:'', tags:['附录'], difficulty:1, hours:'30min',
  content:a.content, faq:[], xrefs:[]
})));

// === Init ===
function init(){
  loadSidebarState();
  loadProgress();
  loadBookmarks();
  loadTheme();
  loadFocusMode();
  renderSidebar();
  renderBookmarks();
  setupEventListeners();
  const hash=window.location.hash.slice(1);
  if(hash&&hash.startsWith('ch')){loadChapter(hash);}
  else if(hash==='home'){renderHome();}
  else{renderHome();}
  // Service Worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
  }
}

// === Sidebar State ===
function loadSidebarState(){
  try{return JSON.parse(localStorage.getItem(SIDEBAR_STATE)||'{}');}catch(e){return {};}
}
function saveSidebarState(s){
  localStorage.setItem(SIDEBAR_STATE,JSON.stringify(s));
}

// === Progress ===
function loadProgress(){
  try{return JSON.parse(localStorage.getItem(PROGRESS_KEY)||'[]');}catch(e){return [];}
}
function saveProgress(p){
  localStorage.setItem(PROGRESS_KEY,JSON.stringify(p));
}
function isDone(id){return loadProgress().includes(String(id));}
function toggleProgress(id){
  const p=loadProgress();const sid=String(id);
  const idx=p.indexOf(sid);
  if(idx>=0)p.splice(idx,1);else p.push(sid);
  saveProgress(p);renderSidebar();renderBookmarks();
  if(currentChapter)renderChapterContent(currentChapter);
  else renderHome();
}

// === Bookmarks ===
function loadBookmarks(){
  try{return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)||'[]');}catch(e){return [];}
}
function saveBookmarks(b){
  localStorage.setItem(BOOKMARKS_KEY,JSON.stringify(b));
}
function toggleBookmark(id){
  const b=loadBookmarks();const sid=String(id);
  const idx=b.indexOf(sid);
  if(idx>=0)b.splice(idx,1);else b.push(sid);
  saveBookmarks(b);renderBookmarks();
  if(currentChapter)renderChapterContent(currentChapter);
  else renderHome();
}
function isBookmarked(id){return loadBookmarks().includes(String(id));}

// === Theme ===
function loadTheme(){
  const saved=localStorage.getItem(THEME_KEY);
  if(saved==='light'){
    document.body.classList.add('light-mode');
  }else if(!saved){
    if(window.matchMedia('(prefers-color-scheme: light)').matches){
      document.body.classList.add('light-mode');
    }
  }
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change',e=>{
    if(!localStorage.getItem(THEME_KEY)){
      document.body.classList.toggle('light-mode',e.matches);
    }
  });
}
function toggleTheme(){
  document.body.classList.toggle('light-mode');
  localStorage.setItem(THEME_KEY,document.body.classList.contains('light-mode')?'light':'dark');
}

// === Focus Mode ===
function loadFocusMode(){
  if(localStorage.getItem(FOCUS_KEY)==='true'){
    document.body.classList.add('focus-mode');
  }
}
function toggleFocus(){
  document.body.classList.toggle('focus-mode');
  localStorage.setItem(FOCUS_KEY,document.body.classList.contains('focus-mode')?'true':'false');
}

// === Sidebar ===
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
}
function toggleNavGroup(el){
  const g=el.parentElement;
  g.classList.toggle('open');
  const s=loadSidebarState();
  const name=el.textContent.trim().replace(/ .*/,'');
  s[name]=g.classList.contains('open');
  saveSidebarState(s);
}
function renderSidebar(){
  const nav=document.getElementById('sidebarNav');
  let html='';
  // Home
  html+=`<div class="nav-group"><div class="nav-group-title">🏠 导航</div>
    <a class="nav-item ${currentPage==='home'?'active':''}" data-page="home" onclick="window.app.navHome()">🧠 学习枢纽首页</a>
    <a class="nav-item" data-page="overview" onclick="window.app.navOverview()">📊 学习路线总览</a>
    <a class="nav-item" data-page="hardware" onclick="window.app.navHardware()">🔧 硬件对比决策器</a>
    <a class="nav-item" data-page="projects" onclick="window.app.navProjects()">🚀 实战项目列表</a>
    <a class="nav-item" data-page="glossary" onclick="window.app.navGlossary()">📖 术语词典(60+)</a>
  </div>`;
  // Chapters
  const half=Math.ceil(CHAPTERS.length/2);
  for(let part=0;part<2;part++){
    const start=part*half,end=Math.min((part+1)*half,CHAPTERS.length);
    html+=`<div class="nav-group collapsible ${loadSidebarState()[`第${part+1}`]?'open':''}">
      <div class="nav-group-title" onclick="window.app._toggleNavGroup(this)">📚 第${part+1}部分 (第${start+1}-${end}章) <span class="toggle-icon">▸</span></div>`;
    for(let i=start;i<end;i++){
      const ch=CHAPTERS[i];const done=isDone(ch.id);
      html+=`<a class="nav-item ${currentChapter&&currentChapter.id==ch.id?'active':''} ${done?'done':''}" onclick="window.app.loadChapter('${ch.slug}')" title="${ch.summary}">${ch.id}. ${ch.title}</a>`;
    }
    html+=`</div>`;
  }
  // Appendices
  html+=`<div class="nav-group collapsible ${loadSidebarState()['附录']?'open':''}">
    <div class="nav-group-title" onclick="window.app._toggleNavGroup(this)">📎 附录 <span class="toggle-icon">▸</span></div>`;
  APPENDICES.forEach(a=>{
    html+=`<a class="nav-item" onclick="window.app.loadChapter('${a.slug}')">附录${a.id}: ${a.title}</a>`;
  });
  html+=`</div>`;
  nav.innerHTML=html;
}

function renderBookmarks(){
  const bm=loadBookmarks();
  const section=document.getElementById('bookmarksSection');
  const list=document.getElementById('bookmarkList');
  const count=document.getElementById('bmCount');
  if(bm.length===0){section.style.display='none';return;}
  section.style.display='block';
  count.textContent=bm.length;
  let html='';
  bm.forEach(id=>{
    const ch=findChapter(id);
    if(ch){
      html+=`<div class="bm-item" onclick="window.app.loadChapter('${ch.slug}')">⭐ ${typeof ch.id==='number'?'第'+ch.id+'章':'附录'+ch.id.slice(3)}: ${ch.title}<span class="bm-remove" onclick="event.stopPropagation();window.app.toggleBookmark('${id}')">✕</span></div>`;
    }
  });
  list.innerHTML=html;
}

function findChapter(id){
  const sid=String(id);
  const ch=CHAPTERS.find(c=>String(c.id)===sid);
  if(ch)return ch;
  if(sid.startsWith('app')){
    const aid=sid.slice(3);
    const a=APPENDICES.find(a=>a.id===aid);
    if(a)return {id:sid,title:'附录'+a.id+': '+a.title,slug:a.slug,content:a.content,faq:[],xrefs:[],tags:['附录'],difficulty:1,hours:'30min'};
  }
  return null;
}

// === SPA Page Loading ===
function navPage(name,url){
  currentPage=name;currentChapter=null;
  if(PAGES[name]){renderPageContent(name,PAGES[name]);return;}
  const contentArea=document.getElementById('contentArea');
  contentArea.innerHTML='<div class="skeleton-wrap"><div class="skeleton-line title"></div><div class="skeleton-line h2"></div><div class="skeleton-line p"></div><div class="skeleton-line p2"></div><div class="skeleton-line p3"></div><div class="skeleton-line short"></div></div>';
  fetch(url).then(r=>r.text()).then(html=>{
    PAGES[name]=html;
    renderPageContent(name,html);
  }).catch(()=>{window.location.href=url;});
}
function renderPageContent(name,html){
  const parser=new DOMParser();
  const doc=parser.parseFromString(html,'text/html');
  // Inject inline styles
  doc.querySelectorAll('style').forEach(s=>{
    document.head.appendChild(s.cloneNode(true));
  });
  // Extract main content
  const main=doc.querySelector('main')||doc.querySelector('.content');
  if(main){
    document.getElementById('contentArea').innerHTML=main.outerHTML;
  }else{
    document.getElementById('contentArea').innerHTML=doc.body.innerHTML;
  }
  // Re-execute scripts
  doc.querySelectorAll('script').forEach(s=>{
    const script=document.createElement('script');
    if(s.src){script.src=s.src;}
    else{script.textContent=s.textContent;}
    document.body.appendChild(script);
  });
  document.getElementById('tocSidebar').style.display='none';
  document.getElementById('progressBar').style.width='0';
  document.getElementById('breadcrumb').innerHTML='🧠 BCI学习枢纽 · '+name;
  document.title=(doc.title||name)+' - BCI学习枢纽';
  window.scrollTo({top:0});
  history.pushState({page:name},'',url);
}
// Handle back/forward
window.addEventListener('popstate',e=>{
  if(e.state&&e.state.page){
    const name=e.state.page;
    if(name==='home'){navHome();}
    else{navPage(name,window.location.pathname);}
  }
});

// === Routing ===
function navHome(){currentPage='home';currentChapter=null;renderHome();window.location.hash='home';}
function navOverview(){navPage('学习路线总览','/overview.html');}
function navHardware(){navPage('硬件对比决策器','/hardware.html');}
function navProjects(){navPage('实战项目列表','/projects.html');}
function navGlossary(){navPage('术语词典','/glossary.html');}

// === Render Home ===
function renderHome(){
  currentPage='home';currentChapter=null;
  renderSidebar();
  const progress=loadProgress();const doneCount=progress.length;
  const totalCount=CHAPTERS.length;
  const pct=totalCount>0?Math.round(doneCount/totalCount*100):0;
  document.getElementById('breadcrumb').innerHTML='🧠 BCI学习枢纽 · 首页';
  document.getElementById('tocSidebar').style.display='none';
  document.getElementById('progressBar').style.width='0';
  const content=document.getElementById('contentArea');
  const bm=loadBookmarks();
  let html=`
<div class="home-hero">
  <h1>🧠 生物脑机接口(BCI)嵌入式学习路线</h1>
  <p class="subtitle">从零到专家 · 22章系统教程 · 7个附录 · 对标全球最前沿</p>
  <div class="badge-row">
    <span class="badge">📦 v5.0 (2026-06)</span>
    <span class="badge">📝 ~52,000字</span>
    <span class="badge">🎯 对标Neuralink/OpenBCI/博睿康</span>
    <span class="badge">🌐 嵌入式+信号处理+AI</span>
  </div>
</div>
<div class="home-stats">
  <div class="home-stat"><div class="num">22</div><div class="label">核心章节</div></div>
  <div class="home-stat"><div class="num">7</div><div class="label">附录资料</div></div>
  <div class="home-stat"><div class="num">60+</div><div class="label">术语词条</div></div>
  <div class="home-stat"><div class="num">6</div><div class="label">学习等级(Lv.0-6)</div></div>
  <div class="home-stat"><div class="num">${pct}%</div><div class="label">学习进度(${doneCount}/${totalCount})</div></div>
</div>`;

  // Core principles
  if(typeof CORE_PRINCIPLES!=='undefined'&&Array.isArray(CORE_PRINCIPLES)){
    html+=`<div class="note"><strong>🎯 16条核心原则</strong><br>`;
    html+=CORE_PRINCIPLES.map((p,i)=>`${i+1}. ${p}`).join('<br>');
    html+=`</div>`;
  }

  // Sort bar
  html+=`<div class="sort-bar"><span class="sort-label">排序：</span>
    <button class="sort-btn active" onclick="window.app._sortChapters('default')">默认顺序</button>
    <button class="sort-btn" onclick="window.app._sortChapters('difficulty')">按难度</button>
    <button class="sort-btn" onclick="window.app._sortChapters('time')">按时长</button>
  </div>`;

  // Chapter cards
  html+=`<div class="section-title">📚 22章核心课程</div><div class="chapter-grid" id="chapterGrid">`;
  CHAPTERS.forEach(ch=>{
    const done=isDone(ch.id);
    const bmed=isBookmarked(ch.id);
    const stars='⭐'.repeat(ch.difficulty);
    html+=`
    <div class="chapter-card" onclick="window.app.loadChapter('${ch.slug}')">
      <div class="progress-check ${done?'done':''}" onclick="event.stopPropagation();window.app.toggleProgress(${ch.id})">${done?'✓':''}</div>
      <div class="card-top">
        <div class="card-num">第${ch.id}章</div>
        <button class="card-bm ${bmed?'active':''}" onclick="event.stopPropagation();window.app.toggleBookmark(${ch.id})">${bmed?'⭐':'☆'}</button>
      </div>
      <div class="card-title">${ch.title}</div>
      <div class="card-desc">${ch.summary}</div>
      <div class="card-meta">
        ${ch.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        <span class="read-time">⏱ ${ch.hours}</span>
      </div>
    </div>`;
  });
  html+=`</div>`;

  // Appendices
  html+=`<div class="section-title">📎 7个附录</div><div class="chapter-grid">`;
  APPENDICES.forEach(a=>{
    html+=`<div class="chapter-card" onclick="window.app.loadChapter('${a.slug}')">
      <div class="card-num">附录${a.id}</div>
      <div class="card-title">${a.title}</div>
    </div>`;
  });
  html+=`</div>`;

  // Bookmarked quick access
  if(bm.length>0){
    html+=`<div class="section-title">⭐ 收藏夹快速跳转</div><div class="chapter-grid">`;
    bm.forEach(id=>{
      const ch=findChapter(id);
      if(ch){
        html+=`<div class="chapter-card" onclick="window.app.loadChapter('${ch.slug}')">
          <div class="card-num">${typeof ch.id==='number'?'第'+ch.id+'章':'附录'+String(ch.id).slice(3)}</div>
          <div class="card-title">${ch.title}</div>
        </div>`;
      }
    });
    html+=`</div>`;
  }

  content.innerHTML=html;
  document.title='BCI学习枢纽 - 生物脑机接口嵌入式学习路线';
  window.scrollTo({top:0,behavior:'smooth'});
}

// Sort
function _sortChapters(mode){
  const grid=document.getElementById('chapterGrid');
  if(!grid)return;
  let sorted=[...CHAPTERS];
  if(mode==='difficulty')sorted.sort((a,b)=>a.difficulty-b.difficulty);
  else if(mode==='time')sorted.sort((a,b)=>{
    const pa=parseInt(a.hours)||0;const pb=parseInt(b.hours)||0;return pa-pb;
  });
  // Transition animation
  grid.style.opacity='0';
  grid.style.transform='translateY(8px)';
  setTimeout(()=>{
    // Re-render grid
    let html='';
    sorted.forEach(ch=>{
      const done=isDone(ch.id);const bmed=isBookmarked(ch.id);
      html+=`
    <div class="chapter-card" onclick="window.app.loadChapter('${ch.slug}')">
      <div class="progress-check ${done?'done':''}" onclick="event.stopPropagation();window.app.toggleProgress(${ch.id})">${done?'✓':''}</div>
      <div class="card-top"><div class="card-num">第${ch.id}章</div>
      <button class="card-bm ${bmed?'active':''}" onclick="event.stopPropagation();window.app.toggleBookmark(${ch.id})">${bmed?'⭐':'☆'}</button></div>
      <div class="card-title">${ch.title}</div>
      <div class="card-desc">${ch.summary}</div>
      <div class="card-meta">${ch.tags.map(t=>`<span class="tag">${t}</span>`).join('')}<span class="read-time">⏱ ${ch.hours}</span></div>
    </div>`;
    });
    grid.innerHTML=html;
    grid.style.opacity='1';
    grid.style.transform='translateY(0)';
  },150);
}

// === Load Chapter ===
function loadChapter(slug){
  let ch=CHAPTERS.find(c=>c.slug===slug);
  let isAppendix=false;
  if(!ch){
    const a=APPENDICES.find(a=>a.slug===slug);
    if(a){ch={id:'app'+a.id,title:'附录'+a.id+': '+a.title,slug:a.slug,content:a.content,faq:[],xrefs:[],tags:['附录'],difficulty:1,hours:'30min'};isAppendix=true;}
  }
  if(!ch){renderHome();return;}
  currentChapter=ch;currentPage='chapter';
  window.location.hash=ch.slug;
  renderChapterContent(ch);
}

function renderChapterContent(ch){
  renderSidebar();
  const isApp=(typeof ch.id==='string'&&ch.id.startsWith('app'));
  const chNum=isApp?`附录${ch.id.slice(3)}`:`第${ch.id}章`;
  const done=isDone(ch.id);
  const bmed=isBookmarked(ch.id);
  const stars='⭐'.repeat(ch.difficulty||1);

  document.getElementById('breadcrumb').innerHTML=
    `<span class="link" onclick="window.app.navHome()">🧠 首页</span> <span class="sep">/</span> <span>${chNum}</span>`;

  // Progress bar
  document.getElementById('progressBar').style.width=
    (CHAPTERS.indexOf(CHAPTERS.find(c=>c.id===ch.id))+1)/CHAPTERS.length*100+'%';

  // TOC
  buildTOC(ch.content);

  // Chapter header
  let html=`
<div class="chapter-header">
  <div class="chapter-num">${chNum}</div>
  <h1>${ch.title}</h1>
  <div class="chapter-meta">
    <span>⏱ 阅读时间: ${ch.hours||'30min'}</span>
    <span>📊 难度: ${stars}</span>
    ${ch.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
    <span style="cursor:pointer" onclick="window.app.toggleProgress('${ch.id}')">${done?'✅ 已完成':'⬜ 标记完成'}</span>
    <span style="cursor:pointer" onclick="window.app.toggleBookmark('${ch.id}')">${bmed?'⭐ 已收藏':'☆ 收藏'}</span>
  </div>
</div>`;

  // Content
  html+=ch.content;

  // FAQ
  if(ch.faq&&ch.faq.length>0){
    html+=`<div class="faq-section"><h3>💬 常见问题</h3>`;
    ch.faq.forEach((f,i)=>{
      html+=`<div class="faq-item" onclick="this.classList.toggle('open')">
        <div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`;
    });
    html+=`</div>`;
  }

  // Cross references
  if(ch.xrefs&&ch.xrefs.length>0){
    html+=`<div class="xrefs"><h4>📎 相关章节</h4>`;
    ch.xrefs.forEach(xid=>{
      const xch=CHAPTERS.find(c=>c.id===xid);
      if(xch)html+=`<a class="xref-link" onclick="window.app.loadChapter('${xch.slug}')">第${xch.id}章: ${xch.title}</a>`;
    });
    html+=`</div>`;
  }

  // Page nav
  const chapters=CHAPTERS;
  const idx=isApp?chapters.length+APPENDICES.findIndex(a=>a.slug===ch.slug):chapters.findIndex(c=>c.id===ch.id);
  html+=`<div class="page-nav">`;
  if(!isApp&&idx>0){
    html+=`<button onclick="window.app.loadChapter('${chapters[idx-1].slug}')">← 第${chapters[idx-1].id}章: ${chapters[idx-1].title}</button>`;
  }else if(isApp){
    const aidx=APPENDICES.findIndex(a=>a.slug===ch.slug);
    if(aidx>0)html+=`<button onclick="window.app.loadChapter('${APPENDICES[aidx-1].slug}')">← 附录${APPENDICES[aidx-1].id}</button>`;
    else html+=`<button onclick="window.app.loadChapter('${chapters[21].slug}')">← 第22章</button>`;
  }
  if(!isApp&&idx<chapters.length-1){
    html+=`<button onclick="window.app.loadChapter('${chapters[idx+1].slug}')">第${chapters[idx+1].id}章: ${chapters[idx+1].title} →</button>`;
  }
  html+=`</div>`;

  document.getElementById('contentArea').innerHTML=html;
  document.title=`${chNum}: ${ch.title} - BCI学习枢纽`;

  // Code copy buttons
  document.querySelectorAll('pre code').forEach(block=>{
    const pre=block.parentElement;
    if(pre.querySelector('.copy-btn'))return;
    const btn=document.createElement('button');
    btn.className='copy-btn';
    btn.textContent='📋 复制';
    btn.onclick=function(){
      const text=block.textContent;
      const copyFn=()=>{
        navigator.clipboard.writeText(text).then(()=>{
          btn.textContent='✅ 已复制';btn.classList.add('copied');
          setTimeout(()=>{btn.textContent='📋 复制';btn.classList.remove('copied');},2000);
          showToast('代码已复制到剪贴板');
        }).catch(()=>{
          // Fallback for non-secure contexts
          const ta=document.createElement('textarea');
          ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
          document.body.appendChild(ta);ta.select();
          try{document.execCommand('copy');btn.textContent='✅ 已复制';btn.classList.add('copied');
          setTimeout(()=>{btn.textContent='📋 复制';btn.classList.remove('copied');},2000);
          showToast('代码已复制到剪贴板');}
          catch(e){showToast('复制失败，请手动选择');}
          document.body.removeChild(ta);
        });
      };
      copyFn();
    };
    pre.appendChild(btn);
  });

  window.scrollTo({top:0,behavior:'smooth'});
}

// === TOC ===
function buildTOC(html){
  const tmp=document.createElement('div');tmp.innerHTML=html;
  const headings=tmp.querySelectorAll('h2,h3');
  const tocSidebar=document.getElementById('tocSidebar');
  const tocLinks=document.getElementById('tocLinks');
  const main=document.querySelector('.main');
  if(headings.length<3){tocSidebar.style.display='none';main.classList.remove('has-toc');return;}
  tocSidebar.style.display='block';main.classList.add('has-toc');
  let tocHTML='<div class="toc-title">📑 本节目录</div>';
  headings.forEach((h, i)=>{
    h.id='sec-'+i;
    const cls=h.tagName==='H3'?'toc-h3':'';
    tocHTML+=`<a class="${cls}" href="#sec-${i}">${h.textContent}</a>`;
  });
  tocLinks.innerHTML=tocHTML;
  // Fix heading ids in actual content
  document.querySelectorAll('.content h2,.content h3').forEach((h,i)=>{h.id='sec-'+i;});
  // Scroll spy
  const tocAs=tocSidebar.querySelectorAll('a');
  window.addEventListener('scroll',()=>{
    let current='';
    document.querySelectorAll('.content h2,.content h3').forEach(h=>{
      if(h.getBoundingClientRect().top<100)current=h.id;
    });
    tocAs.forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+current);});
  });
}

// === Toast ===
function showToast(msg){
  let toast=document.querySelector('.copy-toast');
  if(!toast){
    toast=document.createElement('div');toast.className='copy-toast';
    document.body.appendChild(toast);
  }
  toast.textContent=msg;toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2000);
}

// === Search ===
function handleSearch(val){
  clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>_doSearch(val),200);
}
function _doSearch(val){
  const searchResults=document.getElementById('searchResults');
  if(!val.trim()){searchResults.classList.remove('show');return;}
  const q=val.toLowerCase();
  const results=[];
  allChapters.forEach(ch=>{
    const searchText=(ch.title+' '+ch.summary+' '+ch.content).toLowerCase();
    const idx=searchText.indexOf(q);
    if(idx>=0){
      let excerpt=searchText.substring(Math.max(0,idx-30),Math.min(searchText.length,idx+q.length+80));
      if(idx>30)excerpt='...'+excerpt;
      if(idx+q.length+80<searchText.length)excerpt+='...';
      results.push({ch,excerpt});
    }
  });
  if(results.length===0){
    searchResults.innerHTML='<div class="search-result-empty">未找到匹配内容</div>';
  }else{
    searchResults.innerHTML=results.slice(0,10).map(r=>`
      <div class="search-result-item" onclick="window.app.loadChapter('${r.ch.slug}');document.getElementById('searchResults').classList.remove('show');document.getElementById('searchInput').value='';">
        <div class="sr-title">${r.ch.title}</div>
        <div class="sr-chapter">${typeof r.ch.id==='number'?'第'+r.ch.id+'章':''} ${r.ch.tags.map(t=>'#'+t).join(' ')}</div>
        <div class="sr-excerpt">${r.excerpt}</div>
      </div>
    `).join('');
  }
  searchResults.classList.add('show');
}

// === Keyboard Shortcuts ===
function setupEventListeners(){
  // Search
  document.getElementById('searchInput').addEventListener('input',function(){handleSearch(this.value);});
  document.getElementById('searchInput').addEventListener('keydown',function(e){
    if(e.key==='Escape'){this.value='';handleSearch('');this.blur();}
  });
  // Close search on click outside
  document.addEventListener('click',function(e){
    const sr=document.getElementById('searchResults');
    const si=document.getElementById('searchInput');
    if(!sr.contains(e.target)&&e.target!==si){sr.classList.remove('show');}
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown',function(e){
    // / to focus search
    if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      e.preventDefault();document.getElementById('searchInput').focus();
    }
    // Escape to close overlay
    if(e.key==='Escape'){
      document.getElementById('shortcutsOverlay').classList.remove('show');
      document.getElementById('searchResults').classList.remove('show');
    }
    // ? for shortcuts
    if(e.key==='?'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      e.preventDefault();
      document.getElementById('shortcutsOverlay').classList.toggle('show');
    }
    // Arrow keys for chapter navigation
    if(currentChapter&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      const chapters=CHAPTERS;
      const idx=chapters.findIndex(c=>c.id===currentChapter.id);
      if(idx>=0){
        if(e.key==='ArrowRight'&&idx<chapters.length-1){loadChapter(chapters[idx+1].slug);}
        if(e.key==='ArrowLeft'&&idx>0){loadChapter(chapters[idx-1].slug);}
      }
    }
    // Ctrl+Shift+F for focus mode
    if(e.ctrlKey&&e.shiftKey&&e.key==='F'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      e.preventDefault();toggleFocus();
    }
  });

  // Scroll: back to top
  window.addEventListener('scroll',function(){
    const btn=document.getElementById('backTop');
    if(window.scrollY>400)btn.classList.add('show');else btn.classList.remove('show');
  });
}

// === Expose API ===
window.app={
  init,navHome,navOverview,navHardware,navProjects,navGlossary,
  loadChapter,toggleProgress,toggleBookmark,toggleTheme,toggleFocus,toggleSidebar,
  _toggleNavGroup:toggleNavGroup,_sortChapters,
  renderHome,renderChapterContent
};

// Boot
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
