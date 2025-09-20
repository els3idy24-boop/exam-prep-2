
import React, { useState, useEffect } from 'react';
import { Question, QuestionType } from '../types';
import ProgressBar from './ProgressBar';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface QuizProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  userAnswer: string | null;
  onSubmit: (answer: string) => void;
  onNext: () => void;
}

const Quiz: React.FC<QuizProps> = ({ question, questionNumber, totalQuestions, userAnswer, onSubmit, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    setSelectedAnswer('');
  }, [question]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer.trim()) {
      onSubmit(selectedAnswer);
    }
  };

  const isAnswered = userAnswer !== null;
  const isMcqCorrect = isAnswered && question.type === QuestionType.MultipleChoice && userAnswer === question.answer;

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar current={questionNumber} total={totalQuestions} />
      
      <div>
        <span className="text-sm font-semibold text-teal-500">{question.category}</span>
        <h2 className="text-2xl font-bold mt-1">{question.question}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {question.type === QuestionType.MultipleChoice && question.options?.map((option, index) => {
            const isSelected = userAnswer === option;
            const isCorrect = question.answer === option;

            let borderColor = 'border-slate-300';
            if (isAnswered && isSelected) {
              borderColor = isCorrect ? 'border-green-500' : 'border-red-500';
            } else if (isAnswered && isCorrect) {
              borderColor = 'border-green-500';
            }
            
            let ringColor = 'focus:ring-teal-500';
            if (isAnswered) {
                if (isSelected && isCorrect) ringColor = 'ring-green-500';
                else if (isSelected && !isCorrect) ringColor = 'ring-red-500';
                else if (!isSelected && isCorrect) ringColor = 'ring-green-500';
            }

            return (
              <label key={index} className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${borderColor} ${isAnswered ? 'bg-slate-50' : 'hover:bg-teal-50'}`}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleAnswerChange}
                  disabled={isAnswered}
                  className={`w-5 h-5 ${ringColor} text-teal-600 border-gray-300 focus:ring-2 disabled:opacity-50`}
                />
                <span className="mr-4 text-lg">{option}</span>
                {isAnswered && isSelected && isCorrect && <CheckIcon className="w-6 h-6 text-green-500 ml-auto" />}
                {isAnswered && isSelected && !isCorrect && <XIcon className="w-6 h-6 text-red-500 ml-auto" />}
                {isAnswered && !isSelected && isCorrect && <CheckIcon className="w-6 h-6 text-green-500 ml-auto" />}
              </label>
            );
          })}

          {(question.type === QuestionType.Map || question.type === QuestionType.Essay) && (
            <textarea
              rows={4}
              value={isAnswered ? userAnswer : selectedAnswer}
              onChange={handleAnswerChange}
              disabled={isAnswered}
              placeholder="اكتب إجابتك هنا..."
              className="w-full p-4 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition disabled:bg-slate-50"
            />
          )}
        </div>

        {!isAnswered ? (
          <button
            type="submit"
            disabled={!selectedAnswer.trim()}
            className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            تأكيد الإجابة
          </button>
        ) : (
          <div className="flex flex-col gap-4">
             {question.type === QuestionType.MultipleChoice && (
                <div className={`p-4 rounded-lg text-center font-semibold ${isMcqCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isMcqCorrect ? 'إجابة صحيحة!' : `إجابة خاطئة. الصحيحة هي: ${question.answer}`}
                </div>
            )}
            {(question.type === QuestionType.Map || question.type === QuestionType.Essay) && (
                 <div className="p-4 rounded-lg bg-blue-100 text-blue-800">
                    <h3 className="font-bold mb-2">الإجابة النموذجية:</h3>
                    <p>{question.answer}</p>
                </div>
            )}
            <button
              type="button"
              onClick={onNext}
              className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition-colors duration-300"
            >
              {questionNumber === totalQuestions ? 'عرض النتيجة' : 'السؤال التالي'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Quiz;
