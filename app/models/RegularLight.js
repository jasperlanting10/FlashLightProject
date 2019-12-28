export default class RegularLight {
    isTurnedOn: boolean;
    isBlinking: boolean;
    blinkingSpeed: int;
    static myInstance = null;

    static getInstance() {
        if (RegularLight.myInstance == null) {
            RegularLight.myInstance = new RegularLight(false, 100);
        }
        return this.myInstance;
    }
    constructor(isTurnedOn, isBlinking, blinkingSpeed) {
        this.isTurnedOn = isTurnedOn;
        this.blinkingSpeed = blinkingSpeed
    }
    setTurnedOn = (newValue) => {
      

        this.isTurnedOn = newValue;
    };

    getBlinkingSpeed = () => {
        console.log('=================');
        
        return this.blinkingSpeed;
    };
    setIsBlinking = (newValue) => {        
        this.isBlinking = newValue
    }

    //* per seconden
    setBlinkingSpeed = newValue => {
        console.log('new Blinking speed mohfokka: ', newValue);
        this.isBlinking = true; 
        
        this.blinkingSpeed = parseInt(newValue);
        console.log('New blinkingspeed: ',this.blinkingSpeed);
        
    };

    isTurnedOn = () => {
        return this.isTurnedOn;
    };

    isBlinking = () => {
        return this.isBlinking;
    };
}
