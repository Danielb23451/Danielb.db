module.exports = function (db, params) {
    let get = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    if (!get) {
        db.prepare(`INSERT INTO json (ID,json) VALUES (?,?)`).run(params.id, '{}');
        get = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id);
    }
    if (get.json === '{}') get.json = [];
    else get.json = JSON.parse(get.json);
    if (!Array.isArray(get.json)) return new TypeError('The Old ID Isnt Vaild Array');
    get.json.push(params.data);
    params.data = get.json;
    params.data = JSON.stringify(params.data);
    db.prepare(`UPDATE json SET json = (?) WHERE ID = (?)`).run(params.data, params.id);
    let newData = db.prepare(`SELECT * FROM json WHERE ID = (?)`).get(params.id).json;
    if (newData === '{}') return undefined;
    else {
        newData = JSON.parse(newData)
        return newData
    }
}