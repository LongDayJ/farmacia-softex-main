import promptSync from "prompt-sync";
import chalk from "chalk";
import { littleLogo, logo } from "./visual.js";
import { listaRemedios, salvarRemedios, updateMedicine } from "./medicine.js";
import {
  criarFuncionario,
  salvarFuncionarios,
  carregarFuncionarios,
  loginFuncionario,
} from "./workers.js";
import { venda, exibirRemedios, calcularTotal } from "./controller.js";

const prompt = promptSync();

logo();
// Carregar remédios do arquivo JSON
let remedios = listaRemedios();
let funcionarios = carregarFuncionarios();
let loopPrincipalBool = true;
let carrinho = [];

function loopPrincipal() {
  while (loopPrincipalBool) {
    console.log(chalk.blue(`Bem-vindo à FarmaTech!`));
    console.log(
      `\nOque você deseja fazer?\n1 - Criar Conta\n2 - Login\n3 - Sair`
    );
    let operacao = Number(
      prompt(
        chalk.yellow(
          `Digite o número referente a operação a qual você irá realizar: `
        )
      )
    );
    switch (operacao) {
      case 1:
        criarFuncionario();
        salvarFuncionarios(funcionarios);
        break;
      case 2:
        let funcionario = loginFuncionario();
        if (funcionario) {
          logedOperations(funcionario);
        }
        break;
      default:
        return false;
    }
  }
}

function logedOperations(funcionario) {
  while (true) {
    littleLogo();
    console.log(
      chalk.blue(`\n${funcionario.nome}, estas são as categorias disponíveis:`)
    );
    console.log(
      `\n1 - Vender\n2 - Atualizar Remédio(Apenas para administradores)\n3 - Ir para o Carrinho`
    );
    console.log("");
    let operacao = Number(
      prompt(
        chalk.yellow(
          `Digite o número referente a operação a qual você irá realizar: `
        )
      )
    );
    switch (operacao) {
      case 1:
        venda(carrinho);
        break;
      case 2:
        updateMedicine(funcionario);
        break;
      default:
        loopPrincipalBool = false;
        return false;
    }
  }
}

loopPrincipal();

exibirRemedios(carrinho, "selecionou");

let confirmaCompra = prompt(
  chalk.blue(`Você deseja concluir sua compra? (`) +
    chalk.green("s") +
    chalk.blue("/") +
    chalk.red("n") +
    chalk.blue(`) `)
);
if (confirmaCompra.toLowerCase() === "s") {
  console.log(chalk.green(`Obrigado pela compra!`));
  exibirRemedios(carrinho, "comprou");
  let totalCompra = calcularTotal(carrinho);
  console.log(chalk.bold(`O valor total da sua compra é: R$${totalCompra}`));

  // Atualizar a quantidade dos remédios no estoque
  for (let remedio of carrinho) {
    let remedioEstoque = remedios.find((r) => r.id === remedio.id); // A função find é utilizada para procurar um elemento em um array que satisfaça a condição
    if (remedioEstoque) {
      remedioEstoque.quantidade -= 1; // Reduz a quantidade do remédio em 1 unidade
    }
  }
  salvarRemedios(remedios); // Salva as alterações de remedios no arquivo diretamente no JSON
} else {
  console.log(chalk.red(`Compra cancelada com sucesso!`));
}
