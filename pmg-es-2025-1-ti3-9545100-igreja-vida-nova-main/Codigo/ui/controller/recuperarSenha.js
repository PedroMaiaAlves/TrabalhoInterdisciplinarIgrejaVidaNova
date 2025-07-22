document.getElementById('botaoVoltar').addEventListener('click', function() {
    window.history.back();
});

document.getElementById('formularioRecuperar').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;

    if (email) {
        alert('Um e-mail foi enviado para recuperação de senha.');
        window.location.href = "../pages/login.html"; // Redireciona para a página de login
    } else {
        alert('Por favor, informe seu e-mail.');
    }
});
