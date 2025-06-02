let score = 0;
let jeuTerminé = false;
let joueur = document.getElementById("player");
let affichageScore = document.getElementById("score");
let positionJoueur = { x: 10, y: 0 };
let surEscalier = false;
let etageSuperieur = false;

document.addEventListener('keydown', function(event) {
    if (event.key.startsWith('Arrow')) {
        event.preventDefault(); 
    }
});


let quetes = [
    {
        id: "frigo_ouvert",
        objectif: "Ferme la porte du frigo si elle est restée ouverte.",
        choix1: "Fermer la porte du frigo",
        choix2: "Laisser la porte ouverte",
        choix3: "Prendre un jus puis fermer",
        effet1: -15,
        effet2: +10,
        effet3: -10
    },
    {
        id: "lumiere_cuisine",
        objectif: "Éteins la lumière en quittant la cuisine.",
        choix1: "Éteindre la lumière",
        choix2: "Laisser la lumière allumée",
        choix3: "Baisser l’intensité",
        effet1: -10,
        effet2: +10,
        effet3: -5
    },
    {
        id: "tv",
        objectif: "Éteins la télévision si personne ne regarde.",
        choix1: "Éteindre la TV",
        choix2: "Laisser la TV allumée",
        choix3: "Baisser le volume",
        effet1: -10,
        effet2: +12,
        effet3: -2
    },
    {
        id: "console",
        objectif: "Éteins la console ou l’ordinateur après avoir joué.",
        choix1: "Éteindre la console",
        choix2: "Mettre en veille",
        choix3: "Continuer à jouer",
        effet1: -12,
        effet2: -5,
        effet3: +15
    },
    {
        id: "rideaux_salon",
        objectif: "Ferme les rideaux pour garder la chaleur dans le salon.",
        choix1: "Fermer les rideaux",
        choix2: "Laisser ouverts",
        choix3: "Fermer à moitié",
        effet1: -10,
        effet2: 0,
        effet3: -5
    },
    {
        id: "chauffage_salon",
        objectif: "Baisse le chauffage si la pièce est vide.",
        choix1: "Baisser le chauffage",
        choix2: "Laisser tel quel",
        choix3: "Augmenter un peu",
        effet1: -12,
        effet2: 0,
        effet3: +10
    },
    {
        id: "chargeur",
        objectif: "Débranche le chargeur quand c’est chargé.",
        choix1: "Débrancher le chargeur",
        choix2: "Laisser branché",
        choix3: "Utiliser l’appareil",
        effet1: -8,
        effet2: +5,
        effet3: 0
    },
    {
        id: "lumiere_chambre",
        objectif: "Éteins la lumière avant de quitter la chambre.",
        choix1: "Éteindre la lumière",
        choix2: "Laisser allumée",
        choix3: "Baisser l’intensité",
        effet1: -10,
        effet2: +10,
        effet3: -5
    },
    {
        id: "rideaux_chambre",
        objectif: "Ferme les rideaux ou volets pour garder la chaleur.",
        choix1: "Fermer rideaux/volets",
        choix2: "Laisser ouverts",
        choix3: "Fermer à moitié",
        effet1: -10,
        effet2: 0,
        effet3: -5
    },
    {
        id: "veilleuse",
        objectif: "Éteins la veilleuse dans la chambre",
        choix1: "Éteindre la veilleuse",
        choix2: "Laisser allumée",
        choix3: "Baisser l’intensité",
        effet1: -8,
        effet2: +5,
        effet3: -3
    },
    {
        id: "pull",
        objectif: "Il fait froid, va dans ta chambre si tu veux mettre un pull ou augmenter le chauffage",
        choix1: "Mettre un pull",
        choix2: "Augmenter le chauffage",
        choix3: "Rien faire",
        effet1: -10,
        effet2: +15,
        effet3: 0
    },
    {
        id: "lumiere_sdb",
        objectif: "Éteins la lumière en sortant de la salle de bain.",
        choix1: "Éteindre la lumière",
        choix2: "Laisser allumée",
        choix3: "Baisser l’intensité",
        effet1: -8,
        effet2: +8,
        effet3: -3
    },
    {
        id: "fenetre",
        objectif: "Ferme les fenêtres pour ne pas laisser entrer le froid.",
        choix1: "Fermer la fenêtre",
        choix2: "Laisser ouverte",
        choix3: "Entre-ouverte",
        effet1: -15,
        effet2: +10,
        effet3: -5
    },
    {
        id: "lumiere_maison",
        objectif: "Éteins les lumières dans toutes les pièces vides.",
        choix1: "Tout éteindre",
        choix2: "Ne rien faire",
        choix3: "Éteindre quelques pièces",
        effet1: -25,
        effet2: 0,
        effet3: -12
    }
];

let queteActuelle = 0;

const objets = [
    { id: "frigo", x: 2, y: 50 },
    { id: "frigo_ouvert", x: 1.15, y: 50.2 },
    { id: "lumiere_cuisine", x: 47, y: 70 },
    { id: "tv", x: 87, y: 68.5 },
    { id: "console", x: 89, y: 59 },
    { id: "rideaux_salon", x: 65, y: 70 },
    { id: "chauffage_salon", x: 80, y: 68 },
    { id: "chargeur", x: 65, y: 0 },
    { id: "lumiere_chambre", x: 59, y: 15 },
    { id: "rideaux_chambre", x: 70, y: 5 },
    { id: "veilleuse", x: 90, y: 5 },
    { id: "pull", x: 85, y: 5 },
    { id: "lumiere_sdb", x: 39, y: 15 },
    { id: "fenetre", x: 69, y: 70 },
    { id: "lumiere_salon", x: 55, y: 70 }
];

function afficherQuete() {
    const quete = quetes[queteActuelle];
    const texte = quete
        ? "Quête actuelle : " + quete.objectif
        : "Toutes les quêtes sont terminées !";
    document.getElementById("quete").textContent = texte;
    mettreAJourEtatFrigo();
}
afficherQuete();

document.addEventListener("keydown", function(event) {
    const touche = event.key.toLowerCase();

    if (touche === "arrowleft" && (!(surEscalier && positionJoueur.y > 0) || etageSuperieur)) déplacerJoueur(-5, 0);
    if (touche === "arrowright" && (!(surEscalier && positionJoueur.y > 0) || etageSuperieur)) déplacerJoueur(5, 0);
    etageSuperieur = positionJoueur.y >= 50;
    if (touche === "arrowup" && surEscalier) déplacerJoueur(0, 5);
    if (touche === "arrowdown" && surEscalier && positionJoueur.y > 0) déplacerJoueur(0, -5);
    if (!surEscalier && positionJoueur.y > 10) déplacerJoueur(0, -5);

    vérifierInteraction();  
});

function déplacerJoueur(dx, dy) {
    if (jeuTerminé) return;

    positionJoueur.x += dx;

    if (surEscalier) {
        positionJoueur.y += dy;
        if (positionJoueur.y < 0) positionJoueur.y = 0;
        if (positionJoueur.y > 50) positionJoueur.y = 50;
    } else {
        if (positionJoueur.y < 0) positionJoueur.y = 0;
        if (positionJoueur.y > 90) positionJoueur.y = 90;
    }

    if (positionJoueur.x < 0) positionJoueur.x = 0;
    if (positionJoueur.x > 95) positionJoueur.x = 95;

    joueur.style.left = `${positionJoueur.x}%`;
    joueur.style.bottom = `${positionJoueur.y}%`;

    let escalier = document.getElementById("staircase");
    let rectEscalier = escalier.getBoundingClientRect();
    let rectJoueur = joueur.getBoundingClientRect();
    let margeToleree = 30;

    surEscalier = !(
        rectJoueur.right < rectEscalier.left ||
        rectJoueur.left > rectEscalier.right ||
        rectJoueur.bottom < rectEscalier.top - margeToleree ||
        rectJoueur.top > rectEscalier.bottom + margeToleree
    );
}


let fenetreVisible = false;  

function vérifierInteraction() {
    let quete = quetes[queteActuelle];
    if (!quete) return;

    let objetElement = document.getElementById(quete.id);
    let rectObjet = objetElement.getBoundingClientRect();
    let rectJoueur = joueur.getBoundingClientRect();

    let procheDeObjet = !(
        rectJoueur.right < rectObjet.left ||
        rectJoueur.left > rectObjet.right ||
        rectJoueur.bottom < rectObjet.top ||
        rectJoueur.top > rectObjet.bottom
    );

    if (procheDeObjet && !fenetreVisible) {
        afficherFenetreChoix(quete);
        fenetreVisible = true;
    }

    if (!procheDeObjet && fenetreVisible) {
        cacherFenetreChoix();
        fenetreVisible = false;
    }
}


function afficherFenetreChoix(quete) {
    const fenetre = document.getElementById("fenetre-choix");
    const texteChoix = document.getElementById("texte-choix");
    const choix1 = document.getElementById("choix-1");
    const choix2 = document.getElementById("choix-2");
    const choix3 = document.getElementById("choix-3");

    texteChoix.textContent = "Que souhaites-tu faire ?";

    choix1.textContent = `1. ${quete.choix1} (Touche 1)`;
    choix2.textContent = `2. ${quete.choix2} (Touche 2)`;
    choix3.textContent = `3. ${quete.choix3} (Touche 3)`;

    fenetre.style.display = "block";
    fenetre.style.animation = "none";
    fenetre.offsetHeight; 
    fenetre.style.animation = "slideInRPG 0.6s ease-out forwards";  

    const choixHandler = function(event) {
        if (event.key === "1") {
            mettreAJourScore(quete.effet1);
            queteActuelle++;
            afficherQuete();
            cacherFenetreChoix();
        } else if (event.key === "2") {
            mettreAJourScore(quete.effet2);
            queteActuelle++;
            afficherQuete();
            cacherFenetreChoix();
        } else if (event.key === "3") {
            mettreAJourScore(quete.effet3);
            queteActuelle++;
            afficherQuete();
            cacherFenetreChoix();
        }
    };

    document.removeEventListener("keydown", choixHandler);
    document.addEventListener("keydown", choixHandler);
}

function cacherFenetreChoix() {
    const fenetre = document.getElementById("fenetre-choix");
    fenetre.style.display = "none";
}

function mettreAJourScore(montant) {
    score += montant;
    affichageScore.textContent = `${score} Wh`;
}

function creerFlocon() {
    const flocon = document.createElement('div');
    flocon.classList.add('snowflake');
    flocon.textContent = '❄️';
    flocon.style.left = Math.random() * window.innerWidth + 'px';
    flocon.style.fontSize = (Math.random() * 10 + 10) + 'px';
    document.body.appendChild(flocon);

    setTimeout(() => {
        flocon.remove();
    }, 7000);
}

function mettreAJourEtatFrigo() {
    const queteActuelle = document.getElementById("quete").textContent;

    const frigoFerme = document.getElementById("frigo");
    const frigoOuvert = document.getElementById("frigo_ouvert");

    if (queteActuelle.includes("porte du frigo") && queteActuelle.includes("ouverte")) {
        frigoFerme.style.display = "none";
        frigoOuvert.style.display = "block";
    } else {
        frigoFerme.style.display = "block";
        frigoOuvert.style.display = "none";
    }
}


setInterval(creerFlocon, 200);

objets.forEach(obj => {
    let objetElement = document.getElementById(obj.id);
    objetElement.style.left = `${obj.x}%`;
    objetElement.style.bottom = `${obj.y}%`;
});
