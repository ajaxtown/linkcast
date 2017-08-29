var FileSystem = require("fs");
var path = require("path");
var archiver = require("archiver");

module.exports = function(params, isDev) {
    var htmlFileName = "dev/popup.html";
    var html = FileSystem.readFileSync(
        path.join(params.root, htmlFileName),
        "utf8"
    );
    var htmlOutput = html
        .replace("http://localhost:3000/build", "")
        .replace("development_mode", "prod");
    FileSystem.writeFileSync(
        path.join(params.root, "build", "popup.html"),
        htmlOutput
    );
    var jsFileName = "dev/background.js";
    var js = FileSystem.readFileSync(
        path.join(params.root, jsFileName),
        "utf8"
    );
    var jsOutput = js.replace(
        "http://localhost:8000",
        "http://playground.ajaxtown.com/youtube_chrome_backend/index.php"
    );
    FileSystem.writeFileSync(
        path.join(params.root, "build", "background.js"),
        jsOutput
    );
    // zip it.
    var output = FileSystem.createWriteStream(params.target);
    var archive = archiver("zip");

    // listen for all archive data to be written
    output.on("close", function() {
        console.log(archive.pointer() + " total bytes");
        console.log(
            "archiver has been finalized and the output file descriptor has closed."
        );
    });
    archive.pipe(output);
    archive.directory(params.src, false);
    archive.finalize();
    if (typeof params.callback == "function") {
        params.callback(params);
    }
};