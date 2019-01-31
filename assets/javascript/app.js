/* This is just here so the file commits */

$( document ).ready(function() {

/*holds button content items and other references */
var fruitsAndVegetables = ["apple", "banana", "avocado", "avocado toast", "oranges", "strawberry", "blueberry", "raspberry", "guava", "tomato", "brocolli", "cucumber", "carrot", "potato"]

/*runs initial functions */
renderButtons();

/*generates buttons */

function renderButtons() {

    $("#button-section").empty();

    for (i = 0; i < fruitsAndVegetables.length; i++) {
        var btns = $("<button>");
        btns.addClass("button-item btn btn-outline-primary").attr("data-item", fruitsAndVegetables[i].split(' ').join('+')).text(fruitsAndVegetables[i]);
        $("#button-section").append(btns);
    }
}

/*adds event listener to buttons (including generated buttons)*/

$(document).on("click", ".button-item", function() {

    /*clears current images*/
    $("#gif-area").empty();

    /*grabs button that was clicked*/
    var fruitVeg = $(this).attr("data-item");

    /*stores api key and search parameters*/
    var aKey = "&api_key=7K9LQeTsgpgNcUHfzSivmYoR4EkxZ8x5&rating=g&limit=10";
    
    /*generates full url*/
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fruitVeg + aKey;

    /*queries API */
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function(response) {
            console.log(queryURL);

            var results = response.data;

            for (i=0; i<results.length; i++) {

                /*creates image div, then appends rating and image itself */
                var fruitVegDiv = $("<div>").attr("class", "individual-image border border-primary rounded");
                var pRate = $("<p>").attr("class", "img-rate-text").text("Rating: " + results[i].rating);
                var fruitVegImg = $("<img>").attr("class", "theGif").attr("src", results[i].images.fixed_height_still.url).attr("alt", results[i].title).attr("state", "still").attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url );

                fruitVegDiv.append(pRate).append(fruitVegImg);
            
                $("#gif-area").append(fruitVegDiv);

            }
        }); 

});

/*Event listener for generated images. Animates or renders still.*/

$(document).on("click",".theGif", function() {

    /*captures current image state */
    var state = $(this).attr("state");
    
    /*changes state from one to the other */
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate")).attr("state", "animate");
    }
      
    else {
        $(this).attr("src", $(this).attr("data-still")).attr("state", "still");
    }


});

/*adds button based off search input*/

$(".search-button").on("click", function(event) {

    event.preventDefault();

    var newFruitVeg = $(".search-input").val().trim();

    fruitsAndVegetables.push(newFruitVeg);

    renderButtons();


});

/*last parantheses. do not lose */
});