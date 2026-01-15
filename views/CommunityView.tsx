
import React from 'react';

const CommunityView: React.FC = () => {
  return (
    <div className="flex flex-col pb-24 max-w-md mx-auto">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e8d5ce]/40">
        <div className="flex items-center p-4 justify-between">
          <span className="material-symbols-outlined">search</span>
          <h1 className="text-lg font-black tracking-tight">社区动态</h1>
          <button className="relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 size-2 rounded-full bg-primary ring-2 ring-white"></span>
          </button>
        </div>
        <nav className="flex px-4 gap-8">
          {['关注', '俱乐部', '活动'].map((tab, i) => (
            <button key={tab} className={`pb-3 pt-2 text-sm font-bold tracking-wide transition-all border-b-[3px] ${i === 0 ? 'border-primary text-black' : 'border-transparent text-[#9c5e49]'}`}>
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="space-y-6">
        {/* Post 1 */}
        <article className="p-4 border-b border-[#e8d5ce]/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzb8uj8Pe6eSPa99eAhd5x7Guh_512Deh6QiRoe_k16iqit_MQhkRetRqTgxXlBy1MdcUP5FHJie9-pc-wtFk1Ocvc0Ib9RVFOKDZCZu2BuzN3w7Wk3NTDf4Y7icoiYHxybIUIW-HYqNNxIOfKxRMmGHyrTTZ181VRNZB82W0_4f59XOJB8oQUQ39enAyd8d77_-9gNrwtlrfPIEgDxN0eXJeHz0aiarbOS70M5GlebCsIzfwIrl-832U3NemedLZ1ZW6THvFghbo")' }}></div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">Sarah Jenkins</h3>
              <p className="text-xs text-[#9c5e49]">晨间越野跑 • 2小时前</p>
            </div>
            <button><span className="material-symbols-outlined text-gray-400">more_horiz</span></button>
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 mb-4">
            <div className="absolute inset-0 bg-cover opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiiSoExBK2jXS0HQYH8jfmvTPLHjRaqq7_6EtD5fsZYdvgq0KcfXlAD219giJw5g3E5wyHFFoM_Ctegyqn1SgpzWmYzXTtVw7rukNoSOMS0Lr0niL5h66Pu5fWeCT0EHifQTYmebX0XOXo0EX8uGt9nUoT2MHCEBquBLwx9lr2lMiCBDM73AHIqjoYPgnu1_9xkfSc4tV2E-PeZLHFIEIDEkPilKgytDnrpJYqB1vFzdi_k9QNJIB6ISouI1mwlDMTxcQhlA7Sg9w")' }}></div>
            <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 200 100">
              <path d="M10 80C30 70 50 90 70 60C90 30 120 40 150 20C170 10 190 30 190 50" stroke="#f45925" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
            <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase">霞慕尼隘口</div>
          </div>
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {[{l:'距离',v:'12.4',u:'公里'}, {l:'配速',v:'5:12',u:'/公里'}, {l:'海拔爬升',v:'450',u:'米'}].map(s => (
              <div key={s.l} className="flex-1 min-w-[100px] bg-card-light p-3 rounded-lg border border-[#e8d5ce]">
                <p className="text-[10px] font-bold text-[#9c5e49] uppercase mb-1">{s.l}</p>
                <p className="text-lg font-black">{s.v} <span className="text-[10px]">{s.u}</span></p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#9c5e49]">favorite</span><span className="text-sm font-bold">24</span></button>
              <button className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#9c5e49]">chat_bubble</span><span className="text-sm font-bold">8</span></button>
              <button><span className="material-symbols-outlined text-[#9c5e49]">share</span></button>
            </div>
            <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full active:scale-95 transition-all">点赞</button>
          </div>
        </article>

        {/* Recommendations */}
        <section className="py-6 bg-[#fcf9f8] border-y border-[#e8d5ce]/30">
          <div className="flex justify-between items-center px-4 mb-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-[#9c5e49]">推荐俱乐部</h2>
            <button className="text-primary text-xs font-bold">查看全部</button>
          </div>
          <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar">
            {[
              { title: '巅峰探索者', mems: '4,200', icon: 'terrain', bg: 'accent-teal' },
              { title: '都市竞速家', mems: '1,800', icon: 'speed', bg: 'primary' }
            ].map(club => (
              <div key={club.title} className="flex-shrink-0 w-48 bg-white p-4 rounded-xl border border-[#e8d5ce] shadow-sm">
                <div className={`size-12 rounded-lg bg-${club.bg}/20 flex items-center justify-center mb-3`}>
                  <span className={`material-symbols-outlined text-${club.bg}`}>{club.icon}</span>
                </div>
                <h4 className="font-bold text-sm mb-1">{club.title}</h4>
                <p className="text-[10px] text-[#9c5e49] mb-4">{club.mems} 成员 • 当地</p>
                <button className="w-full py-2 rounded-lg border-2 border-primary text-primary text-[10px] font-black uppercase tracking-widest active:bg-primary/10 transition-colors">加入俱乐部</button>
              </div>
            ))}
          </div>
        </section>

        {/* Post 2 */}
        <article className="p-4">
           <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgWPrCe_zD0UyHnpv6NBqpYWjyBIyOJLpAvwwodBk7pg3fTxdtcpUOFlVDrwMf4vRHkqo9T_gyDou1Kzo84XFP46q1IUv0ItWU4smh1yFyQTBvaXcsue8cMP1dotyvlCY4jdXBiuLrb9zTA5GQZKPWzZEvYeknA9wiscgR1BXX-OascTxj3el1F_-JsFx9lsOAR6lwMFShOE2J_9SjpMxo9bE7XfjXpoY9H8p1MCeEgYGhtZKW43uwPMvrTsyQDKVXs1CB0QGYoYM")' }}></div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">Marcus Chen</h3>
              <p className="text-xs text-[#9c5e49]">落日之巅徒步 • 5小时前</p>
            </div>
            <button><span className="material-symbols-outlined text-gray-400">more_horiz</span></button>
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-square mb-4">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6iNpX93_frKzMtttPJ2ifpl3c3f0vvf3brYKUs-CW_w_3v-qVxr9GpYVKW-Z0HPsWq9-fjzUQOQxdivN2oEFeMDlAKYEValWMRIZzPXOSw7zLxia3pXky9icAnX6mZ3RpkYWQyo8SeEh6noQxE_-xVpOjZ3wLVJBhiaKnB8gR1Kt-10pjGut--Z6ablldNQvjx3UFZPsNv7IJVu1cZvTP6TP-EovnQLM-d-j1FYVVLxGeC6QjvEXhlpfXzOvg7aCtCriq2v1YsWs" alt="Activity" />
            <div className="absolute bottom-4 left-4">
              <div className="bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">elevation</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">1,240米 山峰</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
             <div className="flex gap-4">
              <button className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#9c5e49]">favorite</span><span className="text-sm font-bold">152</span></button>
              <button className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#9c5e49]">chat_bubble</span><span className="text-sm font-bold">14</span></button>
            </div>
            <button className="bg-card-light text-black text-xs font-bold px-4 py-2 rounded-full">查看冒险详情</button>
          </div>
        </article>
      </main>
    </div>
  );
};

export default CommunityView;
