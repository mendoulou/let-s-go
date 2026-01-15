
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TrackingViewProps {
  onBack: () => void;
}

const TrackingView: React.FC<TrackingViewProps> = ({ onBack }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [distance, setDistance] = useState(0);
  const [elevation, setElevation] = useState(0);
  
  // 长按逻辑状态
  const [isPressingStop, setIsPressingStop] = useState(false);
  const [stopProgress, setStopProgress] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Define radius for circle calculations
  const radius = 38;

  // 格式化时间为 HH:MM:SS
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

  const handleExitRequest = () => {
    if (isActive) {
      if (window.confirm('运动正在进行中，退出将不保存当前数据。确定退出吗？')) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  const finalizeStop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(0);
    setDistance(0);
    setElevation(0);
    setStopProgress(0);
    setIsPressingStop(false);
    alert('运动已保存！');
    onBack(); // 保存后自动返回
  }, [onBack]);

  // 长按处理
  const startPress = () => {
    setIsPressingStop(true);
    setStopProgress(0);
    const startTime = Date.now();
    const duration = 1500; // 1.5秒长按

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
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExitRequest}
            className="size-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">close</span>
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isActive && !isPaused ? 'bg-emerald-500 animate-pulse' : 'bg-primary'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              {isActive ? (isPaused ? '已暂停' : '实时记录中') : '准备就绪'}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-400"><span className="material-symbols-outlined">music_note</span></button>
          <button className="text-gray-400"><span className="material-symbols-outlined">settings</span></button>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-4">
        {/* Timer Card */}
        <div className="mb-6 bg-white dark:bg-[#25282c] rounded-3xl p-8 shadow-sm border border-black/5 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Duration</p>
          <div className="flex justify-center items-baseline gap-2">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black tracking-tighter tabular-nums">{hours}</span>
              <span className="text-[10px] uppercase font-bold text-gray-400 mt-1">Hrs</span>
            </div>
            <span className="text-4xl font-black text-primary/30 mb-6">:</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black tracking-tighter tabular-nums">{minutes}</span>
              <span className="text-[10px] uppercase font-bold text-gray-400 mt-1">Min</span>
            </div>
            <span className="text-4xl font-black text-primary/30 mb-6">:</span>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-black tracking-tighter tabular-nums">{secs}</span>
              <span className="text-[10px] uppercase font-bold text-gray-400 mt-1">Sec</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#f4eae7] dark:bg-primary/10 p-6 rounded-3xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9c5e49] mb-2">Distance (KM)</p>
            <p className="text-4xl font-black tabular-nums tracking-tighter">{distance.toFixed(2)}</p>
          </div>
          <div className="bg-[#f4eae7] dark:bg-primary/10 p-6 rounded-3xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9c5e49] mb-2">Avg Pace</p>
            <p className="text-4xl font-black tabular-nums tracking-tighter">{isActive && !isPaused ? currentPace : "--'--\""}</p>
          </div>
        </div>

        {/* Map Preview */}
        <div className="relative flex-1 min-h-[180px] mb-8 rounded-3xl overflow-hidden border border-black/5 shadow-inner bg-gray-200">
           <div className="absolute inset-0 bg-cover bg-center opacity-60 grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUS7euLlezCCbp9mthdpRKgaCyaAleVT9L1G2o_-NdOvX_h9w3iyVii9bgARyJ25pA84alJCHciHOB39LrYdgM68BjJkcBhM_G_HtRwxvk3V4YRJkGTDB6BSFFjO_mhcsMcwyLg5JHkM2IFXg-mC4TQqFw7b0iX5zfMtO0zlq3Jvcpx-q2mpKp3DnwqbsxcuNy1Sd-uy_qOCnwQAJFWVCjeV5V_LI2pP_IXTU80jlUWjynorWo8agAHXcylB-5HKdNk_za5aBkJMY")' }}></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full p-12">
                 <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path 
                      d="M10 90 Q 50 10 90 90" 
                      fill="none" 
                      stroke="#f45925" 
                      strokeWidth="3" 
                      strokeDasharray={isActive && !isPaused ? "4,4" : "0"}
                      className={isActive && !isPaused ? "animate-[dash_2s_linear_infinite]" : ""}
                    />
                 </svg>
              </div>
           </div>
           <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-sm">terrain</span>
              <span className="text-[10px] font-black">+{elevation}M Elevation</span>
           </div>
        </div>

        {/* Control Center */}
        <div className="flex items-center justify-center gap-6 px-4">
          {/* Stop Button */}
          {isActive && (
            <div className="flex flex-col items-center gap-2">
              <button 
                onMouseDown={startPress}
                onMouseUp={cancelPress}
                onMouseLeave={cancelPress}
                onTouchStart={startPress}
                onTouchEnd={cancelPress}
                className={`relative size-20 rounded-full bg-[#1c110d] text-white flex items-center justify-center transition-all ${isPressingStop ? 'scale-110' : 'active:scale-95'}`}
              >
                <svg className="absolute inset-0 size-full -rotate-90">
                  <circle cx="40" cy="40" r={radius} className="stroke-white/10 fill-none" strokeWidth="4" />
                  <circle 
                    cx="40" cy="40" r={radius} 
                    className="stroke-primary fill-none transition-all duration-75" 
                    strokeWidth="4" 
                    strokeDasharray="239" 
                    strokeDashoffset={239 - (239 * stopProgress / 100)} 
                    strokeLinecap="round"
                  />
                </svg>
                <span className="material-symbols-outlined text-3xl z-10">stop</span>
              </button>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isPressingStop ? '释放取消' : '长按结束'}</span>
            </div>
          )}

          {/* Main Toggle Button */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={handleStartToggle}
              className={`size-24 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 ${
                !isActive ? 'bg-primary text-white shadow-primary/30' : 
                isPaused ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 
                'bg-white dark:bg-[#25282c] text-primary border-4 border-primary/20'
              }`}
            >
              <span className="material-symbols-outlined text-5xl">
                {!isActive ? 'play_arrow' : (isPaused ? 'play_arrow' : 'pause')}
              </span>
            </button>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {!isActive ? '点击开始' : (isPaused ? '继续跑步' : '点击暂停')}
            </span>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
};

export default TrackingView;