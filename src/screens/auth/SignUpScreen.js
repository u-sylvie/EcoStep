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

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { login, isDarkMode } = useAppContext();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!acceptedTerms) newErrors.terms = "Please accept the terms and conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const userData = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        avatar: "🌱",
        streak: 0,
        level: "Eco Beginner",
        ecoPoints: 100,
      };
      await login(userData);
      navigation.navigate("MainTabs", { screen: "Home" }); // Navigate to Home tab after sign-up
      Alert.alert(
        "Welcome to EcoStep! 🎉",
        "Your account has been created successfully. Start your eco-friendly journey today!",
        [{ text: "Get Started", onPress: () => navigation.navigate("MainTabs", { screen: "Home" }) }]
      );
    } catch (error) {
      Alert.alert("Registration Failed", "There was an error creating your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={isDarkMode ? ["#0f172a", "#1e293b"] : ["#f0f9ff", "#e0f2fe"]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Join EcoStep! 🌍</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
              Create your account and start making a difference
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Full Name</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: isDarkMode ? "#374151" : "#fff",
                    borderColor: errors.name ? "#ef4444" : isDarkMode ? "#4b5563" : "#e5e7eb",
                  },
                ]}
              >
                <Ionicons name="person-outline" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  style={[styles.input, { color: isDarkMode ? "#fff" : "#1f2937" }]}
                  placeholder="Enter your full name"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
                  value={formData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

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
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
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
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
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

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: isDarkMode ? "#fff" : "#1f2937" }]}>Confirm Password</Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: isDarkMode ? "#374151" : "#fff",
                    borderColor: errors.confirmPassword ? "#ef4444" : isDarkMode ? "#4b5563" : "#e5e7eb",
                  },
                ]}
              >
                <Ionicons name="lock-closed-outline" size={20} color={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  style={[styles.input, { color: isDarkMode ? "#fff" : "#1f2937" }]}
                  placeholder="Confirm your password"
                  placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"}
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange("confirmPassword", text)}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons
                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={isDarkMode ? "#9ca3af" : "#6b7280"}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
                <Ionicons
                  name={acceptedTerms ? "checkbox" : "square-outline"}
                  size={20}
                  color={isDarkMode ? "#9ca3af" : "#6b7280"}
                />
              </TouchableOpacity>
              <Text style={[styles.termsText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                I accept the{" "}
                <Text style={{ color: isDarkMode ? "#60a5fa" : "#3b82f6" }}>Terms and Conditions</Text>
              </Text>
              {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}
            </View>

            <TouchableOpacity
              style={[styles.signUpButton, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <LinearGradient colors={["#10b981", "#059669"]} style={styles.signUpButtonGradient}>
                <Text style={styles.signUpButtonText}>{isLoading ? "Creating Account..." : "Create Account"}</Text>
                {!isLoading && <Ionicons name="arrow-forward" size={20} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb" }]} />
              <Text style={[styles.dividerText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb" }]} />
            </View>

            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.loginLink, { color: isDarkMode ? "#60a5fa" : "#3b82f6" }]}>Sign In</Text>
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
  termsContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  termsText: { fontSize: 14, marginLeft: 10 },
  signUpButton: { borderRadius: 12, overflow: "hidden", marginBottom: 30 },
  signUpButtonGradient: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 16 },
  signUpButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginRight: 10 },
  divider: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 15, fontSize: 14 },
  loginContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  loginText: { fontSize: 16 },
  loginLink: { fontSize: 16, fontWeight: "600" },
});

export default SignUpScreen;