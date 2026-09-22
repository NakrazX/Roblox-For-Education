import React from 'react';
import { Bookmark, ExternalLink, ArrowRight, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { DocTopic, StudyStatus } from '../types';
import { CATEGORY_INFO } from '../data/robloxDocsData';

interface TopicCardProps {
  topic: DocTopic;
  isBookmarked: boolean;
  status: StudyStatus;
  hasNotes: boolean;
  onToggleBookmark: (topicId: string) => void;
  onOpenDetail: (topic: DocTopic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isBookmarked,
  status,
  hasNotes,
  onToggleBookmark,
  onOpenDetail,
}) => {
  const categoryMeta = CATEGORY_INFO[topic.category] || {
    label: topic.category,
    thaiLabel: topic.category,
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Advanced':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getStatusBadge = () => {
    if (status === 'mastered') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
          <CheckCircle2 className="w-3 h-3" />
          <span>เข้าใจแล้ว</span>
        </span>
      );
    }
    if (status === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/60">
          <Clock className="w-3 h-3" />
          <span>กำลังศึกษา</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/60">
        <span>ยังไม่เริ่ม</span>
      </span>
    );
  };

  return (
    <div className="group bg-slate-800/60 hover:bg-slate-800/90 rounded-xl border border-slate-700/70 hover:border-slate-600 p-5 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md hover:shadow-black/20">
      <div>
        {/* Top Meta: Category + Difficulty + Bookmark button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-md border border-indigo-800/40">
              {categoryMeta.thaiLabel}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyBadge(
                topic.difficulty
              )}`}
            >
              {topic.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleBookmark(topic.id)}
              className={`p-1.5 rounded-lg border transition ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-700/40 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-700'
              }`}
              title={isBookmarked ? 'ยกเลิกการบุ๊กมาร์ก' : 'บุ๊กมาร์กหัวข้อนี้'}
              aria-label="Bookmark toggle"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Titles */}
        <div className="mb-2.5">
          <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
            {topic.thaiTitle}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {topic.title}
          </p>
        </div>

        {/* Readability Summary */}
        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
          {topic.summary}
        </p>

        {/* Key Concepts Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {topic.keyConcepts.slice(0, 2).map((concept, idx) => (
            <span
              key={idx}
              className="text-[11px] text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/50 line-clamp-1"
            >
              • {concept}
            </span>
          ))}
          {topic.keyConcepts.length > 2 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{topic.keyConcepts.length - 2} อื่นๆ
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-1.5">
          {getStatusBadge()}
          {hasNotes && (
            <span className="text-[10px] bg-sky-950 text-sky-300 border border-sky-800/50 px-1.5 py-0.5 rounded" title="มีบันทึกช่วยจำส่วนตัว">
              มีโน้ต
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={topic.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-slate-400 hover:text-indigo-300 rounded hover:bg-slate-700/50 transition"
            title="เปิดเอกสารทางการ create.roblox.com"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onOpenDetail(topic)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-white bg-indigo-600/20 hover:bg-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-500/30 transition duration-150"
          >
            <span>อ่าน & ขยายความ</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
