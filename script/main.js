const tarefa = document.querySelector('.input-tarefa');
const adicionar = document.querySelector('.btn-adicionar');
const listaTarefas = document.querySelector('.lista-tarefas');

let items = [];

function leituraValores() {
    let valores = tarefa.value;
    items.push({
        input: valores,
        concluida: false
    });
    console.log(items);
    tarefa.value = '';

    adicionarValores();
    salvarNoLocalStorage();
}

function adicionarValores() {
    listaTarefas.innerHTML = '';
    items.forEach((tarefa, index) => {
        let novali = `<li class="${tarefa.concluida ? 'confirmado' : ''}">
                      <img src="img/checked.png" class=alt="Ok" onclick='confirmarItem(${index})'>
                      <p>${tarefa.input}</p>
                      <img src="img/trash.png" alt="Apagar" onclick='deletarItem(${index})'>
                      </li>`;
        listaTarefas.innerHTML += novali;
    });
}

function deletarItem(index) {
    items.splice(index, 1);
    adicionarValores();
    salvarNoLocalStorage();
}

function confirmarItem(index) {
    items[index].concluida = !items[index].concluida;
    adicionarValores();
    salvarNoLocalStorage();
}

function recarregarTela() {
    const tarefaLocal = localStorage.getItem('lista');
    if (tarefaLocal !== null) {
        items = JSON.parse(tarefaLocal);
    }
    adicionarValores();
}

function salvarNoLocalStorage() {
    localStorage.setItem('lista', JSON.stringify(items));
}

document.addEventListener('DOMContentLoaded', function() {
    recarregarTela();
    adicionar.addEventListener('click', leituraValores);
});
