import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Modal from "../../modal";
import { BlurView } from "expo-blur";
import React, {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import ViewShot, { captureRef } from "react-native-view-shot";

import FILTERS from "../../../assest/variables/filters";
import RenderFilterComponent from "../Image-Editor/render-filter-component";

interface FilterModalProps {
  image: any;
  visible: boolean;
  setImage: (image: any) => void;
  setVisible: (visible: boolean) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const FilterModal: FC<FilterModalProps> = ({
  image,
  visible,
  setImage,
  setVisible,
}) => {
  // Reanimated variables
  const opacity = useSharedValue(0);
  const bottom = useSharedValue(SCREEN_HEIGHT / 3);
  // Some variables
  const [filterImage, setFilterImage] = useState<any>(image);
  const [bottomVisible, setBottomVisible] = useState<boolean>(false);

  // Click functions
  const onClose = useCallback(() => {
    setVisible(false);
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        setBottomVisible(!bottomVisible);
        bottom.value = withTiming(0);
        opacity.value = withTiming(1);
      }, 200);
      return () => clearTimeout(timeout);
    }
    opacity.value = 0;
    bottom.value = SCREEN_HEIGHT / 3;
    setBottomVisible(false);
  }, [visible]);

  const rStyle = useAnimatedStyle(() => {
    return {
      bottom: -bottom.value,
      opacity: opacity.value,
    };
  });

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <BlurView style={styles.container} intensity={20}>
        <SafeAreaView style={styles.content}>
          {/* <Pressable onPress={onClose} style={styles.closeBtn}>
            <Image
              style={styles.closeIcon}
              source={require("../../../assest/icons/icon.php.png")}
            />
          </Pressable> */}

          <View style={styles.visualization}>
            <View
            // style={styles.borderOfImage}
            >
              <Image source={{ uri: filterImage }} style={styles.image} />
            </View>
          </View>

          <Animated.View style={[rStyle, styles.bottomSheet]}>
            <View style={styles.bottomSheetHeader}>
              <Pressable onPress={onClose}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/25/25623.png",
                  }}
                  style={styles.closeBottomSheet}
                />
              </Pressable>
              <Text style={styles.bottomSheetTitle}>Filters</Text>
              <View />
            </View>

            <FlatList
              horizontal
              data={FILTERS}
              contentContainerStyle={{
                gap: 5,
                padding: 20,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <RenderFilterComponent
                    title={item.title}
                    image={image}
                    setState={setFilterImage}
                    filtercomponent={item.filterComponent}
                  />
                );
              }}
              keyExtractor={(item) => item.title}
            />
          </Animated.View>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

export default memo(FilterModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 100,
  },
  header: {
    position: "relative",
    width: "100%",
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT / 3,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    position: "relative",
  },
  visualization: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT - SCREEN_HEIGHT / 3,
  },
  image: { width: 300, height: 400 },
  // borderOfImage: {
  //   borderWidth: 4,
  //   borderColor: "white",
  //   position: "relative",
  // },
  bottomSheetHeader: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
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
