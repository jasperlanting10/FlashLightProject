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

export default class CustomSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1),
        };

        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                //*start moving
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value,
                });
                this.state.pan.setValue({x: 0, y: 0});
                Animated.spring(this.state.scale, {
                    toValue: 1.2,
                    friction: 3,
                }).start();
            },
            onPanResponderMove: Animated.event([
                null,
                {dx: this.state.pan.x, dy: this.state.pan.y},
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
                <Animated.View
                    style={[
                        styles.draggerView,
                        {
                            transform: [
                                {scale: this.state.scale},
                                {translateX: this.state.pan.x},
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
        height: 55,
        width: '80%',
        backgroundColor: 'green',
    },
    draggerView: {
        position: 'absolute',
        height: '100%',
        backgroundColor: 'red',
        width: '15%',
    },
});
