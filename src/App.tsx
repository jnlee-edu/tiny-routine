import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Images, Clock, RotateCcw } from 'lucide-react';

const TOTAL_DAYS = 30;

const THEMES = [
  {
    title: "해돋이 (Sunrise)",
    description: "어두운 바다 지평선 위로 붉은 태양이 떠오르는 풍경",
    pixels: [
      {day: 1, position: 24, color: "#001233"}, {day: 2, position: 25, color: "#001233"}, {day: 3, position: 26, color: "#001233"}, {day: 4, position: 27, color: "#001233"}, {day: 5, position: 28, color: "#001233"}, {day: 6, position: 29, color: "#001233"},
      {day: 7, position: 19, color: "#FF4D4D"}, {day: 8, position: 22, color: "#FF4D4D"}, {day: 9, position: 13, color: "#FF7A00"}, {day: 10, position: 14, color: "#FF7A00"}, {day: 11, position: 15, color: "#FF7A00"}, {day: 12, position: 16, color: "#FF7A00"},
      {day: 13, position: 7, color: "#FFAA00"}, {day: 14, position: 8, color: "#FFAA00"}, {day: 15, position: 9, color: "#FFAA00"}, {day: 16, position: 10, color: "#FFAA00"}, {day: 17, position: 1, color: "#FFD600"}, {day: 18, position: 2, color: "#FFD600"},
      {day: 19, position: 3, color: "#FFD600"}, {day: 20, position: 4, color: "#FFD600"}, {day: 21, position: 0, color: "#FF9E00"}, {day: 22, position: 5, color: "#FF9E00"}, {day: 23, position: 6, color: "#FF6B00"}, {day: 24, position: 11, color: "#FF6B00"},
      {day: 25, position: 12, color: "#FF4D00"}, {day: 26, position: 17, color: "#FF4D00"}, {day: 27, position: 18, color: "#001F54"}, {day: 28, position: 23, color: "#001F54"}, {day: 29, position: 20, color: "#FF8A00"}, {day: 30, position: 21, color: "#FF8A00"}
    ]
  },
  {
    title: "달의 위상 변화 (Moon Phase)",
    description: "밤하늘에 그믐달에서 보름달로 차오르는 신비로운 여정",
    pixels: [
      {day: 1, position: 14, color: "#FFF59D"}, {day: 2, position: 15, color: "#FFF59D"}, {day: 3, position: 21, color: "#FFE082"}, {day: 4, position: 22, color: "#FFE082"}, {day: 5, position: 8, color: "#FFD54F"}, {day: 6, position: 9, color: "#FFD54F"},
      {day: 7, position: 2, color: "#FFCA28"}, {day: 8, position: 3, color: "#FFCA28"}, {day: 9, position: 7, color: "#FFB300"}, {day: 10, position: 10, color: "#FFB300"}, {day: 11, position: 13, color: "#FFA000"}, {day: 12, position: 16, color: "#FFA000"},
      {day: 13, position: 20, color: "#FF8F00"}, {day: 14, position: 23, color: "#FF8F00"}, {day: 15, position: 1, color: "#E57373"}, {day: 16, position: 4, color: "#E57373"}, {day: 17, position: 0, color: "#1A237E"}, {day: 18, position: 5, color: "#1A237E"},
      {day: 19, position: 6, color: "#1A237E"}, {day: 20, position: 11, color: "#1A237E"}, {day: 21, position: 12, color: "#1A237E"}, {day: 22, position: 17, color: "#1A237E"}, {day: 23, position: 18, color: "#1A237E"}, {day: 24, position: 24, color: "#1A237E"},
      {day: 25, position: 29, color: "#1A237E"}, {day: 26, position: 25, color: "#283593"}, {day: 27, position: 28, color: "#283593"}, {day: 28, position: 26, color: "#3F51B5"}, {day: 29, position: 27, color: "#3F51B5"}, {day: 30, position: 19, color: "#FFF9C4"}
    ]
  },
  {
    title: "네온 도시 (Cyber City)",
    description: "회색 빌딩 숲 위로 화려한 핫핑크와 시안 네온 사인이 켜지는 야경",
    pixels: [
      {day: 1, position: 24, color: "#212121"}, {day: 2, position: 25, color: "#212121"}, {day: 3, position: 26, color: "#212121"}, {day: 4, position: 27, color: "#212121"}, {day: 5, position: 28, color: "#212121"}, {day: 6, position: 29, color: "#212121"},
      {day: 7, position: 18, color: "#424242"}, {day: 8, position: 19, color: "#424242"}, {day: 9, position: 22, color: "#424242"}, {day: 10, position: 23, color: "#424242"}, {day: 11, position: 12, color: "#00E5FF"}, {day: 12, position: 14, color: "#00E5FF"},
      {day: 13, position: 15, color: "#FF007F"}, {day: 14, position: 17, color: "#FF007F"}, {day: 15, position: 6, color: "#00E5FF"}, {day: 16, position: 8, color: "#00E5FF"}, {day: 17, position: 9, color: "#FF007F"}, {day: 18, position: 11, color: "#FF007F"},
      {day: 19, position: 0, color: "#76FF03"}, {day: 20, position: 5, color: "#76FF03"}, {day: 21, position: 1, color: "#2979FF"}, {day: 22, position: 4, color: "#2979FF"}, {day: 23, position: 20, color: "#FF007F"}, {day: 24, position: 21, color: "#00E5FF"},
      {day: 25, position: 13, color: "#212121"}, {day: 26, position: 16, color: "#212121"}, {day: 27, position: 7, color: "#424242"}, {day: 28, position: 10, color: "#424242"}, {day: 29, position: 2, color: "#D500F9"}, {day: 30, position: 3, color: "#D500F9"}
    ]
  },
  {
    title: "마법의 꽃 (Pixel Botanical)",
    description: "흙 속의 작은 씨앗이 줄기를 뻗어 신비로운 보랏빛 꽃을 피우는 과정",
    pixels: [
      {day: 1, position: 26, color: "#4E342E"}, {day: 2, position: 27, color: "#4E342E"}, {day: 3, position: 25, color: "#6D4C41"}, {day: 4, position: 28, color: "#6D4C41"}, {day: 5, position: 20, color: "#00E676"}, {day: 6, position: 21, color: "#00E676"},
      {day: 7, position: 14, color: "#00C853"}, {day: 8, position: 15, color: "#00C853"}, {day: 9, position: 8, color: "#00C853"}, {day: 10, position: 9, color: "#00C853"}, {day: 11, position: 13, color: "#B9F6CA"}, {day: 12, position: 16, color: "#B9F6CA"},
      {day: 13, position: 7, color: "#B9F6CA"}, {day: 14, position: 10, color: "#B9F6CA"}, {day: 15, position: 2, color: "#AA00FF"}, {day: 16, position: 3, color: "#AA00FF"}, {day: 17, position: 1, color: "#E040FB"}, {day: 18, position: 4, color: "#E040FB"},
      {day: 19, position: 0, color: "#00E5FF"}, {day: 20, position: 5, color: "#00E5FF"}, {day: 21, position: 6, color: "#AA00FF"}, {day: 22, position: 11, color: "#AA00FF"}, {day: 23, position: 12, color: "#E040FB"}, {day: 24, position: 17, color: "#E040FB"},
      {day: 25, position: 19, color: "#00C853"}, {day: 26, position: 22, color: "#00C853"}, {day: 27, position: 24, color: "#4E342E"}, {day: 28, position: 29, color: "#4E342E"}, {day: 29, position: 18, color: "#6D4C41"}, {day: 30, position: 23, color: "#6D4C41"}
    ]
  },
  {
    title: "보스 몬스터 (Game Boss)",
    description: "조금씩 형태를 드러내는 귀엽고 힙한 우주 외계인 슬라임 보스",
    pixels: [
      {day: 1, position: 7, color: "#FFD600"}, {day: 2, position: 10, color: "#FFD600"}, {day: 3, position: 13, color: "#000000"}, {day: 4, position: 16, color: "#000000"}, {day: 5, position: 14, color: "#FF3D00"}, {day: 6, position: 15, color: "#FF3D00"},
      {day: 7, position: 8, color: "#00E5FF"}, {day: 8, position: 9, color: "#00E5FF"}, {day: 9, position: 1, color: "#00E5FF"}, {day: 10, position: 4, color: "#00E5FF"}, {day: 11, position: 2, color: "#00E5FF"}, {day: 12, position: 3, color: "#00E5FF"},
      {day: 13, position: 6, color: "#00E5FF"}, {day: 14, position: 11, color: "#00E5FF"}, {day: 15, position: 12, color: "#00E5FF"}, {day: 16, position: 17, color: "#00E5FF"}, {day: 17, position: 19, color: "#00E5FF"}, {day: 18, position: 22, color: "#00E5FF"},
      {day: 19, position: 20, color: "#00E5FF"}, {day: 20, position: 21, color: "#00E5FF"}, {day: 21, position: 25, color: "#FF007F"}, {day: 22, position: 28, color: "#FF007F"}, {day: 23, position: 24, color: "#FF007F"}, {day: 24, position: 29, color: "#FF007F"},
      {day: 25, position: 0, color: "#212121"}, {day: 26, position: 5, color: "#212121"}, {day: 27, position: 18, color: "#212121"}, {day: 28, position: 23, color: "#212121"}, {day: 29, position: 26, color: "#212121"}, {day: 30, position: 27, color: "#212121"}
    ]
  }
];

interface Routine {
  id: number;
  category: string;
  task: string;
  icon: string;
}

const ALL_ROUTINES: Routine[] = [
  // [체력 & 근력] - 진짜 딱 3~5개만 하는 콘셉트
  { id: 1, category: "체력", task: "스쿼트 딱 3개만 하기", icon: "🏋️" },
  { id: 2, category: "체력", task: "벽 대고 푸시업 5개 하기", icon: "🧱" },
  { id: 3, category: "체력", task: "제자리 점프 10번 뛰기", icon: "🦘" },
  { id: 4, category: "체력", task: "플랭크 20초 버티기", icon: "⏱️" },
  { id: 5, category: "체력", task: "런지 좌우 2번씩만 하기", icon: "🏃" },

  // [스트레칭 & 교정] - 앉은 자리에서 바로 가능한 것들
  { id: 6, category: "스트레칭", task: "하늘 보며 만세 10초 유지하기", icon: "🙆" },
  { id: 7, category: "스트레칭", task: "목 크게 좌우로 2번씩 돌리기", icon: "🔄" },
  { id: 8, category: "스트레칭", task: "어깨 으쓱으쓱 10번 하기", icon: "🤷" },
  { id: 9, category: "스트레칭", task: "허리 쭉 펴고 척추 정렬하기", icon: "🪑" },
  { id: 10, category: "스트레칭", task: "눈 감고 안구 시계방향으로 돌리기", icon: "👀" },

  // [수분 & 리프레시] - 몸의 순환을 돕는 루틴
  { id: 11, category: "리프레시", task: "물 한 모금 시원하게 마시기", icon: "💧" },
  { id: 12, category: "리프레시", task: "창문 열고 바깥 공기 3초 마시기", icon: "🪟" },
  { id: 13, category: "리프레시", task: "인공눈물 한 방울 넣기", icon: "💧" },
  { id: 14, category: "리프레시", task: "손 흐르는 물에 30초 깨끗이 씻기", icon: "🧼" },

  // [마인드 웰니스] - 뇌에 휴식을 주는 루틴
  { id: 15, category: "마인드", task: "숨 깊게 들이쉬고 내쉬기 (심호흡 3번)", icon: "💨" },
  { id: 16, category: "마인드", task: "거울 보고 소리 내지 않고 씨익 웃기", icon: "😀" },
  { id: 17, category: "마인드", task: "오늘 나에게 '고생했다' 속으로 말하기", icon: "🥰" },
  { id: 18, category: "마인드", task: "지금 당장 스마트폰 화면 뒤집어 놓기", icon: "📱" },
  { id: 19, category: "마인드", task: "책상 위 쓰레기 딱 1개만 버리기", icon: "🗑️" },
  { id: 20, category: "마인드", task: "최애 노래 전주(10초)만 들으며 멍 때리기", icon: "🎧" }
];

interface CompletedMonth {
  id: number;
  dateStr: string;
  paletteIndex: number;
}

// LocalStorage helpers
const getStoredInt = (key: string, fallback: number) => {
  const val = localStorage.getItem(key);
  return val ? parseInt(val, 10) : fallback;
};
const getStoredJSON = (key: string, fallback: any) => {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : fallback;
};

export default function App() {
  const [progress, setProgress] = useState(() => getStoredInt('pixel_progress', 0));
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(() => getStoredInt('pixel_palette', 0));
  const [history, setHistory] = useState<CompletedMonth[]>(() => getStoredJSON('pixel_history', []));
  const [monthCounter, setMonthCounter] = useState(() => getStoredInt('pixel_month', 1));
  const [lastCompletedDate, setLastCompletedDate] = useState(() => localStorage.getItem('pixel_last_date') || '');
  
  const [dailyRoutinesIndices, setDailyRoutinesIndices] = useState<number[]>(() => {
    const storedDate = localStorage.getItem('pixel_routines_date');
    const storedIndices = localStorage.getItem('pixel_routines_indices');
    const todayStr = new Date().toDateString();
    
    if (storedDate === todayStr && storedIndices) {
      return JSON.parse(storedIndices);
    }
    
    const indices: number[] = [];
    const available = Array.from({length: ALL_ROUTINES.length}, (_, i) => i);
    for(let i=0; i<3; i++) {
      const r = Math.floor(Math.random() * available.length);
      indices.push(available.splice(r, 1)[0]);
    }
    
    localStorage.setItem('pixel_routines_date', todayStr);
    localStorage.setItem('pixel_routines_indices', JSON.stringify(indices));
    return indices;
  });

  const [showGallery, setShowGallery] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const isCompleted = progress >= TOTAL_DAYS;
  const nowStr = new Date().toDateString();
  const hasCompletedToday = lastCompletedDate === nowStr;

  useEffect(() => {
    localStorage.setItem('pixel_progress', progress.toString());
    localStorage.setItem('pixel_palette', currentPaletteIndex.toString());
    localStorage.setItem('pixel_history', JSON.stringify(history));
    localStorage.setItem('pixel_month', monthCounter.toString());
    localStorage.setItem('pixel_last_date', lastCompletedDate);
  }, [progress, currentPaletteIndex, history, monthCounter, lastCompletedDate]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow.getTime() - now.getTime();
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };
    updateTime(); // initial call
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRoutineComplete = () => {
    if (hasCompletedToday || isCompleted) return;

    if (progress < TOTAL_DAYS) {
      const newProgress = progress + 1;
      setProgress(newProgress);
      setLastCompletedDate(new Date().toDateString());
    }
  };

  const skipDevTime = () => {
    setLastCompletedDate(''); // Reset today's completed status purely for testing
    
    // Pick 3 new routines for demo purposes
    const indices: number[] = [];
    const available = Array.from({length: ALL_ROUTINES.length}, (_, i) => i);
    for(let i=0; i<3; i++) {
      const r = Math.floor(Math.random() * available.length);
      indices.push(available.splice(r, 1)[0]);
    }
    setDailyRoutinesIndices(indices);
    localStorage.setItem('pixel_routines_indices', JSON.stringify(indices));
  };

  const handleReset = () => {
    setHistory([...history, {
      id: Date.now(),
      dateStr: `도전 ${monthCounter}개월차`,
      paletteIndex: currentPaletteIndex
    }]);

    setProgress(0);
    setLastCompletedDate(''); // Allow immediate start of new month
    setCurrentPaletteIndex((prev) => (prev + 1) % THEMES.length);
    setMonthCounter(prev => prev + 1);
  };

  const currentTheme = THEMES[currentPaletteIndex];

  return (
    <div className="min-h-screen w-full bg-[#E8E8E8] font-pixel text-[#222] p-4 sm:p-10 flex flex-col gap-6 sm:gap-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 h-full flex-1">
        
        {/* Header Section */}
        <header className="flex justify-between items-end border-b-4 border-black pb-4">
          <div className="flex-1 flex flex-col items-start gap-1">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase whitespace-nowrap">마이크로 루틴</h1>
            <div className="text-xs sm:text-sm opacity-70 uppercase flex flex-col sm:flex-row gap-1 sm:gap-3 items-start sm:items-center">
               <span>저질 체력 탈출 30일 챌린지</span>
               {hasCompletedToday && !isCompleted && (
                 <span className="text-blue-600 font-bold flex items-center gap-1 px-2 py-0.5 rounded border border-blue-600/30">
                   <Clock size={12} strokeWidth={3} /> 다음 루틴까지 {timeLeft}
                 </span>
               )}
            </div>
          </div>
          <div className="flex items-end gap-6 h-full">
            <button 
              onClick={() => setShowGallery(!showGallery)}
              className={`flex items-center gap-2 border-4 border-black px-3 py-2 text-xs font-black uppercase transition-all ${showGallery ? 'bg-black text-white' : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1'}`}
            >
              <Images size={16} strokeWidth={3} />
              <span className="hidden sm:inline">{showGallery ? "진행중인 화면" : "캔버스 갤러리"}</span>
            </button>
            <div className="text-right uppercase hidden sm:block">
              <div className="text-xs font-bold w-full">LV.1 달성도</div>
              <div className="text-xl font-black whitespace-nowrap">{progress} / {TOTAL_DAYS}</div>
            </div>
          </div>
        </header>

        {/* Mobile progress */}
        {!showGallery && (
          <div className="text-right uppercase block sm:hidden">
            <div className="text-xs font-bold mb-1">LV.1 달성도 : {progress} / {TOTAL_DAYS}</div>
          </div>
        )}

        {showGallery ? (
          /* Gallery View */
          <div className="flex-grow flex flex-col">
            <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 w-full flex-1">
              <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-4">
                 <h2 className="text-xl sm:text-2xl font-black uppercase">완성된 컬렉션</h2>
                 <span className="text-sm font-bold bg-[#FFEEAD] border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                   TOTAL: {history.length}
                 </span>
              </div>
              
              {history.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 space-y-4 py-20">
                  <Images size={48} strokeWidth={1} />
                  <p className="font-bold text-sm uppercase leading-relaxed">아직 완성된 캔버스가 없습니다.<br/>루틴을 완료하고 첫 도트 아트를 수집하세요!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {history.map((item) => {
                    const theme = THEMES[item.paletteIndex];
                    return (
                      <div key={item.id} className="bg-[#E8E8E8] border-4 border-black p-4 flex flex-col gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                          <span className="bg-white border-2 border-black px-1.5 py-0.5">{item.dateStr}</span>
                          <span>[{theme.title.split(' ')[0]}]</span>
                        </div>
                        <div className="grid grid-cols-6 gap-0.5 border-4 border-black p-0.5 bg-[#D1D1D1] pixelated">
                          {Array.from({ length: TOTAL_DAYS }).map((_, i) => {
                            const pixel = theme.pixels.find(p => p.position === i);
                            return <div key={i} className="w-full aspect-square border-[0.5px] border-black/10" style={{ backgroundColor: pixel?.color || 'transparent' }} />
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Main View Content */
          <>
            {/* Main Canvas Area */}
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-6 w-full max-w-fit">
                <div className="text-xs uppercase font-bold text-center tracking-[0.2em] mb-2">Monthly Pixel Art: [{currentTheme.title}]</div>

                <div className="grid grid-cols-6 gap-2 sm:gap-3 pixelated">
                  {Array.from({ length: TOTAL_DAYS }).map((_, index) => {
                    const pixel = currentTheme.pixels.find(p => p.position === index);
                    const isFilled = !!(pixel && pixel.day <= progress);
                    const isSparkle = !!(pixel && pixel.day === progress);
                    const color = isFilled ? pixel.color : '#D1D1D1';
                    
                    return (
                      <motion.div
                        key={index}
                        className={`w-10 h-10 border-2 border-black flex items-center justify-center ${!isFilled ? 'opacity-30' : ''}`}
                        initial={false}
                        animate={{ 
                          backgroundColor: color,
                          scale: isSparkle ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {isSparkle && (
                          <motion.div 
                            key="sparkle"
                            initial={{ opacity: 1, scale: 0 }}
                            animate={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-2 h-2 bg-white"
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {isCompleted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-center text-blue-600 font-bold text-sm animate-pulse"
                  >
                    축하합니다! 도트 아트 완성!
                  </motion.div>
                )}

                <div className="mt-2 text-[10px] text-gray-500 font-bold uppercase text-center break-keep flex flex-col items-center gap-2">
                  <span>* 하루 1회 참여 가능합니다. (자정 초기화)</span>
                  {hasCompletedToday && !isCompleted && (
                    <button onClick={skipDevTime} className="text-blue-500 underline flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-2 py-1 border border-blue-200">
                      <RotateCcw size={10} /> [데모용] 시간 스킵 (오늘 기록 취소)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {dailyRoutinesIndices.map((routineIndex, idx) => {
                 const routine = ALL_ROUTINES[routineIndex];
                 
                 const cardThemes = [
                  { bg: '#4ECDC4', text: 'text-blue-600', tagBg: 'bg-blue-100' },
                  { bg: '#FF6B6B', text: 'text-orange-600', tagBg: 'bg-orange-100' },
                  { bg: '#FFEEAD', text: 'text-purple-600', tagBg: 'bg-purple-100' },
                ];
                const theme = cardThemes[idx % cardThemes.length];

                return (
                  <div
                    key={routine.id}
                    className={`
                      bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                      flex flex-col justify-between
                      ${!isCompleted ? 'hover:-translate-y-1 transition-transform' : 'opacity-50'}
                    `}
                  >
                    <div className="mb-4">
                      <div className={`text-[10px] font-bold ${theme.text} ${theme.tagBg} w-fit px-2 py-0.5 mb-3 border-2 border-transparent`}>{routine.category}</div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{routine.icon}</span>
                        <h3 className="text-lg font-black leading-tight uppercase break-keep">{routine.task}</h3>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleRoutineComplete}
                      disabled={isCompleted || hasCompletedToday}
                      className={`w-full border-2 border-black py-3 text-xs font-black uppercase ${(!isCompleted && !hasCompletedToday) ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all' : 'cursor-not-allowed opacity-80'}`}
                      style={{ backgroundColor: (!isCompleted && !hasCompletedToday) ? theme.bg : '#d1d1d1' }}
                    >
                      <div className="flex items-center justify-center gap-2">
                         {isCompleted ? '월간 완료됨' : hasCompletedToday ? '오늘의 습관 완료!' : '루틴 완료'}
                         {(!isCompleted && !hasCompletedToday) && <Check size={14} strokeWidth={4} />}
                      </div>
                    </button>
                  </div>
                );
              })}
              
              {isCompleted && (
                 <div className="sm:col-span-3">
                   <button
                     onClick={handleReset}
                     className="w-full mt-2 p-4 text-center bg-[#FFEEAD] border-4 border-dashed border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 hover:bg-[#ffe373] text-sm font-black uppercase transition-all"
                   >
                     새로운 달 시작하기 &amp; 갤러리에 저장
                   </button>
                 </div>
              )}
            </div>
          </>
        )}
        
        {/* Footer */}
        <footer className="text-[10px] font-bold flex flex-col sm:flex-row justify-between items-center gap-2 uppercase mt-auto opacity-50 border-t-2 border-black/20 pt-4 pb-2">
          <span>Build tiny habits. Finish big art.</span>
          <span>v.1.1.0 / GALLERY_ACTIVE</span>
        </footer>

      </div>
    </div>
  );
}
