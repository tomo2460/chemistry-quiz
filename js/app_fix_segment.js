if (gainedTitles.length > 0) {
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
