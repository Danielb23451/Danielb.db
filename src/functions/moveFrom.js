const fs = require('fs')

module.exports = function(db, params, type, path) {  
    if (type === 'json') {
        fs.readFileSync(`${path}`, (err, data) => {
            if (err) return new TypeError('Database Not Exites')
            console.log(data);
          });
    }
    if (type === 'sqlite') {
        const betterdb = require('better-sqlite3')(`${path}`);
        if (!betterdb) return new TypeError('Database Not Exites')
        const get = betterdb.prepare(`SELECT * FROM json WHERE ID IS NOT NULL`);
        for (var row of get.iterate()) {
            try {
            let data = JSON.parse(row.json)
            db.prepare(`UPDATE database SET database = (?) WHERE ID = (?)`).run(data, row.ID);
            return true 
            } catch(e) {
                return false
            }
        }
    }
  }