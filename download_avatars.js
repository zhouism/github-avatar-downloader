var request = require('request');

var token = require('./secrets');

var fs = require('fs');

var repoOwner = process.argv[2];

var repoName = process.argv[3];


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authentication': token.GITHUB_TOKEN
  }
};

    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
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
         .pipe(fs.createWriteStream(filePath + '.jpg'));
  };

console.log('Welcome to the GitHub Avatar Downloader!');


getRepoContributors("jquery", "jquery", function(err, results) {
  //console.log("Errors:", err);
  console.log('results:', results);
  for(var i  = 0; i < results.length; i++){
    //console.log(results[i]); => prints all the avatar_url
    if (!repoOwner || !repoName) {
      console.log('Please provide the repo owner and name.');
    } else {
    downloadImageByURL(results[i].avatar_url, './avatars/' + results[i].login);
  }
};
});
