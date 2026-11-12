# Bilans Olivier — Arbequina

Dans Banque de projets → Olivier, choisir le bilan Année 0 ou Année 3, puis calculer. Référence originale : **1 hectare Arbequina irrigué**. Les nouveaux calculs peuvent être proportionnés à la superficie comme décrit dans la section Évolution ; aucun autre périmètre ou variété n’est extrapolé.

Les deux images fournies par l’utilisateur constituent les hypothèses de cet exemple, et non un référentiel agronomique validé. L’interface présente le solde, puis le total des crédits (entrées), puis celui des débits (sorties). Le détail est dépliable. Les lignes sont conservées dans la simulation enregistrée, dans la copie de demande d’accompagnement et dans le PDF téléchargé.

- Année 0 : investissement 60 000–81 000 MAD ; aides envisagées 13 000–19 000 MAD ; reste à charge fourni 47 000–62 000 MAD, représenté par une sortie négative. Hors gros œuvre eau. Le solde est repris du document et non recalculé à partir de bornes indépendantes.
- Année 3 : recettes 20 000–35 000 MAD ; charges 14 200–23 300 MAD ; solde fourni +2 000–+15 000 MAD. L’utilisateur a demandé de conserver ce solde pour le moment. Les extrêmes indépendants donneraient −3 300–+20 800 MAD ; les combinaisons justifiant le solde fourni restent à documenter. Investissement, amortissements, impôts et remboursement de prêt non renseignés.

Les aides Année 0 sont des hypothèses de l’image, **sans accord ni validation de critères FDA**. Elles restent distinctes des scénarios conditionnels du moteur FDA 2026 ; aucun cumul ou remplacement automatique. Les aides d’investissement ne deviennent pas un revenu de fonctionnement de l’année 3. Crédit signifie ici entrée de fonds, pas prêt bancaire.

Validation : `node --test tests/*.test.cjs`, et parcours navigateur calcul, accordéon, sauvegarde/rechargement, copie de demande et téléchargement PDF.

## Évolution : superficie simulée et présentation

Sur instruction du porteur, les nouveaux calculs Arbequina irrigués peuvent être proportionnés à toute superficie strictement positive. Chaque ligne monétaire et le solde fourni sont multipliés par la superficie, à partir de la référence de 1 ha. C’est une hypothèse linéaire explicite : ni économies d’échelle ni plafonds FDA ne sont calculés dans cet exemple. Les anciennes simulations et demandes restent des copies conservées, sans modification rétroactive.

Le choix de variété suit la superficie et précède le stade. Seule Arbequina dispose de ces références : Picholine marocaine, Haouzia, Menara et Autre restent sans montant. Le bour reste sans extrapolation. Le moteur FDA conditionnel reste distinct de cet exemple.

La pluie est une valeur numérique en mm/an ; zéro est permis, une valeur inconnue peut rester vide. Aucun coefficient de rendement n’est inventé. Le résultat montre dépenses et entrées en 2/3 de page, en rouge et vert clairs, les hypothèses et le calcul en dessous, et la synthèse débit/crédit/solde dans le tiers droit. Sur mobile, ces zones s’empilent. Le solde fourni de l’année 3 est conservé, sans prétendre résoudre son écart avec les extrêmes indépendants.
