module.exports = function(db, params) {
    let get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
    if (!get) return false;
    else get = JSON.parse(get.json);
    return (typeof get != 'undefined');
    
  }