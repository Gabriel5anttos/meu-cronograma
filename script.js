
const calendar = document.getElementById("calendar");
const monthTabs = document.getElementById("monthTabs");
const startDate = new Date();
const endDate = new Date("2025-11-16");

const rotina = {
  domingo: ["08:00–10:00: EBD", "18:00–20:00: Culto", "14:00–15:30: Estudo (Humanas)"],
  segunda: ["07:30–11:30: Trabalho", "15:30–17:00: Academia", "18:30–21:00: Faculdade", "21:15–22:15: Estudo (Natureza)"],
  terca: ["07:30–11:30: Trabalho", "15:30–17:00: Academia", "18:30–21:00: Faculdade", "21:15–22:15: Estudo (Matemática)"],
  quarta: ["07:30–11:30: Trabalho", "15:30–17:00: Academia", "16:30–18:00: Matéria Online", "21:00–22:00: Estudo (Linguagens)"],
  quinta: ["07:30–11:30: Trabalho", "18:30–21:00: Faculdade (JavaPOO)"],
  sexta: ["07:30–11:30: Trabalho", "15:30–17:00: Academia", "20:00–21:00: Estudo (Redação)"],
  sabado: ["14:00–15:30: Estudo (Revisão)", "18:00–20:00: Encontro de Jovens"]
};

function getWeekdayName(date) {
  return ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"][date.getDay()];
}

function getMonthName(month) {
  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro"];
  return meses[month];
}

const allDays = {};

let tempDate = new Date(startDate);
while (tempDate <= endDate) {
  const dayName = getWeekdayName(tempDate);
  const monthYear = `${getMonthName(tempDate.getMonth())} ${tempDate.getFullYear()}`;
  if (!allDays[monthYear]) allDays[monthYear] = [];
  
  allDays[monthYear].push({
    date: new Date(tempDate),
    tasks: rotina[dayName] || []
  });
  
  tempDate.setDate(tempDate.getDate() + 1);
}

Object.keys(allDays).forEach((monthName, idx) => {
  const btn = document.createElement("button");
  btn.textContent = monthName;
  if (idx === 0) btn.classList.add("active");
  btn.onclick = () => {
    document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    showMonth(monthName);
  };
  monthTabs.appendChild(btn);
});

function showMonth(monthName) {
  calendar.innerHTML = "";
  const today = new Date();
  allDays[monthName].forEach(day => {
    const card = document.createElement("div");
    card.className = "day-card";
    
    if (day.date.toDateString() === today.toDateString()) {
      card.classList.add("today");
    }

    card.innerHTML = `<h2>${day.date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}</h2>`;
    
    day.tasks.forEach(task => {
      const div = document.createElement("div");
      div.className = "task";
      div.textContent = task;
      card.appendChild(div);
    });

    card.onclick = () => openChecklist(day);
calendar.appendChild(card);

  });
}
// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const checklistContainer = document.getElementById("checklistContainer");
const closeModal = document.getElementById("closeModal");

closeModal.onclick = () => modal.classList.add("hidden");

function getStorageKey(date) {
  return `checklist_${date.toDateString()}`;
}

function openChecklist(day) {
  const key = getStorageKey(day.date);
  const saved = JSON.parse(localStorage.getItem(key)) || {};
  
  modalTitle.textContent = `Checklist – ${day.date.toLocaleDateString("pt-BR")}`;
  checklistContainer.innerHTML = "";

  // Mostrar apenas tarefas que envolvam estudo
const studyTasks = day.tasks.filter(task => 
  /Estudo|Matéria|Revisão|Redação/i.test(task)
);

studyTasks.forEach((task, idx) => {

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `chk_${idx}`;
    checkbox.checked = saved[task] || false;

    checkbox.onchange = () => {
      saved[task] = checkbox.checked;
      localStorage.setItem(key, JSON.stringify(saved));
    };

    const label = document.createElement("label");
    label.htmlFor = `chk_${idx}`;
    label.textContent = task;

    li.appendChild(checkbox);
    li.appendChild(label);
    checklistContainer.appendChild(li);
  });

  modal.classList.remove("hidden");
}

// Mostrar primeiro mês ao abrir
showMonth(Object.keys(allDays)[0]);

const hoje = new Date();
const diaSemana = hoje.getDay();
document.querySelectorAll('main section')[diaSemana].style.backgroundColor = '#d1e7ff';

