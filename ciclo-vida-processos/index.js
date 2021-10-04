/**
 * Instituição: Universidade Veiga de Almeida
 * Aluno: Hirvin Nogueira Faria
 * Titulo: Trabalho de Sistema Operacionais
 * Descrição: Simulação dos ciclo de vida de processos em Sistemas Operacionais
 */

/*
* Lista de Processoa contendo seu PID, STATUS do processo e TASK a ser executada
*/

let processList = [
    {
        pid: 0,
        status: 'RUNNING',
        task: task1,
    },
    {
        pid: 1,
        status: 'BLOCKED',
        task: task2,
    },
    {
        pid: 2,
        status: 'BLOCKED',
        task: task3,
    }
]

/**
 * Função que deve retornar o valor 1
 */
function task1(parm) {
    console.log('Excutando Tarefa 1');
    return {
        isError: false,
        result: 1
    };
}

/**
 * Função que verifica se um numero e par e retornar este valor + 2.
 * Caso seja impar retorna um erro.
 */
function task2(parm) {
    console.log('Excutando Tarefa 2');
    if(parm % 2 === 0) {
        const calc = parm + 2;
        return {
            isError: false,
            result: calc
        };
    } else {
        return {
            isError: true,
            result: parm
        };
    }
}

/**
 * Função que recebe um parametro e soma + 1.
 */
function task3(parm) {
    console.log('Excutando Tarefa 3');
    return {
        isError: false,
        result: parm + 1
    };

}

// Invocação da Função Pincipal do Sistema
(function () {
    console.log('|-------------------- Executando SO --------------------|');
    console.log('|-              Iniciando Processamento                -|\n\n');
    let CPU = 0;
    let process;
    let memoriaA;
    let memoriaB;

    // Iniciando Loop da Fila de Processos do Sistema.
    do {

        // caso a CPU esteja vazia inicializa um novo processo da fila de processos
        if(CPU === 0) {
            process = processList.shift();

            // Verifica a fila de processos é undefined
            if(process == undefined) {
                console.log('\n\n|--------------- Fila de Processos Finalizada ---------------|');
                break;
            // Verifica se o Processo está no estado de RUNNING ou BLOCKED para que possa ser enviado para CPU;
            } else if ( process.status == 'RUNNING' || process.status == 'BLOCKED') {
                process.status = 'READY';
                CPU = 1;
            }
        }
        

        // Verifica Estado do Processo
        switch (process.status) {

            // Caso esteja em READY altera seu estado para RUNNING
            case 'READY':
                process.status = 'RUNNING'
                break;

            // Executa o Processo
            case 'RUNNING':
                memoriaA = process.task(memoriaB);

                // Caso ocorra algum erro com o proceso altera seu estado para BLOCKED
                if(memoriaA.isError) {
                    process.status = 'BLOCKED';
                    console.log(`O Processo #${process.pid} foi Bloqueado pelo SO`);
                } else {
                    memoriaB = memoriaA.result;
                    console.log(memoriaB);
                    CPU = 0;
                    console.log(`Finaliza Processo: #${process.pid}`);
                }
                break;

            // Caso o processo receba o Estado de BLOCKED
            // Remove o processo da CPU 
            // e envia o processo para o final da fila de processos
            case 'BLOCKED':
                    CPU = 0;
                    processList.push(process);
                break;

            default:
                processList.shift();
                CPU = 0;
                break;
        }


    } while (processList.length >= 0);
})();