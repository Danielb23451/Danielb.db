module.exports = function(db, params) {
  let geted = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
  if (!geted) return undefined;
  return JSON.parse(geted.json);
  
}