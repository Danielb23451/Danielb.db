module.exports = function() {

    const Database = require("better-sqlite3");
    const db = new Database("./db.sqlite");

    function runFunction(method, params) {
        if (params.id && typeof params.id !== 'string') return new TypeError("The Paramter Must Be A String");
        db.prepare(`CREATE TABLE IF NOT EXISTS json (ID TEXT, json TEXT)`).run();
        if (params.data && params.data === Infinity) return new TypeError("The Data Cannot Be Infinity Number");
        if (params.id && params.id.includes("_")) {
            let unparsed = params.id.split("_");
            params.id = unparsed.shift();
        }
        return methods[method](db, params);
    }

    var methods = {
        get: require("./functions/get.js"),
        //set: require("./functions/set.js"),
        //unset: require("./functions/unset.js"),
        add: require("./functions/add.js"),
        //subtract: require("./functions/subtract.js"),
        push: require("./functions/push.js"),
        delete: require("./functions/delete.js"),
        deleteAll: require("./functions/deleteall.js"),
        has: require("./functions/has.js"),
        all: require("./functions/all.js"),
        typeof: require("./functions/typeof.js"),
        last: require("./functions/last.js"),
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

        unset: function (key, data) {
            if (!key) return new TypeError("No Key Specified");
            if (!data) return new TypeError("No Value Specified");
            return runFunction("unset", { id: key, data: data });
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

        deleteAll: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("deleteAll", { id: key });
        },

        clear: function (key) {
            if (!key) return new TypeError("No Key Specified");
            return runFunction("deleteAll", { id: key });
        },

        has: function (key) {
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
    };
    return object;
}