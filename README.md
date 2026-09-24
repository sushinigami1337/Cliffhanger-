# Site de la Compagnie Cliffhanger

Site vitrine de la Compagnie Cliffhanger, compagnie de théâtre entre Bruxelles et Montréal.

- **En ligne (prototype) :** https://compagnie-cliffhanger.netlify.app
- **Maquettes Figma :** https://www.figma.com/design/vP8Z0mWn7ytbZk3IoL3Z6u (page « V2 — style Chaliwaté »)
- **Référence de style :** https://www.focusandchaliwate.be/fr

## Structure

Site statique, sans build ni dépendance :

| Fichier | Rôle |
|---|---|
| `index.html` | Tout le site : styles, contenu (tableaux `SHOWS`, `AGENDA`, `GALLERY`, `TEAM` dans le script) et navigation par hash (`#/spectacle/par-endroits`, `#/agenda`…) |
| `img/` | Photos et affiches en version web (≈ 1800 px), vidéo du menu (`menu.mp4`, 50,8 s, muette), logo et favicon |

Les originaux en pleine qualité sont sur le Google Drive de la compagnie, dans `CLIFFHANGER/03_MEDIAS/`.

## Système de design (repris de Focus & Chaliwaté)

- Fond `#000`, texte `#fff`, logo et titres à 75 % d'opacité
- Titres : **Archivo ExtraBold**, en capitales, avec un interlettrage de 0.1875em (remplace Brother 1816)
- Texte : **Jost** 300/400 (remplace Futura PT)
- Espacements : `--spacing` 1rem → 2rem (48em) → 3rem (64em) → 4rem (80em)
- Accueil : photo plein écran ; au survol d'un titre, la photo du spectacle apparaît en fondu et les autres titres se floutent
- Transitions : fondu enchaîné d'une page à l'autre (jamais par le noir), le contenu glisse vers le bas

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou `npx serve .`

## Déployer

Le lien Netlify (`compagnie-cliffhanger.netlify.app`) sert **uniquement de démo** pour montrer le projet à la compagnie. L'hébergement définitif est au choix du dev. Pour mettre la démo à jour : `npx netlify-cli deploy --prod --dir .`

**Pour le design, la référence est le Figma** (page « V2 — style Chaliwaté » et page « Guide dev » : couleurs, typos, espacements, composants, animations chiffrées). Le prototype fait foi pour les contenus et les animations.

## Pistes pour la vraie version

- Passer à un petit CMS ou à des fichiers de contenu (Markdown/JSON) pour que la compagnie mette à jour l'agenda sans toucher au code
- Une vraie URL par page (au lieu du `#/`) pour le référencement
- Version anglaise
- Retirer `noindex` au lancement
