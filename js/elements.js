// 118元素のマスタデータベース
// レアリティ: common, rare, epic, legendary
// カテゴリ: nonmetal, metal, metalloid, noble_gas, halogen, transition, lanthanide, actinide

const ELEMENTS = [
    // 第1周期
    { symbol: "H", number: 1, name: "水素", rarity: "common", category: "nonmetal", item: "🚀", itemName: "ロケットの燃料", trivia: "宇宙で最も多い元素。燃えると水になるクリーンエネルギー！", image: "assets/images/elements/H.png" },
    { symbol: "He", number: 2, name: "ヘリウム", rarity: "rare", category: "noble_gas", item: "🎈", itemName: "ふわふわ浮かぶ風船", trivia: "空気より軽く、火をつけても燃えない安全なガスだよ。", image: "assets/images/elements/He.png" },

    // 第2周期
    { symbol: "Li", number: 3, name: "リチウム", rarity: "rare", category: "metal", item: "🔋", itemName: "スマホのバッテリー", trivia: "軽くて電気をたくさん貯められる、現代社会の必需品！", image: "assets/images/elements/Li.png" },
    { symbol: "Be", number: 4, name: "ベリリウム", rarity: "epic", category: "metal", item: "💎", itemName: "輝くエメラルド", trivia: "宝石のエメラルドの主成分。実はとても硬い金属なんだ。", image: "assets/images/elements/Be.png" },
    { symbol: "B", number: 5, name: "ホウ素", rarity: "common", category: "metalloid", item: "🧪", itemName: "スライム（ホウ砂）", trivia: "理科の実験で作るスライムの粘り気を出している正体！", image: "assets/images/elements/B.png" },
    { symbol: "C", number: 6, name: "炭素", rarity: "common", category: "nonmetal", item: "💎", itemName: "ダイヤモンドの指輪", trivia: "鉛筆の芯もダイヤも、実は同じ炭素原子からできているよ。", image: "assets/images/elements/C.png" },
    { symbol: "N", number: 7, name: "窒素", rarity: "common", category: "nonmetal", item: "🥔", itemName: "ポテトチップスの袋", trivia: "袋がパンパンなのは、酸化を防ぐために窒素が詰まっているから。", image: "assets/images/elements/N.png" },
    { symbol: "O", number: 8, name: "酸素", rarity: "common", category: "nonmetal", item: "🤿", itemName: "スキューバのボンベ", trivia: "私たちが呼吸してエネルギーを作るために欠かせない存在。", image: "assets/images/elements/O.png" },
    { symbol: "F", number: 9, name: "フッ素", rarity: "rare", category: "halogen", item: "🪥", itemName: "歯磨き粉", trivia: "歯の表面を強くして、虫歯から守ってくれるヒーロー！", image: "assets/images/elements/F.png" },
    { symbol: "Ne", number: 10, name: "ネオン", rarity: "rare", category: "noble_gas", item: "💡", itemName: "輝くネオンサイン", trivia: "電気を通すと赤く光る。夜の街を彩る「希ガス」の代表格。", image: "assets/images/elements/Ne.png" },

    // 第3周期
    { symbol: "Na", number: 11, name: "ナトリウム", rarity: "common", category: "metal", item: "🧂", itemName: "食卓の塩（食塩）", trivia: "塩素と結合すると塩になる。水に入れると激しく反応するよ。", image: "assets/images/elements/Na.png" },
    { symbol: "Mg", number: 12, name: "マグネシウム", rarity: "common", category: "metal", item: "🍮", itemName: "豆腐の「にがり」", trivia: "海水に含まれる成分。豆腐を固めるのに使われているんだ。", image: "assets/images/elements/Mg.png" },
    { symbol: "Al", number: 13, name: "アルミニウム", rarity: "common", category: "metal", item: "🪙", itemName: "1円玉やジュースの缶", trivia: "軽くて錆びにくい。リサイクル効率がとても高い優等生！", image: "assets/images/elements/Al.png" },
    { symbol: "Si", number: 14, name: "ケイ素", rarity: "common", category: "metalloid", item: "💻", itemName: "パソコンのCPU", trivia: "半導体として、デジタル機器の「脳」を支える重要な元素。", image: "assets/images/elements/Si.png" },
    { symbol: "P", number: 15, name: "リン", rarity: "common", category: "nonmetal", item: "🔥", itemName: "マッチの箱の側面", trivia: "燃えやすい性質を利用。実は私たちの骨やDNAの成分でもある。", image: "assets/images/elements/P.png" },
    { symbol: "S", number: 16, name: "硫黄", rarity: "common", category: "nonmetal", item: "♨️", itemName: "温泉の湯の花", trivia: "火山や温泉の独特な匂いの元。黄色い結晶が特徴的だよ。" },
    { symbol: "Cl", number: 17, name: "塩素", rarity: "common", category: "halogen", item: "🏊", itemName: "プールの消毒剤", trivia: "強い殺菌力がある。水道水の安全を守る影の功労者！" },
    { symbol: "Ar", number: 18, name: "アルゴン", rarity: "rare", category: "noble_gas", item: "💡", itemName: "電球の中のガス", trivia: "他の物質と反応しないので、フィラメントが燃えるのを防ぐ。" },

    // 第4周期
    { symbol: "K", number: 19, name: "カリウム", rarity: "common", category: "metal", item: "🍌", itemName: "バナナや野菜", trivia: "体内の水分バランスを整える。肥料の三要素の一つでもあるよ。" },
    { symbol: "Ca", number: 20, name: "カルシウム", rarity: "common", category: "metal", item: "🥛", itemName: "牛乳や貝殻", trivia: "骨や歯を作る主成分。サンゴや貝殻もこれでできている。" },
    { symbol: "Sc", number: 21, name: "スカンジウム", rarity: "epic", category: "transition", item: "⚾", itemName: "野球のバット", trivia: "合金にすると非常に軽く強くなるため、スポーツ用品に。" },
    { symbol: "Ti", number: 22, name: "チタン", rarity: "rare", category: "transition", item: "👓", itemName: "軽くて強いメガネ枠", trivia: "軽くて丈夫、しかも金属アレルギーを起こしにくい高級素材。" },
    { symbol: "V", number: 23, name: "バナジウム", rarity: "rare", category: "transition", item: "🔧", itemName: "工具のレンチ", trivia: "鋼（はがね）を強くする。ミネラルウォーターでも有名。" },
    { symbol: "Cr", number: 24, name: "クロム", rarity: "rare", category: "transition", item: "🚰", itemName: "ピカピカの蛇口（メッキ）", trivia: "錆びにくく、美しい輝きを保つ。ステンレス鋼の主成分。" },
    { symbol: "Mn", number: 25, name: "マンガン", rarity: "common", category: "transition", item: "🔋", itemName: "乾電池", trivia: "電池の材料としておなじみ。植物の光合成にも必要な元素。" },
    { symbol: "Fe", number: 26, name: "鉄", rarity: "common", category: "transition", item: "🗼", itemName: "巨大な東京タワー", trivia: "文明を支える金属の王様。血液中の酸素を運ぶ役割も！" },
    { symbol: "Co", number: 27, name: "コバルト", rarity: "rare", category: "transition", item: "🎨", itemName: "鮮やかな青色のガラス", trivia: "「コバルトブルー」と呼ばれる美しい青色を作るのに使われる。" },
    { symbol: "Ni", number: 28, name: "ニッケル", rarity: "common", category: "transition", item: "🪙", itemName: "50円玉や100円玉", trivia: "硬貨の材料。錆びにくく、銀のような白い光沢が特徴。" },
    { symbol: "Cu", number: 29, name: "銅", rarity: "common", category: "transition", item: "⚡", itemName: "10円玉や電線", trivia: "電気を非常に通しやすい。キッチン用品にも使われるよ。" },
    { symbol: "Zn", number: 30, name: "亜鉛", rarity: "common", category: "transition", item: "🏠", itemName: "トタン屋根", trivia: "鉄の身代わりになって錆びて、本体を守る（めっき）。" },
    { symbol: "Ga", number: 31, name: "ガリウム", rarity: "epic", category: "metal", item: "🌡️", itemName: "体温計", trivia: "手の上で溶ける不思議な金属！" },
    { symbol: "Ge", number: 32, name: "ゲルマニウム", rarity: "rare", category: "metalloid", item: "📡", itemName: "光ファイバー", trivia: "通信を支える半導体元素。" },
    { symbol: "As", number: 33, name: "ヒ素", rarity: "epic", category: "metalloid", item: "☠️", itemName: "毒薬（注意）", trivia: "猛毒だけど、半導体にも使われる元素。" },
    { symbol: "Se", number: 34, name: "セレン", rarity: "rare", category: "nonmetal", item: "📷", itemName: "コピー機", trivia: "光に反応する性質を持つ元素。" },
    { symbol: "Br", number: 35, name: "臭素", rarity: "rare", category: "halogen", item: "🔥", itemName: "難燃剤", trivia: "常温で液体の珍しいハロゲン。" },
    { symbol: "Kr", number: 36, name: "クリプトン", rarity: "epic", category: "noble_gas", item: "💡", itemName: "レーザー光", trivia: "スーパーマンの故郷と同じ名前！" },

    // 第5周期
    { symbol: "Rb", number: 37, name: "ルビジウム", rarity: "rare", category: "metal", item: "🕰️", itemName: "原子時計", trivia: "超正確な時計に使われる元素。" },
    { symbol: "Sr", number: 38, name: "ストロンチウム", rarity: "rare", category: "metal", item: "🎆", itemName: "赤い花火", trivia: "花火の赤色を作り出す元素。" },
    { symbol: "Y", number: 39, name: "イットリウム", rarity: "epic", category: "transition", item: "📺", itemName: "LEDディスプレイ", trivia: "赤い光を出す蛍光体に使われるよ。" },
    { symbol: "Zr", number: 40, name: "ジルコニウム", rarity: "rare", category: "transition", item: "🦷", itemName: "白いセラミックの歯", trivia: "人工ダイヤモンド（キュービックジルコニア）の主成分。" },
    { symbol: "Nb", number: 41, name: "ニオブ", rarity: "epic", category: "transition", item: "🚄", itemName: "超電導磁石", trivia: "リニアモーターカーに使われる元素。" },
    { symbol: "Mo", number: 42, name: "モリブデン", rarity: "rare", category: "transition", item: "🔩", itemName: "特殊鋼", trivia: "高温に強い合金を作る元素。" },
    { symbol: "Tc", number: 43, name: "テクネチウム", rarity: "legendary", category: "transition", item: "🏥", itemName: "医療検査", trivia: "自然界に存在しない、人工元素！" },
    { symbol: "Ru", number: 44, name: "ルテニウム", rarity: "epic", category: "transition", item: "💾", itemName: "ハードディスク", trivia: "データを記録する磁性体に使われる。" },
    { symbol: "Rh", number: 45, name: "ロジウム", rarity: "legendary", category: "transition", item: "🚗", itemName: "自動車触媒", trivia: "排ガスをきれいにする貴金属。" },
    { symbol: "Pd", number: 46, name: "パラジウム", rarity: "epic", category: "transition", item: "💍", itemName: "ホワイトゴールド", trivia: "美しい白い輝きの貴金属。" },
    { symbol: "Ag", number: 47, name: "銀", rarity: "epic", category: "transition", item: "🥈", itemName: "1位のメダル", trivia: "全ての金属の中で、最も電気や熱をよく通すナンバーワン！" },
    { symbol: "Cd", number: 48, name: "カドミウム", rarity: "rare", category: "transition", item: "🎨", itemName: "黄色い絵の具", trivia: "鮮やかな黄色を作る。かつての「イタイイタイ病」の原因。" },
    { symbol: "In", number: 49, name: "インジウム", rarity: "rare", category: "metal", item: "📱", itemName: "タッチパネル", trivia: "スマホの画面を支える元素。" },
    { symbol: "Sn", number: 50, name: "スズ", rarity: "common", category: "metal", item: "🥫", itemName: "お菓子の缶（ブリキ）", trivia: "毒性が低く、缶詰の内側のめっきとして使われているよ。" },
    { symbol: "Sb", number: 51, name: "アンチモン", rarity: "rare", category: "metalloid", item: "🔥", itemName: "難燃剤", trivia: "燃えにくくする性質を持つ元素。" },
    { symbol: "Te", number: 52, name: "テルル", rarity: "epic", category: "metalloid", item: "💿", itemName: "DVD", trivia: "光ディスクの記録層に使われる。" },
    { symbol: "I", number: 53, name: "ヨウ素", rarity: "common", category: "halogen", item: "🧴", itemName: "うがい薬（ヨード液）", trivia: "強い殺菌作用。デンプンと反応して青紫色になる（ヨウ素デンプン反応）。" },
    { symbol: "Xe", number: 54, name: "キセノン", rarity: "epic", category: "noble_gas", item: "🚗", itemName: "車のヘッドライト", trivia: "非常に明るい光を出す。イオンエンジンとして宇宙開発にも。" },

    // 第6周期
    { symbol: "Cs", number: 55, name: "セシウム", rarity: "epic", category: "metal", item: "🕰️", itemName: "原子時計", trivia: "世界で最も正確な時計の心臓！" },
    { symbol: "Ba", number: 56, name: "バリウム", rarity: "rare", category: "metal", item: "🏥", itemName: "胃のレントゲン検査", trivia: "X線を遮る性質がある。重いから「重晶石」とも呼ばれるよ。" },

    // ランタノイド（57-71）
    { symbol: "La", number: 57, name: "ランタン", rarity: "rare", category: "lanthanide", item: "🎥", itemName: "カメラレンズ", trivia: "光学レンズを作る希土類元素。" },
    { symbol: "Ce", number: 58, name: "セリウム", rarity: "rare", category: "lanthanide", item: "💎", itemName: "ガラス研磨", trivia: "ガラスを磨く研磨材に使われる。" },
    { symbol: "Pr", number: 59, name: "プラセオジム", rarity: "epic", category: "lanthanide", item: "🕶️", itemName: "溶接ゴーグル", trivia: "黄色い保護ガラスに使われる。" },
    { symbol: "Nd", number: 60, name: "ネオジム", rarity: "rare", category: "lanthanide", item: "🧲", itemName: "超強力磁石", trivia: "モーターに使われる最強の磁石！" },
    { symbol: "Pm", number: 61, name: "プロメチウム", rarity: "legendary", category: "lanthanide", item: "☢️", itemName: "放射性塗料", trivia: "自然界にほぼ存在しない幻の元素。" },
    { symbol: "Sm", number: 62, name: "サマリウム", rarity: "epic", category: "lanthanide", item: "🧲", itemName: "耐熱磁石", trivia: "高温でも働く磁石に使われる。" },
    { symbol: "Eu", number: 63, name: "ユウロピウム", rarity: "epic", category: "lanthanide", item: "💶", itemName: "ユーロ紙幣", trivia: "お札の偽造防止インクに使われる！" },
    { symbol: "Gd", number: 64, name: "ガドリニウム", rarity: "epic", category: "lanthanide", item: "🏥", itemName: "MRI造影剤", trivia: "医療検査で体の中を見やすくする。" },
    { symbol: "Tb", number: 65, name: "テルビウム", rarity: "epic", category: "lanthanide", item: "💡", itemName: "緑色LED", trivia: "省エネの緑色光を作る元素。" },
    { symbol: "Dy", number: 66, name: "ジスプロシウム", rarity: "epic", category: "lanthanide", item: "🚗", itemName: "ハイブリッドカー", trivia: "モーターの磁石を強化する元素。" },
    { symbol: "Ho", number: 67, name: "ホルミウム", rarity: "epic", category: "lanthanide", item: "🔬", itemName: "レーザー医療", trivia: "医療用レーザーに使われる元素。" },
    { symbol: "Er", number: 68, name: "エルビウム", rarity: "epic", category: "lanthanide", item: "🌐", itemName: "光ファイバー", trivia: "光通信を増幅する元素。" },
    { symbol: "Tm", number: 69, name: "ツリウム", rarity: "legendary", category: "lanthanide", item: "⚕️", itemName: "医療用X線", trivia: "ポータブルX線装置に使われる。" },
    { symbol: "Yb", number: 70, name: "イッテルビウム", rarity: "epic", category: "lanthanide", item: "🕰️", itemName: "原子時計", trivia: "超高精度時計の要となる元素。" },
    { symbol: "Lu", number: 71, name: "ルテチウム", rarity: "legendary", category: "lanthanide", item: "💎", itemName: "宝石鑑定", trivia: "宝石の年代測定に使われる希少元素。" },

    // 第6周期（続き）
    { symbol: "Hf", number: 72, name: "ハフニウム", rarity: "epic", category: "transition", item: "💻", itemName: "半導体", trivia: "次世代CPUの材料になる元素。" },
    { symbol: "Ta", number: 73, name: "タンタル", rarity: "epic", category: "transition", item: "📱", itemName: "スマホ部品", trivia: "小型コンデンサーに使われる金属。" },
    { symbol: "W", number: 74, name: "タングステン", rarity: "rare", category: "transition", item: "💡", itemName: "電球のフィラメント", trivia: "全金属の中で最高の融点（約3400度）を誇る熱に強い奴。" },
    { symbol: "Re", number: 75, name: "レニウム", rarity: "legendary", category: "transition", item: "✈️", itemName: "ジェットエンジン", trivia: "超高温に耐える希少金属。" },
    { symbol: "Os", number: 76, name: "オスミウム", rarity: "legendary", category: "transition", item: "🖊️", itemName: "万年筆のペン先", trivia: "最も重く、最も硬い金属！" },
    { symbol: "Ir", number: 77, name: "イリジウム", rarity: "legendary", category: "transition", item: "🦖", itemName: "恐竜絶滅の証拠", trivia: "隕石に多く含まれる希少金属。" },
    { symbol: "Pt", number: 78, name: "白金", rarity: "legendary", category: "transition", item: "💍", itemName: "排ガス浄化触媒", trivia: "高級宝飾品だけでなく、車の排気ガスを綺麗にする重要な役割。" },
    { symbol: "Au", number: 79, name: "金", rarity: "legendary", category: "transition", item: "👑", itemName: "永遠に輝く王冠", trivia: "非常に安定していて錆びない。1gで数kmまで伸ばせる。", image: "assets/images/elements/Au.png" },
    { symbol: "Hg", number: 80, name: "水銀", rarity: "epic", category: "transition", item: "🌡️", itemName: "昔の体温計", trivia: "常温で唯一の液体の金属。独特の動きが神秘的。" },
    { symbol: "Tl", number: 81, name: "タリウム", rarity: "epic", category: "metal", item: "🔬", itemName: "医療検査", trivia: "有毒だけど心臓検査に使われる。" },
    { symbol: "Pb", number: 82, name: "鉛", rarity: "common", category: "metal", item: "🎣", itemName: "釣りのおもり", trivia: "重くて加工しやすい。放射線を遮る力が強いんだ。" },
    { symbol: "Bi", number: 83, name: "ビスマス", rarity: "rare", category: "metal", item: "💊", itemName: "胃腸薬", trivia: "虹色の結晶を作る美しい金属。" },
    { symbol: "Po", number: 84, name: "ポロニウム", rarity: "legendary", category: "metalloid", item: "☢️", itemName: "放射線源", trivia: "キュリー夫人が発見した超危険元素！" },
    { symbol: "At", number: 85, name: "アスタチン", rarity: "legendary", category: "halogen", item: "🧪", itemName: "研究用試薬", trivia: "地球上で最も希少なハロゲン。" },
    { symbol: "Rn", number: 86, name: "ラドン", rarity: "epic", category: "noble_gas", item: "♨️", itemName: "ラドン温泉", trivia: "放射性の温泉ガス、健康効果？" },

    // 第7周期
    { symbol: "Fr", number: 87, name: "フランシウム", rarity: "legendary", category: "metal", item: "⚛️", itemName: "原子核研究", trivia: "最も不安定な天然元素！" },
    { symbol: "Ra", number: 88, name: "ラジウム", rarity: "legendary", category: "metal", item: "⚕️", itemName: "癌治療", trivia: "放射線治療に使われた元素。" },

    // アクチノイド（89-103）
    { symbol: "Ac", number: 89, name: "アクチニウム", rarity: "legendary", category: "actinide", item: "☢️", itemName: "中性子源", trivia: "強い放射線を出す元素。" },
    { symbol: "Th", number: 90, name: "トリウム", rarity: "epic", category: "actinide", item: "💡", itemName: "ガスランタン", trivia: "未来の原子炉燃料？" },
    { symbol: "Pa", number: 91, name: "プロトアクチニウム", rarity: "legendary", category: "actinide", item: "🔬", itemName: "年代測定", trivia: "ウランの崩壊で生まれる希少元素。" },
    { symbol: "U", number: 92, name: "ウラン", rarity: "epic", category: "actinide", item: "⚡", itemName: "原子力発電", trivia: "核分裂で巨大なエネルギーを生み出す。自然界に存在する最も重い元素。" },
    { symbol: "Np", number: 93, name: "ネプツニウム", rarity: "legendary", category: "actinide", item: "🔬", itemName: "研究用", trivia: "最初の超ウラン元素。" },
    { symbol: "Pu", number: 94, name: "プルトニウム", rarity: "legendary", category: "actinide", item: "🚀", itemName: "宇宙探査機", trivia: "火星探査機の電池に使われる！" },
    { symbol: "Am", number: 95, name: "アメリシウム", rarity: "legendary", category: "actinide", item: "🚨", itemName: "煙探知機", trivia: "家の火災報知器に入ってるよ。" },
    { symbol: "Cm", number: 96, name: "キュリウム", rarity: "legendary", category: "actinide", item: "☢️", itemName: "宇宙電源", trivia: "キュリー夫妻にちなんだ元素。" },
    { symbol: "Bk", number: 97, name: "バークリウム", rarity: "legendary", category: "actinide", item: "🧪", itemName: "研究用のみ", trivia: "バークレー研究所で作られた元素。" },
    { symbol: "Cf", number: 98, name: "カリホルニウム", rarity: "legendary", category: "actinide", item: "🔬", itemName: "中性子源", trivia: "1gで数億円する超高価な元素！" },
    { symbol: "Es", number: 99, name: "アインスタイニウム", rarity: "legendary", category: "actinide", item: "💣", itemName: "核実験で発見", trivia: "水爆実験で見つかった元素。" },
    { symbol: "Fm", number: 100, name: "フェルミウム", rarity: "legendary", category: "actinide", item: "⚛️", itemName: "原子核研究", trivia: "フェルミにちなんだ100番元素！" },
    { symbol: "Md", number: 101, name: "メンデレビウム", rarity: "legendary", category: "actinide", item: "🧪", itemName: "実験室のみ", trivia: "周期表を作ったメンデレーエフの名を持つ。" },
    { symbol: "No", number: 102, name: "ノーベリウム", rarity: "legendary", category: "actinide", item: "🏆", itemName: "ノーベル賞", trivia: "ノーベル賞にちなんだ元素。" },
    { symbol: "Lr", number: 103, name: "ローレンシウム", rarity: "legendary", category: "actinide", item: "⚛️", itemName: "加速器実験", trivia: "ローレンスにちなんだ元素。" },

    // 第7周期（続き）
    { symbol: "Rf", number: 104, name: "ラザホージウム", rarity: "legendary", category: "transition", item: "🔬", itemName: "核物理研究", trivia: "ラザフォードにちなんだ元素。" },
    { symbol: "Db", number: 105, name: "ドブニウム", rarity: "legendary", category: "transition", item: "⚛️", itemName: "実験室のみ", trivia: "ロシアのドゥブナで作られた。" },
    { symbol: "Sg", number: 106, name: "シーボーギウム", rarity: "legendary", category: "transition", item: "🧪", itemName: "人工合成", trivia: "シーボーグにちなんだ元素。" },
    { symbol: "Bh", number: 107, name: "ボーリウム", rarity: "legendary", category: "transition", item: "⚛️", itemName: "粒子加速器", trivia: "ボーアにちなんだ元素。" },
    { symbol: "Hs", number: 108, name: "ハッシウム", rarity: "legendary", category: "transition", item: "🔬", itemName: "ドイツで合成", trivia: "ヘッセン州にちなんだ元素。" },
    { symbol: "Mt", number: 109, name: "マイトネリウム", rarity: "legendary", category: "transition", item: "⚛️", itemName: "原子核研究", trivia: "マイトナーにちなんだ元素。" },
    { symbol: "Ds", number: 110, name: "ダームスタチウム", rarity: "legendary", category: "transition", item: "🧪", itemName: "人工元素", trivia: "ダルムシュタットで作られた。" },
    { symbol: "Rg", number: 111, name: "レントゲニウム", rarity: "legendary", category: "transition", item: "💀", itemName: "X線発見", trivia: "レントゲンにちなんだ元素。" },
    { symbol: "Cn", number: 112, name: "コペルニシウム", rarity: "legendary", category: "transition", item: "🌍", itemName: "地動説", trivia: "コペルニクスにちなんだ元素。" },
    { symbol: "Nh", number: 113, name: "ニホニウム", rarity: "legendary", category: "metal", item: "🗾", itemName: "日本発見！", trivia: "日本が発見した初めての元素、誇り！" },
    { symbol: "Fl", number: 114, name: "フレロビウム", rarity: "legendary", category: "metal", item: "⚛️", itemName: "ロシア合成", trivia: "フレロフにちなんだ元素。" },
    { symbol: "Mc", number: 115, name: "モスコビウム", rarity: "legendary", category: "metal", item: "🏛️", itemName: "モスクワ", trivia: "モスクワにちなんだ元素。" },
    { symbol: "Lv", number: 116, name: "リバモリウム", rarity: "legendary", category: "metal", item: "🇺🇸", itemName: "米国合成", trivia: "リバモア研究所にちなんだ元素。" },
    { symbol: "Ts", number: 117, name: "テネシン", rarity: "legendary", category: "halogen", item: "🔬", itemName: "テネシー", trivia: "テネシー州にちなんだ元素。" },
    { symbol: "Og", number: 118, name: "オガネソン", rarity: "legendary", category: "noble_gas", item: "👑", itemName: "周期表の王", trivia: "周期表の最後を飾る118番元素！" }
];

// レアリティ別の出現確率
const RARITY_WEIGHTS = {
    common: 70,      // 70%
    rare: 20,        // 20%
    epic: 8,         // 8%
    legendary: 2     // 2%
};

// カテゴリ別の色設定
const CATEGORY_COLORS = {
    nonmetal: { bg: "linear-gradient(135deg, #b5ead7, #8ac6d1)", text: "#2d5a5a" },
    metal: { bg: "linear-gradient(135deg, #c7ceea, #a2d9ff)", text: "#2d4a6a" },
    metalloid: { bg: "linear-gradient(135deg, #e8d5b7, #d4af37)", text: "#5a4a2a" },
    noble_gas: { bg: "linear-gradient(135deg, #dda0dd, #c8a2c8)", text: "#5a2d5a" },
    halogen: { bg: "linear-gradient(135deg, #ff9aa2, #ffb7b2)", text: "#6a2d2d" },
    transition: { bg: "linear-gradient(135deg, #ffdac1, #ffb088)", text: "#6a3d2a" },
    lanthanide: { bg: "linear-gradient(135deg, #f0e68c, #daa520)", text: "#5a4a1a" },
    actinide: { bg: "linear-gradient(135deg, #ff6b9d, #c44569)", text: "#6a1a2a" }
};
