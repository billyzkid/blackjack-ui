$(document).ready(function() {

    const cardSuits = [ 'Spades', 'Hearts', 'Clubs', 'Diamonds' ];
    const cardRanks = [ 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King' ];
    const cardValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
    const shoeSize = 6;
    const deck = createDeck();
    const shoe = createShoe();

    preloadImages();
    shuffle(shoe);

    function createDeck() {
        const deck = [];

        cardSuits.forEach((suit, suitIndex) => {
            cardRanks.forEach((rank, rankIndex) => {
                const card = { suit, rank, value: cardValues[rankIndex], imageUrl: `images/cards/front-${cardRanks.length * suitIndex + rankIndex}.png` };
                deck.push(card);
            });
        });

        return deck;
    }

    function createShoe() {
        const shoe = [];

        for (let i = 0; i < shoeSize; i++) {
            const deck = createDeck();
            shoe.push(...deck);
        }

        return shoe;
    }

    // Fisher-Yates shuffle implementation:
    // https://javascript.info/task/shuffle
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ array[i], array[j] ] = [ array[j], array[i] ];
        }
    }
    
    function preloadImages() {
        const imageUrls = [ 'images/cards/back.png' ].concat(deck.map((card) => card.imageUrl));
        const imageLinks = imageUrls.map((imageUrl) => $('<link>', { 'rel': 'preload', 'href': imageUrl, 'as': 'image' }));
        
        $('head').append(imageLinks);
    }
});
