'use strict';


const rimraf = require('rimraf');
const path = require('path');
const mv = require('mv');
const mkdirp = require('mkdirp');
const clone = require("nodegit").Clone;
const replace = require("replace");
const filter = require('filter-files');
const findInFiles = require('find-in-files');
const ncp = require('ncp').ncp;
const Finder = require('fs-finder');

// Clone a given repository into the `./tmp` folder.
rimraf.sync(__dirname + '/templates')
mkdirp('./templates')

clone("https://github.com/googlesamples/android-architecture", "./tmp")
  .then(function(repo) {
    checkOutAndCopy(repo,"todo-mvp");
    // checkOutAndCopy(repo,"todo-mvp-loaders");
    // checkOutAndCopy(repo,"todo-mvp-clean");
    // checkOutAndCopy(repo,"todo-mvp-dagger");
    // checkOutAndCopy(repo,"todo-mvp-contentproviders");
    // checkOutAndCopy(repo,"todo-databinding");
  })
  .catch(function(err) {
    console.log(err);
  });

function checkOutAndCopy(repo, name) {
  repo.getBranch('refs/remotes/origin/' + name)
    .then(function(reference) {
      console.log("Checking out branch " + name);
      return repo.checkoutRef(reference);
    })
    .then(function() {

      replace({
        regex: "com.example.android.architecture.blueprints.todoapp",
        replacement: "<%= appPackage %>",
        paths: ['./tmp/todoapp'],
        recursive: true,
        silent: false,
      });

      mv('./tmp/todoapp/.gitignore', './tmp/todoapp/gitignore', function(err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log("Renamed root folder .gitignore")
        }
      });

      mv('./tmp/todoapp/app/.gitignore', './tmp/todoapp/app/gitignore', function(err) {
        if (err) {
          return console.log(err);
        } else {
          return console.log("Renamed app folder .gitignore")
        }
      });

      console.log("Copying files to ./templates/" + name);

      ncp.limit = 1600;

      ncp('./tmp/todoapp', './templates/' + name, function(err) {
        if (err) {
          return console.error(err);
        } else {
          console.log('Removing /tmp!');
          rimraf.sync(__dirname + '/tmp');
          return console.log('Copying complete!');
        }
      });
    });
}