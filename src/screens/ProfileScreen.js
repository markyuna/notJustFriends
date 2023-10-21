import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { User, Post } from "../models";

const ProfileScreen = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        const userId = route?.params?.id || userData.attributes.sub;

        if (!userId) {
          setLoading(false);
          return;
        }

        const isMe = userId === userData.attributes.sub;

        const dbUser = await DataStore.query(User, userId);

        if (!dbUser) {
          if (isMe) {
            navigation.navigate("UpdateProfile"); // Asumiendo que tienes una pantalla llamada "UpdateProfile"
          } else {
            Alert.alert("User not found");
          }
        } else {
          setUser(dbUser);

          // Query posts
          const userPosts = await DataStore.query(Post, (p) => p.postUserId("eq", userId));
          setPosts(userPosts);
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        // Puedes mostrar un mensaje de error al usuario aquí
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [route, navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : user ? (
        <View>
          <Image source={{ uri: user.image }} style={styles.profileImage} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.postsHeader}>Posts:</Text>
          {posts.map((post) => (
            <Text key={post.id} style={styles.post}>
              {post.description}
            </Text>
          ))}
        </View>
      ) : (
        <Text>No se encontró el usuario.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  postsHeader: {
    fontSize: 18,
    marginVertical: 10,
  },
  post: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ProfileScreen;
