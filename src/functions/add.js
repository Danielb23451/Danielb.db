module.exports = function (db, params) {
  let get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
  if (!get) {
    db.prepare(`INSERT INTO database (ID,json) VALUES (?,?)`).run(params.id, '{}');
    get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
  }
  if (get.json === '{}') get.json = 0;
  else get.json = JSON.parse(get.json)
  if (typeof get.json !== 'number') return new TypeError(`The Old ID Isnt Vaild Number`);
  params.data = parseFloat(get.json, 10) + parseFloat(params.data, 10);
  params.data = JSON.stringify(params.data);
  db.prepare(`UPDATE json SET database = (?) WHERE ID = (?)`).run(params.data, params.id);
  let newData = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id).json;
  if (newData === '{}') return undefined;
  else {
    newData = JSON.parse(newData)
    return newData
  }

}