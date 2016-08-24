'use strict';

const rimraf = require('rimraf');
const path = require('path');
const mv = require('mv');
const mkdirp = require('mkdirp');
const clone = require("nodegit").Clone;
const replace = require("replace");
const ncp = require('ncp').ncp;

rimraf.sync(path.join(__dirname, '/templates'))
rimraf.sync(path.join(__dirname, '/tmp'))
mkdirp('./templates')

clone("https://github.com/googlesamples/android-architecture", "./tmp")
  .then(function(repo) {
    // checkOutAndCopy(repo,"todo-mvp")
    // checkOutAndCopy(repo,"todo-mvp-loaders");
    // checkOutAndCopy(repo,"todo-mvp-clean")
    // checkOutAndCopy(repo,"todo-mvp-dagger")
    // checkOutAndCopy(repo,"todo-mvp-contentproviders")
    checkOutAndCopy(repo, "todo-databinding");
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
        paths: ['./templates/todoapp'],
        recursive: true,
        silent: true,
      });

      mv('./tmp/todoapp/.gitignore', './tmp/todoapp/gitignore', function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Renamed root folder .gitignore")
      });

      mv('./tmp/todoapp/app/.gitignore', './tmp/todoapp/app/gitignore', function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Renamed app folder .gitignore")
      });

      console.log("Copying files to ./templates/" + name);
      ncp.limit = 1600;
      ncp('./tmp/todoapp', './templates/' + name, function(err) {
        if (err) {
          return console.error(err);
        }
        console.log('Copying complete!');
        rimraf.sync(path.join(__dirname, '/tmp'))
      });
    });
}