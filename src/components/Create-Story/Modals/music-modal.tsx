import React, { FC, useEffect } from "react";
import Modal from "../../modal";
import { Image } from "expo-image";
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

interface MusicModalProps {
  state: Music;
  visible: boolean;
  setState: (state: Music) => void;
  setVisible: (visible: boolean) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONTENT_HEIGHT = SCREEN_HEIGHT - SCREEN_HEIGHT / 1.3;

const MusicModal: FC<MusicModalProps> = ({
  state,
  visible,
  setState,
  setVisible,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    translateY.value = withSpring(CONTENT_HEIGHT, {
      damping: 50,
    });
  }, [translateY.value]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
            <Image
              source={require("../../../assest/icons/icon.php.png")}
              style={styles.closeIcon}
            />
          </Pressable>
          <Animated.View
            style={[rBottomSheetStyle, styles.content]}
          ></Animated.View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MusicModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT - CONTENT_HEIGHT,
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  contentScroll: {
    width: "100%",
    height: "auto",
  },
  icon: {
    width: 50,
    height: 50,
  },
  iconsRow: { gap: 10 },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  row: {
    gap: 10,
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
  },
});
