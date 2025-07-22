document.addEventListener("DOMContentLoaded", async function () {
    const listaObreiros = document.querySelector(".listaObreiros");

    try {
        const response = await fetch("http://localhost:8080/obreiros");
        if (!response.ok) {
            throw new Error("Erro ao buscar os obreiros.");
        }

        const obreiros = await response.json();
        listaObreiros.innerHTML = ""; // Limpa o conteúdo inicial da lista

        obreiros.forEach((obreiro) => {
            const cardObreiro = document.createElement("div");
            cardObreiro.classList.add("obreiro");

            cardObreiro.innerHTML = `
                <img src="../assets/fotos/perfilpad.jpg" alt="Avatar" class="iconeObreiro">
                <div class="infoObreiro">
                    <p><strong>NOME:</strong> ${obreiro.fullname}</p>
                    <p><strong>USUÁRIO:</strong> ${obreiro.username}</p>
                    <button
                    class="btn-excluir"
                    data-bs-toggle="modal"
                    data-bs-target="#modalExcluirObreiro"
                    data-user-id="${obreiro.Id}"
                >
                    <i class="fa-solid fa-trash" style="color: #ec1313"></i>
                </button>
                </div>
            `;

            listaObreiros.appendChild(cardObreiro);

        });

        // Criação da instância do modal do Bootstrap
        const modalElement = document.getElementById('modalExcluirPerfil');
        const modalExcluir = new bootstrap.Modal(modalElement);

        // Selecionando o botão de confirmação de exclusão
        const buttonExcluir = document.getElementById('confirmarExclusao');

        // Adiciona o evento de clique aos botões de exclusão de cada obreiro
        document.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', function () {
                const userId = this.getAttribute('data-user-id');
                // Armazena o ID do obreiro a ser excluído para usar depois
                localStorage.setItem('userIdToDelete', userId);
                modalExcluir.show(); // Exibe o modal
            });
        });

        // Evento para confirmar exclusão
        buttonExcluir.addEventListener('click', async () => {
            const userIdToDelete = localStorage.getItem('userIdToDelete');
            const token = localStorage.getItem('token');
            const urlExcluirObreiro = `http://localhost:8080/obreiros/${userIdToDelete}`;

            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                redirect: "follow"
            };

            try {
                const response = await fetch(urlExcluirObreiro, requestOptions);
                
                if (!response.ok) {
                    throw new Error('Erro ao excluir obreiro: ' + response.statusText);
                }

                alert("Obreiro excluído com sucesso");
                localStorage.clear();
                window.location.href = 'visualizarObreiro.html'; 

            } catch (error) {
                console.error('Erro ao excluir perfil:', error);
            }
        });

    } catch (error) {
        console.error("Erro ao carregar obreiros:", error);
        listaObreiros.innerHTML = "<p>Erro ao carregar os obreiros. Tente novamente mais tarde.</p>";
    }
});
