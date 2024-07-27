const prompt = require("prompt-sync")();
const funcionarios = require("./funcionarios.json");
const fs = require("fs"); // módulo file sytem

// Função para carregar o arquivo JSON
function listaRemedios() {
  try {
    const data = fs.readFileSync("./db.json", "utf-8"); // a função readFileSync do módulo fs (file system) do Node.js é usada para ler o conteúdo do arquivo db.json. O parâmetro 'utf-8' indica que o conteúdo deve ser lido como uma string de texto.
    return JSON.parse(data); //Converte a string JSON lida do arquivo em um objeto JavaScript.
  } catch (err) {
    console.error("Erro ao carregar o arquivo JSON:", err);
    return [];
  }
}
// Função para salvar os remédios no arquivo JSON
function salvarRemedios() {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(remedios, null, 2), "utf-8"); // utiliza o writeFileSync do módulo fs para escrever a string JSON no arquivo db.json. O JSON.stringfy converte o objeto remedios em uma string JSON
    console.log("");
  } catch (err) {
    console.error("Erro ao salvar o arquivo JSON:", err);
  }
}
console.log(`\n
███████╗ █████╗ ██████╗ ███╗   ███╗ █████╗ ████████╗███████╗██╗  ██╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝
█████╗  ███████║██████╔╝██╔████╔██║███████║   ██║   █████╗   ╚███╔╝ 
██╔══╝  ██╔══██║██╔══██╗██║╚██╔╝██║██╔══██║   ██║   ██╔══╝   ██╔██╗ 
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗██╔╝ ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`);

// Carregar remédios do arquivo JSON
let remedios = listaRemedios();

function criarFuncionario() {
  console.log("Bem vindo ao sistema de cadastro de funcionario!");
  let id = prompt("Digite o cpf do funcionário (sem pontuação, apenas números): ");
  let nome = prompt("Digite o nome do funcionário: ");
  let email = prompt("Digite o email do funcionário: ");
  let pin = prompt("Peça para o funcionário inserir uma senha: ");
  let isAdmin = prompt("Esse funcionário será administrador?(s/n) ");

  let roleAdmin = false; 
  if (isAdmin.toLowerCase() === "s") 
    roleAdmin = true; else {
   (isAdmin.toLowerCase() === "n") 
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

  console.log("Funcionário cadastrado com sucesso!"); 
}

function loginFuncionario() {
  let loginEmail = prompt("Digite o seu e-mail: ");
  let loginPin = prompt("Digite a sua senha: ");
  let funcionarioEncontrado = false;

  for (let i = 0; i < funcionarios.length; i++) {
    if (
      loginEmail === funcionarios[i].email && loginPin === funcionarios[i].pin
    ) {
      funcionarioEncontrado = true;
      break;
    }
  }
  if (!funcionarioEncontrado) {
    console.log("E-mail ou senha incorretos");
  }
}

function salvarFuncionarios() {
  //Converte a lista de funcionários para JSON
  let dadosFuncionarios = JSON.stringify(funcionarios, null, 2);
  // Salva os dados no arquivo funcionarios.json
  fs.writeFileSync("funcionarios.json", dadosFuncionarios);
}

function carregarFuncionarios() {
  try {
    //tenta ler o arquivo JSON
    let dadosFuncionarios = fs.readFileSync("funcionarios.json");
    return JSON.parse(dadosFuncionarios);
  } catch (err) {
    // Se houver um erro ao ler o arquivo (por exemplo, arquivo não existente), retorna uma lista vazia
    console.log("Erro ao carregar funcionários:", err);
    return [];
  }
}
criarFuncionario();
loginFuncionario();
salvarFuncionarios();
carregarFuncionarios();


function updateMedicine() {
  console.log("Lista de remédios disponíveis: ");
  remedios.forEach((remedio, index) => {
    console.log(`${index + 1}. ${remedio.nome}`);
  });

  let buscadorRemedio = Number(prompt(`Qual remédio você deseja alterar?`));

  for (let i = 0; i < remedios.length; i++) {
    if (buscadorRemedio == remedios[i].id) {
      console.log(
        `1 - Nome\n2 - Preço\n3 - Categoria\n4 - Necessidade de Receita\n5 - Quantidade`
      );
      let info = Number(
        prompt(`Qual informação do remédio você deseja alterar? `)
      );
      switch (info) {
        case 1:
          let novoNome = prompt(
            `Qual será o novo nome do remédio ${remedios[i].nome}? `
          );
          remedios[i].nome = novoNome;
          console.log(`O nome do remédio foi atualizado`);
          break;
        case 2:
          let novoPreco = Number(
            prompt(`Qual será o novo preço do remédio ${remedios[i].nome}? `)
          );
          remedios[i].preco = novoPreco;
          console.log(`O preço do remédio foi atualizado`);
          break;
        case 3:
          let novaCategoria = prompt(
            `Qual será a nova categoria do remédio ${remedios[i].nome}? `
          );
          remedios[i].categoria = novaCategoria;
          console.log(`A Categoria do remédio foi atualizada`);
          break;
        case 4:
          let novaNecessidade = prompt(
            `O remédio ${remedios[i].nome} irá precisar de receita?(S/n)`
          );
          if (novaNecessidade.toLowerCase() == "s") {
            remedios[i].controlado = true;
            console.log(`Agora o remédio necessitará de receita`);
          } else if (novaNecessidade.toLowerCase() == "n") {
            remedios[i].controlado = false;
            console.log(`Agora o remédio NÃO necessitará de receita`);
          } else {
            console.log(`ERRO`);
          }
          break;
        case 5:
          let novaQuantidade = Number(
            prompt(
              `Qual será a nova quantidade do remédio ${remedios[i].nome}? `
            )
          );
          remedios[i].quantidade = novaQuantidade;
          console.log(`A quantidade do remédio foi atualizada`);
          break;
        default:
          console.log(`ERRO`);
          break;
      }
      salvarRemedios(remedios);
      break;
    }
  }
}

console.log(`Olá, estas são as categorias disponíveis:`);

let categorias = [...new Set(remedios.map((remedio) => remedio.categoria))];

function listarCategorias() {
  for (let index = 0; index < categorias.length; index++) {
    console.log(index + 1 + " - " + categorias[index]);
  }
}

function listarRemediosPorCategoria(categoriaEscolhida) {
  console.log(`Você escolheu a categoria: ${categoriaEscolhida}`);
  console.log(`Aqui estão os remédios disponíveis dessa categoria:`);
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

let carrinho = [];
let continuarComprando = false;

function venda() {
  do {
    listarCategorias();
    let escolhaCategoria = Number(
      prompt("Digite o número da categoria que você deseja: ")
    );
    let categoriaEscolhida = categorias[escolhaCategoria - 1];
    let remediosCategoria = listarRemediosPorCategoria(categoriaEscolhida);

    let adicionarMaisRemedios = false;
    do {
      let codigoRemedio = Number(
        prompt(`Digite o código do remédio que você deseja: `)
      );
      let remedioSelecionado = remediosCategoria.find(
        (remedio) => remedio.id === codigoRemedio
      );
      if (!remedioSelecionado) {
        console.log(
          `Este código não existe ou não pertence à categoria escolhida.`
        );
      } else {
        if (remedioSelecionado.controlado) {
          let temReceita = prompt(
            `Você tem receita para ${remedioSelecionado.nome}? sim ou nao? `
          );
          if (temReceita.toLowerCase() === "sim") {
            carrinho.push(remedioSelecionado);
          } else {
            console.log(
              `Você não pode adicionar ${remedioSelecionado.nome} ao carrinho sem receita.`
            );
          }
        } else {
          carrinho.push(remedioSelecionado);
        }
      }
      let continuar = prompt(
        `Deseja adicionar outro remédio desta categoria? sim ou nao? `
      );
      adicionarMaisRemedios = continuar.toLowerCase() === "sim";
    } while (adicionarMaisRemedios);

    let continuarCategoria = prompt(
      `Deseja adicionar remédios de outra categoria? sim ou nao? `
    );
    continuarComprando = continuarCategoria.toLowerCase() === "sim";
  } while (continuarComprando);
}

function loopPrincipal() {
  while (true) {
    console.log(`1 - Vender\n2 - Atualizar Remédio\n3 - Ir para o Carrinho`);
    let operacao = Number(
      prompt(`Digite o número referente a operação a qual você irá realizar: `)
    );
    switch (operacao) {
      case 1:
        venda();
        break;
      case 2:
        updateMedicine();
        break;
      default:
        return false;
    }
  }
}

loopPrincipal();

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

exibirRemedios(carrinho, "selecionou");

let confirmaCompra = prompt(`Você deseja concluir sua compra? sim ou nao? `);
if (confirmaCompra.toLowerCase() === "sim") {
  console.log(`Obrigado pela compra! `);
  exibirRemedios(carrinho, "comprou");
  let totalCompra = calcularTotal(carrinho);
  console.log(`O valor total da sua compra é: R$${totalCompra}`);

  // Atualizar a quantidade dos remédios no estoque
  for (let remedio of carrinho) {
    let remedioEstoque = remedios.find((r) => r.id === remedio.id); // A função find é utilizada para procurar um elemento em um array que satisfaça a condição
    if (remedioEstoque) {
      remedioEstoque.quantidade -= 1; // Reduz a quantidade do remédio em 1 unidade
    }
  }
  salvarRemedios(remedios); // Salva as alterações de remedios no arquivo diretamente no JSON
} else {
  console.log(`Compra cancelada com sucesso!`);
}

console.log(`\n
███████╗ █████╗ ██████╗ ███╗   ███╗ █████╗ ████████╗███████╗██╗  ██╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══██╔══╝██╔════╝╚██╗██╔╝
█████╗  ███████║██████╔╝██╔████╔██║███████║   ██║   █████╗   ╚███╔╝ 
██╔══╝  ██╔══██║██╔══██╗██║╚██╔╝██║██╔══██║   ██║   ██╔══╝   ██╔██╗ 
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗██╔╝ ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`);