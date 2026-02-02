// ==================== 元素コレクション機能拡張 ====================
// app.jsに追加するコード

// 1. App.elements に新しい要素を追加
/*
元素コレクション関連の要素をApp.elements オブジェクトに追加:

ガチャ画面:
    gacha: document.getElementById('gacha-screen'),
    
周期表画面:
    periodicTable: document.getElementById('periodic-table-screen'),
    
ボタン:
    gachaBtn: document.getElementById('gacha-btn'),
    periodicTableBtn: document.getElementById('periodic-table-btn'),
    gachaCloseBtn: document.getElementById('gacha-close-btn'),
    periodicBackBtn: document.getElementById('periodic-back-btn'),
*/

// 2. setupEventListeners に追加
/*
buttons.gachaBtn.addEventListener('click', () => App.executeGacha());
buttons.periodicTableBtn.addEventListener('click', () => App.showPeriodicTable());
buttons.gachaCloseBtn.addEventListener('click', () => App.closeGacha());
buttons.periodicBackBtn.addEventListener('click', () => App.switchScreen('title'));
*/

// 3. 新しいメソッドを App オブジェクトに追加

// 全問正解チェック（result画面で呼び出し）
checkPerfectScore: () => {
    const { correctCount, questions } = App.state;
    const isPerfect = correctCount === questions.length;

    const gachaBtn = document.getElementById('gacha-btn');
    if (isPerfect && gachaBtn) {
        gachaBtn.classList.remove('hidden');
    }
},

    // ガチャ実行
    executeGacha: () => {
        const result = Gacha.executeGacha();

        if (!result.success) {
            alert(result.message);
            return;
        }

        // ガチャ画面に遷移
        App.showGachaAnimation(result.element, result.newTitles);
    },

        // ガチャアニメーション表示
        showGachaAnimation: (element, newTitles) => {
            App.switchScreen('gacha');

            const card = document.getElementById('gacha-card');
            const symbol = document.getElementById('gacha-symbol');
            const number = document.getElementById('gacha-number');
            const name = document.getElementById('gacha-name');
            const item = document.getElementById('gacha-item');
            const itemName = document.getElementById('gacha-item-name');
            const trivia = document.getElementById('gacha-trivia');
            const message = document.getElementById('gacha-message');
            const titlesDiv = document.getElementById('gacha-titles');

            // データセット
            symbol.textContent = element.symbol;
            number.textContent = element.number;
            name.textContent = element.name;
            item.textContent = element.item;
            itemName.textContent = element.itemName;
            trivia.textContent = element.trivia;

            // レアリティクラスを適用
            card.className = 'gacha-card rarity-' + element.rarity;

            // カードの色をカテゴリ別に設定
            const cardBack = card.querySelector('.card-back');
            const colorScheme = CATEGORY_COLORS[element.category];
            if (colorScheme) {
                cardBack.style.background = colorScheme.bg;
                cardBack.style.color = colorScheme.text;
            }

            // 称号表示
            if (newTitles && newTitles.length > 0) {
                titlesDiv.innerHTML = '🎊 新しい称号を獲得！<br>' + newTitles.join(', ');
            } else {
                titlesDiv.innerHTML = '';
            }

            // フリップアニメーション開始
            setTimeout(() => {
                card.classList.add('flipped');
            }, 500);

            // 電子くんを喜ばせる
            App.updateMascot('happy');
        },

            // ガチャ画面を閉じる
            closeGacha: () => {
                Storage.markElementsAsViewed();
                App.switchScreen('result');
                App.updateMascot('normal');

                // ガチャボタンを非表示にする
                const gachaBtn = document.getElementById('gacha-btn');
                if (gachaBtn) {
                    gachaBtn.classList.add('hidden');
                }
            },

                // 周期表画面を表示
                showPeriodicTable: () => {
                    App.renderPeriodicTable();
                    App.switchScreen('periodic-table');
                },

                    // 周期表をレンダリング
                    renderPeriodicTable: () => {
                        const table = document.getElementById('periodic-table');
                        const collectedElements = Storage.getCollectedElements();
                        const collectedSet = new Set(collectedElements);
                        const progress = Storage.getCollectionProgress();

                        // 進捗表示を更新
                        const progressSpan = document.getElementById('collection-progress');
                        if (progressSpan) {
                            progressSpan.textContent = `${progress.collected}/118 (${progress.percentage}%)`;
                        }

                        // 周期表の配置マップ（1-indexed、空白は0）
                        const periodicLayout = [
                            // 第1周期
                            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                            // 第2周期
                            [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
                            // 第3周期
                            [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
                            // 第4周期
                            [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
                            // 第5周期
                            [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                            // 第6周期
                            [55, 56, 0, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
                            // 第7周期
                            [87, 88, 0, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
                            // 空行
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            // ランタノイド
                            [0, 0, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0],
                            // アクチノイド
                            [0, 0, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0]
                        ];

                        table.innerHTML = '';

                        periodicLayout.forEach(row => {
                            row.forEach(atomicNumber => {
                                const cell = document.createElement('div');

                                if (atomicNumber === 0) {
                                    // 空白セル
                                    cell.className = 'element-cell empty';
                                } else {
                                    const element = ELEMENTS.find(e => e.number === atomicNumber);
                                    const isUnlocked = collectedSet.has(atomicNumber);

                                    cell.className = `element-cell ${isUnlocked ? 'unlocked' : 'locked'}`;
                                    if (isUnlocked) {
                                        cell.classList.add('category-' + element.category);
                                    }

                                    cell.innerHTML = `
                    <div class="number">${atomicNumber}</div>
                    <div class="symbol">${isUnlocked ? element.symbol : '?'}</div>
                    <div class="name">${isUnlocked ? element.name : '???'}</div>
                `;

                                    // クリックで詳細表示（オプション）
                                    if (isUnlocked) {
                                        cell.onclick = () => {
                                            alert(`${element.name} (${element.symbol})\n${element.itemName}\n${element.trivia}`);
                                        };
                                    }
                                }

                                table.appendChild(cell);
                            });
                        });
                    },

// Result画面の表示処理を拡張（既存コードに追加）
/*
showResult メソッドの最後に以下を追加:
    App.checkPerfectScore();
*/
