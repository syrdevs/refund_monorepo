const fs = require("fs");


let content = [];

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

let pageFileList = getFiles("./src/pages").map((fileName) => (fileName.replace("./src", ".."))).filter((file) => (file.indexOf(".js") !== -1));
let components = "";

pageFileList.forEach((file, idx) => {
  content.push("import component_" + idx + " from " + "\"" + file + "\";\n");
  components += " \"" + file.replace(".js", "") + "\":component_" + idx + ", ";
});

content.push("\n");
content.push("module.exports = {" + components + "}");

fs.writeFile("./src/Router/routingList.js", content.join(""), function(err) {
  if (err) throw err;
  console.log("Saved!");
});