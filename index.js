
feather.replace();


document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.word');
    const container = document.querySelector('.bounce');

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const getRandom = (min, max) => Math.random() * (max - min) + min;

    words.forEach(word => {
        const wordRect = word.getBoundingClientRect();
        const wordWidth = wordRect.width;
        const wordHeight = wordRect.height;

        let x = getRandom(0, containerWidth - wordWidth);
        let y = getRandom(0, containerHeight - wordHeight);
        let dx = getRandom(1, 3) * (Math.random() < 0.5 ? -1 : 1);
        let dy = getRandom(1, 3) * (Math.random() < 0.5 ? -1 : 1);

        word.style.left = `${x}px`;
        word.style.top = `${y}px`;

        const moveWord = () => {
            x += dx;
            y += dy;

            if (x <= 0 || x + wordWidth >= containerWidth) dx *= -1;
            if (y <= 0 || y + wordHeight >= containerHeight) dy *= -1;

            word.style.left = `${x}px`;
            word.style.top = `${y}px`;

            requestAnimationFrame(moveWord);
        };

        moveWord();
    });
});

