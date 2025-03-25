document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const poopEmoji = document.querySelector('.poop-emoji');
    const musicToggle = document.getElementById('music-toggle');
    const poopMultiplier = document.getElementById('poop-multiplier');
    const secretMessage = document.querySelector('.secret-message');
    const emojiContainer = document.querySelector('.emoji-container');
    const rickRoll = document.getElementById('rickroll');
    const rickRollMuted = document.getElementById('rickroll-muted');
    const rickrollContainer = document.getElementById('rickroll-container');
    const youtubeLink = document.getElementById('youtube-link');
    const autoplayOverlay = document.getElementById('autoplay-overlay');
    
    // Track music state
    let isMusicPlaying = false;
    
    // Preload the audio
    rickRoll.preload = 'auto';
    rickRoll.volume = 1.0; // Full volume
    rickRollMuted.volume = 1.0;
    
    // Click overlay to start audio
    autoplayOverlay.addEventListener('click', function() {
        startEverything();
        autoplayOverlay.style.display = 'none';
    });
    
    // Function to start everything
    function startEverything() {
        console.log('Starting everything with user interaction...');
        
        // Try both audio elements
        const playPromise1 = rickRoll.play();
        const playPromise2 = rickRollMuted.play();
        
        // Unmute the muted one
        rickRollMuted.muted = false;
        
        // Show the dancing Rick
        rickrollContainer.style.display = 'block';
        
        // Update UI
        musicToggle.textContent = 'PAUSE THE MUSIC!';
        secretMessage.style.animationPlayState = 'running';
        isMusicPlaying = true;
        
        // Shake everything
        document.querySelectorAll('*').forEach(element => {
            element.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                element.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
        });
    }
    
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
    
    // Music toggle button
    musicToggle.addEventListener('click', () => {
        // Remove overlay if it's still there
        autoplayOverlay.style.display = 'none';
        
        if (!isMusicPlaying) {
            // Try to play both audio elements
            rickRoll.play().catch(e => console.error('Error playing main audio:', e));
            rickRollMuted.play().catch(e => console.error('Error playing backup audio:', e));
            
            // Make sure both are unmuted
            rickRoll.muted = false;
            rickRollMuted.muted = false;
            
            rickrollContainer.style.display = 'block';
            musicToggle.textContent = 'PAUSE THE MUSIC!';
            secretMessage.style.animationPlayState = 'running';
            isMusicPlaying = true;
            
            // Shake everything when music starts
            document.querySelectorAll('*').forEach(element => {
                element.classList.add('animate__animated', 'animate__shakeX');
                setTimeout(() => {
                    element.classList.remove('animate__animated', 'animate__shakeX');
                }, 1000);
            });
        } else {
            // Pause both audio elements
            rickRoll.pause();
            rickRollMuted.pause();
            musicToggle.textContent = 'PLAY THE MUSIC!';
            rickrollContainer.style.display = 'none';
            isMusicPlaying = false;
        }
    });
    
    // Global click handler for first interaction
    document.addEventListener('click', function() {
        // Remove overlay
        autoplayOverlay.style.display = 'none';
        
        // Start everything
        startEverything();
    }, { once: true });
    
    // Make sure the YouTube link is visible and clickable
    youtubeLink.addEventListener('click', (e) => {
        // We'll let this event propagate normally to open the link
        console.log('YouTube link clicked');
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
