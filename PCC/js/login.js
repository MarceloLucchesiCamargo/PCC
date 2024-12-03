async function showPopup(popupName) {
    try {
        
        let popupContainer = document.getElementById(`${popupName}-container`);
        if (popupContainer) {
            popupContainer.style.display = 'flex';
            return;
        }
        
        const response = await fetch(`./popups/${popupName}.html`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${popupName}: ${response.statusText}`);
        }

        const popupHTML = await response.text();
        popupContainer = document.createElement('div');
        popupContainer.id = `${popupName}-container`;
        popupContainer.innerHTML = popupHTML;
        document.getElementById('popup-container').appendChild(popupContainer);

        popupContainer.querySelectorAll('.close').forEach((btn) => {
            btn.addEventListener('click', () => closePopup(popupName));
        });

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

function closePopup(popupName) {
    const popupContainer = document.getElementById(`${popupName}-container`);
    if (popupContainer) {
        popupContainer.style.display = 'none';
    } else {
        console.error(`Popup "${popupName}-container" não encontrado.`);
    }
}
