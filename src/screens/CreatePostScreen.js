import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DataStore, Auth, Storage } from "aws-amplify";
import { Post } from "../models";
import { useNavigation } from "@react-navigation/native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

const user = {
  id: "u1",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
  name: "Vadim Savin",
};

const CreatePostScreen = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const onSubmit = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const newPost = {
        description,
        numberOfLikes: 0,
        numberOfShares: 0,
        postUserId: userData.attributes.sub,
      };

      if (image) {
        newPost.image = await uploadFile(image);
      }

      await DataStore.save(new Post(newPost));
      setDescription("");
      setImage(null);
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
      // Puedes mostrar un mensaje de error al usuario aquí
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png",
      });
      return key;
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={styles.icon}
        />
      </View>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="What is on your mind?"
        multiline
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <Button onPress={onSubmit} title="Publicar" />
        {/* <Button onPress={onSubmit} title="Publicar" disabled={!description} /> */}
      </View>
      <Entypo
        onPress={pickImage}
        name="images"
        size={24}
        color="limegreen"
        style={styles.icon}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {},
  buttonContainer: {
    marginTop: "auto",
    marginVertical: 10,
  },
  icon: {
    marginLeft: "auto",
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
});

export default CreatePostScreen;
