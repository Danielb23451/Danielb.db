module.exports = function(db, params) {  
    db.backup(`db.backup.${Date.now()}`).then(() => {
        return true;
      }).catch((err) => {
        return false
      });
  }