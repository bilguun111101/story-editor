import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Modal from "../../modal";

interface EffectModalProps {
  state: Effect;
  visible: boolean;
  setState: (state: Effect) => void;
  setVisible: (visible: boolean) => void;
}

const EffectModal: FC<EffectModalProps> = ({ visible, setVisible }) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <SafeAreaView style={styles.section}>
        <View style={styles.container}></View>
      </SafeAreaView>
    </Modal>
  );
};

export default EffectModal;

const styles = StyleSheet.create({
  section: {
    // backgroundColor: "rgba(0,0,0,0.6)",
    backgroundColor: "white",
    zIndex: 100,
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
});
