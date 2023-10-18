import React, { useEffect, useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

const CreatePostScreen = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(null);

  const onSubmit = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const newPost = {
      description,
      numberOfLikes: 0, // You can set initial values
      numberOfShares: 0, // You can set initial values
      postUserId: userData.attributes.sub,
    };

    if (image) {
      newPost.image = await uploadFile(image);
    }

    try {
      await DataStore.save(new Post(newPost));
      setDescription("");
      setImage(null);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving the post:", error);
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
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Re-throw the error for proper handling
    }
  };

  useEffect(() => {
    // You can add code to fetch user data here
  }, []); // Add dependencies if needed

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <View style={styles.header}>
        {/* Render user profile information here */}
      </View>
      <TextInput
        placeholder="What's on your mind?"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <Button onPress={onSubmit} title="Post" disabled={!description} />
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
