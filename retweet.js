//your settings go here
var config = {
    screenName: 'marcoarment',
    replaceWith: 'coffee',
    consumerKey: 'yourConsumerKey',
    consumerSecret: 'yourConsumerSecret',
    accessTokenKey: 'yourAccessKey',
    accessTokenSecret: 'yourAccessSecret'
};

//now lets get to work
var util = require('util');
var twitter = require('twitter');

//init
var tweeter = new twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
});

//where all the magic happens
function write(data) {

    if (typeof data.text !== 'undefined' && typeof data.user !== 'undefined'  && typeof data.user.screen_name !== 'undefined'  && data.user.screen_name == config.screenName) {

        //split out the original text
        var tmpTxt = data.text.split(' ');

        //pick a random word to replace
        tmpTxt[Math.floor(Math.random()*tmpTxt.length)] = config.replaceWith;

        //construct our new string
        var text = tmpTxt.join(' ');

        //Let's do this
        console.log('Tweeting: ' + text);
        tweeter.updateStatus(text, function(response){
	        console.log(response);
        });

    }

}


//set listeners
function startStreaming() {

    console.log('Listening for Tweets');

    tweeter.stream('user', function(stream) {

        console.log('Starting Stream');

        //listen for new data and process
        stream.on('data', write);

        //if the connection is dropped we'll reconnect
        stream.on('end', function(){
            setTimeout(startStreaming, 500);
        })

    });

}


//start the chaos
startStreaming();