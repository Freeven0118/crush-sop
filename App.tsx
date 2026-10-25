
import React, { useState, useEffect } from 'react';
import { HERO_CONTENT, SOP_MINDSET, PHOTO_EXAMPLES, BIO_EXAMPLES, CTA_CONTENT } from './constants';

// Helper component to parse *text* as highlighted text
// mode: 'light' (default, for light bg) -> Amber-500 (Matches "鑽石三原則" color)
// mode: 'dark' (for dark bg) -> Bright Amber (for pop on dark)
const HighlightText: React.FC<{ text: string; mode?: 'light' | 'dark' }> = ({ text, mode = 'light' }) => {
  if (!text) return null;
  // Split by *keyword*
  const parts = text.split(/\*(.*?)\*/g);
  
  // 淺色底改回 amber-500 (與標題一致)，深色底維持 amber-400 (較亮)
  const highlightColor = mode === 'dark' ? 'text-amber-400' : 'text-amber-500';

  return (
    <>
      {parts.map((part, index) => 
        index % 2 === 1 ? (
          <span key={index} className={`${highlightColor} font-bold mx-0.5`}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // 總步驟數定義：
  // 0: Hero
  // 1: Author
  // 2: Mindset
  // 3: Photo Principle 1
  // 4: Photo Principle 2 (Ex 1)
  // 5: Photo Principle 2 (Ex 2)
  // 6: Photo Principle 3
  // 7: Bio 1
  // 8: Bio 2
  // 9: Bio 3
  // 10: CTA
  const totalSteps = 11;

  // 每次切換步驟時回到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(c => c + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  // 進度條計算
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-200">
      
      {/* 頂部導航與進度條 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="h-1.5 bg-slate-100 w-full">
          <div 
            className="h-full bg-amber-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
           <span className="font-bold text-slate-500 text-lg md:text-xl tracking-widest uppercase">
             SOP 攻略 | {currentStep === 0 ? 'START' : `Step ${currentStep}/${totalSteps - 1}`}
           </span>
           <div className="flex gap-3">
             {currentStep > 0 && (
               <button onClick={prevStep} className="px-6 py-2 text-lg font-bold text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                 上一頁
               </button>
             )}
           </div>
        </div>
      </div>

      <main className="pt-24 md:pt-32 min-h-[100vh] flex flex-col pb-16">
        
        {/* STEP 0: Hero (Light BG) */}
        {currentStep === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center px-6 animate-fade-in py-10">
            <div className="max-w-5xl mx-auto text-center space-y-10">

              <h1 className="text-4xl md:text-7xl font-display font-black text-slate-900 tracking-tight leading-tight whitespace-nowrap md:whitespace-normal">
                {HERO_CONTENT.title}
                <span className="block text-2xl md:text-4xl text-slate-500 font-bold mt-4 font-sans leading-normal whitespace-pre-line">
                  {HERO_CONTENT.subtitle}
                </span>
              </h1>

              {/* Hero Image - Added */}
              {HERO_CONTENT.heroImage && (
              <div className="w-full max-w-4xl mx-auto my-6 md:my-10">
                <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
                   <img
                     src={HERO_CONTENT.heroImage}
                     alt="Hero"
                     className="w-full h-56 md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                   />
                </div>
              </div>
              )}

              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                <HighlightText text={HERO_CONTENT.description} mode="light" />
              </p>
              
              <div className="pt-4 md:pt-8 w-full flex justify-center">
                <button 
                  onClick={nextStep}
                  className="group relative w-full md:w-auto inline-flex items-center justify-center px-12 py-6 text-2xl md:text-3xl font-bold text-white transition-all duration-200 bg-slate-900 font-display rounded-full focus:outline-none hover:bg-amber-500 hover:scale-105 hover:shadow-2xl hover:translate-y-[-4px]"
                >
                  展開文章
                  <svg className="w-8 h-8 ml-4 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Author (Light BG) */}
        {currentStep === 1 && (
          <div className="max-w-6xl mx-auto px-6 animate-fade-in py-4 md:py-10 flex flex-col h-full">
            <div className="text-center space-y-4 mb-10 shrink-0">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                 在開始之前，<br className="md:hidden" />簡單自我介紹。
               </h2>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-12 gap-10 items-center md:items-start">
              
              {/* Image Section */}
              <div className="w-full md:col-span-5 relative shrink-0">
                 <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-[-2deg] md:rotate-[-3deg] transform transition hover:rotate-0 duration-500 mx-auto">
                    <img 
                       src={HERO_CONTENT.authorImage} 
                       alt={HERO_CONTENT.authorName} 
                       className="w-full h-auto object-contain bg-slate-100" 
                    />
                 </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:col-span-7 flex flex-col justify-center space-y-8 md:pt-10">
                 <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900">{HERO_CONTENT.authorName}</h3>
                    <p className="text-amber-600 font-bold text-xl whitespace-pre-line">{HERO_CONTENT.authorTitle}</p>
                 </div>

                 <div className="relative bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
                    <span className="absolute -top-6 -left-4 text-8xl text-amber-200 font-serif leading-none">“</span>
                    <p className="relative z-10 text-lg md:text-xl text-slate-700 font-medium leading-relaxed text-justify whitespace-pre-line">
                       <HighlightText text={HERO_CONTENT.authorBio} mode="light" />
                    </p>
                 </div>
                 
                 <div className="flex justify-center md:justify-end pt-4 pb-8 md:pb-0">
                    <button 
                      onClick={nextStep} 
                      className="w-full md:w-auto group flex justify-center items-center gap-4 px-10 py-5 bg-slate-900 rounded-full text-white text-xl md:text-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      <span>準備好了，進入 SOP 1</span>
                      <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Mindset (Dark BG) */}
        {currentStep === 2 && (
          <div className="flex-1 flex flex-col justify-center items-center px-6 animate-fade-in bg-slate-900 text-white min-h-[85vh] w-full pt-10 pb-16">
            <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
              <div className="space-y-6">
                <span className="inline-block px-6 py-2 bg-amber-500 text-slate-900 rounded font-black tracking-wider text-xl">SOP 1：心態建設</span>
                <h2 className="text-4xl md:text-6xl font-black">{SOP_MINDSET.subtitle}</h2>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-10 md:p-14 rounded-[2.5rem] border border-white/20 shadow-2xl">
                 <p className="text-xl md:text-2xl font-bold leading-relaxed text-slate-200 whitespace-pre-line text-left">
                   <span className="text-amber-300 text-4xl mr-2 block mb-4">“</span>
                   <HighlightText text={SOP_MINDSET.quote} mode="dark" />
                 </p>
              </div>

              <div className="bg-slate-800 p-10 rounded-[2rem] border border-slate-700 shadow-xl text-left space-y-6">
                {/* Removed the extra lightbulb icon to focus on the numbered list */}
                <div className="space-y-6">
                    {SOP_MINDSET.points.map((point, i) => (
                    <p key={i} className="font-bold text-lg md:text-xl leading-relaxed text-amber-50 pl-2">
                        <HighlightText text={point} mode="dark" />
                    </p>
                    ))}
                </div>
              </div>

              <div className="pt-10 w-full flex justify-center">
                <button onClick={nextStep} className="w-full md:w-auto px-14 py-6 bg-white text-slate-900 text-2xl md:text-3xl font-black rounded-full hover:bg-slate-200 transition-colors shadow-lg hover:shadow-white/20">
                  心態建立完畢，下一步
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3, 4, 5, 6: Photo Principles (Mixed BG) */}
        {(currentStep >= 3 && currentStep <= 6) && (
          <div className="max-w-6xl mx-auto px-6 animate-fade-in space-y-12 pb-24 w-full">
            {/* Header only for the first photo step */}
            {currentStep === 3 && (
               <div className="text-center space-y-8 mb-14 animate-slide-down">
                 <div className="inline-block px-6 py-3 bg-slate-900 text-white rounded-full text-lg font-bold tracking-wider">SOP 2</div>
                 <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                   高配對率照片的<br/>
                   <span className="text-amber-500">鑽石三原則</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                   照片是交友軟體中最重要的資產，能否配對幾乎99%取決於照片。<br/><br/>
                   這也是為什麼9成以上的男性在玩交友軟體時感到非常挫敗的原因，因為他們放的照片毫無方法與策略。
                 </p>
               </div>
            )}
            
            {/* Sub-header for subsequent steps */}
            {currentStep > 3 && (
               <div className="text-center space-y-3 mb-10 animate-fade-in">
                  <span className="text-slate-400 font-bold text-lg tracking-widest uppercase">SOP 2 / PHOTO STRATEGY</span>
                  <div className="h-1.5 w-16 bg-amber-400 mx-auto rounded-full"></div>
               </div>
            )}

            {/* Dynamic Content based on step */}
            {(() => {
              const photoIndex = currentStep - 3; // 0, 1, 2, 3
              const example = PHOTO_EXAMPLES[photoIndex];
              
              return (
                <div className="space-y-10 p-6 md:p-12 bg-white rounded-[3rem] shadow-xl border border-slate-100">
                  <div className="flex flex-col gap-6 border-b border-slate-100 pb-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl md:text-4xl font-black text-slate-800 border-l-[10px] border-amber-400 pl-6 whitespace-pre-line leading-tight">
                        {example.title}
                        </h3>
                    </div>
                    {example.intro && (
                        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl">
                            {/* Intro is light bg */}
                            <HighlightText text={example.intro} mode="light" />
                        </p>
                    )}
                  </div>
                  
                  {/* Contrast Cards */}
                  <div className="grid md:grid-cols-2 gap-10 md:gap-14">
                    
                    {/* OK Card */}
                    <div className="space-y-6 order-1 md:order-1">
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-blue-100 aspect-[4/5] md:aspect-square">
                        <div className="absolute top-5 left-5 z-10 bg-green-600 text-white px-6 py-3 rounded-full font-black text-xl shadow-md">
                          ✅ 正確示範 (DOs)
                        </div>
                        <div className="w-full h-full bg-white flex items-center justify-center">
                           <img src={example.goodImage} className={`w-full h-full ${example.goodImagePosition ? 'object-cover' : 'object-contain'}`} style={example.goodImagePosition ? { objectPosition: example.goodImagePosition } : undefined} alt="Good Example" />
                        </div>
                      </div>
                      <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 h-auto">
                        <ul className="space-y-6">
                          {example.goodPoints.map((p, i) => (
                            <li key={i} className="text-lg md:text-xl text-slate-800 font-bold flex items-start text-pretty leading-relaxed">
                               {/* Cards are light bg */}
                               <span><HighlightText text={p} mode="light" /></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* NG Card */}
                    <div className="space-y-6 order-2 md:order-2">
                      <div className="relative rounded-3xl overflow-hidden shadow-lg bg-slate-100 group aspect-[4/5] md:aspect-square">
                        <div className="absolute top-5 left-5 z-10 bg-red-600 text-white px-6 py-3 rounded-full font-black text-xl shadow-md">
                          ❌ 錯誤示範 (DON'Ts)
                        </div>
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                            <img src={example.badImage} className="w-full h-full object-contain" alt="Bad Example" />
                        </div>
                      </div>
                      <div className="p-8 bg-red-50 rounded-3xl border border-red-100 h-auto">
                        <ul className="space-y-6">
                          {example.badPoints.map((p, i) => (
                            <li key={i} className="text-lg md:text-xl text-slate-900 font-medium flex items-start text-pretty leading-relaxed">
                               {/* Changed to slate-900 for darker text */}
                               <span><HighlightText text={p} mode="light" /></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>

                  {/* Coach's Comment (Dark BG) */}
                  <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-lg flex flex-col md:flex-row gap-8 items-start">
                    <div className="text-6xl shrink-0 text-amber-400 drop-shadow-lg pt-2">💡</div>
                    <div className="space-y-6 w-full">
                      <h4 className="text-amber-400 font-black text-xl md:text-2xl uppercase tracking-wider border-b border-amber-400/30 pb-2 inline-block">
                        教練 SOP 點評
                      </h4>
                      <p className="text-lg md:text-xl font-medium leading-relaxed text-justify md:text-left whitespace-pre-line">
                        <HighlightText text={example.coachComment} mode="dark" />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
            
            <div className="flex justify-center pt-10">
               <button onClick={nextStep} className="w-full md:w-auto px-14 py-6 bg-amber-500 hover:bg-amber-400 text-slate-900 text-2xl md:text-3xl font-black rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                 {currentStep === 6 ? '照片部分結束，進入自介攻略' : '了解，下一個原則'}
               </button>
            </div>
          </div>
        )}

        {/* STEP 7, 8, 9: Bio Examples (Mixed BG) */}
        {(currentStep >= 7 && currentStep <= 9) && (
          <div className="max-w-5xl mx-auto px-6 animate-fade-in space-y-12 pb-24 w-full">
             {currentStep === 7 && (
               <div className="text-center space-y-8 mb-14 animate-slide-down">
                 <div className="inline-block px-6 py-3 bg-slate-900 text-white rounded-full text-lg font-bold tracking-wider">SOP 3</div>
                 <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                   自我介紹的<br className="md:hidden" />
                   <span className="text-amber-500">黃金公式</span>
                 </h2>
                 <div className="max-w-4xl mx-auto space-y-8">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-bold">
                       自我介紹是女生看到你的照片、對你產生初步興趣之後，留下來更認識你的地方。
                    </p>
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 md:p-8 inline-block shadow-sm">
                       <span className="block text-xl md:text-2xl font-black text-amber-500 mb-4 text-left">★ 黃金公式：</span>
                       <span className="block text-lg md:text-2xl font-bold text-slate-700 leading-relaxed text-left">
                          [專業/身份] + [熱情/興趣細節] 
                          <br className="block mt-2"/>
                          + [最近在做的事情 / 想挑戰的事情]
                       </span>
                    </div>
                 </div>
               </div>
             )}

             {currentStep > 7 && (
               <div className="text-center space-y-3 mb-10 animate-fade-in">
                  <span className="text-slate-400 font-bold text-lg tracking-widest uppercase">SOP 3 / BIO FORMULA</span>
                  <div className="h-1.5 w-16 bg-amber-400 mx-auto rounded-full"></div>
               </div>
            )}

             {(() => {
               const bioIndex = currentStep - 7; // 0, 1, 2
               const bio = BIO_EXAMPLES[bioIndex];
               return (
                 <div className="space-y-10 animate-fade-in">
                   <div className="flex flex-col md:flex-row md:items-end gap-4 border-b pb-6 border-slate-200">
                      <span className="text-6xl md:text-8xl font-black text-slate-200 leading-none">0{bioIndex + 1}</span>
                      <h3 className="text-3xl md:text-4xl font-black text-slate-800">{bio.role}</h3>
                      <span className="text-lg md:text-xl text-amber-500 font-bold pb-2 md:ml-4">關鍵字: {bio.keywords}</span>
                   </div>

                   {bio.headerNote && (
                       <div className="bg-white border-l-8 border-amber-500 p-8 rounded-r-xl shadow-sm">
                           <p className="text-lg md:text-xl font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                               {/* Light bg */}
                               <HighlightText text={bio.headerNote} mode="light" />
                           </p>
                       </div>
                   )}

                   <div className="grid md:grid-cols-2 gap-10">
                      {/* Good Bio (Light bg) */}
                      <div className="p-8 md:p-10 rounded-3xl bg-blue-50 border-2 border-blue-200 space-y-8 shadow-xl relative overflow-hidden order-1">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-[50px] opacity-50" />
                         <div className="text-green-700 font-black text-xl md:text-2xl flex items-center gap-3 relative z-10">
                           <span>✅</span> 正確範例
                         </div>
                         <p className="whitespace-pre-line text-slate-800 font-medium text-lg md:text-xl leading-relaxed relative z-10 text-justify text-pretty">
                           <HighlightText text={bio.goodBio} mode="light" />
                         </p>
                      </div>

                      {/* Bad Bio (Light bg) */}
                      <div className="p-8 md:p-10 rounded-3xl bg-slate-100 border border-slate-200 space-y-8 order-2">
                         <div className="text-red-600 font-black text-xl md:text-2xl flex items-center gap-3">
                           <span>❌</span> NG 範例
                         </div>
                         <p className="whitespace-pre-line text-slate-600 font-mono text-lg md:text-xl leading-relaxed">
                           <HighlightText text={bio.badBio} mode="light" />
                         </p>
                      </div>
                   </div>

                   <div className="bg-slate-900 p-8 md:p-12 rounded-3xl text-white">
                      <h4 className="text-amber-400 font-black text-xl md:text-2xl uppercase tracking-wider mb-6 border-b border-white/20 pb-4 inline-block">教練的 SOP 點評</h4>
                      <p className="text-lg md:text-xl font-medium leading-relaxed whitespace-pre-line">
                        {/* Dark bg */}
                        <HighlightText text={bio.coachComment} mode="dark" />
                      </p>
                   </div>
                 </div>
               );
             })()}

             <div className="flex justify-center pt-10">
               <button onClick={nextStep} className="w-full md:w-auto px-14 py-6 bg-amber-500 hover:bg-amber-400 text-slate-900 text-2xl md:text-3xl font-black rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                 {currentStep === 9 ? '全部學會了，看總結' : '看下一個案例'}
               </button>
             </div>
          </div>
        )}

        {/* STEP 10: CTA (Dark BG) */}
        {currentStep === 10 && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in bg-slate-900 text-white min-h-[90vh] absolute top-0 w-full pt-24">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
             <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-14 text-center pb-24">
                <h2 className="text-5xl md:text-8xl font-black text-white leading-tight">{CTA_CONTENT.title}</h2>
                <div className="space-y-10">
                   <p className="text-xl md:text-3xl text-white leading-relaxed font-bold whitespace-pre-line text-justify md:text-center">
                       <HighlightText text={CTA_CONTENT.text} mode="dark" />
                   </p>
                   <div className="h-px w-24 bg-slate-700 mx-auto"></div>
                   <p className="text-xl md:text-3xl text-white leading-relaxed font-bold whitespace-pre-line text-justify md:text-center">
                       <HighlightText text={CTA_CONTENT.subtext} mode="dark" />
                   </p>
                </div>

                <a 
                  href={CTA_CONTENT.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto px-6 md:px-14 py-6 md:py-8 whitespace-nowrap bg-amber-500 hover:bg-amber-400 text-slate-900 text-xl md:text-3xl font-black rounded-full shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-1 hover:scale-105"
                >
                  {CTA_CONTENT.buttonText}
                  <svg className="w-6 h-6 md:w-10 md:h-10 ml-2 md:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>

                {/* Footer / Socials */}
                <div className="pt-16 flex flex-col items-center space-y-8">
                    <p className="text-white font-bold uppercase tracking-widest text-lg">Contact Coach</p>
                    <div className="flex justify-center items-center gap-10">
                       {CTA_CONTENT.socials.map((social, idx) => (
                          <a key={idx} href={social.link} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform duration-300">
                            {/* @ts-ignore: icon property check */}
                            {social.icon ? (
                                <img src={social.icon} alt={social.name} className="w-12 h-12 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all" />
                            ) : (
                                <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-full border border-slate-500 group-hover:bg-slate-700 group-hover:border-white transition-colors">
                                    <svg className="w-6 h-6 text-slate-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <span className="text-slate-300 text-lg font-bold group-hover:text-white transition-colors">{social.name}</span>
                          </a>
                       ))}
                    </div>
                </div>
                
                <p className="text-slate-400 text-xl mt-16">© 2024 MensPalais. All rights reserved.</p>
             </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
