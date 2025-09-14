// let temporadas_selecionadas = ["2007", "2008", "2009"];
// let tabela = tabela_pontuacao(temporadas_selecionadas);

// let fim = orderBy(tabela, ["P", "v"], [false, false]);

const arrayCaixas = [];
for (let i = 2003; i <= 2024; i++) {
  let id = `input#temporada${i}`;
  arrayCaixas.push(document.querySelector(id));
}

arrayCaixas.forEach((caixa) => {
  caixa.addEventListener("change", handleCaixa);
});

let temporadasSelecionadas = [];

const btnApagarTudo = document.querySelector("button#btnApagarTudo");
const btnMarcarTudo = document.querySelector("button#btnMarcarTudo");

function handleCaixa() {
  temporadasSelecionadas = [];

  arrayCaixas.forEach((caixa) => {
    if (caixa.checked) {
      temporadasSelecionadas.push(caixa.name);
    }
  });

  distinct(temporadasSelecionadas);
  console.log(temporadasSelecionadas);

  btnApagarTudo.disabled = false;
  btnMarcarTudo.disabled = false;

  mostraClassificacao();
}

function mostraClassificacao() {
  if (temporadasSelecionadas.length == 0) {
    document.querySelector("#tabelaClassificacao").innerHTML = "";
    btnApagarTudo.disabled = true;
    return;
  }

  let tabela = tabela_pontuacao(temporadasSelecionadas);
  let fim = orderBy(
    tabela,
    ["P", "V", "SG", "GP"],
    [false, false, false, false]
  );
  let quantidadeDeTimes = fim.length - 1;

  document.querySelector("#tabelaClassificacao").innerHTML =
    `<tr class="cabecalho"> 
    <th></th> 
    <th>Equipes</th> 
    <th class="cabecalho-cinza">P</th> 
    <th>J</th> 
    <th class="cabecalho-cinza">V</th> 
    <th>E</th> 
    <th class="cabecalho-cinza">D</th> 
    <th>GP</th> 
    <th class="cabecalho-cinza">GC</th> 
    <th>SG</th> 
    <th class="cabecalho-cinza">%</th> 
    </tr> `;

  document.querySelector(".cabecalho").style.backgroundColor = "#0a2239";
  document.querySelector(".cabecalho").style.color = "white";

  for (let i = 1; i <= quantidadeDeTimes; i++) {
    let tr = document.createElement("TR");
    tr.innerHTML = `
    <td>${i}</td> 
    <td id="Equipes-${i}" class="equipes"></td> 
    <td id="P-${i}" class="pontos"></td> 
    <td id="J-${i}" class="jogos"></td> 
    <td id="V-${i}" class="vitorias"></td> 
    <td id="E-${i}" class="empates"></td> 
    <td id="D-${i}"  class="derrotas"></td> 
    <td id="GP-${i}" class="gols-pro"></td> 
    <td id="GC-${i}" class="gols-contra"></td> 
    <td id="SG-${i}" class="saldo"></td> 
    <td id="AP-${i}" class="aproveitamento"></td>`;
    document.querySelector("#tabelaClassificacao > tBody").appendChild(tr);
  }

  for (let i = 1; i <= quantidadeDeTimes; i++) {
    document.querySelector(`#Equipes-${i}`).innerHTML = fim[i][0];
    document.querySelector(`#P-${i}`).innerHTML = fim[i][1];
    document.querySelector(`#J-${i}`).innerHTML = fim[i][2];
    document.querySelector(`#V-${i}`).innerHTML = fim[i][3];
    document.querySelector(`#E-${i}`).innerHTML = fim[i][4];
    document.querySelector(`#D-${i}`).innerHTML = fim[i][5];
    document.querySelector(`#GP-${i}`).innerHTML = fim[i][6];
    document.querySelector(`#GC-${i}`).innerHTML = fim[i][7];
    document.querySelector(`#SG-${i}`).innerHTML = fim[i][8];
    document.querySelector(`#AP-${i}`).innerHTML = fim[i][9];
  }
}
/////

////////////////

btnApagarTudo.addEventListener("click", handleBtnApagarTudo);

function handleBtnApagarTudo() {
  arrayCaixas.forEach((caixa) => {
    caixa.checked = false;
  });

  btnApagarTudo.disabled = true;
  btnMarcarTudo.disabled = false;

  temporadasSelecionadas = [];

  document.querySelector("#tabelaClassificacao").innerHTML = "";
}

btnMarcarTudo.addEventListener("click", handleBtnMarcarTudo);

function handleBtnMarcarTudo() {
  arrayCaixas.forEach((caixa) => {
    caixa.checked = true;
  });

  btnApagarTudo.disabled = false;
  btnMarcarTudo.disabled = true;

  arrayCaixas.forEach((caixa) => {
    temporadasSelecionadas.push(caixa.name);
  });

  distinct(temporadasSelecionadas);

  mostraClassificacao();
}

///////////////// estado inicial
/////tudo marcado
/////botao "apagar tudo" desabilitado
btnMarcarTudo.click();

////////////deixar linha destacada ao clicar em cima dela

const tabelaHTML = document.querySelector("#tabelaClassificacao > tBody");

document.addEventListener("click", (e) => {
  let lista = e.target.id.split("-");
  let indice = lista[lista.length - 1];
  tabelaHTML.children[indice].style.backgroundColor = "#ddd";
  for (let i = 1; i < tabelaHTML.children.length; i++) {
    let elemento = tabelaHTML.children[i];
    if (i == indice) {
      continue;
    }
    elemento.style.backgroundColor = "white";
  }
});

/////////////// menu

const btn = document.querySelector(".dropbtn");

btn.addEventListener("click", () => {
  document.getElementById("myDropdown").classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (!e.target.matches(".dropbtn")) {
    document.getElementById("myDropdown").classList.remove("show");
  }
});

/////////////

document.querySelector("#tabelaClassificacao").style.backgroundColor = "white";
document.querySelector("#caixas").style.backgroundColor = "white";
