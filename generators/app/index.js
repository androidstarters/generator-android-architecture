'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
const mkdirp = require('mkdirp');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the badass ' + chalk.red('generator-android-architecture') + ' generator!'
    ));

    var prompts = [{
      name: 'name',
      message: 'What are you calling your app?',
      store: true,
      default: this.appname,
      validate: function (input) {
        if (/^([a-zA-Z0-9_]*)$/.test(input)) {
          return true;
        }
        return 'Your application name cannot contain special characters or a blank space, using the default name instead : ' + this.appname;
      }
    }, {
      name: 'package',
      message: 'What package will you be publishing the app under?',
      validate: function (input) {
        if (/^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)) {
          return true;
        }
        return 'The package name you have provided is not a valid Java package name.';
      },
      default: 'in.architecture.sample',
      store: true
    }, {
      type: 'list',
      name: 'architecture',
      message: 'Choose architecture from https://github.com/googlesamples/android-architecture?',
      choices: [{
        name: 'todo-mvp - Basic Model-View-Presenter architecture.',
        value: 'todo-mvp'
      }, {
        name: 'todo-mvp-loaders - Based on todo-mvp, fetches data using Loaders.',
        value: 'todo-mvp-loaders'
      }, {
        name: 'todo-mvp-databinding - Based on todo-mvp, uses the Data Binding Library.',
        value: 'todo-mvp-databinding'
      }, {
        name: 'todo-mvp-clean - Based on todo-mvp, uses concepts from Clean Architecture.',
        value: 'todo-mvp-clean'
      }, {
        name: 'todo-mvp-dagger - Based on todo-mvp, uses Dagger2 for Dependency Injection',
        value: 'todo-mvp-dagger'
      }, {
        name: 'todo-mvp-contentproviders - Based on todo-mvp-loaders, fetches data using Loaders and uses Content Providers',
        value: 'todo-mvp-contentproviders'
      }],
      default: 'todo-mvp'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.appPackage = props.package;
      this.appName = props.name;
      this.appPackage = props.package;
      this.androidTargetSdkVersion = props.targetSdk;
      this.androidMinSdkVersion = props.minSdk;
    }.bind(this));
  },

  writing: function () {
    var packageDir = this.props.package.replace(/\./g, '/');
    mkdirp('app');
    mkdirp('app/src/androidTest/java/' + packageDir);
    mkdirp('app/src/androidTestMock/java/' + packageDir);
    mkdirp('app/src/main/java/' + packageDir);
    mkdirp('app/src/mock/java/' + packageDir);
    mkdirp('app/src/prod/java/' + packageDir);
    mkdirp('app/src/test/java/' + packageDir);

    this.directory(this.props.architecture + '/gradle', 'gradle');

    this.copy(this.props.architecture + '/gitignore', '.gitignore');
    this.copy(this.props.architecture + '/build.gradle', 'build.gradle');
    this.copy(this.props.architecture + '/gradle.properties', 'gradle.properties');
    this.copy(this.props.architecture + '/gradlew', 'gradlew');
    this.copy(this.props.architecture + '/gradlew.bat', 'gradlew.bat');
    this.copy(this.props.architecture + '/settings.gradle', 'settings.gradle');
    // this.copy(this.props.architecture + '/README.md', 'README.md');
    this.copy(this.props.architecture + '/app/gitignore', 'app/.gitignore');
    this.copy(this.props.architecture + '/app/proguard-rules.pro', 'app/proguard-rules.pro');

    this.template(this.props.architecture + '/app/build.gradle', 'app/build.gradle');
    this.template(this.props.architecture + '/app/src/androidTest/java/com/example/android/architecture/blueprints/todoapp', 'app/src/androidTest/java/' + packageDir, this, {});
    this.template(this.props.architecture + '/app/src/androidTestMock/java/com/example/android/architecture/blueprints/todoapp', 'app/src/commonTest/java/' + packageDir, this, {});
    this.template(this.props.architecture + '/app/src/main/java/com/example/android/architecture/blueprints/todoapp', 'app/src/main/java/' + packageDir, this, {});
    this.template(this.props.architecture + '/app/src/mock/java/com/example/android/architecture/blueprints/todoapp', 'app/src/commonTest/java/' + packageDir, this, {});
    this.template(this.props.architecture + '/app/src/prod/java/com/example/android/architecture/blueprints/todoapp', 'app/src/commonTest/java/' + packageDir, this, {});
    this.template(this.props.architecture + '/app/src/test/java/com/example/android/architecture/blueprints/todoapp', 'app/src/test/java/' + packageDir, this, {});
    this.template(this.props.architecture + '/app/src/main/AndroidManifest.xml', 'app/src/main/AndroidManifest.xml');
    this.template(this.props.architecture + '/app/src/main/res', 'app/src/main/res', this, {});
  }
});
