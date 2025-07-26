"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"
import * as ImagePicker from 'expo-image-picker';

const ActionVerification = ({ route }) => {
  const navigation = useNavigation()
  const { isDarkMode } = useAppContext()
  const { mission } = route.params || {}

  const [photoTaken, setPhotoTaken] = useState(false)
  const [photoSource, setPhotoSource] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { width } = Dimensions.get('window')

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
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoSource(result.assets[0].uri);
      setPhotoTaken(true);
      setIsProcessing(false);
      Alert.alert(
        "Photo Captured",
        "Your photo has been successfully captured and is being verified.",
        [{ text: "OK" }]
      );
    }
  }

  const handleUploadFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoSource(result.assets[0].uri);
      setPhotoTaken(true);
      setIsProcessing(false);
      Alert.alert(
        "Photo Selected",
        "Your photo has been successfully selected and is being verified.",
        [{ text: "OK" }]
      );
    }
  }
  
  // Add verification and completion logic
  useEffect(() => {
    if (photoTaken && photoSource) {
      // Simulate AI verification process
      const verificationTimer = setTimeout(() => {
        navigation.navigate("MissionComplete", { mission: missionData });
      }, 3000);
      
      return () => clearTimeout(verificationTimer);
    }
  }, [photoTaken, photoSource]);

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{missionData.title}</Text>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => Alert.alert(
            "How to Complete This Action",
            "1. Take a clear photo of your reusable cup being used\n2. Make sure the cup is visible in the frame\n3. Our AI will verify your action automatically\n4. You'll earn eco points upon verification",
            [{ text: "Got it!" }]
          )}
        >
          <Ionicons name="help-circle-outline" size={24} color={isDarkMode ? "white" : "#1f2937"} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
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
            <Text style={styles.simulationNote}>This is a simulation. In a real app, your camera would open here.</Text>

            <View style={styles.photoArea}>
              {isProcessing ? (
                <View style={styles.photoProcessing}>
                  <Ionicons name="sync" size={64} color="#3b82f6" />
                  <Text style={styles.photoProcessingText}>Processing...</Text>
                </View>
              ) : photoTaken && photoSource ? (
                <View style={styles.photoContainer}>
                  <Image
                    source={{ uri: photoSource }}
                    style={styles.photoImage}
                    resizeMode="cover"
                  />
                  <View style={styles.photoOverlay}>
                    <Ionicons name="checkmark-circle" size={40} color="#10b981" />
                    <Text style={styles.photoTakenText}>Verified!</Text>
                  </View>
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
          <TouchableOpacity
            style={[styles.takePhotoButton, isProcessing && styles.disabledButton]}
            onPress={handleTakePhoto}
            disabled={isProcessing}
          >
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.takePhotoGradient}
            >
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.takePhotoText}>Take Photo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.uploadButton, isProcessing && styles.disabledButton]}
            onPress={handleUploadFromGallery}
            disabled={isProcessing}
          >
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
      </ScrollView>
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
  simulationNote: {
    fontSize: 12,
    color: "#f59e0b",
    textAlign: "center",
    marginBottom: 10,
  },
  photoArea: {
    height: 250,
    borderRadius: 15,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4b5563",
    borderStyle: "dashed",
    overflow: "hidden",
  },
  photoContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoOverlay: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  photoPlaceholder: {
    alignItems: "center",
  },
  photoPlaceholderText: {
    color: "#9ca3af",
    fontSize: 16,
    marginTop: 10,
  },
  photoProcessing: {
    alignItems: "center",
  },
  photoProcessingText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  photoTakenText: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
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
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.6,
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
