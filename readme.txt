After 10m of non activity, this repa was archived.
If you want to use/contribute to this player, please see at
https://github.com/MialaProg/MiYT


Migration v0.03.0: https://github.com/MialaProg/MiYT


Vous souhaitez nous aider ?
Voici quelques problèmes dont la solution nous est inconnus:
- Bouton suivant en arrière plan: Sur android dans la notification de lecture en arrière plan, ou en mode Picture-in-Picture, on peut parfois observer un bouton [Piste suivante]. Comment faire en sorte que ce bouton execute la fonction js next(); ?

Merci d'avance !


Plus d'informations sur le projet ainsi que la mise en place / installation (même si aucune installation de logiciel n'est requise): 
    https://miala.000webhostapp.com/YT/ (Version complète)
        ou
    https://miala-python.github.io/yt/ (Version client uniquement)

Codes de version:
α : Ne fonctionne pas
β : Certaines fonctionnalités ne fonctionnent pas 
U : Unstable => Manque de tests 
S : Stable => Fonctionne correctement (sauf bugs mineurs)
F : Finale => Releases disponible, point de sauvegarde

Notes pour le dev:

index.html => fav => watcher (=> iframe ms YT) => YT => add.php
index.php => load.php î

LCL:
- saver_version => MàJ reset
- plid [ ,  ,  , ]
- pl_ctn [[] ,[], []]
- watch_id [ ,  ,  , ]
=>> lcl_pl_id