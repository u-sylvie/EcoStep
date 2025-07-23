"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"

const ActionVerification = ({ route }) => {
  const navigation = useNavigation()
  const { isDarkMode } = useAppContext()
  const { mission } = route.params || {}

  const [photoTaken, setPhotoTaken] = useState(false)

  const missionData = mission || {
    title: "Use Reusable Cup",
    description: "Show your reusable cup at a café or coffee shop",
    points: 15,
    icon: "cafe",
    color: "#10b981",
  }

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const handleTakePhoto = async () => {
    Alert.alert("Take Photo", "Camera functionality would open here in a real app", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Simulate Photo",
        onPress: () => {
          setPhotoTaken(true)
          setTimeout(() => {
            navigation.navigate("MissionComplete", { mission: missionData })
          }, 1000)
        },
      },
    ])
  }

  const handleUploadFromGallery = async () => {
    Alert.alert("Upload Photo", "Gallery functionality would open here in a real app", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Simulate Upload",
        onPress: () => {
          setPhotoTaken(true)
          setTimeout(() => {
            navigation.navigate("MissionComplete", { mission: missionData })
          }, 1000)
        },
      },
    ])
  }

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{missionData.title}</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color={isDarkMode ? "white" : "#1f2937"} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Mission Info */}
        <BlurView intensity={20} style={styles.missionCard}>
          <LinearGradient colors={cardColors} style={styles.missionGradient}>
            <View style={[styles.missionIcon, { backgroundColor: missionData.color }]}>
              <Ionicons name={missionData.icon} size={32} color="white" />
            </View>
            <Text style={[styles.missionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{missionData.title}</Text>
            <Text style={styles.missionDescription}>{missionData.description}</Text>
          </LinearGradient>
        </BlurView>

        {/* Photo Area */}
        <BlurView intensity={20} style={styles.photoCard}>
          <LinearGradient colors={cardColors} style={styles.photoGradient}>
            <Text style={[styles.photoTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Take a Photo</Text>
            <Text style={styles.photoSubtitle}>Show your reusable cup at a café or coffee shop</Text>

            <View style={styles.photoArea}>
              {photoTaken ? (
                <View style={styles.photoTaken}>
                  <Ionicons name="checkmark-circle" size={64} color="#10b981" />
                  <Text style={styles.photoTakenText}>Photo Captured!</Text>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="camera" size={64} color="#9ca3af" />
                  <Text style={styles.photoPlaceholderText}>No photo yet</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </BlurView>

        {/* AI Verification */}
        <BlurView intensity={15} style={styles.verificationCard}>
          <LinearGradient colors={cardColors} style={styles.verificationGradient}>
            <View style={styles.verificationHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={[styles.verificationTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>
                AI Verification
              </Text>
            </View>
            <Text style={styles.verificationText}>Automatically verifies your action</Text>
          </LinearGradient>
        </BlurView>

        {/* Location Optional */}
        <BlurView intensity={15} style={styles.locationCard}>
          <LinearGradient colors={cardColors} style={styles.locationGradient}>
            <View style={styles.locationHeader}>
              <Ionicons name="location" size={20} color="#3b82f6" />
              <Text style={[styles.locationTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Location Optional</Text>
            </View>
            <Text style={styles.locationText}>Share location for bonus points</Text>
          </LinearGradient>
        </BlurView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.takePhotoButton} onPress={handleTakePhoto}>
            <LinearGradient colors={["#10b981", "#059669"]} style={styles.takePhotoGradient}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.takePhotoText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFromGallery}>
            <BlurView intensity={15} style={styles.uploadBlur}>
              <LinearGradient colors={cardColors} style={styles.uploadGradient}>
                <Ionicons name="image" size={24} color={isDarkMode ? "white" : "#1f2937"} />
                <Text style={[styles.uploadText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  Upload from Gallery
                </Text>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
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
    paddingHorizontal: 30,
    paddingTop: 60,
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
    fontSize: 18,
    fontWeight: "bold",
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  missionCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
  },
  missionGradient: {
    padding: 30,
    alignItems: "center",
  },
  missionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  missionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  missionDescription: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 24,
  },
  photoCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  photoGradient: {
    padding: 25,
  },
  photoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  photoSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 20,
  },
  photoArea: {
    height: 200,
    borderRadius: 15,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4b5563",
    borderStyle: "dashed",
  },
  photoPlaceholder: {
    alignItems: "center",
  },
  photoPlaceholderText: {
    color: "#9ca3af",
    fontSize: 16,
    marginTop: 10,
  },
  photoTaken: {
    alignItems: "center",
  },
  photoTakenText: {
    color: "#10b981",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  verificationCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
  },
  verificationGradient: {
    padding: 20,
  },
  verificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  verificationText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  locationCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  locationGradient: {
    padding: 20,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  actionButtons: {
    gap: 15,
  },
  takePhotoButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  takePhotoGradient: {
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  uploadButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  uploadBlur: {
    flex: 1,
  },
  uploadGradient: {
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
})

export default ActionVerification
