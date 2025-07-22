document.getElementById("formularioCadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Capturando os valores dos campos
    let nomeCompleto = document.getElementById("nomeCompleto").value;
    let apelido = document.getElementById("apelido").value;
    let email = document.getElementById("email").value;
    let dataNascimento = document.getElementById("dataNascimento").value;
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmarSenha").value;

    // Verificando se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
    } else {
        cadastrar(nomeCompleto, apelido, email, dataNascimento, senha);
        limpar();
    }
});

function cadastrar(nomeCompleto, apelido, email, dataNascimento, senha) {
    fetch("http://localhost:8080/membros", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            fullName: nomeCompleto,
            email: email,
            username: apelido,
            password: senha,
            birthday: dataNascimento
        })
    })
    .then(function (res) {
        if (res.ok) {
            console.log('Cadastro realizado com sucesso!');
            alert('Cadastro realizado com sucesso!');
            window.location.href = "../pages/perfil.html";
        } else if (res.status === 400) {
            console.log('Erro de validação.');
            alert('Por favor, verifique os campos e tente novamente.');
        } else {
            console.log('Erro no cadastro.');
            alert('Erro ao tentar realizar o cadastro. Tente novamente mais tarde.');
        }
    })
    .catch(function (error) {
        console.log('Erro na requisição:', error);
    });
}

function limpar() {
    document.getElementById("formularioCadastro").reset();
}
