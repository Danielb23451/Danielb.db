module.exports = function(db, params) {
    let fetched = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    if (!fetched) return false;
    else fetched = JSON.parse(fetched.json);
    return (typeof fetched != 'undefined');
    
  }