export default class BlinkingLight {
    isTurnedOn: boolean;
    blinkingSpeed: boolean;

    static myInstance = null;
    static getInstance() {
        if (BlinkingLight.myInstance === null) {
            BlinkingLight.myInstance = new BlinkingLight(true);
        }
    }
    constructor(isTurnedOn, blinkingSpeed) {
        this.isTurnedOn = isTurnedOn;
        this.blinkingSpeed = blinkingSpeed;
    }
}
