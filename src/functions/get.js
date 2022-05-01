module.exports = function(db, params) {
  let get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
  if (!get) return undefined;
  return JSON.parse(get.json);
  
}