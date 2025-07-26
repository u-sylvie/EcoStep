"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../App"

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useAppContext()
  const [notifications, setNotifications] = useState(true)
  const [locationServices, setLocationServices] = useState(false)
  const [dataSync, setDataSync] = useState(true)
  const [autoBackup, setAutoBackup] = useState(false)

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const settingSections = [
    {
      title: "Appearance",
      items: [
        {
          icon: "moon",
          title: "Dark Mode",
          subtitle: "Switch between light and dark theme",
          type: "switch",
          value: isDarkMode,
          onToggle: toggleTheme,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: "notifications",
          title: "Push Notifications",
          subtitle: "Receive daily eco-tips and reminders",
          type: "switch",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: "time",
          title: "Reminder Time",
          subtitle: "Set daily reminder time",
          type: "navigation",
          onPress: () => Alert.alert("Coming Soon", "Time picker will be available in next update"),
        },
      ],
    },
    {
      title: "Privacy & Data",
      items: [
        {
          icon: "location",
          title: "Location Services",
          subtitle: "Enable location-based eco-tips",
          type: "switch",
          value: locationServices,
          onToggle: setLocationServices,
        },
        {
          icon: "sync",
          title: "Data Sync",
          subtitle: "Sync data across devices",
          type: "switch",
          value: dataSync,
          onToggle: setDataSync,
        },
        {
          icon: "cloud-upload",
          title: "Auto Backup",
          subtitle: "Automatically backup your progress",
          type: "switch",
          value: autoBackup,
          onToggle: setAutoBackup,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "help-circle",
          title: "Help & FAQ",
          subtitle: "Get help and find answers",
          type: "navigation",
          onPress: () => Alert.alert("Help", "Help section coming soon!"),
        },
        {
          icon: "mail",
          title: "Contact Support",
          subtitle: "Get in touch with our team",
          type: "navigation",
          onPress: () => Alert.alert("Contact", "Email: support@ecostep.app"),
        },
        {
          icon: "star",
          title: "Rate App",
          subtitle: "Rate us on the app store",
          type: "navigation",
          onPress: () => Alert.alert("Thank you!", "Rating feature coming soon!"),
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: "information-circle",
          title: "App Version",
          subtitle: "1.0.0",
          type: "info",
        },
        {
          icon: "document-text",
          title: "Terms of Service",
          subtitle: "Read our terms and conditions",
          type: "navigation",
          onPress: () => Alert.alert("Terms", "Terms of service coming soon!"),
        },
        {
          icon: "shield-checkmark",
          title: "Privacy Policy",
          subtitle: "Learn how we protect your data",
          type: "navigation",
          onPress: () => Alert.alert("Privacy", "Privacy policy coming soon!"),
        },
      ],
    },
  ]

  const renderSettingItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.type === "info" || item.type === "switch"}
    >
      <BlurView intensity={15} style={styles.settingBlur}>
        <LinearGradient colors={cardColors} style={styles.settingGradient}>
          <View style={styles.settingIcon}>
            <Ionicons name={item.icon} size={20} color="#10b981" />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{item.title}</Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
          {item.type === "switch" && (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: "#374151", true: "#10b98150" }}
              thumbColor={item.value ? "#10b981" : "#9ca3af"}
            />
          )}
          {item.type === "navigation" && <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  )

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{section.title}</Text>
            {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: "#ef4444" }]}>Danger Zone</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert("Clear Data", "Are you sure? This action cannot be undone.", [
                { text: "Cancel", style: "cancel" },
                { text: "Clear", style: "destructive", onPress: () => Alert.alert("Success", "Data cleared!") },
              ])
            }
          >
            <BlurView intensity={15} style={styles.settingBlur}>
              <LinearGradient colors={cardColors} style={styles.settingGradient}>
                <View style={styles.settingIcon}>
                  <Ionicons name="trash" size={20} color="#ef4444" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, { color: "#ef4444" }]}>Clear All Data</Text>
                  <Text style={styles.settingSubtitle}>Remove all app data and progress</Text>
                </View>
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
  placeholder: {
    width: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 15,
  },
  settingItem: {
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  settingBlur: {
    flex: 1,
  },
  settingGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b98120",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
  },
})

export default SettingsScreen
