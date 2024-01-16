console.log('saver.js >> V2.02.18');

var saver_version = 'V0.02.3S.18'; //A changer pour reset les données => Eviter les erreurs au max

function lcl_rmv_all() {
    // Effacer tous les éléments
    localStorage.clear();
}

function lcl_load(id){
    let rsrc = localStorage.getItem(id);
    return rsrc;
}

function lcl_load_list(id){
    let rsrc = lcl_load(id);
    return rsrc.split("¤@¤");
}

function lcl_save(id, rsrc){
    localStorage.setItem(id, rsrc);
}

function lcl_save_list(id, list){
    let rsrc = list.join("¤@¤");
    lcl_save(id, rsrc);
}

//Reset lors des MàJ importantes
if (lcl_load('saver_version') != saver_version){
    lcl_rmv_all();
    lcl_save('saver_version', saver_version);
}


var lcl_LOADED = true;