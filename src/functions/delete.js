module.exports = function(db, params) {
    let get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
    if (!get) return false;
    else get = JSON.parse(get.json);
    if (typeof get === 'object') {
      get = JSON.stringify(get);
      db.prepare(`UPDATE database SET database = (?) WHERE ID = (?)`).run(get, params.id);
      return true;
    }
    else db.prepare(`DELETE FROM database WHERE ID = (?)`).run(params.id);
    return true;
  }