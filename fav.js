function Efelant () {
// CrÃ©er une liste vide pour stocker les vidÃ©os et leurs ID
var videos = [];

// var footer = document.createElement('footer');
// footer.id = 'footer';
// document.getElementsByTagName('html')[0].appendChild(footer);

// CrÃ©er une fonction pour scroller la page jusqu'en bas
function scrollPage() {
    var body = document.getElementById("contents");
    window.scrollTo(0, body.scrollHeight);

}

// CrÃ©er une fonction pour extraire les vidÃ©os et leurs ID de la page
function extractVideos() {
  // SÃ©lectionner tous les Ã©lÃ©ments qui contiennent les vidÃ©os
  var elements = document.querySelectorAll("#video-title");
  // Parcourir chaque Ã©lÃ©ment
  for (var i = 0; i < elements.length; i++) {
    // RÃ©cupÃ©rer le titre et l'ID de la vidÃ©o
    var title = elements[i].textContent;
    var id = elements[i].href.split("=")[1];
    // VÃ©rifier si la vidÃ©o n'est pas dÃ©jÃ  dans la liste
    if (!videos.some(v => v.id === id)) {
      // Ajouter la vidÃ©o et son ID Ã  la liste
      videos.push({title: title, id: id});
      console.log(videos.length);
    }
  }
}


// CrÃ©er une fonction pour afficher la liste des vidÃ©os et leurs ID
function ShowVids() {
  // Parcourir chaque vidÃ©o dans la liste
  var vids = 'Head';
  for (var i = 0; i < videos.length; i++) {
    // Afficher le titre et l'ID de la vidÃ©o
    vids += (";=>" + videos[i].id); //";;;" + videos[i].title + 
  }
  console.log(vids);
}

// CrÃ©er une fonction principale pour exÃ©cuter le programme
function main(i = 0) {
  // Extraire les vidÃ©os et leurs ID de la page
  extractVideos();
  // Scroller la page jusqu'en bas
  scrollPage();

  var loading = document.querySelector(".circle .style-scope .tp-yt-paper-spinner");
  // Retourner vrai si l'Ã©lÃ©ment existe, faux sinon
  console.log('wait... (ShowVids)');

  // VÃ©rifier si il y a encore des vidÃ©os Ã  charger
  if (loading !== null) {
    // Attendre 5 secondes avant de rÃ©pÃ©ter le processus
    setTimeout(main, 5000);
  } else {
    if (i < 10){
    setTimeout(main, 5000);
    }else{
        ShowVids();
    }
    
  }
  
}

// Lancer le programme
main(0);

}

Efelant();
