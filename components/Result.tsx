
import React from 'react';

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  let feedbackMessage = '';
  if (percentage >= 90) {
    feedbackMessage = 'ممتاز! عمل رائع.';
  } else if (percentage >= 75) {
    feedbackMessage = 'جيد جداً! استمر في المذاكرة.';
  } else if (percentage >= 50) {
    feedbackMessage = 'لا بأس. يمكنك تحقيق نتيجة أفضل بالمراجعة.';
  } else {
    feedbackMessage = 'تحتاج إلى المزيد من المراجعة. حاول مرة أخرى!';
  }

  return (
    <div className="text-center flex flex-col items-center gap-6 p-8">
      <h2 className="text-3xl font-bold text-slate-800">اكتمل الاختبار!</h2>
      <p className="text-lg text-slate-600">{feedbackMessage}</p>
      
      <div className="my-4">
        <p className="text-xl">نتيجتك في أسئلة الاختيار من متعدد:</p>
        <p className="text-5xl font-bold text-teal-600 my-2">{score} <span className="text-3xl text-slate-500">/ {totalQuestions}</span></p>
        <p className="text-2xl font-semibold text-slate-700">({percentage}%)</p>
      </div>
      
      <button
        onClick={onRestart}
        className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors duration-300 text-lg shadow-md hover:shadow-lg"
      >
        إعادة الاختبار
      </button>
    </div>
  );
};

export default Result;
