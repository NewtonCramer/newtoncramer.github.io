function mostra(itens) {
  itens.forEach((element) => {
    console.log(element);
  });
  return;
}

function transposta(matrizInicial) {
  let nColunas = matrizInicial[0].length;
  let nLinhas = matrizInicial.length;
  matrizTransposta = [];
  let j = 0;
  while (j < nColunas) {
    let i = 0;
    let coluna = [];
    while (i < nLinhas) {
      coluna.push(matrizInicial[i][j]);
      i++;
    }
    matrizTransposta.push(coluna);
    j++;
  }
  return matrizTransposta;
}

function selecionaColuna(matriz, j) {
  let coluna = [];
  let i = 0;
  while (i < matriz.length) {
    coluna.push(matriz[i][j]);
    i++;
  }
  return coluna;
}

function nivel(vetor) {
  let n = 0;
  let iterador = vetor;
  while (typeof iterador == "object") {
    n++;
    iterador = iterador[0];
  }
  return n;
}

function copia(vetor) {
  let vetorCopia = [];
  if (nivel(vetor) == 1) {
    vetor.forEach((element) => {
      vetorCopia.push(element);
    });
  } else if (nivel(vetor) == 2) {
    let i = 0;
    while (i < vetor.length) {
      let j = 0;
      let linha = [];
      while (j < vetor[i].length) {
        linha.push(vetor[i][j]);
        j++;
      }
      vetorCopia.push(linha);
      i++;
    }
  }
  return vetorCopia;
}

function trocaLinhas(matriz, regra) {
  let novaMatriz = [];
  regra.forEach((element) => {
    let linha = copia(matriz[element]);
    novaMatriz.push(linha);
  });
  return novaMatriz;
}

function remove(lista, elemento) {
  let indice = lista.indexOf(elemento);
  lista.splice(indice, 1);
}

function count(lista, elemento) {
  let n = 0;
  lista.forEach((element) => {
    if (element == elemento) {
      n++;
    }
  });
  return n;
}

function indexOrdenation(lista, asc) {
  let listaCopy = copia(lista);
  let regra = [];
  while (listaCopy.length != 0) {
    let maxx = Math.max.apply(null, listaCopy);

    let i = 0;
    while (i < lista.length) {
      if (lista[i] == maxx) {
        regra.push(i);
      }
      i++;
    }

    while (count(listaCopy, maxx) != 0) {
      remove(listaCopy, maxx);
    }
  }

  if (asc) {
    regra.reverse();
  }

  return regra;
}

function negativarColuna(matriz, j) {
  let matrizCopy = copia(matriz);
  let i = 0;
  while (i < matrizCopy.length) {
    matrizCopy[i][j] = -matrizCopy[i][j];
    i++;
  }
  return matrizCopy;
}

function criaTabela(equipes) {
  let atributos = ["pts", "j", "gp", "gc", "sg", "v", "d", "e"]; //gc: gols sofridos. gp: gols marcados
  let tabela = [];
  let linha = ["Equipes"];
  equipes.forEach((element) => {
    linha.push(element);
  });
  tabela.push(linha);

  atributos.forEach((element) => {
    let linha = [element];
    for (let i = 0; i < equipes.length; i++) {
      linha.push(0);
    }
    tabela.push(linha);
  });

  return transposta(tabela);
}

function indiceEquipe(tabela, equipe) {
  let i = 0;
  let ind = 0;
  while (i < tabela.length) {
    if (tabela[i][0] == equipe) {
      ind = i;
    }
    i++;
  }
  return ind;
}

function alterar(tabela, equipe, atributo, novoValor) {
  let indEquipe = indiceEquipe(tabela, equipe);
  let indAtributo = tabela[0].indexOf(atributo);
  tabela[indEquipe][indAtributo] = novoValor;
}

function somar(tabela, equipe, atributos, valores) {
  let i = 0;
  while (i < atributos.length) {
    let atributo = atributos[i];
    let valor = valores[i];
    let indEquipe = indiceEquipe(tabela, equipe);
    let indAtributo = tabela[0].indexOf(atributo);
    tabela[indEquipe][indAtributo] += valor;
    i++;
  }
}

function processa(jogo, tabela) {
  let mandante = jogo[0];
  let golsMandante = jogo[1];
  let golsVisitante = jogo[2];
  let visitante = jogo[3];

  somar(
    tabela,
    mandante,
    ["j", "gp", "gc", "sg"],
    [1, golsMandante, golsVisitante, golsMandante - golsVisitante]
  );

  somar(
    tabela,
    visitante,
    ["j", "gp", "gc", "sg"],
    [1, golsVisitante, golsMandante, golsVisitante - golsMandante]
  );

  if (golsMandante > golsVisitante) {
    somar(tabela, mandante, ["pts", "v"], [3, 1]);
    somar(tabela, visitante, ["d"], [1]);
  } else if (golsVisitante > golsMandante) {
    somar(tabela, visitante, ["pts", "v"], [3, 1]);
    somar(tabela, mandante, ["d"], [1]);
  } else {
    somar(tabela, mandante, ["pts", "e"], [1, 1]);
    somar(tabela, visitante, ["pts", "e"], [1, 1]);
  }
}

function processaMandante(jogo, tabela) {
  let mandante = jogo[0];
  let golsMandante = jogo[1];
  let golsVisitante = jogo[2];

  somar(
    tabela,
    mandante,
    ["j", "gp", "gc", "sg"],
    [1, golsMandante, golsVisitante, golsMandante - golsVisitante]
  );

  if (golsMandante > golsVisitante) {
    somar(tabela, mandante, ["pts", "v"], [3, 1]);
  } else if (golsVisitante > golsMandante) {
    somar(tabela, mandante, ["d"], [1]);
  } else {
    somar(tabela, mandante, ["pts", "e"], [1, 1]);
  }
}

function processaVisitante(jogo, tabela) {
  let golsMandante = jogo[1];
  let golsVisitante = jogo[2];
  let visitante = jogo[3];

  somar(
    tabela,
    visitante,
    ["j", "gp", "gc", "sg"],
    [1, golsVisitante, golsMandante, golsVisitante - golsMandante]
  );

  if (golsMandante > golsVisitante) {
    somar(tabela, visitante, ["d"], [1]);
  } else if (golsVisitante > golsMandante) {
    somar(tabela, visitante, ["pts", "v"], [3, 1]);
  } else {
    somar(tabela, visitante, ["pts", "e"], [1, 1]);
  }
}

function subRodadas(envolvidos, rodadas) {
  let listaJogos = [];
  let i = 0;
  while (i < rodadas.length) {
    let rodada = rodadas[i];
    rodada.forEach((jogo) => {
      if (envolvidos.includes(jogo[0]) && envolvidos.includes(jogo[3])) {
        listaJogos.push([jogo, i]);
      }
    });
    i++;
  }
  return listaJogos;
}

function cabecalho(tabela) {
  let cab = copia(tabela[0]);
  return cab;
}

function selecionaColunasTabela(tabela, atributos) {
  let tabelaCopy = copia(tabela);
  let novaTabela = [];
  atributos.forEach((atributo) => {
    let indiceColuna = tabelaCopy[0].indexOf(atributo);
    let coluna = [];
    let i = 0;
    while (i < tabelaCopy.length) {
      coluna.push(tabelaCopy[i][indiceColuna]);
      i++;
    }
    novaTabela.push(coluna);
  });
  return transposta(novaTabela);
}

function negativarColunaTabela(tabela, atributo) {
  let tabelaCopy = copia(tabela);
  let j = tabela[0].indexOf(atributo);
  let i = 1;
  while (i < tabelaCopy.length) {
    tabelaCopy[i][j] = -tabelaCopy[i][j];
    i++;
  }
  return tabelaCopy;
}

function processaAtributosBooleanos(table, listaAtributos, asc) {
  let newTable = copia(table);
  let i = 0;
  while (i < asc.length) {
    if (asc[i]) {
      let atributo = listaAtributos[i];
      newTable = negativarColunaTabela(newTable, atributo);
    }
    i++;
  }
  return newTable;
}

function parmSort(a, b) {
  if (a[0] == b[0]) {
    if (a[1] == b[1]) {
      if (a[2] == b[2]) {
        if (a[3] == b[3]) {
          if (a[4] == b[4]) {
            if (a[5] == b[5]) {
              if (a[6] == b[6]) {
                return b[7] - a[7];
              }
              return b[6] - a[6];
            }
            return b[5] - a[5];
          }
          return b[4] - a[4];
        }
        return b[3] - a[3];
      }
      return b[2] - a[2];
    }
    return b[1] - a[1];
  }
  return b[0] - a[0];
}

function igualdadeArrays(a, b) {
  if (a.length != b.length) {
    return false;
  }

  let i = 0;
  while (i < a.length) {
    if (a[i] != b[i]) {
      return false;
    }
    i++;
  }

  return true;
}

function indiceArrayAninhado(ArrayExterno, ArrayInterno) {
  let i = 0;
  let ind;
  while (i < ArrayExterno.length) {
    if (igualdadeArrays(ArrayExterno[i], ArrayInterno)) {
      ind = i;
      break;
    }
    i++;
  }
  return ind;
}

function orderBy(tabela, lista_atributos, asc) {
  let tabela_0 = copia(tabela);

  let lista_0 = ["Equipes"];
  lista_atributos.forEach((atributo) => {
    lista_0.push(atributo);
  });

  let tabela_1 = selecionaColunasTabela(tabela_0, lista_0);

  let tabela_2 = processaAtributosBooleanos(tabela_1, lista_atributos, asc);

  let equipes = selecionaColunasTabela(tabela_2, ["Equipes"]).slice(1);

  let atributos = selecionaColunasTabela(tabela_2, lista_atributos).slice(1);

  let lista_1 = [];
  let i = 0;
  while (i < atributos.length) {
    lista_1.push([equipes[i][0], atributos[i]]);
    i++;
  }

  let tabela_3 = selecionaColunasTabela(tabela_2, lista_atributos).slice(1);
  tabela_3.sort(parmSort);

  let lista_2 = [];
  let lista_1_copy = copia(lista_1);
  tabela_3.forEach((valor) => {
    let tabela_4 = selecionaColuna(lista_1_copy, 1);
    let indice = indiceArrayAninhado(tabela_4, valor);
    lista_2.push(lista_1_copy[indice]);
    remove(lista_1_copy, lista_1_copy[indice]);
  });

  let regra = [];
  lista_2.forEach((i) => {
    let nome = i[0];
    let coluna = selecionaColunasTabela(tabela_0, ["Equipes"]).slice(1);
    let indice = indiceArrayAninhado(coluna, [nome]);
    regra.push(indice);
  });

  let fim_raw = trocaLinhas(tabela_0.slice(1), regra);

  let fim = [];
  fim.push(cabecalho(tabela));

  fim_raw.forEach((linha) => {
    fim.push(linha);
  });

  return fim;
}

//////////////////////////////////////////////////

function equipes_participantes(temporadas_selecionadas) {
  let equipes = [];
  temporadas_selecionadas.forEach((temporada) => {
    array_temporada = dados.get(temporada);
    coluna_equipes_raw = selecionaColuna(array_temporada, 0);
    coluna_equipes = coluna_equipes_raw.slice(1);

    coluna_equipes.forEach((equipe) => {
      equipes.push(equipe);
    });
  });

  equipes.sort();

  let equipes_distintas = [];

  equipes.forEach((equipe) => {
    if (count(equipes_distintas, equipe) == 0) {
      equipes_distintas.push(equipe);
    }
  });

  return equipes_distintas;
}

function sum(array) {
  let acumulador = 0;
  array.forEach((elemento) => {
    acumulador += elemento;
  });
  return acumulador;
}

function array_equipe(equipe, temporadas_selecionadas) {
  let array = [];
  array.push(equipe);
  for (let i = 0; i < 9; i++) {
    array.push(0);
  }

  let indices_equipe_temporada = [];

  temporadas_selecionadas.forEach((temporada) => {
    let array_temporada = dados.get(temporada);
    let coluna_equipes = selecionaColuna(array_temporada, 0);
    let indice = coluna_equipes.indexOf(equipe);
    indices_equipe_temporada.push(indice);
  });

  let array_auxiliar = [];

  let i = 0;
  while (i < indices_equipe_temporada.length) {
    let temporada = temporadas_selecionadas[i];
    let indice = indices_equipe_temporada[i];
    if (indice == -1) {
      i += 1;
      continue;
    }
    array_auxiliar.push(dados.get(temporada)[indice]);
    i += 1;
  }

  i = 1;
  while (i < array_auxiliar[0].length) {
    let soma = sum(selecionaColuna(array_auxiliar, i));
    array[i] = soma;
    i += 1;
  }

  let pontos = array[1];
  let jogos = array[2];
  let aproveitamento = pontos / (jogos * 3);
  aproveitamento = Math.round(aproveitamento * 100);
  array[9] = aproveitamento;

  return array;
}

function tabela_pontuacao(temporadas_selecionadas) {
  let equipes = equipes_participantes(temporadas_selecionadas);

  tabela_nao_classificada = [];
  // AP : aproveitamento
  let cabecalho = ["Equipes", "P", "J", "V", "E", "D", "GP", "GC", "SG", "AP"];
  tabela_nao_classificada.push(cabecalho);

  equipes.forEach((equipe) => {
    let array = array_equipe(equipe, temporadas_selecionadas);
    tabela_nao_classificada.push(array);
  });

  return tabela_nao_classificada;
}

function distinct(array) {
  let arrayCopia = copia(array);
  arrayCopia.forEach((elemento) => {
    while (count(array, elemento) != 1) {
      remove(array, elemento);
    }
  });
}
