'use strict';
(function () {
    angular.module('autocompleteExample', [
        'ngAutocomplete'
    ])
        .controller('AutocompleteExampleController', AutocompleteExampleController);

    function AutocompleteExampleController() {
        const ctrl = this;

        // @formatter:off
        ctrl.data = [{"label":"The Shawshank Redemption"},{"label":"The Godfather"},{"label":"The Godfather: Part II"},{"label":"The Dark Knight"},{"label":"12 Angry Men"},{"label":"Schindler's List"},{"label":"Pulp Fiction"},{"label":"The Lord of the Rings: The Return of the King"},{"label":"The Good, the Bad and the Ugly"},{"label":"Fight Club"},{"label":"The Lord of the Rings: The Fellowship of the Ring"},{"label":"Forrest Gump"},{"label":"Star Wars: Episode V - The Empire Strikes Back"},{"label":"Inception"},{"label":"The Lord of the Rings: The Two Towers"},{"label":"One Flew Over the Cuckoo's Nest"},{"label":"Goodfellas"},{"label":"The Matrix"},{"label":"Seven Samurai"},{"label":"Star Wars: Episode IV - A New Hope"},{"label":"City of God"},{"label":"Se7en"},{"label":"The Silence of the Lambs"},{"label":"It's a Wonderful Life"},{"label":"Life Is Beautiful"},{"label":"The Usual Suspects"},{"label":"Léon: The Professional"},{"label":"Saving Private Ryan"},{"label":"Spirited Away"},{"label":"American History X"},{"label":"Once Upon a Time in the West"},{"label":"Interstellar"},{"label":"Psycho"},{"label":"The Green Mile"},{"label":"Casablanca"},{"label":"City Lights"},{"label":"The Intouchables"},{"label":"Modern Times"},{"label":"Raiders of the Lost Ark"},{"label":"The Pianist"},{"label":"The Departed"},{"label":"Rear Window"},{"label":"Terminator 2: Judgment Day"},{"label":"Back to the Future"},{"label":"Whiplash"},{"label":"Gladiator"},{"label":"The Prestige"},{"label":"The Lion King"},{"label":"Memento"},{"label":"Apocalypse Now"},{"label":"Alien"},{"label":"The Great Dictator"},{"label":"Sunset Boulevard"},{"label":"Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb"},{"label":"Cinema Paradiso"},{"label":"The Lives of Others"},{"label":"Grave of the Fireflies"},{"label":"Paths of Glory"},{"label":"Django Unchained"},{"label":"The Shining"},{"label":"WALL·E"},{"label":"American Beauty"},{"label":"The Dark Knight Rises"},{"label":"Princess Mononoke"},{"label":"Aliens"},{"label":"Oldboy"},{"label":"Witness for the Prosecution"},{"label":"Once Upon a Time in America"},{"label":"Das Boot"},{"label":"Citizen Kane"},{"label":"Dangal"},{"label":"Vertigo"},{"label":"North by Northwest"},{"label":"Star Wars: Episode VI - Return of the Jedi"},{"label":"Braveheart"},{"label":"Reservoir Dogs"},{"label":"M"},{"label":"Requiem for a Dream"},{"label":"Amélie"},{"label":"Taare Zameen Par - Ein Stern auf Erden"},{"label":"A Clockwork Orange"},{"label":"Dunkirk"},{"label":"Your Name"},{"label":"Lawrence of Arabia"},{"label":"Double Indemnity"},{"label":"Amadeus"},{"label":"Taxi Driver"},{"label":"Eternal Sunshine of the Spotless Mind"},{"label":"To Kill a Mockingbird"},{"label":"Full Metal Jacket"},{"label":"2001: A Space Odyssey"},{"label":"Singin' in the Rain"},{"label":"Toy Story 3"},{"label":"The Sting"},{"label":"Toy Story"},{"label":"3 Idiots"},{"label":"Bicycle Thieves"},{"label":"Inglourious Basterds"},{"label":"The Kid"},{"label":"Snatch"},{"label":"Monty Python and the Holy Grail"},{"label":"Good Will Hunting"},{"label":"For a Few Dollars More"},{"label":"The Hunt"},{"label":"L.A. Confidential"},{"label":"Scarface"},{"label":"The Apartment"},{"label":"Metropolis"},{"label":"Rashomon"},{"label":"A Separation"},{"label":"Indiana Jones and the Last Crusade"},{"label":"Mein Vater und mein Sohn"},{"label":"Yojimbo"},{"label":"All About Eve"},{"label":"Up"},{"label":"Batman Begins"},{"label":"Some Like It Hot"},{"label":"The Treasure of the Sierra Madre"},{"label":"Unforgiven"},{"label":"Downfall"},{"label":"Die Hard"},{"label":"Raging Bull"},{"label":"Heat"},{"label":"Children of Heaven"},{"label":"The Third Man"},{"label":"The Great Escape"},{"label":"Chinatown"},{"label":"Ikiru"},{"label":"Pan's Labyrinth"},{"label":"My Neighbor Totoro"},{"label":"Ran"},{"label":"The Gold Rush"},{"label":"Inside Out"},{"label":"Incendies"},{"label":"The Secret in Their Eyes"},{"label":"On the Waterfront"},{"label":"Judgment at Nuremberg"},{"label":"The Bridge on the River Kwai"},{"label":"Howl's Moving Castle"},{"label":"Raum"},{"label":"Blade Runner"},{"label":"The Seventh Seal"},{"label":"Lock, Stock and Two Smoking Barrels"},{"label":"Mr. Smith Goes to Washington"},{"label":"Casino"},{"label":"A Beautiful Mind"},{"label":"The Elephant Man"},{"label":"Wild Strawberries"},{"label":"V for Vendetta"},{"label":"The Wolf of Wall Street"},{"label":"The General"},{"label":"Warrior"},{"label":"Trainspotting"},{"label":"Dial M for Murder"},{"label":"Andrei Rublev"},{"label":"Gran Torino"},{"label":"Sunrise"},{"label":"Gone with the Wind"},{"label":"The Deer Hunter"},{"label":"The Bandit"},{"label":"Fargo"},{"label":"The Sixth Sense"},{"label":"La La Land"},{"label":"The Thing"},{"label":"The Big Lebowski"},{"label":"No Country for Old Men"},{"label":"Finding Nemo"},{"label":"Tokyo Story"},{"label":"Hacksaw Ridge - Die Entscheidung"},{"label":"Cool Hand Luke"},{"label":"There Will Be Blood"},{"label":"Rebecca"},{"label":"Rang De Basanti - Die Farbe Safran"},{"label":"Come and See"},{"label":"The Passion of Joan of Arc"},{"label":"Kill Bill: Vol. 1"},{"label":"How to Train Your Dragon"},{"label":"Logan: The Wolverine"},{"label":"Mary & Max, oder - Schrumpfen Schafe, wenn es regnet"},{"label":"Gone Girl"},{"label":"Into the Wild"},{"label":"Shutter Island"},{"label":"A Wednesday"},{"label":"It Happened One Night"},{"label":"Life of Brian"},{"label":"Wild Tales: Jeder dreht mal durch!"},{"label":"Platoon"},{"label":"The Wages of Fear"},{"label":"Hotel Rwanda"},{"label":"Network"},{"label":"Rush"},{"label":"Im Namen des Vaters"},{"label":"Stand by Me"},{"label":"The 400 Blows"},{"label":"Persona"},{"label":"Ben-Hur"},{"label":"The Grand Budapest Hotel"},{"label":"12 Years a Slave"},{"label":"Mad Max: Fury Road"},{"label":"Memories of Murder"},{"label":"Spotlight"},{"label":"Million Dollar Baby"},{"label":"Jurassic Park"},{"label":"Butch Cassidy and the Sundance Kid"},{"label":"Stalker"},{"label":"Amores Perros"},{"label":"The Truman Show"},{"label":"The Maltese Falcon"},{"label":"Hachi: A Dog's Tale"},{"label":"Nausicaä of the Valley of the Wind"},{"label":"Paper Moon"},{"label":"The Princess Bride"},{"label":"The Nights of Cabiria"},{"label":"Before Sunrise"},{"label":"Munna Bhai M.B.B.S."},{"label":"Prisoners"},{"label":"Harry Potter and the Deathly Hallows: Part 2"},{"label":"The Grapes of Wrath"},{"label":"Rocky"},{"label":"Catch Me If You Can"},{"label":"Diabolique"},{"label":"Touch of Evil"},{"label":"Gandhi"},{"label":"Star Wars: The Force Awakens"},{"label":"Donnie Darko"},{"label":"Monsters, Inc."},{"label":"Annie Hall"},{"label":"The Terminator"},{"label":"Barry Lyndon"},{"label":"The Bourne Ultimatum"},{"label":"Sholay"},{"label":"The Wizard of Oz"},{"label":"Groundhog Day"},{"label":"8½"},{"label":"La Haine"},{"label":"Jaws"},{"label":"Twelve Monkeys"},{"label":"The Best Years of Our Lives"},{"label":"Infernal Affairs"},{"label":"Paris, Texas"},{"label":"The Help"},{"label":"In the Mood for Love"},{"label":"Beauty and the Beast"},{"label":"The Battle of Algiers"},{"label":"Dog Day Afternoon"},{"label":"Pirates of the Caribbean: The Curse of the Black Pearl"},{"label":"Gangs of Wasseypur"},{"label":"What Ever Happened to Baby Jane?"},{"label":"PK"},{"label":"Die Taschendiebin"}];
        // @formatter:on

        ctrl.autocompleteOptions = {
            data: ctrl.data,
            minLength: 3,
            maxItems: 7,
            emptyState: 'Sorry, that film ist not in the list ...',
            input: {
                class: 'input',
                placeholder: 'search the 250 best rated ImdB movies...',
                value: 'the'
            },
            list: {
                class: 'list',
                classVisible: 'visibleList'
            },
            item: {
                class: 'item',
                classActive: 'activeItem',
                classHighlight: 'highlightedItem'
            },
            onFocus: log.bind('onFocus'),
            onBlur: log.bind('onBlur'),
            onType: log.bind('onType'),
            onSelect: log.bind('onSelect'),
        };

        function log(ctrl, item) {
            console.log(this, ctrl, item)
        }
    }


})();