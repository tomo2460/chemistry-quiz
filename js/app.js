const App = {
    state: {
        targetQuestionCount: 20, // Default 20, can be 10
        questions: [],
        currentQuestionIndex: 0,
        retryQueue: [],
        isRetryMode: false,
        correctCount: 0,
        startTime: null,
        endTime: null,

        // New stats for titles
        currentRunStreak: 0,
        maxStreak: 0,
        retriesPerQuestion: {}, // { questionId: count } for "Transition State Walker"

        userProgress: {
            unlockedTitles: [],
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
            collection: document.getElementById('collection-screen')
        },
        buttons: {
            // start: document.getElementById('start-btn'), // Old button
            start10: document.getElementById('start-10-btn'),
            start20: document.getElementById('start-20-btn'),
            collection: document.getElementById('collection-btn'),
            home: document.getElementById('home-btn'),
            retryResult: document.getElementById('retry-btn'),
            back: document.getElementById('back-btn'),
            next: document.getElementById('next-btn')
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

        buttons.collection.addEventListener('click', () => App.showCollection());
        buttons.home.addEventListener('click', () => App.switchScreen('title'));

        // Retry with same count
        buttons.retryResult.addEventListener('click', () => App.startQuiz(App.state.targetQuestionCount));

        buttons.back.addEventListener('click', () => App.switchScreen('title'));
        buttons.next.addEventListener('click', () => App.nextQuestion()); // feedback next
    },

    switchScreen: (screenName) => {
        Object.values(App.elements.screens).forEach(el => {
            el.classList.remove('active');
            setTimeout(() => {
                if (!el.classList.contains('active')) el.classList.add('hidden');
            }, 300);
        });

        const target = App.elements.screens[screenName];
        target.classList.remove('hidden');
        setTimeout(() => {
            target.classList.add('active');
        }, 50);
    },

    startQuiz: (count) => {
        App.state.targetQuestionCount = count;
        App.state.isRetryMode = false;
        App.state.retryQueue = [];
        App.state.correctCount = 0;
        App.state.currentQuestionIndex = 0;

        // Reset Logic Vars
        App.state.currentRunStreak = 0;
        App.state.maxStreak = 0;
        App.state.retriesPerQuestion = {};

        App.updateMascot('normal');

        // Random Selection
        const shuffledPool = [...QUESTION_DATA].sort(() => 0.5 - Math.random());
        App.state.questions = shuffledPool.slice(0, count);

        App.state.startTime = Date.now();
        App.switchScreen('quiz');
        App.renderQuestion();
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

        quiz.questionText.textContent = q.text;

        if (q.type === 'visual' && q.diagramType === 'atom_shell') {
            Visuals.renderAtomShell(quiz.visualArea, q.diagramData);
        }

        quiz.optionsContainer.innerHTML = '';
        const indices = [0, 1, 2, 3].sort(() => 0.5 - Math.random());

        indices.forEach(i => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = q.options[i];
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
        quiz.explanationText.textContent = q.explanation;
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
            if (!isCorrect) {
                App.state.retryQueue.push(q);
                // Increment retry count for title logic
                if (!App.state.retriesPerQuestion[q.id]) App.state.retriesPerQuestion[q.id] = 0;
                App.state.retriesPerQuestion[q.id]++;
            }
            // In retry mode, we might want to keep him happy if they are doing well, 
            // strictly streak based logic above applies to "currentRunStreak" which resets on error.
            // Let's assume streak logic applies here too if we tracked it in retry mode,
            // but requirements said "Current Streak". Current logic only tracks streak in Main Mode clearly.
            // Let's keep it simple: Normal in retry mode unless we add streak logic there.
            // Actually, let's reset to normal when entering retry mode or staying normal.
            App.updateMascot('normal');
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
        result.timeVal.textContent = `${mins}:${secs}`;

        if (gainedTitles.length > 0) {
            result.newTitleContainer.classList.remove('hidden');
            result.newTitleDisplay.innerHTML = gainedTitles.map(t =>
                `<div><strong style="color:var(--primary-dark)">${t.name}</strong><br><small>${t.desc}</small></div>`
            ).join('<hr style="border:none; border-top:1px dashed #ccc; margin:10px 0;">');
        } else {
            result.newTitleContainer.classList.add('hidden');
        }

        App.switchScreen('result');
    },

    showCollection: () => {
        const { collection } = App.elements;
        collection.grid.innerHTML = '';

        TITLES.forEach(t => {
            const isUnlocked = App.state.userProgress.unlockedTitles.includes(t.id);
            const item = document.createElement('div');
            item.className = `collection-item ${isUnlocked ? 'unlocked' : ''}`;

            const icon = document.createElement('div');
            icon.className = 'collection-icon';
            icon.textContent = isUnlocked ? '🏆' : '🔒';

            const info = document.createElement('div');
            info.innerHTML = `<strong>${isUnlocked ? t.name : '？？？'}</strong><br><small>${isUnlocked ? t.desc : '獲得条件不明'}</small>`;

            item.appendChild(icon);
            item.appendChild(info);
            collection.grid.appendChild(item);
        });

        App.switchScreen('collection');
    }
};

window.addEventListener('DOMContentLoaded', App.init);
