import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView
} from "react-native";

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

var images = [
  { id: 1, src: require("../../assets/img_one.jpeg") },
  { id: 2, src: require("../../assets/img_two.jpeg") },
  { id: 3, src: require("../../assets/img_three.jpeg") },
  { id: 4, src: require("../../assets/img_four.jpeg") }
];

class Main extends Component {
  constructor() {
    super();
    this.state = {
      activeImage: null
    };
  }

  componentWillMount() {
    this.allImages = {};
    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimension = new Animated.ValueXY();

    this.position.setValue({
      x: pageX,
      y: pageY
    });

    this.position.setValue({
      x: width,
      y: height
    });
  }

  openImage = index => {
    this.allImages[index].measure(
      (x, y, width, height, pageX, pageY) => {
        this.oldPosition.x = pageX;
        this.oldPosition.y = pageY;
        this.oldPosition.width = width;
        this.oldPosition.height = height;
      }
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView style={styles.scroll}>
          {images.map((image, index) => {
            return (
              <TouchableWithoutFeedback
                key={image.id}
                onPress={() => this.openImage(index)}
              >
                <Animated.View style={styles._animate}>
                  <Image
                    ref={image => (this.allImages[index] = image)}
                    source={image.src}
                    style={styles.imgStyle}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  _animate: {
    height: SCREEN_HEIGHT - 150,
    width: SCREEN_WIDTH,
    padding: 15
  },
  imgStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderRadius: 20
  }
});

export default Main;
