import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { ROBLOX_QUIZ_QUESTIONS } from '../data/robloxDocsData';

export const QuizView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = ROBLOX_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < ROBLOX_QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = Math.round((score / ROBLOX_QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto space-y-5">
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto text-2xl font-bold">
          <Sparkles className="w-8 h-8 text-amber-300" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">ทดสอบความรู้เสร็จสิ้น!</h3>
          <p className="text-xs text-slate-400 mt-1">
            คุณได้คะแนน {score} จากทั้งหมด {ROBLOX_QUIZ_QUESTIONS.length} ข้อ ({percentage}%)
          </p>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200">
          {percentage === 100 ? (
            <p className="text-emerald-400 font-semibold">
              🎉 ยอดเยี่ยมมาก! คุณมีความเข้าใจหลักการ Roblox Creator Docs ในระดับมืออาชีพ
            </p>
          ) : percentage >= 60 ? (
            <p className="text-indigo-300">
              👍 ทำได้ดีมาก! มีความเข้าใจพื้นฐานที่แน่นหนา สามารถเปิดอ่านหัวข้อที่บุ๊กมาร์กไว้เพื่อทบทวนจุดที่ตอบผิดได้
            </p>
          ) : (
            <p className="text-amber-300">
              💡 ลองกลับไปศึกษาคำอธิบายเพิ่มเติมและโค้ดตัวอย่างในแต่ละหัวข้อเพื่อเพิ่มความแม่นยำนะครับ
            </p>
          )}
        </div>

        <button
          onClick={handleRestartQuiz}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
        <span>
          คำถามข้อที่ <strong className="text-white">{currentIdx + 1}</strong> จาก {ROBLOX_QUIZ_QUESTIONS.length}
        </span>
        <span className="bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 text-slate-300 font-mono">
          คะแนนปัจจุบัน: {score}
        </span>
      </div>

      {/* Question Text */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, idx) => {
          let btnStyle = 'bg-slate-900/60 border-slate-700/70 hover:border-slate-500 text-slate-200';

          if (isAnswerSubmitted) {
            if (idx === currentQ.correctIndex) {
              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
            } else if (idx === selectedAnswer) {
              btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
            } else {
              btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
            }
          } else if (selectedAnswer === idx) {
            btnStyle = 'bg-indigo-950/70 border-indigo-500 text-indigo-200 font-medium shadow-sm';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition ${btnStyle}`}
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-mono">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-relaxed flex-1">{option}</span>
              {isAnswerSubmitted && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswerSubmitted && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner after submitting */}
      {isAnswerSubmitted && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-1.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-bold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>คำอธิบายเพิ่มเติม (Explanation):</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-end pt-2">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white transition"
          >
            ส่งคำตอบ
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition"
          >
            <span>{currentIdx + 1 === ROBLOX_QUIZ_QUESTIONS.length ? 'ดูผลการทดสอบ' : 'ข้อถัดไป'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
