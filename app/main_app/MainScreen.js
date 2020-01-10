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
    findNodeHandle,
} from 'react-native';
import Slider from "react-native-slider";
import { BlurView } from "@react-native-community/blur";
import Dialog from "react-native-dialog";

import backgroundImage from '../assets/images/party.jpg';
import BpmImage from '../assets/images/bpm.png'
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
            blinkingSpeed : 350,
            viewRef : null,
            showBPMDialog : false,
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
        while (RegularLight.getInstance().isTurnedOn) {
            Torch.switchState(true);
            await this.sleep(10)
            blinkBool = !blinkBool
            Torch.switchState(false)
            
            // if (RegularLight.getInstance().isTurnedOn) {
            //     Torch.switchState(blinkBool);
            //     blinkBool = !blinkBool;
            // } else {
            //     console.log('blinking has stopped');
            //     RegularLight.getInstance().setTurnedOn(false)

            // }
            
            await this.sleep(this.state.blinkingSpeed)

        }
        Torch.switchState(false)
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    changeBlinkingSpeed = (event) => {
        var theVariable = event; // 0 to 1
        var top = 10;
        var bottom = 350;
        var distance = bottom - top;
        var position = top + ((theVariable / 1) * distance);
        this.setState({blinkingSpeed  : (bottom - position)})

    }

    viewLoaded(event) {
        this.setState({ viewRef: findNodeHandle(this.view) });
    }



    onBeatPress = () => {
        if (this.currentBPM === null || this.currentBPM === undefined) {
            this.currentBPM = []
            this.currentBPM[0] = new Date().getTime()
        } else {
            console.log('kom jke heir in? ',this.currentBPM.length);
            
            this.currentBPM[this.currentBPM.length] = new Date().getTime()
        }
    }

    onSavePress = () => {
        var totalTime = 0
        for (var i = 0; i < this.currentBPM.length; i++) {
            if (i !== this.currentBPM.length - 1) {
                totalTime = totalTime + (this.currentBPM[i + 1] - this.currentBPM[i])
                
            }
        }
        console.log('total time : ',totalTime / this.currentBPM.length);
        const newSpeed = totalTime / this.currentBPM.length;
        this.setState({blinkingSpeed : (newSpeed), showBPMDialog : false,})
        this.currentBPM = undefined
        this.isFromBeat = true
        
        //elke time stamp t verschil tussen meten en dan het gemiddelde berekenen
    }

    onDeletePress = () => {
        this.currentBPM = undefined
        this.setState({showBPMDialog : false})
    }

    render() {
        return (
            <View  style={styles.mainContainer}>
                <StatusBar hidden={true}/>
                <BlurView style={styles.absolute} blurType={'light'} blurAmount={10} viewRef={this.state.viewRef}/>
                <View ref={(view) => {this.view = view}}  onLayout={(event) => {this.viewLoaded(event)}} style={styles.mainContainer}>
                
                    <Dialog.Container style={{marginHorizontal : 12}} visible={this.state.showBPMDialog} onOutsideTouch={() => {this.setState({showBPMDialog : false})}}>
                            <Dialog.Title>Adjust BPM</Dialog.Title>
                            <Dialog.Description>
                                To change the blinking speed to the current BPM, tap the field below on the beat!
                            </Dialog.Description>

                            <TouchableOpacity onPress={() => {this.onBeatPress()}} style={{backgroundColor : 'rgba(100,100,255,0.15)', borderRadius: 6, marginHorizontal : 12, height : 250, width : 250, borderWidth : 1, borderColor : 'rgba(100,100,255,1)'}}>
                                <View></View>
                            </TouchableOpacity>


                            <View style={{marginTop : 24, flexDirection : 'row', width : Dimensions.get('screen').width * 0.8}}>
                                <TouchableOpacity style={{justifyContent : 'center', borderRadius : 5, backgroundColor : 'rgba(100,100,255,1)', flex : 1, height : 46,}} onPress={() => {this.onDeletePress()}}>
                                    <View style={{justifyContent : 'center', borderRadius : 5, backgroundColor : 'rgba(100,100,255,1)', flex : 1,}}>
                                        <Text style={{padding : 12, alignSelf : 'center', fontWeight : Platform.OS  ==='ios'? '600': 'bold', color : 'white'}}>DELETE</Text>
                                    </View>
                                </TouchableOpacity>
    
                                <View style={{flex : 0.1}}/>
                                <TouchableOpacity style={{justifyContent : 'center', borderRadius : 5, backgroundColor : 'rgba(100,100,255,1)', flex : 1,}} onPress={() => {this.onSavePress()}}>
                                    <View style={{justifyContent : 'center', borderRadius : 5, backgroundColor : 'rgba(100,100,255,1)', flex : 1,}}>
                                        <Text style={{padding : 12, alignSelf : 'center', fontWeight : Platform.OS  ==='ios'? '600': 'bold', color : 'white'}}>ADD</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                    </Dialog.Container>
                    
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
                                onValueChange={(event) => {
                                        this.changeBlinkingSpeed(event)
                                        this.isFromBeat = false
                                    }}
                                minimumTrackTintColor= 'rgba(100,100,255,1)'
                                maximumTrackTintColor= 'rgba(200, 200, 200, 0.35)'
                            />
                        </View>
                    </View>
                    <View style={styles.speedIconStyleContainer}>
                        <TouchableOpacity onPress={() => {this.setState({showBPMDialog : true})} } activeOpacity={0.25}>
                            <Image source={BpmImage} style={{tintColor : 'white', height : 55, width : 55}}/>
                        </TouchableOpacity>
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
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    mainContainer: {
        height : '100%',
        position : 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    speedIconStyleContainer : {
        position : 'absolute',
        bottom : Dimensions.get('window').width / 15,
        right : Dimensions.get('window').width / 15,
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
