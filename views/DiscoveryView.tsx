
import React, { useState } from 'react';
import { Route } from '../types';

const DiscoveryView: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const routes: Route[] = [
    { id: '1', name: '太平洋之魂小径', surface: '软土地面', rating: 5, distance: '8.4 公里', elevation: '+120米', difficulty: '中等', isFavorite: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEEXmiImaN3eiQcsZ9xZ87rTbN4Fe7yJbgehDG2gz1Rv-SlwNc4pVY4XUNh6bWZnMdZAkp5jk-OdHlexv7PsuAY_1aomUbxFzV8JI9uOl4QiCYkhwgs98I5fmqOHaKtdNdoy9pGic76v5XUIBaWCnhqKeRSK9fxfsS-LnosNcsINqAWwsNn_qfQSoxot01dkbTQ8emSkFTswnpptz-8UkpCgeCwnlMuSX-s79QRQu_Q-pK7oAQkbF6MGWLhmdGy65t7rC8cbdrhjA' },
    { id: '2', name: '海堤环线', surface: '铺装路面', rating: 4, distance: '10.2 公里', elevation: '+15米', difficulty: '简单', isFavorite: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYEhL3vUas79FmWihHpVFIUTc3meTRF0LdQ7XHXvumLh-0LCowno_XNj_r9f4RNZ3Ai3RM89SojZi6cX9N1rnIoJsEuPQ9GP2NJdsVDtugRx8XjmMtXCFK3m-9nZhF3400IOQ3A_zyWEZRKPodwZ1M3vaxVe7sDMgjShaLW07nUoYgB-RIUZaIHcEakvhYSmKdoRmG4st3zaO1rNPjyu3A0MUXDE84EA0eqcCYjLoY5nViqJvITyWHDrljxLg6bDTjxT_u6LaUXtM' }
  ];

  const comments = [
    { id: 1, user: '老跑者', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIJ5xcZGGfZQJS7xGbIoysGOqfsHRi7KtJaaNK72v0x-trftYwV7VtvlDP2jd8k9LOdrN9x65sSQx6qBenwq7_0u-MyjAYMUcQm8vmZ19A9h-dN08CTUhyb0aTKyLNHcIA0BUMBHj_mHjeDIQ7WQNE4u8wnwTJKQoRD47pxV9cqqbXFW3ME0hoRwJYaYIM1CTmXudko7a9RQqlOPokD_paiSAsGvOLrVzo9nIvTsN-MDHDFwmB_m4t72YK5A1pzJzB8KudD2EIgWA', text: '路况很棒，空气非常清新！', time: '2小时前', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiiSoExBK2jXS0HQYH8jfmvTPLHjRaqq7_6EtD5fsZYdvgq0KcfXlAD219giJw5g3E5wyHFFoM_Ctegyqn1SgpzWmYzXTtVw7rukNoSOMS0Lr0niL5h66Pu5fWeCT0EHifQTYmebX0XOXo0EX8uGt9nUoT2MHCEBquBLwx9lr2lMiCBDM73AHIqjoYPgnu1_9xkfSc4tV2E-PeZLHFIEIDEkPilKgytDnrpJYqB1vFzdi_k9QNJIB6ISouI1mwlDMTxcQhlA7Sg9w' },
    { id: 2, user: '猫宁跑', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzb8uj8Pe6eSPa99eAhd5x7Guh_512Deh6QiRoe_k16iqit_MQhkRetRqTgxXlBy1MdcUP5FHJie9-pc-wtFk1Ocvc0Ib9RVFOKDZCZu2BuzN3w7Wk3NTDf4Y7icoiYHxybIUIW-HYqNNxIOfKxRMmGHyrTTZ181VRNZB82W0_4f59XOJB8oQUQ39enAyd8d77_-9gNrwtlrfPIEgDxN0eXJeHz0aiarbOS70M5GlebCsIzfwIrl-832U3NemedLZ1ZW6THvFghbo', text: '夕阳的时候去最美，强烈推荐。', time: '昨天', img: null }
  ];

  if (selectedRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-android-bg-light dark:bg-android-bg-dark animate-in slide-in-from-right duration-300 pb-24">
        {/* Header with Background Image */}
        <div className="relative h-72">
          <img src={selectedRoute.image} className="w-full h-full object-cover" alt={selectedRoute.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button 
            onClick={() => setSelectedRoute(null)}
            className="absolute top-6 left-6 size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-2xl font-black">{selectedRoute.name}</h1>
            <div className="flex items-center gap-2 mt-1">
               <span className="bg-primary px-2 py-0.5 rounded text-[10px] font-black uppercase">{selectedRoute.surface}</span>
               <div className="flex text-amber-400">
                  {Array.from({length: selectedRoute.rating}).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xs fill-1">star</span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <main className="px-4 -mt-6 relative z-10 bg-android-bg-light dark:bg-android-bg-dark rounded-t-[32px] pt-8 space-y-8">
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 bg-white dark:bg-white/5 p-6 rounded-3xl shadow-sm border border-black/5">
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">距离</p>
              <p className="text-lg font-black italic text-primary">{selectedRoute.distance}</p>
            </div>
            <div className="text-center border-x border-black/5">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">爬升</p>
              <p className="text-lg font-black">{selectedRoute.elevation}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">难度</p>
              <p className="text-lg font-black">{selectedRoute.difficulty}</p>
            </div>
          </div>

          {/* Comment Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">路线评论 ({comments.length})</h3>
              <button className="flex items-center gap-1 text-primary text-[10px] font-black uppercase">
                <span className="material-symbols-outlined text-sm">edit_note</span>
                写评论
              </button>
            </div>
            
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 group">
                  <img src={comment.avatar} className="size-10 rounded-full border-2 border-primary/10" alt={comment.user} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold">{comment.user}</p>
                      <span className="text-[10px] text-gray-400">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                      {comment.text}
                    </p>
                    {comment.img && (
                      <div className="rounded-xl overflow-hidden border border-black/5 active:scale-95 transition-all cursor-pointer">
                        <img src={comment.img} className="w-full max-h-40 object-cover" alt="晒图" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Button */}
          <div className="pt-4">
            <button className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">play_arrow</span>
              去跑这条线
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">explore</span>
            <h1 className="text-2xl font-black tracking-tight">发现路线</h1>
          </div>
        </div>
        
        <div className="relative">
          <label className="flex items-center h-12 w-full bg-[#f4eae7] dark:bg-white/10 rounded-xl px-4 gap-3 focus-within:ring-2 ring-primary/50 transition-all">
            <span className="material-symbols-outlined text-[#9c5e49] dark:text-gray-400">search</span>
            <input className="bg-transparent border-none focus:ring-0 w-full p-0 text-base placeholder:text-[#9c5e49]/60 dark:placeholder:text-gray-500" placeholder="搜索路线、公园或城市..." type="text"/>
          </label>
        </div>
      </header>

      <main className="px-4 pt-2 space-y-6">
        {/* Map Preview */}
        <div className="relative h-60 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEEXmiImaN3eiQcsZ9xZ87rTbN4Fe7yJbgehDG2gz1Rv-SlwNc4pVY4XUNh6bWZnMdZAkp5jk-OdHlexv7PsuAY_1aomUbxFzV8JI9uOl4QiCYkhwgs98I5fmqOHaKtdNdoy9pGic76v5XUIBaWCnhqKeRSK9fxfsS-LnosNcsINqAWwsNn_qfQSoxot01dkbTQ8emSkFTswnpptz-8UkpCgeCwnlMuSX-s79QRQu_Q-pK7oAQkbF6MGWLhmdGy65t7rC8cbdrhjA")' }}></div>
          <button className="absolute bottom-4 right-4 size-10 bg-white dark:bg-background-dark rounded-xl shadow-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Route Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight">附近路线</h2>
          </div>
          
          {routes.map((route) => (
            <div 
              key={route.id} 
              onClick={() => setSelectedRoute(route)}
              className="bg-card-light dark:bg-white/5 rounded-2xl p-4 shadow-sm border border-[#e5e0dc] dark:border-white/10 group active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold mb-1">{route.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{route.surface}</span>
                    <div className="flex text-primary">
                      {Array.from({length: route.rating}).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-xs fill-1">star</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="size-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center">
                  <span className={`material-symbols-outlined text-xl ${route.isFavorite ? 'text-primary' : 'text-gray-300'}`}>favorite</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#9c5e49] uppercase">距离</span>
                  <span className="font-black text-sm italic">{route.distance}</span>
                </div>
                <div className="flex flex-col border-x border-[#e5e0dc] dark:border-white/10 px-4">
                  <span className="text-[10px] font-bold text-[#9c5e49] uppercase">海拔</span>
                  <span className="font-black text-sm">{route.elevation}</span>
                </div>
                <div className="flex flex-col pl-4">
                  <span className="text-[10px] font-bold text-[#9c5e49] uppercase">难度</span>
                  <span className="font-black text-sm">{route.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DiscoveryView;
