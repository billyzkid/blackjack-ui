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
    $('#info-popup').popup({ openelement: '#info-button', onopen: () => $('#info-button').addClass('active'), onclose: () => $('#info-button').removeClass('active') });
    $('#new-user-popup').popup({ focuselement: '#new-name-input', blur: false, escape: false, autoopen: true });
    $('#edit-user-popup').popup({ focuselement: '#edit-name-input', openelement: '#edit-user-button', onopen: () => $('#edit-user-button').addClass('active'), onclose: () => $('#edit-user-button').removeClass('active') });
    $('#chat-popup').popup({ openelement: '#chat-button', onopen: () => $('#chat-button').addClass('active'), onclose: () => $('#chat-button').removeClass('active') });
    $('#sound-popup').popup({ openelement: '#sound-button', onopen: () => $('#sound-button').addClass('active'), onclose: () => $('#sound-button').removeClass('active') });
    $('#quit-popup').popup({ openelement: '#quit-button', onopen: () => $('#quit-button').addClass('active'), onclose: () => $('#quit-button').removeClass('active') });
    
    // This container is only necessary to hide initial rendering before popups are initialized
    $('#popup-container').remove();

    $('#yes-insurance-button').on('click', () => $('#insurance-popup').popup('hide'));
    $('#no-insurance-button').on('click', () => $('#insurance-popup').popup('hide'));
    $('#new-name-button').on('click', () => $('#new-user-popup').popup('hide'));
    $('#edit-name-button').on('click', () => $('#edit-user-popup').popup('hide'));
    $('#yes-quit-button').on('click', () => $('#quit-popup').popup('hide'));
    $('#no-quit-button').on('click', () => $('#quit-popup').popup('hide'));

    $('#set-title-button').on('click', () => setTitle('Title'));
    $('#set-initial-state-button').on('click', () => setState('initial'));

    function setTitle(title) {
        $('#table > h1').text(title);
    }

    function setState(state) {
        $("#table").addClass(state);
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
