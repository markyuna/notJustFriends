import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import FeedPost from './src/components/FeedPost';
import CreatePostScreen from './src/screens/CreatePostScreen';
import FeedScreen from './src/screens/FeedScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CreatePostScreen />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
