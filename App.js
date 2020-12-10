import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";

import {
  FlatList,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Animated,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height;
const DOT = 8;
const SPACING = 8;
const DOT_INDICATOR = DOT + SPACING;
const images = [
  "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2065695/pexels-photo-2065695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
        <Animated.FlatList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          bounces={false}
          pagingEnabled={true}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          data={images}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            );
          }}
        />
        <View style={styles.paging}>
          {images.map((_, index) => {
            return <View style={styles.dot} />;
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DOT_INDICATOR + SPACING],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  paging: {
    position: "absolute",
    left: 10,
    top: ITEM_HEIGHT / 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: SPACING,
    borderRadius: 10,
  },
  dot: {
    width: DOT,
    height: DOT,
    margin: SPACING,
    backgroundColor: "#fff",
    borderRadius: DOT,
  },
  dotIndicator: {
    width: DOT_INDICATOR,
    height: DOT_INDICATOR,
    borderRadius: DOT_INDICATOR,
    position: "absolute",
    borderWidth: 2,
    borderColor: "#fff",
    left: DOT / 2 + SPACING,
    top: DOT / 2 + SPACING,
  },
});
