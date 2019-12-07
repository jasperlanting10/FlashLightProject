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
    Slider,
    ImageBackground,
    Dimensions,
} from 'react-native';

import backgroundImage from '../assets/images/party.jpg';

import ButtonComponent from '../components/ButtonComponent.js';
import CustomSlider from '../components/CustomSlider.js';
export default class MainScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 10,
            max: 300,
        };
    }
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View>
                <Image
                    source={backgroundImage}
                    style={{position: 'absolute'}}></Image>
                <View style={styles.backgroundColorStyle}></View>
                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                    }}>
                    <TouchableOpacity>
                        <ButtonComponent />
                    </TouchableOpacity>
                    <CustomSlider />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundStyle: {
        height: '100%',
        width: '100%',
    },
    backgroundColorStyle: {
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: 'rgba(100,100,255,0.85)',
    },
});
