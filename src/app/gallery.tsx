import { Directory, File, Paths } from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, View } from "react-native";

const imagesDir = new Directory(Paths.document, "images");

export default function ImageGallery() {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    try {
    //   await imagesDir.create({ intermediates: true });

      const files = await imagesDir.list();
      console.log("Files:", files);
      const paths = files.filter((f) => f instanceof File).map((f) => f.uri);

      console.log("Image-Paths", paths);
      setImages(paths);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const deleteImage = async (uri) => {
    const file = new File(uri);
    await file.delete();
    loadImages();
  };

  const markPermanent = async (uri) => {
    const file = new File(uri);

    const newFile = new File(Paths.document, "saved_" + Date.now() + ".jpg");

    await file.copy(newFile);

    alert("Saved permanently");
  };

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item }} style={styles.image} />
          <Button title="Delete" onPress={() => deleteImage(item)} />
          {/* <Button
            title="Save Permanently"
            onPress={() => markPermanent(item)}
          /> */}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { margin: 10 },
  image: { width: "100%", height: 200 },
});
