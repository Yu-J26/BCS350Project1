// ========== PARTS DATABASE ==========
const partsDB = {
  cpu: [
    { id: 1, name: 'AMD Ryzen 5 7600', price: 229, socket: 'AM5', tdp: 65 },
    { id: 2, name: 'Intel Core i5-13600K', price: 319, socket: 'LGA1700', tdp: 125 },
    { id: 3, name: 'AMD Ryzen 7 7800X3D', price: 449, socket: 'AM5', tdp: 120 },
    { id: 4, name: 'Intel Core i9-13900K', price: 589, socket: 'LGA1700', tdp: 125 }
  ],
  motherboard: [
    { id: 5, name: 'MSI B650 TOMAHAWK', price: 199, socket: 'AM5', ramType: 'DDR5' },
    { id: 6, name: 'ASUS Z790-P', price: 229, socket: 'LGA1700', ramType: 'DDR5' },
    { id: 7, name: 'Gigabyte B760 DS3H', price: 129, socket: 'LGA1700', ramType: 'DDR4' },
    { id: 8, name: 'ASRock B650M PRO', price: 149, socket: 'AM5', ramType: 'DDR5' }
  ],
  ram: [
    { id: 9, name: 'Corsair Vengeance 16GB DDR4', price: 89, type: 'DDR4', capacity: 16 },
    { id: 10, name: 'G.Skill Trident Z5 32GB DDR5', price: 159, type: 'DDR5', capacity: 32 },
    { id: 11, name: 'Kingston Fury 32GB DDR4', price: 119, type: 'DDR4', capacity: 32 },
    { id: 12, name: 'Corsair Dominator 64GB DDR5', price: 279, type: 'DDR5', capacity: 64 }
  ],
  gpu: [
    { id: 13, name: 'NVIDIA RTX 4060', price: 299, tdp: 115 },
    { id: 14, name: 'AMD RX 7800 XT', price: 499, tdp: 263 },
    { id: 15, name: 'NVIDIA RTX 4070 Ti', price: 799, tdp: 285 },
    { id: 16, name: 'NVIDIA RTX 4090', price: 1599, tdp: 450 }
  ],
  storage: [
    { id: 17, name: 'Samsung 980 1TB NVMe', price: 89 },
    { id: 18, name: 'WD Black 2TB NVMe', price: 149 },
    { id: 19, name: 'Crucial MX500 1TB SATA', price: 79 },
    { id: 20, name: 'Samsung 990 Pro 2TB', price: 199 }
  ],
  psu: [
    { id: 21, name: 'Corsair RM650x 650W', price: 109, wattage: 650 },
    { id: 22, name: 'Seasonic Focus 750W', price: 129, wattage: 750 },
    { id: 23, name: 'EVGA SuperNOVA 850W', price: 159, wattage: 850 },
    { id: 24, name: 'Corsair HX1000 1000W', price: 229, wattage: 1000 }
  ],
  case: [
    { id: 25, name: 'Fractal Design Pop Air', price: 89 },
    { id: 26, name: 'Lian Li O11 Dynamic', price: 179 },
    { id: 27, name: 'Corsair 4000D Airflow', price: 104 },
    { id: 28, name: 'NZXT H7 Flow', price: 129 }
  ],
  cooler: [
    { id: 29, name: 'Cooler Master Hyper 212', price: 49 },
    { id: 30, name: 'Noctua NH-D15', price: 99 },
    { id: 31, name: 'Arctic Liquid Freezer II 240', price: 109 },
    { id: 32, name: 'Corsair iCUE H150i', price: 179 }
  ]
};

// ========== POPULATE SELECT DROPDOWNS ==========
function populateSelect(selectId, parts) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = '<option value="0">-- Select --</option>';
  parts.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} - $${p.price}`;
    select.appendChild(opt);
  });
}

// Initialize all selects
populateSelect('cpu-select', partsDB.cpu);
populateSelect('motherboard-select', partsDB.motherboard);
populateSelect('ram-select', partsDB.ram);
populateSelect('gpu-select', partsDB.gpu);
populateSelect('storage-select', partsDB.storage);
populateSelect('psu-select', partsDB.psu);
populateSelect('case-select', partsDB.case);
populateSelect('cooler-select', partsDB.cooler);

// ========== HELPER: GET SELECTED PART ==========
function getSelectedPart(selectId, dbKey) {
  const select = document.getElementById(selectId);
  if (!select) return null;
  const val = select.value;
  if (val === '0') return null;
  return partsDB[dbKey].find(p => p.id == val);
}

// ========== UPDATE BUILD SUMMARY & COMPATIBILITY ==========
function updateBuild() {
  // Get selected parts
  const cpu = getSelectedPart('cpu-select', 'cpu');
  const mobo = getSelectedPart('motherboard-select', 'motherboard');
  const ram = getSelectedPart('ram-select', 'ram');
  const gpu = getSelectedPart('gpu-select', 'gpu');
  const storage = getSelectedPart('storage-select', 'storage');
  const psu = getSelectedPart('psu-select', 'psu');
  const pcCase = getSelectedPart('case-select', 'case');
  const cooler = getSelectedPart('cooler-select', 'cooler');

  // Update price displays
  document.getElementById('cpu-price').textContent = cpu ? `$${cpu.price}` : '';
  document.getElementById('motherboard-price').textContent = mobo ? `$${mobo.price}` : '';
  document.getElementById('ram-price').textContent = ram ? `$${ram.price}` : '';
  document.getElementById('gpu-price').textContent = gpu ? `$${gpu.price}` : '';
  document.getElementById('storage-price').textContent = storage ? `$${storage.price}` : '';
  document.getElementById('psu-price').textContent = psu ? `$${psu.price}` : '';
  document.getElementById('case-price').textContent = pcCase ? `$${pcCase.price}` : '';
  document.getElementById('cooler-price').textContent = cooler ? `$${cooler.price}` : '';

  // Build summary list
  const summary = document.getElementById('summary-list');
  summary.innerHTML = '';
  let total = 0;

  function addItem(label, part) {
    if (part) {
      const div = document.createElement('div');
      div.className = 'summary-item';
      div.innerHTML = `<span>${label}</span><span>$${part.price}</span>`;
      summary.appendChild(div);
      total += part.price;
    }
  }

  addItem('CPU', cpu);
  addItem('Motherboard', mobo);
  addItem('RAM', ram);
  addItem('Graphics Card', gpu);
  addItem('Storage', storage);
  addItem('Power Supply', psu);
  addItem('Case', pcCase);
  addItem('CPU Cooler', cooler);

  document.getElementById('total-price').textContent = `$${total}`;

  // Compatibility checks
  const issues = [];

  if (cpu && mobo && cpu.socket !== mobo.socket) {
    issues.push(`CPU socket (${cpu.socket}) and motherboard socket (${mobo.socket}) are incompatible.`);
  }
  if (mobo && ram && mobo.ramType !== ram.type) {
    issues.push(`RAM type (${ram.type}) is not compatible with motherboard (${mobo.ramType}).`);
  }
  if (psu) {
    const totalTdp = (cpu?.tdp || 0) + (gpu?.tdp || 0) + 100; // rough estimate for rest
    if (totalTdp > psu.wattage) {
      issues.push(`Estimated power draw (${totalTdp}W) may exceed PSU capacity (${psu.wattage}W). Consider a higher wattage PSU.`);
    }
  }

  const warningDiv = document.getElementById('compatibility-warning');
  if (issues.length > 0) {
    warningDiv.innerHTML = issues.map(i => '⚠️ ' + i).join('<br>');
  } else {
    warningDiv.innerHTML = '✅ All selected parts appear compatible.';
  }
}

// ========== VIEW SWITCHING ==========
const views = ['home', 'builder', 'guides'];

function switchView(view) {
  // Hide all views
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.classList.remove('active');
  });

  // Show selected view
  const activeView = document.getElementById(`view-${view}`);
  if (activeView) activeView.classList.add('active');

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const navLink = document.getElementById(`nav-${view}`);
  if (navLink) navLink.classList.add('active');

  // Footer visibility (only on home)
  const footer = document.getElementById('global-footer');
  if (footer) {
    footer.style.display = view === 'home' ? 'block' : 'none';
  }
}

// ========== INIT ON PAGE LOAD ==========
window.onload = () => {
  switchView('home');
  updateBuild(); // initial builder state (all empty)
};