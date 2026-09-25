/* =========================================================================
   CONTENU : tout le texte du site est ici. C'est le seul fichier à modifier
   pour changer un texte, une date, une photo ou un membre de l'équipe.
   Un champ vide (null / absent) n'est jamais affiché.
   ========================================================================= */
const CONTACT = {
  email: "compagnie.cliffhanger@gmail.com",
  instagram: "https://www.instagram.com/compagnie.cliffhanger/",
  facebook: "https://www.facebook.com/100057761165578/",
};

// hero / poster / slides : nom des photos dans img/, sans extension (le site sert les versions WebP)
// dates : une ligne par représentation ; l'agenda les regroupe par série
const SHOWS = [
  {
    slug: "linedit-de-moliere", title: "L'Inédit de Molière", year: 2026, by: "Compagnie Cliffhanger",
    hero: "bleu", focus: "50% 22%", credit: null,
    punch: "Entre cupidité, séduction et ruse, qui donc parviendra à tirer son épingle du jeu ?",
    poster: "affiche-inedit",
    text: [
      "Brigands, impostures, larcins, farces et autres joyeuses fourberies : tous les ingrédients chers à Molière se mêlent sous la plume de Marie-Hélène Ruiz, qui tisse, à partir d'extraits du maître, une intrigue entièrement inédite.",
      "Vadius, Lépine, Criquet et Vénus complotent pour mettre la main sur la fortune du Comte, tandis que les filles de celui-ci rêvent plutôt de conquérir le cœur de deux galants complices. Entre cupidité, séduction et ruse, qui donc parviendra à tirer son épingle du jeu ?",
    ],
    slides: [["groupe", "La troupe"], ["bleu", "L'Inédit de Molière"], ["affiche-inedit-2", "Affiche"]],
    credits: [
      ["Texte", "Marie-Hélène Ruiz"],
      ["Mise en scène", "collective, sous la direction d'Alizé Cookie"],
      ["Avec", "Ildikó Ács, Audrey Colomb, Alizé Cookie, Sophie Decaestecker, Thomas Kesmarki, Nathan Leclercq et Hugo Ortiz"],
    ],
    dates: [
      { day: "2026-04-17", time: "20:00", venue: "Théâtre L'Improviste", city: "Forest", country: "Belgique", price: "12 €" },
      { day: "2026-04-18", time: "20:00", venue: "Théâtre L'Improviste", city: "Forest", country: "Belgique", price: "12 €" },
    ],
  },
  {
    slug: "un-choeur-silencieux", title: "Un C(h)œur silencieux", year: 2025, by: "Collectif Cliffhanger de Montréal",
    hero: "choeur-duo", focus: "50% 40%", credit: null,
    punch: "Quand tout n'est plus que bruit, notre musique peut-elle encore vibrer ?",
    poster: "affiche-choeur",
    text: [
      "Une chanteuse brillante en quête de son public, une danseuse sociale en lutte avec son tempo, une pianiste virtuose enfermée dans sa partition, une régisseuse explosive orchestrant la vie des autres, une âme solitaire bercée par son casque et une jeune femme à la recherche de sa mélodie. Six personnes que rien ne relie, à part la musique.",
      "Alors que chacune traverse la cacophonie de sa propre vie, ses pensées et ses relations, comment la musique s'impose-t-elle, s'écoute, se vit dans l'existence de chacune ? Au fond, qu'est-ce que la musique ?",
      "Un C(h)œur silencieux est une pièce contemporaine composée de témoignages et de performances musicales. Véritable symphonie humaine de rires, d'émotions et de silences, elle explore les musiques que seuls les cœurs entendent… Parviendrez-vous à écouter la vôtre ?",
    ],
    slides: [["choeur-duo", "Un C(h)œur silencieux"], ["choeur-jean", "Un C(h)œur silencieux"], ["choeur-chemise", "Un C(h)œur silencieux"]],
    credits: [
      ["Texte et mise en scène", "Alexandre Van Campenhout"],
      ["Genre", "pièce de théâtre musicale"],
    ],
    dates: [
      { day: "2025-06-06", venue: "Place des Arts", city: "Montréal", country: "Canada" },
      { day: "2025-06-07", venue: "Place des Arts", city: "Montréal", country: "Canada" },
    ],
  },
  {
    slug: "par-endroits", title: "Par Endroits", year: 2024, by: "Compagnie Cliffhanger",
    hero: "trio", focus: "50% 38%", credit: null,
    punch: "Dans un monde où chacun peine à s'exprimer, la construction de soi s'arrête-t-elle une fois que l'on quitte l'enfance pour entrer dans l'âge adulte ?",
    poster: "affiche-par-endroits",
    text: [
      "Gaël s'est fait plaquer par sa copine, Juju a perdu son ami et Ti-Cul s'est énervé sur la personne la plus chère à ses yeux. Alors que chacun cherche à identifier et résoudre la source de ses maux, ils se retrouvent emportés, malgré eux, à naviguer à travers leurs relations, leurs souvenirs et leurs pensées les plus intimes.",
      "Par Endroits est un projet théâtral à l'initiative d'Alexandre Van Campenhout, créé par écriture de plateau avec la Compagnie Cliffhanger. La pièce a été élaborée à partir de témoignages de personnes venues de Belgique, de France, de Suisse et même du Québec, et veut donner la parole aux enfants d'hier pour la laisser à ceux de demain.",
      "Saurez-vous les écouter ?",
    ],
    slides: [["trio", "Par Endroits"], ["affiche-par-endroits", "Affiche"]],
    credits: [
      ["Initiative", "Alexandre Van Campenhout"],
      ["Écriture", "de plateau, avec la Compagnie Cliffhanger"],
    ],
    dates: [
      { day: "2024-05-24", time: "20:00", venue: "Rue de l'Alliance-Verbond 2", city: "Saint-Josse-ten-Noode", country: "Belgique", price: "10 €" },
      { day: "2024-05-25", time: "20:00", venue: "Rue de l'Alliance-Verbond 2", city: "Saint-Josse-ten-Noode", country: "Belgique", price: "10 €" },
      { day: "2024-05-26", time: "15:00", venue: "Rue de l'Alliance-Verbond 2", city: "Saint-Josse-ten-Noode", country: "Belgique", price: "prix libre" },
    ],
  },
  {
    slug: "les-femmes-se-vantent", title: "Les Femmes Se Vantent", year: 2019, by: "Compagnie Cliffhanger",
    hero: "pull", focus: "50% 22%", credit: null,
    punch: "« Molière ne se retournerait nullement dans sa tombe, mais applaudirait des deux mains. »", cite: "Karoo, novembre 2019",
    poster: "affiche-fsv",
    text: [
      "Trois siècles après Molière, Henriette veut vivre avec l'homme qu'elle aime sans passer par le mariage, au grand scandale de sa famille aristocratique. Librement inspiré des Femmes savantes, un saut dans le temps façon sitcom des années 80, avec bande-son et intermèdes musicaux.",
    ],
    slides: [["pull", "Les Femmes Se Vantent"], ["affiche-fsv", "Affiche"]],
    credits: [
      ["D'après", "Les Femmes savantes, de Molière"],
      ["Avec", "Sophie Decaestecker (Henriette), Hans Mélot (Clitandre), Laurie Stevens (la mère), Alexandre Van Campenhout (Chrysale), Audrey Colomb (Armande), Alizé Cookie (Bélise), Julie Gloesener (la tante), Nathan Leclercq (Trissotin)"],
    ],
    dates: [
      { day: "2019-11-04", time: "20:30", venue: "Salle Delvaux", city: "ULB Solbosch", country: "Belgique", price: "5 €" },
      { day: "2019-11-05", time: "20:30", venue: "Salle Delvaux", city: "ULB Solbosch", country: "Belgique", price: "5 €" },
    ],
  },
];

// [fichier, légende, spectacle (slug) ou "coulisses"]
const GALLERY = [
  ["groupe", "L'Inédit de Molière", "linedit-de-moliere"],
  ["choeur-jean", "Un C(h)œur silencieux", "un-choeur-silencieux"],
  ["bleu", "L'Inédit de Molière", "linedit-de-moliere"],
  ["choeur-duo", "Un C(h)œur silencieux", "un-choeur-silencieux"],
  ["script", "Coulisses", "coulisses"],
  ["choeur-chemise", "Un C(h)œur silencieux", "un-choeur-silencieux"],
  ["rose", "Coulisses", "coulisses"],
  ["noir-blanc", "Coulisses", "coulisses"],
  ["trio", "Par Endroits", "par-endroits"],
  ["vert", "Coulisses", "coulisses"],
  ["sourire", "Coulisses", "coulisses"],
  ["pull", "Les Femmes Se Vantent", "les-femmes-se-vantent"],
];

const TEAM = [
  ["Alexandre Van Campenhout", "auteur, metteur en scène, interprète"],
  ["Alizé Cookie", "mise en scène, interprète"],
  ["Ildikó Ács", "interprète"], ["Audrey Colomb", "interprète"], ["Sophie Decaestecker", "interprète"],
  ["Julie Gloesener", "interprète"], ["Thomas Kesmarki", "interprète"], ["Nathan Leclercq", "interprète"],
  ["Hans Mélot", "interprète"], ["Hugo Ortiz", "interprète"], ["Laurie Stevens", "interprète"],
];

// fond de chaque rubrique
const BACKDROPS = { home: "groupe", spectacles: "rose", agenda: "script", compagnie: "choeur-chemise", contact: "vert" };
