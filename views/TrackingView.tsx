
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TrackingViewProps {
  onBack: () => void;
  onPublishRoute?: (data: { distance: string; type: string }) => void;
}

const TrackingView: React.FC<TrackingViewProps> = ({ onBack, onPublishRoute }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [elevation, setElevation] = useState(0);
  
  const [isPressingStop, setIsPressingStop] = useState(false);
  const [stopProgress, setStopProgress] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const radius = 38;

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return {
      hours: hrs.toString().padStart(2, '0'),
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
        setDistance((prev) => prev + 0.0015); 
        if (Math.random() > 0.8) setElevation((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused]);

  const handleStartToggle = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const finalizeStop = useCallback(() => {
    const finalDistance = distance.toFixed(2);
    setIsActive(false);
    setIsPaused(false);
    setStopProgress(0);
    setIsPressingStop(false);
    
    // 模拟 Android 提示并引导发布
    if (confirm(`运动已保存！共跑了 ${finalDistance} KM。要发布到社区分享吗？`)) {
      if (onPublishRoute) {
        onPublishRoute({ distance: finalDistance, type: '实时运动' });
      }
    } else {
      onBack();
    }
  }, [onBack, distance, onPublishRoute]);

  const startPress = () => {
    setIsPressingStop(true);
    setStopProgress(0);
    const startTime = Date.now();
    const duration = 1500;

    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setStopProgress(p);
      if (p >= 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        finalizeStop();
      }
    }, 20);
  };

  const cancelPress = () => {
    setIsPressingStop(false);
    setStopProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const { hours, minutes, seconds: secs } = formatTime(seconds);
  const currentPace = seconds > 0 ? ((seconds / 60) / (distance || 1)).toFixed(2).replace('.', "'") + '"' : "0'00\"";

  return (
    <div className="flex flex-col h-full min-h-screen pb-24 bg-background-light dark:bg-background-dark select-none animate-in fade-in zoom-in-95 duration-300">
      <header className="flex items-center justify-between px-6 pt-6 pb-2">
        <button onClick={() => isActive ? (confirm('退出将不保存数据') && onBack()) : onBack()} className="size-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isActive && !isPaused ? 'bg-emerald-500 animate-pulse' : 'bg-primary'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isActive ? (isPaused ? '已暂停' : '实时记录中') : '准备就绪'}</span>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-400"><span className="material-symbols-outlined">music_note</span></button>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-4">
        <div className="mb-6 bg-white dark:bg-[#25282c] rounded-3xl p-8 shadow-sm border border-black/5 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">运动时长</p>
          <div className="flex justify-center items-baseline gap-2">
            <span className="text-6xl font-black tracking-tighter tabular-nums">{hours}</span>
            <span className="text-4xl font-black text-primary/30">:</span>
            <span className="text-6xl font-black tracking-tighter tabular-nums">{minutes}</span>
            <span className="text-4xl font-black text-primary/30">:</span>
            <span className="text-6xl font-black tracking-tighter tabular-nums">{secs}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#f4eae7] dark:bg-primary/10 p-6 rounded-3xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9c5e49] mb-2">距离 (KM)</p>
            <p className="text-4xl font-black tabular-nums tracking-tighter">{distance.toFixed(2)}</p>
          </div>
          <div className="bg-[#f4eae7] dark:bg-primary/10 p-6 rounded-3xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9c5e49] mb-2">平均配速</p>
            <p className="text-4xl font-black tabular-nums tracking-tighter">{isActive && !isPaused ? currentPace : "--'--\""}</p>
          </div>
        </div>

        <div className="relative flex-1 min-h-[180px] mb-8 rounded-3xl overflow-hidden border border-black/5 shadow-inner bg-gray-200">
           <div className="absolute inset-0 bg-cover bg-center opacity-60 grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUS7euLlezCCbp9mthdpRKgaCyaAleVT9L1G2o_-NdOvX_h9w3iyVii9bgARyJ25pA84alJCHciHOB39LrYdgM68BjJkcBhM_G_HtRwxvk3V4YRJkGTDB6BSFFjO_mhcsMcwyLg5JHkM2IFXg-mC4TQqFw7b0iX5zfMtO0zlq3Jvcpx-q2mpKp3DnwqbsxcuNy1Sd-uy_qOCnwQAJFWVCjeV5V_LI2pP_IXTU80jlUWjynorWo8agAHXcylB-5HKdNk_za5aBkJMY")' }}></div>
           <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-sm">terrain</span>
              <span className="text-[10px] font-black">+{elevation}M 海拔</span>
           </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-4">
          {isActive && (
            <div className="flex flex-col items-center gap-2">
              <button onMouseDown={startPress} onMouseUp={cancelPress} onMouseLeave={cancelPress} onTouchStart={startPress} onTouchEnd={cancelPress}
                className={`relative size-20 rounded-full bg-[#1c110d] text-white flex items-center justify-center transition-all ${isPressingStop ? 'scale-110' : 'active:scale-95'}`}>
                <svg className="absolute inset-0 size-full -rotate-90">
                  <circle cx="40" cy="40" r={radius} className="stroke-white/10 fill-none" strokeWidth="4" />
                  <circle cx="40" cy="40" r={radius} className="stroke-primary fill-none transition-all duration-75" strokeWidth="4" strokeDasharray="239" strokeDashoffset={239 - (239 * stopProgress / 100)} strokeLinecap="round" />
                </svg>
                <span className="material-symbols-outlined text-3xl z-10">stop</span>
              </button>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">长按结束</span>
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            <button onClick={handleStartToggle} className={`size-24 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 ${!isActive ? 'bg-primary text-white' : isPaused ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-[#25282c] text-primary border-4 border-primary/20'}`}>
              <span className="material-symbols-outlined text-5xl">{!isActive ? 'play_arrow' : (isPaused ? 'play_arrow' : 'pause')}</span>
            </button>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{!isActive ? '开始' : (isPaused ? '继续' : '暂停')}</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingView;
