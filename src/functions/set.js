module.exports = function(db, params) {
    let get = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    if (!get) {
      db.prepare(`INSERT INTO json (ID,json) VALUES (?,?)`).run(params.id, '{}');
      get = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    }
    get = JSON.parse(get.json);
    params.data = JSON.stringify(params.data);
    db.prepare(`UPDATE json SET json = (?) WHERE ID = (?)`).run(params.data, params.id);
    let newData = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id).json;
    if (newData === '{}') return undefined;
    else {
      newData = JSON.parse(newData)
      return newData
    } 
  }