const trip = window.TRIP;
const storageKey = 'trip-site:' + trip.id;
let state = {};
try { state = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch {}
let currentDay = trip.days[0]?.id;
const $ = selector => document.querySelector(selector);

function save(key, value) {
  state[key] = value;
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    $('#storage-status').textContent = '记录保存在当前浏览器';
  } catch {
    $('#storage-status').textContent = '当前浏览器无法保存，刷新前请复制记录';
  }
}
function element(tag, text, parent, className) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (className) node.className = className;
  parent.append(node);
  return node;
}
function field(parent, label, key, type, fallback = '') {
  const wrap = element('label', label + ' ', parent);
  const input = element(type === 'textarea' ? 'textarea' : 'input', null, wrap);
  if (type !== 'textarea') input.type = type;
  if (type === 'checkbox') input.checked = state[key] === true;
  else input.value = state[key] ?? fallback;
  input.addEventListener('input', () => save(key, type === 'checkbox' ? input.checked : input.value));
  return input;
}
function link(parent, label, url) {
  if (!url) { element('small', '地图或来源待核实', parent, 'subtle'); return; }
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error();
    const a = element('a', label, parent);
    a.href = parsed.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
  } catch { element('small', '链接待核实', parent, 'subtle'); }
}
function view(name) {
  document.querySelectorAll('.view').forEach(node => node.hidden = node.id !== name);
  document.querySelectorAll('[data-view]').forEach(node => node.classList.toggle('active', node.dataset.view === name));
  if (name === 'review') renderReview();
}
document.querySelectorAll('[data-view]').forEach(node => node.onclick = () => view(node.dataset.view));
document.querySelectorAll('[data-go]').forEach(node => node.onclick = () => view(node.dataset.go));
for (const key of ['title', 'subtitle', 'notice', 'overview', 'weather']) $('#' + key).textContent = trip[key];
document.title = trip.title;
fieldSetup();

function fieldSetup() {
  const input = $('[data-key="weather-note"]');
  input.value = state['weather-note'] ?? '';
  input.addEventListener('input', () => save('weather-note', input.value));
  renderDays(); renderPacking(); renderFood();
  for (const day of trip.days) {
    const option = element('option', day.label, $('#review-day')); option.value = day.id;
  }
  $('#review-day').onchange = renderReview;
  for (const id of ['rating', 'keep', 'change']) {
    $('#' + id).oninput = event => save('review:' + $('#review-day').value + ':' + id, event.target.value);
  }
  view('home');
}
function renderDays() {
  const nav = $('#days'); nav.replaceChildren();
  for (const day of trip.days) {
    const button = element('button', day.label, nav, day.id === currentDay ? 'active' : '');
    button.onclick = () => { currentDay = day.id; renderDays(); };
  }
  const day = trip.days.find(item => item.id === currentDay);
  const content = $('#day-content'); content.replaceChildren();
  if (!day) { element('p', '请先填写行程日期。', content); return; }
  element('h3', day.heading, content);
  for (const event of day.events) {
    const card = element('article', null, content, 'card');
    element('div', event.time, card, 'badge'); element('h3', event.title, card); element('p', event.text, card);
    if (event.route) {
      const r = event.route;
      element('p', r.origin + ' → ' + r.destination + ' · ' + r.mode + ' · ' + r.duration, card);
      link(card, '打开地图路线 ↗', r.map);
      const actual = field(card, '实际用时（分钟）', 'actual:' + event.id, 'number');
      actual.min = 0; actual.max = 1440;
    }
    if (event.task) {
      element('p', event.task, card, 'rule');
      const want = field(card, '想安排', 'want:' + event.id, 'checkbox');
      const done = field(card, '已办妥', 'done:' + event.id, 'checkbox');
      want.onchange = () => { if (!want.checked && done.checked) { done.checked = false; save('done:' + event.id, false); } };
      done.onchange = () => { if (done.checked && !want.checked) { want.checked = true; save('want:' + event.id, true); } };
      field(card, '安排详情', 'detail:' + event.id, 'textarea');
    }
    if (event.alternatives?.length) {
      const label = element('label', '备选方案 ', card);
      const select = element('select', null, label);
      for (const item of event.alternatives) { const option = element('option', item, select); option.value = item; }
      select.value = state['alternative:' + event.id] ?? event.alternatives[0];
      select.onchange = () => save('alternative:' + event.id, select.value);
    }
  }
  const selected = trip.food.filter(item => item.day === day.id && state['food:' + item.id]);
  for (const meal of selected) element('p', (state['food-time:' + meal.id] ?? meal.time) + ' · ' + meal.name, content, 'notice');
  renderComparison(content);
}
function renderComparison(parent) {
  const details = element('details', null, parent, 'card');
  element('summary', '时间可行性计算（手动填写交通）', details);
  element('p', '按同一天计算；地点或路线改变后，请先重新核对交通耗时和开放时间。', details, 'subtle');
  const inputs = {};
  for (const [id, label, type] of [
    ['start-place','出发地点','text'],['start','出发时间','time'],['end-place','下一站地点','text'],
    ['deadline','最迟到达','time'],['out','去程（分钟）','number'],['back','续程（分钟）','number'],
    ['stay','最少游览（分钟）','number'],['buffer','额外缓冲（分钟）','number'],
    ['last-entry','停止入场（可留空）','time'],['close','闭馆时间（可留空）','time']
  ]) {
    inputs[id] = field(details, label, 'compare:' + currentDay + ':' + id, type);
    if (type === 'number') { inputs[id].min = 0; inputs[id].max = 1440; }
  }
  const output = element('p', '', details, 'notice');
  const time = input => { if (!input.value) return NaN; const [h,m] = input.value.split(':').map(Number); return 60*h+m; };
  function calculate() {
    const start=time(inputs.start), deadline=time(inputs.deadline), last=time(inputs['last-entry']), close=time(inputs.close);
    const nums=['out','back','stay','buffer'].map(k => inputs[k].value === '' ? NaN : Number(inputs[k].value));
    if (!inputs['start-place'].value.trim() || !inputs['end-place'].value.trim() || !Number.isFinite(start) || !Number.isFinite(deadline) || deadline <= start || nums.some(n => !Number.isFinite(n) || n < 0 || n > 1440)) {
      output.textContent = '请填写两端地点、同日出发及到达时间、交通、停留与缓冲。'; return;
    }
    const [out,back,stay,buffer] = nums, arrival = start + out, finish = arrival + stay;
    const slack = deadline - finish - back - buffer;
    const openingProblem = (Number.isFinite(last) && arrival >= last) || (Number.isFinite(close) && finish > close);
    const hh = n => String(Math.floor(n / 60) % 24).padStart(2,'0') + ':' + String(n % 60).padStart(2,'0');
    output.textContent = '预计 ' + hh(arrival) + ' 到达；最低停留结束 ' + hh(finish) + '；距下一站截止余量 ' + slack + ' 分钟。' + (openingProblem ? ' 入场或闭馆时间不满足。' : slack < 0 ? ' 时间不足。' : ' 按填写条件可行。');
  }
  for (const [place, duration] of [['start-place','out'], ['end-place','back']]) {
    inputs[place].addEventListener('input', () => {
      inputs[duration].value = '';
      save('compare:' + currentDay + ':' + duration, '');
    });
  }
  Object.values(inputs).forEach(input => input.addEventListener('input', calculate)); calculate();
}
function renderPacking() {
  const root = $('#packing-list'); root.replaceChildren();
  for (const category of [...new Set(trip.packing.map(item => item.category))]) {
    element('h3', category, root);
    for (const item of trip.packing.filter(x => x.category === category)) {
      const input = field(root, item.label, 'pack:' + item.id, 'checkbox');
      input.addEventListener('change', packingProgress);
    }
  }
  packingProgress();
}
function packingProgress() {
  const count = trip.packing.filter(item => state['pack:' + item.id]).length;
  $('#packing-progress').textContent = '已整理 ' + count + ' / ' + trip.packing.length;
}
function renderFood() {
  const root = $('#food-list'); root.replaceChildren();
  for (const meal of trip.food) {
    const card = element('article', null, root, 'card');
    element('h3', meal.name, card); element('p', meal.text, card); link(card, '查看地点 ↗', meal.map);
    field(card, '计划用餐时间', 'food-time:' + meal.id, 'time', meal.time);
    const selected = field(card, '加入当日行程', 'food:' + meal.id, 'checkbox');
    selected.addEventListener('change', renderDays);
    const button = element('button', '查看对应行程 →', card);
    button.onclick = () => { currentDay = meal.day; renderDays(); view('itinerary'); };
  }
}
function renderReview() {
  const day = $('#review-day').value;
  for (const id of ['rating', 'keep', 'change']) $('#' + id).value = state['review:' + day + ':' + id] ?? '';
  const events = trip.days.find(item => item.id === day)?.events ?? [];
  const rows = events.filter(event => state['actual:' + event.id] !== undefined && state['actual:' + event.id] !== '');
  $('#actual-summary').textContent = rows.length ? rows.map(event => event.title + '：实际 ' + state['actual:' + event.id] + ' 分钟').join('；') : '尚未填写实际用时。';
}
