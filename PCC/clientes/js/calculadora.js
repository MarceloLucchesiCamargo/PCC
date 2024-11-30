const fatoresEstado = {
    AC: { energia: 0.15 },
    AL: { energia: 0.10 },
    AP: { energia: 0.12 },
    AM: { energia: 0.08 },
    BA: { energia: 0.10 },
    CE: { energia: 0.09 },
    DF: { energia: 0.11 },
    ES: { energia: 0.13 },
    GO: { energia: 0.14 },
    MA: { energia: 0.09 },
    MT: { energia: 0.16 },
    MS: { energia: 0.14 },
    MG: { energia: 0.12 },
    PA: { energia: 0.07 },
    PB: { energia: 0.10 },
    PR: { energia: 0.11 },
    PE: { energia: 0.10 },
    PI: { energia: 0.11 },
    RJ: { energia: 0.09 },
    RN: { energia: 0.10 },
    RS: { energia: 0.11 },
    RO: { energia: 0.13 },
    RR: { energia: 0.14 },
    SC: { energia: 0.10 },
    SP: { energia: 0.08 },
    SE: { energia: 0.11 },
    TO: { energia: 0.15 },
};

const fatoresTransporte = {
    carroGasolina: 0.2,
    moto: 0.1,
    onibus: 0.05,
    caminhao: 0.25,
    aviaoCurto: 0.15,
};

document.getElementById("tipo-usuario").addEventListener("change", function () {
    const tipo = this.value;
    document.getElementById("formulario-pessoa").style.display = tipo === "pessoa" ? "block" : "none";
    document.getElementById("formulario-empresa").style.display = tipo === "empresa" ? "block" : "none";
});

document.getElementById("calcular-btn").addEventListener("click", function () {
    const tipoUsuario = document.getElementById("tipo-usuario").value;

    if (tipoUsuario === "pessoa") {
        const estado = document.getElementById("estado-pessoa").value;
        const kmCarroGasolina = parseFloat(document.getElementById("km-carro-gasolina").value) || 0;
        const kmMoto = parseFloat(document.getElementById("km-moto").value) || 0;
        const kmOnibus = parseFloat(document.getElementById("km-onibus").value) || 0;
        const energia = parseFloat(document.getElementById("energia-pessoa").value) || 0;
        const diasCarne = parseFloat(document.getElementById("dias-carne-pessoa").value) || 0;

        const fatores = fatoresEstado[estado] || { energia: 0.15 };

        const emissaoCarroGasolina = kmCarroGasolina * fatoresTransporte.carroGasolina;
        const emissaoMoto = kmMoto * fatoresTransporte.moto;
        const emissaoOnibus = kmOnibus * fatoresTransporte.onibus;
        const emissaoEnergia = energia * fatores.energia;
        const emissaoCarne = diasCarne * 4 * 3;

        const total = emissaoCarroGasolina + emissaoMoto + emissaoOnibus + emissaoEnergia + emissaoCarne;

        document.getElementById("resultado-final").textContent = `Sua pegada de carbono mensal é de aproximadamente ${total.toFixed(2)} kg CO₂e.`;
    }

    if (tipoUsuario === "empresa") {
        const estado = document.getElementById("estado-empresa").value;
        const kmFrotaCaminhao = parseFloat(document.getElementById("km-frota-caminhao").value) || 0;
        const kmAviaoCurto = parseFloat(document.getElementById("km-aviao-curto").value) || 0;
        const energia = parseFloat(document.getElementById("energia-empresa").value) || 0;

        const fatores = fatoresEstado[estado] || { energia: 0.15 };

        const emissaoFrotaCaminhao = kmFrotaCaminhao * fatoresTransporte.caminhao;
        const emissaoAviaoCurto = kmAviaoCurto * fatoresTransporte.aviaoCurto;
        const emissaoEnergia = energia * fatores.energia;

        const total = emissaoFrotaCaminhao + emissaoAviaoCurto + emissaoEnergia;

        document.getElementById("resultado-final").textContent = `A pegada de carbono mensal da empresa é de aproximadamente ${total.toFixed(2)} kg CO₂e.`;
    }
});

document.getElementById("calcular-btn").addEventListener("click", function () {
    const tipoUsuario = document.getElementById("tipo-usuario").value;

    document.querySelector(".dicas-pessoa").style.display = tipoUsuario === "pessoa" ? "block" : "none";
    document.querySelector(".dicas-empresa").style.display = tipoUsuario === "empresa" ? "block" : "none";
});
