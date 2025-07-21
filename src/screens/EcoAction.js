"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"

const EcoAction = () => {
  const [completedActions, setCompletedActions] = useState([])

  const actionCategories = [
    {
      id: "daily",
      title: "Daily Life",
      icon: "home",
      color: "#10b981",
      actions: [
        {
          id: 1,
          title: "Use Reusable Water Bottle",
          description: "Replace single-use plastic bottles",
          points: 15,
          difficulty: "Beginner",
          co2Saved: "0.5 kg",
          icon: "water",
        },
        {
          id: 2,
          title: "Turn Off Standby Power",
          description: "Unplug devices when not in use",
          points: 10,
          difficulty: "Beginner",
          co2Saved: "0.3 kg",
          icon: "power",
        },
        {
          id: 3,
          title: "Use Eco-friendly Detergent",
          description: "Switch to biodegradable cleaning products",
          points: 20,
          difficulty: "Intermediate",
          co2Saved: "0.8 kg",
          icon: "leaf",
        },
      ],
    },
    {
      id: "transport",
      title: "Transportation",
      icon: "car",
      color: "#3b82f6",
      actions: [
        {
          id: 4,
          title: "Use Public Transportation",
          description: "Take bus or train instead of driving",
          points: 25,
          difficulty: "Intermediate",
          co2Saved: "2.3 kg",
          icon: "train",
        },
        {
          id: 5,
          title: "Bike to Work",
          description: "Cycle for short distance commutes",
          points: 30,
          difficulty: "Intermediate",
          co2Saved: "3.1 kg",
          icon: "bicycle",
        },
        {
          id: 6,
          title: "Walk Instead of Drive",
          description: "Choose walking for nearby destinations",
          points: 20,
          difficulty: "Beginner",
          co2Saved: "1.8 kg",
          icon: "walk",
        },
      ],
    },
    {
      id: "consumption",
      title: "Consumption",
      icon: "bag",
      color: "#f59e0b",
      actions: [
        {
          id: 7,
          title: "Zero Waste Shopping",
          description: "Shop without creating packaging waste",
          points: 50,
          difficulty: "Advanced",
          co2Saved: "1.5 kg",
          icon: "bag-handle",
        },
        {
          id: 8,
          title: "Buy Second-hand Items",
          description: "Choose pre-owned products",
          points: 35,
          difficulty: "Intermediate",
          co2Saved: "2.8 kg",
          icon: "refresh",
        },
        {
          id: 9,
          title: "Refuse Excessive Packaging",
          description: "Say no to unnecessary packaging",
          points: 25,
          difficulty: "Intermediate",
          co2Saved: "1.2 kg",
          icon: "close-circle",
        },
      ],
    },
  ]

  const handleActionComplete = (action) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    Alert.alert("Complete Action", `Take a photo to verify: ${action.title}`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Take Photo",
        onPress: () => {
          // In a real app, this would open the camera
          setCompletedActions((prev) => [...prev, action.id])
          Alert.alert(
            "Action Completed!",
            `You earned ${action.points} Eco Points and saved ${action.co2Saved} of CO2!`,
          )
        },
      },
    ])
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#10b981"
      case "Intermediate":
        return "#f59e0b"
      case "Advanced":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const renderActionCard = (action, categoryColor) => {
    const isCompleted = completedActions.includes(action.id)

    return (
      <TouchableOpacity
        key={action.id}
        style={[styles.actionCard, isCompleted && styles.completedCard]}
        onPress={() => !isCompleted && handleActionComplete(action)}
        activeOpacity={0.8}
      >
        <BlurView intensity={20} style={styles.actionBlur}>
          <LinearGradient
            colors={isCompleted ? ["#10b98120", "#059669"] : [`${categoryColor}20`, `${categoryColor}10`]}
            style={styles.actionGradient}
          >
            <View style={styles.actionHeader}>
              <View style={[styles.actionIcon, { backgroundColor: isCompleted ? "#10b981" : categoryColor }]}>
                <Ionicons name={isCompleted ? "checkmark" : action.icon} size={20} color="white" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </View>
              <View style={styles.actionRewards}>
                <View style={styles.pointsBadge}>
                  <Text style={styles.pointsText}>+{action.points}</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(action.difficulty) }]}>
                  <Text style={styles.difficultyText}>{action.difficulty}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actionFooter}>
              <View style={styles.impactInfo}>
                <Ionicons name="leaf-outline" size={16} color="#10b981" />
                <Text style={styles.impactText}>CO2 Saved: {action.co2Saved}</Text>
              </View>
              {isCompleted && (
                <View style={styles.completedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    )
  }

  const renderCategory = (category) => (
    <View key={category.id} style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={24} color="white" />
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      {category.actions.map((action) => renderActionCard(action, category.color))}
    </View>
  )

  return (
    <LinearGradient colors={["#0f172a", "#1e293b", "#334155"]} style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eco Action</Text>
          <Text style={styles.headerSubtitle}>Practice and certify eco-friendly behaviors</Text>
        </View>

        {/* Progress Summary */}
        <BlurView intensity={30} style={styles.summaryCard}>
          <LinearGradient colors={["#10b98120", "#059669"]} style={styles.summaryGradient}>
            <View style={styles.summaryHeader}>
              <Ionicons name="trophy" size={24} color="#10b981" />
              <Text style={styles.summaryTitle}>Today's Progress</Text>
            </View>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{completedActions.length}</Text>
                <Text style={styles.summaryLabel}>Actions Completed</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{completedActions.length * 25}</Text>
                <Text style={styles.summaryLabel}>Points Earned</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{(completedActions.length * 1.5).toFixed(1)} kg</Text>
                <Text style={styles.summaryLabel}>CO2 Saved</Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>

        {/* Action Categories */}
        {actionCategories.map(renderCategory)}

        {/* Weekly Challenge */}
        <BlurView intensity={20} style={styles.challengeCard}>
          <LinearGradient colors={["#8b5cf620", "#7c3aed"]} style={styles.challengeGradient}>
            <View style={styles.challengeHeader}>
              <Ionicons name="calendar" size={24} color="#8b5cf6" />
              <Text style={styles.challengeTitle}>Weekly Challenge</Text>
              <View style={styles.challengeBadge}>
                <Text style={styles.challengeBadgeText}>+100 Points</Text>
              </View>
            </View>
            <Text style={styles.challengeDescription}>Complete 5 different eco-actions this week</Text>
            <View style={styles.challengeProgress}>
              <View style={styles.challengeProgressBar}>
                <View style={[styles.challengeProgressFill, { width: `${(completedActions.length / 5) * 100}%` }]} />
              </View>
              <Text style={styles.challengeProgressText}>{completedActions.length}/5 completed</Text>
            </View>
          </LinearGradient>
        </BlurView>
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
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#9ca3af",
  },
  summaryCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  summaryGradient: {
    padding: 20,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10b981",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 5,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  actionCard: {
    marginHorizontal: 30,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  completedCard: {
    opacity: 0.8,
  },
  actionBlur: {
    flex: 1,
  },
  actionGradient: {
    padding: 20,
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  actionDescription: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
  },
  actionRewards: {
    alignItems: "flex-end",
    gap: 5,
  },
  pointsBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  actionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  impactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  impactText: {
    fontSize: 12,
    color: "#10b981",
    marginLeft: 5,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    fontSize: 12,
    color: "#10b981",
    marginLeft: 5,
    fontWeight: "bold",
  },
  challengeCard: {
    marginHorizontal: 30,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  challengeGradient: {
    padding: 20,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    flex: 1,
  },
  challengeBadge: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  challengeBadgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  challengeDescription: {
    fontSize: 14,
    color: "#d1d5db",
    marginBottom: 15,
  },
  challengeProgress: {
    flexDirection: "row",
    alignItems: "center",
  },
  challengeProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#374151",
    borderRadius: 3,
    marginRight: 10,
  },
  challengeProgressFill: {
    height: "100%",
    backgroundColor: "#8b5cf6",
    borderRadius: 3,
  },
  challengeProgressText: {
    fontSize: 12,
    color: "#9ca3af",
  },
})

export default EcoAction
