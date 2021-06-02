"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GitCommand =
/*#__PURE__*/
function () {
  function GitCommand(working_directory) {
    _classCallCheck(this, GitCommand);

    this.working_directory = working_directory;
  } //Command: git init 


  _createClass(GitCommand, [{
    key: "init",
    value: function init() {
      this.staging = [];
      this.local_repository = [];
      return "Initialized as empty Git repository.";
    } //Command: git status

  }, {
    key: "status",
    value: function status() {
      /*
          For assignment #1:
          Create logic here and run unit testing.
      */
      console.log(this.staging);
      var directory = this.working_directory;
      var file_count = Object.keys(directory.new_changes);

      if (file_count.length) {
        return "You have ".concat(file_count.length, " change/s.\n").concat(file_count[0] ? file_count[0] : null, "\n").concat(file_count[1] ? file_count[1] : null);
      }

      return "You have ".concat(file_count.length, " change/s.\n");
    } //Command: git add <filename/file directory/wildcard> 

  }, {
    key: "add",
    value: function add(path_file) {
      var modified_files = this.working_directory.new_changes;

      if (modified_files[path_file]) {
        this.staging.push(modified_files[path_file]);
        delete modified_files[path_file];
      }
      /*
          For assignment #2:
          Create logic here and run unit testing.
          Don't forget to uncomment the unit tests.
      */
      else if (path_file === ".") {
          this.working_directory.new_changes = this.local_repository;
        } else if (path_file === "*") {} else {
          return "Failed to add ".concat(path_file, "! File is not modified or missing.");
        }

      return "Successfully added as index file/s.";
    } //Command: git commit -m "<message>"

  }, {
    key: "commit",
    value: function commit(message) {
      if (this.staging.length > 0) {
        this.local_repository.push({
          "message": message,
          "files": this.staging
        });
        this.staging = [];
        return "Done committing to local repository.";
      }

      return "Nothing to commit.";
    } //Command: git push

  }, {
    key: "push",
    value: function push() {
      if (this.local_repository.length > 0) {
        return "Done pushing to remote repository.";
      } else {
        return "Nothing to push. No committed file found.";
      }
    }
  }]);

  return GitCommand;
}();

module.exports = GitCommand;