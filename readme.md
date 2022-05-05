# Danielb.db

<img src="https://cdn.discordapp.com/avatars/789486325396406302/3b48f8a44b87b2bbdb9147e364232c28.png" alt="Logo" width="200"/>    
   
[![node-current](https://img.shields.io/node/v/danielb.db?style=for-the-badge)](https://nodejs.org/en/)
[![GitHub contributors](https://img.shields.io/github/contributors/Danielb23451/danielb.db?style=for-the-badge)](https://github.com/Danielb23451/Danielb.db/graphs/contributors)
[![npm](https://img.shields.io/npm/dt/danielb.db?style=for-the-badge)](https://www.npmjs.com/package/danielb.db)

## Installation
```bash
npm install danielb.db
```

## Documentation

```js
const db = require('danielb.db')
db.set('test', 'test') //set key as string => test
db.add('test1', 1) // add number to key (if key dont exites the key will be the number) => 1
db.remove('test1', 1) // remove number to key (if key dont exites the key will be 0) => 0
db.subtract('test1', 1) // remove number to key (if key dont exites the key will be 0) => 0
db.math('test1', 5, '*') // use another operator (in the example its multiplier) => 5

db.all() // get all keys and values in the databse in array => [{ ID: 'test1', data: 1}, { ID: 'test', data: 'test' }]
db.getAll() // get all keys and values in the databse in array => [{ ID: 'test1', data: 1}, { ID: 'test', data: 'test' }]
db.fetchAll() // get all keys and values in the databse in array => [{ ID: 'test1', data: 1}, { ID: 'test', data: 'test' }]
db.toJson() // get all keys and values in the databse in json => {'test1': 1, 'test': 'test' }

db.size() // return number of keys in the database => 2

db.backup() // backup all database in new file => true

db.deleteAll() // delete all keys and values in the database => true
db.clear()// delete all keys and values in the database => true

db.delete('test') // delete key in the database => true
db.del('test') // delete key in the database => true

db.get('test') // get key in the database => 'test'
db.fetch('test') // get key in the database => 'test'

db.has('test') // check if key exites in the databse => true
db.exists('test') // check if key exites in the databse => true
db.includes('test') // check if key exites in the databse => true

db.type('test') // get type of key in the database => string
db.typeof('test') // get type of key in the database => string

```


## Example
```js
const Discord = require("discord.js");
const client = new Discord.Client({ intents: Object.keys(Discord.Intents.FLAGS) });
const db = require("danielb.db");
client.on("ready", () => {
   console.log(`Logged in as ${client.user.tag}`);
});

client.login("TOKEN");
```