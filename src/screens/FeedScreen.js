import FeedPost from "../components/FeedPost";
import posts from "../../assets/data/posts.json";
import { ScrollView, FlatList, View } from "react-native";

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <FeedPost post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <StatusBar style="auto" />
    </View>
  );
};

export default FeedScreen;