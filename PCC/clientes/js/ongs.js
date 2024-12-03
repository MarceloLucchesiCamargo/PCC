// Simulação de ONGs
const ongs = [
    {
        nome: "ONG 1",
        cidade: "São Paulo",
        estado: "SP",
        email: "contato@ong1.com",
        telefone: "(11) 99999-9999",
        website: "https://www.ong1.org",
        foto: "../img/fotoperfil.png",
        fotosAdicionais: [
            "../img/placeholder.png",
            "../img/placeholder.png",
            "../img/placeholder.png",
            "../img/placeholder.png",
            "../img/placeholder.png"
        ]
    },
    {
        nome: "ONG 2",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        email: "contato@ong2.com",
        telefone: "(21) 99999-9999",
        website: "https://www.ong2.com.br",
        foto: "../img/fotoperfil.png",
        fotosAdicionais: [
            "../img/placeholder.png",
            "../img/placeholder.png",
            "../img/placeholder.png",
            "../img/placeholder.png",
            "../img/placeholder.png"
        ]
    }
];

// Armazenar a ONG selecionada
let ongSelecionada = null;

// Exibir o modal
function exibirModal(ong) {
    const modal = document.getElementById("ong-modal");
    document.getElementById("modal-foto-ong").src = ong.foto;
    document.getElementById("modal-nome-ong").textContent = ong.nome;
    document.getElementById("modal-cidade").textContent = ong.cidade;
    document.getElementById("modal-estado").textContent = ong.estado;
    document.getElementById("modal-email").textContent = ong.email;
    document.getElementById("modal-telefone").textContent = ong.telefone;

    const website = document.getElementById("modal-website");
    website.href = ong.website;
    website.textContent = ong.website;

    const fotosContainer = document.getElementById("modal-fotos-adicionais");
    fotosContainer.innerHTML = "";
    ong.fotosAdicionais.forEach(foto => {
        const img = document.createElement("img");
        img.src = foto;
        img.alt = "Foto adicional";
        img.onclick = () => visualizarFoto(img);
        fotosContainer.appendChild(img);
    });

    // Define a ONG selecionada
    ongSelecionada = ong;

    modal.style.display = "flex";
}

// Exibir o campo de doação
function exibirCampoDoacao() {
    document.getElementById("campo-doacao").style.display = "block";
}

// Ocultar o campo de doação
function ocultarCampoDoacao() {
    document.getElementById("campo-doacao").style.display = "none";
}

// Processar a doação
function processarDoacao() {
    const valor = document.getElementById("valor-doacao").value;
    if (!valor || valor <= 0) {
        alert("Por favor, insira um valor válido para a doação.");
        return;
    }

    // Redirecionamento para a plataforma de pagamento
    const url = `https://pagseguro.uol.com.br/checkout/v2/payment.html?receiverEmail=${ongSelecionada.email}&currency=BRL&itemDescription1=Doação&itemAmount1=${valor}`;
    window.open(url, "_blank");

    ocultarCampoDoacao();
    fecharModal();
}

// Fechar o modal
function fecharModal() {
    const modal = document.getElementById("ong-modal");
    modal.style.display = "none";
}

// Exibir foto em tamanho original
function visualizarFoto(img) {
    const popup = window.open("", "Foto Adicional", "width=800,height=800");
    popup.document.write(`
        <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100%; background-color: black; }
            img { max-width: 100%; max-height: 100%; }
        </style>
        <img src="${img.src}" alt="${img.alt}">
    `);
}

document.addEventListener("DOMContentLoaded", () => {
    const campoBusca = document.getElementById("campo-busca-ongs");
    const botaoVoltar = document.getElementById("botao-voltar-ongs");

    // Campo de busca
    campoBusca.addEventListener("input", () => {
        const termo = campoBusca.value.toLowerCase();
        const filtradas = ongs.filter(ong =>
            ong.nome.toLowerCase().includes(termo) ||
            ong.cidade.toLowerCase().includes(termo) ||
            ong.estado.toLowerCase().includes(termo)
        );
        renderizarOngs(filtradas);
    });

    // Botão Voltar
    botaoVoltar.addEventListener("click", () => {
        campoBusca.value = "";
        renderizarOngs(ongs);
    });

    // Renderiza ONGs
    renderizarOngs(ongs);
});

// Renderizar ONGs
function renderizarOngs(filtradas = ongs) {
    const cartoesContainer = document.getElementById("cartoes-container-ongs");
    const botaoVoltar = document.getElementById("botao-voltar-ongs");

    cartoesContainer.className = "ongs-container";
    cartoesContainer.innerHTML = "";

    if (filtradas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhuma ONG encontrada.";
        mensagem.style.textAlign = "center";
        mensagem.style.color = "#777";
        cartoesContainer.appendChild(mensagem);
        botaoVoltar.style.display = "block";
        return;
    }

    filtradas.forEach(ong => {
        const card = document.createElement("div");
        card.classList.add("ong-card");

        const img = document.createElement("img");
        img.src = ong.foto;
        img.alt = `Foto da ${ong.nome}`;
        img.classList.add("foto-ong");

        const detalhes = document.createElement("div");

        const nome = document.createElement("h3");
        nome.textContent = ong.nome;

        const cidade = document.createElement("p");
        cidade.textContent = `Cidade: ${ong.cidade}, ${ong.estado}`;

        detalhes.appendChild(nome);
        detalhes.appendChild(cidade);

        card.appendChild(img);
        card.appendChild(detalhes);

        // Abrir o modal
        card.onclick = () => exibirModal(ong);

        cartoesContainer.appendChild(card);
    });

    botaoVoltar.style.display = filtradas.length < ongs.length ? "block" : "none";
}
