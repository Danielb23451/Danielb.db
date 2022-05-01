module.exports = function(db, params) {  
    var get = db.prepare(`SELECT * FROM json WHERE ID IS NOT NULL`);
    let response = {};
    for (var row of get.iterate()) {
      try {
        let data = JSON.parse(row.json)
        response[row.ID] = data
      } catch (e) {}
    }
    return response
  }