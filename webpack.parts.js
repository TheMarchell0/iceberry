const path = require('path');
const glob = require('glob');

exports.entryPages = () => {
    const pagesFiles = glob.sync("./src/js/pages/**/*.js");
    const helpersFiles = glob.sync("./src/js/helpers/**/*.js");
    const entry = {};

    const addFilesToEntry = (files, rootDir) => {
        files.forEach(file => {
            const pageName = path.relative(path.join(__dirname, rootDir), file).replace(/\.js$/, '');
            entry[pageName] = "./" + path.relative(__dirname, file);
        });
    };

    addFilesToEntry(pagesFiles, 'src/js');
    addFilesToEntry(helpersFiles, 'src/js');

    return entry;
};
