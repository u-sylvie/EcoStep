import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../../App"

const MyGroups = ({ navigation }) => {
  const { isDarkMode } = useAppContext()

  const myGroups = [
    {
      id: 1,
      name: "Green Warriors",
      description: "Local environmental activists working together",
      members: 45,
      activity: "Very Active",
      role: "Admin",
      joined: "2 months ago",
      avatar: "🌱",
      recentActivity: "Beach cleanup organized",
      unreadMessages: 3,
    },
    {
      id: 2,
      name: "Solar Enthusiasts",
      description: "Sharing tips and experiences with solar energy",
      members: 128,
      activity: "Active",
      role: "Member",
      joined: "1 month ago",
      avatar: "☀️",
      recentActivity: "New solar installation shared",
      unreadMessages: 0,
    },
    {
      id: 3,
      name: "Zero Waste Community",
      description: "Living plastic-free and waste-free lifestyle",
      members: 89,
      activity: "Moderate",
      role: "Moderator",
      joined: "3 weeks ago",
      avatar: "♻️",
      recentActivity: "DIY cleaning products recipe",
      unreadMessages: 7,
    },
  ]

  const suggestedGroups = [
    {
      id: 4,
      name: "Urban Gardeners",
      description: "Growing food in small spaces and cities",
      members: 234,
      activity: "Very Active",
      avatar: "🌿",
      category: "Gardening",
    },
    {
      id: 5,
      name: "Climate Action Network",
      description: "Global climate change awareness and action",
      members: 567,
      activity: "Very Active",
      avatar: "🌍",
      category: "Climate",
    },
    {
      id: 6,
      name: "Sustainable Fashion",
      description: "Ethical and eco-friendly clothing choices",
      members: 156,
      activity: "Active",
      avatar: "👕",
      category: "Fashion",
    },
  ]

  const handleJoinGroup = (group) => {
    Alert.alert("Join Group", `Would you like to join "${group.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Join",
        onPress: () => {
          Alert.alert("Success!", `You have joined ${group.name}!`)
        },
      },
    ])
  }

  const handleGroupAction = (group, action) => {
    switch (action) {
      case "message":
        Alert.alert("Messages", `Opening messages for ${group.name}`)
        break
      case "settings":
        Alert.alert("Settings", `Group settings for ${group.name}`)
        break
      case "leave":
        Alert.alert("Leave Group", `Are you sure you want to leave "${group.name}"?`, [
          { text: "Cancel", style: "cancel" },
          { text: "Leave", style: "destructive" },
        ])
        break
    }
  }

  const getActivityColor = (activity) => {
    switch (activity) {
      case "Very Active":
        return "#22c55e"
      case "Active":
        return "#10b981"
      case "Moderate":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "#ef4444"
      case "Moderator":
        return "#3b82f6"
      case "Member":
        return "#6b7280"
      default:
        return "#6b7280"
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc" }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "black" }]}>My Groups</Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-circle-outline" size={24} color={isDarkMode ? "white" : "black"} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* My Groups Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>
            My Groups ({myGroups.length})
          </Text>

          {myGroups.map((group) => (
            <View key={group.id} style={[styles.groupCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
              <View style={styles.groupHeader}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupAvatar}>{group.avatar}</Text>
                  <View style={styles.groupDetails}>
                    <View style={styles.groupTitleRow}>
                      <Text style={[styles.groupName, { color: isDarkMode ? "white" : "black" }]}>{group.name}</Text>
                      {group.unreadMessages > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadText}>{group.unreadMessages}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.groupDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                      {group.description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.menuButton} onPress={() => handleGroupAction(group, "settings")}>
                  <Ionicons name="ellipsis-vertical" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                </TouchableOpacity>
              </View>

              <View style={styles.groupStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people" size={16} color="#10b981" />
                  <Text style={[styles.statText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                    {group.members} members
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.activityDot, { backgroundColor: getActivityColor(group.activity) }]} />
                  <Text style={[styles.statText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{group.activity}</Text>
                </View>
                <View style={[styles.roleBadge, { backgroundColor: getRoleColor(group.role) }]}>
                  <Text style={styles.roleText}>{group.role}</Text>
                </View>
              </View>

              <Text style={[styles.recentActivity, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                Recent: {group.recentActivity}
              </Text>

              <View style={styles.groupActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleGroupAction(group, "message")}>
                  <Ionicons name="chatbubble-outline" size={18} color="#10b981" />
                  <Text style={[styles.actionText, { color: "#10b981" }]}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleGroupAction(group, "leave")}>
                  <Ionicons name="exit-outline" size={18} color="#ef4444" />
                  <Text style={[styles.actionText, { color: "#ef4444" }]}>Leave</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Suggested Groups Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "black" }]}>Suggested Groups</Text>

          {suggestedGroups.map((group) => (
            <View key={group.id} style={[styles.groupCard, { backgroundColor: isDarkMode ? "#1e293b" : "white" }]}>
              <View style={styles.groupHeader}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupAvatar}>{group.avatar}</Text>
                  <View style={styles.groupDetails}>
                    <Text style={[styles.groupName, { color: isDarkMode ? "white" : "black" }]}>{group.name}</Text>
                    <Text style={[styles.groupDescription, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                      {group.description}
                    </Text>
                  </View>
                </View>
                <View style={[styles.categoryBadge, { backgroundColor: "#3b82f6" }]}>
                  <Text style={styles.categoryText}>{group.category}</Text>
                </View>
              </View>

              <View style={styles.groupStats}>
                <View style={styles.statItem}>
                  <Ionicons name="people" size={16} color="#10b981" />
                  <Text style={[styles.statText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                    {group.members} members
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={[styles.activityDot, { backgroundColor: getActivityColor(group.activity) }]} />
                  <Text style={[styles.statText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>{group.activity}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinGroup(group)}>
                <LinearGradient colors={["#10b981", "#059669"]} style={styles.joinButtonGradient}>
                  <Text style={styles.joinButtonText}>Join Group</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  createButton: {
    padding: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  groupCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  groupInfo: {
    flexDirection: "row",
    flex: 1,
  },
  groupAvatar: {
    fontSize: 30,
    marginRight: 15,
  },
  groupDetails: {
    flex: 1,
  },
  groupTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#ef4444",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 10,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  groupDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  menuButton: {
    padding: 5,
  },
  groupStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: "auto",
  },
  roleText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  recentActivity: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 15,
  },
  groupActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  joinButton: {
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10,
  },
  joinButtonGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default MyGroups
