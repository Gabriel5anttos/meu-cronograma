const hoje = new Date();
const diaSemana = hoje.getDay();
document.querySelectorAll('main section')[diaSemana].style.backgroundColor = '#d1e7ff';