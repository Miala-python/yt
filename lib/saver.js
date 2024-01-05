console.log('saver.js >> V2.02.17');

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
    let rsrc = list.join("¤¤");
    lcl_save(id, rsrc);
}



var lcl_LOADED = true;