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
  }

  openImage = index => {
    this.allImages[index].measure(
      (x, y, width, height, pageX, pageY) => {
        this.oldPosition.x = pageX;
        this.oldPosition.y = pageY;
        this.oldPosition.width = width;
        this.oldPosition.height = height;

        this.position.setValue({
          x: pageX,
          y: pageY
        });

        this.position.setValue({
          x: pageX,
          y: pageY
        });

        this.dimensions.setValue({
          x: width,
          y: height
        });
        this.dimensions.setValue({
          x: width,
          y: height
        });

        this.setState(
          {
            activeImage: images[index]
          },
          () => {
            this.viewImage.measure(
              (dx, dy, dWidth, dHeight, dPageX, dPageY) => {
                Animated.parallel([
                  Animated.timing(this.position.x, {
                    toValue: dPageX,
                    duration: 300
                  }),
                  Animated.timing(this.position.y, {
                    toValue: dPageY,
                    duration: 300
                  }),
                  Animated.timing(this.dimensions.x, {
                    toValue: dWidth,
                    duration: 300
                  }),
                  Animated.timing(this.position.y, {
                    toValue: dHeight,
                    duration: 300
                  })
                ]).start();
              }
            );
          }
        );
      }
    );
  };

  render() {
    const activeImageStyle = {
      width: this.dimension.x,
      height: this.dimension.y,
      left: this.dimension.x,
      top: this.dimension.y
    };

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
                    style={[styles.imgStyle, activeImageStyle]}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
          <View
            style={styles.activeWrapper}
            ref={view => (this.viewImage = view)}
          >
            <Animated.Image
              source={
                this.state.activeImage
                  ? this.state.activeImage.src
                  : null
              }
              style={styles._animateImg}
            >
              {}
            </Animated.Image>
          </View>
          <View style={styles.active}>{}</View>
        </View>
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
  },
  activeWrapper: {
    flex: 2,
    borderWidth: 1
  },
  active: {
    flex: 1
  },
  _animateImg: {
    resizeMode: "cover",
    top: 0,
    left: 0,
    height: null,
    width: null
  }
});

export default Main;
