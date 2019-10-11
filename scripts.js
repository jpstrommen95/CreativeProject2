const KEYS = "abcdefghijklmnopqrstuvwxyz1234567890-=[];,.";

let currKey = 'a';
let numCats = 0;
let isPlaying = true;

let getRandomKey = function() {
    console.log(currKey);

    let num = ((Math.random() * 10000) % KEYS.length);
    console.log(num);

    return KEYS.charAt(num);
};

window.onkeyup = function(event) {
    event.preventDefault();
    if (isPlaying) {
        let keyPressed = event.key;
        if (keyPressed.toLowerCase() === currKey.toLowerCase()) {
            currKey = getRandomKey();
            console.log(currKey);
            fetchCat(currKey);
            numCats++;
        }
        else {
            isPlaying = false;
            let results = "";
            results += "<h2 class='title'>You pressed " + keyPressed + " instead of " + currKey + ", so there are no more cats!!!</h2>";

            let plurality = "";
            if (numCats === 0) {
                plurality = "... Oh wait, I'm sorry";
            }
            else if (numCats === 1) {
                plurality = "cat";
            }
            else {
                plurality = "cats";
            }

            results += "<p class='subtitle'>At least you found " + numCats + " " + plurality + "...<a class='bye' onClick='goodBye()'>Good Bye!</a></p>";
            document.getElementById("messageBox").innerHTML = results;
            document.getElementById("catBox").innerHTML = "";
        }
    }
};

let fetchCat = function(key) {
    const url = "https://cataas.com/cat/says/Press " + key + " to find another cat!";
    window.fetch(url)
        .then(function(response) {
            console.log(response);
            return response.url;
        }).then(function(url) {
            console.log(url);

            let image = "";
            let message = "";
            let plurality = (numCats === 1) ? "cat" : "cats";
            message += "<h2 class='subtitle'>You found " + numCats + " " + plurality + "!</h2>";
            image += "<figure class='image imgSize box is-primary' ><img src='" + url + "'></img></figure>";

            document.getElementById("messageBox").innerHTML = message;
            document.getElementById("catBox").innerHTML = image;
        });
};

let goodBye = function() {
    console.log("Good Bye!");
    window.location.reload();
};
