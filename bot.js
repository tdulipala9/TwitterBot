// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

//DEBUG
var debug = false;

// Wordnik stuff
var WordnikAPIKey = 'YOUR WORDNIK API KEY HERE';
var request = require('request');
var inflection = require('inflection');
var pluralize = inflection.pluralize;
var capitalize = inflection.capitalize;
var singularize = inflection.singularize;
var pre = [
	"Paw-don me, but are you fur real?!",
	"Looking good, feline good.", 
	"You're the cat's pawjamas",
	"Live long and pawsper.",
	"Meow you doin'?",
	"I've got felines for you.",
	"Best furiends furever.",
	"Wait a meow-nute.",
	"He always does the bare mew-nimum.",
	"I'm a total cat purrson.",
	"You're purrfect just the way you are.",
	"So fur, so good.",
	"It ain't easy being this purr-fect.",
	"When I'm with you I'm feline good.",
	"Stay paw-sitive.",
	"What do you call a pile of cats? \n A meowtain",
	"Cat puns are so a-mew-sing.",
	"Right meow, it's nap time.",
	"Meow's it goin'?",
	"What's a cat's favorite color? \n Purr-ple!",
	"What is a cat's favorite kind of sports car? \n A furr-ari",
	"What is a cat's favorite discount? \n Buy one get one furry.",
	"Cats love to listen to meow-sic.",
	"Living in a gangsta's purr-adise.",
	"I'm craving a purr-ito.",
	"Why do cats always win video games? \n Because they have nine lives.",
	"Knock, knock. Who's there? \n Kitten. \n Kitten, who? \n Quit kitten around and open the door.",
	"Don't want to work, just want to play with cats, I'm pro-cat-stinating.",
	"You've got purr-sonality."
];		//cat puns

var count = pre.length;

// Blacklist
var wordfilter = require('wordfilter');

// Twitter Essentials
// Twitter Library
var Twit = require('twit');

// Include configuration file
var T = new Twit(require('./config.js'));

// Helper function for arrays, picks a random thing
Array.prototype.pick = function() {
	return this[Math.floor(Math.random()*this.length)];
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function randPick() {
	var rand = Math.floor(Math.random()*count);
	return pre[rand];
}

// This is the URL of a search for the latest tweets on the '#cats' hashtag.
var catsSearch = {q: "#cats", count: 10, result_type: "recent"}; 



// This is the URL of a search for a popular/likes tweets on the '#kittens' hashtag.
var kittensSearch = {q: "#kittens", count: 10, result_type: "popular"}; 


// This function finds the latest tweet with the #cats hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', catsSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
				like(retweetId)
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}
// This function finds a popular tweet with the #kittens hashtag, and retweets it.
function retweetPopular() {
	T.get('search/tweets', kittensSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
				like(retweetId)
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}






















// Wordnik stuff
function nounUrl(minCorpusCount, limit) {
	return "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=noun&minCorpusCount=" + minCorpusCount + "&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=" + limit + "&api_key=" + WordnikAPIKey;
}

// Like the tweet
function like(tweetId) {
    T.post('favorites/create', {id: tweetId}, function(err, response) {
        if (err != null){
            console.log('Error: ', err);
        }
        else {
            console.log('Liked: ', tweetId);
        }
    });
}

//find one message randomly to like
function randLike() {
    T.get('search/tweets', {q: "#cat", count:10, result_type: "recent", lang: "en"}, function (error, data) {

        // If our search request to the server had no errors...
        if (!error && data!= null && data.statuses.length > 0) {
          // ...then we grab the ID of the tweet we want to like
            if(Math.random() > 0.5)
                like(data.statuses[0].id_str);
           
        }
        // However, if our original search request had an error, we want to print it out here.
        else {
          console.log('There was an error with your hashtag search:', error);
        }
      }); 
      
}

//follow the {uId} user
function follow(uId) {
    T.post('friendships/create', {id: uId}, function(err, response) {
        if (err != null){
            console.log('Follow user ' + uId + ' failed: ', err);
        }
        else {
            console.log('Followed: ', uId);
        }
    });
}

//unfollow the {uId} friend
function unfollow(uId) {
    T.post('friendships/destroy', {id: uId}, function(err, response) {
        if (err != null){
            console.log('Unfollow user ' + uId + ' failed: ', err);
        }
        else {
            console.log('Followed: ', uId);
        }
    });
}

// Post a status update
function tweet() {
	//cat pun
	var tweetText = randPick();

	if(debug) 
		console.log('Debug mode: ', tweetText);
	else
		T.post('statuses/update', {status: tweetText }, function (err, data, reply) {
			if (err != null){
				console.log('Error: ', err);
			}
			else {
				console.log('Tweeted: ', tweetText);
				like(data.id_str);
			}
		});
}

//reply to the tweet and follow the user
function replyMentions() {
    T.get('statuses/mentions_timeline', {count: 5}, function (err, reply) {
        if (err != null) {
          console.log('Get mentioned failed: ', err);
        }
        else {
            if(reply != null && reply.length > 0) {
                //console.log(reply);
                var tweet = reply.pick();
                var sn = tweet.user.screen_name;
                var uId = tweet.user.id_str;
                var tId = tweet.id;
                console.log('User ' + sn + ' mentioned me in the post ' + tId + '.');

                //reply to user
                replyTo(sn, tId);

                //follow the user
                follow(uId);

            }
            else 
                console.log("No one mentioned me!");
          
      }
  });
}

function replyTo(sn, tId) {
    var replyText = '@' + sn + ', it is glad to know it. thank you for your information.';
    T.post('statuses/update', {status: replyText, in_reply_to_status_id: tId}, function (err, data, reply) {
        if(err != null) {
            console.log('Reply to ' + sn + ' post failed: ', err);
        }
        else {
            console.log('Reply to ' + sn + ' successful!');
        }
    });
}

function followAMentioner() {
	T.get('statuses/mentions_timeline', { count:50, include_rts:1 },  function (err, reply) {
		  if (err !== null) {
			console.log('Error: ', err);
		  }
		  else {
		  	var sn = reply.pick().user.screen_name;
			if (debug) 
				console.log(sn);
			else {
				//Now follow that user
				T.post('friendships/create', {screen_name: sn }, function (err, reply) {
					if (err !== null) {
						console.log('Error: ', err);
					}
					else {
						console.log('Followed: ' + sn);
					}
				});
			}
		}
	});
}

function respondToMention() {
	T.get('statuses/mentions_timeline', { count:100, include_rts:0 },  function (err, reply) {
		  if (err !== null) {
			console.log('Error: ', err);
		  }
		  else {
		  	mention = reply.pick();
		  	mentionId = mention.id_str;
		  	mentioner = '@' + mention.user.screen_name;
		  	
		  	var tweet = mentioner + " " + pre.pick();
			if (debug) 
				console.log(tweet);
			else
				T.post('statuses/update', {status: tweet, in_reply_to_status_id: mentionId }, function(err, reply) {
					if (err !== null) {
						console.log('Error: ', err);
					}
					else {
						console.log('Tweeted: ', tweet);
					}
				});
		  }
	});
}

function runBot() {
	console.log(" "); // just for legible logs
	var d=new Date();
	var ds = d.toLocaleDateString() + " " + d.toLocaleTimeString();
	console.log(ds);  // date/time of the request	

	// Get 200 nouns with minimum corpus count of 5,000 (lower numbers = more common words) 
	request(nounUrl(5000,200), function(err, response, data) {
		if (err != null) return;		// bail if no data
		nouns = eval(data);

		// Filter out the bad nouns via the wordfilter
		
		for (var i = 0; i < nouns.length; i++) {
			if (wordfilter.blacklisted(nouns[i].word))
			{
				console.log("Blacklisted: " + nouns[i].word);
				nouns.remove(nouns[i]);
				i--;
			}				
		}

		
		
		///----- NOW DO THE BOT STUFF
		var rand = Math.random();

 		if(rand <= 1.60) {      
			console.log("-------Tweet something");
			tweet();
			
		} else if (rand <= 0.80) {
			console.log("-------Tweet something @someone");
			respondToMention();
			
		} else {
			console.log("-------Follow someone who @-mentioned us");
			followAMentioner();
		}
	});
}
	/*//post gif preparations
	{
		name: "bot1";
	}
	//Add gif with each tweet
	var fs = require('fs');
	var b64content = fs.readFileSync('./gifs/walk.gif', {encoding: 'base64'});

	T.post('media/upload', {media_data: b64content}, function(err, data, response) {
        var mediaIdStr = data.media_id_string
        var altText = "cat walking."
        var meta_params = {media_id: mediaIdStr, alt_text: {text: altText }}

		T.post('media/metadata/create', meta_params, function(err, data, response) {
            if (!err) {
                if (outerTweet != undefined) {
                    var params = {status: "You: " + outerTweet + "\n\nElon if he received $8 for every word you tweeted: \nI'm $" + tweetCost(outerTweet) + " richer!", media_ids: [mediaIdStr]}
                }
                
                T.post('statuses/update', params, function(err, data, response) {
                    console.log(data)
                })
            }
		})
	})
}*/

// Run the bot
runBot();

// And recycle every hour
setInterval(runBot, 1000 * 60 * 60);

// Try to retweet something as soon as we run the program...
retweetLatest();
retweetPopular();
tweet();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);
