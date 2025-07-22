function formatarData(dataISO) {
    if (!dataISO) return ''; // Se não houver data, retorna vazio

    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0'); // Garante dois dígitos
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}
 
 // Função para carregar os dados do membro
 async function carregarDadosMembro() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error("userId não encontrado no localStorage.");
        return; // Impede a execução da função se o userId não existir
    }

    const token = localStorage.getItem("token");
    const urlDadosMembro = `http://localhost:8080/membros/${userId}`; // Alterado para buscar "membro"

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(urlDadosMembro, requestOptions);
        
        // Verificando se a resposta é válida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do membro: ' + response.statusText);
        }

        const membro = await response.json();
        console.log(membro); // Verifique se os dados estão sendo retornados corretamente

        // Preenchendo os dados no HTML
        document.getElementById('nomeCompleto').textContent = membro.fullName || '';
        document.getElementById('apelido').textContent = membro.username || ''; 
        document.getElementById('dataNascimento').textContent = formatarData(membro.birthday) || '';
        document.getElementById('email').textContent = membro.email || '';

    } catch (error) {
        console.error('Erro ao carregar os dados do membro:', error);
    }
}

// Chamada da função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDadosMembro);

// Selecionar o botão "Editar Perfil" e o modal
const editarPerfilButton = document.getElementById('editarPerfil');
const modalEditarPerfil = new bootstrap.Modal(document.getElementById('modalEditarPerfil'));

// Inputs do formulário dentro do modal
const inputNome = document.getElementById('nomeCompletoInput');
const inputApelido = document.getElementById('apelidoInput');
const inputDataNascimento = document.getElementById('dataNascimentoInput');

// Ao clicar no botão "Editar Perfil", preenche os campos com os dados atuais
editarPerfilButton.addEventListener('click', () => {
    // Pegando os dados já exibidos no perfil
    inputNome.value = document.getElementById('nomeCompleto').textContent;
    inputApelido.value = document.getElementById('apelido').textContent;

    // Converte a data para o formato correto (YYYY-MM-DD)
    let dataNascimentoTexto = document.getElementById('dataNascimento').textContent;
    let dataNascimentoFormatada = dataNascimentoTexto.split('/').reverse().join('-');
    inputDataNascimento.value = dataNascimentoFormatada;

    modalEditarPerfil.show();
});


const salvarEdicaoButton = document.getElementById('salvarAlteracoes');

// Evento de clique no botão "Salvar"
salvarEdicaoButton.addEventListener('click', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const urlEditarMembro = `http://localhost:8080/membros`;

    const dadosAtualizados = {
        id: userId,
        fullName: inputNome.value,
        username: inputApelido.value,
        birthday: inputDataNascimento.value
    };

    try {
        const response = await fetch(urlEditarMembro, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar os dados: " + response.statusText);
        }

        console.log("Perfil atualizado com sucesso!");

        // Atualiza os dados na interface sem precisar recarregar a página
        document.getElementById('nomeCompleto').textContent = dadosAtualizados.fullName;
        document.getElementById('apelido').textContent = dadosAtualizados.username;
        document.getElementById('dataNascimento').textContent = formatarData(dadosAtualizados.birthday);

        // Fecha o modal
        modalEditarPerfil.hide();
    } catch (error) {
        console.error("Erro ao atualizar o perfil:", error);
    }
});


// Ao clicar no botão de editar perfil, abre o modal
editarPerfilButton.addEventListener('click', () => {
    modal.show();
});

const excluirPerfil = document.getElementById('excluirPerfil');
const modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluirPerfil'));
const buttonExcluir = document.getElementById('confirmarExclusao')

// Ao clicar no botão de editar perfil, abre o modal
excluirPerfil.addEventListener('click', () => {
    modalExcluir.show();
});

buttonExcluir.addEventListener('click', async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const urlExcluirMembro = `http://localhost:8080/membros/${userId}`;

    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        redirect: "follow"
    };

    try {
        const response = await fetch(urlExcluirMembro, requestOptions);
        
        if (!response.ok) {
            throw new Error('Erro ao excluir perfil: ' + response.statusText);
        }

        alert("Perfil excluído com sucesso");
        localStorage.clear();
        // Opcional: redirecionar para a página de login ou página inicial
        window.location.href = 'login.html'; // Altere para a página desejada após exclusão

    } catch (error) {
        console.error('Erro ao excluir perfil:', error);
    }
}
    );