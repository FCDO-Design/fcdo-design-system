const fs = require("fs");
const path = require("path");

module.exports = function componentLastUpdated(htmlFilePath, scssFilePath) {

    console.log("htmlFilePath:", htmlFilePath);
    console.log("scssFilePath:", scssFilePath);

  const designSystemRoot = process.cwd(); // or pass in if you prefer
  const frontEndRoot = path.join(process.cwd(), "fcdo-frontend");

  const htmlPath = path.join(
    designSystemRoot,
    "views/includes",
    htmlFilePath
  );

  const scssPath = path.join(
    frontEndRoot,
    scssFilePath
  );

  const htmlStat = fs.existsSync(htmlPath)
    ? fs.statSync(htmlPath)
    : null;

  const scssStat = fs.existsSync(scssPath)
    ? fs.statSync(scssPath)
    : null;

  let latestStat = null;
  let source = null;

  if (htmlStat && scssStat) {
    if (htmlStat.mtime > scssStat.mtime) {
      latestStat = htmlStat;
      source = "HTML";
    } else {
      latestStat = scssStat;
      source = "SCSS";
    }
  } else if (htmlStat) {
    latestStat = htmlStat;
    source = "HTML";
  } else if (scssStat) {
    latestStat = scssStat;
    source = "SCSS";
  }

  if (!latestStat) return null;

  return `${latestStat.mtime.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
    // hour: "2-digit",
    // // minute: "2-digit"
    // // })} (${source});
  })}`;
};