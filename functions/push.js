module.exports = function (db, params) {

    // Fetch entry
    let fetched = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    if (!fetched) {
        db.prepare(`INSERT INTO json (ID,json) VALUES (?,?)`).run(params.id, '{}');
        fetched = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    }
    if (fetched.json === '{}') fetched.json = [];
    else fetched.json = JSON.parse(fetched.json);
    if (!Array.isArray(fetched.json)) return new TypeError('The Old ID Isnt Vaild Array');
    fetched.json.push(params.data);
    params.data = fetched.json;
    params.data = JSON.stringify(params.data);
    db.prepare(`UPDATE json SET json = (?) WHERE ID = (?)`).run(params.data, params.id);
    let newData = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id).json;
    if (newData === '{}') return undefined;
    else {
        newData = JSON.parse(newData)
        return newData
    }
}