// Variáveis do login
var formLogin = document.getElementById("formularioLogin");
var btnLogin = document.querySelector(".botaoEntrar");
var emailLogin = document.getElementById("email");
var senhaLogin = document.getElementById("senha");

// Adiciona evento de clique ao botão de login
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  console.log(emailLogin.value);
  console.log(senhaLogin.value);

  var urlLogin = "http://localhost:8080/login/"; // URL do login

  // Monta os dados a serem enviados
  var data = {
    email: emailLogin.value,
    password: senhaLogin.value
  };

  console.log("Dados a serem enviados:", data);

  // Faz a requisição
  axios.post(urlLogin, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('Dados retornados do servidor:', response.data);
    localStorage.setItem("token", response.data.token);

    // Acessa o id corretamente
    if (response.data.userId) {
      localStorage.setItem("userId", response.data.userId);
    } else {
      console.warn('userId não encontrado na resposta do servidor.');
    }

    // Redireciona para a página inicial
    window.location.href = "../pages/perfil.html";
  })
  .catch(error => {
    if (error.response) {
      console.log("Data:", error.response.data);
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request:", error.request);
    } else {
      console.log("Error:", error.message);
    }
    console.log("Config:", error.config);
  });
});
