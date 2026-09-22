import React, { useState, useEffect, useMemo } from 'react';
import { DocTopic, Category, Difficulty, StudyStatus, UserBookmarkData } from './types';
import { ROBLOX_DOCS_TOPICS, CATEGORY_INFO } from './data/robloxDocsData';
import { Header } from './components/Header';
import { TopicCard } from './components/TopicCard';
import { TopicDetailModal } from './components/TopicDetailModal';
import { NetworkSimulator } from './components/NetworkSimulator';
import { QuizView } from './components/QuizView';
import { BookmarksView } from './components/BookmarksView';
import { CodePracticeLab } from './components/CodePracticeLab';
import { SecurityHubView } from './components/SecurityHubView';
import { RoadmapGuideView } from './components/RoadmapGuideView';
import { BookOpen, Sparkles, Filter, ExternalLink, Code2, CheckCircle2, Bookmark } from 'lucide-react';

const STORAGE_KEY = 'roblox_docs_userdata_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'catalog' | 'bookmarks' | 'code_lab' | 'security_hub' | 'simulator' | 'quiz'>('roadmap');
  const [selectedCategory, setSelectedCategory] = useState<'all' | Category>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | Difficulty>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<DocTopic | null>(null);

  // User state (bookmarks, mastery status, personal notes)
  const [userDataMap, setUserDataMap] = useState<Record<string, UserBookmarkData>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load user bookmarks from storage', e);
    }
    // Default starter bookmarks for optimal onboarding
    return {
      'script-types-hierarchy': {
        bookmarked: true,
        status: 'mastered',
        notes: 'Script รันบน Server, LocalScript รันบน Client และ ModuleScript ใช้ require()',
        lastUpdated: new Date().toISOString(),
      },
      'remote-events-networking': {
        bookmarked: true,
        status: 'in_progress',
        notes: 'กฎเหล็ก: Never Trust The Client! อย่าส่งดาเมจตรงๆ ให้ส่งเจตนาแล้ว Server เช็กเอง',
        lastUpdated: new Date().toISOString(),
      },
      'datastores-persistence': {
        bookmarked: true,
        status: 'not_started',
        notes: 'ใช้ pcall เสมอเวลาติดต่อกับ DataStore',
        lastUpdated: new Date().toISOString(),
      },
    };
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userDataMap));
    } catch (e) {
      console.error('Failed to persist user bookmarks to storage', e);
    }
  }, [userDataMap]);

  // Bookmark Toggle
  const handleToggleBookmark = (topicId: string) => {
    setUserDataMap((prev) => {
      const current = prev[topicId] || {
        bookmarked: false,
        status: 'not_started',
        notes: '',
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...prev,
        [topicId]: {
          ...current,
          bookmarked: !current.bookmarked,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  // Status Update
  const handleUpdateStatus = (topicId: string, status: StudyStatus) => {
    setUserDataMap((prev) => {
      const current = prev[topicId] || {
        bookmarked: false,
        status: 'not_started',
        notes: '',
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...prev,
        [topicId]: {
          ...current,
          status,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  // Notes Update
  const handleUpdateNotes = (topicId: string, notes: string) => {
    setUserDataMap((prev) => {
      const current = prev[topicId] || {
        bookmarked: false,
        status: 'not_started',
        notes: '',
        lastUpdated: new Date().toISOString(),
      };
      return {
        ...prev,
        [topicId]: {
          ...current,
          notes,
          lastUpdated: new Date().toISOString(),
        },
      };
    });
  };

  // Clear all bookmarks
  const handleClearAllBookmarks = () => {
    if (window.confirm('คุณต้องการรีเซ็ตบุ๊กมาร์กทั้งหมดใช่หรือไม่?')) {
      setUserDataMap({});
    }
  };

  // Filtered Topics for Catalog
  const filteredTopics = useMemo(() => {
    return ROBLOX_DOCS_TOPICS.filter((topic) => {
      // Category filter
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && topic.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = topic.title.toLowerCase().includes(query);
        const matchesThaiTitle = topic.thaiTitle.toLowerCase().includes(query);
        const matchesSummary = topic.summary.toLowerCase().includes(query);
        const matchesConcepts = topic.keyConcepts.some((c) => c.toLowerCase().includes(query));
        const matchesCode = topic.codeSnippet.toLowerCase().includes(query);

        if (!matchesTitle && !matchesThaiTitle && !matchesSummary && !matchesConcepts && !matchesCode) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  // Derived counts
  const totalTopics = ROBLOX_DOCS_TOPICS.length;
  const bookmarkedCount = useMemo(() => {
    return Object.values(userDataMap).filter((d) => d.bookmarked).length;
  }, [userDataMap]);

  const masteredCount = useMemo(() => {
    return Object.values(userDataMap).filter((d) => d.status === 'mastered').length;
  }, [userDataMap]);

  const categories = Object.keys(CATEGORY_INFO) as Category[];

  const handleSelectTopicFromRoadmap = (topicId: string) => {
    const found = ROBLOX_DOCS_TOPICS.find((t) => t.id === topicId);
    if (found) {
      setSelectedTopic(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarkedCount={bookmarkedCount}
        masteredCount={masteredCount}
        totalTopics={totalTopics}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 0: Roadmap Guide (ลำดับการเรียนรู้) */}
        {activeTab === 'roadmap' && (
          <RoadmapGuideView
            onSelectTopic={handleSelectTopicFromRoadmap}
            onGoToCodeLab={() => setActiveTab('code_lab')}
            onGoToSecurityHub={() => setActiveTab('security_hub')}
          />
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Quick Hero Banner with Knowledge Goal */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-900/40 p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>เน้นอ่านง่าย ขยายความลึกซึ้ง</span>
                    </span>
                    <span className="text-xs text-slate-400">
                      เชื่อมโยงตรงสู่เอกสารทางการ Roblox Creator
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    ศูนย์รวมความรู้และการบุ๊กมาร์กสำหรับนักพัฒนาเกม Roblox
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    สรุปเนื้อหาสำคัญจาก <strong className="text-indigo-300 font-mono">create.roblox.com/docs</strong> พร้อมตัวอย่างโค้ด Luau, แผนภาพกระบวนการคิด, ข้อผิดพลาดที่ต้องระวัง และระบบ AI ขยายความรู้
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://create.roblox.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 rounded-xl shadow-sm transition"
                  >
                    <span>เปิด Roblox Creator Docs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Filter Bar: Categories + Difficulty */}
            <div className="space-y-3">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none" aria-label="Categories">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  ทั้งหมด ({totalTopics})
                </button>

                {categories.map((catKey) => {
                  const info = CATEGORY_INFO[catKey];
                  const count = ROBLOX_DOCS_TOPICS.filter((t) => t.category === catKey).length;
                  return (
                    <button
                      key={catKey}
                      onClick={() => setSelectedCategory(catKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                        selectedCategory === catKey
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      <span>{info.thaiLabel}</span>
                      <span className="text-[10px] opacity-75 font-mono">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span>ระดับความยาก:</span>
                  {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                        selectedDifficulty === diff
                          ? 'bg-slate-700 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {diff === 'all' ? 'ทุกระดับ' : diff}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400">
                  แสดง <strong>{filteredTopics.length}</strong> จาก {totalTopics} หัวข้อ
                </div>
              </div>
            </div>

            {/* Topics Grid */}
            {filteredTopics.length === 0 ? (
              <div className="bg-slate-800/30 border border-slate-700/60 rounded-2xl p-10 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">ไม่พบหัวข้อที่ค้นหา</h3>
                <p className="text-xs text-slate-400">
                  ลองเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองหมวดหมู่และความยาก
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredTopics.map((topic) => {
                  const userD = userDataMap[topic.id] || {
                    bookmarked: false,
                    status: 'not_started',
                    notes: '',
                    lastUpdated: '',
                  };
                  return (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      isBookmarked={userD.bookmarked}
                      status={userD.status}
                      hasNotes={Boolean(userD.notes && userD.notes.trim())}
                      onToggleBookmark={handleToggleBookmark}
                      onOpenDetail={(t) => setSelectedTopic(t)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Bookmarks View */}
        {activeTab === 'bookmarks' && (
          <BookmarksView
            topics={ROBLOX_DOCS_TOPICS}
            userDataMap={userDataMap}
            onToggleBookmark={handleToggleBookmark}
            onOpenDetail={(t) => setSelectedTopic(t)}
            onClearAllBookmarks={handleClearAllBookmarks}
          />
        )}

        {/* Tab 3: Interactive Luau Coding Lab */}
        {activeTab === 'code_lab' && <CodePracticeLab />}

        {/* Tab 4: Security & Anti-Exploit Masterclass */}
        {activeTab === 'security_hub' && <SecurityHubView />}

        {/* Tab 5: Interactive Network Simulator */}
        {activeTab === 'simulator' && <NetworkSimulator />}

        {/* Tab 6: Knowledge Quiz */}
        {activeTab === 'quiz' && <QuizView />}
      </main>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          userData={
            userDataMap[selectedTopic.id] || {
              bookmarked: false,
              status: 'not_started',
              notes: '',
              lastUpdated: '',
            }
          }
          onClose={() => setSelectedTopic(null)}
          onToggleBookmark={handleToggleBookmark}
          onUpdateStatus={handleUpdateStatus}
          onUpdateNotes={handleUpdateNotes}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Roblox Creator Docs Guide — สื่อการเรียนรู้สำหรับนักพัฒนาเกม Roblox
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://create.roblox.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition flex items-center gap-1"
            >
              <span>create.roblox.com/docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
