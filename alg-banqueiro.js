/* 

Atividade 2 - B | Sistemas Operacionais | Hirvin Faria | UVA

EXECUÇÃO DO PROGRAMA:
node alg-banqueiro.js

SAIDA:
Lista de Recursos:  [ { name: 'A', has: 3, max: 9 }, { name: 'B', has: 2, max: 4 }, { name: 'C', has: 2, max: 7 }]
Lista de Recursos:  [ { name: 'A', has: 3, max: 9 }, { name: 'C', has: 2, max: 7 } ]
Lista de Recursos:  [ { name: 'C', has: 2, max: 7 } ]
Lista de Recursos:  []
Lista de Recusos Finalizada com Sucesso 
*/


// Função Principal Autoinvocada
(function () {
    let recursosLivres = 3;
    let recursoAEmprestar;

    // cria a lista de recursos
    let listaRecursos = [
        {
            name: "A",
            has: 3,
            max: 9,
        },
        {
            name: "B",
            has: 2,
            max: 4,
        },
        {
            name: "C",
            has: 2,
            max: 7,
        },
    ];

    // exibe a lista de recursos inicial
    console.log(`Lista de Recursos: `, listaRecursos);


    // loop para processar a fila de recursos
    while (listaRecursos.length !== 0 ) {


        // busca um processo que nescessite de menos recursos que os recursos livres.
        // e seta a variavel recursoAEmprestar para pegar um novo recurso com o Sistem Operacional.
        recursoAEmprestar = listaRecursos.find((recurso) => {
            return (recurso.max - recurso.has) < recursosLivres
        });


        // empresta os recursos livres ao recursoAEmprestar
        listaRecursos = listaRecursos.map((recurso) => {

            //verifica qual recurso deve receber o recurso livre
            if(recurso.name === recursoAEmprestar.name) {

                // seta a quantidade de recursos a ser emprestado
                const emprestimoDeRecurso = recurso.max - recurso.has;

                // remove os recursos que serao emprestados dos recursos livres
                recursosLivres = recursosLivres - emprestimoDeRecurso;

                // empresta os recurso
                recurso.has = recurso.has + emprestimoDeRecurso;
            };
            return recurso;
        });


        // filaniza um processo que ja possui todos os seus recursos
        // e remove o recurso da lista de recursos
        listaRecursos = listaRecursos.filter((recurso) => {
            // devolve o recurso emprestado
            recursosLivres = recursosLivres + recurso.has;

            return recurso.has !== recurso.max;
        });


        console.log(`Lista de Recursos: `, listaRecursos);
    }

    console.log("Lista de Recusos Finalizada com Sucesso");
})();
