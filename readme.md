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

**Soon**


## Example
```js
const Discord = require("discord.js");
const client = new Discord.Client({ intents: Object.keys(Discord.Intents.FLAGS) });
const db = require("danielb.db");
client.on("ready", () => {
   console.log(`Logged in as ${client.user.tag}`);
});

db.set('test', 'test')
db.add('test1', 1)
db.all()
db.deleteAll()
db.delete('test')

client.login("TOKEN");
```