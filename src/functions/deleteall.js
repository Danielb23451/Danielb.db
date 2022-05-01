module.exports = function(db, params) {  
    let get = db.prepare(`DELETE FROM database`).run();
    if(!get) return false;
    return true;
  }