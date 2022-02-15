var quotes = [
    "Le premier mérite d’un tableau est d’être une fête pour l’oeil.",
    "Le secret de n'avoir pas d'ennuis, pour moi du moins, c'est d'avoir des idées.",
    "Il faut toujours gâter un peu un tableau pour le finir.",
    "L'exécution, dans la peinture, doit toujours tenir de l'improvisation.",
    "L'artiste vient à la vie pour un accomplissement qui est mystérieux. Il est un accident. Rien ne l'attend dans le monde social.",
    "Mes dessins inspirent et ne définissent pas.",
    "Un peintre d'histoire peint l'homme en général un portraitiste peint un individu et par conséquent un modèle imparfait.",
    "Sa façon d'élaborer ensemble tous les éléments du tableau - le tout simultanément, de la même manière que la nature lorsqu'elle crée.",
    "Ce chaos, cet aspect brut et confus, par un tour de magie, prennent forme s'ils sont vus d'une certaine distance.",
    "Les peintres sont dans la dépendance de la nature ; elle leur sert constamment de modèle ; ils tirent parti de ses éléments les meilleurs et les plus beaux pour s'ingénier à la copier ou à l'imiter.",

]
var author = [
    "Eugène Delacroix",
    "Eugène Delacroix",
    "Eugène Delacroix",
    "Eugène Delacroix",
    "Odilon Redon",
    "Odilon Redon",
    "Joshua Reynolds",
    "Joshua Reynolds",
    "Joshua Reynolds",
    "Giorgio Vasari",
]

function Quote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));

    document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
    document.getElementById('authorDisplay').innerHTML = author[randomNumber];
}

Quote;

