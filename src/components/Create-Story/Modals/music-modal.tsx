import React, { FC, useCallback, useEffect } from "react";
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
  withTiming,
} from "react-native-reanimated";

import fetcher from "../../../utils/fetcher";
import MUSICS from "../../../assest/variables/musics";

import useSWR from "swr";
import axios from "axios";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "11e2df8f24mshb3910dea1fc6637p1fb135jsnfabf3efc268a",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

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
  const { data, error, isLoading } = useSWR<any>(
    "https://spotify23.p.rapidapi.com/search/",
    fetcher
  );

  // Reanimated shared value
  const bottom = useSharedValue(SCREEN_HEIGHT / 3);

  const onClose = useCallback(() => {}, []);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        bottom.value = withTiming(0);
      }, 200);
      return () => clearTimeout(timeout);
    }
    bottom.value = SCREEN_HEIGHT / 3;
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      // transform: [{ translateY: translateY.value }],
      bottom: -bottom.value,
    };
  });
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <View style={styles.container}>
        <Animated.View style={[rBottomSheetStyle, styles.content]}>
          <View style={styles.header}>
            <Pressable onPress={onClose}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/25/25623.png",
                }}
                style={styles.closeBottomSheet}
              />
            </Pressable>
            <Text style={styles.bottomSheetTitle}>Musics</Text>
            <View />
          </View>

          <FlatList
            data={MUSICS}
            renderItem={({ item }) => <></>}
            keyExtractor={(item) => item.id}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MusicModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  content: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT / 3,
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
  header: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    justifyContent: "space-between",
  },
  closeBottomSheet: {
    width: 20,
    height: 20,
  },
  bottomSheetTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
});
