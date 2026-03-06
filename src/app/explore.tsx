import { CameraView, useCameraPermissions } from "expo-camera";
import { File, Paths } from "expo-file-system";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [photo, setPhoto] = useState(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission needed</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    try {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    } catch (e) {
      console.log("Capture error:", e);
    }
  };
  // const saveLocal = async (photo:any) => {
  //     const name = `photo_${Date.now()}.jpg`;
  //     const path = FileSystem.documentDirectory + name;

  //     await FileSystem.copyAsync({
  //       from: photo,
  //       to: path,
  //     });
  //     });

  //     console.log("File Saved at :",path)
  //   };
  const saveLocal = async () => {
    try {
      const filename = `images/photo_${Date.now()}.jpg`;

      const destination = new File(Paths.document, filename);
      console.log("destination: ",destination)
      const source = new File(photo);
      console.log("IMage: ",photo)
      await source.copy(destination);

      console.log("Saved to:", destination.uri);

      setPhoto(null);
    } catch (err) {
      console.log("Save error:", err);
    }
  };
  // 👇 PREVIEW MODE
  if (photo) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: photo }} style={{ flex: 1 }} />

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={saveLocal}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 👇 CAMERA MODE
  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePhoto} />
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

  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "white",
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
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
