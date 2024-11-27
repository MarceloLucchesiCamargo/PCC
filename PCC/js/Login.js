// Função para carregar o popup dinamicamente e exibi-lo
async function showPopup(popupName) {
    try {
        // Verifica se o popup já foi carregado
        let popupContainer = document.getElementById(`${popupName}-container`);
        if (popupContainer) {
            popupContainer.style.display = 'flex'; // Se já estiver carregado, apenas exibe
            return;
        }

        // Faz a requisição para buscar o HTML do popup
        const response = await fetch(`./popups/${popupName}.html`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${popupName}: ${response.statusText}`);
        }

        // Obtém o conteúdo do popup e insere na página
        const popupHTML = await response.text();
        popupContainer = document.createElement('div'); // Cria um contêiner para o popup
        popupContainer.id = `${popupName}-container`;
        popupContainer.innerHTML = popupHTML;
        document.getElementById('popup-container').appendChild(popupContainer);

        // Adiciona evento de fechar ao botão (dinâmico)
        popupContainer.querySelectorAll('.close').forEach((btn) => {
            btn.addEventListener('click', () => closePopup(popupName));
        });

        // Mostra o popup
        const popupElement = popupContainer.querySelector('.popup');
        if (popupElement) {
            popupElement.style.display = 'flex';
        } else {
            console.error(`Popup "${popupName}" não possui a classe "popup".`);
        }
    } catch (error) {
        console.error(error);
    }
}

// Função para fechar o popup e remover o conteúdo da página
function closePopup(popupName) {
    const popupContainer = document.getElementById(`${popupName}-container`);
    if (popupContainer) {
        popupContainer.style.display = 'none'; // Esconde o popup
    } else {
        console.error(`Popup "${popupName}-container" não encontrado.`);
    }
}
