const input = document.getElementById("scannerInput");
const gradoSelect = document.getElementById("grado");
const limiteHora = new Date();
limiteHora.setHours(6, 30, 0, 0);

input.addEventListener("input", () => {
  const nombreIngresado = normalizar(input.value.trim());
  const gradoSeleccionado = gradoSelect.value;
  const tabla = document.getElementById(gradoSeleccionado);
  const diaSemana = new Date().getDay(); // 0 = domingo, 1 = lunes...

  if (diaSemana === 0 || diaSemana > 5) return; // sábado o domingo no se registra

  for (let fila of tabla.rows) {
    const nombreEnTabla = normalizar(fila.cells[0].textContent);
    if (nombreEnTabla === nombreIngresado) {
      const ahora = new Date();
      const horaTexto = ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      const clase = ahora <= limiteHora ? 'on-time' : 'late';
      fila.cells[diaSemana].innerHTML = `<span class="${clase}">${horaTexto}</span>`;
      input.value = "";
      break;
    }
  }
});

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/\s+/g, " ") // espacios múltiples
    .trim();
}

window.onload = () => input.focus();
