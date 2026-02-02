const App = {
    state: {
        targetQuestionCount: 20,
        questions: [],
        currentQuestionIndex: 0,
        retryQueue: [],
        isRetryMode: false,
        correctCount: 0,
        startTime: null,
        endTime: null,

        // Selection Mode
        selectedQuestionIds: [],
        isSelectionMode: false,

        // New stats for titles
        currentRunStreak: 0,
        maxStreak: 0,
        retriesPerQuestion: {},

        userProgress: {
            unlockedTitles: [],
            completedQuestionIds: [], // Track cleared IDs
            playHistory: {
                totalPlays: 0
            }
        }
    },

    elements: {
        screens: {
            title: document.getElementById('title-screen'),
            quiz: document.getElementById('quiz-screen'),
            result: document.getElementById('result-screen'),
            collection: document.getElementById('collection-screen'),
            questionList: document.getElementById('question-list-screen'), // New Screen
            gacha: document.getElementById('gacha-screen'),
            periodicTable: document.getElementById('periodic-table-screen')
        },
        buttons: {
            // start: document.getElementById('start-btn'), // Old button
            start10: document.getElementById('start-10-btn'),
            start20: document.getElementById('start-20-btn'),
            collection: document.getElementById('collection-btn'),
            home: document.getElementById('home-btn'),
            retryResult: document.getElementById('retry-btn'),
            back: document.getElementById('back-btn'),
            next: document.getElementById('next-btn'),
            gachaBtn: document.getElementById('gacha-btn'),
            periodicTableBtn: document.getElementById('periodic-table-btn'),
            gachaCloseBtn: document.getElementById('gacha-close-btn'),
            periodicBackBtn: document.getElementById('periodic-back-btn')
        },
        quiz: {
            progressText: document.getElementById('progress-text'),
            progressBar: document.getElementById('progress-bar'),
            retryBadge: document.getElementById('retry-badge'),
            questionText: document.getElementById('question-text'),
            visualArea: document.getElementById('visual-area'),
            optionsContainer: document.getElementById('options-container'),
            feedbackOverlay: document.getElementById('feedback-overlay'),
            feedbackIcon: document.getElementById('feedback-icon'),
            feedbackText: document.getElementById('feedback-text'),
            explanationText: document.getElementById('explanation-text')
        },
        result: {
            scoreVal: document.getElementById('score-val'),
            timeVal: document.getElementById('time-val'),
            newTitleContainer: document.getElementById('new-title-container'),
            newTitleDisplay: document.getElementById('new-title-display')
        },
        collection: {
            grid: document.getElementById('collection-grid')
        },
        mascot: document.getElementById('denshi-kun')
    },

    init: () => {
        App.loadProgress();
        App.setupEventListeners();
        App.updateMascot('normal');
    },

    updateMascot: (state) => {
        const m = App.elements.mascot;
        // Reset classes
        m.classList.remove('normal', 'happy', 'evolved');
        m.classList.add(state);
    },

    loadProgress: () => {
        const stored = localStorage.getItem('chemistryApp_v1');
        if (stored) {
            App.state.userProgress = JSON.parse(stored);
        }
    },

    saveProgress: () => {
        localStorage.setItem('chemistryApp_v1', JSON.stringify(App.state.userProgress));
    },

    setupEventListeners: () => {
        const { buttons } = App.elements;
        // buttons.start.addEventListener('click', () => App.startQuiz(20)); // Fallback

        buttons.start10.addEventListener('click', () => App.startQuiz(10));
        buttons.start20.addEventListener('click', () => App.startQuiz(20));

        // New Listeners
        document.getElementById('q-list-btn').addEventListener('click', () => App.showQuestionList());
        document.getElementById('q-list-back-btn').addEventListener('click', () => App.switchScreen('title'));
        document.getElementById('start-selected-btn').addEventListener('click', () => App.startSelectedQuiz());

        document.getElementById('select-uncompleted-btn').addEventListener('click', () => {
            const uncompleted = QUESTION_DATA.filter(q =>
                !App.state.userProgress.completedQuestionIds ||
                !App.state.userProgress.completedQuestionIds.includes(q.id)
            ).map(q => q.id);

            App.state.selectedQuestionIds = uncompleted;
            App.showQuestionList(); // Re-render to show selection
            // Actually re-rendering is heavy, better to just update classes.
            // For simplicity, just update the grid items' classes?
            // Since showQuestionList rebuilds the grid based on selectedQuestionIds (Wait, the implementation above rebuilt it but didn't check IDs initially? No, let's look at showQuestionList again.
            // showQuestionList clears selectedQuestionIds at start! That's a bug if we want to preserve it or update it.
            // Wait, the previous implementation cleared it.
            // Let's modify logic: select-uncompleted should select them, then we update UI.
            // I will override the previous implementation of showQuestionList to NOT clear if we don't want to?
            // No, standard flow: Open Screen -> Clear Selection.
            // Inside screen: Click "Select All Uncompleted" -> Selects them.
            // So I need to implement `selectAllUncompleted` logic here correctly.

            // Let's reload the list with these selected.
            // But my showQuestionList currently clears selection. I should fix that or handle it.
            // I'll update the logic in the replacement to set state then manually update UI classes since I can't call showQuestionList without clearing (based on my memory of my code). 
            // Actually let's assume showQuestionList resets. 
            // So I will just update the DOM elements directly here for "Select Uncompleted".

            const items = document.querySelectorAll('.q-list-item');
            App.state.selectedQuestionIds = []; // Clear first to avoid dupes
            items.forEach(btn => {
                if (btn.classList.contains('uncompleted')) {
                    btn.classList.add('selected');
                    App.state.selectedQuestionIds.push(parseInt(btn.textContent));
                } else {
                    btn.classList.remove('selected');
                }
            });
            App.updateSelectionCount();
        });

        buttons.collection.addEventListener('click', () => App.showCollection());
        buttons.home.addEventListener('click', () => App.switchScreen('title'));

        // Retry with same count or ID list
        buttons.retryResult.addEventListener('click', () => {
            if (App.state.isSelectionMode) {
                App.startQuiz(App.state.selectedQuestionIds); // Retry selected
            } else {
                App.startQuiz(App.state.targetQuestionCount);
            }
        });

        buttons.home.addEventListener('click', () => App.switchScreen('title'));
        buttons.next.addEventListener('click', () => App.nextQuestion());
        buttons.back.addEventListener('click', () => App.switchScreen('title'));


        // ガチャ・元素コレクション関連
        buttons.gachaBtn.addEventListener('click', () => App.executeGacha());
        buttons.periodicTableBtn.addEventListener('click', () => App.showPeriodicTable());
        buttons.gachaCloseBtn.addEventListener('click', () => App.closeGacha());
        buttons.periodicBackBtn.addEventListener('click', () => App.switchScreen('title')); // feedback next
    },

    switchScreen: (screenName) => {
        Object.values(App.elements.screens).forEach(el => {
            el.classList.remove('active');
            setTimeout(() => {
                if (!el.classList.contains('active')) el.classList.add('hidden');
            }, 300);
        });

        const target = App.elements.screens[screenName];
        if (target) {
            target.classList.remove('hidden');
            // Force reflow
            void target.offsetWidth;
            setTimeout(() => {
                target.classList.add('active');
            }, 50);
        }
    },

    startQuiz: (countOrIds) => {
        // If array, it's specific IDs (Selection Mode)
        if (Array.isArray(countOrIds)) {
            App.state.targetQuestionCount = countOrIds.length;
            const pool = QUESTION_DATA.filter(q => countOrIds.includes(q.id));
            App.state.questions = pool.sort(() => 0.5 - Math.random()); // Shuffle selected too
            App.state.isSelectionMode = true;
            // Preserve selection for retry
            App.state.selectedQuestionIds = [...countOrIds];
        } else {
            // Normal Count Mode
            App.state.targetQuestionCount = countOrIds;
            const shuffledPool = [...QUESTION_DATA].sort(() => 0.5 - Math.random());
            App.state.questions = shuffledPool.slice(0, countOrIds);
            App.state.isSelectionMode = false;
            App.state.selectedQuestionIds = [];
        }

        App.state.isRetryMode = false;
        App.state.retryQueue = [];
        App.state.correctCount = 0;
        App.state.currentQuestionIndex = 0;

        // Reset Logic Vars
        App.state.currentRunStreak = 0;
        App.state.maxStreak = 0;
        App.state.retriesPerQuestion = {};

        App.updateMascot('normal');

        App.state.startTime = Date.now();
        App.switchScreen('quiz');
        App.renderQuestion();
    },

    showQuestionList: () => {
        const { questionList } = App.elements.screens;
        const grid = document.getElementById('q-list-grid');
        const countSpan = document.getElementById('q-list-count');

        grid.innerHTML = '';
        App.state.selectedQuestionIds = [];
        App.updateSelectionCount();

        QUESTION_DATA.forEach(q => {
            const isCompleted = App.state.userProgress.completedQuestionIds && App.state.userProgress.completedQuestionIds.includes(q.id);
            const btn = document.createElement('button');
            btn.className = `q-list-item ${isCompleted ? 'completed' : 'uncompleted'}`;
            btn.textContent = q.id;

            btn.onclick = () => {
                btn.classList.toggle('selected');
                if (App.state.selectedQuestionIds.includes(q.id)) {
                    App.state.selectedQuestionIds = App.state.selectedQuestionIds.filter(id => id !== q.id);
                } else {
                    App.state.selectedQuestionIds.push(q.id);
                }
                App.updateSelectionCount();
            };

            grid.appendChild(btn);
        });

        App.switchScreen('questionList');
    },

    updateSelectionCount: () => {
        const countSpan = document.getElementById('q-list-count');
        const count = App.state.selectedQuestionIds.length;
        if (countSpan) countSpan.textContent = `${count}問 選択中`;
    },

    startSelectedQuiz: () => {
        if (App.state.selectedQuestionIds.length === 0) {
            alert('問題を選択してください');
            return;
        }
        App.startQuiz(App.state.selectedQuestionIds);
    },

    renderQuestion: () => {
        const q = App.state.questions[App.state.currentQuestionIndex];
        const { quiz } = App.elements;

        quiz.feedbackOverlay.classList.add('hidden');
        quiz.visualArea.innerHTML = '';
        quiz.retryBadge.classList.toggle('hidden', !App.state.isRetryMode);

        // Progress
        const total = App.state.questions.length;
        const current = App.state.currentQuestionIndex + 1;
        quiz.progressText.textContent = App.state.isRetryMode
            ? `解き直し: 残り ${total - App.state.currentQuestionIndex}問`
            : `Q. ${current}/${total}`;

        const pct = (current / total) * 100;
        quiz.progressBar.style.width = App.state.isRetryMode ? '100%' : `${pct}%`;
        quiz.progressBar.style.backgroundColor = App.state.isRetryMode ? 'var(--secondary)' : 'var(--primary)';

        quiz.questionText.innerHTML = q.text;

        if (q.type === 'visual' && q.diagramType === 'atom_shell') {
            Visuals.renderAtomShell(quiz.visualArea, q.diagramData);
        }

        quiz.optionsContainer.innerHTML = '';
        const indices = [0, 1, 2, 3].sort(() => 0.5 - Math.random());

        indices.forEach(i => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = q.options[i];
            btn.onclick = () => App.handleAnswer(i, q.correctIndex);
            quiz.optionsContainer.appendChild(btn);
        });
    },

    handleAnswer: (selectedIndex, correctIndex) => {
        const { quiz } = App.elements;
        const q = App.state.questions[App.state.currentQuestionIndex];
        const isCorrect = selectedIndex === correctIndex;

        quiz.feedbackIcon.textContent = isCorrect ? '⭕' : '❌';
        quiz.feedbackIcon.className = 'feedback-icon ' + (isCorrect ? 'feedback-correct' : 'feedback-wrong');
        quiz.feedbackText.textContent = isCorrect ? '正解！' : '残念...';
        quiz.explanationText.innerHTML = q.explanation;
        quiz.feedbackOverlay.classList.remove('hidden');

        // Logic Update
        if (!App.state.isRetryMode) {
            // First run
            if (isCorrect) {
                App.state.correctCount++;
                App.state.currentRunStreak++;
                if (App.state.currentRunStreak > App.state.maxStreak) {
                    App.state.maxStreak = App.state.currentRunStreak;
                }

                // Mascot Logic: Happy if streak >= 3
                if (App.state.currentRunStreak >= 3) {
                    App.updateMascot('happy');
                } else {
                    App.updateMascot('normal');
                }
            } else {
                App.state.retryQueue.push(q);
                App.state.currentRunStreak = 0;
                // Mascot Logic: Reset to normal on error
                App.updateMascot('normal');

                // Track retry needed
                if (!App.state.retriesPerQuestion[q.id]) App.state.retriesPerQuestion[q.id] = 0;
                App.state.retriesPerQuestion[q.id]++;
            }
        } else {
            // Retry mode
            if (isCorrect) {
                // In retry mode, if correct, we consider it "cleared" for tracking purposes?
                // Actually, let's only mark 'completed' if cleared in main run OR cleared in retry.
                // Logic below handles checking round end.
            } else {
                App.state.retryQueue.push(q);
                if (!App.state.retriesPerQuestion[q.id]) App.state.retriesPerQuestion[q.id] = 0;
                App.state.retriesPerQuestion[q.id]++;
            }
            App.updateMascot('normal');
        }

        // Track Completion (New)
        if (isCorrect) {
            if (!App.state.userProgress.completedQuestionIds) App.state.userProgress.completedQuestionIds = [];
            if (!App.state.userProgress.completedQuestionIds.includes(q.id)) {
                App.state.userProgress.completedQuestionIds.push(q.id);
                App.saveProgress();
            }
        }
    },

    nextQuestion: () => {
        App.state.currentQuestionIndex++;

        if (App.state.currentQuestionIndex < App.state.questions.length) {
            App.renderQuestion();
        } else {
            App.checkRoundEnd();
        }
    },

    checkRoundEnd: () => {
        if (App.state.retryQueue.length > 0) {
            App.state.isRetryMode = true;
            App.state.questions = [...App.state.retryQueue];
            App.state.retryQueue = [];
            App.state.currentQuestionIndex = 0;
            App.renderQuestion();
        } else {
            App.endQuiz();
        }
    },

    endQuiz: () => {
        App.state.endTime = Date.now();
        const timeSeconds = Math.floor((App.state.endTime - App.state.startTime) / 1000);

        App.state.userProgress.playHistory.totalPlays++;

        // Always evolve at the end if cleared (Retries are enforced before endQuiz)
        App.updateMascot('evolved');

        // Count retries total (sum of all question retries)
        let totalRetries = 0;
        let maxRetriesPerQuestion = 0;
        Object.values(App.state.retriesPerQuestion).forEach(count => {
            totalRetries += count;
            if (count > maxRetriesPerQuestion) maxRetriesPerQuestion = count;
        });

        const simulationState = {
            playHistory: App.state.userProgress.playHistory,
            currentRun: {
                totalQuestions: App.state.targetQuestionCount,
                firstTryCorrect: App.state.correctCount,
                timeSeconds: timeSeconds,
                retryCount: totalRetries,
                maxStreak: App.state.maxStreak,
                maxRetriesPerQuestion: maxRetriesPerQuestion
            }
        };

        const gainedTitles = [];
        TITLES.forEach(t => {
            if (t.condition && t.condition(simulationState)) {
                if (!App.state.userProgress.unlockedTitles.includes(t.id)) {
                    App.state.userProgress.unlockedTitles.push(t.id);
                    gainedTitles.push(t);
                }
            }
        });

        App.saveProgress();

        const { result } = App.elements;
        result.scoreVal.textContent = `${App.state.correctCount} / ${App.state.targetQuestionCount}`;
        const mins = Math.floor(timeSeconds / 60).toString().padStart(2, '0');
        const secs = (timeSeconds % 60).toString().padStart(2, '0');

        if (gainedTitles

            .length > 0) {
            result.newTitleContainer.classList.remove('hidden');
            result.newTitleDisplay.innerHTML = gainedTitles.map(t =>
                `<div><strong style="color:var(--primary-dark)">${t.name}</strong><br><small>${t.desc}</small></div>`
            ).join('<hr style="border:none; border-top:1px dashed #ccc; margin:10px 0;">');
        } else {
            result.newTitleContainer.classList.add('hidden');
        }

        App.switchScreen('result');
        App.checkPerfectScore();
    },

    showCollection: () => {
        const { collection } = App.elements;
        collection.grid.innerHTML = '';
        collection.grid.className = 'collection-grid card-mode';

        TITLES.forEach(t => {
            const isUnlocked = App.state.userProgress.unlockedTitles.includes(t.id);

            const card = document.createElement('div');
            card.className = `title-card-item ${isUnlocked ? 'unlocked' : 'locked'}`;

            const imgFrame = document.createElement('div');
            imgFrame.className = 'card-frame';
            const img = document.createElement('img');
            img.src = isUnlocked && t.image ? t.image : 'assets/cards/card_locked.png';
            img.className = 'card-img';
            imgFrame.appendChild(img);

            const info = document.createElement('div');
            info.className = 'card-info';
            info.innerHTML = `
                <div class="card-name">${isUnlocked ? t.name : '？？？'}</div>
                <div class="card-desc">${isUnlocked ? t.desc : '条件未達成'}</div>
            `;

            card.appendChild(imgFrame);
            card.appendChild(info);
            collection.grid.appendChild(card);
        });

        App.switchScreen('collection');
    },

    // ==================== 元素コレクション機能 ====================

    checkPerfectScore: () => {
        const { correctCount, questions } = App.state;
        const isPerfect = correctCount === questions.length;

        const gachaBtn = document.getElementById('gacha-btn');
        if (isPerfect && gachaBtn) {
            gachaBtn.classList.remove('hidden');
        }
    },

    executeGacha: () => {
        const result = Gacha.executeGacha();

        if (!result.success) {
            alert(result.message);
            return;
        }

        App.showGachaAnimation(result.element, result.newTitles);
    },

    showGachaAnimation: (element, newTitles) => {
        App.switchScreen('gacha');

        const card = document.getElementById('gacha-card');
        const symbol = document.getElementById('gacha-symbol');
        const number = document.getElementById('gacha-number');
        const name = document.getElementById('gacha-name');
        const item = document.getElementById('gacha-item');
        const itemName = document.getElementById('gacha-item-name');
        const trivia = document.getElementById('gacha-trivia');
        const titlesDiv = document.getElementById('gacha-titles');

        const gachaImage = document.getElementById('gacha-image');
        const textContent = document.getElementById('gacha-text-content');

        // Text Content Setup
        symbol.textContent = element.symbol;
        number.textContent = element.number;
        name.textContent = element.name;
        item.textContent = element.item;
        itemName.textContent = element.itemName;
        trivia.textContent = element.trivia;

        card.className = 'gacha-card rarity-' + element.rarity;

        const cardBack = card.querySelector('.card-back');
        const colorScheme = CATEGORY_COLORS[element.category];
        if (colorScheme) {
            cardBack.style.background = colorScheme.bg;
            cardBack.style.color = colorScheme.text;
        }

        // Image Handling
        if (element.image) {
            gachaImage.src = element.image;
            gachaImage.classList.remove('hidden');
            textContent.classList.add('hidden'); // Hide text when image is present
            // Reset background for image card (optional, but good to avoid bleed)
            cardBack.style.background = '#000';
        } else {
            gachaImage.src = '';
            gachaImage.classList.add('hidden');
            textContent.classList.remove('hidden');
        }

        if (newTitles && newTitles.length > 0) {
            titlesDiv.innerHTML = '🎊 新しい称号を獲得！<br>' + newTitles.join(', ');
        } else {
            titlesDiv.innerHTML = '';
        }

        setTimeout(() => {
            card.classList.add('flipped');
        }, 500);

        App.updateMascot('happy');
    },

    closeGacha: () => {
        Storage.markElementsAsViewed();
        App.switchScreen('result');
        App.updateMascot('normal');

        const gachaBtn = document.getElementById('gacha-btn');
        if (gachaBtn) {
            gachaBtn.classList.add('hidden');
        }
    },

    showPeriodicTable: () => {
        App.renderPeriodicTable();
        App.switchScreen('periodicTable');
    },

    renderPeriodicTable: () => {
        console.log('App.renderPeriodicTable called');
        const table = document.getElementById('periodic-table');
        if (!table) {
            console.error('Error: periodic-table element not found');
            return;
        }

        const collectedElements = Storage.getCollectedElements();
        console.log('Collected elements:', collectedElements);

        const collectedSet = new Set(collectedElements);
        const progress = Storage.getCollectionProgress();

        const progressSpan = document.getElementById('collection-progress');
        if (progressSpan) {
            progressSpan.textContent = `${progress.collected}/118 (${progress.percentage}%)`;
        }

        const periodicLayout = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10],
            [11, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
            [55, 56, 0, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
            [87, 88, 0, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 0],
            [0, 0, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 0]
        ];

        table.innerHTML = '';
        let cellCount = 0;

        periodicLayout.forEach(row => {
            row.forEach(atomicNumber => {
                const cell = document.createElement('div');

                if (atomicNumber === 0) {
                    cell.className = 'element-cell empty';
                } else {
                    const element = ELEMENTS.find(e => e.number === atomicNumber);
                    if (!element) {
                        console.warn(`Element data missing for number ${atomicNumber}`);
                        return;
                    }

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

                    if (isUnlocked) {
                        cell.onclick = () => {
                            App.showElementDetail(element);
                        };
                    }
                }

                table.appendChild(cell);
            });
        });
    },

    showElementDetail: (element) => {
        const modal = document.getElementById('element-detail-modal');
        const img = document.getElementById('detail-image');
        const name = document.getElementById('detail-name');
        const itemName = document.getElementById('detail-item-name');
        const trivia = document.getElementById('detail-trivia');
        const closeBtn = document.getElementById('modal-close-btn');

        name.textContent = `${element.number}. ${element.name} (${element.symbol})`;
        itemName.textContent = `関連アイテム: ${element.itemName}`;
        trivia.textContent = element.trivia;

        if (element.image) {
            img.src = element.image;
            img.classList.remove('hidden');
        } else {
            img.src = '';
            img.classList.add('hidden');
        }

        modal.classList.remove('hidden');

        // Close handlers
        closeBtn.onclick = App.closeElementDetail;
        modal.onclick = (e) => {
            if (e.target === modal) App.closeElementDetail();
        };
    },

    closeElementDetail: () => {
        const modal = document.getElementById('element-detail-modal');
        modal.classList.add('hidden');
    }
};

window.addEventListener('DOMContentLoaded', App.init);
