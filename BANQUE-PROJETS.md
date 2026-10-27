# Banque de projets par filière

La banque présente une mosaïque inspirée de la référence visuelle fournie : arboriculture, maraîchage plein champ, cultures fourragères, maraîchage sous serre, céréales, cultures industrielles, production animale, autres cultures, oléagineuses, fruits rouges et nouvelles cultures.

Les compteurs dénombrent uniquement les fiches réellement présentes dans le catalogue, après recherche et sélection de la grande catégorie. Les filières sans fiche restent visibles avec zéro et « Catalogue à enrichir ». Les valeurs de l’illustration ne sont pas importées comme données du prototype.

Les quinze fiches existantes sont conservées. La tomate n’ayant pas de conduite plein champ / serre validée, elle apparaît dans une entrée complémentaire « Maraîchage à préciser ». Un champ `bankGroup` explicite permet de classer ultérieurement une fiche dans une filière ; une famille inconnue reste accessible dans « Autres cultures ».

La région est préremplie depuis le profil consulté et modifiable. Elle est affichée dans la liste, transmise au simulateur, conservée dans la simulation et sa copie de demande d’accompagnement, et incluse dans le PDF. Le changement d’agriculteur réinitialise ce contexte. Les anciennes simulations sans région restent lisibles.

Aucune règle d’aptitude régionale n’est encore définie : la sélection de région ne retire pas de projets et ne modifie ni les prix ni les règles FDA. Les compteurs ne constituent pas un nombre de projets agronomiquement adaptés à la région.

Validation : `node --test tests/*.test.cjs` ; parcours navigateur filière → région → simulation → copie de demande → téléchargement PDF, recherche, affichage mobile et darija.
