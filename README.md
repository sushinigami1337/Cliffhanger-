# Site de la Compagnie Cliffhanger

Salut Brendan. Ce dépôt contient le **prototype fonctionnel** du site, fait pour montrer le projet à la compagnie. Il n'est pas figé : c'est une référence vivante pour les contenus, les images et surtout les animations. Tu es libre de repartir de zéro sur ta stack.

- **Démo en ligne :** https://compagnie-cliffhanger.netlify.app (hébergement de démo seulement)
- **Maquettes Figma :** https://www.figma.com/design/vP8Z0mWn7ytbZk3IoL3Z6u (commence par la page « À lire d'abord », puis « Guide dev »)
- **Référence de style :** https://www.focusandchaliwate.be/fr (le système a été relevé dans leur CSS)
- **Originaux des médias :** Google Drive de la compagnie, dossier `CLIFFHANGER/03_MEDIAS` (accès via Hans)

## Structure

Site statique, sans build ni dépendance.

| Fichier | Rôle |
|---|---|
| `index.html` | Squelette : en-tête, burger, menu, conteneur des pages, visionneuse photo |
| `css/site.css` | Tous les styles (polices, tokens, pages, animations) |
| `js/content.js` | **Tout le contenu** : `CONTACT`, `SHOWS` (spectacles et dates), `GALLERY`, `TEAM`, `BACKDROPS`. Seul fichier à toucher pour changer un texte |
| `js/app.js` | Rendu des pages, navigation, filtres, animations, visionneuse |
| `fonts/` | Jost (variable, 300 à 500) et Archivo ExtraBold, en local, sous-ensembles latin et latin-ext |
| `img/` | Photos en WebP : `nom-960.webp`, `nom-1440.webp` si la photo dépasse 1440 px, `nom.webp` pleine taille. `menu.mp4` pour le fond du menu |
| `_headers` | En-têtes de cache pour Netlify |

## Lancer en local

```
npx serve .
```

Puis ouvrir http://localhost:3000. Il faut un petit serveur (et non le fichier ouvert directement), sinon les polices en local sont bloquées.

## Mettre à jour la démo

```
npx netlify-cli deploy --prod --dir .
```

## Contenu

- Une date = une ligne dans `SHOWS[].dates` (`day`, `time`, `venue`, `city`, `country`, `price`). L'agenda regroupe tout seul les soirs consécutifs en séries (« 17 et 18 avr. 2026 », « 24 au 26 mai 2024 »).
- Une nouvelle photo : ajouter les 2 ou 3 fichiers WebP dans `img/`, puis ses dimensions dans `DIMS` (en haut de `app.js`).
- **Un champ vide n'est jamais affiché.** Pas de texte provisoire en ligne.

## Règles d'écriture

- **Aucun tiret long ni tiret de séparation** dans les textes du site (demande de la compagnie). Utiliser une virgule, deux points ou un point médian « · ». Les traits d'union des mots restent.
- La typographie française est appliquée au rendu par `typeset()` : apostrophe typographique, espace insécable avant « : », espace fine avant « ? ! ; ». On peut donc taper les textes normalement dans `content.js`.

## Choix techniques (et pourquoi)

| Sujet | Choix |
|---|---|
| Navigation | Par hash (`#/spectacle/par-endroits`). La nouvelle page apparaît en fondu **par-dessus** l'ancienne, photo sur photo, jamais par le noir. Les filtres sont dans l'adresse (`#/galerie/par-endroits`, `#/agenda/2024`) |
| Images | srcset WebP, dimensions réelles, image du haut prioritaire, le reste en lazy. Les photos de survol de l'accueil sont préchargées quand la page est au repos |
| Menu | Le logo et l'image de la vidéo ne sont chargés qu'à la première ouverture. La vidéo boucle avec un fondu enchaîné de 1,5 s déjà intégré au fichier |
| Polices | Hébergées en local et préchargées, `font-display: swap` |
| Accessibilité | Lien « Aller au contenu », un h1 par page, cibles tactiles de 44 px, focus gardé dans le menu et la visionneuse, résultats de filtre annoncés, `prefers-reduced-motion` respecté |

## Mesures Lighthouse (démo, 25/09/2026)

| | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Mobile | 97 (LCP 2,0 s) | 100 | 100 | 60 |
| Desktop | 100 (LCP 0,7 s) | 100 | 100 | 60 |

Le SEO est bas **volontairement** : la démo est en `noindex`. Le cache des CSS et JS est limité à une heure parce que les noms de fichiers ne sont pas versionnés.

## Pour la vraie version

1. **De vraies URL par page** (génération statique, par exemple Astro ou Eleventy) à la place du hash, pour le référencement et les aperçus de partage par page.
2. **Un petit CMS** ou des fichiers de contenu, pour que la compagnie mette à jour l'agenda sans toucher au code.
3. Retirer `noindex`, ajouter un sitemap, des balises Open Graph par spectacle et des données structurées `TheaterEvent`.
4. Version anglaise (le sélecteur de langue a été retiré tant qu'elle n'existe pas).
5. Polices d'origine si la compagnie prend une licence Adobe Fonts : Futura PT et Brother 1816.
6. Crédits photo, génériques complets et dossiers de diffusion en PDF dès que la compagnie les fournit.
