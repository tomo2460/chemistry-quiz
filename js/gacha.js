// 元素ガチャシステム
const Gacha = {
    // レアリティ別の元素リストを作成
    getElementsByRarity() {
        const byRarity = {
            common: [],
            rare: [],
            epic: [],
            legendary: []
        };

        ELEMENTS.forEach(element => {
            byRarity[element.rarity].push(element);
        });

        return byRarity;
    },

    // レアリティを抽選
    rollRarity() {
        const rand = Math.random() * 100;
        let cumulative = 0;

        for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
            cumulative += weight;
            if (rand < cumulative) {
                return rarity;
            }
        }

        return 'common'; // フォールバック
    },

    // 元素を1つ抽選
    rollElement() {
        const uncollected = Storage.getUncollectedElements();

        // 全元素コンプリート済みの場合
        if (uncollected.length === 0) {
            // ランダムに1つ返す（重複メッセージ用）
            return {
                isDuplicate: true,
                element: ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)]
            };
        }

        // レアリティを決定
        const targetRarity = this.rollRarity();

        // 未獲得の中から、そのレアリティの元素を抽選
        const candidates = uncollected.filter(e => e.rarity === targetRarity);

        // そのレアリティに未獲得が無い場合、未獲得全体からランダム
        if (candidates.length === 0) {
            const randomElement = uncollected[Math.floor(Math.random() * uncollected.length)];
            return {
                isDuplicate: false,
                element: randomElement
            };
        }

        // 抽選
        const element = candidates[Math.floor(Math.random() * candidates.length)];
        return {
            isDuplicate: false,
            element
        };
    },

    // ガチャ実行（獲得処理込み）
    executeGacha() {
        const result = this.rollElement();

        if (result.isDuplicate) {
            return {
                success: false,
                message: 'すべての元素をコンプリートしました！',
                element: result.element
            };
        }

        // 獲得処理
        const collectResult = Storage.collectElement(result.element.number);

        // 称号チェック
        const newTitles = Storage.checkElementTitles();

        return {
            success: true,
            element: result.element,
            isNew: collectResult.isNew,
            newTitles: newTitles
        };
    }
};
