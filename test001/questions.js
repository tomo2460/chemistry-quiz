const questions = [
  {
    id: 1,
    text: "原子の構成要素のうち、正（プラス）の電気を帯びているものはどれ？",
    choices: ["電子", "陽子", "中性子", "原子核"],
    correctIndex: 1,
    explanation: "陽子は正（+）の電気、電子は負（-）の電気を帯びています。中性子は電気を帯びていません。"
  },
  {
    id: 2,
    text: "原子番号は何の数と等しい？",
    choices: ["中性子の数", "質量数", "陽子の数", "価電子の数"],
    correctIndex: 2,
    explanation: "原子番号は、その原子の原子核に含まれる陽子の数と等しくなります。"
  },
  {
    id: 3,
    text: "原子核の陽子の数と中性子の数の和を何という？",
    choices: ["原子量", "質量数", "原子番号", "電子親和力"],
    correctIndex: 1,
    explanation: "質量数 = 陽子の数 + 中性子の数 です。電子の質量は非常に小さいため、原子の質量はほぼ原子核で決まります。"
  },
  {
    id: 4,
    text: "同じ元素で、中性子の数が異なる原子同士を何という？",
    choices: ["同素体", "同位体", "同族元素", "希ガス"],
    correctIndex: 1,
    explanation: "同位体（アイソトープ）は、原子番号（陽子の数）は同じですが、中性子の数が異なるため質量数が異なる原子のことです。"
  },
  {
    id: 5,
    text: "ナトリウム原子（Na）が１個の電子を失うと、どのようなイオンになる？",
    choices: ["一価の陽イオン", "二価の陽イオン", "一価の陰イオン", "二価の陰イオン"],
    correctIndex: 0,
    explanation: "ナトリウムは第1族元素で、価電子を1個持ちます。これを1個失うことで、安定な1価の陽イオン（Na+）になります。"
  },
  {
    id: 6,
    text: "次のうち、金属結合でできている物質はどれ？",
    choices: ["塩化ナトリウム (NaCl)", "ダイヤモンド (C)", "銅 (Cu)", "水 (H2O)"],
    correctIndex: 2,
    explanation: "銅 (Cu) は金属元素の単体であり、自由電子による金属結合でできています。NaClはイオン結合、ダイヤモンドは共有結合、水は共有結合（分子間力）です。"
  },
  {
    id: 7,
    text: "非金属元素の原子同士が、電子を共有してできる結合を何という？",
    choices: ["イオン結合", "金属結合", "共有結合", "水素結合"],
    correctIndex: 2,
    explanation: "共有結合は、非金属元素の原子同士がお互いの電子（不対電子）を出し合って共有し、結びつく結合です。"
  },
  {
    id: 8,
    text: "希ガス元素（ヘリウム、ネオンなど）の価電子の数は、ヘリウムを除いていくつか？",
    choices: ["0個", "1個", "7個", "8個"],
    correctIndex: 0,
    explanation: "希ガスは最外殻電子が満たされており（オクテット則）、化学的に非常に安定しているため、価電子の数は0と扱います。" // Note: Sometimes taught as 8 in outermost, but valence is 0. Convention varies but 0 is standard for reactivity context in JP high school. Let's adjust if needed to "最外殻電子の数" or "価電子". For "価電子" it is usually 0. Let's check context. In JP text books, valence electrons (価電子) of noble gases are 0.
  },
  {
    id: 9,
    text: "塩化ナトリウム（NaCl）の水用液が電気を通す理由は？",
    choices: ["自由電子が移動するから", "電離してイオンが生じるから", "分子が動き回るから", "金属結合しているから"],
    correctIndex: 1,
    explanation: "塩化ナトリウムは電解質であり、水に溶けると陽イオンと陰イオンに電離します。これらのイオンが移動することで電気を通します。"
  },
  {
    id: 10,
    text: "周期表の縦の列を何という？",
    choices: ["周期", "族", "殻", "遷移"],
    correctIndex: 1,
    explanation: "周期表の縦の列は「族」、横の行は「周期」と呼びます。同じ族の元素は価電子数が同じで、化学的性質が似ています。"
  }
];
