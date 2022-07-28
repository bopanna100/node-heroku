const fs =require("fs");

const quote="no buty shines brighter";
fs.writeFile("./awsome.html",quote,(err) => {
console.log("completed writing");
});

const quote2="live more";

console.log(process.argv);
const[ , ,nooffiles]=process.argv;

for(let i=1;i<=nooffiles;i++){
    fs.writeFile(`./backup/text-${i}.html`,quote2,(err)=>{
        console.log("completed");
    });
}
