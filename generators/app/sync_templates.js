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
const deferred = require('deferred');

// Clone a given repository into the `./tmp` folder.
rimraf.sync(__dirname + '/templates')
rimraf.sync(__dirname + '/tmp')
mkdirp('./templates')

clone("https://github.com/googlesamples/android-architecture", "./tmp")
  .then(function(repo) {
    checkOutAndCopy(repo, "todo-mvp")(function(success) {
      checkOutAndCopy(repo, "todo-mvp-dagger")(function(success) {
        checkOutAndCopy(repo, "todo-mvp-loaders")(function(success) {
          checkOutAndCopy(repo, "todo-mvp-clean")(function(success) {
            checkOutAndCopy(repo, "todo-mvp-rxjava")(function(success) {
              checkOutAndCopy(repo, "todo-mvp-contentproviders")(function(success) {
                checkOutAndCopy(repo, "todo-databinding")(function(success) {
                  rimraf.sync(__dirname + '/tmp')
                  console.log('success is', success);
                });
              });
            });
          });
        });
      });
    });
  })
  .catch(function(err) {
    console.log(err);
  });

function checkOutAndCopy(repo, name) {
  let def = deferred();
  repo.getBranch('refs/remotes/origin/' + name)
    .then(function(reference) {
      console.log("Checking out branch " + name);
      return repo.checkoutRef(reference);
    })
    .then(function() {
      replaceAndRename(true);
      copyFiles(name, def);
    });
  return def.promise;
}

function copyFiles(name, def) {
  console.log("Copying files to ./templates/" + name);

  ncp('./tmp/todoapp', './templates/' + name, function(err) {
    if (err) {
      console.error(err);
      def.reject('error');
    } else {
      replaceAndRename(false);
      def.resolve('Copying complete!');
    }
  });
}

function replaceAndRename(toggle) {
  let dotGitignore = "./tmp/todoapp/.gitignore";
  let gitIgnore = "./tmp/todoapp/gitignore";
  let appDotGitignore = "./tmp/todoapp/app/.gitignore";
  let appGitIgnore = "./tmp/todoapp/app/gitignore";

  replace({
    regex: toggle ? "com.example.android.architecture.blueprints.todoapp" : "<%= appPackage %>",
    replacement: toggle ? "<%= appPackage %>" : "com.example.android.architecture.blueprints.todoapp",
    paths: ['./tmp/todoapp'],
    recursive: true,
    silent: true,
  });

  mv(toggle ? dotGitignore : gitIgnore, toggle ? gitIgnore : dotGitignore, function(err) {
    if (err) {
      return console.log(err);
    } else {
      let file = toggle ?  ".gitignore" : "gitignore";
      return console.log("Renamed root folder " + file);
    }
  });

  mv(toggle ? appDotGitignore : appGitIgnore, toggle ? appGitIgnore : appDotGitignore, function(err) {
    if (err) {
      return console.log(err);
    } else {
      let file = toggle ?  ".gitignore" : "gitignore";
      return console.log("Renamed app folder " + file);
    }
  });
}