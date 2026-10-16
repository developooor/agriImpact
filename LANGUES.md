# Langues de l’interface

Le prototype propose deux choix : **Français** et **العربية – الدارجة المغربية** (darija marocaine écrite en caractères arabes).

## Utilisation

Le sélecteur **Langue / اللغة** est présent sur la page de connexion et dans l’en-tête après connexion. Il est aussi proposé dans les fenêtres de formulaire pour changer de langue sans fermer le formulaire.

Le choix est mémorisé dans le navigateur. Si le stockage est indisponible, il reste utilisable pendant la session. Le fonctionnement ne nécessite ni Internet ni service de traduction.

## Comportement

- L’affichage passe de gauche à droite en français, et de droite à gauche en darija ; le menu mobile s’ouvre du côté correspondant.
- Les menus, formulaires, messages, états affichés, informations FDA et contenus de démonstration prévus sont traduits.
- Les noms propres, adresses email, références et fichiers déposés conservent leur contenu original. Les champs saisis ne sont pas réécrits au changement de langue.
- Les nombres, montants, dates et unités des règles restent cohérents. Les montants sont en MAD / dirhams et les dates au format JJ/MM/AAAA.
- Le PDF de simulation utilise la langue choisie, avec un rendu arabe de droite à gauche.

## Protection des données métier

La traduction agit sur l’affichage, sans modifier les valeurs enregistrées : par exemple, `Prise en charge` et `Irrigué` restent les valeurs utilisées par les règles et les sauvegardes. Les libellés des options peuvent être traduits, mais leur valeur de formulaire reste stable.

La préférence utilise la clé `cam_agriimpact_preferences_language`, séparée des collections métier. Elle n’est pas incluse dans les exports de dossiers et ne déclenche pas la création d’un espace de compatibilité à elle seule.

Les données importées, documents et textes libres restent les originaux ; il n’y a pas de traduction automatique de documents utilisateur.

## Vérifications

```sh
node --test tests/fda.test.cjs tests/i18n.test.cjs
```

Les essais navigateur vérifient aussi : connexion en darija, filtres, saisies conservées dans les formulaires principaux et les fenêtres, résultats FDA inchangés, demande Youssef → Salma, préférence après rechargement et import, PDF arabe, fonctionnement hors ligne, stockage indisponible et affichage mobile à 360 px.
