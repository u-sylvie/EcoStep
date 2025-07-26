"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../../App"

const SocialFeed = ({ navigation }) => {
  const { isDarkMode, user } = useAppContext()
  const [newPost, setNewPost] = useState("")

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
  const [activeCommentPost, setActiveCommentPost] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState({})

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
    setActiveCommentPost(postId)
    setCommentText("")
  }
  const handleSubmitComment = (postId) => {
    if (commentText.trim()) {
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), { user: user?.name || "You", text: commentText }],
      }))
      setCommentText("")
      setActiveCommentPost(null)
    }
  }

  const handleShare = (postId) => {
    Alert.alert("Share", "Post shared successfully!")
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
        image: null,
      }
      setFeedPosts([post, ...feedPosts])
      setNewPost("")
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
          <View style={styles.createPostActions}>
            <TouchableOpacity style={styles.postActionButton}>
              <Ionicons name="camera-outline" size={20} color="#10b981" />
              <Text style={[styles.postActionText, { color: "#10b981" }]}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postActionButton}>
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
            {/* Comment UI */}
            {activeCommentPost === post.id && (
              <View style={styles.commentInputRow}>
                <TextInput
                  style={[styles.commentInput, { color: isDarkMode ? "white" : "black", borderColor: isDarkMode ? "#374151" : "#e5e7eb" }]}
                  placeholder="Write a comment..."
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                />
                <TouchableOpacity style={styles.sendCommentButton} onPress={() => handleSubmitComment(post.id)}>
                  <Ionicons name="send" size={20} color="#10b981" />
                </TouchableOpacity>
              </View>
            )}
            {/* Display comments */}
            {comments[post.id] && comments[post.id].length > 0 && (
              <View style={styles.commentsList}>
                {comments[post.id].map((c, idx) => (
                  <View key={idx} style={styles.commentItem}>
                    <Text style={[styles.commentUser, { color: isDarkMode ? "#10b981" : "#059669" }]}>{c.user}:</Text>
                    <Text style={[styles.commentText, { color: isDarkMode ? "white" : "#1f2937" }]}>{c.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#f1f5f9",
  },
  commentInput: {
    flex: 1,
    fontSize: 15,
    minHeight: 30,
    paddingVertical: 0,
  },
  sendCommentButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#e0f2fe",
  },
  commentsList: {
    marginTop: 5,
    paddingLeft: 10,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  commentUser: {
    fontWeight: "bold",
    marginRight: 5,
  },
  commentText: {
    fontSize: 15,
  },
})

export default SocialFeed
