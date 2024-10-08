"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: [
                "./src/views/**/*.html",
                "./src/views/pages/*.html"
            ],
            dist: "./dist/",
            watch: [
                "./src/blocks/**/*.html",
                "./src/views/**/*.html"
            ]
        },
        styles: {
            src: ["./src/styles/**/*.{scss,sass}", "./src/styles/pages/**/*.{scss,sass}"],
            dist: "./dist/styles/",
            watch: [
                "./src/blocks/**/*.scss",
                "./src/styles/**/*.{scss,sass}",
                "./src/styles/pages/**/*.{scss,sass}"
            ]
        },
        scripts: {
            src: ["./src/js/main.js", "./src/js/pages/**/*.js", "./src/js/helpers/**/*.js"],
            dist: "./dist/js/",
            watch: [
                "./src/blocks/**/*.js",
                "./src/js/main.js",
                "./src/js/pages/**/*.js",
                "./src/js/helpers/**/*.js",
            ]
        },
        images: {
            src: [
                "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            dist: "./dist/img/",
            watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}"
        },
        sprites: {
            src: "./src/img/sprites/*.svg",
            dist: "./dist/img/sprites/",
            watch: "./src/img/sprites/*.svg"
        },
        fonts: {
            src: "./src/fonts/**/*.{eot,otf,svg,ttf,woff,woff2}",
            dist: "./dist/fonts/",
            watch: "./src/fonts/**/*.{eot,otf,svg,ttf,woff,woff2}"
        },
        favicons: {
            src: "./src/img/favicon/*.{jpg,jpeg,png,gif}",
            dist: "./dist/img/favicons/",
        },
        gzip: {
            src: "./src/.htaccess",
            dist: "./dist/"
        }
    };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "sprites", "fonts", "favicons", "replace-paths", "swiper-styles", "robots-txt"]),
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.parallel(["views", "styles", "scripts", "images", "sprites", "fonts", "favicons", "gzip", "replace-paths", "swiper-styles", "robots-txt"]));

export default development;