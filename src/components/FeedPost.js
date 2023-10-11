
import { Image, StyleSheet, Text, View } from 'react-native';
import LikeImage from '../../assets/images/like.png'
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const post1 = {
  id: "p1",
  createdAt: "19 m",
  User: {
    id: "u1",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
    name: "Vadim Savin",
  },
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
//   image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
  numberOfLikes: 11,
  numberOfShares: 2,
};

const FeedPost = ({post}) =>{
  return (
    <View style={styles.container}>
      
      <View style={styles.post}>
        {/* header */}
        <View style={styles.header}>
          <Image 
            source={{ url: post.User.image}} 
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{post.User.name}</Text>
            <Text style={styles.createdAt}>{post.createdAt}</Text>
          </View>
          <Entypo name="dots-three-horizontal" size={18} color="gray" style={styles.icon} />
        </View>

        {/* body */}
        <Text style={styles.description}>{post.description}</Text>
        {post.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* footer */}
        
        {/* Post footer with likes and button */}
        <View style={styles.footer}>
          {/* Stats row */}
          <View style={styles.statsRow}>
            <Image source={LikeImage} style={styles.likeIcon} />
            <Text style={styles.likedBy}>
              Elon Musk and {post.numberOfLikes} others
            </Text>
            <Text style={styles.shares}>{post.numberOfShares} shares</Text>
          </View>

          {/* Buttons row */}
          <View style={styles.buttonsRow}>

            {/* Like button */}
            <View style={styles.iconButton}>
              <AntDesign name="like2" size={18} color="gray" />
              <Text style={styles.iconButtonText}>Like</Text>
            </View>

            {/* Comment button */}
            <View style={styles.iconButton}>
              <FontAwesome5 name="comment-alt" size={16} color="gray" />
              <Text style={styles.iconButtonText}>Comment</Text>
            </View>

            {/* Share button */}
            <View style={styles.iconButton}>
              <MaterialCommunityIcons
                name="share-outline"
                size={18}
                color="gray"
              />
              <Text style={styles.iconButtonText}>Share</Text>
            </View>

          </View>

        </View>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    post: {
        backgroundColor: "#fff",
        marginVertical: 5,
    },
    header: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontWeight: "500",
    },
    subtitle: {
        color: "gray",
    },
    icon: {
        marginLeft: "auto",
    },
    description: {
        lineHeight: 20,
        padding: 10,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    // Footer
    footer: {
        paddingHorizontal: 10,
    },
    
    // Stats Row
    statsRow: {
        flexDirection: "row",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 10,
        borderColor: "lightgray",
    },
    likeIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    likedBy: {
        color: "gray",
    },
    shares: {
        color: "gray",
        marginLeft: "auto",
    },
    // Buttons Row
    buttonsRow: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    iconButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButtonText: {
        color: "gray",
        marginLeft: 5,
        fontWeight: "500",
    },
});

export default FeedPost;