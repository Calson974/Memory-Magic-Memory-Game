import { SpeedInsights } from "@vercel/speed-insights/next"
$(document).ready(function(){

    const symbols = ['👾', '🐱‍🏍', '🐱‍👓', '👽', '👻', '🤖', '🐱‍👤', '🐱‍🚀'];
    const gameboard = $('.game-board');
    let flippedCards = [];
    let score = 0;
    let canClick = true;

    // Function to generate random background symbols
    function generateBackgroundSymbols() {
        const floatingBackground = $('.floating-background');
        const symbolCount = 20; // Number of symbols to generate
        const backgroundSymbols = ['🌟', '✨', '🌈', '🍄', '🌺', '🦄', '🍀', '🌙', '🌞', '🍉'];

        for (let i = 0; i < symbolCount; i++) {
            const symbol = backgroundSymbols[Math.floor(Math.random() * backgroundSymbols.length)];
            const symbolElement = $('<div>', {
                'class': 'floating-symbol',
                'text': symbol,
                'css': {
                    'left': `${Math.random() * 100}%`,
                    'animation-delay': `${Math.random() * 15}s`,
                    'font-size': `${30 + Math.random() * 40}px`
                }
            });
            floatingBackground.append(symbolElement);
        }
    }

    // Generate background symbols
    generateBackgroundSymbols();

    //shuffle symbols and create card elements
    const gameCards =[...symbols, ...symbols].sort(()=> Math.random()- 0.5);

    gameCards.forEach(symbol =>{
        const cardElement = $(`
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">${symbol}</div>
                    <div class="card-back"></div>
                </div>
            </div>
        `);
        
        cardElement.on('click', function(){
            if(!canClick || $(this).hasClass('flipped') || $(this).hasClass('matched') || flippedCards.length >= 2) return;

            $(this).find('.card-inner').css('transform', 'rotateY(180deg)');
            $(this).addClass('flipped');
            flippedCards.push($(this));

            if (flippedCards.length === 2)
            {
                canClick = false;
                let[card1,card2] = flippedCards;
                let match = card1.find('.card-front').text() === card2.find('.card-front').text();

                setTimeout(()=>{
                    if(match){
                        card1.add(card2).addClass('matched');
                        score += 10;
                        $('#score').text(score);
                    } else{
                        card1.add(card2).find('.card-inner').css('transform', 'rotateY(0deg)');
                        card1.add(card2).removeClass('flipped');
                    }
                    flippedCards = [];
                    canClick = true;

                    //check win condition
                    if($('.matched').length === gameCards.length) {
                        setTimeout(()=> {
                            alert(`Congratulations! Final Score: ${score}`);
                        },500);
                    }
                },800);
            }
        });
        
        gameboard.append(cardElement);
    });
});