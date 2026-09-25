# Notes pour un assistant IA (Claude, Copilot…)

Site vitrine de la Compagnie Cliffhanger (théâtre, Bruxelles). Lis d'abord `README.md`.

## Sources de vérité

1. **Le code de ce dépôt** fait foi pour les contenus, les textes et les animations.
2. **Figma** : https://www.figma.com/design/vP8Z0mWn7ytbZk3IoL3Z6u
   - Page « Site · maquettes (V2) » : section 1 desktop 1440 (01 Accueil `5:3`, 02 Spectacles `5:46`, 03 Spectacle `6:2`, 04 Agenda `6:54`, 05 La compagnie `9:6`, 06 Galerie `9:75`, 07 Contact `9:113`, 08 Fiche personne `27:2`, 09 Montréal `27:50`), section 2 états (survol, menu ouvert), section 3 mobile, plus une section de captures du vrai site en téléphone et tablette.
   - Page « Guide dev » : couleurs (variables `couleur/…`), styles de texte `Cliffhanger/…`, espacements, animations chiffrées, correspondance des médias.
   - Les comportements (survol, vidéo, défilement) sont décrits dans les annotations du mode Dev.
3. **Référence de style** : https://www.focusandchaliwate.be/fr

## Règles à ne jamais casser

- **Aucun tiret long (—), demi-cadratin (–) ni tiret entouré d'espaces** dans les textes visibles. Utiliser une virgule, deux points ou « · ». Les traits d'union dans les mots restent.
- Aucun texte provisoire en ligne : un champ vide n'est pas affiché.
- Tous les textes sont dans `js/content.js`. Ne pas en coder en dur dans `app.js`.
- Le site est centré sur **Bruxelles**. Montréal n'apparaît que sur `#/montreal` (et le pied de page).
- Marie-Hélène Ruiz est l'autrice de L'Inédit de Molière, **pas** un membre de l'équipe (`guest: true`).
- La devise et la démarche artistique sont celles d'**Alexandre Van Campenhout**, pas de la compagnie.
- Transitions entre pages : fondu d'une photo à l'autre, **jamais** en passant par le noir.
- Rester sobre : fond noir, texte blanc, la couleur vient uniquement des photos et des affiches.

## Tester

`npx serve .` puis http://localhost:3000. Vérifier au moins 390 px (téléphone), 820 px (tablette) et 1440 px.
