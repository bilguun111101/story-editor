import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  FlatList,
  // Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type stateType = any[];

interface StickerModalProps {
  state: stateType;
  visible: boolean;
  setVisible: (e: boolean) => void;
  setState: (el: stateType) => void;
}

const testIcons = [
  {
    id: "1",
    title: "Logo",
    icons: [
      {
        id: "1",
        url: "https://www.shareicon.net/download/2016/07/08/117548_google.svg",
      },
      {
        id: "2",
        url: "https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png",
      },
      {
        id: "3",
        url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png",
      },
    ],
  },
  {
    id: "2",
    title: "Logo",
    icons: [
      {
        id: "1",
        url: "https://www.shareicon.net/download/2016/07/08/117548_google.svg",
      },
      {
        id: "2",
        url: "https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png",
      },
      {
        id: "3",
        url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/DynamoDB.png",
      },
    ],
  },
];

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONTENT_HEIGHT = SCREEN_HEIGHT - SCREEN_HEIGHT / 1.3;

const StickerModal = ({
  state,
  visible,
  setState,
  setVisible,
}: StickerModalProps) => {
  const navigation = useNavigation<any>();
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
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
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
    borderBottomWidth: 0.5,
  },
});
