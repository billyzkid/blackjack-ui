$(document).ready(function() {

    const cardSuits = [ 'Spades', 'Hearts', 'Clubs', 'Diamonds' ];
    const cardRanks = [ 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King' ];
    const cardValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
    const shoeSize = 6;
    const deck = createDeck();
    const shoe = createShoe();

    $.fn.popup.defaults.pagecontainer = '.table';
    $.fn.popup.defaults.transition = 'all 0.3s';

    $('#info-popup-content').popup({ openelement: '#info-menu-item', onopen: () => $('#info-menu-item').addClass('active'), onclose: () => $('#info-menu-item').removeClass('active') });
    $('#new-user-popup-content').popup({ focuselement: '#new-name-input', blur: false, escape: false, autoopen: true });
    $('#edit-user-popup-content').popup({ focuselement: '#edit-name-input', openelement: '#edit-user-menu-item', onopen: () => $('#edit-user-menu-item').addClass('active'), onclose: () => $('#edit-user-menu-item').removeClass('active') });
    $('#chat-popup-content').popup({ openelement: '#chat-menu-item', onopen: () => $('#chat-menu-item').addClass('active'), onclose: () => $('#chat-menu-item').removeClass('active') });
    $('#sound-popup-content').popup({ openelement: '#sound-menu-item', onopen: () => $('#sound-menu-item').addClass('active'), onclose: () => $('#sound-menu-item').removeClass('active') });
    $('#quit-popup-content').popup({ openelement: '#quit-menu-item', onopen: () => $('#quit-menu-item').addClass('active'), onclose: () => $('#quit-menu-item').removeClass('active') });

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

    function shuffle(array) {
        // Fisher-Yates shuffle implementation:
        // https://javascript.info/task/shuffle
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

    preloadImages();
    shuffle(shoe);
});
