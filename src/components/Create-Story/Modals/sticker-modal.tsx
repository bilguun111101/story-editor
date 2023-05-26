import { Image } from "expo-image";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Modal from "../../modal";
import testIcons from "../../../assest/json/icons.json";

type stateType = any[];

interface StickerModalProps {
  state: stateType;
  visible: boolean;
  setVisible: (e: boolean) => void;
  setState: (el: stateType) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONTENT_HEIGHT = SCREEN_HEIGHT - SCREEN_HEIGHT / 1.3;

const StickerModal: FC<StickerModalProps> = ({
  state,
  visible,
  setState,
  setVisible,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const AddIcon = useCallback(
    (icon: string) => {
      setState([...state, { icon }]);
    },
    [state]
  );

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
          <Animated.View style={[rBottomSheetStyle, styles.content]}>
            <FlatList
              data={testIcons}
              contentContainerStyle={{
                gap: 10,
              }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.iconsRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.rowContainer}>
                      <FlatList
                        data={item.icons}
                        horizontal
                        contentContainerStyle={styles.row}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                          return (
                            <TouchableOpacity onPress={() => AddIcon(item.url)}>
                              <Image
                                source={{ uri: item.url }}
                                transition={100}
                                contentFit="contain"
                                style={styles.icon}
                              />
                            </TouchableOpacity>
                          );
                        }}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default StickerModal;

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
  },
  rowContainer: {
    borderBottomWidth: 0.5,
  },
});
