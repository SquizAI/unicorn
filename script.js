document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const poopEmoji = document.querySelector('.poop-emoji');
    const musicToggle = document.getElementById('music-toggle');
    const poopMultiplier = document.getElementById('poop-multiplier');
    const secretMessage = document.querySelector('.secret-message');
    const emojiContainer = document.querySelector('.emoji-container');
    const rickRoll = document.getElementById('rickroll');
    
    // Set the Rick Roll music URL
    rickRoll.src = 'https://ia800206.us.archive.org/16/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp3';
    
    // Try to autoplay (browsers may block this, so we need a fallback)
    rickRoll.play().catch(e => {
        console.log('Autoplay prevented by browser:', e);
        // We'll keep the button for user interaction
    });
    
    // Funny poop facts for random display
    const poopFacts = [
        "Unicorn poop is actually where rainbows come from!",
        "Studies show that dancing poop emojis increase happiness by 420%!",
        "9 out of 10 unicorns prefer dancing while pooping!",
        "This poop has more rhythm than most humans!",
        "Warning: Excessive poop dancing may cause spontaneous jazz hands!",
        "Fun fact: This poop emoji has appeared on 'Dancing with the Stars'!",
        "This poop is actually gluten-free and vegan!",
        "Unicorn poop is the most magical poop in the universe!",
        "This poop emoji never went to dance school. It's self-taught!",
        "If you stare at this poop for too long, you might turn into a unicorn!"
    ];
    
    // Change poop facts randomly
    const funnyText = document.querySelector('.funny-text');
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * poopFacts.length);
        funnyText.textContent = poopFacts[randomIndex];
        funnyText.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
            funnyText.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
    }, 5000);
    
    // Make the poop emoji dance faster when clicked
    poopEmoji.addEventListener('click', () => {
        poopEmoji.style.animationDuration = '0.5s';
        
        // Add a random color filter
        const randomHue = Math.floor(Math.random() * 360);
        poopEmoji.style.filter = `hue-rotate(${randomHue}deg)`;
        
        // Play a random sound effect
        const sounds = ['pop', 'squish', 'splat'];
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        console.log(`${randomSound} sound would play here!`);
        
        // Reset animation speed after 3 seconds
        setTimeout(() => {
            poopEmoji.style.animationDuration = '3s';
        }, 3000);
    });
    
    // Update button text based on current play state
    if (!rickRoll.paused) {
        musicToggle.textContent = 'PAUSE THE MUSIC!';
        secretMessage.style.animationPlayState = 'running';
    }
    
    // Music toggle button
    musicToggle.addEventListener('click', () => {
        if (rickRoll.paused) {
            rickRoll.play();
            musicToggle.textContent = 'PAUSE THE MUSIC!';
            secretMessage.style.animationPlayState = 'running';
            
            // Shake everything when music starts
            document.querySelectorAll('*').forEach(element => {
                element.classList.add('animate__animated', 'animate__shakeX');
                setTimeout(() => {
                    element.classList.remove('animate__animated', 'animate__shakeX');
                }, 1000);
            });
        } else {
            rickRoll.pause();
            musicToggle.textContent = 'PLAY THE MUSIC!';
        }
    });
    
    // Poop multiplier button
    let poopCount = 1;
    poopMultiplier.addEventListener('click', () => {
        if (poopCount < 10) { // Limit to 10 poops for performance
            const newPoop = document.createElement('div');
            newPoop.className = 'extra-poop';
            newPoop.textContent = '💩';
            
            // Random position within container
            const randomX = Math.random() * 80 - 40; // -40% to 40%
            const randomY = Math.random() * 80 - 40; // -40% to 40%
            newPoop.style.left = `calc(50% + ${randomX}%)`;  
            newPoop.style.top = `calc(50% + ${randomY}%)`;
            
            // Random animation delay
            newPoop.style.animationDelay = `${Math.random() * 2}s`;
            
            emojiContainer.appendChild(newPoop);
            poopCount++;
            
            // Update button text
            if (poopCount >= 10) {
                poopMultiplier.textContent = 'THAT\'S A LOT OF POOP!';
                poopMultiplier.disabled = true;
                setTimeout(() => {
                    poopMultiplier.textContent = 'MORE POOP!';
                    poopMultiplier.disabled = false;
                    // Easter egg - after max poop, enable super rainbow mode
                    document.body.style.animation = 'rainbow-bg 5s ease infinite';
                }, 3000);
            }
        }
    });
    
    // Easter eggs and surprises
    let clickCount = 0;
    document.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 10) {
            alert('🦄 You\'ve unlocked SUPER UNICORN MODE! 🦄');
            document.querySelectorAll('.poop-emoji, .extra-poop').forEach(poop => {
                poop.textContent = '🦄';
                setTimeout(() => poop.textContent = '💩', 5000);
            });
        }
    });
    
    // Konami code easter egg (up, up, down, down, left, right, left, right, B, A)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate rainbow explosion
                document.body.style.background = 'url("https://media.giphy.com/media/26BRq9PYFJrqBzKbm/giphy.gif")';
                document.body.style.backgroundSize = 'cover';
                alert('🌈 RAINBOW EXPLOSION ACTIVATED! 🌈');
                konamiIndex = 0;
                
                // Reset after 5 seconds
                setTimeout(() => {
                    document.body.style.background = '';
                }, 5000);
            }
        } else {
            konamiIndex = 0;
        }
    });
});
