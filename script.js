// ================================
// CHERRY TREE CLICKER
// ================================

// VARIABLES
let clicks = 0;
let selectedTree = "beige";

// ================================
// ARBRES DISPONIBLES
// ================================

const trees = [
    {
        id: "beige",
        name: "Arbre beige",
        color: "#dfc9b2",
        unlock: 0
    },
    {
        id: "blue",
        name: "Arbre bleu",
        color: "#8eabc2",
        unlock: 100
    },
    {
        id: "brown",
        name: "Arbre brun",
        color: "#90684f",
        unlock: 300
    },
    {
        id: "black",
        name: "Arbre noir",
        color: "#393638",
        unlock: 700
    },
    {
        id: "purple",
        name: "Arbre violet",
        color: "#a28bbd",
        unlock: 1500
    },
    {
        id: "white",
        name: "Arbre blanc",
        color: "#eee9e3",
        unlock: 3000
    }
];

// ================================
// VÉRIFIER SI UN ARBRE EST DÉBLOQUÉ
// ================================

function isUnlocked(tree) {
    return clicks >= tree.unlock;
}

// ================================
// CHANGER LA COULEUR DE L'ARBRE
// ================================

function selectTree(id) {
    const tree = trees.find(t => t.id === id);

    if (!tree || !isUnlocked(tree)) {
        return;
    }

    selectedTree = id;

    document.querySelector("#trunk").style.setProperty(
        "--treeColor",
        tree.color
    );

    document.querySelector("#branch").style.setProperty(
        "--treeColor",
        tree.color
    );

    updateGame();
}

// ================================
// METTRE À JOUR LA BOUTIQUE
// ================================

function updateShop() {
    const shop = document.querySelector("#treeShop");

    shop.innerHTML = "";

    trees.forEach(tree => {
        const card = document.createElement("div");
        card.classList.add("tree-card");

        const unlocked = isUnlocked(tree);
        const selected = selectedTree === tree.id;

        card.innerHTML = `
            <h3>${tree.name}</h3>
            <p>Clics nécessaires : ${tree.unlock}</p>
            <p>${unlocked ? "Débloqué !" : "Verrouillé 🔒"}</p>
        `;

        const button = document.createElement("button");

        if (selected) {
            button.textContent = "Sélectionné";
            button.disabled = true;
        } else if (unlocked) {
            button.textContent = "Sélectionner";
            button.addEventListener("click", () => {
                selectTree(tree.id);
            });
        } else {
            button.textContent = "Verrouillé";
            button.disabled = true;
        }

        card.appendChild(button);
        shop.appendChild(card);
    });
}

// ================================
// METTRE À JOUR LE JEU
// ================================

function updateGame() {
    document.querySelector("#clickCount").textContent =
        "Clics : " + clicks;

    updateShop();
}

// ================================
// JET DE SÈVE BLANCHE
// ÉCLABOUSSURE DANS TOUS LES SENS
// ================================

function createSap(x, y) {

    const amount = 25;

    for (let i = 0; i < amount; i++) {

        const sap = document.createElement("div");
        sap.classList.add("sap");

        sap.style.left = x + "px";
        sap.style.top = y + "px";

        // Direction aléatoire à 360 degrés
        const angle = Math.random() * Math.PI * 2;

        // Distance de propulsion
        const distance = 100 + Math.random() * 300;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        sap.style.setProperty("--sapX", moveX + "px");
        sap.style.setProperty("--sapY", moveY + "px");

        // Taille aléatoire
        const size = 5 + Math.random() * 13;

        sap.style.width = size + "px";
        sap.style.height = size + "px";

        document.querySelector("#treeArea").appendChild(sap);

        setTimeout(() => {
            sap.remove();
        }, 900);
    }
}

// ================================
// CLIC SUR L'ARBRE
// ================================

document.querySelector("#treeArea").addEventListener("click", (event) => {

    clicks++;

    const rect = document.querySelector("#treeArea").getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Créer l'éclaboussure
    createSap(x, y);

    // Actualiser les clics et les arbres débloqués
    updateGame();
});

// ================================
// OUVRIR LA BOUTIQUE
// ================================

document.querySelector("#menuButton").addEventListener("click", () => {
    document.querySelector("#shop").classList.add("open");
});

// ================================
// FERMER LA BOUTIQUE
// ================================

document.querySelector("#closeShop").addEventListener("click", () => {
    document.querySelector("#shop").classList.remove("open");
});

// ================================
// DÉMARRAGE DU JEU
// ================================

selectTree("beige");
updateGame();
