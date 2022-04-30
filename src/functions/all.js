module.exports = function(db, params) {  
    var stmt = db.prepare(`SELECT * FROM json WHERE ID IS NOT NULL`);
    let response = [];
    for (var row of stmt.iterate()) {
      try {
        let data = JSON.parse(row.json)
        response.push({
          ID: row.ID,
          data
        })
      } catch (e) {}
    }
    return response;
  }