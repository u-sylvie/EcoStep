"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Share, Modal, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../../App"

const SocialFeed = ({ navigation }) => {
  const { isDarkMode, user } = useAppContext()
  const [newPost, setNewPost] = useState("")
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentPostId, setCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newLocation, setNewLocation] = useState("");

  const posts = [
    {
      id: 1,
      user: "EcoWarrior23",
      avatar: "🌱",
      time: "2h ago",
      content: "Just completed my 30-day plastic-free challenge! Feeling amazing and ready for the next one. 🌍",
      likes: 24,
      comments: 8,
      shares: 3,
      liked: false,
      image: null,
    },
    {
      id: 2,
      user: "GreenThumb",
      avatar: "🌿",
      time: "4h ago",
      content: "Started my own vegetable garden today! Here are my tomato seedlings. Any tips for a beginner? 🍅",
      likes: 18,
      comments: 12,
      shares: 2,
      liked: true,
      image: "🍅",
    },
    {
      id: 3,
      user: "ClimateChampion",
      avatar: "🌍",
      time: "6h ago",
      content:
        "Organized a beach cleanup with my local community. We collected 50kg of trash! Every small action counts.",
      likes: 45,
      comments: 15,
      shares: 8,
      liked: false,
      image: "🏖️",
    },
    {
      id: 4,
      user: "SolarSaver",
      avatar: "☀️",
      time: "1d ago",
      content: "My solar panels generated 25kWh today! Clean energy feels so good. Who else is using renewable energy?",
      likes: 32,
      comments: 9,
      shares: 5,
      liked: true,
      image: null,
    },
  ]

  const [feedPosts, setFeedPosts] = useState(posts)

  const handleLike = (postId) => {
    setFeedPosts(
      feedPosts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleComment = (postId) => {
    setCommentPostId(postId);
    setCommentModalVisible(true);
  }

  const handleShare = async (postId) => {
    const post = feedPosts.find((p) => p.id === postId);
    try {
      await Share.share({
        message: `${post.user}: ${post.content}`,
        title: "EcoStep Post",
      });
    } catch (e) {
      Alert.alert("Error", "Could not share post.");
    }
  }

  const handleAddComment = () => {
    setFeedPosts(
      feedPosts.map((post) =>
        post.id === commentPostId
          ? { ...post, comments: post.comments + 1 }
          : post,
      ),
    );
    setCommentText("");
    setCommentModalVisible(false);
  }

  const handlePhoto = () => {
    // Mock: just set an emoji as image
    setNewImage(Platform.OS === "ios" ? "📷" : "🖼️");
  }

  const handleLocation = () => {
    // Mock: just set a string
    setNewLocation("Nairobi, Kenya");
    Alert.alert("Location Added", "Nairobi, Kenya");
  }

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        user: user?.name || "You",
        avatar: user?.avatar || "🌱",
        time: "now",
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        image: newImage,
        location: newLocation,
      }
      setFeedPosts([post, ...feedPosts])
      setNewPost("")
      setNewImage(null)
      setNewLocation("")
      Alert.alert("Success", "Post shared successfully!")
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "black" }]}>Social Feed</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Create Post */}
        <View style={[styles.createPostContainer, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
          <View style={styles.createPostHeader}>
            <Text style={styles.userAvatar}>{user?.avatar || "🌱"}</Text>
            <TextInput
              style={[styles.postInput, { color: isDarkMode ? "white" : "black" }]}
              placeholder="Share your eco journey..."
              placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
              value={newPost}
              onChangeText={setNewPost}
              multiline
            />
          </View>
          {newImage && (
            <View style={styles.postImage}><Text style={styles.postImageEmoji}>{newImage}</Text></View>
          )}
          {newLocation ? (
            <Text style={{ color: isDarkMode ? "#10b981" : "#059669", marginLeft: 10, marginBottom: 5 }}>📍 {newLocation}</Text>
          ) : null}
          <View style={styles.createPostActions}>
            <TouchableOpacity style={styles.postActionButton} onPress={handlePhoto}>
              <Ionicons name="camera-outline" size={20} color="#10b981" />
              <Text style={[styles.postActionText, { color: "#10b981" }]}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postActionButton} onPress={handleLocation}>
              <Ionicons name="location-outline" size={20} color="#3b82f6" />
              <Text style={[styles.postActionText, { color: "#3b82f6" }]}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.postButton, { backgroundColor: newPost.trim() ? "#10b981" : "#6b7280" }]}
              onPress={handlePost}
              disabled={!newPost.trim()}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed Posts */}
        {feedPosts.map((post) => (
          <View key={post.id} style={[styles.postContainer, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userAvatar}>{post.avatar}</Text>
                <View>
                  <Text style={[styles.userName, { color: isDarkMode ? "white" : "black" }]}>{post.user}</Text>
                  <Text style={[styles.postTime, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{post.time}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.postContent, { color: isDarkMode ? "white" : "black" }]}>{post.content}</Text>

            {post.image && (
              <View style={styles.postImage}>
                <Text style={styles.postImageEmoji}>{post.image}</Text>
              </View>
            )}
            {post.location && (
              <Text style={{ color: isDarkMode ? "#10b981" : "#059669", marginLeft: 10, marginBottom: 5 }}>📍 {post.location}</Text>
            )}

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
                <Ionicons
                  name={post.liked ? "heart" : "heart-outline"}
                  size={20}
                  color={post.liked ? "#ef4444" : isDarkMode ? "#9ca3af" : "#6b7280"}
                />
                <Text style={[styles.actionText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(post.id)}>
                <Ionicons name="chatbubble-outline" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <Text style={[styles.actionText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(post.id)}>
                <Ionicons name="share-outline" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <Text style={[styles.actionText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{post.shares}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Comment Modal */}
      <Modal visible={commentModalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 30, width: 300 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#1f2937" }}>Add a Comment</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, padding: 10, marginBottom: 15, minHeight: 60 }}
              placeholder="Write your comment..."
              value={commentText}
              onChangeText={setCommentText}
              multiline
            />
            <TouchableOpacity style={{ backgroundColor: "#10b981", borderRadius: 10, padding: 12, alignItems: "center" }} onPress={handleAddComment}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Post Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 10, alignItems: "center" }} onPress={() => setCommentModalVisible(false)}>
              <Text style={{ color: "#ef4444", fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationButton: {
    padding: 8,
  },
  createPostContainer: {
    margin: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createPostHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  userAvatar: {
    fontSize: 30,
    marginRight: 10,
  },
  postInput: {
    flex: 1,
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: "top",
  },
  createPostActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postActionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  postActionText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  postButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  postContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
  },
  postImage: {
    alignItems: "center",
    marginBottom: 15,
  },
  postImageEmoji: {
    fontSize: 60,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
  },
})

export default SocialFeed
