let path = require('path');
let baseDir = path.resolve('../');
let localConfig = {
  hostname: "localhost",
  port: 3000,
  viewDir: "./app/views",
  mongodb: {
    url:
      "mongodb+srv://thecuriousguru:thecuriousguru@cluster0-ynfeb.mongodb.net",
    databaseName: "logger",
    migrationsDir: path.resolve(baseDir,"server/migrations"),
    changelogCollectionName: "changelog"
  },
};
module.exports = localConfig;
