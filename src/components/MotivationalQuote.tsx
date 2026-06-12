import React, { useState, useEffect } from 'react';

// تعريف الـ Interface الخاص ببنية العبارة والمصدر لـ TypeScript
interface QuoteItem {
  text: string;
  source: string;
}

// مصفوفة العبارات والآيات التحفيزية محدثة بالمصادر بدقة
const motivationalQuotes: QuoteItem[] = [
  { text: "«وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ»", source: "سورة النجم، الآية 39" },
  { text: "«إِنَّا لَا نُضِيعُ أَجْرَ مَنْ أَحْسَنَ عَمَلًا»", source: "سورة الكهف، الآية 30" },
  { text: "«فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ»", source: "سورة آل عمران، الآية 159" },
  { text: "«وَقُل رَّبِّ زِدْنِي عِلْمًا»", source: "سورة طه، الآية 114" },
  { text: "«وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ»", source: "سورة الطلاق، الآيات 2-3" },
  { text: "«وَفِي سَمَائِكُمْ رِزْقُكُمْ وَمَا تُوعَدُونَ»", source: "سورة الذاريات، الآية 22" },
  { text: "«وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا»", source: "سورة العنكبوت، الآية 69" },
  { text: "«لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ»", source: "سورة إبراهيم، الآية 7" },
  { text: "«فَاصْبِرْ صَبْرًا جَمِيلًا»", source: "سورة المعارج، الآية 5" },
  { text: "«وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا»", source: "سورة الطور، الآية 48" },
  { text: "«إِنَّ مَعَ الْعُسْرِ يُسْرًا»", source: "سورة الشرح، الآية 6" },
  { text: "«وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ»", source: "سورة آل عمران، الآية 133" },
  { text: "«يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ»", source: "سورة المجادلة، الآية 11" },
  { text: "«وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ»", source: "سورة المطففين، الآية 26" },
  { text: "«إِنَّ اللهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ»", source: "الحديث الشريف، رواه الطبراني" },
  { text: "«احْرِصْ عَلَى مَا يَنْفَعُكَ، وَاسْتَعِنْ بِاللَّهِ وَلَا تَعْجِزْ»", source: "الحديث الشريف، رواه مسلم" },
  { text: "«الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ»", source: "الحديث الشريف، رواه مسلم" },
  { text: "«لَوْ أَنَّكُمْ تَوَكَّلْتُمْ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ»", source: "الحديث الشريف، رواه الترمذي" },
  { text: "«طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ»", source: "الحديث الشريف، رواه ابن ماجه" },
  { text: "«إِنَّمَا العِلْمُ بِالتَّعَلُّمِ، وَإِنَّمَا الحِلْمُ بِالتَّحَلُّمِ»", source: "الحديث الشريف، رواه الخطيب البغدادي" },
  { text: "«مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»", source: "الحديث الشريف، رواه مسلم" },
  { text: "«الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى»", source: "الحديث الشريف، رواه البخاري ومسلم" },
  { text: "«بَكِّرُوا فِي طَلَبِ الرِّزْقِ وَالْحَوَائِجِ، فَإِنَّ الْغُدُوَّ بَرَكَةٌ وَنَجَاحٌ»", source: "حديث شريف، رواه الطبراني" },
  { text: "«نِعِمَّا بالمال الصالح للرجل الصالح.»", source: "الحديث الشريف، رواه أحمد" },
  { text: "«تفقَّهوا قبل أن تسودوا.»", source: "عمر بن الخطاب رضي الله عنه" },
  { text: "«العلم يحرسك وأنت تحرس المال، والعلم زكاة العمل والمال تنقصه النفقة.»", source: "علي بن أبي طالب رضي الله عنه" },
  { text: "«أصلح نفسك يصلح لك الناس.»", source: "أبو بكر الصديق رضي الله عنه" },
  { text: "«لو كان الصبر رجلاً لكان كريماً، واعلموا أن بالصبر تُنال الأمور.»", source: "علي بن أبي طالب رضي الله عنه" },
  { text: "«إني لأرى الرجل فيعجبني، فإذا قيل: لا حرفة له، سقط من عيني.»", source: "عمر بن الخطاب رضي الله عنه" },
  { text: "«ما ندمت على سكوتي مرة، ولكني ندمت على الكلام مراراً.»", source: "عمر بن الخطاب رضي الله عنه" },
  { text: "«قيمة كل امرئ ما يحسنه.»", source: "علي بن أبي طالب رضي الله عنه" },
  { text: "«العجز مصيبة، والصبر شجاعة، والزهد ثروة، والورع جنة.»", source: "علي بن أبي طالب رضي الله عنه" },
  { text: "«لو سلك الناس وادياً، وسلكت التقوى وادياً, لتتبعت وادي التقوى»", source: "أبو بكر الصديق رضي الله عنه" },
  { text: "«ليس الخير أن يكثر مالك وولدك، ولكن الخير أن يكثر علمك وعملك»", source: "علي بن أبي طالب رضي الله عنه" },
  { text: "«مَن بورِكَ له في شيءٍ فليَلزَمْه»", source: "عمر بن الخطاب رضي الله عنه" },
  { text: "المال خادمٌ جيّد، لكنّه سيّدٌ فاسد.", source: "فرانسيس بيكون" },
  { text: "لا تدخر ما يتبقى بعد الإنفاق، بل أنفق ما يتبقى بعد الادخار والاستثمار.", source: "وارن بافيت" },
  { text: "Thراء لا يتعلق بمدى ما تجنيه من مال، بل بمدى ما تحتفظ به وكيف يخدم مستقبلك.", source: "روبرت كيوساكي" },
  { text: "إن كنت لا تجد طريقة لكسب المال وأنت نائم، فستظل تعمل حتى تموت.", source: "وارن بافيت" },
  { text: "المستثمر الذكي لا يشتري الأصول لكي يبيعها، بل يشتري الأصول لكي تُدرّ عليه عائداً مستمراً.", source: "ثقافة مالية" },
  { text: "التجارة والعمل الحر تسعة أعشار الرزق، والجرأة فيهما مفتاح الوفرة.", source: "أثر مأثور" },
  { text: "إذا أردت الثراء، ركّز على بناء الأنظمة وليس مجرد تبادل وقتك بالمال.", source: "حكمة معاصرة" },
  { text: "الثراء لا يقاس بحجم ما تمتلكه من مال، بل بقدرتك على العيش دونه بأمان.", source: "حكمة في الذكاء المالي" },
  { text: "الاستثمار في المعرفة يحقق دائماً أفضل العوائد المالية.", source: "بنجامين فرانكلين" },
  { text: "الأغنياء يستثمرون في الأصول التي تدر دخلاً، والفقراء يستثمرون في الالتزامات.", source: "روبرت كيوساكي" },
  { text: "السر في كسب المال هو معرفة شيء لا يعرفه أحد غيرك.", source: "أرسطو أوناسيس" },
  { text: "التجارة والعمل الحر هما الباب الأوسع لبناء ثراء مستدام.", source: "فلسفة اقتصادية" },
  { text: "المال ليس غاية، بل أداة تمنحك الحرية لتصنع خياراتك الخاصة.", source: "تطوير مالي" },
  { text: "الجمال في البرمجة ليس في تعقيد الكود، بل في بساطة الحل.", source: "حكمة برمجية" },
  { text: "كل كود عظيم بدأ بفكرة بسيطة ومحاولة مستمرة.", source: "مقولة مأثورة" },
  { text: "التميز هو أن تؤدي عملك اليوم بشكل أفضل مما فعلته بالأمس.", source: "تطوير الذات" },
  { text: "الخطأ البرمجي ليس نهاية الطريق، بل هو أول خيط للوصول إلى الحل الصحيح.", source: "ثقافة المطورين" },
  { text: "تعلّم القواعد كالمحترفين، حتى تتمكن من كسرها كالفنانين.", source: "بابلو بيكاسو" },
  { text: "أفضل طريقة للتنبؤ بالمستقبل هي أن تخترعه وتبرمجه بنفسك.", source: "آلان كاي" },
  { text: "“The only way to do great work is to love what you do.”", source: "Steve Jobs" },
  { text: "“It always seems impossible until it's done.”", source: "Nelson Mandela" },
  { text: "“Don't watch the clock; do what it does. Keep going.”", source: "Sam Levenson" },
  { text: "“Opportunities don't happen, you create them.”", source: "Chris Grosser" },
  { text: "“Your time is limited, so don't waste it living someone else's life.”", source: "Steve Jobs" },
  { text: "“An investment in knowledge pays the best interest.”", source: "Benjamin Franklin" },
  { text: "“Formal education will make you a living; self-education will make you a fortune.”", source: "Jim Rohn" },
  { text: "“Compound interest is the eighth wonder of the world. He who understands it, earns it.”", source: "Albert Einstein" },
  { text: "“The safe path rarely leads to a financial freedom.”", source: "Robert Kiyosaki" },
  { text: "“Simplicity is the ultimate sophistication.”", source: "Leonardo da Vinci" },
  { text: "“Quality means doing it right when no one is looking.”", source: "Henry Ford" },
  { text: "“Code is like humor. When you have to explain it, it’s bad.”", source: "Cory House" },
  { text: "“It’s not whether you get knocked down, it’s whether you get up.”", source: "Vince Lombardi" },
  { text: "“Never depend on a single income. Make an investment to create a second source.”", source: "Warren Buffett" },
  { text: "“Do not look for compounding in money only; compound your skills first.”", source: "Financial Wisdom" }
];

export default function MotivationalQuote(): React.JSX.Element {
  // تحديد نوع الـ State ليكون إما كائن QuoteItem أو null عند التحميل
  const [quoteItem, setQuoteItem] = useState<QuoteItem | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuoteItem(motivationalQuotes[randomIndex]);
  }, []);

  return (
    <div className="col-span-2 p-3 bg-sys-light-surface dark:bg-sys-dark-surface rounded-m3-lg border border-gray-200 dark:border-gray-800 text-center transition-all duration-300 flex flex-col items-center justify-center gap-1">
      {/* نص العبارة أو الآية الكريمة */}
      <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 italic font-sans antialiased tracking-wide leading-relaxed">
        {quoteItem ? quoteItem.text : "جاري جلب الإلهام..."}
      </p>
      
      {/* المصدر يظهر بخط أصغر ولون هادئ ليحافظ على جمالية التصميم */}
      {quoteItem && (
        <span className="text-[10px] sm:text-xs font-sans text-sys-light-primary/70 dark:text-sys-dark-primary/70 opacity-80 mt-0.5">
           — {quoteItem.source}
        </span>
      )}
    </div>
  );
}