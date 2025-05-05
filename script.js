// Simula os conteúdos por dia
const conteudosPorDia = {
  1: ["Matemática: Funções", "Português: Interpretação", "História: Brasil Colônia"],
  2: ["Biologia: Ecologia", "Geografia: Climas", "Química: Ligações Químicas"],
  3: ["Redação: Estrutura", "Física: Leis de Newton", "Matemática: Equações"],
  4: ["Português: Gramática", "Química: Reações", "Geografia: Cartografia"],
  5: ["História: Ditadura", "Física: Cinemática", "Biologia: Genética"],
  6: ["Matemática: Porcentagem", "Português: Redação", "História: Primeira República"],
  7: ["Física: Energia", "Geografia: População", "Biologia: Corpo Humano"]
};

let diaAtual = null;

function openChecklist(dia) {
  diaAtual = dia;
  const modal = document.getElementById("checklistModal");
  const checklist = document.getElementById("checklist");
  const title = document.getElementById("modalTitle");
  checklist.innerHTML = "";
  title.textContent = `Conteúdos do Dia ${dia}`;

  const conteudos = conteudosPorDia[dia];
  conteudos.forEach((item, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `item-${dia}-${index}`;
    checkbox.onchange = updateProgress;
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = " " + item;
    li.appendChild(checkbox);
    li.appendChild(label);
    checklist.appendChild(li);
  });

  updateProgress();
  modal.style.display = "block";
}

function closeChecklist() {
  document.getElementById("checklistModal").style.display = "none";
}

function updateProgress() {
  const checkboxes = document.querySelectorAll("#checklist input[type=checkbox]");
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(c => c.checked).length;
  const percent = total === 0 ? 0 : (checked / total) * 100;
  document.getElementById("progressFill").style.width = percent + "%";
}
const checklistData = [
  "Matemática: Funções",
  "Português: Interpretação de Texto",
  "História: Era Vargas",
  "Física: Leis de Newton",
  "Química: Ligações Químicas"
];

const calendarDays = document.getElementById('calendarDays');
const monthYear = document.getElementById('monthYear');
const checklistModal = document.getElementById('checklistModal');
const selectedDateEl = document.getElementById('selectedDate');
const checklistItems = document.getElementById('checklistItems');
const closeModal = document.querySelector('.close');

// Gera o calendário do mês atual
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

function renderCalendar() {
  monthYear.textContent = `${today.toLocaleString('default', { month: 'long' })} ${year}`;
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= totalDays; day++) {
    const btn = document.createElement("div");
    btn.className = "day";
    btn.textContent = day;
    btn.addEventListener("click", () => openChecklist(day));
    calendarDays.appendChild(btn);
  }
}

function openChecklist(day) {
  selectedDateEl.textContent = `${day}/${month + 1}/${year}`;
  checklistItems.innerHTML = "";

  checklistData.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" /> ${item}`;
    checklistItems.appendChild(li);
  });

  checklistModal.style.display = "block";
}

closeModal.onclick = () => checklistModal.style.display = "none";
window.onclick = (e) => {
  if (e.target == checklistModal) checklistModal.style.display = "none";
};

renderCalendar();

