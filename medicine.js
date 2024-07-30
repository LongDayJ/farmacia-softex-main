import fs from "fs";
import chalk from "chalk";
import promptSync from "prompt-sync";
const prompt = promptSync();

let remedios = listaRemedios();

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



function updateMedicine(funcionario) {
  if (funcionario.administrator == true) {
    console.log(chalk.blue("\nLista de remédios disponíveis: "));
    remedios.forEach((remedio, index) => {
      console.log(`${index + 1}. ${remedio.nome}`);
    });

    console.log("");
    let buscadorRemedio = Number(
      prompt(chalk.yellow(`Qual remédio você deseja alterar?(digite o id) `))
    );

    for (let i = 0; i < remedios.length; i++) {
      if (buscadorRemedio == remedios[i].id) {
        console.log(
          chalk.blue(
            `1 - Nome\n2 - Preço\n3 - Categoria\n4 - Necessidade de Receita\n5 - Quantidade`
          )
        );
        console.log("");
        let info = Number(
          prompt(
            chalk.yellow(`Qual informação do remédio você deseja alterar? `)
          )
        );
        switch (info) {
          case 1:
            let novoNome = prompt(
              `Qual será o novo nome do remédio ${remedios[i].nome}? `
            );
            remedios[i].nome = novoNome;
            console.log(chalk.green(`\nO nome do remédio foi atualizado`));
            break;
          case 2:
            let novoPreco = Number(
              prompt(`Qual será o novo preço do remédio ${remedios[i].nome}? `)
            );
            remedios[i].preco = novoPreco;
            console.log(chalk.green(`O preço do remédio foi atualizado`));
            break;
          case 3:
            let novaCategoria = prompt(
              `Qual será a nova categoria do remédio ${remedios[i].nome}? `
            );
            remedios[i].categoria = novaCategoria;
            console.log(chalk.green(`A Categoria do remédio foi atualizada`));
            break;
          case 4:
            let novaNecessidade = prompt(
              chalk.blue(
                `O remédio ${remedios[i].nome} irá precisar de receita?) (`
              ) +
                chalk.green(`S`) +
                chalk.blue(`/`) +
                chalk.red(`n`) +
                chalk.blue(")")
            );

            if (novaNecessidade.toLowerCase() == "s") {
              remedios[i].controlado = true;
              console.log(
                chalk.green(`Agora o remédio necessitará de receita`)
              );
            } else if (novaNecessidade.toLowerCase() == "n") {
              remedios[i].controlado = false;
              console.log(
                chalk.green(`Agora o remédio NÃO necessitará de receita`)
              );
            } else {
              console.log(chalk.red(`ERRO`));
            }
            break;
          case 5:
            let novaQuantidade = Number(
              prompt(
                `Qual será a nova quantidade do remédio ${remedios[i].nome}? `
              )
            );
            remedios[i].quantidade = novaQuantidade;
            console.log(chalk.green(`A quantidade do remédio foi atualizada`));
            break;
          default:
            console.log(chalk.red(`ERRO`));
            break;
        }
        salvarRemedios(remedios);
        break;
      }
    }
  } else {
    console.log(
      chalk.red("\nVocê não tem permissão para acessar essa funcionalidade")
    );
  }
}

export { listaRemedios, updateMedicine };
