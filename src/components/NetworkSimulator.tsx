import React, { useState } from 'react';
import { Play, RotateCcw, ShieldCheck, ShieldAlert, Laptop, Server, Database, ArrowRight } from 'lucide-react';

export const NetworkSimulator: React.FC = () => {
  const [mode, setMode] = useState<'safe' | 'exploitable'>('safe');
  const [step, setStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const resetSim = () => {
    setStep(0);
    setIsPlaying(false);
    setLogs([]);
  };

  const handleNextStep = () => {
    if (step >= 4) {
      resetSim();
      return;
    }

    const nextStep = step + 1;
    setStep(nextStep);

    if (mode === 'safe') {
      if (nextStep === 1) {
        setLogs((prev) => [
          ...prev,
          '[Client]: ผู้เล่นกดปุ่มฟันดาบ -> LocalScript ส่ง :FireServer("SwordSlash") ไม่ส่งจำนวนดาเมจ',
        ]);
      } else if (nextStep === 2) {
        setLogs((prev) => [
          ...prev,
          '[Network]: สัญญาณข้ามอินเทอร์เน็ตไปยัง Roblox Cloud Server อย่างรวดเร็ว',
        ]);
      } else if (nextStep === 3) {
        setLogs((prev) => [
          ...prev,
          '[Server]: Server ตรวจสอบว่าผู้เล่นอยู่ใกล้มอนสเตอร์จริงไหม? ตรวจสอบคูลดาวน์ดาบ -> ผ่าน! หักเลือด 25 HP',
        ]);
      } else if (nextStep === 4) {
        setLogs((prev) => [
          ...prev,
          '[Server -> All Clients]: Server กระจายผลลัพธ์ให้ทุกคนเห็นเอฟเฟกต์ดาบ และสั่งบันทึกแต้มลง DataStore อย่างปลอดภัย! ✅',
        ]);
      }
    } else {
      // Exploitable mode
      if (nextStep === 1) {
        setLogs((prev) => [
          ...prev,
          '[Client]: ผู้เล่น (หรือคนใช้โปร) ส่ง :FireServer(99999999) ส่งตัวเลขดาเมจตรงๆ!',
        ]);
      } else if (nextStep === 2) {
        setLogs((prev) => [
          ...prev,
          '[Network]: แพ็กเก็ตข้อมูลถูกส่งตรงเข้าเซิร์ฟเวอร์โดยไม่มีการกรอง',
        ]);
      } else if (nextStep === 3) {
        setLogs((prev) => [
          ...prev,
          '[Server]: ⚠️ เซิร์ฟเวอร์เชื่อ Client! หักเลือดมอนสเตอร์ 99,999,999 ดาเมจ มอนสเตอร์ตายในนัดเดียว บอสทั้งเกมล่ม!',
        ]);
      } else if (nextStep === 4) {
        setLogs((prev) => [
          ...prev,
          '[Result]: ❌ เกมโดนแฮก เศรษฐกิจในเกมพังทลาย ผู้เล่นธรรมดาเลิกเล่น เพราะคนเขียนโค้ดละเมิดกฎ Never Trust The Client!',
        ]);
      }
    }
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>⚡ แบบจำลองการทำงาน Client & Server (Interactive Visualizer)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            เห็นภาพชัดเจนว่า RemoteEvent เดินทางอย่างไร และทำไมถึงห้ามไว้ใจ Client
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
          <button
            onClick={() => {
              setMode('safe');
              resetSim();
            }}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition ${
              mode === 'safe'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>แบบปลอดภัย (Best Practice)</span>
          </button>
          <button
            onClick={() => {
              setMode('exploitable');
              resetSim();
            }}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition ${
              mode === 'exploitable'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>แบบมีช่องโหว่ (Vulnerable)</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Stage 1: Client */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            step === 1
              ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Laptop className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              1. Client (เครื่องผู้เล่น)
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            {mode === 'safe'
              ? 'LocalScript ตรวจจับการกดปุ่ม ส่งเจตนา "SwordSwing" ไปยัง Server'
              : '⚠️ สคริปต์ส่งดาเมจ 99,999,999 จาก Client ไปตรงๆ'}
          </p>
          <div className="font-mono text-[11px] bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300">
            {mode === 'safe'
              ? 'Remote:FireServer("Attack")'
              : 'Remote:FireServer(99999999)'}
          </div>
        </div>

        {/* Stage 2: Server */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            step === 3
              ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Server className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              2. Roblox Server
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            {mode === 'safe'
              ? 'Script รับคำสั่ง ตรวจสอบระยะห่าง พลังโจมตีจริง แล้วสั่งหักเลือด'
              : '❌ เชื่อใจ Client ทันที สั่งหักเลือดตามตัวเลขที่ส่งมา'}
          </p>
          <div className="font-mono text-[11px] bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300">
            {mode === 'safe'
              ? 'if distance <= 10 then hum:TakeDamage(25) end'
              : 'hum:TakeDamage(clientDamage)'}
          </div>
        </div>

        {/* Stage 3: DataStore / World State */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            step === 4
              ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Database className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              3. World & DataStore
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            {mode === 'safe'
              ? 'ทุกคนในห้องเห็นมอนสเตอร์ล้ม แต้มและเงินถูกเซฟลงคลาวด์'
              : '❌ มอนสเตอร์ตายหมดแมป แฮกเกอร์ปั๊มเวลและเงินจนระบบพัง'}
          </p>
          <div className="font-mono text-[11px] bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300">
            {mode === 'safe'
              ? 'DataStore:UpdateAsync(playerKey, ...)'
              : '-- Data Corrupted / Exploit Detected'}
          </div>
        </div>
      </div>

      {/* Simulator Control Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <div className="text-xs text-slate-400">
          ขั้นตอนปัจจุบัน: <span className="font-bold text-white">{step} / 4</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetSim}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="รีเซ็ตแบบจำลอง"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextStep}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              mode === 'safe'
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
          >
            {step === 0 ? (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>เริ่มจำลองทีละสเต็ป</span>
              </>
            ) : step >= 4 ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>จำลองใหม่อีกครั้ง</span>
              </>
            ) : (
              <>
                <span>ก้าวต่อไป ({step + 1}/4)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Simulation Log Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
          <span>Simulation Output Log</span>
          <span>Roblox Engine Terminal</span>
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          {logs.length === 0 ? (
            <p className="text-slate-500 italic">กดปุ่ม "เริ่มจำลองทีละสเต็ป" ด้านบนเพื่อดูการทำงานสด</p>
          ) : (
            logs.map((log, idx) => (
              <p
                key={idx}
                className={
                  log.includes('❌') || log.includes('⚠️')
                    ? 'text-rose-400'
                    : log.includes('✅')
                    ? 'text-emerald-400'
                    : 'text-slate-300'
                }
              >
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
