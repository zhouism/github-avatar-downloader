var request = require('request');

var token = require('./secrets');

var fs = require('fs');

var repoOwner = process.argv[2];

var repoName = process.argv[3];


var cb = function callback(obj){
  for (var i = 0; i < obj.length; i++) {
    var filePath = obj.login;
    var url = obj.avatar_url;
  }
};


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'Authentication' : token.GITHUB_TOKEN,
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
    var obj = JSON.parse(body);
    console.log(obj); //=> returns as objects
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         console.log("error");
         throw err;
       })
       .on('response', function (response) {
        console.log('Downloading Image')
         console.log('Response Status Code: ', response.statusCode);
         console.log('Download Complete.');
       })
       .pipe(fs.createWriteStream(filePath));
}

console.log('Welcome to the GitHub Avatar Downloader!');

//

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});




