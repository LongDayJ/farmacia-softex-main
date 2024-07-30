import fs from "fs";
import chalk from "chalk";
import promptSync from "prompt-sync";
import funcionarios from "./funcionarios.json" assert { type: "json" };
const prompt = promptSync();

function salvarFuncionarios() {
  // Converte a lista de funcionários para JSON
  let dadosFuncionarios = JSON.stringify(funcionarios, null, 2);
  // Salva os dados no arquivo funcionarios.json
  fs.writeFileSync("funcionarios.json", dadosFuncionarios);
}

function carregarFuncionarios() {
  try {
    // Tenta ler o arquivo JSON
    let dadosFuncionarios = fs.readFileSync("funcionarios.json");
    return JSON.parse(dadosFuncionarios);
  } catch (err) {
    // Se houver um erro ao ler o arquivo (por exemplo, arquivo não existente), retorna uma lista vazia
    console.log(chalk.red("Erro ao carregar funcionários:"), err);
    return [];
  }
}

function criarFuncionario() {
  console.log(chalk.blue("Bem vindo ao sistema de cadastro de funcionario!"));
  console.log("");
  let id = prompt(
    "Digite o cpf do funcionário (sem pontuação, apenas números): "
  );
  let nome = prompt("Digite o nome do funcionário: ");
  let email = prompt("Digite o email do funcionário: ");
  let pin = prompt("Peça para o funcionário inserir uma senha: ");
  let isAdmin = prompt(
    chalk.blue("Esse funcionário será administrador? (") +
      chalk.green("s") +
      chalk.blue("/") +
      chalk.red("n") +
      chalk.blue(")")
  );

  let roleAdmin = false;
  if (isAdmin.toLowerCase() === "s") roleAdmin = true;
  else if (isAdmin.toLowerCase() === "n") {
    roleAdmin = false;
  }

  let novoFuncionario = {
    id: id,
    nome: nome,
    email: email,
    pin: pin,
    administrador: roleAdmin,
  };

  funcionarios.push(novoFuncionario);

  console.log(chalk.green("\nFuncionário cadastrado com sucesso!"));
}

function loginFuncionario() {
  let loginEmail = prompt("Digite o seu e-mail: ");
  let loginPin = prompt("Digite a sua senha: ");
  let funcionarioEncontrado = false;

  for (let i = 0; i < funcionarios.length; i++) {
    if (
      loginEmail === funcionarios[i].email &&
      loginPin === funcionarios[i].pin
    ) {
      funcionarioEncontrado = true;
      return funcionarios[i];
    }
  }
  if (!funcionarioEncontrado) {
    console.log(chalk.red("\nE-mail ou senha incorretos"));
    return [];
  }
}

export {
  criarFuncionario,
  salvarFuncionarios,
  carregarFuncionarios,
  loginFuncionario,
};
