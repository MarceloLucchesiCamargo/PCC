const MAX_FOTOS = 5;

// Editar foto do perfil
function editarFoto() {
    document.getElementById("form-foto").style.display = "block";
}

// Alterar foto do perfil
function alterarFoto() {
    const novaFoto = document.getElementById("nova-foto").files[0];
    if (novaFoto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("fotoperfil").src = e.target.result;
        };
        reader.readAsDataURL(novaFoto);
    }
    document.getElementById("form-foto").style.display = "none";
}

// Cancelar edição
function cancelarEdicao(formId) {
    document.getElementById(formId).style.display = "none";
}

// Fotos adicionais
function editarFotosAdicionais() {
    document.getElementById("form-fotos-adicionais").style.display = "block";

    // Mostrar botões
    const removerButtons = document.querySelectorAll(".remover");
    removerButtons.forEach((button) => {
        button.style.display = "block";
    });
}

function alterarFotosAdicionais() {
    const novasFotos = document.getElementById("nova-foto-adicional").files;
    const fotosContainer = document.getElementById("fotos-container");

    if (fotosContainer.children.length + novasFotos.length > MAX_FOTOS) {
        alert("Limite de fotos atingido. Remova fotos para ter espaço.");
        return;
    }

    Array.from(novasFotos).forEach((foto) => {
        if (fotosContainer.children.length < MAX_FOTOS) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fotoItem = document.createElement("div");
                fotoItem.classList.add("foto-item");

                const img = document.createElement("img");
                img.src = e.target.result;
                img.alt = `Foto adicional ${fotosContainer.children.length + 1}`;
                img.classList.add("foto-adicional");
                img.onclick = function () {
                    visualizarFoto(img);
                };

                const btnRemover = document.createElement("button");
                btnRemover.classList.add("remover");
                btnRemover.textContent = "Remover";
                btnRemover.style.display = "block";
                btnRemover.onclick = function () {
                    removerFoto(btnRemover);
                };

                fotoItem.appendChild(img);
                fotoItem.appendChild(btnRemover);
                fotosContainer.appendChild(fotoItem);
            };
            reader.readAsDataURL(foto);
        }
    });

    document.getElementById("form-fotos-adicionais").style.display = "none";
}

function removerFoto(button) {
    const fotoItem = button.parentElement;
    fotoItem.remove();
}

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

// Dados de contato
function editarDados(sectionId) {
    const form = document.getElementById(`form-${sectionId}`);
    form.style.display = "block";
}

function alterarDados(sectionId) {
    const form = document.getElementById(`form-${sectionId}`);
    const section = document.getElementById(sectionId);

    form.querySelectorAll("input, textarea").forEach((input) => {
        const spanId = input.id.replace("-input", "");
        const span = document.getElementById(spanId);
        if (span) {
            span.textContent = input.value || span.textContent;
        }
    });

    form.style.display = "none";
}

// Cancelar edição de dados
function cancelarEdicaoDados(formId) {
    document.getElementById(formId).style.display = "none";
}

// Lógica principal da página
document.addEventListener("DOMContentLoaded", () => {
});
