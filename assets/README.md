# Vidéo de connexion

Ajouter ici le fichier **agriimpact-login.mp4**. La page de connexion est déjà configurée pour ce chemin relatif. Tant que le fichier manque ou ne peut pas être lu, le fond vert reste affiché.

Format recommandé : MP4 H.264, 1280 × 720, 24 ou 25 images/seconde, sans piste audio, 15 à 25 secondes. Viser 3 à 6 Mo et rester sous 25 Mo pour un dépôt via le site web GitHub. Conserver les liens Pexels et auteurs pour documenter la provenance.

Sur GitHub : ouvrir le dossier assets → Add file → Upload files → sélectionner agriimpact-login.mp4 → Commit changes.

La vidéo est lue en boucle, silencieusement. La lecture automatique est désactivée lorsque la préférence système de réduction des animations est active.

Pour tester depuis GitHub sur un ordinateur, télécharger le dépôt entier avec Code → Download ZIP, extraire le ZIP puis ouvrir agriimpact-poc.html. Télécharger uniquement le HTML ne récupère pas la vidéo. La page GitHub affichant le code ne joue pas le prototype.

## Logo local

Placer **agriimpact-logo.png** dans ce même dossier assets. L’image est utilisée sur la connexion, dans l’en-tête commun à tous les espaces, et comme icône d’onglet. Les proportions sont conservées. Si le fichier manque, le nom de l’application reste visible.

Le téléchargement PDF essaie également de charger le logo. Si le navigateur interdit la lecture du fichier image dans un canvas (restriction possible en ouverture file://), le PDF reste téléchargeable sans logo. Le logo peut être inclus dans les PDF lorsque le prototype est servi depuis une même origine HTTP.
