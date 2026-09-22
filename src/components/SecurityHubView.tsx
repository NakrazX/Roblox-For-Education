import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  ExternalLink, 
  Layers, 
  Check, 
  Copy, 
  Lock, 
  Cpu, 
  Flame, 
  Sparkles,
  ArrowRight,
  UserCheck,
  ChevronRight,
  Zap,
  DollarSign
} from 'lucide-react';
import { SECURITY_VULNERABILITIES, PRODUCTION_ROADMAP_STEPS } from '../data/securityData';
import { SecurityVulnerability, RoadmapStep } from '../types';

export const SecurityHubView: React.FC = () => {
  const [subTab, setSubTab] = useState<'anti_exploit' | 'roadmap' | 'certificate'>('anti_exploit');
  const [selectedVulnId, setSelectedVulnId] = useState<string>(SECURITY_VULNERABILITIES[0].id);
  const [simulatingAttack, setSimulatingAttack] = useState<boolean>(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Roadmap checklist state (saved in localStorage)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('roblox_roadmap_checklist_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Certificate developer name
  const [developerName, setDeveloperName] = useState<string>(() => {
    try {
      return localStorage.getItem('roblox_developer_name') || 'Roblox Creator';
    } catch {
      return 'Roblox Creator';
    }
  });

  const currentVuln = SECURITY_VULNERABILITIES.find(v => v.id === selectedVulnId) || SECURITY_VULNERABILITIES[0];

  const handleToggleCheck = (itemId: string) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [itemId]: !prev[itemId] };
      try {
        localStorage.setItem('roblox_roadmap_checklist_v1', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const totalChecklistItems = PRODUCTION_ROADMAP_STEPS.reduce(
    (sum, step) => sum + step.keyDeliverables.length + step.securityChecklist.length,
    0
  );

  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;
  const readinessPercent = Math.round((completedChecklistCount / (totalChecklistItems || 1)) * 100);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Run attack simulation
  const handleRunSimulation = () => {
    setSimulatingAttack(true);
    setSimLog([]);

    const logs: string[] = [];
    logs.push(`[00:00.01] ⚠️ ตรวจพบแพ็กเก็ตจำลองจาก Client: ${currentVuln.attackName}`);
    logs.push(`[00:00.08] 🛑 Hacker Payload กำลังพยายามส่งคำสั่ง:`);
    logs.push(`       > ${currentVuln.hackerPayloadExample.split('\n')[1] || 'remote:FireServer(...)'}`);
    
    setTimeout(() => {
      setSimLog([...logs, `[00:00.22] 🔍 เซิร์ฟเวอร์เริ่มกระบวนการตรวจสอบความถูกต้อง (Sanity Check)...`]);
    }, 400);

    setTimeout(() => {
      setSimLog(prev => [
        ...prev,
        `[00:00.45] 🛡️ ตรวจสอบ Defense Pattern: "${currentVuln.defensePattern}"`,
        `[00:00.60] 🚫 ผลลัพธ์: การโจมตีถูกสกัดกั้นอย่างสมบูรณ์แบบ! (Attack Neutralized & Logged)`
      ]);
      setSimulatingAttack(false);
    }, 900);
  };

  const handleSaveDevName = (name: string) => {
    setDeveloperName(name);
    try {
      localStorage.setItem('roblox_developer_name', name);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Roblox Game Security & Production Masterclass</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              ศูนย์รักษาความปลอดภัย & พิมพ์เขียวสร้างเกมจริงระดับสตูดิโอ
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              เรียนรู้วิธีป้องกันโปรแกรมโกง (Never Trust The Client), เทคนิค Session Locking กันไอเทมปั๊ม และเช็กลิสต์ความพร้อมก่อนนำเกมขึ้น Production บน Roblox
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-3 shrink-0">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
            <div>
              <div className="text-xs text-slate-400">ความพร้อม Production</div>
              <div className="text-lg font-bold text-white flex items-center gap-1.5">
                <span>{readinessPercent}%</span>
                <span className="text-xs font-normal text-slate-400">({completedChecklistCount}/{totalChecklistItems})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-tabs switcher */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto">
          <button
            id="subtab-anti-exploit"
            onClick={() => setSubTab('anti_exploit')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              subTab === 'anti_exploit'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>ห้องทดลองเจาะช่องโหว่ & ป้องกันแฮกเกอร์ (Anti-Exploit Lab)</span>
          </button>

          <button
            id="subtab-roadmap"
            onClick={() => setSubTab('roadmap')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              subTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>พิมพ์เขียว 6 ขั้นตอนสร้างเกมระดับสตูดิโอ (Roadmap)</span>
          </button>

          <button
            id="subtab-certificate"
            onClick={() => setSubTab('certificate')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              subTab === 'certificate'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>ใบประกาศนียบัตรจบหลักสูตร (Certificate)</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Anti-Exploit Lab */}
      {subTab === 'anti_exploit' && (
        <div className="space-y-6">
          {/* Attack Vector Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SECURITY_VULNERABILITIES.map((vuln) => {
              const isSelected = vuln.id === currentVuln.id;
              return (
                <button
                  key={vuln.id}
                  id={`vuln-btn-${vuln.id}`}
                  onClick={() => {
                    setSelectedVulnId(vuln.id);
                    setSimLog([]);
                  }}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-red-500 shadow-md shadow-red-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      vuln.dangerLevel === 'Critical'
                        ? 'bg-red-500/20 text-red-300'
                        : vuln.dangerLevel === 'High'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {vuln.dangerLevel}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white truncate w-full">
                    {vuln.thaiAttackName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {vuln.category}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Attack Vector Deep Dive */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Header of Vulnerability */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    currentVuln.dangerLevel === 'Critical'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    ระดับอันตราย: {currentVuln.dangerLevel}
                  </span>
                  <span className="text-xs text-slate-400">หมวดหมู่: {currentVuln.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {currentVuln.thaiAttackName} ({currentVuln.attackName})
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  {currentVuln.exploitMechanism}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={currentVuln.officialDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Docs ทางการ</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <button
                  id="btn-simulate-exploit"
                  onClick={handleRunSimulation}
                  disabled={simulatingAttack}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/25 transition disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${simulatingAttack ? 'animate-spin' : ''}`} />
                  <span>{simulatingAttack ? 'กำลังจำลองการโจมตี...' : 'จำลองการโจมตีของ Hacker'}</span>
                </button>
              </div>
            </div>

            {/* Hacker Payload Snippet */}
            <div className="bg-slate-950 rounded-xl p-4 border border-red-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs text-red-400 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>ตัวอย่างสคริปต์ที่แฮกเกอร์รันบน Client (Exploit Script):</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Client-side Memory Injection</span>
              </div>
              <pre className="font-mono text-xs text-red-300/90 overflow-x-auto p-2 bg-black/40 rounded border border-red-500/10">
                <code>{currentVuln.hackerPayloadExample}</code>
              </pre>
            </div>

            {/* Attack Simulation Log Console */}
            {simLog.length > 0 && (
              <div className="bg-black/80 rounded-xl p-4 border border-emerald-500/30 font-mono text-xs space-y-1 text-emerald-300">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800 flex items-center justify-between">
                  <span>Server Defense Console Log:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Protected</span>
                  </span>
                </div>
                {simLog.map((line, idx) => (
                  <div key={idx} className="leading-relaxed">{line}</div>
                ))}
              </div>
            )}

            {/* Side-by-Side: Vulnerable vs Secured Code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 🔴 Left: Vulnerable Code */}
              <div className="bg-slate-950/80 border border-red-500/30 rounded-2xl overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-2.5 bg-red-950/30 border-b border-red-500/20 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>❌ โค้ดที่มีช่องโหว่ (VULNERABLE CODE)</span>
                  </div>
                  <span className="text-[10px] text-red-300/70 font-mono">อย่าเขียนแบบนี้เด็ดขาด</span>
                </div>

                <div className="p-4 flex-1">
                  <pre className="font-mono text-xs text-red-200/90 overflow-x-auto leading-relaxed">
                    <code>{currentVuln.vulnerableCode}</code>
                  </pre>
                </div>

                <div className="p-3 bg-red-950/20 border-t border-red-500/20 text-xs text-red-300 leading-relaxed">
                  ⚠️ <strong>จุดบกพร่อง:</strong> {currentVuln.vulnerableExplanation}
                </div>
              </div>

              {/* 🟢 Right: Secured Code */}
              <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl overflow-hidden flex flex-col shadow-lg shadow-emerald-500/5">
                <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-950/30 border-b border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>🟢 โค้ดป้องกันสมบูรณ์ 100% (SECURED CODE)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(currentVuln.securedCode, currentVuln.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300"
                  >
                    {copiedCode === currentVuln.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === currentVuln.id ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                  </button>
                </div>

                <div className="p-4 flex-1">
                  <pre className="font-mono text-xs text-emerald-200/95 overflow-x-auto leading-relaxed">
                    <code>{currentVuln.securedCode}</code>
                  </pre>
                </div>

                <div className="p-3 bg-emerald-950/20 border-t border-emerald-500/20 text-xs text-emerald-300 leading-relaxed">
                  🛡️ <strong>วิธีป้องกัน:</strong> {currentVuln.securedExplanation}
                </div>
              </div>
            </div>

            {/* Defense Pattern Summary Callout */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3 text-xs text-slate-300">
              <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-indigo-300">หลักการทางสถาปัตยกรรม (Architectural Defense Pattern): </strong>
                <span>{currentVuln.defensePattern}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Production Roadmap */}
      {subTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-xl font-bold text-white">
              พิมพ์เขียว 6 ขั้นตอนสร้างเกม Roblox คุณภาพสูง (Production Architecture Blueprint)
            </h3>
            <p className="text-slate-400 text-xs max-w-3xl leading-relaxed">
              ขั้นตอนการพัฒนาตั้งแต่ศูนย์จนถึงการเปิดให้ผู้เล่นนับหมื่นคนเล่นพร้อมกันอย่างลื่นไหล ไม่มีบั๊กปั๊มของ และไม่โดนแฮกเกอร์ป่วน คุณสามารถทำเครื่องหมายในเช็กลิสต์แต่ละข้อเพื่อวัดความพร้อมของเกมคุณ
            </p>

            {/* Progress indicator */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>ความคืบหน้าการเตรียมระบบโปรดักชัน</span>
                <span className="font-bold text-indigo-400">{readinessPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-rose-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${readinessPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Phase Cards */}
          <div className="space-y-4">
            {PRODUCTION_ROADMAP_STEPS.map((step, idx) => (
              <div
                key={step.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-sm font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">{step.phase}</span>
                      <h4 className="text-base font-bold text-white">{step.thaiTitle}</h4>
                    </div>
                  </div>

                  <a
                    href={step.officialDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition shrink-0 self-start sm:self-auto"
                  >
                    <span>อ่าน Docs ทางการ</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Key Deliverables Checklist */}
                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                      <span>สิ่งที่ต้องสร้าง (Architecture Deliverables):</span>
                    </div>
                    <ul className="space-y-1.5">
                      {step.keyDeliverables.map((deliv, i) => {
                        const itemId = `${step.id}-deliv-${i}`;
                        const isDone = !!checkedItems[itemId];
                        return (
                          <li
                            key={i}
                            onClick={() => handleToggleCheck(itemId)}
                            className="flex items-start gap-2.5 text-xs cursor-pointer group select-none"
                          >
                            <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 transition ${
                              isDone
                                ? 'bg-emerald-500 border-emerald-400 text-white'
                                : 'border-slate-700 bg-slate-800 group-hover:border-slate-500'
                            }`}>
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={isDone ? 'text-slate-400 line-through' : 'text-slate-300'}>
                              {deliv}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Security & QA Checklist */}
                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>เช็กลิสต์ความปลอดภัย & ตรวจสอบข้อผิดพลาด:</span>
                    </div>
                    <ul className="space-y-1.5">
                      {step.securityChecklist.map((sec, i) => {
                        const itemId = `${step.id}-sec-${i}`;
                        const isDone = !!checkedItems[itemId];
                        return (
                          <li
                            key={i}
                            onClick={() => handleToggleCheck(itemId)}
                            className="flex items-start gap-2.5 text-xs cursor-pointer group select-none"
                          >
                            <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 transition ${
                              isDone
                                ? 'bg-emerald-500 border-emerald-400 text-white'
                                : 'border-slate-700 bg-slate-800 group-hover:border-slate-500'
                            }`}>
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={isDone ? 'text-slate-400 line-through' : 'text-slate-300'}>
                              {sec}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Certificate */}
      {subTab === 'certificate' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  ใบรับรองจบหลักสูตรนักพัฒนาเกมมืออาชีพ (Certified Game Architect)
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  เมื่อคุณศึกษาเอกสาร ทำแบบฝึกหัดเขียนสคริปต์ และทำเช็กลิสต์ความปลอดภัยครบถ้วน สามารถพิมพ์ชื่อเพื่อออกใบรับรองได้ทันที
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={developerName}
                  onChange={(e) => handleSaveDevName(e.target.value)}
                  placeholder="ระบุชื่อผู้พัฒนา..."
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Printable Certificate Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 border-2 border-amber-500/40 relative shadow-2xl overflow-hidden text-center space-y-6">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-400/70"></div>
              <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-400/70"></div>
              <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-400/70"></div>
              <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-400/70"></div>

              {/* Watermark Logo */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-2xl">
                R
              </div>

              <div>
                <div className="text-amber-400 uppercase tracking-widest text-xs font-bold">
                  CERTIFICATE OF COMPLETION & EXCELLENCE
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
                  Roblox Certified Game Architect & Security Defender
                </h2>
                <p className="text-slate-400 text-xs mt-2">
                  เอกสารนี้มอบให้เพื่อรับรองว่าผู้พัฒนารายนี้มีความรู้ความสามารถระดับโปรดักชัน
                </p>
              </div>

              <div className="py-2 border-b border-t border-amber-500/20 max-w-md mx-auto">
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 tracking-wide">
                  {developerName || 'Roblox Creator'}
                </div>
              </div>

              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                ได้ผ่านการศึกษาหลักสูตร Roblox Creator Documentation ฉบับเจาะลึก 
                มีความเข้าใจในสถาปัตยกรรม Client-Server, ระบบป้องกันแฮกเกอร์ (Never Trust The Client), 
                เทคนิค Session Locking ป้องกันไอเทมสูญหาย และการสร้างเกมตามมาตรฐานสากล
              </p>

              {/* 4 Badges of Competence */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
                  <div className="text-[11px] font-bold text-white">Anti-Exploit Defender</div>
                  <div className="text-[9px] text-slate-400">Never Trust The Client</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                  <Lock className="w-5 h-5 text-amber-400 mx-auto" />
                  <div className="text-[11px] font-bold text-white">Session Locking</div>
                  <div className="text-[9px] text-slate-400">Anti-Dupe & Autosave</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                  <Cpu className="w-5 h-5 text-indigo-400 mx-auto" />
                  <div className="text-[11px] font-bold text-white">Single-Script Pattern</div>
                  <div className="text-[9px] text-slate-400">Modular Luau Services</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                  <DollarSign className="w-5 h-5 text-blue-400 mx-auto" />
                  <div className="text-[11px] font-bold text-white">Safe Monetization</div>
                  <div className="text-[9px] text-slate-400">ProcessReceipt Safe</div>
                </div>
              </div>

              <div className="pt-4 text-[10px] text-slate-500 flex items-center justify-center gap-6">
                <span>Verification: Verified Educational App</span>
                <span>•</span>
                <span>Reference: create.roblox.com/docs</span>
                <span>•</span>
                <span>Issued: {new Date().toLocaleDateString('th-TH')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
