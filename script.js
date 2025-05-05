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
