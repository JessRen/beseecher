var path = require('path');

// Import the list of beseecher entries
var friendsData = require('../data/friends.js');

// Export API routes
module.exports = function(app) 
  {
  // console.log('___ENTER apiRoutes.js___');

  // Total list of beseecher entries
  app.get('/api/friends', function(req, res) 
    {
    res.json(friendsData);
    });

  // Add new beseecher entry
  app.post('/api/friends', function(req, res) 
    {
    // setting the user input object
    var newFriend = req.body;
    console.log('newFriend = ' + JSON.stringify(newFriend));

    // Add new user
    friendsData.push(newFriend);
    
    var userResponses = newFriend.scores;

    // Compute beseeching match
    var matchName = '';
    var matchProfile = '';
    var totalDifference = 10000; // Initial value big for comparison

    // Attain diff score by q for all beseechers
    for (var i = 0; i < friendsData.length; i++) 
    {
      // console.log('friend = ' + JSON.stringify(friends[i]));
      // Compute differences for each question
      var diff = 0;
      for (var j = 0; j < userResponses.length; j++) {
        diff += Math.abs(friendsData[i].scores[j] - userResponses[j]);
      } // math.abs for absolute value, ignoring + or -

      // console.log('diff = ' + diff);

      // If lowest difference, record the friend match
      if (diff < totalDifference) 
        {
         console.log('Closest match found = ' + diff);
         console.log('Friend name = ' + friendsData[i].name);
         console.log('Friend profile = ' + friendsData[i].profile);

         totalDifference = diff;
         matchName = friendsData[i].name;
         matchProfile = friendsData[i].profile;
        }
    }

   

    // Send appropriate response
    res.json({status: 'OK', matchName: matchName, matchProfile: matchProfile});
  }); // closes app.post
}; // closes module function
