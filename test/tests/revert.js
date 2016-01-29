// var assert = require("assert");
var RepoUtils = require("../utils/repository_setup");
var path = require("path");
// var fs = require("fs");
var local = path.join.bind(path, __dirname);

describe.only("Revert", function() {
  var NodeGit = require("../../");

  var Revert = NodeGit.Revert;

  var test;
  var fileName = "foobar.js";
  var repoPath = local("../repos/revertRepo");

  beforeEach(function() {
    test = this;

    return RepoUtils.createRepository(repoPath)
      .then(function(repository) {
        test.repository = repository;

        return RepoUtils.commitFileToRepo(
          repository,
          fileName,
          "line1\nline2\nline3"
        );
      })
      .then(function(firstCommit) {
        test.firstCommit = firstCommit;
      });
  });

  it("can revert a commit against itself", function() {
    return Revert.commit(
      test.repository,
      test.firstCommit,
      test.firstCommit,
      0
    )
      .then(function(index) {
        return index.writeTreeTo(test.repository);
      });
      // .then(function(oid) {
      //   var signature = test.repository.defaultSignature();
      //   return test.repository.createCommit(
      //     "HEAD",
      //     signature,
      //     signature,
      //     "second commit",
      //     oid,
      //     [test.firstCommit]
      //   );
      // })
      // .then(function(oid) {
      //   return test.repository.getCommit(oid);
      // })
      // .then(function(secondCommit) {
      //   return secondCommit.parent(0);
      // })
      // .then(function(parentOfSecondCommit) {
      //   var fileStats = fs.statSync(path.join(repoPath, fileName));
      //   assert.equal(parentOfSecondCommit, test.firstCommit);
      //   assert.ok(!fileStats.isFile());
      // });
  });
});
