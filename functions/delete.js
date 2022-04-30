module.exports = function(db, params, options) {
    let fetched = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    if (!fetched) return false;
    else fetched = JSON.parse(fetched.json);
    if (typeof fetched === 'object') {
      fetched = JSON.stringify(fetched);
      db.prepare(`UPDATE json SET json = (?) WHERE ID = (?)`).run(fetched, params.id);
      return true;
    }
    else db.prepare(`DELETE FROM json WHERE ID = (?)`).run(params.id);
    return true;
  }