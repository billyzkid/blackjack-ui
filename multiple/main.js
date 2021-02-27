$(document).ready(function() {

    const imagePath = '../images/';
    const cardImagePath = `${imagePath}cards/`;
    const cardSuits = [ 'Spades', 'Hearts', 'Clubs', 'Diamonds' ];
    const cardRanks = [ 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King' ];
    const cardValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
    const shoeSize = 6;
    const deck = createDeck();
    const shoe = createShoe();

    $.fn.popup.defaults.pagecontainer = '#page-container';
    $.fn.popup.defaults.transition = 'all 0.3s';

    $('#insurance-popup').popup({ blur: false, escape: false });
    $('#info-popup').popup({ openelement: '#info-menu-item', onopen: () => $('#info-menu-item').addClass('active'), onclose: () => $('#info-menu-item').removeClass('active') });
    $('#new-user-popup').popup({ focuselement: '#new-name-input', blur: false, escape: false, autoopen: true });
    $('#edit-user-popup').popup({ focuselement: '#edit-name-input', openelement: '#edit-user-menu-item', onopen: () => $('#edit-user-menu-item').addClass('active'), onclose: () => $('#edit-user-menu-item').removeClass('active') });
    $('#chat-popup').popup({ openelement: '#chat-menu-item', onopen: () => $('#chat-menu-item').addClass('active'), onclose: () => $('#chat-menu-item').removeClass('active') });
    $('#sound-popup').popup({ openelement: '#sound-menu-item', onopen: () => $('#sound-menu-item').addClass('active'), onclose: () => $('#sound-menu-item').removeClass('active') });
    $('#quit-popup').popup({ openelement: '#quit-menu-item', onopen: () => $('#quit-menu-item').addClass('active'), onclose: () => $('#quit-menu-item').removeClass('active') });
    
    // This container is only necessary to hide initial rendering before popups are initialized
    $('#popup-container').remove();

    $('#yes-insurance-button').on('click', () => $('#insurance-popup').popup('hide'));
    $('#no-insurance-button').on('click', () => $('#insurance-popup').popup('hide'));
    $('#new-name-button').on('click', () => $('#new-user-popup').popup('hide'));
    $('#edit-name-button').on('click', () => $('#edit-user-popup').popup('hide'));
    $('#yes-quit-button').on('click', () => $('#quit-popup').popup('hide'));
    $('#no-quit-button').on('click', () => $('#quit-popup').popup('hide'));

    $('#debug-container > button:nth-child(1)').on('click', () => setTitle('Blackjack.io'));
    $('#debug-container > button:nth-child(2)').on('click', () => setState('initial'));

    function setTitle(title) {
        $('#table1 > h1').text(title);
    }

    function setState(state) {
        $("#table1").addClass(state);
    }

    function createDeck() {
        const deck = [];

        cardSuits.forEach((suit, suitIndex) => {
            cardRanks.forEach((rank, rankIndex) => {
                const card = { suit, rank, value: cardValues[rankIndex], imageUrl: `${cardImagePath}front-${cardRanks.length * suitIndex + rankIndex}.png` };
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
        const imageUrls = [ `${cardImagePath}back.png` ].concat(deck.map((card) => card.imageUrl));
        const imageLinks = imageUrls.map((imageUrl) => $('<link>', { 'rel': 'preload', 'href': imageUrl, 'as': 'image' }));
        
        $('head').append(imageLinks);
    }

    preloadImages();
    shuffle(shoe);
});
