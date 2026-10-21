# Bilans Olivier — Arbequina

Dans Banque de projets → Olivier, choisir le bilan Année 0 ou Année 3, puis calculer. Référence limitée à **1 hectare irrigué** ; aucun changement de superficie ou de périmètre n’extrapole ces montants.

Les deux images fournies par l’utilisateur constituent les hypothèses de cet exemple, et non un référentiel agronomique validé. L’interface présente le solde, puis le total des crédits (entrées), puis celui des débits (sorties). Le détail est dépliable. Les lignes sont conservées dans la simulation enregistrée, dans la copie de demande d’accompagnement et dans le PDF téléchargé.

- Année 0 : investissement 60 000–81 000 MAD ; aides envisagées 13 000–19 000 MAD ; reste à charge fourni 47 000–62 000 MAD, représenté par une sortie négative. Hors gros œuvre eau. Le solde est repris du document et non recalculé à partir de bornes indépendantes.
- Année 3 : recettes 20 000–35 000 MAD ; charges 14 200–23 300 MAD ; solde fourni +2 000–+15 000 MAD. L’utilisateur a demandé de conserver ce solde pour le moment. Les extrêmes indépendants donneraient −3 300–+20 800 MAD ; les combinaisons justifiant le solde fourni restent à documenter. Investissement, amortissements, impôts et remboursement de prêt non renseignés.

Les aides Année 0 sont des hypothèses de l’image, **sans accord ni validation de critères FDA**. Elles restent distinctes des scénarios conditionnels du moteur FDA 2026 ; aucun cumul ou remplacement automatique. Les aides d’investissement ne deviennent pas un revenu de fonctionnement de l’année 3. Crédit signifie ici entrée de fonds, pas prêt bancaire.

Validation : `node --test tests/*.test.cjs`, et parcours navigateur calcul, accordéon, sauvegarde/rechargement, copie de demande et téléchargement PDF.
