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
    PanResponder,
    StatusBar,
    TouchableOpacity,
    Slider,
    ImageBackground,
    Dimensions,
} from 'react-native';
import RegularLight from '../models/RegularLight.js';

export default class CustomSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1),
        };

        setBlinkingSpeed = newValue => {};

        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                //*start moving
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value,
                });

                var newValue = this.props.width - parseInt(this.state.pan.x._value)
                if (newValue < 0) {
                    newValue = 25
                }

                console.log('new value is gonna be: ',newValue);
                
                this.props.onBlinkingSpeedChange(newValue)

                if (this.state.pan.x._value > this.props.width) {
                    console.log('oke ik kom binnen dit is nu de waarde ',this.state.pan.x._value);
                    
                    this.state.pan.x._value = this.props.width
                    console.log('de waarde is terug gezet en is nu: ',this.state.pan.x._value);

                }




                this.state.pan.setValue({x: 0, y: 0});
               
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y,
                },
            ]),
            onPanResponderRelease: (evt, gestureState) => {

                console.log('hier binnen?');
                this.state.pan.flattenOffset();
                Animated.spring(this.state.scale, {
                    toValue: 1,
                    friction: 3,
                }).start();
            },
        });
    }
    componentDidMount = () => {};

    render() {
        return (
            <View style={styles.mainContainer}>
                <View
                    style={[styles.barView, {width: this.props.width}]}></View>
                <Animated.View
                    style={[
                        styles.draggerView,
                        {
                            transform: [
                                {scale: this.state.scale},
                                {
                                    translateX: this.state.pan.x.interpolate({
                                        inputRange: [0, this.props.width],
                                        outputRange: [0, this.props.width - 45],
                                        extrapolateRight: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                    {...this.panResponder.panHandlers}></Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        justifyContent: 'center',
    },
    barView: {
        height: '10%',
        backgroundColor: 'white',
    },
    draggerView: {
        height: 45,
        width: 45,
        borderRadius: 22.5,
        borderColor: 'white',
        borderWidth: 2,
        position: 'absolute',
        backgroundColor: 'rgba(100,100,255,1)',
    },
});
