import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { FC, useCallback, useRef } from "react";

import ViewShot, { captureRef } from "react-native-view-shot";

interface RenderFilterComponentProps {
  image: any;
  title: string;
  filtercomponent: any;
  setState: (image: any) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const RenderFilterComponent: FC<RenderFilterComponentProps> = ({
  image,
  title,
  setState,
  filtercomponent: FilterComponent,
}) => {
  const view_shot_ref = useRef<any>();
  const onSubmit = useCallback(async () => {
    try {
      const uri = await captureRef(view_shot_ref);
      setState(uri);
    } catch (error) {
      console.log(error);
    }
  }, [view_shot_ref.current]);
  return (
    <TouchableOpacity onPress={onSubmit}>
      <ViewShot ref={view_shot_ref}>
        <View style={styles.container}>
          <FilterComponent
            image={
              <Image
                resizeMode="contain"
                source={{ uri: image }}
                style={styles.container}
              />
            }
          />
        </View>
      </ViewShot>
    </TouchableOpacity>
  );
};

export default RenderFilterComponent;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
  },
  image: {},
});
