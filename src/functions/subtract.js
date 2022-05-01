module.exports = function (db, params) {
    let get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
    if (!get) {
        db.prepare(`INSERT INTO database (ID,json) VALUES (?,?)`).run(params.id, '{}');
        get = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id);
    }
    if (get.json === '{}') fetched.json = 0;
    else get.json = JSON.parse(get.json)
    if (typeof fetched.json !== 'number') return new TypeError('The Data Must Be A Number');
    params.data = parseInt(get.json, 10) - parseInt(params.data, 10);
    params.data = JSON.stringify(params.data);
    db.prepare(`UPDATE database SET json = (?) WHERE ID = (?)`).run(params.data, params.id);
    let newData = db.prepare(`SELECT * FROM database WHERE ID = (?)`).get(params.id).json;
    if (newData === '{}') return undefined;
    else {
        newData = JSON.parse(newData)
        return newData
    }
}