import React, { useState } from 'react';
import {
  X,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  Gamepad2,
  Layers,
  Send,
  Loader2,
  Edit3
} from 'lucide-react';
import { DocTopic, StudyStatus, UserBookmarkData, ExpandedKnowledgeData } from '../types';
import { CATEGORY_INFO } from '../data/robloxDocsData';

interface TopicDetailModalProps {
  topic: DocTopic | null;
  userData: UserBookmarkData;
  onClose: () => void;
  onToggleBookmark: (topicId: string) => void;
  onUpdateStatus: (topicId: string, status: StudyStatus) => void;
  onUpdateNotes: (topicId: string, notes: string) => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  userData,
  onClose,
  onToggleBookmark,
  onUpdateStatus,
  onUpdateNotes,
}) => {
  if (!topic) return null;

  const [activeTab, setActiveTab] = useState<'study' | 'code' | 'deepdive' | 'notes'>('study');
  const [copiedCode, setCopiedCode] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isExpandingWithAI, setIsExpandingWithAI] = useState(false);
  const [aiExpandedData, setAiExpandedData] = useState<ExpandedKnowledgeData | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const categoryMeta = CATEGORY_INFO[topic.category] || {
    label: topic.category,
    thaiLabel: topic.category,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(topic.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleExpandWithAI = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsExpandingWithAI(true);
    setAiError(null);

    try {
      const res = await fetch('/api/gemini/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: `${topic.title} (${topic.thaiTitle})`,
          docUrl: topic.officialUrl,
          currentSummary: topic.summary,
          question: customQuestion.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate explanation');
      }

      setAiExpandedData(json.data);
      setActiveTab('deepdive');
    } catch (err: any) {
      console.warn('AI Expansion error:', err);
      setAiError(
        err.message || 'ไม่สามารถติดต่อ AI เพื่อขยายความรู้ได้ในขณะนี้ (ใช้งานเนื้อหาเชิงลึกที่มีอยู่แล้วได้ตามปกติ)'
      );
    } finally {
      setIsExpandingWithAI(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/90 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/70 px-2.5 py-0.5 rounded-full border border-indigo-800/40">
                  {categoryMeta.thaiLabel}
                </span>
                <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  {topic.difficulty}
                </span>
                <a
                  href={topic.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-indigo-300 bg-slate-800/80 hover:bg-slate-700 px-2.5 py-0.5 rounded-full border border-slate-700 transition"
                  title="เปิดดูใน create.roblox.com"
                >
                  <span>create.roblox.com/docs</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {topic.thaiTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
                {topic.title}
              </p>
            </div>

            {/* Actions: Bookmark & Close */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onToggleBookmark(topic.id)}
                className={`p-2 rounded-xl border transition ${
                  userData.bookmarked
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title={userData.bookmarked ? 'ยกเลิกบุ๊กมาร์ก' : 'บุ๊กมาร์กหัวข้อนี้'}
              >
                <Bookmark className={`w-5 h-5 ${userData.bookmarked ? 'fill-amber-400' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Status Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>สถานะการศึกษา:</span>
              <div className="inline-flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700">
                <button
                  onClick={() => onUpdateStatus(topic.id, 'not_started')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                    userData.status === 'not_started'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ยังไม่เริ่ม
                </button>
                <button
                  onClick={() => onUpdateStatus(topic.id, 'in_progress')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition ${
                    userData.status === 'in_progress'
                      ? 'bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>กำลังศึกษา</span>
                </button>
                <button
                  onClick={() => onUpdateStatus(topic.id, 'mastered')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition ${
                    userData.status === 'mastered'
                      ? 'bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>เข้าใจแล้ว</span>
                </button>
              </div>
            </div>

            {/* Quick Navigation Tabs inside Modal */}
            <div className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-lg border border-slate-700/60 text-xs">
              <button
                onClick={() => setActiveTab('study')}
                className={`px-2.5 py-1 rounded-md transition ${
                  activeTab === 'study' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                สาระสำคัญ
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-2.5 py-1 rounded-md transition ${
                  activeTab === 'code' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                โค้ด Luau
              </button>
              <button
                onClick={() => setActiveTab('deepdive')}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition ${
                  activeTab === 'deepdive' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>ขยายความรู้ลึกซึ้ง</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition ${
                  activeTab === 'notes' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3 h-3" />
                <span>บันทึกส่วนตัว</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: STUDY (Core summary, why it matters, visual diagram, game example, common pitfalls) */}
          {activeTab === 'study' && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>ใจความสำคัญ (Summary)</span>
                </div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {topic.summary}
                </p>
              </div>

              {/* Why It Matters */}
              <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-amber-300 text-sm font-bold mb-2">
                  <Layers className="w-4 h-4" />
                  <span>ทำไมต้องเข้าใจเรื่องนี้? (Why It Matters)</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {topic.whyItMatters}
                </p>
              </div>

              {/* Key Concepts */}
              <div className="bg-slate-800/30 border border-slate-700/60 rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  หลักการสำคัญที่ต้องจำ
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {topic.keyConcepts.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/60 border border-slate-700/40 p-3 rounded-lg text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Diagram Mental Model */}
              {topic.visualDiagram && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-2">
                    <span>🧠 แผนภาพจำลองโครงสร้างความคิด (Mental Model)</span>
                  </div>
                  <pre className="font-mono text-xs text-emerald-400 bg-slate-900/90 p-3 rounded-lg overflow-x-auto leading-relaxed border border-slate-800">
                    {topic.visualDiagram}
                  </pre>
                </div>
              )}

              {/* Real Game Example */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-300 mb-1">
                    ตัวอย่างการใช้งานจริงในเกมดัง
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {topic.gameExample}
                  </p>
                </div>
              </div>

              {/* Common Pitfalls / Gotchas */}
              <div className="bg-rose-950/20 border border-rose-800/40 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-rose-300 text-sm font-bold mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ข้อผิดพลาดที่มือใหม่ตกม้าตายบ่อยที่สุด (Common Pitfalls)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  {topic.commonMistakes.map((err, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-rose-900/30">
                      <span className="text-rose-400 font-bold">⚠️</span>
                      <span>{err}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: CODE (Luau Code Sample & Breakdown) */}
          {activeTab === 'code' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    ตัวอย่างโค้ด Luau พร้อมใช้งาน
                  </h3>
                  <p className="text-xs text-slate-400">
                    โครงสร้างโค้ดมาตรฐานตามหลักการของ Roblox Studio
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">คัดลอกแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>คัดลอกโค้ด</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Box */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Luau Script</span>
                  <span>Roblox Engine</span>
                </div>
                <pre className="p-4 text-xs sm:text-sm font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                  <code>{topic.codeSnippet}</code>
                </pre>
              </div>

              {/* Step by Step Breakdown */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  อธิบายการทำงานทีละจุด (Code Walkthrough)
                </h4>
                <div className="space-y-2">
                  {topic.codeExplanation.map((expl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{expl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEEP DIVE (ขยายความรู้เพิ่มเติม + AI Tutor) */}
          {activeTab === 'deepdive' && (
            <div className="space-y-6">
              {/* Prebaked Knowledge Expansion */}
              <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-800/40 rounded-xl p-5">
                <div className="flex items-center gap-2 text-indigo-300 text-sm font-bold mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>การเปรียบเทียบให้เห็นภาพชัดเจน (Real-World Analogy)</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed italic bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  "{topic.prebakedDeepDive.analogy}"
                </p>
              </div>

              {/* Under the hood */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>กลไกเบื้องหลังของเอนจิน Roblox (Under The Hood)</span>
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {topic.prebakedDeepDive.underTheHood}
                </p>
              </div>

              {/* Pro Tips */}
              <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-5">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ทริคลับระดับ Pro (Pro Developer Tips)</span>
                </h4>
                <div className="space-y-2">
                  {topic.prebakedDeepDive.proTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-emerald-900/30 flex items-start gap-2"
                    >
                      <span className="text-emerald-400 font-bold">★</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Expanded Section (if generated) */}
              {aiExpandedData && (
                <div className="bg-indigo-950/30 border border-indigo-500/40 rounded-xl p-5 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-md border border-indigo-500/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>ผลการขยายความรู้ด้วย Gemini AI</span>
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-300 mb-1">คำอธิบายเจาะลึกเฉพาะทาง:</h5>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      {aiExpandedData.deepDiveExplanation}
                    </p>
                  </div>

                  {aiExpandedData.gameUseCases && aiExpandedData.gameUseCases.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold text-slate-300 mb-1.5">ตัวอย่างเคสในเกมจริง:</h5>
                      <div className="grid grid-cols-1 gap-1.5">
                        {aiExpandedData.gameUseCases.map((uc, i) => (
                          <div key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800 flex items-center gap-2">
                            <span className="text-indigo-400">▹</span>
                            <span>{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {aiExpandedData.luauCodeSample && (
                    <div>
                      <h5 className="text-xs font-bold text-slate-300 mb-1.5">โค้ด Luau เสริมความรู้:</h5>
                      <pre className="font-mono text-xs text-emerald-300 bg-slate-950 p-3 rounded-lg overflow-x-auto border border-slate-800">
                        {aiExpandedData.luauCodeSample}
                      </pre>
                    </div>
                  )}

                  {aiExpandedData.commonGotchas && aiExpandedData.commonGotchas.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold text-rose-300 mb-1.5">จุดที่ต้องระวังเพิ่มเติม:</h5>
                      <div className="space-y-1">
                        {aiExpandedData.commonGotchas.map((g, i) => (
                          <p key={i} className="text-xs text-rose-200 bg-rose-950/30 p-2 rounded border border-rose-900/40">
                            • {g}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {aiError && (
                <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 p-3 rounded-lg">
                  {aiError}
                </div>
              )}

              {/* Interactive AI Question Box */}
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>ถามคำถามเพื่อขยายความรู้เฉพาะจุด (Roblox AI Explainer)</span>
                </div>
                <form onSubmit={handleExpandWithAI} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={customQuestion}
                      onChange={(e) => setCustomQuestion(e.target.value)}
                      placeholder="เช่น: ถ้าจะเอาเรื่องนี้ไปเขียนระบบกระเป๋าเป้ ต้องวางแผนยังไง?..."
                      className="w-full bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder-slate-500 pl-3 pr-24 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                    <button
                      type="submit"
                      disabled={isExpandingWithAI}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-3 py-1.5 rounded-md flex items-center gap-1 transition"
                    >
                      {isExpandingWithAI ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>กำลังคิด...</span>
                        </>
                      ) : (
                        <>
                          <span>ขยายความ</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    💡 กดปุ่ม "ขยายความ" เพื่อสร้างคำอธิบายเชิงเปรียบเทียบ โค้ดตัวอย่างใหม่ และทริคการเขียนเกมตามบริบท
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: PERSONAL NOTES (บันทึกช่วยจำ) */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <Edit3 className="w-4 h-4 text-sky-400" />
                    <span>บันทึกความเข้าใจส่วนตัว (Personal Study Notes)</span>
                  </div>
                  <span className="text-[11px] text-slate-400">บันทึกอัตโนมัติลงในเครื่อง</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  พิมพ์สรุปความเข้าใจ ทริคที่คุณค้นพบ หรือไอเดียเกมที่คุณอยากนำความรู้นี้ไปประยุกต์ใช้
                </p>
                <textarea
                  value={userData.notes}
                  onChange={(e) => onUpdateNotes(topic.id, e.target.value)}
                  placeholder="เขียนบันทึกช่วยจำของคุณที่นี่ เช่น: 'หัวข้อนี้จำไว้ว่าต้องใช้ pcall เสมอ' หรือ 'จะเอา RemoteEvent ไปทำระบบกดตีดาบในโปรเจกต์ใหม่'..."
                  rows={8}
                  className="w-full bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder-slate-500 p-3 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition leading-relaxed font-mono"
                />
                {userData.lastUpdated && (
                  <p className="text-[10px] text-slate-500 mt-2">
                    อัปเดตล่าสุด: {new Date(userData.lastUpdated).toLocaleString('th-TH')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3 text-xs">
          <a
            href={topic.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-400 inline-flex items-center gap-1.5 transition"
          >
            <span>อ่านเอกสารฉบับเต็มภาษาอังกฤษบน Roblox Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
