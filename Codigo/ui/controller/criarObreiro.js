document.getElementById("formularioCriarObreiro").addEventListener("submit", async function (event){
    event.preventDefault();

    let nomeMembro = document.getElementById("nomeMembro").value;
    let apelidoMembro = document.getElementById("apelidoMembro").value;

    try {
        // EndPoint para buscar um membro específico
        const response = await fetch(`http://localhost:8080/membros/buscarPorNome?fullName=${encodeURIComponent(nomeMembro)}&username=${encodeURIComponent(apelidoMembro)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.text();  // Captura a mensagem de erro do backend
            alert(`Usuário informado não existe! Detalhes: ${errorData}`);
            return;
        }

        // Recebe a resposta JSON com os dados do membro
        const membro = await response.json();

        // Verifica se o ID foi retornado corretamente
        if (membro && membro.Id) {
            // Envia a requisição PUT para promover o membro a obreiro
            const promoverResponse = await fetch(`http://localhost:8080/obreiros/${membro.Id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Verifica se a resposta está ok
            if (promoverResponse.ok) {
                alert("Membro promovido a obreiro com sucesso.");
            } else {
                const promoverError = await promoverResponse.text();
                console.error("Erro ao promover membro:", promoverError);
                alert(`Erro ao promover o membro: ${promoverError}`);
            }
        } else {
            alert("ID do membro não encontrado.");
        }

    } catch (error) {
        console.error("Erro ao processar:", error);
        alert("Erro ao conectar com o servidor.");
    }
});