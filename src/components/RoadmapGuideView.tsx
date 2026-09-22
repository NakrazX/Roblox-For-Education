import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  ExternalLink, 
  Award, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Gamepad2, 
  Database, 
  Smartphone, 
  Coins, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  FileCode, 
  PlusCircle, 
  Lightbulb,
  Check
} from 'lucide-react';
import { LEARNING_ROADMAP_STAGES, CAPSTONE_GRADUATION_OUTCOMES } from '../data/learningRoadmapData';
import { LearningRoadmapStage } from '../types';

interface RoadmapGuideViewProps {
  onSelectTopic?: (topicId: string) => void;
  onGoToCodeLab?: (challengeId?: string) => void;
  onGoToSecurityHub?: () => void;
}

const STORAGE_PROGRESS_KEY = 'roblox_roadmap_stage_progress_v1';

export const RoadmapGuideView: React.FC<RoadmapGuideViewProps> = ({
  onSelectTopic,
  onGoToCodeLab,
  onGoToSecurityHub,
}) => {
  // Track which stages are marked as completed by user
  const [completedStages, setCompletedStages] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROGRESS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track expanded stages (default first 2 expanded)
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'stage-1-fundamentals': true,
    'stage-2-networking-security': true,
  });

  // Developer info modal toggle
  const [showExtensionHelp, setShowExtensionHelp] = useState(false);

  const toggleStageExpand = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const toggleStageComplete = (stageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedStages(prev => {
      const updated = { ...prev, [stageId]: !prev[stageId] };
      try {
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const totalStages = LEARNING_ROADMAP_STAGES.length;
  const finishedStagesCount = Object.values(completedStages).filter(Boolean).length;
  const progressPercent = Math.round((finishedStagesCount / totalStages) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Roblox Developer Learning Pathway & Curriculum</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ลำดับขั้นตอนการเรียนรู้: ควรเรียนอะไรก่อน-หลัง และจบแล้วจะได้อะไร?
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            คู่มือวางแผนการเรียนรู้ทีละขั้นตอน (Step-by-Step Roadmap) ออกแบบตามลำดับความจำเป็นของเอนจินจริง
            ตั้งแต่พื้นฐานภาษา Luau, สถาปัตยกรรม Client-Server, ระบบตรวจจับ Raycasting, การทำความสะอาดโค้ด,
            ไปจนถึงระบบเซฟป้องกันของปั๊ม และการปล่อยเกมทำเงิน Robux สู่สาธารณะ
          </p>

          {/* Progress Tracking Widget */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">ความก้าวหน้าตามหลักสูตรของคุณ:</span>
                <span className="text-xs font-mono font-bold text-indigo-400">
                  {finishedStagesCount} จาก {totalStages} ก้าว ({progressPercent}%)
                </span>
              </div>
              <div className="w-full sm:w-80 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExtensionHelp(!showExtensionHelp)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>วิธีเพิ่มข้อมูลในโค้ด</span>
              </button>

              {onGoToSecurityHub && (
                <button
                  onClick={onGoToSecurityHub}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/25 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ระบบความปลอดภัย</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Extension Guide Drawer */}
      {showExtensionHelp && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <FileCode className="w-4 h-4" />
              <span>คำแนะนำในการนำข้อมูลมาใส่เพิ่ม (Extensible Data Architecture)</span>
            </div>
            <button
              onClick={() => setShowExtensionHelp(false)}
              className="text-slate-400 hover:text-slate-200 text-xs"
            >
              ปิดคำแนะนำ
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            คุณสามารถเพิ่มเนื้อหา หัวข้อเอกสาร หรือโจทย์แบบฝึกหัดใหม่ๆ ได้อย่างอิสระ โค้ดถูกจัดเป็นระบบโมดูลไว้เรียบร้อยแล้ว:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-indigo-300">1. เพิ่มขั้นตอน/หัวข้อใน Roadmap:</div>
              <div className="text-slate-400 text-[11px]">
                เปิดไฟล์ <code className="text-indigo-400 bg-slate-900 px-1 py-0.5 rounded">src/data/learningRoadmapData.ts</code>
                แล้วเพิ่ม Object เข้าไปใน <code className="text-slate-300">LEARNING_ROADMAP_STAGES</code> หรือเพิ่มใน <code className="text-slate-300">keyTopicsToStudy</code> ได้ทันที
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-rose-300">2. เพิ่มโจทย์ฝึกเขียนโค้ดใน Code Lab:</div>
              <div className="text-slate-400 text-[11px]">
                เปิดไฟล์ <code className="text-rose-400 bg-slate-900 px-1 py-0.5 rounded">src/data/codeChallengesData.ts</code>
                แล้วเพิ่มโจทย์ใหม่พร้อมโค้ดเฉลยและเกณฑ์การตรวจ จากนั้นนำ ID มาผูกใน Roadmap ได้เลย
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sequential Stages Accordion List */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>เส้นทางการเรียนรู้ทีละขั้นตอน (6 Stages)</span>
            <span className="text-xs font-normal text-slate-400">คลิกที่หัวข้อเพื่อเปิด/ปิดเนื้อหา</span>
          </h3>
          <span className="text-xs text-slate-400">เรียงลำดับจากง่ายไปยากตามมาตรฐานสากล</span>
        </div>

        {LEARNING_ROADMAP_STAGES.map((stage) => {
          const isExpanded = !!expandedStages[stage.id];
          const isDone = !!completedStages[stage.id];

          return (
            <div
              key={stage.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isDone 
                  ? 'bg-slate-900/60 border-emerald-500/40 shadow-sm shadow-emerald-500/5' 
                  : isExpanded 
                  ? 'bg-slate-900 border-indigo-500/40 shadow-xl' 
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Stage Header Summary Bar */}
              <div
                onClick={() => toggleStageExpand(stage.id)}
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-800/30 transition"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  {/* Step Number Circle */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border transition ${
                    isDone 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                      : 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
                  }`}>
                    {isDone ? <Check className="w-5 h-5 stroke-[2.5]" /> : stage.stepNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-indigo-400">{stage.badgeTitle}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{stage.estimatedHours}</span>
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>ผ่านแล้ว</span>
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {stage.thaiStageName}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center shrink-0">
                  {/* Mark as completed toggle */}
                  <button
                    onClick={(e) => toggleStageComplete(stage.id, e)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white hover:bg-slate-700'
                    }`}
                    title={isDone ? 'คลิกเพื่อยกเลิกสถานะผ่าน' : 'คลิกเมื่อศึกษาและเข้าใจเนื้อหานี้แล้ว'}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                    <span>{isDone ? 'เรียนจบขั้นนี้แล้ว' : 'ทำเครื่องหมายว่าจบ'}</span>
                  </button>

                  <div className="text-slate-400 p-1 rounded-lg hover:bg-slate-800">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Expanded Body */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                  {/* Summary & Why Learn First */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        สรุปใจความสำคัญของก้าวนี้:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {stage.shortSummary}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        <span>ทำไมต้องเรียนขั้นตอนนี้ก่อน (Why Learn This First):</span>
                      </span>
                      <p className="text-xs text-amber-200/90 leading-relaxed">
                        {stage.whyLearnFirst}
                      </p>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">สิ่งที่ควรมีก่อนเริ่ม:</span>
                    {stage.prerequisites.map((req, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {req}
                      </span>
                    ))}
                  </div>

                  {/* Section A: Key Topics to Study */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>1. หัวข้อทฤษฎี & คำสั่งที่ต้องศึกษา:</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {stage.keyTopicsToStudy.map((topic, i) => (
                        <div
                          key={i}
                          className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between space-y-2 hover:border-slate-700 transition"
                        >
                          <div>
                            <h5 className="text-xs font-bold text-white line-clamp-1">{topic.title}</h5>
                            <p className="text-[11px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                            {topic.topicId && onSelectTopic && (
                              <button
                                onClick={() => onSelectTopic(topic.topicId!)}
                                className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
                              >
                                <span>สรุปในแอพ</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}

                            <a
                              href={topic.docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 ml-auto"
                            >
                              <span>Official Docs</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section B: Hands-on Practice */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>2. แบบฝึกหัด & ลงมือเขียนสคริปต์จริง (Hands-on Practice):</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {stage.handsOnPractices.map((practice, i) => (
                        <div
                          key={i}
                          className="bg-slate-950/90 border border-rose-500/20 rounded-xl p-3.5 flex flex-col justify-between space-y-2"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-white">{practice.title}</h5>
                              {practice.challengeId && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                                  มีโจทย์ใน Code Lab
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                              {practice.description}
                            </p>
                            {practice.expectedCodeSnippet && (
                              <code className="block mt-2 font-mono text-[10px] text-rose-300/90 bg-black/40 px-2 py-1 rounded border border-rose-500/10 truncate">
                                {practice.expectedCodeSnippet}
                              </code>
                            )}
                          </div>

                          {practice.challengeId && onGoToCodeLab && (
                            <button
                              onClick={() => onGoToCodeLab(practice.challengeId)}
                              className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm shadow-rose-600/30 transition w-full"
                            >
                              <Code2 className="w-3.5 h-3.5" />
                              <span>ไปที่ห้องซ้อมเขียนโค้ด (Code Lab)</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section C: What You Will Achieve & Pro Tips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>เรียนจบขั้นนี้แล้วคุณจะทำอะไรได้:</span>
                      </span>
                      <ul className="space-y-1.5">
                        {stage.whatYouWillAchieve.map((achieve, i) => (
                          <li key={i} className="text-xs text-emerald-200/90 flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{achieve}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Pro Tips คำแนะนำจากสตูดิโอ:</span>
                      </span>
                      <ul className="space-y-1.5">
                        {stage.proTipsForSuccess.map((tip, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Teaser to Next Stage */}
                  <div className="p-3 bg-gradient-to-r from-slate-900 to-indigo-950/40 rounded-xl border border-indigo-500/20 text-xs text-slate-300 flex items-center justify-between">
                    <span className="text-indigo-300 font-semibold">{stage.nextStageTeaser}</span>
                    <button
                      onClick={() => {
                        const nextIndex = stage.stepNumber; // 1-based, so stage.stepNumber is next stage index
                        if (nextIndex < LEARNING_ROADMAP_STAGES.length) {
                          const nextStage = LEARNING_ROADMAP_STAGES[nextIndex];
                          setExpandedStages(prev => ({ ...prev, [nextStage.id]: true }));
                        }
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0 font-bold"
                    >
                      <span>ดูก้าวถัดไป</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* FINAL CAPSTONE: เรียนจบทั้งหมดแล้วสุดท้ายจะได้อะไร? (Graduation Outcomes) */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>THE FINAL CAPSTONE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            เมื่อเรียนจบครบทุกก้าว สุดท้ายคุณจะสร้างอะไรได้บ้าง?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            ผลลัพธ์ที่เป็นรูปธรรมหลังจากผ่านหลักสูตรนี้ คุณจะไม่ใช่แค่มือสมัครเล่นที่ก็อปโค้ดมาแปะ 
            แต่จะกลายเป็นนักพัฒนาเกมระดับมืออาชีพที่พร้อมทำงานกับสตูดิโอหรือปล่อยเกมของตนเอง
          </p>
        </div>

        {/* 6 Core Outcomes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPSTONE_GRADUATION_OUTCOMES.map((outcome, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-indigo-500/50 transition group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition">
                {idx === 0 && <Gamepad2 className="w-5 h-5 text-indigo-400" />}
                {idx === 1 && <ShieldCheck className="w-5 h-5 text-red-400" />}
                {idx === 2 && <Database className="w-5 h-5 text-emerald-400" />}
                {idx === 3 && <Smartphone className="w-5 h-5 text-purple-400" />}
                {idx === 4 && <Coins className="w-5 h-5 text-amber-400" />}
                {idx === 5 && <Award className="w-5 h-5 text-yellow-400" />}
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                {outcome.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {outcome.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            💡 พร้อมเริ่มต้นก้าวแรกหรือยัง? เริ่มต้นศึกษาจากก้าวที่ 1 หรือทดลองเขียนสคริปต์ได้ทันที
          </div>

          <div className="flex items-center gap-3">
            {onGoToCodeLab && (
              <button
                onClick={() => onGoToCodeLab('challenge-1-kill-brick')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/25 transition"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>เริ่มทำโจทย์ก้าวที่ 1 ใน Code Lab</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
