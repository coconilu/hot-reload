const path = require("path");

const srcPrefix = path.resolve(process.cwd(), "src");

function superRequire(module) {
  let result = require(module);
  let currentModuleFile = require.resolve(module);
  let currentModuleDepFiles = collectDepFiles(currentModuleFile);
  console.log('currentModuleDepFiles: ', currentModuleDepFiles);
  return result;
}

function collectDepFiles(moduleFileName) {
  let currentModule = require.cache[moduleFileName];
  let currentModuleDepModules = new Set();
  currentModuleDepModules.add(currentModule);
  walkModuleChildren(currentModule, currentModuleDepModules);
  let files = [];
  currentModuleDepModules.forEach((m) => {
    files.push(m.filename);
  });
  return files;
}

function walkModuleChildren(module, depModules) {
  module.children.forEach((m) => {
    if (!depModules.has(m) && filterSrcFile(m.filename)) {
      depModules.add(m);
    }
  });
}

function filterSrcFile(fileName) {
  return fileName.startsWith(srcPrefix);
}

module.exports = superRequire;
