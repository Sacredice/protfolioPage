import GameState from "./gameState.js";
const Card = new GameState();


const initApp = () => {

    dealCardsImagesAndEventListeners();
    listenForNewGame();

}

document.addEventListener("DOMContentLoaded", initApp);


    // create cards front and back images
const dealCardsImagesAndEventListeners = () => {
        const list = [ ...Card.list ];
        const elements = document.getElementsByClassName("gameboard__card");
    for (let i = 0; i < elements.length; i++) {
        const cardBack = document.createElement("img");
        cardBack.src = "./public/cardBack.jpg";
        elements[i].appendChild(cardBack);
        elements[i].firstElementChild.classList.add("backImg")
        const image = document.createElement("img");
        image.src = `./public/${getRandomImage(list)[0]}.jpg`;
        image.className = "hidden mirrorImg";
        elements[i].appendChild(image);
        elements[i]?.firstElementChild.addEventListener("click", (e) => turnCard(e), { once: true });  
    };
};

// get random front image for a card
const getRandomImage = (list) => {
    const index = Math.floor(Math.random() * list.length);
    const image = list.splice(index, 1);
    return image;

};

// 
const listenForNewGame = () => {
    const restartButton = document.querySelector(".newGameBtn");
    if (Card.pairLeft === 0) {
        restartButton.classList.toggle("hidden");
    }

    restartButton.addEventListener("click", (e) => {
        cleanAllCardsImages();
        dealCardsImagesAndEventListeners();
        e.target.classList.toggle("hidden");
        Card.pairLeft = 6;
    });
    
};

const turnCard = (e) => {    
    const targetCard = e.target.parentElement;
    addAnimationClass("flipFirstHalf", targetCard);
    setTimeout(() => {
        addAnimationClass("flipSecondHalf", targetCard);
        addAnimationClass("hidden", e.target);
        e.target.nextElementSibling.classList.toggle("hidden");
    }, 500);

    if (Card.clicked) {
        const clickedCard = document.querySelector(`#${Card.clicked}`);
        if (e.target.nextElementSibling.src === clickedCard.lastElementChild.src) {
            // We can remove matched cards here or let them stay turned until reset
            Card.setClicked(null);
            Card.pairLeft -= 1;
            if (Card.pairLeft === 0) {
                setTimeout(() => {
                    document.querySelector(".newGameBtn").classList.toggle("hidden");
                }, 1000);                
            };
        } else {
            setTimeout(() => {
                turnCardsBack(clickedCard, e);
            }, 1000);
            Card.setClicked(null);
        }
    } else {
        Card.setClicked(e.target.parentElement.id);
    }
    setTimeout(() => {
        e.target.removeEventListener("click", (e) => turnCard(e), { once: true });
        e.target.addEventListener("click", (e) => turnCard(e), { once: true });
    }, 700);

};

const turnCardsBack = (clickedCard, e) => {
    const targetCard = e.target.parentElement;
    addAnimationClass("flipBackFirstHalf", targetCard);
    addAnimationClass("flipBackFirstHalf", clickedCard);

    setTimeout(() => {
        addAnimationClass("flipBackSecondHalf", targetCard);
        addAnimationClass("flipBackSecondHalf", clickedCard);
        toggleClass("hidden", e.target);
        e.target.nextElementSibling.classList.toggle("hidden");
        clickedCard.firstElementChild.classList.toggle("hidden");
        clickedCard.lastElementChild.classList.toggle("hidden");
    }, 500);
    setTimeout(() => {
        targetCard.className = "gameboard__card";
        clickedCard.className = "gameboard__card";
    }, 1002);
};

const addAnimationClass = (cssClassName, target) => {
    target.classList.add(cssClassName);
};

const toggleClass = (cssClassName, target) => {
    target.classList.toggle(cssClassName);
}


const cleanAllCardsImages = () => {
    const elements = document.getElementsByClassName("gameboard__card");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("flipFirstHalf", "flipSecondHalf");
        while (elements[i].firstElementChild) {
            elements[i].firstElementChild.remove();
        };
    };
};

