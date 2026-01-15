
import React, { useState, useEffect } from 'react';

interface CommunityViewProps {
  pendingData?: { distance: string; type: string } | null;
  onClearPending?: () => void;
}

const CommunityView: React.FC<CommunityViewProps> = ({ pendingData, onClearPending }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [postText, setPostText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // 当有待发布数据时，自动打开发布面板
  useEffect(() => {
    if (pendingData) {
      setIsPublishing(true);
      setPostText(`刚完成了一次很棒的${pendingData.type}！距离：${pendingData.distance} KM。`);
      setSelectedTags(['路线', '感受']);
      onClearPending?.();
    }
  }, [pendingData]);

  const hotSpots = [
    { id: 1, name: '世纪公园环线', users: '1.2k', rating: '5.0', tag: '高人气', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEEXmiImaN3eiQcsZ9xZ87rTbN4Fe7yJbgehDG2gz1Rv-SlwNc4pVY4XUNh6bWZnMdZAkp5jk-OdHlexv7PsuAY_1aomUbxFzV8JI9uOl4QiCYkhwgs98I5fmqOHaKtdNdoy9pGic76v5XUIBaWCnhqKeRSK9fxfsS-LnosNcsINqAWwsNn_qfQSoxot01dkbTQ8emSkFTswnpptz-8UkpCgeCwnlMuSX-s79QRQu_Q-pK7oAQkbF6MGWLhmdGy65t7rC8cbdrhjA' },
    { id: 2, name: '滨江森林步道', users: '856', rating: '4.8', tag: '风景优美', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYEhL3vUas79FmWihHpVFIUTc3meTRF0LdQ7XHXvumLh-0LCowno_XNj_r9f4RNZ3Ai3RM89SojZi6cX9N1rnIoJsEuPQ9GP2NJdsVDtugRx8XjmMtXCFK3m-9nZhF3400IOQ3A_zyWEZRKPodwZ1M3vaxVe7sDMgjShaLW07nUoYgB-RIUZaIHcEakvhYSmKdoRmG4st3zaO1rNPjyu3A0MUXDE84EA0eqcCYjLoY5nViqJvITyWHDrljxLg6bDTjxT_u6LaUXtM' },
    { id: 3, name: '徐汇滨江跑道', users: '2.4k', rating: '4.9', tag: '夜跑圣地', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiiSoExBK2jXS0HQYH8jfmvTPLHjRaqq7_6EtD5fsZYdvgq0KcfXlAD219giJw5g3E5wyHFFoM_Ctegyqn1SgpzWmYzXTtVw7rukNoSOMS0Lr0niL5h66Pu5fWeCT0EHifQTYmebX0XOXo0EX8uGt9nUoT2MHCEBquBLwx9lr2lMiCBDM73AHIqjoYPgnu1_9xkfSc4tV2E-PeZLHFIEIDEkPilKgytDnrpJYqB1vFzdi_k9QNJIB6ISouI1mwlDMTxcQhlA7Sg9w' }
  ];

  const handlePublish = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsPublishing(false);
      setPostText('');
      setSelectedTags([]);
      alert('动态发布成功！');
    }, 1500);
  };

  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto min-h-screen bg-android-bg-light dark:bg-android-bg-dark relative">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-black/5">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">groups</span>
            <h1 className="text-xl font-black tracking-tight">社区广场</h1>
          </div>
          <button onClick={() => setIsPublishing(true)} className="size-10 rounded-full flex items-center justify-center bg-primary text-white shadow-lg active:scale-90 transition-all">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <nav className="flex px-4 gap-6 overflow-x-auto no-scrollbar">
          {['精选', '动态', '附近'].map((tab, i) => (
            <button key={tab} className={`pb-3 pt-1 text-sm font-black transition-all border-b-2 ${i === 0 ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}>{tab}</button>
          ))}
        </nav>
      </header>

      <main className="space-y-6 pt-4">
        <section>
          <div className="px-4 mb-4 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">附近热门打卡</h2>
          </div>
          <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar snap-x">
            {hotSpots.map((spot) => (
              <div key={spot.id} className="flex-shrink-0 w-64 snap-center">
                <div className="relative h-40 rounded-2xl overflow-hidden mb-2 border border-black/5 shadow-sm">
                  <img src={spot.img} className="w-full h-full object-cover" alt={spot.name} />
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] fill-1 text-amber-400">star</span>{spot.rating}
                  </div>
                </div>
                <h4 className="font-bold text-sm px-1">{spot.name}</h4>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-1">
          <div className="px-4 mb-2"><h2 className="text-xs font-black uppercase tracking-widest text-gray-400">精彩瞬间</h2></div>
          <article className="p-4 bg-white dark:bg-[#1e1e1e] border-y border-black/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzb8uj8Pe6eSPa99eAhd5x7Guh_512Deh6QiRoe_k16iqit_MQhkRetRqTgxXlBy1MdcUP5FHJie9-pc-wtFk1Ocvc0Ib9RVFOKDZCZu2BuzN3w7Wk3NTDf4Y7icoiYHxybIUIW-HYqNNxIOfKxRMmGHyrTTZ181VRNZB82W0_4f59XOJB8oQUQ39enAyd8d77_-9gNrwtlrfPIEgDxN0eXJeHz0aiarbOS70M5GlebCsIzfwIrl-832U3NemedLZ1ZW6THvFghbo")' }}></div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">Sarah Jenkins</h3>
                <p className="text-[10px] text-gray-400 font-bold">打卡：世纪公园环线 • 2小时前</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">今天的环线状态极佳！晨跑虽然冷，但空气太新鲜了。🏃‍♀️✨</p>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 mb-4">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiiSoExBK2jXS0HQYH8jfmvTPLHjRaqq7_6EtD5fsZYdvgq0KcfXlAD219giJw5g3E5wyHFFoM_Ctegyqn1SgpzWmYzXTtVw7rukNoSOMS0Lr0niL5h66Pu5fWeCT0EHifQTYmebX0XOXo0EX8uGt9nUoT2MHCEBquBLwx9lr2lMiCBDM73AHIqjoYPgnu1_9xkfSc4tV2E-PeZLHFIEIDEkPilKgytDnrpJYqB1vFzdi_k9QNJIB6ISouI1mwlDMTxcQhlA7Sg9w" alt="Activity" />
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-gray-400"><span className="material-symbols-outlined text-xl">favorite</span><span className="text-xs font-bold">24</span></button>
              <button className="flex items-center gap-1.5 text-gray-400"><span className="material-symbols-outlined text-xl">chat_bubble</span><span className="text-xs font-bold">8</span></button>
            </div>
          </article>
        </section>
      </main>

      {/* Publish Bottom Sheet */}
      {isPublishing && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !isUploading && setIsPublishing(false)}></div>
          <div className="bg-white dark:bg-[#1e1e1e] w-full rounded-t-[32px] p-6 z-10 shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mx-auto mb-8"></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">记录此刻</h2>
              <button onClick={handlePublish} disabled={!postText.trim() || isUploading} className={`px-6 py-2 rounded-full font-black text-sm transition-all ${postText.trim() ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                {isUploading ? '正在发布...' : '发布'}
              </button>
            </div>
            <textarea autoFocus value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="分享跑步感受..." className="w-full bg-transparent border-none focus:ring-0 text-lg h-32 mb-6 dark:text-gray-100" />
            
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="aspect-square bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-3xl mb-1">add_a_photo</span>
                <span className="text-[10px] font-black uppercase">自拍</span>
              </div>
              <div className="aspect-square bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-3xl mb-1">image</span>
                <span className="text-[10px] font-black uppercase">风景</span>
              </div>
              <div className="aspect-square bg-primary/10 rounded-2xl border-2 border-primary/20 flex flex-col items-center justify-center text-primary active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-3xl mb-1">map</span>
                <span className="text-[10px] font-black uppercase">路线数据</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3"><span className="material-symbols-outlined text-gray-400">location_on</span><span className="text-sm font-bold">同步位置：上海</span></div>
              <div className="w-8 h-4 bg-primary/20 rounded-full relative"><div className="absolute right-0.5 top-0.5 size-3 bg-primary rounded-full"></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityView;
