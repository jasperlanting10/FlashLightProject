import React, { Component } from "react";
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
  Dimensions
} from "react-native";


export default class CustomSlider extends Component {
  constructor (props) {
    super(props)
    
    this.state = { 
      pan : new Animated.ValueXY(), 
      scale : new Animated.Value(1)
    }
  }
  componentDidMount = () => {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture : () => true,
      onMoveShouldSetPanResponderCapture : () => true,
      onPanResponderGrant : (evt, gestureState) => {
        //*start moving
        Animated.spring(
          this.state.scale,
          {toValue : 1.3, friction : 3}
        ).start() 
      }, 
	  onPanResponderMove: () => {
		    	Animated.event([
			  null,
		  ])
	  }
	  onPanResponderRelease : (evt, gestureState) => {
    Aninated.spring(this.state.calse,
		  {
			toValue :1,
			friction : 3
		  })
	  }
    })  
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Animated.View style={[styles.draggerView, 
          {transform : [{ scale : this.state.scale}] }]}
          {...this._panResponderpanHandlers}
          ></Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer : {
    height : 55,
    width : '80%',
    backgroundColor : 'green'
  },
  draggerView : {
    height : '100%',
    backgroundColor : 'steelBlue',
    width : '15%'
  }
}) 