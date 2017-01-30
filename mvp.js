var yeomanTest = require('yeoman-test');
var rimraf = require('rimraf');
var path = require('path');
var fs = require('fs');
var archiver = require('archiver');

var context = yeomanTest.run(path.resolve('./generators/app'));
context.settings.tmpdir = false; // don't run in tempdir
yeomanTest.testDirectory("MyApp", function() {
	context.withPrompts({
	        name: 'SampleApp',
	        package: 'com.sample.mvp',
	        targetSdk: '21',
	        minSdk: '14'
	      })
	.on('end', function () {
		// create a file to stream archive data to.
		var output = fs.createWriteStream(__dirname + '/MyApp.zip');
		var archive = archiver('zip', {
		    store: true // Sets the compression method to STORE.
		})

		output.on('close', function() {
		  console.log(archive.pointer() + ' total bytes');
		  console.log('archiver has been finalized and the output file descriptor has closed.');
		});

		archive.on('error', function(err) {
		  console.log(err);
		});

		archive.pipe(output);
		archive.directory(__dirname + '/MyApp/');
		archive.finalize();
	});
})