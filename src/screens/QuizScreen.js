"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"
import { useAppContext } from "../../App"

const QuizScreen = ({ navigation, route }) => {
  const { isDarkMode, ecoPoints, updateEcoPoints } = useAppContext()
  const { quiz } = route.params || {}

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState(0)
  const [fadeAnim] = useState(new Animated.Value(0))

  const quizData = quiz || {
    title: "Daily Climate Challenge",
    questions: [
      {
        id: 1,
        question: "What percentage of global greenhouse gas emissions come from transportation?",
        options: ["14%", "24%", "34%", "44%"],
        correct: 1,
        explanation: "Transportation accounts for approximately 24% of global CO2 emissions from fuel combustion.",
      },
      {
        id: 2,
        question: "Which renewable energy source has grown the fastest in recent years?",
        options: ["Solar", "Wind", "Hydro", "Geothermal"],
        correct: 0,
        explanation: "Solar energy has experienced the most rapid growth globally, with costs falling dramatically.",
      },
      {
        id: 3,
        question: "How much water can be saved by taking a 4-minute shower instead of 8 minutes?",
        options: ["10 gallons", "20 gallons", "30 gallons", "40 gallons"],
        correct: 2,
        explanation: "A typical shower uses about 7.5 gallons per minute, so 4 minutes saves about 30 gallons.",
      },
    ],
  }

  const bgColors = isDarkMode ? ["#0f172a", "#1e293b", "#334155"] : ["#f8fafc", "#e2e8f0", "#cbd5e1"]
  const cardColors = isDarkMode ? ["#374151", "#1f2937"] : ["#ffffff", "#f1f5f9"]

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [currentQuestion])

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      Alert.alert("Please select an answer", "Choose one of the options to continue.")
      return
    }

    const isCorrect = selectedAnswer === quizData.questions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        fadeAnim.setValue(0)
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      } else {
        // Quiz completed
        const finalScore = isCorrect ? score + 1 : score
        const percentage = (finalScore / quizData.questions.length) * 100
        let earnedStars = 0
        let pointsEarned = 0

        if (percentage >= 90) {
          earnedStars = 3
          pointsEarned = 30
        } else if (percentage >= 70) {
          earnedStars = 2
          pointsEarned = 20
        } else if (percentage >= 50) {
          earnedStars = 1
          pointsEarned = 10
        }

        setStars(earnedStars)
        updateEcoPoints(ecoPoints + pointsEarned)

        setTimeout(() => {
          Alert.alert(
            "Quiz Completed! 🎉",
            `You scored ${finalScore}/${quizData.questions.length}\n⭐ ${earnedStars} stars earned\n🌱 +${pointsEarned} Eco Points`,
            [{ text: "Continue", onPress: () => navigation.goBack() }],
          )
        }, 1000)
      }
    }, 2000)
  }

  const renderStars = (count) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < count ? "star" : "star-outline"}
        size={24}
        color={i < count ? "#f59e0b" : "#6b7280"}
      />
    ))
  }

  const currentQ = quizData.questions[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correct

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? "white" : "#1f2937"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? "white" : "#1f2937" }]}>{quizData.title}</Text>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: isDarkMode ? "white" : "#1f2937" }]}>
            {currentQuestion + 1}/{quizData.questions.length}
          </Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }]}
        />
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <BlurView intensity={20} style={styles.questionCard}>
          <LinearGradient colors={cardColors} style={styles.questionGradient}>
            <Text style={[styles.questionText, { color: isDarkMode ? "white" : "#1f2937" }]}>{currentQ.question}</Text>
          </LinearGradient>
        </BlurView>

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

        {showResult && (
          <BlurView intensity={20} style={styles.explanationCard}>
            <LinearGradient colors={cardColors} style={styles.explanationGradient}>
              <View style={styles.resultHeader}>
                <Ionicons
                  name={isCorrect ? "checkmark-circle" : "close-circle"}
                  size={24}
                  color={isCorrect ? "#10b981" : "#ef4444"}
                />
                <Text style={[styles.resultText, { color: isCorrect ? "#10b981" : "#ef4444" }]}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </Text>
              </View>
              <Text style={[styles.explanationText, { color: isDarkMode ? "white" : "#1f2937" }]}>
                {currentQ.explanation}
              </Text>
            </LinearGradient>
          </BlurView>
        )}

        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion} disabled={selectedAnswer === null}>
          <LinearGradient
            colors={selectedAnswer !== null ? ["#10b981", "#059669"] : ["#6b7280", "#4b5563"]}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion < quizData.questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  progressContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "bold",
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
  explanationCard: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  explanationGradient: {
    padding: 20,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  explanationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  nextButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
  },
  nextButtonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default QuizScreen
