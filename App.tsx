
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { QUIZ_QUESTIONS } from './constants';
import { Question, QuestionType } from './types';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSubmit = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    if (currentQuestion.type === QuestionType.MultipleChoice && answer === currentQuestion.answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    setShowResult(false);
  };
  
  const gradedQuestionsCount = QUIZ_QUESTIONS.filter(q => q.type === QuestionType.MultipleChoice).length;

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col items-center justify-center p-4 text-slate-800">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-teal-600">اختبار الجغرافيا</h1>
          <p className="text-lg text-slate-600 mt-2">الوحدة الأولى: الملامح الطبيعية لقارتي آسيا وأوروبا</p>
        </header>
        <main className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {showResult ? (
            <Result 
              score={score} 
              totalQuestions={gradedQuestionsCount} 
              onRestart={handleRestartQuiz} 
            />
          ) : (
            <Quiz
              question={QUIZ_QUESTIONS[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUIZ_QUESTIONS.length}
              userAnswer={userAnswers[currentQuestionIndex]}
              onSubmit={handleAnswerSubmit}
              onNext={handleNextQuestion}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
