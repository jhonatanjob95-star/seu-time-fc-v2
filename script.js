// Dados de exemplo dos jogadores
const players = [
    { name: "Carlos Mendes", position: "Goleiro", instagram: "#" },
    { name: "André Oliveira", position: "Goleiro", instagram: "#" },
    { name: "Rafael Souza", position: "Defensor", instagram: "#" },
    { name: "Lucas Ferreira", position: "Defensor", instagram: "#" },
    { name: "Marcos Silva", position: "Defensor", instagram: "#" },
    { name: "Thiago Costa", position: "Meio-campista", instagram: "#" },
    { name: "Bruno Almeida", position: "Meio-campista", instagram: "#" },
    { name: "Diego Santos", position: "Meio-campista", instagram: "#" },
    { name: "Felipe Rocha", position: "Atacante", instagram: "#" },
    { name: "Gabriel Lima", position: "Atacante", instagram: "#" },
    { name: "Henrique Martins", position: "Atacante", instagram: "#" },
    { name: "Igor Pereira", position: "Atacante", instagram: "#" }
];

let currentFilter = "all";
let currentSearch = "";

const playersContainer = document.getElementById("players-container");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function renderPlayers() {
    const filtered = players.filter(player => {
        const matchesPosition = currentFilter === "all" || player.position === currentFilter;
        const matchesSearch = player.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesPosition && matchesSearch;
    });

    playersContainer.innerHTML = "";

    if (filtered.length === 0) {
        playersContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #D4AF37; font-size: 1.2rem;">Nenhum jogador encontrado.</p>';
        return;
    }

    filtered.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";
        card.innerHTML = `
            <div class="player-photo">⚽</div>
            <h3>${player.name}</h3>
            <p class="position">${player.position}</p>
            <a href="${player.instagram}" class="instagram-btn" target="_blank" rel="noopener">Ver Instagram</a>
        `;
        playersContainer.appendChild(card);
    });
}

function setActiveFilter(button) {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderPlayers();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.position;
        setActiveFilter(button);
        renderPlayers();
    });
});

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Fechar menu ao clicar em um link (mobile)
document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// Inicializar
renderPlayers();
