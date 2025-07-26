"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../App"
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, isDarkMode, ecoPoints } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || "")
  const [avatarUri, setAvatarUri] = useState(null)

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ])
  }

  const handleSaveProfile = () => {
    // In a real app, you would update the user data here
    setIsEditing(false)
    Alert.alert("Success", "Profile updated successfully!")
  }

  const handleEditAvatar = async () => {
    Alert.alert(
      "Change Profile Photo",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (!permissionResult.granted) {
              alert("Permission to access camera is required!");
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setAvatarUri(result.assets[0].uri);
            }
          },
        },
        {
          text: "Upload from Gallery",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
              alert("Permission to access gallery is required!");
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setAvatarUri(result.assets[0].uri);
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  }

  const achievements = [
    { id: 1, title: "First Steps", description: "Completed first eco-action", icon: "leaf", color: "#10b981" },
    { id: 2, title: "Week Warrior", description: "7-day streak", icon: "flash", color: "#f59e0b" },
    { id: 3, title: "Quiz Master", description: "100% quiz accuracy", icon: "school", color: "#3b82f6" },
    { id: 4, title: "Community Helper", description: "Helped 10 users", icon: "people", color: "#8b5cf6" },
  ]

  const stats = [
    { label: "Actions Completed", value: "42", icon: "checkmark-circle" },
    { label: "CO2 Saved", value: "15.2 kg", icon: "leaf" },
    { label: "Days Active", value: "28", icon: "calendar" },
    { label: "Community Rank", value: "#156", icon: "trophy" },
  ]

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
            <Ionicons name="settings-outline" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <BlurView intensity={20} style={styles.profileCard}>
          <LinearGradient colors={cardColors} style={styles.profileGradient}>
            <View style={styles.avatarContainer}>
              {avatarUri ? (
                <View style={[styles.avatar, { overflow: 'hidden', padding: 0 }]}> 
                  <Image source={{ uri: avatarUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                </View>
              ) : (
                <Text style={styles.avatar}>{user?.avatar || "🌱"}</Text>
              )}
              <TouchableOpacity style={styles.editAvatarButton} onPress={handleEditAvatar}>
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              {isEditing ? (
                <TextInput
                  style={[styles.nameInput, { color: isDarkMode ? "white" : "#1f2937" }]}
                  value={editedName}
                  onChangeText={setEditedName}
                  autoFocus
                />
              ) : (
                <Text style={[styles.userName, { color: isDarkMode ? "white" : "#1f2937" }]}>{user?.name}</Text>
              )}
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userLevel}>{user?.level || "Eco Beginner"}</Text>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={isEditing ? handleSaveProfile : () => setIsEditing(true)}
            >
              <Ionicons name={isEditing ? "checkmark" : "pencil"} size={20} color="#10b981" />
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Your Impact</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <BlurView key={index} intensity={15} style={styles.statCard}>
                <LinearGradient colors={cardColors} style={styles.statGradient}>
                  <Ionicons name={stat.icon} size={24} color="#10b981" />
                  <Text style={[styles.statValue, { color: isDarkMode ? "white" : "#1f2937" }]}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </BlurView>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Achievements</Text>
          {achievements.map((achievement) => (
            <BlurView key={achievement.id} intensity={15} style={styles.achievementCard}>
              <LinearGradient colors={cardColors} style={styles.achievementGradient}>
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                  <Ionicons name={achievement.icon} size={20} color="white" />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={[styles.achievementTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              </LinearGradient>
            </BlurView>
          ))}
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Account</Text>

          <TouchableOpacity style={styles.actionButton}>
            <BlurView intensity={15} style={styles.actionBlur}>
              <LinearGradient colors={cardColors} style={styles.actionGradient}>
                <Ionicons name="download-outline" size={20} color={isDarkMode ? "white" : "#1f2937"} />
                <Text style={[styles.actionText, { color: isDarkMode ? "white" : "#1f2937" }]}>Export Data</Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <BlurView intensity={15} style={styles.actionBlur}>
              <LinearGradient colors={cardColors} style={styles.actionGradient}>
                <Ionicons name="shield-outline" size={20} color={isDarkMode ? "white" : "#1f2937"} />
                <Text style={[styles.actionText, { color: isDarkMode ? "white" : "#1f2937" }]}>Privacy Policy</Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <BlurView intensity={15} style={styles.actionBlur}>
              <LinearGradient colors={cardColors} style={styles.actionGradient}>
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <Text style={[styles.actionText, { color: "#ef4444" }]}>Logout</Text>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileGradient: {
    padding: 30,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    fontSize: 60,
    width: 100,
    height: 100,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#374151",
    borderRadius: 50,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#10b981",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b98120",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 30,
    gap: 15,
  },
  statCard: {
    width: "47%",
    borderRadius: 15,
    overflow: "hidden",
  },
  statGradient: {
    padding: 20,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 5,
    textAlign: "center",
  },
  achievementCard: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  achievementGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: "#9ca3af",
  },
  actionButton: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  actionBlur: {
    flex: 1,
  },
  actionGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
})

export default ProfileScreen
