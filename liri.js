{{require("dotenv").config();

var request = require("request");


let moment = require('moment');


let fs = require("fs");


let keys = require("./keys.js");


let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);


var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);



var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");



function userCommand(userInput, userQuery) {
    
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("Please try again");
            break;
    }
}

userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n\nSearching for_${userQuery}'s next show...`);
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp" + bandsintown, 
function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var userBand = JSON.parse(body);
         if (userBand.length > 0) {
            for (i = 0; i < 1; i++) {

        
console.log(`\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

    var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
    console.log(`Date and Time: ${concertDate}\n\n _ _ _`);
                };
            } else {
                console.log('Searched concert and band not found!');
            };
        };
    });
};

function spotifyThisSong() {
    console.log(`\n\nSearching for..."${userQuery}"`);

    
    if (!userQuery) {
        userQuery = "Numb"
    };
    spotify.search({
        type: 'track',
        query: userQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('An Error occurred: ' + error);
        }
        
        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n . . `)
        };
    });
}

function movieThis() {
    console.log(`\n\nSearching for _ _"${userQuery}"`);
    if (!userQuery) {
        userQuery = "Mr. Nobody";
    };
    // REQUEST USING OMDB API
    request("http://www.omdbapi.com/?t=" + userQuery + "&apikey=503524e2", 
    
    
    function (error, response, body) {
        var userMovie = JSON.parse(body);
        var ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {}

        if (!error && response.statusCode === 200) {
            console.log(`\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n . .`)
        } else {
            return console.log("Movie able to be found. Error:" + error)
        };
    })
};

function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");

        
        userInput = dataArr[0];
        userQuery = dataArr[1];
     
        userCommand(userInput, userQuery);
    });
};
}
}