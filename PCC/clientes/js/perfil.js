function editarFoto() {
    document.getElementById("form-foto").style.display = "block";
}

function alterarFoto() {
    const novaFoto = document.getElementById("nova-foto").files[0];
    if (novaFoto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector("#foto img").src = e.target.result;
        };
        reader.readAsDataURL(novaFoto);
    }
    document.getElementById("form-foto").style.display = "none";
}

function editarDados(secao) {
    const form = document.getElementById(`form-${secao}`);
    form.style.display = "block";
}

function alterarDados(secao) {
    const inputs = document.querySelectorAll(`#form-${secao} input`);
    inputs.forEach((input) => {
        const spanId = input.id.replace("-input", "");
        document.getElementById(spanId).textContent = input.value || input.placeholder;
    });
    document.getElementById(`form-${secao}`).style.display = "none";
}

function cancelarEdicao(formId) {
    document.getElementById(formId).style.display = "none";
}
