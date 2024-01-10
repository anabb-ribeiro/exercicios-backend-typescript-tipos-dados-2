const fs = require("fs");


function lerArquivo(): unknown {
  return JSON.parse(fs.readFileSync('../bd.json'))
}

function escreverArquivo(dados: unknown) {
  fs.writeFileSync('../bd.json', JSON.stringify(dados));
}

type Usuario = {
  nome: string,
  email: string,
  cpf: string,
  profissao?: string,
  endereco? : Endereco
}

type Endereco = {
  cep: number,
  rua: string,
  complemento?: string,
  bairro: string,
  cidade: string
}

const dados = lerArquivo() as Usuario[];

function cadastrar(usuario: Usuario): unknown {
    dados.push(usuario)
    escreverArquivo(dados);
    return dados[dados.length-1]
}

function listarUsuarios(): object[]{
  return dados
}



function detalharUsuario(cpf: string): Usuario {
  
  const bd = lerArquivo() as Usuario[];
  
  const usuarioEncontrado = bd.find(item => item.cpf === cpf)

  if (!usuarioEncontrado) {

    throw new Error('Usuário não encontrado');
  }

  return usuarioEncontrado
}

function atualizarUsuario(cpf: string, dados: Usuario): Usuario {
  
  const bd = lerArquivo() as Usuario[];
  
  const usuarioEncontrado = bd.find(item => item.cpf === cpf)

  if (!usuarioEncontrado) {

    throw new Error('Usuário não encontrado');
  }

  Object.assign(usuarioEncontrado, dados)

  escreverArquivo(bd);

  return dados;
}

function excluirUsuario(cpf: string): Usuario {

  const bd = lerArquivo() as Usuario[];
  
  const usuarioEncontrado = bd.find(item => item.cpf === cpf)

  const arraySemUser = bd.filter(item => item.cpf !== cpf)


  if (!usuarioEncontrado) {

    throw new Error('Usuário não encontrado');
  }

  Object.assign(usuarioEncontrado, dados)

  escreverArquivo(arraySemUser);

  return usuarioEncontrado;
}

function filtroUsuarios(profissao:string): Usuario[] {

  const bd = lerArquivo() as Usuario[];
  

  const filtroProfissao = bd.filter(item => item.profissao === profissao)


  if (filtroProfissao.length <= 0) {

    throw new Error('Não há usuários dessa profissão');
  }

  return filtroProfissao;
}

// console.log(cadastrar({ nome: 'Eloisa', email: 'eloisa@gmail.com', cpf: '13620429783'}))
// console.log(listarUsuarios());
// console.log(atualizarUsuario('13620429782', { nome: 'Ana', email: 'abbmr@gmail.com', cpf: '13620429782'}))

