const Visuals = {
    /**
     * Renders an Atom Shell diagram into the target element.
     * @param {HTMLElement} container - The DOM element to render into
     * @param {object} data - { protons: number, electrons: number[] }
     */
    renderAtomShell: (container, data) => {
        container.innerHTML = '';
        const atomDiv = document.createElement('div');
        atomDiv.className = 'atom-container';

        // Nucleus
        const nucleus = document.createElement('div');
        nucleus.className = 'nucleus';
        nucleus.textContent = data.protons + '+';
        atomDiv.appendChild(nucleus);

        // Electron Shells
        const maxRadius = 70; // px
        const shellStep = 20;

        data.electrons.forEach((count, index) => {
            const shellRadius = 25 + (index + 1) * shellStep;
            const shell = document.createElement('div');
            shell.className = 'shell';
            shell.style.width = (shellRadius * 2) + 'px';
            shell.style.height = (shellRadius * 2) + 'px';
            atomDiv.appendChild(shell);

            // Electrons
            const angleStep = 360 / count;
            for (let i = 0; i < count; i++) {
                const angle = (angleStep * i) - 90; // Start from top
                const rad = angle * (Math.PI / 180);
                const electron = document.createElement('div');
                electron.className = 'electron';
                // Calculate position relative to center (75, 75)
                // Shell radius is the distance from center
                // We translate -50% in CSS, so just need center + offset
                const x = 75 + shellRadius * Math.cos(rad);
                const y = 75 + shellRadius * Math.sin(rad);

                electron.style.left = x + 'px';
                electron.style.top = y + 'px';
                atomDiv.appendChild(electron);
            }
        });

        container.appendChild(atomDiv);
    },

    /**
     * Clears the visual area
     */
    clear: (container) => {
        container.innerHTML = '';
    }
};
