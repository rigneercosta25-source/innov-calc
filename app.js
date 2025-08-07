
let id = 0;
const comodos = document.getElementById('comodos');
const totalArea = document.getElementById('total-area');
const totalLinear = document.getElementById('total-linear');

function createComodo(nome = '', largura = '', comprimento = '') {
  const div = document.createElement('div');
  div.className = 'comodo';
  div.innerHTML = \`
    <input type="text" placeholder="Nome do cômodo" value="\${nome}" class="nome"><br>
    Largura (m): <input type="number" class="largura" value="\${largura}" step="0.01"><br>
    Comprimento (m): <input type="number" class="comprimento" value="\${comprimento}" step="0.01"><br>
    Área: <span class="area">0</span> m² | Linear: <span class="linear">0</span> m<br>
    <button class="remover">Remover</button>
  \`;

  comodos.appendChild(div);

  const larguraInput = div.querySelector('.largura');
  const comprimentoInput = div.querySelector('.comprimento');
  const areaSpan = div.querySelector('.area');
  const linearSpan = div.querySelector('.linear');
  const removerBtn = div.querySelector('.remover');

  function calcular() {
    const l = parseFloat(larguraInput.value) || 0;
    const c = parseFloat(comprimentoInput.value) || 0;
    const area = l * c;
    const perimetro = 2 * (l + c);
    areaSpan.textContent = area.toFixed(2);
    linearSpan.textContent = perimetro.toFixed(2);
    atualizarTotais();
  }

  larguraInput.oninput = comprimentoInput.oninput = calcular;
  removerBtn.onclick = () => {
    comodos.removeChild(div);
    atualizarTotais();
  };

  calcular();
}

function atualizarTotais() {
  let totalA = 0, totalL = 0;
  document.querySelectorAll('.comodo').forEach(div => {
    totalA += parseFloat(div.querySelector('.area').textContent) || 0;
    totalL += parseFloat(div.querySelector('.linear').textContent) || 0;
  });
  totalArea.textContent = totalA.toFixed(2);
  totalLinear.textContent = totalL.toFixed(2);
}

document.getElementById('add-comodo').onclick = () => createComodo();
createComodo('Sala');
