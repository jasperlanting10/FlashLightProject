import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    Animated,
    View,
    Text,
    TouchableWithoutFeedback,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Platform,
    Dimensions,
} from 'react-native';
import Slider from "react-native-slider";

import backgroundImage from '../assets/images/party.jpg';

import ButtonComponent from '../components/ButtonComponent.js';
import CustomSlider from '../components/CustomSlider.js';

import RegularLight from '../models/RegularLight.js';

import {Theme} from '../styles/Styles.js';
import Torch from 'react-native-torch';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 10,
            max: 300,
            blinkingSpeed : 1000,
        };
    }
    static navigationOptions = {
        header: null,
    };

    onButtonCLick = async () => {
        if (Platform.OS === 'ios') {
        } else {
            const cameraAllowed = await Torch.requestCameraPermission(
                'Camera Permissions', // dialog title
                'We require camera permissions to use the torch on the back of your phone.', // dialog body
            );

            if (cameraAllowed) {
                

                if (!RegularLight.getInstance().isTurnedOn) {
                    
                    console.log('light is turned on ');
                    RegularLight.getInstance().setTurnedOn(!RegularLight.getInstance().isTurnedOn);
                    this.handleBlinking();
                   
                } else {
                    console.log('licht wordt uigezet');
                    RegularLight.getInstance().setTurnedOn(false);
                    RegularLight.getInstance().setIsBlinking(false);
                    Torch.switchState(false)
                }
            }
        }
    };

    handleTurnOn = newValue => {
        RegularLight.getInstance().setTurnedOn(newValue);
        Torch.switchState(newValue);
    };

    handleBlinking = async () => {
        var blinkingSpeed = this.state.blinkingSpeed
        var blinkBool = true;
        // const intervalId = setInterval(() => {
        //     if (RegularLight.getInstance().isTurnedOn) {
        //         Torch.switchState(blinkBool);
        //         blinkBool = !blinkBool;
        //     } else if (blinkingSpeed !== this.state.blinkingSpeed) {
        //         blinkingSpeed = this.state.blinkingSpeed
        //     } else {
        //         console.log('blinking has stopped');
        //         RegularLight.getInstance().setTurnedOn(false)
        //         clearInterval(intervalId)
        //     }
        //     console.log('blinking speed in loop: ', this.state.blinkingSpeed);
             
            
           
        // }, blinkingSpeed);
        while (RegularLight.getInstance().isTurnedOn) {
            if (RegularLight.getInstance().isTurnedOn) {
                Torch.switchState(blinkBool);
                blinkBool = !blinkBool;
            } else {
                console.log('blinking has stopped');
                RegularLight.getInstance().setTurnedOn(false)

            }
            await this.sleep(this.state.blinkingSpeed)
        }
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    changeBlinkingSpeed = (event) => {
        
        // console.log('nieuwe aarde: ',newValue);
        // event.interpolate({
        //     inputRange: [0, 1],
        //     outputRange : [900, 100]
        // })

        this.setState({blinkingSpeed : ((1 - event)* 1000)})
        // this.handleBlinking()
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar hidden={true}/>
                <Image
                    source={backgroundImage}
                    style={{
                        position: 'absolute',
                        height: Dimensions.get('window').height,
                    }}></Image>
                <View style={styles.backgroundColorStyle}></View>
                <View
                    style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.onButtonCLick();
                        }}>
                        <ButtonComponent />
                    </TouchableOpacity>
                    <View>
                        <Slider
                            style={{marginTop : 40, width : Dimensions.get('window').width * 0.8}}
                            trackStyle={sliderStyles.track}
                            thumbStyle={sliderStyles.thumb}
                            thumbImage={Torch}
                            onValueChange={(event) => {this.changeBlinkingSpeed(event)}}
                            minimumTrackTintColor= 'rgba(100,100,255,1)'
                            maximumTrackTintColor= 'rgba(200, 200, 200, 0.35)'
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const trackHeight = 15
const thumbSize = 3.5
const sliderStyles = StyleSheet.create({
  track: {
    borderColor : 'white',
    // borderWidth : 0.75,
    height: trackHeight,
    borderRadius: trackHeight / 2,
  },
  thumb: {
    width: trackHeight * thumbSize,
    height: trackHeight * thumbSize,
    borderRadius: (trackHeight * thumbSize) / 2,
    backgroundColor: 'white',
    borderColor: 'rgba(100,100,255,0.85)',
    borderWidth: 2,
  }
});

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
    },
    bottomSliderContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    backgroundStyle: {
        height: '100%',
        width: '100%',
    },
    backgroundColorStyle: {
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: 'rgba(100,100,255,0.85)',
        // backgroundColor: 'rgba(0,120,0,0.85)',
    },
});
