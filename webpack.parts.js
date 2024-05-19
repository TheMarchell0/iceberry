const path = require('path');
const glob = require('glob');

exports.entryPages = () => {
    const pagesFiles = glob.sync("./src/js/pages/**/*.js");
    const entry = {};

    pagesFiles.forEach(file => {
        const pageName = path.relative(path.join(__dirname, 'src/js'), file).replace(/\.js$/, '');
        entry[pageName] = "./" + path.relative(__dirname, file);
    });

    return entry;
};
