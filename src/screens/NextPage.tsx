import React, { useCallback, useEffect, useState } from "react";
import TrackPlayer, {
  State,
  Capability,
  usePlaybackState,
} from "react-native-track-player";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface NextPageProps {
  route: any;
}

const NextPage = ({ route }: NextPageProps) => {
  const { image } = route.params;
  const navigation = useNavigation<any>();
  const playBackState = usePlaybackState();

  const track = {
    id: "trackId",
    url: require("../assest/sound/test.mp3"),
    title: "Track Title",
    artist: "Track Artist",
    artwork: image,
    duration: 100,
  };

  const setUpPlayer = useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add([track]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const togglePayBack = useCallback(async (playBackState: any) => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   console.log(currentTrack, playBackState, State.Playing);
  //   if (currentTrack != null) {
  //     if (playBackState == State.Paused) {
  //       await TrackPlayer.play();
  //     } else {
  //       await TrackPlayer.pause();
  //     }
  //   }
  // }, []);

  useEffect(() => {
    setUpPlayer();
    (async () => {
      await TrackPlayer.play();
    })();
  }, []);

  // useEffect(() => {
  // (async () => {})();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const timeout = setTimeout(async () => {
  //       await TrackPlayer.pause();
  //       navigation.goBack();
  //     }, await TrackPlayer.getDuration());
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   })();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: "100%" }}
      />
      <View style={styles.bottom}>
        {/* <Pressable
          onPress={async () => {
            // await TrackPlayer.remove();
          }}
        >
          <Text>On Submit</Text>
        </Pressable> */}
        <Pressable
          onPress={async () => {
            await TrackPlayer.play();
          }}
        >
          <Text>Play</Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            await TrackPlayer.pause();
          }}
        >
          <Text>Pause</Text>
        </Pressable>
      </View>
      {/* <Video source={video} style={{width: '100%', height: '100%'}} /> */}
    </SafeAreaView>
  );
};

export default NextPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
