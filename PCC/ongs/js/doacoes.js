// Simulação de doações
const doacoes = [
    {
        nome: "João Silva",
        valor: 100,
        data: "01/12/2024",
        foto: "../img/fotoperfil.png",
        email: "joao.silva@example.com",
        doacoesAnteriores: [
            { valor: 50, data: "01/11/2024" },
            { valor: 30, data: "15/10/2024" }
        ]
    },
    {
        nome: "Maria Oliveira",
        valor: 50,
        data: "30/11/2024",
        foto: "../img/fotoperfil.png",
        email: "maria.oliveira@example.com",
        doacoesAnteriores: [
            { valor: 20, data: "01/09/2024" }
        ]
    },
    {
        nome: "Carlos Santos",
        valor: 200,
        data: "29/11/2024",
        foto: "../img/fotoperfil.png",
        email: "carlos.santos@example.com",
        doacoesAnteriores: []
    }
];


// Função para renderizar os cartões de doações
function renderizarDoacoes(filtradas = doacoes) {
    const cartoesContainer = document.getElementById("cartoes-container");
    const botaoVoltar = document.getElementById("botao-voltar");

    cartoesContainer.innerHTML = ""; // Remove qualquer conteúdo existente

    // Verifica se há resultados
    if (filtradas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum resultado encontrado.";
        mensagem.style.textAlign = "center";
        mensagem.style.color = "#777";
        cartoesContainer.appendChild(mensagem);
        botaoVoltar.style.display = "block";
        return;
    }

    // Adiciona os cartões de doações
    filtradas.forEach(doacao => {
        const card = document.createElement("div");
        card.classList.add("doacao-card");

        const img = document.createElement("img");
        img.src = doacao.foto;
        img.alt = `Foto de ${doacao.nome}`;
        img.classList.add("foto-usuario");

        const detalhes = document.createElement("div");
        detalhes.classList.add("detalhes");

        const nome = document.createElement("span");
        nome.classList.add("nome");
        nome.textContent = doacao.nome;

        const valor = document.createElement("span");
        valor.classList.add("valor");
        valor.textContent = `R$ ${doacao.valor.toFixed(2)}`;

        const data = document.createElement("span");
        data.classList.add("data");
        data.textContent = doacao.data;

        detalhes.appendChild(nome);
        detalhes.appendChild(valor);
        detalhes.appendChild(data);

        card.appendChild(img);
        card.appendChild(detalhes);

        cartoesContainer.appendChild(card);
    });

    // Exibe ou oculta o botão "Voltar"
    botaoVoltar.style.display = filtradas.length < doacoes.length ? "block" : "none";
}

// Função para filtrar doações
function filtrarDoacoes() {
    const termo = document.getElementById("campo-busca").value.toLowerCase().trim();

    const filtradas = doacoes.filter(doacao => {
        return (
            doacao.nome.toLowerCase().includes(termo) ||
            doacao.valor.toString().includes(termo) ||
            doacao.data.includes(termo)
        );
    });

    console.log("Termo de busca:", termo);
    console.log("Resultados filtrados:", filtradas);

    renderizarDoacoes(filtradas);
}

// Chama a função
renderizarDoacoes();


// Exibir a modal
function exibirInfo(nome, foto, email, doacoesAnteriores) {
    const modal = document.getElementById("info-modal");
    const modalFoto = document.getElementById("modal-foto");
    const modalEmail = document.getElementById("modal-email");
    const modalNome = document.getElementById("modal-nome");
    const modalDoacoes = document.getElementById("modal-doacoes");

    // Atualiza as informações
    modalFoto.src = foto;
    modalEmail.textContent = `Email: ${email}`;
    modalNome.textContent = nome;

    // Atualiza a lista de doações antigas
    modalDoacoes.innerHTML = "";
    if (doacoesAnteriores && doacoesAnteriores.length > 0) {
        doacoesAnteriores.forEach((doacao) => {
            const doacaoItem = document.createElement("li");
            doacaoItem.textContent = `R$ ${doacao.valor.toFixed(2)} - ${doacao.data}`;
            modalDoacoes.appendChild(doacaoItem);
        });
    } else {
        const nenhumaDoacao = document.createElement("p");
        nenhumaDoacao.textContent = "Nenhuma doação anterior registrada.";
        modalDoacoes.appendChild(nenhumaDoacao);
    }

    // Exibe a modal
    modal.style.display = "flex";
}

// Fechar a modal no "X"
function fecharModal() {
    const modal = document.getElementById("info-modal");
    modal.style.display = "none";
}

// Fechar a modal ao clicar fora do conteúdo
function fecharModalExterno(event) {
    const modal = document.getElementById("info-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Atualiza a função renderizarDoacoes para adicionar o evento de clique
function renderizarDoacoes(filtradas = doacoes) {
    const cartoesContainer = document.getElementById("cartoes-container");
    const botaoVoltar = document.getElementById("botao-voltar");

    cartoesContainer.innerHTML = "";

    if (filtradas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum resultado encontrado.";
        mensagem.style.textAlign = "center";
        mensagem.style.color = "#777";
        cartoesContainer.appendChild(mensagem);
        botaoVoltar.style.display = "block";
        return;
    }

    filtradas.forEach(doacao => {
        const card = document.createElement("div");
        card.classList.add("doacao-card");

        const img = document.createElement("img");
        img.src = doacao.foto;
        img.alt = `Foto de ${doacao.nome}`;
        img.classList.add("foto-usuario");

        const detalhes = document.createElement("div");
        detalhes.classList.add("detalhes");

        const nome = document.createElement("span");
        nome.classList.add("nome");
        nome.textContent = doacao.nome;

        const valor = document.createElement("span");
        valor.classList.add("valor");
        valor.textContent = `R$ ${doacao.valor.toFixed(2)}`;

        const data = document.createElement("span");
        data.classList.add("data");
        data.textContent = doacao.data;

        detalhes.appendChild(nome);
        detalhes.appendChild(valor);
        detalhes.appendChild(data);

        card.appendChild(img);
        card.appendChild(detalhes);

        // Clique para exibir informações
        card.onclick = () => exibirInfo(
            doacao.nome,
            doacao.foto,
            doacao.email,
            doacao.doacoesAnteriores || []
        );

        cartoesContainer.appendChild(card);
    });

    botaoVoltar.style.display = filtradas.length < doacoes.length ? "block" : "none";
}

// Clique na área externa do modal para fechar
document.getElementById("info-modal").addEventListener("click", fecharModalExterno);