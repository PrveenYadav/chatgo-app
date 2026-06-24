/*
We can use this:
"build": "node -e \"require('fs').rmSync('dist',{recursive:true,force:true}); require('fs').cpSync('src','dist',{recursive:true})\"",

Or create a seperate file build.js for this and then:
"build": "node build.js"
 */

import fs from "fs";

fs.rmSync("dist", {
  recursive: true,
  force: true,
});

fs.cpSync("src", "dist", {
  recursive: true,
});

console.log("Build complete");