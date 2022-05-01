module.exports = function(db, params) {  
    db.backup(`backup_${Date.now()}_db`).then(() => {
        return true
      })
    .catch((err) => {
        return false
      });
  }