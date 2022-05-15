module.exports = function() {

    const Database = require("better-sqlite3");
    const db = new Database("./db.sqlite");

    function runFunction(method, params, type, path) {
        if (params.id && typeof params.id !== 'string') return new TypeError("The Paramter Must Be A String");
        db.prepare('CREATE TABLE IF NOT EXISTS json (ID TEXT, json TEXT)').run();
        if (params.data && params.data === Infinity) return new TypeError("The Data Cannot Be Infinity Number");

        if (type && path) {
            if (type !== 'sqlite' && type !== 'json') return new TypeError('The Type Must Be A sqlite/json')
            return methods[method](db, params, type, path);
        }
        return methods[method](db, params);
    }

    var methods = {
        get: require("./functions/get.js"),
        set: require("./functions/set.js"),
        add: require("./functions/add.js"),
        subtract: require("./functions/subtract.js"),
        push: require("./functions/push.js"),
        delete: require("./functions/delete.js"),
        deleteAll: require("./functions/deleteall.js"),
        has: require("./functions/has.js"),
        all: require("./functions/all.js"),
        typeof: require("./functions/typeof.js"),
        last: require("./functions/last.js"),
        backup: require('./functions/backup.js'),
        toJson: require('./functions/toJson.js'),
        math: require('./functions/math.js'),
        size: require('./functions/size.js'),
        pull: require('./functions/pull.js'),
        filter: require('./functions/filter.js')
    };

    let object = {
        name: require('../package.json').name,
        version: require('../package.json').version,
        fetch: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("get", { id: key });
        },

        get: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("get", { id: key });
        },
        set: function (key, data) {
            if (!key) return new TypeError("No Key Specified");
            if (!data) return new TypeError("No Value Specified");
            return runFunction("set", { id: key, data: data });
        },

        add: function (key, data) {
            if (!key) return new TypeError("No Key Specified");
            if (!data || typeof data !== 'number') return new TypeError("Please specify a vaild data");
            return runFunction("add", { id: key, data: data });
        },

        subtract: function (key, data) {
            if (!key) return new TypeError("No Key Specified");
            if (!data || typeof data !== 'number') return new TypeError("Please specify a vaild data");
            return runFunction("subtract", { id: key, data: data });
        },

        remove: function (key, data) {
            if (!key) return new TypeError("No Key Specified");
            if (!data || typeof data !== 'number') return new TypeError("Please specify a vaild data");
            return runFunction("subtract", { id: key, data: data });
        },

        push: function (key, data) {
            if (!key) return new TypeError("No Key Specified");
            if (!data || data.length == 0) return new TypeError("Please specify a vaild data");
            return runFunction("push", { id: key, data: data });
        },

        delete: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("delete", { id: key });
        },

        del: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("delete", { id: key });
        },

        deleteAll: function () {
            return runFunction("deleteAll", {});
        },

        clear: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("deleteAll", { id: key });
        },

        has: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("has", { id: key });
        },

        exists: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("has", { id: key });
        },

        includes: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("has", { id: key });
        },

        all: function () {
            return runFunction("all", {});
        },

        fetchAll: function () {
            return runFunction("all", {});
        },

        getAll: function () {
            return runFunction("all", {});
        },

        type: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("typeof", { id: key });
        },

        typeof: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("typeof", { id: key });
        },

        last: function () {
            return runFunction("last", {});
        },

        toJson: function () {
            return runFunction("toJson", {});
        },

        math: function(key, data, operator) {
            const list = ["*", "%", "-", "+", "/"]
            if (!key) return new TypeError("No Key Specified");
            if (!data || typeof data !== 'number') return new TypeError("Please specify a vaild data");
            if (!operator || typeof operator !== 'string' || !list.includes(operator)) return new TypeError("Please specify a vaild operator");
            return runFunction("math", { id: key, data: data, operator: operator });
        },

        size: function () {
            return runFunction("size", {});
        },

        pull: function (key, value) {
            if (!key) return new TypeError("No Key Specified");
            if (!data) return new TypeError("Please specify a vaild data");
            return runFunction("pull", { id: key, data: data });
        },

        filter: function (filterFN) {
            if (!filterFN || typeof filterFN != 'function') return new TypeError("No Function Specified");
            return runFunction("filter", { filter: filterFN });
        },

        backup: function () {
            return runFunction("backup", {});
        },

        };
    return object;
}