// src/app/screening/page.tsx
"use client";

import React, { useState } from "react";
import { saveScreeningResult } from "@/lib/screening";
import { useAuth } from "../../contexts/AuthContext";

export default function ScreeningPage() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<{ question: string; value: number }[]>([]);

  // Example questions
  const questions = [
    { id: 1, text: "Do you feel focused during work?" },
    { id: 2, text: "Do you feel stressed often?" },
    { id: 3, text: "Do you find it hard to complete tasks?" },
  ];

  const handleAnswerChange = (id: number, value: number) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.question === String(id));
      if (existing) {
        return prev.map(a => (a.question === String(id) ? { question: String(id), value } : a));
      } else {
        return [...prev, { question: String(id), value }];
      }
    });
  };

  const calculateScore = (answers: { question: string; value: number }[]) => {
    return answers.reduce((acc, a) => acc + a.value, 0);
  };

  const interpretScore = (score: number) => {
    if (score < 3) return "Low";
    if (score < 6) return "Medium";
    return "High";
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit.");
      return;
    }

    const score = calculateScore(answers);
    const interpretation = interpretScore(score);

    try {
      await saveScreeningResult(user.id, answers, score, interpretation, "adult");
      alert("Your result has been saved!");
      setAnswers([]); // Reset answers
    } catch (error) {
      console.error(error);
      alert("Error saving your result. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Screening Form</h1>

      {questions.map(q => (
        <div key={q.id} className="mb-4">
          <label className="block mb-1">{q.text}</label>
          <input
            type="number"
            min={0}
            max={3}
            value={answers.find(a => a.question === String(q.id))?.value || ""}
            onChange={e => handleAnswerChange(q.id, Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
}
