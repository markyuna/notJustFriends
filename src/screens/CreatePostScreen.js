import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button, KeyboardAvoidingView } from "react-native";

import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const user = {
    id: "u1",
    image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
    name: "Vadim Savin",
};

const CreatePostScreen = () => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    // const insets = useSafeAreaInsets();
    
    const onSubmit = () => {
        console.warn("Post Submitted!", description);
        setDescription("");
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    
    console.log(result);
    
    if (!result.canceled) {
        setImage(result.uri);
    }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { marginBottom: 10 }]}
            contentContainerStyle={{ flex: 1 }}
            // keyboardVerticalOffset={150}
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
                placeholder="What's on your mind?" 
                multiline 
            />
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.buttonContainer}>
                <Button title="Post" onPress={onSubmit}/>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
        marginTop: 40,
        backgroundColor: "lightblue",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 10,
    },
    name: {
        fontWeight: "700",
    },
    buttonContainer: {
        width: "100%",
        marginVertical: 10,
        borderRadius: 5,
        marginTop: "auto",
    },
    icon: {
        marginLeft: "auto",
    },
    image: {
        width: "80%",
        aspectRatio: 4 / 3,
        alignItems: "center",
    },
});

export default CreatePostScreen;