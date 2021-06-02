"use strict";

var WorkingDirectory = require("../models/working-directory");

var GitCommand = require("../models/git-command");

var chai = require('chai');

var expect = chai.expect;
describe("Testing GitCommand.status()", function () {
  it('Should return information if has changes in directory', function () {
    var wd = new WorkingDirectory();
    wd.addFile("index.html", "views", "<html>Hello</html>");
    wd.addFile("index.js", "assets/scripts", "alert('Hi!')");
    var git = new GitCommand(wd);
    var output = git.status();
    expect(output).to.equal('You have 2 change/s.\nviews/index.html\nassets/scripts/index.js');
  });
  it('Should return information if no changes in directory', function () {
    var wd = new WorkingDirectory();
    var git = new GitCommand(wd);
    var output = git.status();
    expect(output).to.equal('You have 0 change/s.\n');
  });
});
describe("Testing GitCommand.add()", function () {
  it('Should success with exact path_file "views/index.html"', function () {
    var wd = new WorkingDirectory();
    wd.addFile("index.html", "views", "<html>Hello</html>");
    var git = new GitCommand(wd);
    git.init();
    var path_file = "views/index.html";
    var output = git.add(path_file);
    expect(output).to.equal('Successfully added as index file/s.');
  });
  it('Should failed with missing path_file "views/error404.html"', function () {
    var wd = new WorkingDirectory();
    wd.addFile("index.html", "views", "<html>Hello</html>");
    var git = new GitCommand(wd);
    git.init();
    var path_file = "views/error404.html";
    var output = git.add(path_file);
    expect(output).to.equal("Failed to add ".concat(path_file, "! File is not modified or missing."));
  });
  it('Should success with path_file "."', function () {
    var wd = new WorkingDirectory();
    wd.addFile("index.html", "views", "<html>Hello</html>");
    wd.addFile("actions.yml", ".github/workflows", "");
    var git = new GitCommand(wd);
    git.init();
    var output_add = git.add(".");
    var output_status = git.status();
    expect(output_add).to.equal('Successfully added as index file/s.');
    expect(output_status).to.equal('You have 0 change/s.\n');
  });
  it('Should success with path_file "*"', function () {
    var wd = new WorkingDirectory();
    wd.addFile("index.html", "views", "<html>Hello</html>");
    wd.addFile("actions.yml", ".github/workflows", "");
    var git = new GitCommand(wd);
    git.init();
    var output_add = git.add("*");
    var output_status = git.status();
    expect(output_add).to.equal('Successfully added as index file/s.');
    expect(output_status).to.equal('You have 1 change/s.\n.github/workflows/actions.yml');
  });
});