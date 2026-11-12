# Banque de projets : ordre de consultation personnalisé

La mosaïque de filières et ses compteurs sont remplacés par des cartes de projets classées selon le profil consulté. Le premier projet occupe plus de place. Les quinze fiches restent accessibles avec les filtres de région, recherche et grande catégorie.

Le classement utilise, par ordre de priorité, l’activité déjà présente dans l’historique du demandeur, une filière déjà pratiquée et les équipements d’irrigation déclarés. Chaque projet affiche une raison. Il s’agit d’une affinité documentaire, pas d’une aptitude agronomique, d’un score de rentabilité ou d’une décision de crédit. Aucun classement régional n’est inventé. Pour le scénario de démonstration Youssef, Olivier est explicitement prioritaire et apparaît en première position dans la carte la plus grande. Cette priorité éditoriale est affichée comme telle ; elle ne prétend pas être une validation agronomique. Les autres projets et les autres profils conservent l’ordre fondé sur les données déclarées.

La région reste un contexte sélectionnable, prérempli depuis le profil, conservé dans la simulation, la demande et le PDF. Elle ne modifie pas automatiquement les rendements, les prix ou les aides FDA.

La concurrence n’est plus saisie par l’utilisateur : elle est lue, si disponible, dans `farmer.marketSignals[projectId]` avec les champs texte `value`, `source`, `date`. Ce point d’entrée représente la future donnée importée ; aucun connecteur n’est actif. En l’absence de source, afficher « Non disponible » et « Source externe non connectée ». Conserver la provenance dans la copie de simulation, sans impact chiffré.

Pitch proposé : « Youssef retrouve des projets proches de ses activités et des équipements déclarés. Cet ordre l’aide à explorer ; le conseiller confirme ensuite l’adaptation technique, notamment au sol et à l’eau. »
