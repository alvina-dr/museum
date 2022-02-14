var quotes = [
    "Adrien",
    "Alvina",
    "Vincent",
    "Cyril",
    "Maurine",
    "Pauline",
]
var author = [
    "Adrien",
    "Alvina",
    "Vincent",
    "Cyril",
    "Maurine",
    "Pauline",
]

function Quote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));

    document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
    document.getElementById('authorDisplay').innerHTML = author[randomNumber];
}

Quote;

