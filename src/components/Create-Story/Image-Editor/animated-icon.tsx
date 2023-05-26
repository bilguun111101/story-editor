import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  RotationGestureHandler,
  RotationGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface AnimatedTextProps {
  icon: string;
}

type ContextType = {
  translateX: number;
  translateY: number;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const AnimatedIcon = ({ icon }: AnimatedTextProps) => {
  // Reanimated shared values
  const translateX = useSharedValue(140);
  const translateY = useSharedValue(400);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  //Reanimated gesture handler events
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    // onEnd: event => {},
  });

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
      },
    });

  const rotationHandler =
    useAnimatedGestureHandler<RotationGestureHandlerGestureEvent>({
      onActive: (event) => {
        rotate.value = event.rotation * 20;
      },
    });

  // Reanimated style
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  return (
    <RotationGestureHandler onGestureEvent={rotationHandler}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <AnimatedImage
                transition={1000}
                contentFit="cover"
                source={{ uri: icon }}
                placeholder={blurhash}
                style={[styles.icon, rStyle]}
              />
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </RotationGestureHandler>
  );
};

export default AnimatedIcon;

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 70,
  },
});
