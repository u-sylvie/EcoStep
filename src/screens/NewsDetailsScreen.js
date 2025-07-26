import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../App"
import { useState } from "react"

const NewsDetailsScreen = ({ navigation, route }) => {
  const { newsItem } = route.params
  const { isDarkMode, ecoPoints, updateEcoPoints } = useAppContext()
  const [saved, setSaved] = useState(false);

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this environmental news: ${newsItem.title}\n\n${newsItem.summary}`,
        title: newsItem.title,
      })
      // Award points for sharing
      updateEcoPoints(ecoPoints + 3)
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const fullArticle = `
${newsItem.summary}

This groundbreaking development represents a significant step forward in our global fight against climate change. Environmental experts worldwide are closely monitoring the situation and its potential long-term impacts.

The initiative involves collaboration between multiple stakeholders, including government agencies, environmental organizations, and local communities. This comprehensive approach ensures that all aspects of environmental protection are addressed effectively.

Key highlights include:
• Innovative sustainable technologies
• Community engagement programs  
• Long-term environmental monitoring
• Educational outreach initiatives

Scientists emphasize that such developments are crucial for achieving our climate goals and creating a more sustainable future for generations to come. The project serves as a model for similar initiatives worldwide.

Local communities have responded positively to these changes, with many residents actively participating in related environmental programs. This grassroots support is essential for the long-term success of any environmental initiative.

The economic benefits are also significant, with the project expected to create numerous green jobs and stimulate sustainable economic growth in the region.

Environmental advocates stress the importance of continued public support and engagement to ensure the success of such initiatives. Every individual action contributes to the larger goal of environmental protection and sustainability.
  `

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>News Article</Text>
          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: isDarkMode ? "#3b82f6" : "#dbeafe" }]}
            onPress={handleShare}
          >
            <Ionicons name="share-social" size={24} color={isDarkMode ? "white" : "#3b82f6"} />
          </TouchableOpacity>
        </View>

        {/* Article */}
        <BlurView intensity={20} style={styles.articleCard}>
          <LinearGradient colors={cardColors} style={styles.articleGradient}>
            <View style={styles.articleHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: newsItem.color }]}>
                <Ionicons name={newsItem.icon} size={16} color="white" />
                <Text style={styles.categoryText}>{newsItem.type}</Text>
              </View>
              <Text style={styles.publishDate}>2 hours ago</Text>
            </View>

            <Text style={[styles.articleTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{newsItem.title}</Text>

            <Text style={[styles.articleContent, { color: isDarkMode ? "#d1d5db" : "#4b5563" }]}>{fullArticle}</Text>

            <View style={styles.articleFooter}>
              <View style={styles.pointsEarned}>
                <Ionicons name="leaf" size={16} color="#10b981" />
                <Text style={styles.pointsText}>+{newsItem.points} Eco Points earned</Text>
              </View>
              <TouchableOpacity
                style={[styles.bookmarkButton, { backgroundColor: saved ? (isDarkMode ? "#064e3b" : "#d1fae5") : "transparent" }]}
                onPress={() => {
                  setSaved((prev) => !prev);
                  // Add haptic feedback or animation here if needed
                }}
              >
                <Ionicons
                  name={saved ? "bookmark" : "bookmark-outline"}
                  size={22}
                  color={saved ? "#10b981" : "#9ca3af"}
                />
                <Text style={[
                  styles.saveText,
                  { color: saved ? "#10b981" : "#9ca3af" }
                ]}>
                  {saved ? "Saved" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Related Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Take Action</Text>

          <TouchableOpacity style={styles.actionCard}>
            <BlurView intensity={15} style={styles.actionBlur}>
              <LinearGradient colors={cardColors} style={styles.actionGradient}>
                <Ionicons name="leaf" size={24} color="#10b981" />
                <View style={styles.actionContent}>
                  <Text style={[styles.actionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Plant a Tree</Text>
                  <Text style={styles.actionDescription}>Support reforestation efforts</Text>
                </View>
                <View style={styles.actionPoints}>
                  <Text style={styles.actionPointsText}>+30</Text>
                </View>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <BlurView intensity={15} style={styles.actionBlur}>
              <LinearGradient colors={cardColors} style={styles.actionGradient}>
                <Ionicons name="people" size={24} color="#3b82f6" />
                <View style={styles.actionContent}>
                  <Text style={[styles.actionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                    Share with Friends
                  </Text>
                  <Text style={styles.actionDescription}>Spread environmental awareness</Text>
                </View>
                <View style={styles.actionPoints}>
                  <Text style={styles.actionPointsText}>+5</Text>
                </View>
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
    flex: 1,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  articleCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  articleGradient: {
    padding: 25,
  },
  articleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  publishDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    lineHeight: 32,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 25,
  },
  articleFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsEarned: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsText: {
    fontSize: 14,
    color: "#10b981",
    marginLeft: 5,
    fontWeight: "bold",
  },
  bookmarkButton: {
    padding: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  saveText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
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
  actionCard: {
    marginHorizontal: 30,
    marginBottom: 15,
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
  actionContent: {
    flex: 1,
    marginLeft: 15,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 14,
    color: "#9ca3af",
  },
  actionPoints: {
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionPointsText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default NewsDetailsScreen
