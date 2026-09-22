import React, { useState } from 'react';
import { Bookmark, CheckCircle2, Clock, BookOpen, Copy, Check, Trash2, ArrowRight } from 'lucide-react';
import { DocTopic, StudyStatus, UserBookmarkData } from '../types';
import { TopicCard } from './TopicCard';

interface BookmarksViewProps {
  topics: DocTopic[];
  userDataMap: Record<string, UserBookmarkData>;
  onToggleBookmark: (topicId: string) => void;
  onOpenDetail: (topic: DocTopic) => void;
  onClearAllBookmarks: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  topics,
  userDataMap,
  onToggleBookmark,
  onOpenDetail,
  onClearAllBookmarks,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | StudyStatus>('all');
  const [copiedAllNotes, setCopiedAllNotes] = useState(false);

  // Filter topics that are either marked or have notes or have status set
  const bookmarkedTopics = topics.filter((t) => {
    const data = userDataMap[t.id];
    return data && (data.bookmarked || (data.notes && data.notes.trim().length > 0));
  });

  const filteredTopics = bookmarkedTopics.filter((t) => {
    if (statusFilter === 'all') return true;
    const data = userDataMap[t.id];
    return data && data.status === statusFilter;
  });

  // Calculate learning progress
  const totalBookmarked = bookmarkedTopics.length;
  const masteredCount = bookmarkedTopics.filter((t) => userDataMap[t.id]?.status === 'mastered').length;
  const inProgressCount = bookmarkedTopics.filter((t) => userDataMap[t.id]?.status === 'in_progress').length;
  const progressPercent = totalBookmarked > 0 ? Math.round((masteredCount / totalBookmarked) * 100) : 0;

  const handleCopyAllNotes = () => {
    const notesSummary = bookmarkedTopics
      .filter((t) => userDataMap[t.id]?.notes?.trim())
      .map((t) => {
        return `### ${t.thaiTitle} (${t.title})\nDocs: ${t.officialUrl}\nสถานะ: ${
          userDataMap[t.id]?.status === 'mastered'
            ? 'เข้าใจแล้ว'
            : userDataMap[t.id]?.status === 'in_progress'
            ? 'กำลังศึกษา'
            : 'ยังไม่เริ่ม'
        }\nบันทึก: \n${userDataMap[t.id]?.notes}\n-------------------------`;
      })
      .join('\n\n');

    if (!notesSummary) return;

    navigator.clipboard.writeText(notesSummary);
    setCopiedAllNotes(true);
    setTimeout(() => setCopiedAllNotes(false), 2000);
  };

  if (bookmarkedTopics.length === 0) {
    return (
      <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <Bookmark className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">ยังไม่มีหัวข้อที่บุ๊กมาร์ก</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            กดที่ไอคอนรูปบุ๊กมาร์ก (🔖) บนการ์ดเอกสารในหน้า "คลังความรู้ Docs" เพื่อเก็บหัวข้อที่คุณสนใจหรือต้องการจดบันทึกไว้ทบทวน
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview & Progress Summary Card */}
      <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>หัวข้อที่บุ๊กมาร์ก & บันทึกการศึกษา ({totalBookmarked})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              ติดตามความคืบหน้า ทบทวนบันทึกช่วยจำ และเปิดอ่านเอกสารทางการ
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllNotes}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              title="คัดลอกสรุปโน้ตทั้งหมดเพื่อนำไปอ่านต่อ"
            >
              {copiedAllNotes ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">คัดลอกโน้ตแล้ว!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>คัดลอกบันทึกทั้งหมด</span>
                </>
              )}
            </button>

            <button
              onClick={onClearAllBookmarks}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
              title="ล้างบุ๊กมาร์กทั้งหมด"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Learning Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span>ความเข้าใจในหัวข้อที่บุ๊กมาร์ก:</span>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
            <div
              className="bg-emerald-500 transition-all duration-300"
              style={{ width: `${(masteredCount / totalBookmarked) * 100}%` }}
              title={`เข้าใจแล้ว ${masteredCount} หัวข้อ`}
            />
            <div
              className="bg-amber-500 transition-all duration-300"
              style={{ width: `${(inProgressCount / totalBookmarked) * 100}%` }}
              title={`กำลังศึกษา ${inProgressCount} หัวข้อ`}
            />
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>เข้าใจแล้ว ({masteredCount})</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>กำลังศึกษา ({inProgressCount})</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              <span>ยังไม่เริ่ม ({totalBookmarked - masteredCount - inProgressCount})</span>
            </span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 text-xs mr-1">กรองสถานะ:</span>
          {(['all', 'in_progress', 'mastered', 'not_started'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md transition ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
              }`}
            >
              {st === 'all'
                ? 'ทั้งหมด'
                : st === 'in_progress'
                ? 'กำลังศึกษา'
                : st === 'mastered'
                ? 'เข้าใจแล้ว'
                : 'ยังไม่เริ่ม'}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => {
          const userD = userDataMap[topic.id] || {
            bookmarked: false,
            status: 'not_started',
            notes: '',
            lastUpdated: '',
          };
          return (
            <div key={topic.id} className="flex flex-col gap-2">
              <TopicCard
                topic={topic}
                isBookmarked={userD.bookmarked}
                status={userD.status}
                hasNotes={Boolean(userD.notes && userD.notes.trim())}
                onToggleBookmark={onToggleBookmark}
                onOpenDetail={onOpenDetail}
              />
              {/* Note Preview if available */}
              {userD.notes && userD.notes.trim() && (
                <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 font-mono line-clamp-2">
                  <span className="text-sky-400 font-bold mr-1">📝 โน้ต:</span>
                  {userD.notes}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
