import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function PreviewScreen({ photoUri, onDelete, onSave }) {
  const savePhoto = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync(false);

    if (status === "granted") {
      await MediaLibrary.saveToLibraryAsync(photoUri);
      onSave();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.image} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={savePhoto}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { flex: 1 },

  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "black",
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

  text: {
    color: "white",
    fontSize: 18,
  },
});