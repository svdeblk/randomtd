const board = document.getElementById('board');
const iconContainer = document.getElementById('icon-container');

const towers = [
    { name: 'Rebuild', icon: 'img/towers/rebuild.png' },
    // { name: 'Reactor', icon: 'img/towers/reactor.png' },
    // { name: 'Hammer', icon: 'img/towers/hammer.png' },
    // ... add more towers
];

// Create grid cells
for (let i = 0; i < 15; i++) { 
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Make cells droppable
    cell.addEventListener('dragover', (event) => {
        event.preventDefault();
        if (cell.childNodes.length === 0 && event.dataTransfer.getData('text/plain') !== cell.querySelector('img')?.alt) { 
            cell.classList.add('highlight'); 
        }
    });

    cell.addEventListener('dragleave', (event) => {
        if (cell.childNodes.length === 0) {
            cell.classList.remove('highlight');
        }
    });

    cell.addEventListener('drop', (event) => {
        event.preventDefault();
        if (cell.childNodes.length > 0) { 
            return; 
        }
        const towerName = event.dataTransfer.getData('text/plain'); 
        const img = document.createElement('img');
        img.src = `img/towers/${towerName.toLowerCase()}.png`; 
        img.alt = towerName;
        img.classList.add('tower-icon');

        img.addEventListener('click', () => {
            cell.removeChild(img); 
            cell.classList.remove('highlight'); 
        });

        cell.appendChild(img); 

        img.draggable = false; 
    });

    board.appendChild(cell);
}

// Create tower icons
towers.forEach(tower => {
    const img = document.createElement('img');
    img.src = tower.icon;
    img.alt = tower.name;
    img.classList.add('tower-icon'); 
    img.draggable = true;

    img.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', tower.name); 
    });

    iconContainer.appendChild(img);
});