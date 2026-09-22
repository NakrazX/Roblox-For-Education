import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  BookOpen, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Check, 
  Copy,
  ChevronRight,
  Flame,
  HelpCircle,
  Trophy
} from 'lucide-react';
import { CODE_CHALLENGES } from '../data/codeChallenges';
import { CodeChallenge } from '../types';
import { evaluateLuauScript, EvaluationResult } from '../utils/codeEvaluator';

export const CodePracticeLab: React.FC = () => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(CODE_CHALLENGES[0].id);
  const [userCode, setUserCode] = useState<string>(CODE_CHALLENGES[0].starterCode);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('roblox_completed_challenges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // AI Mentor evaluation state
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiReview, setAiReview] = useState<{
    isApproved: boolean;
    teacherVerdict: string;
    strengths: string[];
    improvements: string[];
    securityNotice: string;
    proTip: string;
  } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const currentChallenge = CODE_CHALLENGES.find(c => c.id === selectedChallengeId) || CODE_CHALLENGES[0];

  // When changing challenge, load starter code or reset state
  const handleSelectChallenge = (challenge: CodeChallenge) => {
    setSelectedChallengeId(challenge.id);
    setUserCode(challenge.starterCode);
    setEvalResult(null);
    setShowSolution(false);
    setShowHints(false);
    setAiReview(null);
    setAiError(null);
  };

  const handleResetCode = () => {
    setUserCode(currentChallenge.starterCode);
    setEvalResult(null);
    setAiReview(null);
    setAiError(null);
  };

  const handleRunEvaluation = () => {
    const result = evaluateLuauScript(currentChallenge, userCode);
    setEvalResult(result);

    if (result.passed && !completedChallenges.includes(currentChallenge.id)) {
      const updated = [...completedChallenges, currentChallenge.id];
      setCompletedChallenges(updated);
      try {
        localStorage.setItem('roblox_completed_challenges', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAskAiMentor = async () => {
    setIsAiLoading(true);
    setAiError(null);

    // Run basic evaluation first if not already done
    const currentEval = evalResult || evaluateLuauScript(currentChallenge, userCode);
    if (!evalResult) {
      setEvalResult(currentEval);
    }

    try {
      const response = await fetch('/api/gemini/evaluate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeTitle: currentChallenge.title,
          taskObjectives: currentChallenge.taskObjectives,
          userCode,
          clientTestResults: currentEval.testResults
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get review from AI Mentor');
      }

      setAiReview(data.data);
    } catch (err: any) {
      setAiError(err?.message || 'ไม่สามารถเชื่อมต่อกับ AI Mentor ได้ในขณะนี้');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Support Tab key in code editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      // Insert 4 spaces
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      setUserCode(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const lines = userCode.split('\n');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Interactive Luau Coding Lab</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              แบบฝึกหัดเขียนสคริปต์ & ตรวจโค้ดอัตโนมัติ
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              ฝึกเขียนโค้ด Luau ตามสถานการณ์จริงใน Roblox Studio มีระบบตรวจสอบความถูกต้องและข้อผิดพลาดทันที พร้อมคำแนะนำด้านความปลอดภัยจาก AI Mentor
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-3 shrink-0">
            <Trophy className="w-7 h-7 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400">ผ่านแล้ว</div>
              <div className="text-lg font-bold text-white">
                {completedChallenges.length} / {CODE_CHALLENGES.length} ข้อ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {CODE_CHALLENGES.map((ch, idx) => {
          const isSelected = ch.id === currentChallenge.id;
          const isDone = completedChallenges.includes(ch.id);

          return (
            <button
              key={ch.id}
              id={`challenge-tab-${ch.id}`}
              onClick={() => handleSelectChallenge(ch)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${
                isSelected
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/20'
                  : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : isDone
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {isDone ? <Check className="w-3 h-3" /> : idx + 1}
              </span>
              <span>{ch.title}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                ch.difficulty === 'Beginner'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : ch.difficulty === 'Intermediate'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}>
                {ch.difficulty}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Challenge Mission & Description */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">ภารกิจที่ {CODE_CHALLENGES.findIndex(c => c.id === currentChallenge.id) + 1}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{currentChallenge.thaiTitle}</h3>
              </div>
              <a
                href={currentChallenge.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                <span>Docs ทางการ</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {currentChallenge.description}
            </p>

            {/* Checklist Objectives */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">สิ่งที่ต้องทำ (Objectives):</h4>
              <ul className="space-y-2">
                {currentChallenge.taskObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hints & Solutions buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <button
                id="btn-toggle-hints"
                onClick={() => setShowHints(!showHints)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  showHints
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>{showHints ? 'ซ่อนคำใบ้' : 'ดูคำใบ้ (Hints)'}</span>
              </button>

              <button
                id="btn-toggle-solution"
                onClick={() => setShowSolution(!showSolution)}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                  showSolution
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{showSolution ? 'ซ่อนเฉลย' : 'ดูเฉลยตัวอย่าง'}</span>
              </button>
            </div>

            {/* Hints Accordion */}
            {showHints && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2 text-amber-200">
                <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                  <Lightbulb className="w-4 h-4" />
                  <span>แนวทางในการเขียน:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  {currentChallenge.hints.map((hint, idx) => (
                    <li key={idx} className="leading-relaxed">{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Solution Accordion */}
            {showSolution && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>โค้ดเฉลยมาตรฐาน (Solution)</span>
                  </div>
                  <button
                    onClick={() => setUserCode(currentChallenge.solutionCode)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 underline font-medium"
                  >
                    คัดลอกลง Editor
                  </button>
                </div>
                <pre className="p-3 bg-slate-950/80 rounded-lg text-emerald-300 font-mono text-xs overflow-x-auto border border-emerald-500/20">
                  <code>{currentChallenge.solutionCode}</code>
                </pre>
                <p className="text-xs text-slate-300 leading-relaxed">
                  💡 <strong>คำอธิบาย:</strong> {currentChallenge.solutionExplanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Luau Script Editor & Test Runner */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="font-mono text-slate-300 ml-2 font-medium">script.luau</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-copy-code"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title="คัดลอกโค้ด"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                </button>

                <button
                  id="btn-reset-code"
                  onClick={handleResetCode}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title="รีเซ็ตโค้ดเริ่มต้น"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>รีเซ็ต</span>
                </button>
              </div>
            </div>

            {/* Code Textarea with line numbers */}
            <div className="relative flex bg-slate-950 font-mono text-xs text-slate-200 min-h-[300px]">
              {/* Line numbers column */}
              <div className="select-none py-3 px-3 text-right bg-slate-950/90 text-slate-600 border-r border-slate-800/80 shrink-0 font-mono text-xs">
                {lines.map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                id="luau-code-editor"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                rows={Math.max(12, lines.length)}
                className="w-full bg-transparent p-3 text-slate-100 font-mono text-xs leading-6 resize-y focus:outline-none focus:ring-0 selection:bg-red-500/30 whitespace-pre overflow-x-auto"
                placeholder="-- เขียนสคริปต์ Luau ที่นี่..."
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-950/90 border-t border-slate-800">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>กด Tab เพื่อเว้นวรรค 4 ช่อง</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  id="btn-ask-ai-mentor"
                  onClick={handleAskAiMentor}
                  disabled={isAiLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-indigo-400 ${isAiLoading ? 'animate-spin' : ''}`} />
                  <span>{isAiLoading ? 'กำลังปรึกษา AI Mentor...' : 'ขอคำแนะนำ AI Mentor'}</span>
                </button>

                <button
                  id="btn-evaluate-code"
                  onClick={handleRunEvaluation}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/25 transition-all transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>ตรวจสคริปต์ (Evaluate)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Test Results Card */}
          {evalResult && (
            <div className={`p-5 rounded-2xl border transition-all ${
              evalResult.passed
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  {evalResult.passed ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {evalResult.passed ? 'ผ่านการทดสอบสมบูรณ์!' : 'ผลการตรวจสอบสคริปต์'}
                    </h4>
                    <p className="text-xs text-slate-400">{evalResult.feedbackSummary}</p>
                  </div>
                </div>

                <div className={`text-base font-extrabold px-3 py-1 rounded-lg ${
                  evalResult.passed
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  คะแนน {evalResult.score}%
                </div>
              </div>

              {/* Syntax errors if any */}
              {evalResult.syntaxErrors.length > 0 && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
                  <div className="text-xs font-semibold text-red-400 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>ข้อผิดพลาดเชิงโครงสร้าง (Syntax Issues):</span>
                  </div>
                  {evalResult.syntaxErrors.map((err, i) => (
                    <p key={i} className="text-xs text-red-300 font-mono pl-5">• {err}</p>
                  ))}
                </div>
              )}

              {/* Test Criteria list */}
              <div className="mt-4 space-y-2.5">
                {evalResult.testResults.map((t) => (
                  <div 
                    key={t.id}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                      t.passed
                        ? 'bg-slate-900/60 border-emerald-500/20 text-slate-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {t.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className={t.passed ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                          {t.label}
                        </div>
                        {t.failureTip && (
                          <div className="text-amber-400/90 text-[11px] mt-1">
                            💡 {t.failureTip}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      t.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {t.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Review Card */}
          {aiReview && (
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>ความเห็นจาก AI Roblox Mentor</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  aiReview.isApproved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {aiReview.isApproved ? 'Approved by Mentor' : 'Needs Practice'}
                </span>
              </div>

              <div className="text-xs text-indigo-200 font-medium leading-relaxed bg-indigo-900/30 p-3 rounded-xl border border-indigo-500/20">
                💬 {aiReview.teacherVerdict}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Strengths */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>จุดเด่นในโค้ดของคุณ:</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 pl-4 list-disc">
                    {aiReview.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>ข้อควรระวัง / พัฒนาต่อ:</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 pl-4 list-disc">
                    {aiReview.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security & Pro Tip */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-start gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-300">ความปลอดภัยของระบบ: </strong>
                    {aiReview.securityNotice}
                  </div>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-start gap-2 text-slate-300">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Pro Tip จากนักพัฒนา: </strong>
                    {aiReview.proTip}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Error Notification */}
          {aiError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{aiError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
