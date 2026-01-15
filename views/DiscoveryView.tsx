
import React from 'react';

const DiscoveryView: React.FC = () => {
  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">explore</span>
            <h1 className="text-2xl font-black tracking-tight">发现路线</h1>
          </div>
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
        </div>
        
        <div className="relative">
          <label className="flex items-center h-12 w-full bg-[#f4eae7] dark:bg-white/10 rounded-xl px-4 gap-3 focus-within:ring-2 ring-primary/50 transition-all">
            <span className="material-symbols-outlined text-[#9c5e49] dark:text-gray-400">search</span>
            <input className="bg-transparent border-none focus:ring-0 w-full p-0 text-base placeholder:text-[#9c5e49]/60 dark:placeholder:text-gray-500" placeholder="搜索路线、公园或城市..." type="text"/>
            <span className="material-symbols-outlined text-primary">tune</span>
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['越野', '公路', '滨海', '森林', '坡道'].map((cat, i) => (
            <button key={cat} className={`flex h-9 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all ${i === 0 ? 'bg-primary text-white' : 'bg-[#f4eae7] dark:bg-white/10 text-gray-600 dark:text-gray-300'}`}>
              {cat} <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-2 space-y-6">
        {/* Map Preview */}
        <div className="relative h-80 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEEXmiImaN3eiQcsZ9xZ87rTbN4Fe7yJbgehDG2gz1Rv-SlwNc4pVY4XUNh6bWZnMdZAkp5jk-OdHlexv7PsuAY_1aomUbxFzV8JI9uOl4QiCYkhwgs98I5fmqOHaKtdNdoy9pGic76v5XUIBaWCnhqKeRSK9fxfsS-LnosNcsINqAWwsNn_qfQSoxot01dkbTQ8emSkFTswnpptz-8UkpCgeCwnlMuSX-s79QRQu_Q-pK7oAQkbF6MGWLhmdGy65t7rC8cbdrhjA")' }}></div>
          <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
            <div className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold mb-1 shadow-lg">8.4公里</div>
            <span className="material-symbols-outlined text-primary fill-1 text-3xl drop-shadow-md">location_on</span>
          </div>
          <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
            <div className="bg-active-teal text-white text-[10px] px-2 py-0.5 rounded-full font-bold mb-1 shadow-lg">热门</div>
            <span className="material-symbols-outlined text-active-teal fill-1 text-3xl drop-shadow-md">location_on</span>
          </div>
          <button className="absolute bottom-4 right-4 size-12 bg-white dark:bg-background-dark rounded-xl shadow-lg flex items-center justify-center text-primary active:scale-95">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Route Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight">附近路线</h2>
            <button className="text-primary text-sm font-bold">查看全部</button>
          </div>
          
          {[
            { name: '太平洋之魂小径', tag: '软土地面', color: 'earthy-green', dist: '8.4 公里', elev: '+120米', diff: '中等', stars: 3 },
            { name: '海堤环线', tag: '铺装路面', color: 'blue-500', dist: '10.2 公里', elev: '+15米', diff: '简单', stars: 2 }
          ].map((route) => (
            <div key={route.name} className="bg-card-light dark:bg-white/5 rounded-2xl p-4 shadow-sm border border-[#e5e0dc] dark:border-white/10 group active:scale-[0.98] transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold mb-1">{route.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`bg-${route.color}/10 text-${route.color} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>{route.tag}</span>
                    <div className="flex text-primary">
                      {Array.from({length: route.stars}).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-xs fill-1">star</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="size-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                  <span className={`material-symbols-outlined text-xl ${route.stars > 2 ? 'text-primary' : 'text-gray-400'}`}>favorite</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#9c5e49] uppercase">距离</span>
                  <span className="font-black text-sm italic">{route.dist}</span>
                </div>
                <div className="flex flex-col border-x border-[#e5e0dc] dark:border-white/10 px-4">
                  <span className="text-[10px] font-bold text-[#9c5e49] uppercase">海拔</span>
                  <span className="font-black text-sm">{route.elev}</span>
                </div>
                <div className="flex flex-col pl-4">
                  <span className="text-[10px] font-bold text-[#9c5e49] uppercase">难度</span>
                  <span className="font-black text-sm">{route.diff}</span>
                </div>
              </div>
              {/* Mini Elevation Chart */}
              <div className="h-10 w-full bg-active-teal/5 rounded-lg flex items-end px-2 pb-1 gap-1">
                {[2, 4, 3, 6, 4, 2].map((h, i) => (
                  <div key={i} className="w-full bg-active-teal rounded-full transition-all duration-500" style={{ height: `${h * 15}%`, opacity: h / 6 }}></div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DiscoveryView;
