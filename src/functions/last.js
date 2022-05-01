module.exports = function(db, params) {  
    let get = db.prepare(`SELECT FROM json`).run();
    if(!get) return undefined;
    return get.changes;
  }