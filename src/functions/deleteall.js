module.exports = function(db, params) {  
    let fetched = db.prepare(`DELETE FROM json`).run();
    if(!fetched) return false;
    return true;
  }