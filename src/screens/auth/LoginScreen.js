"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "../../../App";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, isDarkMode } = useAppContext();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (email && password) {
        const userData = {
          id: "1",
          name: email.split("@")[0],
          email: email,
          avatar: "🌱",
          streak: Math.floor(Math.random() * 30) + 1,
        };
        await login(userData);
        navigation.navigate("Home"); // Navigate to HomeScreen after login
        Alert.alert("Success!", "Welcome back to EcoStep!", [{ text: "OK", onPress: () => {} }]);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Login Failed", "Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your email address first.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    Alert.alert(
      "Password Reset",
      `A password reset link has been sent to ${email}. Please check your email and follow the instructions.`,
      [{ text: "OK" }],
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={isDarkMode ? ["#0f172a", "#1e293b"] : ["#f0f9ff", "#e0f2fe"]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Welcome Back! 🌱</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
              Sign in to continue your eco journey
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Email Address</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: isDarkMode ? "#374151" : "#fff",
                    borderColor: errors.email ? "#ef4444" : isDarkMode ? "#4b5563" : "#e5e7eb",
                  },
                ]}
              >
                <Ionicons name="mail-outline" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  style={[styles.input, { color: isDarkMode ? "#fff" : "#1f2937" }]}
                  placeholder="Enter your email"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Password</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: isDarkMode ? "#374151" : "#fff",
                    borderColor: errors.password ? "#ef4444" : isDarkMode ? "#4b5563" : "#e5e7eb",
                  },
                ]}
              >
                <Ionicons name="lock-closed-outline" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  style={[styles.input, { color: isDarkMode ? "#fff" : "#1f2937" }]}
                  placeholder="Enter your password"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={isDarkMode ? "#9ca3af" : "#6b7280"}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: isDarkMode ? "#60a5fa" : "#3b82f6" }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient colors={["#10b981", "#059669"]} style={styles.loginButtonGradient}>
                <Text style={styles.loginButtonText}>{isLoading ? "Signing In..." : "Sign In"}</Text>
                {!isLoading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb" }]} />
              <Text style={[styles.dividerText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb" }]} />
            </View>

            <View style={styles.signupContainer}>
              <Text style={[styles.signupText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={[styles.signupLink, { color: isDarkMode ? "#60a5fa" : "#3b82f6" }]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20, paddingVertical: 40 },
  header: { alignItems: "center", marginBottom: 40 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", lineHeight: 22 },
  form: { width: "100%" },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10 },
  eyeIcon: { padding: 5 },
  errorText: { color: "#ef4444", fontSize: 14, marginTop: 5 },
  forgotPassword: { alignSelf: "flex-end", marginBottom: 30 },
  forgotPasswordText: { fontSize: 14, fontWeight: "600" },
  loginButton: { borderRadius: 12, overflow: "hidden", marginBottom: 30 },
  loginButtonGradient: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 16 },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginRight: 10 },
  divider: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 15, fontSize: 14 },
  signupContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  signupText: { fontSize: 16 },
  signupLink: { fontSize: 16, fontWeight: "600" },
});

export default LoginScreen;