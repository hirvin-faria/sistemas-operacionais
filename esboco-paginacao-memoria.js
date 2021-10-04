// Define a Memoria do Sistema
const MEMORIA = [];
MEMORIA[23] = "VALOR";

// Cria a TLB
const TLB = {
    1: 0b10,
    2: 0b11,
    3: 0b01
};

// Cria Tabela de Página
const TAMPagina = 2; 
const TabelaPaginas = [0b00, 0b10, 0b11, 0b01];

// Instancia Tabela de Página na Memória
MEMORIA[10] = TabelaPaginas;

// Obtém o frema a partir da TLB
function obtemFrameNaTLB(enderecoLogico, TLB) {
    const paginaDaTBL = enderecoLogico.p;
    return TLB[paginaDaTBL];
}


// Obtém o frame apartir da página e da tabela de paginas armazenada na memoria
function obterFrameNaTabelaPaginas(enderecoLogico, tabela) {
    const deslocamentoDaPagina = enderecoLogico.p;
    return tabela[deslocamentoDaPagina];
}

// Obtem o endereco fisico;
function obterMemoriaFisica(enderecoFisico){
    const valorAcesso = parseInt(`${enderecoFisico.f}${enderecoFisico.d}`);
    return valorAcesso;
}


// Função Principal Autoinvocada
(function () {
    // Define o endereço logico.
    let frame;
    let enderecoLogico = {
        p: 0b01,
        d: 0b0011
    }

    // Chama função que obtem o valor do frame na TLB
    frame = obtemFrameNaTLB(enderecoLogico, TLB);


    // verifica se o Frame foi encontrado na TLB, caso contrário realiza a busca na tabela de páginas
    if(!frame) {
        // Chama função que obtem o valor do frame na tabela de páginas
        frame = obterFrameNaTabelaPaginas(enderecoLogico, MEMORIA[10]);
    }
    

    // Define o endereco fisico
    const enderecoFisico = {
        f: frame,
        d: enderecoLogico.d,
    }

    // Chama função que calcula o valor de acesso a memoria física
    const VALORACESSO = obterMemoriaFisica(enderecoFisico);
    
    // Acessa memoria física e imprime o valor armazenado.
    const DADO = MEMORIA[VALORACESSO];
    console.log(DADO);
    return 1
})();