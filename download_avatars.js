var request = require('request');

var repoOwner = process.argv[2];

var repoName = process.argv[3];

var token = require('secrets');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');

//

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


var cb = function callback(){

};
