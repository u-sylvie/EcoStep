import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../../App";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const { isDarkMode } = useAppContext();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendReset = async () => {
    setError("");
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <LinearGradient colors={isDarkMode ? ["#0f172a", "#1e293b"] : ["#f0f9ff", "#e0f2fe"]} style={styles.gradient}>
          <View style={styles.content}>
            <Ionicons name="mail-open-outline" size={64} color="#10b981" style={{ marginBottom: 20 }} />
            <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Check your email</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>A password reset link has been sent to:</Text>
            <Text style={[styles.email, { color: isDarkMode ? "#fff" : "#1f2937" }]}>{email}</Text>
            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate("Auth", { screen: "Login" })}>
              <LinearGradient colors={["#10b981", "#059669"]} style={styles.sendButtonGradient}>
                <Text style={styles.sendButtonText}>Back to Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={isDarkMode ? ["#0f172a", "#1e293b"] : ["#f0f9ff", "#e0f2fe"]} style={styles.gradient}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={isDarkMode ? "#fff" : "#1f2937"} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Forgot Password?</Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>Enter your email to receive a reset link.</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <TextInput
              style={[styles.input, { color: isDarkMode ? "#000" : "#1f2937" }]}
              placeholder="Email address"
              placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.sendButton} onPress={handleSendReset} disabled={isLoading}>
            <LinearGradient colors={["#10b981", "#059669"]} style={styles.sendButtonGradient}>
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.sendButtonText}>Send Reset Link</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  backButton: { alignSelf: "flex-start", marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, textAlign: "center" },
  email: { fontSize: 16, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "100%",
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10 },
  errorText: { color: "#ef4444", fontSize: 14, marginBottom: 10 },
  sendButton: { borderRadius: 12, overflow: "hidden", width: "100%", marginTop: 10 },
  sendButtonGradient: { paddingVertical: 16, alignItems: "center" },
  sendButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ForgotPasswordScreen; 