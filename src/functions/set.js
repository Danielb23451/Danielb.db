module.exports = function(db, params) {
    let get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
    if (!get) {
      db.prepare(`INSERT INTO database (ID,json) VALUES (?,?)`).run(params.id, '{}');
      get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
    }
    get = JSON.parse(fetched.json);
    params.data = JSON.stringify(params.data);
    db.prepare(`UPDATE database SET json = (?) WHERE ID = (?)`).run(params.data, params.id);
    let newData = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id).json;
    if (newData === '{}') return null;
    else {
      newData = JSON.parse(newData)
      return newData
    } 
  }