var quotes = [
    "Adrien",
    "Comment appelle-t-on un ghetto en Italie ? Un spaghetto.",
    "Pierre qui roule n'amasse pas de capital financier.",
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

