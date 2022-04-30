module.exports = function(db, params) {
  let geted = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
  if (!geted) {
    db.prepare(`INSERT INTO json (ID,json) VALUES (?,?)`).run(params.id, '{}');
    geted = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id); 
  }
    if (geted.json === '{}') geted.json = 0;
    else geted.json = JSON.parse(geted.json)
    if (typeof geted.json !== 'number') return new TypeError(`The Old ID Isnt Vaild Number`);
    params.data = parseFloat(geted.json, 10) + parseFloat(params.data, 10);
  params.data = JSON.stringify(params.data);
  db.prepare(`UPDATE json SET json = (?) WHERE ID = (?)`).run(params.data, params.id);
  let newData = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id).json;
  if (newData === '{}') return undefined;
  else {
    newData = JSON.parse(newData)
    return newData
  }
  
}