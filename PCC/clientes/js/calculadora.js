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
    caminhaoDiesel: 0.25,
    caminhaoEletrico: 0.05,
    onibusDiesel: 0.15,
    onibusEletrico: 0.04,
    carroGasolina: 0.2,
    carroEletrico: 0.02,
    moto: 0.1,
    onibus: 0.05,
    aviaoCurto: 0.15,
};

const pegadaAceitavelPessoa = 208;
const pegadaAceitavelEmpresa = {
    micro: 500, // Microempresa
    pequeno: 2500, // Pequena empresa
    medio: 10000, // Média empresa
    grande: 30000, // Grande empresa
};

document.getElementById("tipo-usuario").addEventListener("change", function () {
    const tipo = this.value;
    
    document.getElementById("formulario-pessoa").style.display = tipo === "pessoa" ? "block" : "none";
    document.getElementById("formulario-empresa").style.display = tipo === "empresa" ? "block" : "none";
    
    document.querySelector(".dicas-pessoa").style.display = "none";
    document.querySelector(".dicas-empresa").style.display = "none";
    document.getElementById("resultado-final").textContent = "";
});

document.getElementById("calcular-btn").addEventListener("click", function () {
    const tipoUsuario = document.getElementById("tipo-usuario").value;

    if (tipoUsuario === "pessoa") {
        const estado = document.getElementById("estado-pessoa").value;
        const kmMoto = parseFloat(document.getElementById("km-moto").value) || 0;
        const kmOnibus = parseFloat(document.getElementById("km-onibus").value) || 0;
        const energia = parseFloat(document.getElementById("energia-pessoa").value) || 0;
        const diasCarne = parseFloat(document.getElementById("dias-carne-pessoa").value) || 0;

        const fatores = fatoresEstado[estado] || { energia: 0.15 };

        const emissaoMoto = kmMoto * fatoresTransporte.moto;
        const emissaoOnibus = kmOnibus * fatoresTransporte.onibus;
        const emissaoEnergia = energia * fatores.energia;
        const emissaoCarne = diasCarne * 4 * 3;

        const total = emissaoMoto + emissaoOnibus + emissaoEnergia + emissaoCarne;

        const classificacao =
            total < pegadaAceitavelPessoa
                ? "<span style='color: green;'>Baixo</span>"
                : total <= pegadaAceitavelPessoa * 1.5
                ? "<span style='color: orange;'>Na média</span>"
                : "<span style='color: red;'>Alto</span>";

        document.getElementById(
            "resultado-final"
        ).innerHTML = `Sua pegada de carbono mensal é de aproximadamente ${total.toFixed(
            2
        )} kg CO₂e (${classificacao}). <br> Pegada aceitável: ${pegadaAceitavelPessoa} kg CO₂e/mês.`;

        document.querySelector(".dicas-pessoa").style.display = "block";
        document.querySelector(".dicas-empresa").style.display = "none";
    }

    if (tipoUsuario === "empresa") {
        const estado = document.getElementById("estado-empresa").value;
        const porteEmpresa = document.getElementById("porte-empresa").value;
        const kmCaminhaoDiesel = parseFloat(document.getElementById("km-caminhao-diesel").value) || 0;
        const kmCaminhaoEletrico = parseFloat(document.getElementById("km-caminhao-eletrico").value) || 0;
        const kmOnibusDiesel = parseFloat(document.getElementById("km-onibus-diesel").value) || 0;
        const kmOnibusEletrico = parseFloat(document.getElementById("km-onibus-eletrico").value) || 0;
        const kmCarroGasolina = parseFloat(document.getElementById("km-carro-gasolina").value) || 0;
        const kmCarroEletrico = parseFloat(document.getElementById("km-carro-eletrico").value) || 0;
        const energia = parseFloat(document.getElementById("energia-empresa").value) || 0;

        const fatores = fatoresEstado[estado] || { energia: 0.15 };

        const emissaoCaminhaoDiesel = kmCaminhaoDiesel * fatoresTransporte.caminhaoDiesel;
        const emissaoCaminhaoEletrico = kmCaminhaoEletrico * fatoresTransporte.caminhaoEletrico;
        const emissaoOnibusDiesel = kmOnibusDiesel * fatoresTransporte.onibusDiesel;
        const emissaoOnibusEletrico = kmOnibusEletrico * fatoresTransporte.onibusEletrico;
        const emissaoCarroGasolina = kmCarroGasolina * fatoresTransporte.carroGasolina;
        const emissaoCarroEletrico = kmCarroEletrico * fatoresTransporte.carroEletrico;
        const emissaoEnergia = energia * fatores.energia;

        const total =
            emissaoCaminhaoDiesel +
            emissaoCaminhaoEletrico +
            emissaoOnibusDiesel +
            emissaoOnibusEletrico +
            emissaoCarroGasolina +
            emissaoCarroEletrico +
            emissaoEnergia;

        const aceitavelEmpresa = pegadaAceitavelEmpresa[porteEmpresa];

        const classificacao =
            total < aceitavelEmpresa
                ? "<span style='color: green;'>Baixo</span>"
                : total <= aceitavelEmpresa * 1.5
                ? "<span style='color: orange;'>Na média</span>"
                : "<span style='color: red;'>Alto</span>";

        document.getElementById(
            "resultado-final"
        ).innerHTML = `A pegada de carbono mensal da empresa é de aproximadamente ${total.toFixed(
            2
        )} kg CO₂e (${classificacao}). <br> Pegada aceitável para ${porteEmpresa}: ${aceitavelEmpresa} kg CO₂e/mês.`;

        document.querySelector(".dicas-empresa").style.display = "block";
        document.querySelector(".dicas-pessoa").style.display = "none";
    }
});
