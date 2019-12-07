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
    ImageBackground,
} from 'react-native';

import flashlight from '../assets/images/flashlight.png';
export default class ButtonComponent extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View>
                <View style={styles.backgroundStyle}>
                    <Image source={flashlight} style={styles.imageStyle} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundStyle: {
        justifyContent: 'center',
        borderRadius: 20,
        height: 120,
        width: 120,
        backgroundColor: 'white',
    },
    imageStyle: {
        tintColor: 'rgba(100,100,255,0.85)',
        alignSelf: 'center',
        height: 55,
        width: 55,
    },
});
