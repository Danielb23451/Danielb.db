module.exports = function(db, params) {  
    let get = db.prepare(`DELETE FROM json`).run();
    if(!get) return false;
    return true;
  }