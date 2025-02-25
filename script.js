document.getElementById("formEquipamento").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const codigo = document.getElementById("codigo").value;
    const nome = document.getElementById("nome").value;
    const comprimento = document.getElementById("comprimento").value;
    const categoria = document.getElementById("categoria").value;
    const status = document.getElementById("status").value;
    const historicoUso = document.getElementById("historicoUso").value;
    const comentarios = document.getElementById("comentarios").value;

    // Criar um objeto com os dados do equipamento
    const equipamento = {
        codigo,
        nome,
        comprimento,
        categoria,
        status,
        historicoUso,
        comentarios
    };

    // Verificar se já existem equipamentos salvos no localStorage
    let equipamentosSalvos = JSON.parse(localStorage.getItem('equipamentos')) || [];

    // Adicionar o novo equipamento à lista de equipamentos
    equipamentosSalvos.push(equipamento);

    // Salvar a lista atualizada de equipamentos no localStorage
    localStorage.setItem('equipamentos', JSON.stringify(equipamentosSalvos));

    // Mostrar mensagem de sucesso
    alert("Equipamento salvo com sucesso!");

    // Limpar o formulário
    document.getElementById("formEquipamento").reset();

    // Exibir os equipamentos após o cadastro
    exibirEquipamentos();
});

// Função para exibir os equipamentos salvos
function exibirEquipamentos() {
    const equipamentosContainer = document.getElementById("equipamentos-lista");
    equipamentosContainer.innerHTML = "";  // Limpar a lista antes de exibir os equipamentos

    // Recuperar os equipamentos do localStorage
    let equipamentosSalvos = JSON.parse(localStorage.getItem('equipamentos')) || [];

    // Se houver equipamentos salvos, renderize-os
    equipamentosSalvos.forEach((equipamento) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${equipamento.codigo}</td>
            <td>${equipamento.nome}</td>
            <td>${equipamento.categoria}</td>
            <td>${equipamento.status}</td>
            <td>${equipamento.comprimento}</td> <!-- Adicionada a exibição do comprimento -->
            <td>
                <button onclick="editarEquipamento('${equipamento.codigo}')">Editar</button>
                <button onclick="removerEquipamento('${equipamento.codigo}')">Remover</button>
            </td>
        `;

        equipamentosContainer.appendChild(tr);
    });
}

// Função para editar o equipamento
function editarEquipamento(codigo) {
    let equipamentosSalvos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const equipamento = equipamentosSalvos.find(e => e.codigo === codigo);

    if (equipamento) {
        document.getElementById("codigo").value = equipamento.codigo;
        document.getElementById("nome").value = equipamento.nome;
        document.getElementById("comprimento").value = equipamento.comprimento;
        document.getElementById("categoria").value = equipamento.categoria;
        document.getElementById("status").value = equipamento.status;
        document.getElementById("historicoUso").value = equipamento.historicoUso;
        document.getElementById("comentarios").value = equipamento.comentarios;

        // Remover o equipamento antigo para substituí-lo
        removerEquipamento(codigo);
    }
}

// Função para remover um equipamento
function removerEquipamento(codigo) {
    let equipamentosSalvos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    equipamentosSalvos = equipamentosSalvos.filter(e => e.codigo !== codigo); // Remover equipamento pelo código
    localStorage.setItem('equipamentos', JSON.stringify(equipamentosSalvos));

    // Atualizar a exibição após a remoção
    exibirEquipamentos();
}

// Exibir os equipamentos ao carregar a página
window.onload = function() {
    exibirEquipamentos();
};

// Função de filtro de equipamentos (pesquisar)
function filtrarEquipamentos() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const linhas = document.querySelectorAll("#equipamentos-lista tr");

    linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        if (textoLinha.includes(searchValue)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
}
