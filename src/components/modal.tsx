import { StyleSheet, Text, View, Modal as ModalComponent } from "react-native";
import React, { FC, ReactNode } from "react";

interface ModalProps {
  visible: boolean;
  children: ReactNode;
  setVisible: (visible: boolean) => void;
}

const Modal: FC<ModalProps> = ({ visible, setVisible, children }) => {
  return (
    <ModalComponent
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      {children}
    </ModalComponent>
  );
};

export default Modal;

const styles = StyleSheet.create({});
