// localStorage管理モジュール
const Storage = {
    KEY: 'chemistryQuizData',

    // データの読み込み
    load() {
        const data = localStorage.getItem(this.KEY);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error('Failed to parse localStorage data:', e);
                return this.getDefaultData();
            }
        }
        return this.getDefaultData();
    },

    // デフォルトデータ
    getDefaultData() {
        return {
            stats: {
                totalAttempts: 0,
                totalCorrect: 0,
                bestStreak: 0,
                completedQuestions: []
            },
            unlockedTitles: [],
            collectedElements: [],           // 獲得済み元素の原子番号リスト
            collectionTimestamps: {},        // { "1": "2026-02-02T...", "2": "..." }
            newElements: []                  // 新規獲得元素（未確認）
        };
    },

    // データの保存
    save(data) {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            return false;
        }
    },

    // 元素を獲得
    collectElement(elementNumber) {
        elementNumber = Number(elementNumber);
        const data = this.load();

        // 既に持っているか確認
        if (data.collectedElements.includes(elementNumber)) {
            return { isNew: false, element: null };
        }

        // 新規獲得
        data.collectedElements.push(elementNumber);
        data.collectionTimestamps[elementNumber] = new Date().toISOString();
        data.newElements.push(elementNumber); // 未確認リストに追加

        this.save(data);

        const element = ELEMENTS.find(e => e.number === elementNumber);
        return { isNew: true, element };
    },

    // 新規獲得元素を確認済みにする
    markElementsAsViewed() {
        const data = this.load();
        data.newElements = [];
        this.save(data);
    },

    // 獲得済み元素を取得
    getCollectedElements() {
        const data = this.load();
        return data.collectedElements.map(Number).sort((a, b) => a - b);
    },

    // 未獲得元素を取得
    getUncollectedElements() {
        const data = this.load();
        const collected = new Set(data.collectedElements);
        return ELEMENTS.filter(e => !collected.has(e.number));
    },

    // コレクション進捗
    getCollectionProgress() {
        const data = this.load();
        return {
            total: ELEMENTS.length,
            collected: data.collectedElements.length,
            percentage: Math.round((data.collectedElements.length / ELEMENTS.length) * 100)
        };
    },

    // 称号チェック（元素コレクション関連）
    checkElementTitles() {
        const data = this.load();
        const collected = new Set(data.collectedElements);
        const newTitles = [];

        // 貴金属の錬金術師（Au, Ag, Pt, Pd）
        const preciousMetals = [79, 78, 47, 46];
        if (preciousMetals.every(n => collected.has(n)) && !data.unlockedTitles.includes('貴金属の錬金術師')) {
            newTitles.push('貴金属の錬金術師');
        }

        // 希ガスマスター（He, Ne, Ar, Kr, Xe, Rn）
        const nobleGases = [2, 10, 18, 36, 54, 86];
        if (nobleGases.every(n => collected.has(n)) && !data.unlockedTitles.includes('希ガスマスター')) {
            newTitles.push('希ガスマスター');
        }

        // ハロゲンハンター（F, Cl, Br, I, At）
        const halogens = [9, 17, 35, 53, 85];
        if (halogens.every(n => collected.has(n)) && !data.unlockedTitles.includes('ハロゲンハンター')) {
            newTitles.push('ハロゲンハンター');
        }

        // 元素博士（全118元素）
        if (data.collectedElements.length === 118 && !data.unlockedTitles.includes('元素博士')) {
            newTitles.push('元素博士');
        }

        // ニホニウムの誇り（ニホニウム獲得）
        if (collected.has(113) && !data.unlockedTitles.includes('ニホニウムの誇り')) {
            newTitles.push('ニホニウムの誇り');
        }

        // 新規称号があれば保存
        if (newTitles.length > 0) {
            data.unlockedTitles.push(...newTitles);
            this.save(data);
        }

        return newTitles;
    }
};
