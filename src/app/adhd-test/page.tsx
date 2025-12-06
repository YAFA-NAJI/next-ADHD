'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Download,
  Share2,
  Brain,
  Lightbulb,
  Heart,
  Zap,
} from 'lucide-react';

// ADHD Test Questions with categories
const ADHD_QUESTIONS = [
  {
    id: 1,
    category: 'Attention',
    question: 'Do you have difficulty sustaining attention on tasks or activities?',
    description: 'Trouble focusing for extended periods',
  },
  {
    id: 2,
    category: 'Attention',
    question: 'Do you often overlook details or make careless mistakes?',
    description: 'Missing important information',
  },
  {
    id: 3,
    category: 'Attention',
    question: 'Do you struggle to listen when someone is speaking to you?',
    description: 'Mind wandering during conversations',
  },
  {
    id: 4,
    category: 'Organization',
    question: 'Do you have difficulty organizing tasks and activities?',
    description: 'Trouble planning and prioritizing',
  },
  {
    id: 5,
    category: 'Organization',
    question: 'Do you avoid tasks that require sustained mental effort?',
    description: 'Procrastination on challenging work',
  },
  {
    id: 6,
    category: 'Organization',
    question: 'Do you frequently lose things needed for tasks or activities?',
    description: 'Misplacing keys, phone, documents',
  },
  {
    id: 7,
    category: 'Hyperactivity',
    question: 'Do you fidget or squirm when sitting for extended periods?',
    description: 'Restlessness and physical agitation',
  },
  {
    id: 8,
    category: 'Hyperactivity',
    question: 'Do you feel restless or have difficulty staying still?',
    description: 'Constant need for movement',
  },
  {
    id: 9,
    category: 'Impulsivity',
    question: 'Do you often interrupt others or blurt out answers?',
    description: 'Speaking without thinking',
  },
  {
    id: 10,
    category: 'Impulsivity',
    question: 'Do you have difficulty waiting your turn?',
    description: 'Impatience in conversations or activities',
  },
];

// Response scale
const RESPONSE_OPTIONS = [
  { value: 0, label: 'Never', color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900' },
  { value: 1, label: 'Rarely', color: 'bg-blue-100 hover:bg-blue-200 text-blue-900' },
  { value: 2, label: 'Sometimes', color: 'bg-amber-100 hover:bg-amber-200 text-amber-900' },
  { value: 3, label: 'Often', color: 'bg-orange-100 hover:bg-orange-200 text-orange-900' },
  { value: 4, label: 'Very Often', color: 'bg-red-100 hover:bg-red-200 text-red-900' },
];

// Result interpretation
const getResultInterpretation = (score: number, total: number) => {
  const percentage = (score / total) * 100;

  if (percentage < 30) {
    return {
      level: 'Low',
      color: 'emerald',
      icon: '✓',
      title: 'Low ADHD Symptoms',
      description:
        'Your responses suggest minimal ADHD symptoms. However, if you experience challenges in daily life, consider consulting a healthcare professional.',
      advice: [
        'Continue maintaining healthy habits',
        'Stay organized with routines',
        'Get regular exercise and sleep',
      ],
    };
  } else if (percentage < 50) {
    return {
      level: 'Mild',
      color: 'blue',
      icon: '◐',
      title: 'Mild ADHD Symptoms',
      description:
        'Your responses suggest mild ADHD symptoms. These may impact your daily functioning in some areas.',
      advice: [
        'Implement organizational strategies',
        'Use time management tools',
        'Consider speaking with a healthcare professional',
      ],
    };
  } else if (percentage < 70) {
    return {
      level: 'Moderate',
      color: 'amber',
      icon: '◑',
      title: 'Moderate ADHD Symptoms',
      description:
        'Your responses suggest moderate ADHD symptoms. Professional evaluation is recommended.',
      advice: [
        'Schedule an appointment with a healthcare provider',
        'Try behavioral strategies and tools',
        'Consider professional assessment',
      ],
    };
  } else {
    return {
      level: 'Severe',
      color: 'red',
      icon: '●',
      title: 'Significant ADHD Symptoms',
      description:
        'Your responses suggest significant ADHD symptoms. Professional evaluation and support are strongly recommended.',
      advice: [
        'Schedule an urgent appointment with a healthcare provider',
        'Seek professional diagnosis and treatment',
        'Explore support groups and resources',
      ],
    };
  }
};

// Category Score Card
const CategoryScoreCard = ({
  category,
  score,
  maxScore,
}: {
  category: string;
  score: number;
  maxScore: number;
}) => {
  const percentage = (score / maxScore) * 100;
  const getColor = () => {
    if (percentage < 30) return 'bg-emerald-500';
    if (percentage < 50) return 'bg-blue-500';
    if (percentage < 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const icons: { [key: string]: React.ReactNode } = {
    Attention: <Brain className="w-5 h-5" />,
    Organization: <Lightbulb className="w-5 h-5" />,
    Hyperactivity: <Zap className="w-5 h-5" />,
    Impulsivity: <Heart className="w-5 h-5" />,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border-l-4 border-indigo-500">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-indigo-600 dark:text-indigo-400">{icons[category]}</div>
          <h3 className="font-bold text-gray-900 dark:text-white">{category}</h3>
        </div>
        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
          {score} / {maxScore}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div className={`${getColor()} h-2 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

// Question Card Component
const QuestionCard = ({
  question,
  index,
  total,
  selectedAnswer,
  onAnswer,
}: {
  question: (typeof ADHD_QUESTIONS)[0];
  index: number;
  total: number;
  selectedAnswer: number | null;
  onAnswer: (value: number) => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6 border-t-4 border-indigo-500">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Question {index + 1} of {total}
          </span>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {Math.round(((index + 1) / total) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Category badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wider">
          {question.category}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-relaxed">
        {question.question}
      </h2>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{question.description}</p>

      {/* Response options */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {RESPONSE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={`p-4 rounded-lg font-bold text-center transition-all duration-300 transform hover:scale-105 ${
              selectedAnswer === option.value
                ? `${option.color} ring-2 ring-offset-2 ring-indigo-500 scale-105 shadow-lg`
                : `${option.color} shadow-md hover:shadow-lg`
            }`}
          >
            <div className="text-sm md:text-base">{option.label}</div>
            <div className="text-xs mt-1 opacity-70">{option.value}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Results Screen Component
const ResultsScreen = ({
  score,
  answers,
  onRestart,
  onDownload,
}: {
  score: number;
  answers: (number | null)[];
  onRestart: () => void;
  onDownload: () => void;
}) => {
  const totalPossible = ADHD_QUESTIONS.length * 4;
  const result = getResultInterpretation(score, totalPossible);

  // Calculate category scores
  const categoryScores: { [key: string]: { score: number; count: number } } = {
    Attention: { score: 0, count: 0 },
    Organization: { score: 0, count: 0 },
    Hyperactivity: { score: 0, count: 0 },
    Impulsivity: { score: 0, count: 0 },
  };

  ADHD_QUESTIONS.forEach((q, idx) => {
    if (answers[idx] !== null) {
      categoryScores[q.category].score += answers[idx]!;
      categoryScores[q.category].count += 1;
    }
  });

  const colorClasses: { [key: string]: string } = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    amber: 'from-amber-500 to-amber-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Result Header */}
        <div className={`bg-gradient-to-r ${colorClasses[result.color]} rounded-3xl shadow-2xl p-12 text-white mb-8 text-center`}>
          <div className="text-6xl mb-4">{result.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{result.title}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{result.description}</p>
        </div>

        {/* Score Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border-t-4 border-indigo-500">
            <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {score}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-semibold">
              out of {totalPossible} points
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              {Math.round((score / totalPossible) * 100)}%
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-t-4 border-amber-500">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommendations</h3>
            <ul className="space-y-3">
              {result.advice.map((advice, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{advice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border-t-4 border-emerald-500">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(categoryScores).map(([category, { score: catScore, count }]) => (
              <CategoryScoreCard
                key={category}
                category={category}
                score={catScore}
                maxScore={count * 4}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onDownload}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Download size={20} /> Download Results
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-indigo-600"
          >
            <RotateCcw size={20} /> Retake Test
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Important Disclaimer</h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                This screening tool is not a diagnostic instrument. It is designed to help you understand potential ADHD symptoms. 
                A proper diagnosis can only be made by a qualified healthcare professional. If you have concerns about ADHD, 
                please consult with a doctor or mental health professional.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
          >
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function ADHDTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(ADHD_QUESTIONS.length).fill(null));
  const [testComplete, setTestComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < ADHD_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (currentQuestion < ADHD_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTestComplete(true);
      setIsLoading(false);
    }, 500);
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + (answer !== null ? answer : 0), 0);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(ADHD_QUESTIONS.length).fill(null));
    setTestComplete(false);
  };

  const handleDownload = () => {
    const score = calculateScore();
    const totalPossible = ADHD_QUESTIONS.length * 4;
    const result = getResultInterpretation(score, totalPossible);

    const text = `ADHD Screening Test Results
================================

Result: ${result.title}
Score: ${score} / ${totalPossible} (${Math.round((score / totalPossible) * 100)}%)

Description:
${result.description}

Recommendations:
${result.advice.map((advice, idx) => `${idx + 1}. ${advice}`).join('\n')}

Important: This is a screening tool only. Please consult with a healthcare professional for proper diagnosis.

Date: ${new Date().toLocaleDateString()}`;

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', `ADHD-Test-Results-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (testComplete) {
    return (
      <ResultsScreen
        score={calculateScore()}
        answers={answers}
        onRestart={handleRestart}
        onDownload={handleDownload}
      />
    );
  }

  const currentQ = ADHD_QUESTIONS[currentQuestion];
  const isAnswered = answers[currentQuestion] !== null;
  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-amber-500 rounded-full p-4 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ADHD Screening Test
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Answer the following questions honestly to help understand your ADHD symptoms. 
            This test takes about 5-10 minutes to complete.
          </p>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQ}
          index={currentQuestion}
          total={ADHD_QUESTIONS.length}
          selectedAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
        />

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ArrowLeft size={20} /> Previous
          </button>

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {currentQuestion + 1} / {ADHD_QUESTIONS.length}
            </div>
            <div className="flex gap-1">
              {answers.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    answers[idx] !== null
                      ? 'bg-indigo-600 dark:bg-indigo-400'
                      : idx === currentQuestion
                      ? 'bg-amber-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isAnswered || isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-300"
          >
            {currentQuestion === ADHD_QUESTIONS.length - 1 ? (
              <>
                Complete <CheckCircle size={20} />
              </>
            ) : (
              <>
                Next <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              This screening tool is for informational purposes only and is not a substitute for professional medical advice. 
              Always consult with a qualified healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
