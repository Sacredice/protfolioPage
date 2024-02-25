export default class GameState{
    constructor() {
        this.clicked = null;
        this.pairLeft = 6;
        this.list = [
            "poster-luffy", "poster-zoro", "poster-nami", "poster-usopp", "poster-sanji", "poster-chopper", 
            "poster-luffy", "poster-zoro", "poster-nami", "poster-usopp", "poster-sanji", "poster-chopper"
        ];
    }

    getClicked() {
        return this.clicked;
    }

    setClicked(card) {
        this.clicked = card;
    }

    getPairLeft() {
        return this.pairLeft;
    }

    setPairLeft(number) {
        this.pairLeft = number;
    }


}