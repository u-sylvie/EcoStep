"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useAppContext } from "../../../App"

const InteractiveQuiz = ({ route }) => {
  const navigation = useNavigation()
  const { isDarkMode, ecoPoints, updateEcoPoints } = useAppContext()
  const { module } = route.params || {}

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [fadeAnim] = useState(new Animated.Value(1))

  const quizData = {
    title: "Renewable Energy Quiz",
    currentQuestion: 3,
    totalQuestions: 5,
    timeLeft: 45,
    questions: [
      {
        id: 1,
        question: "Which renewable energy source generates the most electricity globally?",
        options: ["Solar Power", "Hydroelectric Power", "Wind Power", "Geothermal Power"],
        correct: 1,
        explanation: "Hydroelectric power currently generates the most renewable electricity worldwide.",
      },
    ],
  }

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleContinue = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === quizData.questions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
      updateEcoPoints(ecoPoints + 15)
    }

    setShowResult(true)
    setTimeout(() => {
      navigation.goBack()
    }, 2000)
  }

  const currentQ = quizData.questions[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correct

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: isDarkMode ? "white" : "#1f2937" }]}>
            {quizData.currentQuestion}/{quizData.totalQuestions}
          </Text>
        </View>
        <View style={styles.timerContainer}>
          <Ionicons name="time" size={20} color="#f59e0b" />
          <Text style={styles.timerText}>{quizData.timeLeft}s</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${(quizData.currentQuestion / quizData.totalQuestions) * 100}%` }]}
        />
      </View>

      <ScrollView contentContainerStyle={[styles.content, { opacity: fadeAnim }]}>
        {/* Question */}
        <BlurView intensity={20} style={styles.questionCard}>
          <LinearGradient colors={cardColors} style={styles.questionGradient}>
            <Text style={[styles.questionText, { color: isDarkMode ? "white" : "#1f2937" }]}>{currentQ.question}</Text>
          </LinearGradient>
        </BlurView>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => {
            let optionStyle = styles.optionButton
            let optionTextStyle = [styles.optionText, { color: isDarkMode ? "white" : "#1f2937" }]

            if (showResult && selectedAnswer !== null) {
              if (index === currentQ.correct) {
                optionStyle = [styles.optionButton, styles.correctOption]
                optionTextStyle = [styles.optionText, { color: "white" }]
              } else if (index === selectedAnswer && selectedAnswer !== currentQ.correct) {
                optionStyle = [styles.optionButton, styles.wrongOption]
                optionTextStyle = [styles.optionText, { color: "white" }]
              }
            } else if (selectedAnswer === index) {
              optionStyle = [styles.optionButton, styles.selectedOption]
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <BlurView intensity={15} style={styles.optionBlur}>
                  <LinearGradient
                    colors={
                      showResult && index === currentQ.correct
                        ? ["#10b981", "#059669"]
                        : showResult && index === selectedAnswer && selectedAnswer !== currentQ.correct
                          ? ["#ef4444", "#dc2626"]
                          : selectedAnswer === index
                            ? ["#3b82f6", "#2563eb"]
                            : cardColors
                    }
                    style={styles.optionGradient}
                  >
                    <Text style={optionTextStyle}>{option}</Text>
                    {showResult && index === currentQ.correct && (
                      <Ionicons name="checkmark-circle" size={24} color="white" />
                    )}
                    {showResult && index === selectedAnswer && selectedAnswer !== currentQ.correct && (
                      <Ionicons name="close-circle" size={24} color="white" />
                    )}
                  </LinearGradient>
                </BlurView>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* AI Verification */}
        {showResult && (
          <BlurView intensity={20} style={styles.verificationCard}>
            <LinearGradient colors={cardColors} style={styles.verificationGradient}>
              <View style={styles.verificationHeader}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={[styles.verificationText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                  AI Verification
                </Text>
              </View>
              <Text style={[styles.verificationSubtext, { color: isDarkMode ? "#d1d5db" : "#6b7280" }]}>
                Automatically verifies your answer
              </Text>
            </LinearGradient>
          </BlurView>
        )}

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue} disabled={selectedAnswer === null}>
          <LinearGradient
            colors={selectedAnswer !== null ? ["#10b981", "#059669"] : ["#6b7280", "#4b5563"]}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  progressText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    color: "#f59e0b",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#374151",
    marginHorizontal: 30,
    borderRadius: 2,
    marginBottom: 30,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10b981",
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  questionCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
  },
  questionGradient: {
    padding: 30,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    textAlign: "center",
  },
  optionsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  optionButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  selectedOption: {
    transform: [{ scale: 0.98 }],
  },
  correctOption: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  wrongOption: {
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  optionBlur: {
    flex: 1,
  },
  optionGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  verificationCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  verificationGradient: {
    padding: 20,
  },
  verificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  verificationSubtext: {
    fontSize: 14,
  },
  continueButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  continueButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default InteractiveQuiz
