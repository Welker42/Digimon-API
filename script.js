document.addEventListener('DOMContentLoaded', () => {
    const digimonContainer = document.getElementById('digimon-container');
    const searchInput = document.getElementById('search-input');
    const apiUrl = 'https://digimon-api.vercel.app/api/digimon';

    let digimons = [];

    // Função para exibir Digimons
    const displayDigimons = (digimonList) => {
        digimonContainer.innerHTML = '';
        digimonList.forEach(digimon => {
            const digimonCard = document.createElement('div');
            digimonCard.className = 'digimon-card';

            const digimonImage = document.createElement('img');
            digimonImage.src = digimon.img;
            digimonImage.alt = digimon.name;

            const digimonName = document.createElement('h2');
            digimonName.textContent = digimon.name;

            digimonCard.appendChild(digimonImage);
            digimonCard.appendChild(digimonName);

            digimonContainer.appendChild(digimonCard);
        });
    };

    // Função para filtrar Digimons
    const filterDigimons = () => {
        const searchValue = searchInput.value.toLowerCase();
        const filteredDigimons = digimons.filter(digimon =>
            digimon.name.toLowerCase().includes(searchValue)
        );
        displayDigimons(filteredDigimons);
    };

    // Buscar e exibir Digimons
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            digimons = data;
            displayDigimons(digimons);
        })
        .catch(error => {
            console.error('Erro ao buscar dados dos Digimons:', error);
        });

    // Adicionar listener para a barra de pesquisa
    searchInput.addEventListener('input', filterDigimons);
});
