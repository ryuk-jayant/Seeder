import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function PreviewScreen({ photo, onDelete, onConfirm }) {

  const saveLocal = async () => {
    const name = `photo_${Date.now()}.jpg`;
    const path = FileSystem.documentDirectory + name;

    await FileSystem.copyAsync({
      from: photo,
      to: path,
    });

    onConfirm(path);
  };

  const sharePhoto = async () => {
    await Sharing.shareAsync(photo);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: photo }} style={{ flex: 1 }} />

      <View style={styles.controls}>

        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={saveLocal}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareBtn} onPress={sharePhoto}>
          <Text style={styles.text}>Share</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  deleteBtn: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
  },

  saveBtn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
  },

  shareBtn: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
  },

  text: {
    color: "white",
    fontSize: 16,
  },
});