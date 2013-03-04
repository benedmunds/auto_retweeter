var util = require('util');
var twitter = require('twitter');

var twit = new twitter({
    consumer_key: 'R0T6zXWYLS6KzpfRrsKuA',
    consumer_secret: 'piqYeeGce8rbVo69TcPt9EZG1hozYluQlnIc02yPMpo',
    access_token_key: '1240142701-PsIaMaFL7AWFAyeAo6KZg1tGVFe2homk26Nl5AN',
    access_token_secret: 'NU7NwUIzxhVuUJjlwmE2TRrhXjWUt1FqMuMM5BGMAY'
});

function write(data) {

    if ( typeof data === 'string') {
        console.log('1');
    }
    else if (typeof data.text !== 'undefined' && typeof data.user !== 'undefined'  && typeof data.user.screen_name !== 'undefined'  && (data.user.screen_name == 'ircmaxell' || data.user.screen_name == 'IrcSharepointTe')) {
        console.log('2');
        console.log(data.user.screen_name + ": " + data.text);

        var txttmp = data.text.split(' ');
        txttmp[Math.floor(Math.random()*txttmp.length)] = 'sharepoint';
        var text = txttmp.join(' ');

        console.log('Tweeting: ' + text);

        twit.updateStatus(text, function(){
            console.log('tweet callback');
        });
    }
    else if (data.delete) {
        console.log('DELETE');
    }
    else if (data.message) {
        console.log('ERROR' + data.message);
    }
    else {
        console.log('else');
        console.log(util.inspect(data));
    }
}
function reconnect() {
    setTimeout(startStreaming, 1000);
}

function startStreaming() {
    twit.stream('user', function(stream) {
        console.log('starting stream');
        stream.on('data', write);
        stream.on('end', reconnect)
    });
}

startStreaming();

console.log('listening for tweets');