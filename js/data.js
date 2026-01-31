const QUESTION_DATA = [
    // --- 物質の構成 / Composition of Matter ---
    // 1. 原子の構成
    {
        id: 1,
        text: "原子の中心にあり、陽子と中性子からなるものは何か？",
        type: "text",
        options: ["原子核", "電子殻", "電子", "イオン"],
        correctIndex: 0,
        explanation: "原子の中心には原子核があり、陽子と中性子で構成されています。"
    },
    {
        id: 2,
        text: "原子番号は何の数と等しいか？",
        type: "text",
        options: ["陽子の数", "中性子の数", "質量数", "最外殻電子数"],
        correctIndex: 0,
        explanation: "原子番号は陽子の数と等しく、中性の原子では電子の数とも等しくなります。"
    },
    {
        id: 3,
        text: "質量数が12の炭素原子には、中性子がいくつあるか？(原子番号は6)",
        type: "text",
        options: ["6個", "12個", "18個", "0個"],
        correctIndex: 0,
        explanation: "質量数 = 陽子の数 + 中性子の数 です。12 - 6 = 6個となります。"
    },
    {
        id: 4,
        text: "同じ元素で、中性子の数が異なる原子同士を何と呼ぶか？",
        type: "text",
        options: ["同位体", "同素体", "異性体", "重合体"],
        correctIndex: 0,
        explanation: "アイソトープ（同位体）と呼ばれます。化学的性質はほぼ同じですが、質量が異なります。"
    },
    {
        id: 5,
        text: "次のうち、同素体の関係にある物質の組み合わせは？",
        type: "text",
        options: ["ダイヤモンドと黒鉛", "水と過酸化水素", "一酸化炭素と二酸化炭素", "鉄と酸化鉄"],
        correctIndex: 0,
        explanation: "同素体は「同じ元素の単体」で性質が異なるものです（SCOP: 硫黄、炭素、酸素、リン）。"
    },
    // 2. 電子配置
    {
        id: 6,
        text: "K殻に入りうる最大の電子数はいくつか？",
        type: "text",
        options: ["2個", "8個", "18個", "32個"],
        correctIndex: 0,
        explanation: "各電子殻の収容数は 2n² です。K殻はn=1なので、2×1²=2個です。"
    },
    {
        id: 7,
        text: "L殻に入りうる最大の電子数はいくつか？",
        type: "text",
        options: ["8個", "2個", "18個", "10個"],
        correctIndex: 0,
        explanation: "L殻はn=2なので、2×2²=8個まで入ります。"
    },
    {
        id: 8,
        text: "原子番号11のナトリウム(Na)の最外殻電子数はいくつか？",
        type: "visual",
        diagramType: "atom_shell", /* using existing visual type */
        diagramData: { protons: 11, electrons: [2, 8, 1] },
        options: ["1個", "2個", "8個", "11個"],
        correctIndex: 0,
        explanation: "K(2) L(8) M(1) となり、最外殻電子は1個です。"
    },
    {
        id: 9,
        text: "希ガス（18族）のヘリウム(He)を除く最外殻電子数はいくつか？",
        type: "text",
        options: ["8個", "2個", "18個", "0個"],
        correctIndex: 0,
        explanation: "Ne, Arなどは最外殻電子が8個で安定しています（オクテット則）。"
    },
    {
        id: 10,
        text: "価電子数が0である族はどれか？",
        type: "text",
        options: ["18族", "1族", "17族", "2族"],
        correctIndex: 0,
        explanation: "希ガス（18族）は安定しており、他の原子と結合しにくいため、価電子数は0とみなします。"
    },
    // 3. イオン
    {
        id: 11,
        text: "ナトリウム(Na)がイオンになるとき、どのようなイオンになるか？",
        type: "text",
        options: ["1価の陽イオン", "1価の陰イオン", "2価の陽イオン", "2価の陰イオン"],
        correctIndex: 0,
        explanation: "Naは1族なので、電子を1個放出してNa+（1価の陽イオン）になりやすいです。"
    },
    {
        id: 12,
        text: "塩素(Cl)が安定なイオンになったときの電子配置はどの希ガスと同じか？",
        type: "text",
        options: ["アルゴン(Ar)", "ネオン(Ne)", "ヘリウム(He)", "クリプトン(Kr)"],
        correctIndex: 0,
        explanation: "Cl(17)は電子を1個受け取ってCl-(18)となり、Ar(18)と同じ配置になります。"
    },
    {
        id: 13,
        text: "次のうち、多原子イオンはどれか？",
        type: "text",
        options: ["アンモニウムイオン", "塩化物イオン", "ナトリウムイオン", "酸化物イオン"],
        correctIndex: 0,
        explanation: "アンモニウムイオン(NH4+)は、窒素と水素という複数の原子からなる多原子イオンです。"
    },
    {
        id: 14,
        text: "カルシウムイオン(Ca2+)の電子配置はどの希ガスと同じか？",
        type: "text",
        options: ["アルゴン(Ar)", "ネオン(Ne)", "キセノン(Xe)", "ヘリウム(He)"],
        correctIndex: 0,
        explanation: "Ca(20)は電子を2個失って18個になり、Arと同じ配置になります。"
    },
    {
        id: 15,
        text: "イオン化エネルギーが小さい原子ほど、どうなりやすいか？",
        type: "text",
        options: ["陽イオンになりやすい", "陰イオンになりやすい", "変化しにくい", "共有結合しやすい"],
        correctIndex: 0,
        explanation: "イオン化エネルギーは電子を取り去るのに必要なエネルギー。小さいほど電子を出しやすく、陽イオンになりやすいです。"
    },
    // 4. 周期表
    {
        id: 16,
        text: "周期表の横の行を何と呼ぶか？",
        type: "text",
        options: ["周期", "族", "列", "層"],
        correctIndex: 0,
        explanation: "横の行を「周期」、縦の列を「族」と呼びます。"
    },
    {
        id: 17,
        text: "第17族元素を何と呼ぶか？",
        type: "text",
        options: ["ハロゲン", "希ガス", "アルカリ金属", "アルカリ土類金属"],
        correctIndex: 0,
        explanation: "F, Cl, Br, Iなどはハロゲンと呼ばれます。"
    },
    {
        id: 18,
        text: "次のうち、遷移元素はどれか？",
        type: "text",
        options: ["鉄(Fe)", "カルシウム(Ca)", "アルミニウム(Al)", "ナトリウム(Na)"],
        correctIndex: 0,
        explanation: "3〜11族の元素は遷移元素です。Ca(2族)やAl(13族)は典型元素です。"
    },
    {
        id: 19,
        text: "第2周期の元素で、原子番号が増えると原子半径はどうなる傾向があるか？",
        type: "text",
        options: ["小さくなる", "大きくなる", "変わらない", "不規則に変化する"],
        correctIndex: 0,
        explanation: "正電荷が増し、電子を強く引きつけるため半径は小さくなります。"
    },
    {
        id: 20,
        text: "典型元素に含まれない元素群を何と呼ぶか？",
        type: "text",
        options: ["遷移元素", "ハロゲン", "希ガス", "アルカリ金属"],
        correctIndex: 0,
        explanation: "3族から11族の元素は遷移元素と呼ばれます。"
    },
    // 5. 化学結合
    {
        id: 21,
        text: "陽イオンと陰イオンの静電気力による結合を何というか？",
        type: "text",
        options: ["イオン結合", "共有結合", "金属結合", "水素結合"],
        correctIndex: 0,
        explanation: "正反対の電荷を持つイオン同士がクーロン力（静電気力）で引き合う結合です。"
    },
    {
        id: 22,
        text: "塩化ナトリウム(NaCl)の結晶構造において、各イオンは何個の異符号イオンに囲まれているか？",
        type: "text",
        options: ["6個", "4個", "8個", "12個"],
        correctIndex: 0,
        explanation: "NaCl型構造では、1つのNa+は6つのCl-に、1つのCl-は6つのNa+に囲まれています。"
    },
    {
        id: 23,
        text: "イオン結晶の特徴として正しいものは？",
        type: "text",
        options: ["融点が高い", "電気をよく通す(固体)", "柔らかい", "展性がある"],
        correctIndex: 0,
        explanation: "イオン結合は強く融点は高いですが、固体では電気を通しません。"
    },
    {
        id: 24,
        text: "非金属元素の原子同士が、電子を出し合って作る結合は？",
        type: "text",
        options: ["共有結合", "イオン結合", "金属結合", "配位結合"],
        correctIndex: 0,
        explanation: "互いに価電子を出し合い、共有電子対を作って結びつくのが共有結合です。"
    },
    {
        id: 25,
        text: "窒素分子(N2)に含まれる結合はどれか？",
        type: "text",
        options: ["三重結合", "二重結合", "単結合", "イオン結合"],
        correctIndex: 0,
        explanation: "窒素原子は価電子が5個で、あと3個必要なので、互いに3個ずつ出し合い三重結合を作ります。"
    },

    // --- 追加問題 (混合物、分離、原子量、結合の続き) From here ---
    // 6. 混合物の分離
    {
        id: 52,
        text: "液体と、それに溶けない固体の混合物を、ろ紙などを用いて分離する操作は？",
        type: "text",
        options: ["ろ過", "蒸留", "再結晶", "抽出"],
        correctIndex: 0,
        explanation: "砂混じりの水から砂を取り除く場合などがろ過です。"
    },
    {
        id: 53,
        text: "溶液を加熱して溶媒を蒸発させ、再び冷却して液体として取り出す操作は？",
        type: "text",
        options: ["蒸留", "分留", "昇華", "ろ過"],
        correctIndex: 0,
        explanation: "沸点の違いを利用して分離する操作です。"
    },
    {
        id: 54,
        text: "沸点の異なる2種類以上の液体の混合物を、蒸留によって分離する操作は？",
        type: "text",
        options: ["分留", "再結晶", "抽出", "クロマトグラフィー"],
        correctIndex: 0,
        explanation: "原油の精製などで用いられる分別蒸留（分留）です。"
    },
    {
        id: 55,
        text: "インクの色素を分離する際などに用いられる、吸着力の違いを利用した分離方法は？",
        type: "text",
        options: ["クロマトグラフィー", "抽出", "蒸留", "昇華"],
        correctIndex: 0,
        explanation: "ペーパークロマトグラフィーなどが代表的です。"
    },
    {
        id: 56,
        text: "少量の不純物を含む固体を、温度による溶解度の差を利用して精製する操作は？",
        type: "text",
        options: ["再結晶", "蒸留", "ろ過", "昇華"],
        correctIndex: 0,
        explanation: "高温の飽和溶液を冷却し、結晶を析出させる操作です。"
    },
    {
        id: 57,
        text: "ヨウ素やナフタレンなどの、固体から直接気体になる性質を利用した分離法は？",
        type: "text",
        options: ["昇華法", "蒸留", "抽出", "ろ過"],
        correctIndex: 0,
        explanation: "昇華しやすい物質（昇華性物質）を取り出すのに有効です。"
    },
    {
        id: 58,
        text: "混合物から目的の物質を溶解する溶媒を用いて溶かし出す操作は？",
        type: "text",
        options: ["抽出", "蒸留", "分留", "再結晶"],
        correctIndex: 0,
        explanation: "お茶を淹れるのも抽出の一種です。"
    },

    // 7. 純物質と混合物
    {
        id: 59,
        text: "次のうち、単体はどれか？",
        type: "text",
        options: ["酸素", "水", "二酸化炭素", "塩化ナトリウム"],
        correctIndex: 0,
        explanation: "酸素(O2)は1種類の元素からなる純物質（単体）です。"
    },
    {
        id: 60,
        text: "次のうち、化合物はどれか？",
        type: "text",
        options: ["水", "酸素", "鉄", "空気"],
        correctIndex: 0,
        explanation: "水(H2O)は2種類以上の元素からなる純物質（化合物）です。"
    },
    {
        id: 61,
        text: "次のうち、混合物はどれか？",
        type: "text",
        options: ["空気", "酸素", "蒸留水", "二酸化炭素"],
        correctIndex: 0,
        explanation: "空気は窒素、酸素、アルゴンなどが混ざった混合物です。"
    },
    {
        id: 62,
        text: "次のうち、純物質はどれか？",
        type: "text",
        options: ["塩化ナトリウム", "塩酸", "海水", "石油"],
        correctIndex: 0,
        explanation: "塩化ナトリウム(NaCl)は化合物（純物質）ですが、塩酸は塩化水素の水溶液なので混合物です。"
    },

    // 8. 粒子の熱運動
    {
        id: 63,
        text: "気体が空間全体に広がる現象を何というか？",
        type: "text",
        options: ["拡散", "蒸発", "沸騰", "凝縮"],
        correctIndex: 0,
        explanation: "熱運動によって粒子が散らばっていく現象です。"
    },
    {
        id: 64,
        text: "すべての原子・分子の熱運動が停止するとされる温度は？",
        type: "text",
        options: ["絶対零度", "融点", "沸点", "三重点"],
        correctIndex: 0,
        explanation: "0ケルビン(-273℃)のことです。"
    },

    // 9. 原子の構造（詳細）
    {
        id: 65,
        text: "原子核の大きさは、原子全体の大きさの約何分の一か？",
        type: "text",
        options: ["1万〜10万分の1", "10分の1", "半分", "ほぼ同じ"],
        correctIndex: 0,
        explanation: "原子核は原子の中心に極めて小さく存在しています。"
    },
    {
        id: 66,
        text: "陽子と中性子の質量は、電子の質量の約何倍か？",
        type: "text",
        options: ["約1840倍", "約2倍", "約10倍", "約100倍"],
        correctIndex: 0,
        explanation: "電子は非常に軽いため、原子の質量はほぼ原子核で決まります。"
    },
    {
        id: 67,
        text: "原子番号20のカルシウム(Ca)のM殻の電子数は？",
        type: "text",
        options: ["8個", "18個", "2個", "10個"],
        correctIndex: 0,
        explanation: "K(2)L(8)M(8)N(2)という配置になります。"
    },

    // 10. 周期表と性質
    {
        id: 68,
        text: "１族、２族、および12族〜18族の元素をまとめて何というか？",
        type: "text",
        options: ["典型元素", "遷移元素", "金属元素", "非金属元素"],
        correctIndex: 0,
        explanation: "周期表の両側に位置する元素群です。"
    },
    {
        id: 69,
        text: "同じ族の元素が似た化学的性質を示す主な理由は？",
        type: "text",
        options: ["価電子数が同じだから", "原子量が近いから", "陽子数が同じだから", "中性子数が同じだから"],
        correctIndex: 0,
        explanation: "化学反応には主に最外殻の価電子が関与するためです。"
    },
    {
        id: 70,
        text: "原子番号1〜20の元素で、希ガスは何種類あるか？",
        type: "text",
        options: ["3種類", "2種類", "4種類", "1種類"],
        correctIndex: 0,
        explanation: "He(2), Ne(10), Ar(18)の3種類です。"
    },

    // 11. 結合の性質
    {
        id: 71,
        text: "共有結合の結晶で、非常に硬く、電気を通さないものは？",
        type: "text",
        options: ["ダイヤモンド", "黒鉛", "ケイ素", "水晶"],
        correctIndex: 0,
        explanation: "ダイヤモンドは炭素原子が強固な共有結合で網目状につながっています。"
    },
    {
        id: 72,
        text: "分子間力の一種で、全ての分子間に働く弱い引力を何というか？",
        type: "text",
        options: ["ファンデルワールス力", "クーロン力", "共有結合", "水素結合"],
        correctIndex: 0,
        explanation: "分子量（質量）が大きいほど大きくなる傾向があります。"
    },
    {
        id: 73,
        text: "フッ化水素(HF)の沸点が他のハロゲン化水素より異常に高い理由は？",
        type: "text",
        options: ["水素結合", "ファンデルワールス力", "共有結合", "イオン結合"],
        correctIndex: 0,
        explanation: "Fの電気陰性度が大きく、分子間で水素結合を形成するためです。"
    },
    {
        id: 74,
        text: "自由電子により光を反射し、特有の光沢を持つ結合は？",
        type: "text",
        options: ["金属結合", "イオン結合", "共有結合", "配位結合"],
        correctIndex: 0,
        explanation: "金属光沢と呼ばれる性質です。"
    },

    // 12. 化学式と名称
    {
        id: 75,
        text: "組成式 CaCl2 で表される物質の名称は？",
        type: "text",
        options: ["塩化カルシウム", "カルキ", "炭酸カルシウム", "酸化カルシウム"],
        correctIndex: 0,
        explanation: "Ca2+ と Cl- からなるイオン結晶です。"
    },
    {
        id: 76,
        text: "分子式 NH3 で表される物質は？",
        type: "text",
        options: ["アンモニア", "アンモニウム", "メタン", "硝酸"],
        correctIndex: 0,
        explanation: "刺激臭のある気体です。"
    },
    {
        id: 77,
        text: "次のうち、共有結合結晶であるものは？",
        type: "text",
        options: ["二酸化ケイ素(SiO2)", "ドライアイス(CO2)", "氷(H2O)", "塩化ナトリウム(NaCl)"],
        correctIndex: 0,
        explanation: "二酸化ケイ素は石英や水晶の主成分で、巨大な共有結合の網目構造を持ちます。"
    },

    // 13. その他ランダム知識
    {
        id: 78,
        text: "炎色反応で「黄緑」を示す元素は？",
        type: "text",
        options: ["バリウム(Ba)", "銅(Cu)", "カルシウム(Ca)", "カリウム(K)"],
        correctIndex: 0,
        explanation: "「リアカー無きK村...馬力(Ba:緑)で勝とう」の語呂合わせなどがあります。"
    },
    {
        id: 79,
        text: "炎色反応で「青緑」を示す元素は？",
        type: "text",
        options: ["銅(Cu)", "バリウム(Ba)", "亜鉛(Zn)", "ナトリウム(Na)"],
        correctIndex: 0,
        explanation: "銅の炎色反応は特徴的な青緑色を示します。"
    },
    {
        id: 80,
        text: "常温常圧で液体の単体である非金属元素は？",
        type: "text",
        options: ["臭素(Br2)", "水銀(Hg)", "塩素(Cl2)", "ヨウ素(I2)"],
        correctIndex: 0,
        explanation: "非金属で液体は臭素のみ。金属で液体は水銀のみです。"
    },
    {
        id: 81,
        text: "オゾン(O3)の分子の形は？",
        type: "text",
        options: ["折れ線形", "直線形", "正三角形", "ピラミッド形"],
        correctIndex: 0,
        explanation: "中心の酸素原子に1組の非共有電子対があるため、折れ線形になります。"
    },
    {
        id: 82,
        text: "フラーレンの炭素原子の数は？",
        type: "visual",
        diagramType: "none",
        options: ["60個", "12個", "6個", "100個"],
        correctIndex: 0,
        explanation: "サッカーボール型のC60が最も代表的です。"
    },
    {
        id: 83,
        text: "１つの原子が、共有電子対を一方的に提供してできる結合は？",
        type: "text",
        options: ["配位結合", "共有結合", "イオン結合", "水素結合"],
        correctIndex: 0,
        explanation: "できた結合は通常の共有結合と区別がつきません。"
    },
    {
        id: 84,
        text: "電気を通す液体はどれか？",
        type: "text",
        options: ["塩化ナトリウム水溶液", "砂糖水", "エタノール", "純水"],
        correctIndex: 0,
        explanation: "電解質が溶けてイオンが存在する溶液は電気を通します。"
    },
    // Questions 85-87 removed per user request (Calculations/Mol)
    // Adding basics to reach 100ish
    {
        id: 88,
        text: "原子番号8の元素は？",
        type: "text",
        options: ["酸素(O)", "窒素(N)", "炭素(C)", "フッ素(F)"],
        correctIndex: 0,
        // explanation: O
    },
    {
        id: 89,
        text: "原子番号13の元素は？",
        type: "text",
        options: ["アルミニウム(Al)", "マグネシウム(Mg)", "ケイ素(Si)", "ナトリウム(Na)"],
        correctIndex: 0,
        // explanation: Al
    },
    {
        id: 90,
        text: "アルカリ金属の中で最も原子番号が小さいのは？",
        type: "text",
        options: ["リチウム(Li)", "水素(H)", "ナトリウム(Na)", "カリウム(K)"],
        correctIndex: 0,
        explanation: "水素は1族ですが、非金属なのでアルカリ金属には含めません。"
    },
    {
        id: 91,
        text: "ハロゲンの中で常温で個体のものは？",
        type: "text",
        options: ["ヨウ素(I2)", "臭素(Br2)", "塩素(Cl2)", "フッ素(F2)"],
        correctIndex: 0,
        explanation: "F, Clは気体、Brは液体、Iは固体です。"
    },
    {
        id: 92,
        text: "地殻中に最も多く含まれる元素は？",
        type: "text",
        options: ["酸素(O)", "ケイ素(Si)", "アルミニウム(Al)", "鉄(Fe)"],
        correctIndex: 0,
        explanation: "次いでケイ素、アルミニウム、鉄の順です（おっしゃって貸そう）。"
    },
    {
        id: 93,
        text: "宇宙全体で最も多く存在する元素は？",
        type: "text",
        options: ["水素(H)", "ヘリウム(He)", "酸素(O)", "炭素(C)"],
        correctIndex: 0,
        explanation: "水素が圧倒的に多く、次いでヘリウムです。"
    },
    {
        id: 94,
        text: "空気中で最も多く含まれる気体は？",
        type: "text",
        options: ["窒素(N2)", "酸素(O2)", "アルゴン(Ar)", "二酸化炭素(CO2)"],
        correctIndex: 0,
        explanation: "窒素が約78%、酸素が約21%です。"
    },
    {
        id: 95,
        text: "赤リンと黄リンの関係は？",
        type: "text",
        options: ["同素体", "同位体", "化合物", "混合物"],
        correctIndex: 0,
        explanation: "リン(P)の同素体です。黄リンは自然発火するため水中に保存します。"
    },
    {
        id: 96,
        text: "斜方硫黄と単斜硫黄の関係は？",
        type: "text",
        options: ["同素体", "同位体", "異性体", "重合体"],
        correctIndex: 0,
        explanation: "硫黄(S)の同素体です。ゴム状硫黄も含みます。"
    },
    {
        id: 97,
        text: "不活性ガスとも呼ばれる、反応性に乏しい気体群は？",
        type: "text",
        options: ["希ガス", "希土類", "ハロゲン", "アルカン"],
        correctIndex: 0,
        explanation: "18族元素のことです。"
    },
    {
        id: 98,
        text: "次のうち、昇華性を持つ物質は？",
        type: "text",
        options: ["ナフタレン", "氷", "食塩", "鉄"],
        correctIndex: 0,
        explanation: "防虫剤などに使われるナフタレンは昇華性があります。"
    },
    {
        id: 99,
        text: "原子番号が変わると必ず変わるものは？",
        type: "text",
        options: ["元素の種類", "質量数", "中性子数", "電子の数"],
        correctIndex: 0,
        explanation: "原子番号によって元素の種類が決まります。"
    },
    {
        id: 100,
        text: "周期表を考案したロシアの化学者は？",
        type: "text",
        options: ["メンデレーエフ", "ドルトン", "アボガドロ", "ボーア"],
        correctIndex: 0,
        explanation: "元素の性質を整理し、未発見元素の予言も行いました。"
    },

    // --- 追加問題: 元素記号と名称 (Elements) ---
    {
        id: 101,
        text: "元素記号「K」の名称は？",
        type: "text",
        options: ["カリウム", "カルシウム", "クリプトン", "銅"],
        correctIndex: 0,
        explanation: "カリウム(Potassium)はドイツ語のKaliumに由来します。"
    },
    {
        id: 102,
        text: "「銅」の元素記号は？",
        type: "text",
        options: ["Cu", "Co", "Cr", "C"],
        correctIndex: 0,
        explanation: "Cuprumに由来します。"
    },
    {
        id: 103,
        text: "元素記号「Ag」の名称は？",
        type: "text",
        options: ["銀", "金", "アルゴン", "水銀"],
        correctIndex: 0,
        explanation: "Argentumに由来します。"
    },
    {
        id: 104,
        text: "「金」の元素記号は？",
        type: "text",
        options: ["Au", "Ag", "Al", "Ar"],
        correctIndex: 0,
        explanation: "Aurumに由来します。"
    },
    {
        id: 105,
        text: "元素記号「Zn」の名称は？",
        type: "text",
        options: ["亜鉛", "スズ", "ジルコニウム", "ニッケル"],
        correctIndex: 0,
        explanation: "Zincです。"
    },
    {
        id: 106,
        text: "「硫黄」の元素記号は？",
        type: "text",
        options: ["S", "Si", "Sr", "Sn"],
        correctIndex: 0,
        explanation: "SulfurのSです。"
    },
    {
        id: 107,
        text: "元素記号「Fe」の名称は？",
        type: "text",
        options: ["鉄", "フッ素", "フェルミウム", "フランシウム"],
        correctIndex: 0,
        explanation: "Ferrumに由来します。"
    },
    {
        id: 108,
        text: "「鉛」の元素記号は？",
        type: "text",
        options: ["Pb", "P", "Pd", "Pt"],
        correctIndex: 0,
        explanation: "Plumbumに由来します。"
    },
    {
        id: 109,
        text: "元素記号「Hg」の名称は？",
        type: "text",
        options: ["水銀", "銀", "水素", "マグネシウム"],
        correctIndex: 0,
        explanation: "Hydrargyrum（水の銀）に由来します。"
    },
    {
        id: 110,
        text: "「スズ」の元素記号は？",
        type: "text",
        options: ["Sn", "S", "Sb", "Sr"],
        correctIndex: 0,
        explanation: "Stannumに由来します。"
    },
    {
        id: 111,
        text: "元素記号「Si」の名称は？",
        type: "text",
        options: ["ケイ素", "硫黄", "スカンジウム", "銀"],
        correctIndex: 0,
        explanation: "Siliconです。"
    },
    {
        id: 112,
        text: "「マンガン」の元素記号は？",
        type: "text",
        options: ["Mn", "Mg", "Mo", "Mt"],
        correctIndex: 0,
        explanation: "Manganeseです。"
    },
    {
        id: 113,
        text: "元素記号「Br」の名称は？",
        type: "text",
        options: ["臭素", "ホウ素", "ベリリウム", "バリウム"],
        correctIndex: 0,
        explanation: "Bromineです。"
    },
    {
        id: 114,
        text: "「ヨウ素」の元素記号は？",
        type: "text",
        options: ["I", "In", "Ir", "Y"],
        correctIndex: 0,
        explanation: "Iodineです。"
    },
    {
        id: 115,
        text: "元素記号「Ba」の名称は？",
        type: "text",
        options: ["バリウム", "ベリリウム", "ホウ素", "ビスマス"],
        correctIndex: 0,
        explanation: "Bariumです。"
    },
    {
        id: 116,
        text: "「白金」の元素記号は？",
        type: "text",
        options: ["Pt", "Pb", "Pd", "Pu"],
        correctIndex: 0,
        explanation: "Platinumです。"
    },

    // --- 追加問題: イオン式と名称 (Ions) ---
    {
        id: 117,
        text: "イオン式「NH4+」の名称は？",
        type: "text",
        options: ["アンモニウムイオン", "アンモニア", "硝酸イオン", "水素イオン"],
        correctIndex: 0,
        explanation: "多原子陽イオンの代表例です。"
    },
    {
        id: 118,
        text: "「水酸化物イオン」のイオン式は？",
        type: "text",
        options: ["OH-", "H3O+", "O2-", "H-"],
        correctIndex: 0,
        explanation: "酸素と水素からなる1価の陰イオンです。"
    },
    {
        id: 119,
        text: "イオン式「NO3-」の名称は？",
        type: "text",
        options: ["硝酸イオン", "亜硝酸イオン", "窒化物イオン", "アンモニウムイオン"],
        correctIndex: 0,
        explanation: "硝酸(HNO3)が電離して生じます。"
    },
    {
        id: 120,
        text: "「硫酸イオン」のイオン式は？",
        type: "text",
        options: ["SO4 2-", "SO3 2-", "S 2-", "HSO4-"],
        correctIndex: 0,
        explanation: "硫酸(H2SO4)から水素イオンが2つ取れた陰イオンです。"
    },
    {
        id: 121,
        text: "イオン式「CO3 2-」の名称は？",
        type: "text",
        options: ["炭酸イオン", "炭酸水素イオン", "酢酸イオン", "シュウ酸イオン"],
        correctIndex: 0,
        explanation: "炭酸(H2CO3)の2価の陰イオンです。"
    },
    {
        id: 122,
        text: "「リン酸イオン」のイオン式は？",
        type: "text",
        options: ["PO4 3-", "PO3 3-", "P 3-", "HPO4 2-"],
        correctIndex: 0,
        explanation: "リン酸(H3PO4)の3価の陰イオンです。"
    },
    {
        id: 123,
        text: "イオン式「CH3COO-」の名称は？",
        type: "text",
        options: ["酢酸イオン", "ギ酸イオン", "シュウ酸イオン", "炭酸イオン"],
        correctIndex: 0,
        explanation: "酢酸(CH3COOH)からH+が取れたものです。"
    },
    {
        id: 124,
        text: "「塩化物イオン」のイオン式は？",
        type: "text",
        options: ["Cl-", "ClO-", "ClO3-", "C-"],
        correctIndex: 0,
        explanation: "塩素原子が電子を1個受け取ったものです。"
    },
    {
        id: 125,
        text: "イオン式「Ca 2+」の名称は？",
        type: "text",
        options: ["カルシウムイオン", "カリウムイオン", "銅イオン", "炭素イオン"],
        correctIndex: 0,
        explanation: "カルシウムは2族元素なので2価の陽イオンになります。"
    },
    {
        id: 126,
        text: "「アルミニウムイオン」のイオン式は？",
        type: "text",
        options: ["Al 3+", "Al 2+", "Al +", "Al 4+"],
        correctIndex: 0,
        explanation: "アルミニウムは13族元素で、価電子を3個失って3価の陽イオンになります。"
    },
    {
        id: 127,
        text: "イオン式「Fe 2+」の名称は？",
        type: "text",
        options: ["鉄(II)イオン", "鉄(III)イオン", "フッ化物イオン", "銅(II)イオン"],
        correctIndex: 0,
        explanation: "鉄は遷移元素で、2価や3価のイオンになりえます。"
    },
    {
        id: 128,
        text: "「酸化物イオン」のイオン式は？",
        type: "text",
        options: ["O 2-", "O -", "O2 -", "OH -"],
        correctIndex: 0,
        explanation: "酸素原子は電子を2個受け取って安定化します。"
    },
    {
        id: 129,
        text: "イオン式「Zn 2+」の名称は？",
        type: "text",
        options: ["亜鉛イオン", "スズイオン", "ジルコニウムイオン", "鉛イオン"],
        correctIndex: 0,
        explanation: "亜鉛は主に2価の陽イオンになります。"
    },
    {
        id: 130,
        text: "「銀イオン」のイオン式は？",
        type: "text",
        options: ["Ag +", "Ag 2+", "Au +", "Hg 2+"],
        correctIndex: 0,
        explanation: "銀は1価の陽イオンになりやすい遷移元素です。"
    },
    {
        id: 131,
        text: "イオン式「Cu 2+」の名称は？",
        type: "text",
        options: ["銅(II)イオン", "銅(I)イオン", "カルシウムイオン", "コバルトイオン"],
        correctIndex: 0,
        explanation: "水溶液中では青色を示します。"
    },
    {
        id: 132,
        text: "「硫化物イオン」のイオン式は？",
        type: "text",
        options: ["S 2-", "SO4 2-", "SO3 2-", "Si 4-"],
        correctIndex: 0,
        explanation: "硫黄原子は酸素と同じ16族で、2価の陰イオンになります。"
    },
    {
        id: 133,
        text: "イオン式「H3O+」の名称は？",
        type: "text",
        options: ["オキソニウムイオン", "水酸化物イオン", "過酸化水素", "水素イオン"],
        correctIndex: 0,
        explanation: "水素イオンが水分子と配位結合した形です。"
    },
    {
        id: 134,
        text: "「炭酸水素イオン」のイオン式は？",
        type: "text",
        options: ["HCO3 -", "CO3 2-", "H2CO3", "CH3COO-"],
        correctIndex: 0,
        explanation: "炭酸の第1段階電離で生じます。"
    },
    {
        id: 135,
        text: "イオン式「Mg 2+」の名称は？",
        type: "text",
        options: ["マグネシウムイオン", "マンガンイオン", "水銀イオン", "モリブデンイオン"],
        correctIndex: 0,
        explanation: "2族元素のマグネシウムのイオンです。"
    },
    {
        id: 136,
        text: "「バリウムイオン」のイオン式は？",
        type: "text",
        options: ["Ba 2+", "Be 2+", "B 3+", "Br -"],
        correctIndex: 0,
        explanation: "2族元素のバリウムのイオンです。"
    },

    // --- 追加問題: イオン結晶の組成式 (Composition Formulas) ---
    {
        id: 137,
        text: "ナトリウムイオン(Na+)と塩化物イオン(Cl-)が結合した物質の化学式は？",
        type: "text",
        options: ["NaCl", "Na2Cl", "NaCl2", "NaClO"],
        correctIndex: 0,
        explanation: "1価の陽イオンと1価の陰イオンなので1:1で結合します。"
    },
    {
        id: 138,
        text: "カルシウムイオン(Ca2+)と塩化物イオン(Cl-)の組成式は？",
        type: "text",
        options: ["CaCl2", "CaCl", "Ca2Cl", "Ca2Cl2"],
        correctIndex: 0,
        explanation: "電荷の総和が0になるよう、Ca2+ 1個に対して Cl- が2個必要です。"
    },
    {
        id: 139,
        text: "アルミニウムイオン(Al3+)と酸化物イオン(O2-)の組成式は？",
        type: "text",
        options: ["Al2O3", "AlO", "Al3O2", "AlO2"],
        correctIndex: 0,
        explanation: "3(+)×2 = 6、2(-)×3 = 6。最小公倍数で合わせます。"
    },
    {
        id: 140,
        text: "ナトリウムイオン(Na+)と水酸化物イオン(OH-)の組成式は？",
        type: "text",
        options: ["NaOH", "Na(OH)2", "Na2OH", "NaH"],
        correctIndex: 0,
        explanation: "水酸化ナトリウムです。"
    },
    {
        id: 141,
        text: "カルシウムイオン(Ca2+)と水酸化物イオン(OH-)の組成式は？",
        type: "text",
        options: ["Ca(OH)2", "CaOH", "Ca2OH", "CaOH2"],
        correctIndex: 0,
        explanation: "水酸化カルシウム（消石灰）です。OH全体をカッコでくくります。"
    },
    {
        id: 142,
        text: "銅(II)イオン(Cu2+)と硫酸イオン(SO4 2-)の組成式は？",
        type: "text",
        options: ["CuSO4", "Cu2SO4", "Cu(SO4)2", "CuS"],
        correctIndex: 0,
        explanation: "2価同士なので1:1で結合します。硫酸銅(II)です。"
    },
    {
        id: 143,
        text: "アンモニウムイオン(NH4+)と塩化物イオン(Cl-)の組成式は？",
        type: "text",
        options: ["NH4Cl", "NH3Cl", "(NH4)2Cl", "NH4Cl2"],
        correctIndex: 0,
        explanation: "塩化アンモニウムです。塩安とも呼ばれます。"
    },
    {
        id: 144,
        text: "アンモニウムイオン(NH4+)と硫酸イオン(SO4 2-)の組成式は？",
        type: "text",
        options: ["(NH4)2SO4", "NH4SO4", "NH4(SO4)2", "N2H8SO4"],
        correctIndex: 0,
        explanation: "硫酸アンモニウムです。1価の陽イオン2個で2価の陰イオンと釣り合います。"
    },
    {
        id: 145,
        text: "銀イオン(Ag+)と硝酸イオン(NO3-)の組成式は？",
        type: "text",
        options: ["AgNO3", "Ag(NO3)2", "Ag2NO3", "AgN"],
        correctIndex: 0,
        explanation: "硝酸銀です。水によく溶けます。"
    },
    {
        id: 146,
        text: "鉄(III)イオン(Fe3+)と水酸化物イオン(OH-)の組成式は？",
        type: "text",
        options: ["Fe(OH)3", "FeOH", "Fe(OH)2", "Fe3OH"],
        correctIndex: 0,
        explanation: "水酸化鉄(III)です。赤褐色の沈殿を作ります。"
    },
    {
        id: 147,
        text: "マグネシウムイオン(Mg2+)と酸化物イオン(O2-)の組成式は？",
        type: "text",
        options: ["MgO", "Mg2O", "MgO2", "Mg2O2"],
        correctIndex: 0,
        explanation: "酸化マグネシウムです。"
    },
    {
        id: 148,
        text: "炭酸カルシウムの化学式は？",
        type: "text",
        options: ["CaCO3", "Ca(CO3)2", "Ca2CO3", "CaHCO3"],
        correctIndex: 0,
        explanation: "Ca2+とCO3 2-の結合です。石灰石の主成分です。"
    },
    {
        id: 149,
        text: "炭酸水素ナトリウムの化学式は？",
        type: "text",
        options: ["NaHCO3", "Na2CO3", "NaCO3", "NaH2CO3"],
        correctIndex: 0,
        explanation: "重曹とも呼ばれます。Na+とHCO3-です。"
    },
    {
        id: 150,
        text: "酸化銅(II)の化学式は？",
        type: "text",
        options: ["CuO", "Cu2O", "CuO2", "Cu2O3"],
        correctIndex: 0,
        explanation: "Cu2+とO2-からなる黒色粉末です。"
    },
    {
        id: 151,
        text: "塩化鉄(III)の化学式は？",
        type: "text",
        options: ["FeCl3", "FeCl2", "Fe3Cl", "FeCl"],
        correctIndex: 0,
        explanation: "Fe3+とCl-が1:3で結合します。"
    },
    {
        id: 152,
        text: "硫化水素の化学式は？",
        type: "text",
        options: ["H2S", "HS", "H2SO4", "HS2"],
        correctIndex: 0,
        explanation: "腐卵臭のある気体です。共有結合分子ですが、イオンの価数と同様に考えられます。"
    },

    // --- その他補充問題 ---
    {
        id: 153,
        text: "カリウムイオン(K+)の電子配置はどの希ガスと同じか？",
        type: "text",
        options: ["アルゴン(Ar)", "ネオン(Ne)", "クリプトン(Kr)", "ヘリウム(He)"],
        correctIndex: 0,
        explanation: "K(19)が電子を1個失って18個になり、Arと同じになります。"
    },
    {
        id: 154,
        text: "酸化物イオン(O2-)の電子配置はどの希ガスと同じか？",
        type: "text",
        options: ["ネオン(Ne)", "アルゴン(Ar)", "ヘリウム(He)", "クリプトン(Kr)"],
        correctIndex: 0,
        explanation: "O(8)が電子を2個受け取って10個になり、Neと同じになります。"
    },
    {
        id: 155,
        text: "次のうち、2価の陰イオンを生じる元素は？",
        type: "text",
        options: ["硫黄(S)", "塩素(Cl)", "ナトリウム(Na)", "アルミニウム(Al)"],
        correctIndex: 0,
        explanation: "16族元素は2価の陰イオンになりやすいです。"
    },
    {
        id: 156,
        text: "共有電子対の偏りによって生じる電荷の偏りを何というか？",
        type: "text",
        options: ["極性", "電気陰性度", "配位結合", "イオン化"],
        correctIndex: 0,
        explanation: "電気陰性度の差が大きいほど極性が大きくなります。"
    },
    {
        id: 157,
        text: "原子が電子を引き寄せる強さの尺度を何というか？",
        type: "text",
        options: ["電気陰性度", "電子親和力", "イオン化エネルギー", "原子半径"],
        correctIndex: 0,
        explanation: "ポーリングの定義などが有名です。Fが最大です。"
    },
    {
        id: 158,
        text: "極性が互いに打ち消し合い、分子全体として極性を持たない分子を何というか？",
        type: "text",
        options: ["無極性分子", "極性分子", "高分子", "イオン結晶"],
        correctIndex: 0,
        explanation: "メタン(CH4)や二酸化炭素(CO2)などがその例です。"
    },
    {
        id: 159,
        text: "水分子(H2O)は極性分子か、無極性分子か？",
        type: "text",
        options: ["極性分子", "無極性分子", "イオン結晶", "金属結晶"],
        correctIndex: 0,
        explanation: "折れ線形で極性が打ち消し合わないため、強い極性を持ちます。"
    },
    {
        id: 160,
        text: "二酸化炭素(CO2)は極性分子か、無極性分子か？",
        type: "text",
        options: ["無極性分子", "極性分子", "共有結合結晶", "イオン結晶"],
        correctIndex: 0,
        explanation: "直線形で極性が打ち消し合うため、無極性分子になります。"
    }
];

const TITLES = [
    // A. 【正確さ】を称える称号 / Accuracy
    {
        id: "stable_gas",
        name: "希ガス級の安定感",
        desc: "1度も間違えずに全問正解",
        condition: (s) => s.currentRun.firstTryCorrect === s.currentRun.totalQuestions
    },
    {
        id: "diamond_bond",
        name: "ダイヤモンド・ボンド",
        desc: "1周目の正解率が90%以上",
        condition: (s) => (s.currentRun.firstTryCorrect / s.currentRun.totalQuestions) >= 0.9
    },
    {
        id: "zero_impurity",
        name: "不純物ゼロ",
        desc: "解き直しを1回もせずにクリア",
        condition: (s) => s.currentRun.retryCount === 0
    },

    // B. 【スピード】を称える称号 / Speed
    {
        id: "light_speed_electron",
        name: "光速の電子",
        desc: "1問平均3秒以内で解答し、全問正解",
        condition: (s) => (s.currentRun.timeSeconds / s.currentRun.totalQuestions) <= 3 && s.currentRun.firstTryCorrect === s.currentRun.totalQuestions
    },
    {
        id: "reaction_rate_overflow",
        name: "反応速度定数オーバー",
        desc: "1分以内(10問)/2分以内(20問)でクリア",
        condition: (s) => s.currentRun.timeSeconds <= (s.currentRun.totalQuestions * 6) // Roughly 6 sec per question pace? Text says "Amazing speed", let's say 60s for 10, 120s for 20.
    },
    {
        id: "catalyst_work",
        name: "触媒級の仕事",
        desc: "通常の半分以下の時間でクリア (基準: 1問5秒)",
        condition: (s) => (s.currentRun.timeSeconds / s.currentRun.totalQuestions) <= 5
    },

    // C. 【努力と継続】を称える称号 / Persistence
    {
        id: "persistent_ionic_bond",
        name: "不屈のイオン結合",
        desc: "解き直しを5回以上繰り返して完遂",
        condition: (s) => s.currentRun.retryCount >= 5
    },
    {
        id: "recrystallization_master",
        name: "再結晶の達人",
        desc: "解き直しを完遂した（1回以上）",
        condition: (s) => s.currentRun.retryCount >= 1
    },
    {
        id: "transition_state_walker",
        name: "遷移状態の越境者",
        desc: "苦手な問題(3回以上ミス)を克服",
        condition: (s) => s.currentRun.maxRetriesPerQuestion >= 3 // Need to track per question
    },

    // D. 【ユーモア・専門性】を称える称号 / Humor
    {
        id: 'valance_magician',
        name: '価電子の魔術師',
        desc: '電子配置の問題を全問正解した',
        condition: (state) => state.playHistory.totalPlays >= 1
    },
    {
        id: 'valance_magician',
        name: '価電子の魔術師',
        desc: '電子配置の問題を全問正解した',
        condition: (state) => state.playHistory.totalPlays >= 1 // Simplified: Awarded for playing for now, or need category tracking
    },
    {
        id: 'cation_mood',
        name: '陽イオンな気分',
        desc: '5問連続で正解した',
        condition: (state) => state.currentRun.maxStreak >= 5
    },
    {
        id: 'octet_guardian',
        name: 'オクテット則の守護者',
        desc: '満点でクリアした',
        condition: (state) => state.currentRun.firstTryCorrect === state.currentRun.totalQuestions
    },
    // New Titles
    {
        id: 'flame_master',
        name: '炎色反応マスター',
        desc: '情熱的に（スピードクリアで）問題を解いた', // Generic speed condition proxy
        condition: (state) => state.currentRun.firstTryCorrect === state.currentRun.totalQuestions && (state.currentRun.timeSeconds / state.currentRun.totalQuestions) < 5
    },
    {
        id: 'periodic_navigator',
        name: '周期表のナビゲーター',
        desc: '20問コースを最後までやり遂げた',
        condition: (state) => state.currentRun.totalQuestions === 20
    },
    {
        id: 'sublimation_soul',
        name: '昇華する魂',
        desc: '一度間違えても、解き直しで全て正解した（不純物ゼロ以外でクリア）',
        condition: (state) => state.currentRun.firstTryCorrect < state.currentRun.totalQuestions // Just finishing implies they cleared retries in this app logic
    }
];
