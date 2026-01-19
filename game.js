// Main game logic and state management
// Handles initialization, event loading, decision making, and UI updates

let gameState;

function init() {
    console.log("Initializing game");
    
    // Initialize game state
    gameState = {
        year: 1994,
        eventIndex: 0,
        revenue: 0,
        profit: 0,
        cash: 50000,
        valuation: 0,
        debt: 0,
        previousRevenue: 0,
        previousProfit: 0,
        
        // Decision tracking
        decisions: [],
        
        // Business state flags
        hasOutsideCEO: false,
        hasProfessionalBoard: false,
        hasGen3: false,
        robertRetired: false,
        robertDeceased: false,
        sarahCEO: false,
        michaelLeft: false,
        
        // Risk factors
        hasQualityIssues: false,
        hasDebt: false
    };
    
    // Initialize family members
    initializeFamily();
    updateFamilyDisplay();
    updateUI();
    
    console.log("Game initialized");
}

function startGame() {
    console.log("Starting game");
    
    // Hide intro
    document.getElementById('intro').classList.add('hidden');
    
    // Show game screen
    document.getElementById('gameScreen').classList.remove('hidden');
    
    // Load first event
    loadEvent();
}

function loadEvent() {
    console.log("Loading event", gameState.eventIndex);

    // Debug: Check if EVENTS is defined
    if (typeof EVENTS === 'undefined') {
        console.error("EVENTS array is undefined!");
        document.getElementById('eventDescription').textContent = "ERROR: Events data not loaded. Please check that events.js is loaded correctly.";
        return;
    }

    if (!EVENTS || EVENTS.length === 0) {
        console.error("EVENTS array is empty!");
        document.getElementById('eventDescription').textContent = "ERROR: No events found in events.js";
        return;
    }

    console.log("EVENTS array length:", EVENTS.length);

    const event = EVENTS[gameState.eventIndex];

    if (!event) {
        console.error("Event not found at index", gameState.eventIndex);
        document.getElementById('eventDescription').textContent = "ERROR: Event data missing for index " + gameState.eventIndex;
        return;
    }

    console.log("Event loaded:", event.title);

    // Process description to add state-dependent context
    // Check if description is a function and call it if needed
    let description = typeof event.description === 'function' ? event.description() : event.description;
    
    // Add state-dependent context for specific events
    if (gameState.eventIndex === 10) {
        // COVID event - add context about financial state
        if (gameState.cash > 1000000) {
            description = description.replace(
                "Robert faces brutal choices:",
                `Fortunately, the company has strong cash reserves of $${formatNumber(gameState.cash)}. But Robert still faces brutal choices:`
            );
        } else if (gameState.hasDebt && gameState.debt > 500000) {
            description = description.replace(
                "Robert is 61.",
                `Robert is 61. The company is carrying $${formatNumber(gameState.debt)} in debt, making this crisis even more dangerous.`
            );
        }
    } else if (gameState.eventIndex === 12) {
        // Michael's offer - reference compensation conflict
        const compensationEvent = gameState.decisions.find(d => d.event === 8);
        if (compensationEvent && compensationEvent.choice === 0) {
            description = description.replace(
                "He comes to Robert:",
                "\"Dad, I appreciate that you increased my salary, but even at $160K, I'm still watching Sarah make all the strategic decisions.\" He continues:"
            );
        }
    } else if (gameState.eventIndex === 13) {
        // Acquisition - adjust offer based on performance
        if (gameState.revenue > 10000000) {
            description = description.replace("$28M", "$35M");
        }
        if (gameState.michaelLeft) {
            description += "\n\nMichael left the business years ago. The remaining family wonders what he would think of this offer.";
        }
    } else if (gameState.eventIndex === 19) {
        // Strategic decision - reference current state
        if (gameState.revenue > 15000000) {
            description = description.replace(
                "The company is stable and profitable.",
                `The company is thriving with revenue over $${formatNumber(gameState.revenue)} annually.`
            );
        }
        if (gameState.hasDebt && gameState.debt > 2000000) {
            description += `\n\nThe company still carries $${formatNumber(gameState.debt)} in debt. Taking on more is risky.`;
        }
    } else if (gameState.eventIndex === 20) {
        // Final decision - personalize based on journey
        if (gameState.revenue > 20000000) {
            description = description.replace("$45M", "$55M");
        } else if (gameState.revenue < 10000000) {
            description = description.replace("$45M", "$30M");
        }
        
        const prevOffer = gameState.decisions.find(d => d.event === 13);
        if (prevOffer && prevOffer.choice === 1) {
            description += "\n\nThe family declined an offer back in 2026. Some wonder if they should have sold then.";
        }
    }
    
    // Update event display
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDescription').textContent = description;
    
    // Clear previous options and impact
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    document.getElementById('impactDisplay').classList.add('hidden');
    
    // Show options container
    optionsContainer.classList.remove('hidden');
    
    // Create option buttons
    event.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.addEventListener('click', () => {
            makeDecision(index, option);
        });
        optionsContainer.appendChild(button);
    });
}

function makeDecision(choiceIndex, option) {
    console.log("Making decision", choiceIndex);
    
    // Store decision
    gameState.decisions.push({
        event: gameState.eventIndex,
        choice: choiceIndex,
        year: gameState.year
    });
    
    // Apply effects
    applyEffects(option.effects);
    
    // Show impact
    const impactDisplay = document.getElementById('impactDisplay');
    impactDisplay.innerHTML = option.impact;
    impactDisplay.classList.remove('hidden');
    
    // Update UI
    updateUI();
    updateFamilyDisplay();
    
    // Add continue button
    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn';
    continueBtn.textContent = 'Continue';
    continueBtn.style.marginTop = '20px';
    continueBtn.addEventListener('click', () => {
        advanceGame();
    });
    impactDisplay.appendChild(continueBtn);
    
    // Hide options
    document.getElementById('optionsContainer').classList.add('hidden');
}

function applyEffects(effects) {
    gameState.previousRevenue = gameState.revenue;
    gameState.previousProfit = gameState.profit;
    
    // Apply numeric effects
    const numericFields = ['revenue', 'profit', 'cash', 'valuation', 'debt'];
    numericFields.forEach(field => {
        if (effects[field] !== undefined) {
            gameState[field] += effects[field];
            gameState[field] = Math.max(0, gameState[field]); // Can't go negative
        }
    });
    
    // Apply family effects
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        const happinessChange = effects[key + 'Happiness'];
        if (happinessChange !== undefined) {
            member.happiness += happinessChange;
            member.happiness = Math.max(0, Math.min(100, member.happiness));
        }
        
        const ownershipChange = effects[key + 'Ownership'];
        if (ownershipChange !== undefined) {
            member.ownership += ownershipChange;
            member.ownership = Math.max(0, member.ownership);
        }
    });
    
    // Apply special effects
    if (effects.robertRetired) gameState.robertRetired = true;
    if (effects.sarahCEO) {
        gameState.sarahCEO = true;
        familyMembers.sarah.role = "CEO";
    }
    if (effects.michaelLeft) {
        gameState.michaelLeft = true;
        familyMembers.michael.inBusiness = false;
        familyMembers.michael.isActive = false;
    }
    if (effects.hasOutsideCEO) gameState.hasOutsideCEO = true;
    if (effects.hasProfessionalBoard) gameState.hasProfessionalBoard = true;
    if (effects.robertDeceased) {
        gameState.robertDeceased = true;
        familyMembers.robert.isDead = true;
    }
    if (effects.hasQualityIssues) gameState.hasQualityIssues = true;
    if (effects.hasDebt) gameState.hasDebt = true;
}

function advanceGame() {
    // Advance year
    const yearsToAdvance = 2;
    gameState.year += yearsToAdvance;
    gameState.eventIndex += 1;
    
    // Age family members
    Object.keys(familyMembers).forEach(key => {
        familyMembers[key].age += yearsToAdvance;
    });
    
    // Check for life events
    checkLifeEvents();
    
    // Natural business growth
    if (gameState.revenue > 0) {
        const growthRate = 0.05; // 5% annual growth
        gameState.revenue *= Math.pow(1 + growthRate, yearsToAdvance);
        gameState.profit = gameState.revenue * 0.1; // 10% margin
        gameState.valuation = gameState.revenue * 0.4;
    }
    
    // Check if game continues
    if (gameState.eventIndex < EVENTS.length) {
        loadEvent();
    } else {
        showEnding();
    }
}

function updateUI() {
    // Update business metrics
    document.getElementById('currentYear').textContent = gameState.year;
    document.getElementById('revenue').textContent = '$' + formatNumber(gameState.revenue);
    document.getElementById('profit').textContent = '$' + formatNumber(gameState.profit);
    document.getElementById('cash').textContent = '$' + formatNumber(gameState.cash);
    document.getElementById('valuation').textContent = '$' + formatNumber(gameState.valuation);
    
    // Show changes
    const revenueChange = gameState.revenue - gameState.previousRevenue;
    const revenueChangeEl = document.getElementById('revenueChange');
    if (revenueChange !== 0) {
        const sign = revenueChange > 0 ? '+' : '';
        revenueChangeEl.textContent = sign + '$' + formatNumber(Math.abs(revenueChange));
        revenueChangeEl.className = 'metric-change ' + (revenueChange > 0 ? 'positive' : 'negative');
    } else {
        revenueChangeEl.textContent = '';
    }
    
    const profitChange = gameState.profit - gameState.previousProfit;
    const profitChangeEl = document.getElementById('profitChange');
    if (profitChange !== 0) {
        const sign = profitChange > 0 ? '+' : '';
        profitChangeEl.textContent = sign + '$' + formatNumber(Math.abs(profitChange));
        profitChangeEl.className = 'metric-change ' + (profitChange > 0 ? 'positive' : 'negative');
    } else {
        profitChangeEl.textContent = '';
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    } else {
        return num.toFixed(0);
    }
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing game");
    init();
    
    const startBtn = document.getElementById('startButton');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("Start button clicked");
            startGame();
        });
        console.log("Start button event listener attached");
    } else {
        console.error("Start button not found!");
    }
});
