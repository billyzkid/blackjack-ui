$(document).ready(function() {

    const cardSuits = [ 'Spades', 'Hearts', 'Clubs', 'Diamonds' ];
    const cardRanks = [ 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King' ];
    const cardValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
    const shoeSize = 6;
    const deck = createDeck();
    const shoe = createShoe();

    preloadImages();
    shuffle(shoe);

    $.fn.popup.defaults.pagecontainer = '.table';
    $.fn.popup.defaults.transition = 'all 0.3s';

    $('#info-popup-content').popup({ onopen: () => $('.info-popup-content_open').addClass('active'), onclose: () => $('.info-popup-content_open').removeClass('active') });
    $('#user-popup-content').popup({ onopen: () => $('.user-popup-content_open').addClass('active'), onclose: () => $('.user-popup-content_open').removeClass('active') });
    $('#chat-popup-content').popup({ onopen: () => $('.chat-popup-content_open').addClass('active'), onclose: () => $('.chat-popup-content_open').removeClass('active') });
    $('#sound-popup-content').popup({ onopen: () => $('.sound-popup-content_open').addClass('active'), onclose: () => $('.sound-popup-content_open').removeClass('active') });
    $('#quit-popup-content').popup({ onopen: () => $('.quit-popup-content_open').addClass('active'), onclose: () => $('.quit-popup-content_open').removeClass('active') });

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
