module.exports = function(db, params) {  
    let fetched = db.prepare(`SELECT FROM json`).run();
    if(!fetched) return undefined;
    return fetched.changes;
  }