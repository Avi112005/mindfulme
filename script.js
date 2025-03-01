document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Mood Selection
    const moodButtons = document.querySelectorAll('.mood-btn');
    let selectedMood = null;

    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            // Add selected class to clicked button
            button.classList.add('selected');
            selectedMood = button.getAttribute('data-mood');
        });
    });

    // Journal Prompts
    const promptButtons = document.querySelectorAll('.prompt-btn');
    const journalEntry = document.getElementById('journalEntry');

    promptButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentText = journalEntry.value;
            const promptText = button.textContent;
            journalEntry.value = currentText + (currentText ? '\n\n' : '') + promptText + '\n';
            journalEntry.focus();
        });
    });

    // Breathing Exercise
    const startBreathingBtn = document.getElementById('startBreathing');
    const breathingText = document.getElementById('breathingText');
    let isBreathing = false;
    let breathingInterval;

    startBreathingBtn.addEventListener('click', () => {
        if (!isBreathing) {
            isBreathing = true;
            startBreathingBtn.textContent = 'Stop Exercise';
            startBreathingExercise();
        } else {
            isBreathing = false;
            startBreathingBtn.textContent = 'Start Exercise';
            clearInterval(breathingInterval);
            breathingText.textContent = 'Click start to begin';
        }
    });

    function startBreathingExercise() {
        let phase = 0; // 0: inhale, 1: hold, 2: exhale
        let count = 4; // Start with inhale

        breathingInterval = setInterval(() => {
            if (phase === 0) {
                breathingText.textContent = `Breathe in... ${count}`;
                count--;
                if (count < 0) {
                    phase = 1;
                    count = 7;
                }
            } else if (phase === 1) {
                breathingText.textContent = `Hold... ${count}`;
                count--;
                if (count < 0) {
                    phase = 2;
                    count = 8;
                }
            } else {
                breathingText.textContent = `Breathe out... ${count}`;
                count--;
                if (count < 0) {
                    phase = 0;
                    count = 4;
                }
            }
        }, 1000);
    }

    // Sound Mixer
    const volumeSliders = document.querySelectorAll('.volume-slider');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNodes = [];

    volumeSliders.forEach((slider, index) => {
        const gainNode = audioContext.createGain();
        gainNodes.push(gainNode);
        gainNode.connect(audioContext.destination);

        slider.addEventListener('input', () => {
            const volume = slider.value / 100;
            gainNode.gain.value = volume;
        });
    });

    // Chatbot Quick Responses
    const quickResponseBtns = document.querySelectorAll('.quick-response-btn');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    const sendBtn = document.querySelector('.send-btn');

    quickResponseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.textContent;
            addUserMessage(message);
            simulateBotResponse(message);
        });
    });

    sendBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            simulateBotResponse(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateBotResponse(userMessage) {
        // Simple response logic - in a real app, this would be more sophisticated
        setTimeout(() => {
            let response;
            if (userMessage.toLowerCase().includes('anxiety')) {
                response = "I understand anxiety can be challenging. Would you like to try a quick breathing exercise?";
            } else if (userMessage.toLowerCase().includes('sad')) {
                response = "I'm here to listen. Would you like to talk about what's making you feel sad?";
            } else if (userMessage.toLowerCase().includes('sleep')) {
                response = "Having trouble sleeping is common. Would you like some relaxation techniques that might help?";
            } else {
                response = "I'm here to support you. Would you like to try some calming exercises or talk more about how you're feeling?";
            }
            addBotMessage(response);
        }, 1000);
    }

    // Stress Level Selection
    const stressButtons = document.querySelectorAll('.stress-btn');
    let selectedStressLevel = null;

    stressButtons.forEach(button => {
        button.addEventListener('click', () => {
            stressButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedStressLevel = button.getAttribute('data-level');
        });
    });

    // Category Tabs in Self-Care Section
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');
            const category = tab.getAttribute('data-category');
            document.getElementById(`${category}-content`).classList.add('active');
        });
    });

    // Grounding Technique Navigation
    const techniqueBtns = document.querySelectorAll('.technique-btn');
    const groundingExercises = document.querySelectorAll('.grounding-exercise');

    techniqueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            techniqueBtns.forEach(b => b.classList.remove('active'));
            groundingExercises.forEach(exercise => exercise.classList.remove('active'));

            btn.classList.add('active');
            const technique = btn.textContent.toLowerCase().replace(/\s+/g, '-');
            document.getElementById(`exercise-${technique}`).classList.add('active');
        });
    });

    // Emergency Support
    const panicButton = document.getElementById('panicButton');
    
    panicButton.addEventListener('click', () => {
        // In a real app, this would trigger emergency protocols
        const confirmation = confirm("Would you like to be connected to emergency support services?");
        if (confirmation) {
            // Simulate emergency contact
            alert("Connecting to emergency services... Please stay calm and remember to breathe.");
        }
    });

    // Initialize tooltips, if any
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            // Create and show tooltip
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);

            const rect = e.target.getBoundingClientRect();
            tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
            tooltipElement.style.left = `${rect.left + (rect.width - tooltipElement.offsetWidth) / 2}px`;
        });

        tooltip.addEventListener('mouseout', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});