var express = require('express');
var session = require('express-session');
var Grant = require('grant-express');
var cors = require('cors');

var config1 = {
    server: {
        protocol: 'http',
        host: 'localhost:8937'
    },
    goodreads: {
        key: 'PsiDYifchcrF6dDwoZUDw',
        secret: 'HnPDxSzASYdsx01c12Uu1CobP3e4xOWrFc2fOpk',
        callback: '/JoinAGroup'
    }
};
var grant = new Grant(config1);

var Purest = require('purest');
//var config = require('@//providers');
var goodreads_p = new Purest({
    provider: 'goodreads',
    key: 'PsiDYifchcrF6dDwoZUDw',
    secret: 'HnPDxSzASYdsx01c12Uu1CobP3e4xOWrFc2fOpk'
});


/*var goodreads = OAuthRequest({
 consumer: {
 key: 'PsiDYifchcrF6dDwoZUDw',
 secret: 'HnPDxSzASYdsx01c12Uu1CobP3e4xOWrFc2fOpk'
 }
 /* signature_method: 'HMAC-SHA1',
 hash_function: function (base_string, key) {
 return crypto.createHmac('sha1', key).update(base_string).digest('base64');
 } */ /*
 }); */


var app = express();
app.use(cors());
app.use(session({secret: 'very secret'}));
app.use(grant);

app.get('/JoinAGroup', function (req, res) {
    console.log(req.query);
    res.end(JSON.stringify(req.query, null, 2))

    var access_token = req.query.access_token;
    var access_secret = req.query.access_secret;

    /*response, content = goodreads.request(
     'http://www.goodreads.com/group/join?format=xml&id=88432 ' % url,
     'POST', body, headers)
     //http://www.goodreads.com/group/join?format=xml&id=GROUP_ID
     */
    goodreads_p.get('/api/auth_user', {
        auth: {
            oauth: [access_token, access_secret]
        }
    }, function (err, res, body) {
        console.log(body);
    });
})
;

app.listen(8967, function () {
    console.log('Express server listening on port ' + 8967)
});


/*

 var request_data = {
 // url: 'https://www.goodreads.com/oauth/authorize?oauth_callback=http://lvh.me',
 method: 'POST',
 data: {
 Group: 88432,
 status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
 }
 requestURL:  'http://www.goodreads.com/group/join?format=xml&id=GROUP_ID',
 headers: oauth.toHeader(oauth.authorize(request_data, token))
 };
 */

/*//var OAuthRequest = require('./');
 var crypto = require('crypto');
 var OAuthRequest = require('oauth-request');

 var goodreads = OAuthRequest({
 consumer: {
 key: 'PsiDYifchcrF6dDwoZUDw',
 secret: 'HnPDxSzASYdsx01c12Uu1CobP3e4xOWrFc2fOpk'
 },
 signature_method: 'HMAC-SHA1',
 hash_function: function(base_string, key) {
 return crypto.createHmac('sha1', key).update(base_string).digest('base64');
 },
 });

 goodreads.setToken({
 key: '',
 secret: process.env.TWITTER_TOKEN_SECRET
 });

 //list user timeline
 goodreads.get({
 url: 'https://api.goodreads.com/1.1/statuses/user_timeline.json',
 json: true
 }, function(err, res, tweets) {
 console.log(tweets);
 });

 //list user timeline limit 5
 goodreads.get({
 url: 'https://api.goodreads.com/1.1/statuses/user_timeline.json',
 qs: {
 count: 5
 },
 json: true
 }, function(err, res, tweets) {
 console.log(tweets);
 });

 //tweet
 // var tweet_id;
 // var message = 'Yay_-....!!!';

 // goodreads.post({
 //     url: 'https://api.twitter.com/1.1/statuses/update.json',
 //     form: {
 //        status: message
 //     },
 //     json: true
 // }, function(err, res, tweet) {
 //     tweet_id = tweet.id_str;

 //     console.log(tweet);
 // });

 //delete above tweet
 // goodreads.post({
 //     url: 'https://api.twitter.com/1.1/statuses/destroy/' + tweet_id + '.json',
 //     json: true
 // }, function(err, res, tweet) {
 //     expect(tweet).to.have.property('id');
 //     expect(tweet).to.have.property('created_at');
 //     expect(tweet).to.have.property('text', message);
 //     done();
 // });



 /*var request = require('request');
 var OAuth   = require('oauth-1.0a');
 var crypto  = require('crypto');


 function hash_function_sha1(base_string, key) {
 return crypto.createHmac('sha1', key).update(base_string).digest('base64');
 }

 var oauth = OAuth({
 consumer: {
 key: '<PsiDYifchcrF6dDwoZUDw>',
 secret: '<HnPDxSzASYdsx01c12Uu1CobP3e4xOWrFc2fOpk>'
 },
 signature_method: 'HMAC-SHA1',
 hash_function: function(base_string, key) {
 return crypto.createHmac('sha1', key).update(base_string).digest('base64');
 }
 });

 //oauth.authorize(request, token);


 //var GroupID = IDOfGroup.value;
 var request_data = {
 // url: 'https://www.goodreads.com/oauth/authorize?oauth_callback=http://lvh.me',
 method: 'POST',
 data: {
 Group: 88432,
 status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
 }
 requestURL:  'http://www.goodreads.com/group/join?format=xml&id=GROUP_ID',
 headers: oauth.toHeader(oauth.authorize(request_data, token))
 };

 request({
 url: request_data.url,
 method: request_data.method,
 form: request_data.data,
 headers: oauth.toHeader(oauth.authorize(request_data, token))
 }, function(error, response, body) {
 //process your data here
 });





 var express = require('express');
 var bodyParser = require('body-parser'); */
/*
 var app = express();
 var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

 app.engine('handlebars', handlebars.engine);
 app.set('view engine', 'handlebars');
 app.set('port', 8937);
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

 app.get('/JoinAGroup', function(req, res){
 res.render('layouts/JoinAGroup');
 });

 app.post('/', function(req, res){
 console.log(req);
 //res.render('post', context);
 });

 app.use(function(req, res){
 res.status(404);
 res.render('404');
 });

 app.use(function(err, req, res, next){
 console.log(err.stack);
 res.status(500);
 res.render('500');
 });

 app.listen(app.get('port'), function(){
 console.log('Express started on port 8937');
 }); */