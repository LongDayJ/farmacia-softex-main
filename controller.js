import fs from "fs";
import chalk from "chalk";
import promptSync from "prompt-sync";
import { listaRemedios } from "./medicine.js";
const prompt = promptSync();

let remedios = listaRemedios();
let categorias = [...new Set(remedios.map((remedio) => remedio.categoria))];
let continuarComprando = false;

function listarCategorias() {
  for (let index = 0; index < categorias.length; index++) {
    console.log(index + 1 + " - " + categorias[index]);
  }
}

function listarRemediosPorCategoria(categoriaEscolhida) {
  console.log(`\nVocê escolheu a categoria: ${categoriaEscolhida}`);
  console.log(`\nAqui estão os remédios disponíveis dessa categoria:`);
  let remediosCategoria = remedios.filter(
    (remedio) => remedio.categoria === categoriaEscolhida
  );
  for (let remedio of remediosCategoria) {
    console.log(
      `${remedio.id} - ${remedio.nome} - R$${remedio.preco.toFixed(
        2
      )} - Quantidade: ${remedio.quantidade}`
    );
  }
  return remediosCategoria;
}

function venda(carrinho) {
  do {
    console.log("\nCategorias disponiveis: ");
    listarCategorias();
    let escolhaCategoria = Number(
      prompt(chalk.yellow("Digite o número da categoria que você deseja: "))
    );
    let categoriaEscolhida = categorias[escolhaCategoria - 1];
    let remediosCategoria = listarRemediosPorCategoria(categoriaEscolhida);

    let adicionarMaisRemedios = false;
    do {
      console.log("");
      let codigoRemedio = Number(
        prompt(chalk.yellow(`Digite o código do remédio que você deseja: `))
      );
      let remedioSelecionado = remediosCategoria.find(
        (remedio) => remedio.id === codigoRemedio
      );
      if (!remedioSelecionado) {
        console.log(
          chalk.red(
            `Este código não existe ou não pertence à categoria escolhida.`
          )
        );
      } else {
        if (remedioSelecionado.controlado) {
          let temReceita = prompt(
            `Você tem receita para ${remedioSelecionado.nome}? (s/n) `
          );
          if (temReceita.toLowerCase() === "s") {
            carrinho.push(remedioSelecionado);
          } else {
            console.log(
              chalk.red(
                `Você não pode adicionar ${remedioSelecionado.nome} ao carrinho sem receita.`
              )
            );
          }
        } else {
          carrinho.push(remedioSelecionado);
        }
      }
      console.log("");
      let continuar = prompt(
        chalk.yellow(`Deseja adicionar outro remédio desta categoria? (`) +
          chalk.green(`s`) +
          chalk.yellow(`/`) +
          chalk.red(`n`) +
          chalk.yellow(`) `)
      );
      adicionarMaisRemedios = continuar.toLowerCase() === "s";
    } while (adicionarMaisRemedios);

    console.log("");
    let continuarCategoria = prompt(
      chalk.yellow(`Deseja adicionar remédios de outra categoria? (`) +
        chalk.green(`s`) +
        chalk.yellow(`/`) +
        chalk.red(`n`) +
        chalk.yellow(`) `)
    );
    continuarComprando = continuarCategoria.toLowerCase() === "s";
  } while (continuarComprando);
}

function exibirRemedios(lista, acao) {
  console.log(`Aqui estão os remédios que você ${acao}: `);
  for (let remedio of lista) {
    console.log(remedio.nome);
  }
}

function calcularTotal(lista) {
  let total = 0;
  for (let remedio of lista) {
    total += remedio.preco;
  }
  return total.toFixed(2);
}

export {
  venda,
  listarCategorias,
  listarRemediosPorCategoria,
  calcularTotal,
  exibirRemedios,
};
