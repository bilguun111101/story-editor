import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Modal from "../../modal";

interface FilterModalProps {
  image: any;
  visible: boolean;
  setImage: (image: any) => void;
  setVisible: (visible: boolean) => void;
}

const FilterModal: FC<FilterModalProps> = ({
  image,
  visible,
  setImage,
  setVisible,
}) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <></>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
