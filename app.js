import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ========================
// MYTHOLOGY DATA
// ========================
const mythData = [
  {
    id: 'greek',
    region: '古希腊',
    title: '奥林匹斯众神',
    icon: '⚡',
    lat: 38.0, lon: 22.0,
    summary: '宙斯统治奥林匹斯山，十二主神各司其职，开创西方神话之源。',
    story: '在古希腊神话中，世界从混沌（Chaos）中诞生。天神乌拉诺斯与大地女神盖亚结合，生出了泰坦巨神族。宙斯率领奥林匹斯众神推翻了父亲克洛诺斯的统治，在泰坦之战后成为众神之王。他端坐在奥林匹斯山巅，手持雷霆之杖，与十二主神共同守护着人间万物。雅典娜司智慧，阿波罗驭日车，波塞冬掌海洋，每位神祇都有其独特的领域与传奇。'
  },
  {
    id: 'chinese',
    region: '中国',
    title: '盘古开天辟地',
    icon: '🐉',
    lat: 35.0, lon: 105.0,
    summary: '盘古劈开混沌，女娲造人补天，中华文明的宇宙起源传说。',
    story: '远古之初，天地未分，宇宙混沌如一只巨卵。盘古孕育其中，历经一万八千年，终于挥起巨斧劈开混沌。清者上升为天，浊者下沉为地。盘古立于天地之间，每日长高一丈，如此又过一万八千年。盘古倒下后，他的气息化为风云，声音化为雷霆，左眼化为太阳，右眼化为月亮，身躯化为山川大地，血液化为江河湖海。而后女娲用黄土造人，又炼五彩石补天，开创了华夏文明的篇章。'
  },
  {
    id: 'norse',
    region: '北欧',
    title: '诸神的黄昏',
    icon: '🔨',
    lat: 62.0, lon: 15.0,
    summary: '奥丁、托尔与洛基的传说，以及诸神末日之战——Ragnarök。',
    story: '在北欧神话中，世界树尤克特拉希尔（Yggdrasil）连接着九大世界。众神之父奥丁为获得智慧，将自己倒挂在世界树上九天九夜，献出一只眼睛换取符文的知识。他的儿子托尔手持神锤妙尔尼尔（Mjölnir），是雷霆与勇气的化身，守护着阿斯加德和人类。然而命运不可逆转——诸神的黄昏终将到来，巨狼芬里尔吞噬奥丁，世界蛇耶梦加得与托尔同归于尽。但在毁灭之后，新的世界将从海中升起，生命再次开始。'
  },
  {
    id: 'egyptian',
    region: '古埃及',
    title: '太阳神拉与冥界',
    icon: '☀️',
    lat: 26.0, lon: 30.0,
    summary: '太阳神拉每日驾船穿越天空，奥西里斯统治冥界审判亡灵。',
    story: '古埃及人相信太阳神拉（Ra）每日驾驶太阳船穿越天空，从东方升起，到西方落入冥界。夜晚，拉在冥界与混沌巨蛇阿波菲斯（Apophis）激战，每晚胜出后重新升起。奥西里斯原是人间的伟大法老，被弟弟赛特谋杀后成为冥界之主，在来世审判亡灵的灵魂。他的妻子伊西斯凭借强大的魔法将他复活，他们的儿子荷鲁斯最终击败赛特，夺回王位。死者在冥界需经历「心脏称量」——用羽毛衡量一生的善恶。'
  },
  {
    id: 'japanese',
    region: '日本',
    title: '天照大神',
    icon: '🌸',
    lat: 36.0, lon: 138.0,
    summary: '太阳女神天照隐入天岩户，众神设法引她重返人间。',
    story: '日本神话记载，伊邪那岐和伊邪那美两位创世神搅动混沌之海，滴落的盐水凝结成日本列岛。伊邪那岐从黄泉归来后，洗涤身上的污秽时，左眼诞生了太阳女神天照大神（Amaterasu），右眼诞生了月读命，鼻中诞生了须佐之男。须佐之男在高天原肆意妄为，天照大神愤怒地躲入天岩户中，世界陷入永夜。众神在洞口举行盛大的歌舞祭典，天宇受卖命的舞蹈引起欢笑，好奇心驱使天照推开岩户，光明重新照耀大地。'
  },
  {
    id: 'indian',
    region: '印度',
    title: '梵天创世',
    icon: '🪷',
    lat: 22.0, lon: 78.0,
    summary: '梵天、毗湿奴、湿婆三相神，以及史诗《摩诃婆罗多》的宏大叙事。',
    story: '印度神话中，宇宙由三位至高神明维系：梵天（Brahma）负责创造，毗湿奴（Vishnu）负责维护，湿婆（Shiva）负责毁灭与重生。梵天从宇宙金卵中诞生，用意念创造了世间万物。毗湿奴沉睡在无尽之蛇舍沙上，每当世界陷入危机，他便以不同化身降临人间——如罗摩和克里希纳。湿婆跳起宇宙之舞（Tandava），在创造与毁灭之间维持着永恒的平衡。史诗《摩诃婆罗多》讲述了般度族与俱卢族的王位之争，其中的《薄伽梵歌》是印度哲学的巅峰之作。'
  },
  {
    id: 'mayan',
    region: '玛雅',
    title: '羽蛇神与玉米人',
    icon: '🌽',
    lat: 17.0, lon: -90.0,
    summary: '羽蛇神库库尔坎与玛雅创世神话《波波尔·乌》。',
    story: '在玛雅神话圣典《波波尔·乌》（Popol Vuh）中，创世神特佩乌和古库马茨多次尝试造人。他们先用泥土造人，泥人无法站立；再用木头造人，木人没有灵魂。最终，他们用白色和黄色的玉米制成了真正的人类。羽蛇神库库尔坎（Kukulcán）是风与学问之神，他带来了历法、文字和农业知识。每年春分和秋分，奇琴伊察金字塔上会出现蛇影奇观——阳光在阶梯上投射出巨蛇蜿蜒而下的影子，象征羽蛇神的降临。'
  },
  {
    id: 'african',
    region: '非洲',
    title: '安纳西蜘蛛',
    icon: '🕸️',
    lat: 6.0, lon: -2.0,
    summary: '西非阿坎族的蜘蛛神安纳西，世界上所有故事的守护者。',
    story: '在西非阿坎族的神话中，安纳西（Anansi）是一只聪明绝顶的蜘蛛，也是智慧与故事之神。远古时代，所有的故事都被天神尼亚梅（Nyame）锁在一只金盒子里。安纳西想要获得这些故事，尼亚梅提出了看似不可能的条件——捕获巨蟒、活捉豹子、抓住黄蜂群。安纳西凭借机智逐一完成任务，获得了世间所有的故事，从此成为知识与叙事的象征。安纳西的故事随着奴隶贸易传播到加勒比和美洲，演变为「安纳西故事」传统，至今仍是世界口述文学的重要组成部分。'
  }
];

// ========================
// THREE.JS GLOBE
// ========================
const canvas = document.getElementById('globe-canvas');
const container = canvas.parentElement;
let width = container.clientWidth;
let height = container.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 3.2;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 2.2;
controls.maxDistance = 5;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(5, 3, 5);
scene.add(dirLight);

// Globe sphere
const getGlobeColor = () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const isDark = theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme:dark)').matches);
  return isDark ? 0x1a1b30 : 0xc5c2b8;
};

const getWireColor = () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const isDark = theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme:dark)').matches);
  return isDark ? 0x2a3055 : 0x9a9590;
};

const getAccentColor = () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const isDark = theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme:dark)').matches);
  return isDark ? 0xd4a54a : 0xa67c2e;
};

const globeMaterial = new THREE.MeshPhongMaterial({
  color: getGlobeColor(),
  transparent: true,
  opacity: 0.9,
  shininess: 15,
});
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  globeMaterial
);
scene.add(globe);

// Wireframe overlay
const wireMaterial = new THREE.MeshBasicMaterial({
  color: getWireColor(),
  wireframe: true,
  transparent: true,
  opacity: 0.15,
});
const wireframe = new THREE.Mesh(
  new THREE.SphereGeometry(1.002, 32, 32),
  wireMaterial
);
scene.add(wireframe);

// Atmosphere glow
const atmosphereMat = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec3 vNormal;
    void main(){
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main(){
      float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(0.83, 0.65, 0.29, 1.0) * intensity * 0.6;
    }
  `,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  transparent: true,
});
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.15, 64, 64),
  atmosphereMat
);
scene.add(atmosphere);

// ========================
// MARKERS
// ========================
function latLonToVec3(lat, lon, r = 1.02) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const markerGroup = new THREE.Group();
scene.add(markerGroup);

const markers = [];
const markerMaterial = new THREE.MeshBasicMaterial({ color: getAccentColor() });

mythData.forEach((myth, idx) => {
  const pos = latLonToVec3(myth.lat, myth.lon);

  // Marker dot
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.025, 16, 16),
    markerMaterial.clone()
  );
  dot.position.copy(pos);
  dot.userData = { mythIndex: idx };
  markerGroup.add(dot);

  // Ring around marker
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.035, 0.05, 32),
    new THREE.MeshBasicMaterial({
      color: getAccentColor(),
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    })
  );
  ring.position.copy(pos);
  ring.lookAt(new THREE.Vector3(0, 0, 0));
  markerGroup.add(ring);

  // Pulse ring
  const pulse = new THREE.Mesh(
    new THREE.RingGeometry(0.04, 0.055, 32),
    new THREE.MeshBasicMaterial({
      color: getAccentColor(),
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    })
  );
  pulse.position.copy(pos);
  pulse.lookAt(new THREE.Vector3(0, 0, 0));
  pulse.userData.pulsePhase = idx * 0.8;
  markerGroup.add(pulse);

  markers.push({ dot, ring, pulse, myth });
});

// ========================
// RAYCASTING (Click markers)
// ========================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const dots = markers.map(m => m.dot);
  const intersects = raycaster.intersectObjects(dots);

  if (intersects.length > 0) {
    const idx = intersects[0].object.userData.mythIndex;
    openModal(mythData[idx]);
  }
});

// ========================
// SIDE PANEL
// ========================
const mythPanel = document.getElementById('myth-panel');

mythData.slice(0, 4).forEach((myth, i) => {
  const card = document.createElement('div');
  card.className = 'myth-card';
  card.innerHTML = `
    <div class="myth-card-header">
      <div class="myth-icon">${myth.icon}</div>
      <div>
        <div class="myth-card-title">${myth.title}</div>
        <div class="myth-card-region">${myth.region}</div>
      </div>
    </div>
    <div class="myth-card-desc">${myth.summary}</div>
  `;
  card.addEventListener('click', () => {
    openModal(myth);
    // Rotate globe to this location
    const target = latLonToVec3(myth.lat, myth.lon, 3.2);
    animateCamera(target);
  });
  card.addEventListener('mouseenter', () => {
    const target = latLonToVec3(myth.lat, myth.lon, 3.2);
    animateCamera(target);
  });
  mythPanel.appendChild(card);
});

function animateCamera(target) {
  const start = camera.position.clone();
  const startTime = performance.now();
  const duration = 1000;

  function animate(time) {
    const t = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    camera.position.lerpVectors(start, target, eased);
    camera.lookAt(0, 0, 0);
    if (t < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// ========================
// MODAL
// ========================
let currentSpeech = null;
let speechInterval = null;

window.openModal = function(myth) {
  document.getElementById('modal-region').textContent = myth.region;
  document.getElementById('modal-title').textContent = myth.title;
  document.getElementById('modal-body').textContent = myth.story;
  document.getElementById('audio-story-title').textContent = myth.title;
  document.getElementById('audio-progress-bar').style.width = '0%';

  // Reset audio state
  if (currentSpeech) {
    speechSynthesis.cancel();
    currentSpeech = null;
    clearInterval(speechInterval);
  }
  updateAudioIcon(false);

  const modal = document.getElementById('story-modal');
  modal.classList.add('open');
  controls.autoRotate = false;

  // Re-create lucide icons in the modal
  if (window.lucide) lucide.createIcons();
};

window.closeModal = function() {
  const modal = document.getElementById('story-modal');
  modal.classList.remove('open');
  controls.autoRotate = true;

  if (currentSpeech) {
    speechSynthesis.cancel();
    currentSpeech = null;
    clearInterval(speechInterval);
  }
};

// Close on overlay click
document.getElementById('story-modal').addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});

// ========================
// TEXT-TO-SPEECH
// ========================
function updateAudioIcon(isPlaying) {
  const btn = document.getElementById('audio-btn');
  if (isPlaying) {
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  } else {
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  }
}

window.toggleAudio = function() {
  if (currentSpeech && speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      updateAudioIcon(true);
    } else {
      speechSynthesis.pause();
      updateAudioIcon(false);
    }
    return;
  }

  const text = document.getElementById('modal-body').textContent;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.9;
  utterance.pitch = 1;

  // Try to find a Chinese voice
  const voices = speechSynthesis.getVoices();
  const zhVoice = voices.find(v => v.lang.startsWith('zh'));
  if (zhVoice) utterance.voice = zhVoice;

  currentSpeech = utterance;
  updateAudioIcon(true);

  // Simulate progress
  const estimatedDuration = text.length * 200; // rough estimate
  const startTime = Date.now();
  speechInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / estimatedDuration) * 100, 95);
    document.getElementById('audio-progress-bar').style.width = progress + '%';
  }, 200);

  utterance.onend = () => {
    updateAudioIcon(false);
    document.getElementById('audio-progress-bar').style.width = '100%';
    clearInterval(speechInterval);
    currentSpeech = null;
  };

  utterance.onerror = () => {
    updateAudioIcon(false);
    clearInterval(speechInterval);
    currentSpeech = null;
  };

  speechSynthesis.speak(utterance);
};

// ========================
// THEME OBSERVER
// ========================
function updateThemeColors() {
  globeMaterial.color.setHex(getGlobeColor());
  wireMaterial.color.setHex(getWireColor());
  markers.forEach(m => {
    m.dot.material.color.setHex(getAccentColor());
    m.ring.material.color.setHex(getAccentColor());
    m.pulse.material.color.setHex(getAccentColor());
  });
}

const themeObserver = new MutationObserver(() => updateThemeColors());
themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

// ========================
// ANIMATION LOOP
// ========================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  controls.update();

  // Pulse markers
  markers.forEach(m => {
    const phase = m.pulse.userData.pulsePhase;
    const scale = 1 + 0.3 * Math.sin(time * 2 + phase);
    m.pulse.scale.setScalar(scale);
    m.pulse.material.opacity = 0.3 * (1 - (scale - 1) / 0.3);
  });

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  width = container.clientWidth;
  height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// ========================
// SIGNUP HANDLER
// ========================
window.handleSignup = function(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const email = input.value;
  if (email) {
    const btn = e.target.querySelector('button');
    btn.textContent = '注册成功 ✓';
    btn.style.background = '#437a22';
    input.value = '';
    setTimeout(() => {
      btn.textContent = '免费注册';
      btn.style.background = '';
    }, 3000);
  }
};
