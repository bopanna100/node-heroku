const os = require("os");
console.log("total memory in gb", os.totalmem() / 1024 /1024  /1024);
console.log("free memory in gb",os.freemem()/1024/1024/1024);
console.log("version",os.version());
console.log("cpus",os.cpus());