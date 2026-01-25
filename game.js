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
        profitMargin: 0.06,  // Base profit margin (will be modified)
        profit: 0,
        cash: 50000,
        assets: 50000, // Total assets (cash + equipment + inventory + property)
        debt: 0,
        employees: 1, // Starting with just Robert
        previousRevenue: 0,
        previousProfit: 0,

        // Management quality (0-100, affected by monitoring, governance, conflicts)
        managementQuality: 50, // Start at average

        // Family cohesion (0-100, conflicts reduce this)
        familyCohesion: 80,  // Start high - founder era

        // Shareholder monitoring effectiveness (0-100)
        shareholderMonitoring: 30,  // Low initially - founder controls everything

        // Board effectiveness (0-100)
        boardEffectiveness: 0,  // No board initially

        // Profit allocation (must sum to 100)
        // How annual profits are distributed
        allocation: {
            growth: 60,       // Reinvested for revenue growth
            efficiency: 20,   // Invested in margin improvements
            cash: 15,         // Retained as cash reserves
            dividends: 5      // Distributed to shareholders
        },

        // Cumulative investment effects
        cumulativeEfficiencyInvestment: 0,  // Builds up margin over time

        // Capital structure
        externalEquity: 0,           // % owned by external investors (dilutes family control)
        debtCapacity: 500000,        // Maximum comfortable debt level

        // Growth constraints tracking
        capitalConstrained: false,   // Was growth limited by capital?
        fundingGap: 0,               // How much capital was needed but unavailable?

        // Decision tracking
        decisions: [],

        // Business state flags
        patriciaCFO: false,
        hasOutsideCOO: false,
        hasProfessionalBoard: false,
        hasGen3: false,
        robertRetired: false,
        robertDeceased: false,
        sarahCEO: false,
        michaelLeft: false,

        // Spouse & In-Law state flags
        openToInLaws: null,              // null = undecided, true = open, false = closed
        markInterestedInBusiness: false,
        lisaInterestedInBusiness: false,
        markEngaged: false,              // Mark participated in "in-law innovation day"
        lisaEngaged: false,              // Lisa participated in "in-law innovation day"
        markInBusiness: false,           // Mark working at Anderson Packaging
        lisaInBusiness: false,           // Lisa working at Anderson Packaging
        hasInLawsInBusiness: false,      // Any in-laws working in business
        selectiveInLawPolicy: false,     // Only some in-laws allowed
        noInLawsPolicy: false,           // No in-laws allowed policy
        hasSpousePolicy: false,          // Formal spouse governance policy exists
        hasFormalSpouseGovernance: false,// Full spouse governance structure
        spouseAdvisoryRoles: false,      // Advisory roles for spouses

        // Risk factors
        hasQualityIssues: false,
        hasDebt: false,
        hasExternalInvestors: false   // Outside equity investors
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

    const event = EVENTS[gameState.eventIndex];

    // Process description to add state-dependent context
    // Check if description is a function and call it if needed
    let description = typeof event.description === 'function' ? event.description() : event.description;
    
    // Add state-dependent context for specific events
    // Note: Event indices updated after adding 4 new events (Sarah's Wedding, Michael's Wedding, In-Law Question, Family Boundaries)
    if (gameState.eventIndex === 15) {
        // Family Governance Formalization event - add context about financial state
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
    } else if (gameState.eventIndex === 17) {
        // Michael's Crossroads - reference compensation conflict
        const compensationEvent = gameState.decisions.find(d => d.event === 12);
        if (compensationEvent && compensationEvent.choice === 0) {
            description = description.replace(
                "He comes to Robert:",
                "\"Dad, I appreciate that you increased my salary, but even at $160K, I'm still watching Sarah make all the strategic decisions.\" He continues:"
            );
        }
    } else if (gameState.eventIndex === 18) {
        // The Temptation (Acquisition) - adjust offer based on performance
        if (gameState.revenue > 10000000) {
            description = description.replace("$28M", "$35M");
        }
        if (gameState.michaelLeft) {
            description += "\n\nMichael left the business years ago. The remaining family wonders what he would think of this offer.";
        }
    } else if (gameState.eventIndex === 24) {
        // The Crossroads (2040) - reference current state
        if (gameState.revenue > 15000000) {
            description = description.replace(
                "The company is stable and profitable.",
                `The company is thriving with revenue over $${formatNumber(gameState.revenue)} annually.`
            );
        }
        if (gameState.hasDebt && gameState.debt > 2000000) {
            description += `\n\nThe company still carries $${formatNumber(gameState.debt)} in debt. Taking on more is risky.`;
        }
    } else if (gameState.eventIndex === 25) {
        // Fifty Years (Final decision) - personalize based on journey
        if (gameState.revenue > 20000000) {
            description = description.replace("$45M", "$55M");
        } else if (gameState.revenue < 10000000) {
            description = description.replace("$45M", "$30M");
        }

        const prevOffer = gameState.decisions.find(d => d.event === 18);
        if (prevOffer && prevOffer.choice === 1) {
            description += "\n\nThe family declined an offer back in 2026. Some wonder if they should have sold then.";
        }
    }
    
    // Update event display
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventTitle').textContent = typeof event.title === 'function' ? event.title() : event.title;

    // Check if there's pending impact from previous decision to show as lead-in
    const eventDescriptionEl = document.getElementById('eventDescription');
    if (gameState.pendingImpact) {
        // Show impact as narrative lead-in, then the new event description
        const impactHtml = `<div class="impact-narrative">${gameState.pendingImpact}</div><hr class="narrative-divider"><div class="event-text">${description.replace(/\n/g, '<br>')}</div>`;
        eventDescriptionEl.innerHTML = impactHtml;
        gameState.pendingImpact = null; // Clear the pending impact
    } else {
        eventDescriptionEl.innerHTML = description.replace(/\n/g, '<br>');
    }

    // Clear previous options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    document.getElementById('impactDisplay').classList.add('hidden');

    // Show options container
    optionsContainer.classList.remove('hidden');
    
    // Create option buttons
    event.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = typeof option.text === 'function' ? option.text() : option.text;
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

    // Get impact text to carry forward to next event
    const impactText = typeof option.impact === 'function' ? option.impact() : option.impact;
    gameState.pendingImpact = impactText;

    // Update UI
    updateUI();
    updateFamilyDisplay();

    // Advance directly to next event (impact will be shown with it)
    advanceGame();
}

function applyEffects(effects) {
    gameState.previousRevenue = gameState.revenue;
    gameState.previousProfit = gameState.profit;

    // Apply numeric effects
    const numericFields = ['revenue', 'profit', 'cash', 'assets', 'debt', 'employees'];
    numericFields.forEach(field => {
        if (effects[field] !== undefined) {
            gameState[field] += effects[field];
            // Employees can't go below 0, others can't go negative except debt handled separately
            if (field === 'employees') {
                gameState[field] = Math.max(0, Math.round(gameState[field]));
            } else if (field !== 'debt') {
                gameState[field] = Math.max(0, gameState[field]);
            }
        }
    });

    // Apply management quality changes (clamped 0-100)
    if (effects.managementQuality !== undefined) {
        gameState.managementQuality += effects.managementQuality;
        gameState.managementQuality = Math.max(0, Math.min(100, gameState.managementQuality));
    }

    // Apply family cohesion changes (clamped 0-100)
    if (effects.familyCohesion !== undefined) {
        gameState.familyCohesion += effects.familyCohesion;
        gameState.familyCohesion = Math.max(0, Math.min(100, gameState.familyCohesion));
    }

    // Apply shareholder monitoring changes (clamped 0-100)
    if (effects.shareholderMonitoring !== undefined) {
        gameState.shareholderMonitoring += effects.shareholderMonitoring;
        gameState.shareholderMonitoring = Math.max(0, Math.min(100, gameState.shareholderMonitoring));
    }

    // Apply board effectiveness changes (clamped 0-100)
    if (effects.boardEffectiveness !== undefined) {
        gameState.boardEffectiveness += effects.boardEffectiveness;
        gameState.boardEffectiveness = Math.max(0, Math.min(100, gameState.boardEffectiveness));
    }

    // Apply profit margin changes
    if (effects.profitMargin !== undefined) {
        gameState.profitMargin += effects.profitMargin;
        gameState.profitMargin = Math.max(0.01, Math.min(0.15, gameState.profitMargin));
    }

    // Apply allocation changes (ensure they sum to 100)
    if (effects.allocation !== undefined) {
        const alloc = gameState.allocation;
        if (effects.allocation.growth !== undefined) alloc.growth += effects.allocation.growth;
        if (effects.allocation.efficiency !== undefined) alloc.efficiency += effects.allocation.efficiency;
        if (effects.allocation.cash !== undefined) alloc.cash += effects.allocation.cash;
        if (effects.allocation.dividends !== undefined) alloc.dividends += effects.allocation.dividends;

        // Clamp each to valid range
        alloc.growth = Math.max(0, Math.min(100, alloc.growth));
        alloc.efficiency = Math.max(0, Math.min(100, alloc.efficiency));
        alloc.cash = Math.max(0, Math.min(100, alloc.cash));
        alloc.dividends = Math.max(0, Math.min(100, alloc.dividends));

        // Normalize to sum to 100
        const total = alloc.growth + alloc.efficiency + alloc.cash + alloc.dividends;
        if (total > 0 && total !== 100) {
            const factor = 100 / total;
            alloc.growth *= factor;
            alloc.efficiency *= factor;
            alloc.cash *= factor;
            alloc.dividends *= factor;
        }
    }
    
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
    if (effects.patriciaCFO) {
        gameState.patriciaCFO = true;
        familyMembers.patricia.role = "CFO";
        familyMembers.patricia.inBusiness = true;
        familyMembers.patricia.isActive = true;
    }
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
    if (effects.hasOutsideCOO) gameState.hasOutsideCOO = true;
    if (effects.hasProfessionalBoard) gameState.hasProfessionalBoard = true;
    if (effects.robertDeceased) {
        gameState.robertDeceased = true;
        familyMembers.robert.isDead = true;
    }

    // Handle Robert's ownership transfer upon death
    if (effects.robertOwnershipTransfer) {
        const robertOwnership = familyMembers.robert.ownership;
        familyMembers.robert.ownership = 0;

        if (gameState.michaelLeft) {
            // Sarah gets all of Robert's ownership
            familyMembers.sarah.ownership += robertOwnership;
        } else {
            // Sarah gets 60%, Michael gets 40%
            familyMembers.sarah.ownership += robertOwnership * 0.6;
            familyMembers.michael.ownership += robertOwnership * 0.4;
        }
    }
    if (effects.hasQualityIssues) gameState.hasQualityIssues = true;
    if (effects.hasDebt) gameState.hasDebt = true;
    if (effects.hasExternalInvestors) gameState.hasExternalInvestors = true;
    if (effects.capitalConstrained) gameState.capitalConstrained = true;

    // Apply external equity effects (dilutes family ownership)
    if (effects.externalEquity !== undefined) {
        gameState.externalEquity += effects.externalEquity;
    }

    // Apply spouse & in-law effects
    if (effects.openToInLaws !== undefined) gameState.openToInLaws = effects.openToInLaws;
    if (effects.markInterestedInBusiness) gameState.markInterestedInBusiness = true;
    if (effects.lisaInterestedInBusiness) gameState.lisaInterestedInBusiness = true;
    if (effects.markEngaged) gameState.markEngaged = true;
    if (effects.lisaEngaged) gameState.lisaEngaged = true;
    if (effects.markInBusiness) {
        gameState.markInBusiness = true;
        if (familyMembers.mark) {
            familyMembers.mark.inBusiness = true;
            familyMembers.mark.role = "VP of Strategy";
        }
    }
    if (effects.lisaInBusiness) {
        gameState.lisaInBusiness = true;
        if (familyMembers.lisa) {
            familyMembers.lisa.inBusiness = true;
            familyMembers.lisa.role = "Marketing Director";
        }
    }
    if (effects.hasInLawsInBusiness) gameState.hasInLawsInBusiness = true;
    if (effects.selectiveInLawPolicy) gameState.selectiveInLawPolicy = true;
    if (effects.noInLawsPolicy) gameState.noInLawsPolicy = true;
    if (effects.hasSpousePolicy) gameState.hasSpousePolicy = true;
    if (effects.hasFormalSpouseGovernance) gameState.hasFormalSpouseGovernance = true;
    if (effects.spouseAdvisoryRoles) gameState.spouseAdvisoryRoles = true;

    // Apply family member attribute changes
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];

        // Business training updates
        if (effects[key + 'BusinessTraining'] !== undefined) {
            member.hasBusinessTraining = effects[key + 'BusinessTraining'];
        }

        // Liquidity needs updates
        if (effects[key + 'LiquidityNeeds'] !== undefined) {
            member.liquidityNeeds = effects[key + 'LiquidityNeeds'];
        }

        // Other income updates
        if (effects[key + 'OtherIncome'] !== undefined) {
            member.otherIncome = effects[key + 'OtherIncome'];
        }
    });
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

    // ============================================
    // CONFLICT EFFECTS
    // Unresolved shareholder conflicts hurt performance
    // ============================================
    const conflictPenalty = calculateConflictPenalty();
    if (conflictPenalty > 0) {
        // Conflicts reduce effective management quality
        gameState.familyCohesion = Math.max(0, gameState.familyCohesion - conflictPenalty * 0.5);
    }

    // Effective management quality considers monitoring and conflicts
    const effectiveManagement = calculateEffectiveManagement();

    // ============================================
    // SHAREHOLDER PREFERENCE INFLUENCE
    // Aggregate preferences affect growth/margin tradeoffs
    // ============================================
    const shareholderPrefs = getShareholderPreferences();

    // ============================================
    // PROFIT ALLOCATION & GROWTH MODEL
    // ============================================
    if (gameState.revenue > 0) {
        // Calculate this period's profit
        const currentProfit = gameState.revenue * gameState.profitMargin;

        // Allocate profit according to current allocation percentages
        const allocated = {
            growth: currentProfit * (gameState.allocation.growth / 100),
            efficiency: currentProfit * (gameState.allocation.efficiency / 100),
            cash: currentProfit * (gameState.allocation.cash / 100),
            dividends: currentProfit * (gameState.allocation.dividends / 100)
        };

        // ============================================
        // GROWTH RATE & CAPITAL CONSTRAINTS
        // Growth requires capital - if internal profits insufficient,
        // need external financing (debt or equity) with tradeoffs
        // ============================================
        const baseGrowth = 0.02;  // 2% baseline

        // Risk preference bonus (from shareholders): 0-3%
        const riskBonus = (shareholderPrefs.riskTolerance / 100) * 0.03;

        // Management execution bonus: 0-2%
        const managementBonus = (effectiveManagement / 100) * 0.02;

        // Desired growth rate based on preferences and management
        const desiredGrowthRate = baseGrowth + riskBonus + managementBonus;

        // Capital required to achieve desired growth
        // Rule of thumb: need ~0.5x of revenue growth in capital investment
        const desiredRevenueIncrease = gameState.revenue * (Math.pow(1 + desiredGrowthRate, yearsToAdvance) - 1);
        const capitalRequired = desiredRevenueIncrease * 0.5;

        // Available capital sources
        const internalCapital = allocated.growth;  // From profit allocation
        const availableCash = Math.max(0, gameState.cash - 50000);  // Keep minimum reserve
        const availableDebtCapacity = Math.max(0, gameState.debtCapacity - gameState.debt);

        // Calculate funding gap
        let fundingGap = capitalRequired - internalCapital;
        let actualGrowthCapital = internalCapital;
        gameState.capitalConstrained = false;
        gameState.fundingGap = 0;

        if (fundingGap > 0) {
            // Need external capital - check sources in order of preference

            // 1. Use excess cash first (no cost, no control loss)
            if (fundingGap > 0 && availableCash > 0) {
                const cashUsed = Math.min(fundingGap, availableCash);
                actualGrowthCapital += cashUsed;
                gameState.cash -= cashUsed;
                fundingGap -= cashUsed;
            }

            // 2. Take on debt (increases risk, no control loss)
            // Only if shareholders have moderate-high risk tolerance
            if (fundingGap > 0 && availableDebtCapacity > 0 && shareholderPrefs.riskTolerance > 40) {
                const debtUsed = Math.min(fundingGap, availableDebtCapacity);
                actualGrowthCapital += debtUsed;
                gameState.debt += debtUsed;
                gameState.hasDebt = true;
                fundingGap -= debtUsed;

                // Debt increases risk - reduce debt capacity going forward
                gameState.debtCapacity = Math.max(gameState.debtCapacity, gameState.debt * 1.2);
            }

            // 3. If still short, growth is constrained (or would need equity dilution)
            if (fundingGap > 0) {
                gameState.capitalConstrained = true;
                gameState.fundingGap = fundingGap;

                // Aggressive growth shareholders might accept equity dilution
                // But this is a major decision that should be an event, not automatic
                // For now, just constrain growth
            }
        }

        // Actual growth rate based on capital actually deployed
        const growthInvestmentRatio = actualGrowthCapital / Math.max(1, gameState.revenue);
        const investmentBonus = Math.min(0.04, growthInvestmentRatio * 0.5);  // Cap at 4%

        const actualGrowthRate = baseGrowth + (fundingGap > 0 ?
            investmentBonus * (actualGrowthCapital / capitalRequired) :  // Reduced if constrained
            investmentBonus + (riskBonus * 0.5));  // Full if funded

        // Apply growth over the period
        gameState.revenue *= Math.pow(1 + actualGrowthRate, yearsToAdvance);

        // Debt service reduces profit
        if (gameState.debt > 0) {
            const interestExpense = gameState.debt * 0.06 * yearsToAdvance;  // 6% interest rate
            gameState.cash -= interestExpense;
        }

        // ============================================
        // PROFIT MARGIN
        // Driven by: efficiency investment, management quality, focus preference
        // ============================================
        const baseMargin = 0.03;  // 3% baseline for cardboard industry

        // Cumulative efficiency investment improves margins over time
        gameState.cumulativeEfficiencyInvestment += allocated.efficiency;
        const efficiencyBonus = Math.min(0.03, (gameState.cumulativeEfficiencyInvestment / gameState.revenue) * 0.1);

        // Management quality bonus: 0-2%
        const marginManagementBonus = (effectiveManagement / 100) * 0.02;

        // Focus preference: growth-focused sacrifices some margin
        // If shareholders strongly prefer growth over profit, margin suffers slightly
        const focusPenalty = ((shareholderPrefs.growthPreference - 50) / 100) * 0.01;

        gameState.profitMargin = Math.max(0.02, Math.min(0.10,
            baseMargin + efficiencyBonus + marginManagementBonus - focusPenalty
        ));

        // Calculate new profit
        gameState.profit = gameState.revenue * gameState.profitMargin;

        // ============================================
        // CASH RETENTION
        // ============================================
        gameState.cash += allocated.cash;

        // ============================================
        // DIVIDEND DISTRIBUTION
        // Track per-shareholder (affects happiness)
        // ============================================
        if (allocated.dividends > 0) {
            distributeDividends(allocated.dividends);
        }

        // ============================================
        // ASSETS
        // Asset efficiency improves with management quality
        // ============================================
        const assetRatio = 0.7 - (effectiveManagement / 100) * 0.2;
        gameState.assets = gameState.cash + (gameState.revenue * assetRatio);

        // ============================================
        // DEBT CAPACITY
        // Grows with business size but limited by risk tolerance
        // ============================================
        const baseDebtCapacity = gameState.revenue * 0.3;  // 30% of revenue as baseline
        const riskAdjustment = 1 + (shareholderPrefs.riskTolerance - 50) / 100;  // ±50%
        gameState.debtCapacity = Math.max(500000, baseDebtCapacity * riskAdjustment);

        // ============================================
        // EMPLOYEES
        // Better management = higher productivity
        // ============================================
        const revenuePerEmployee = 80000 + (effectiveManagement / 100) * 50000;
        gameState.employees = Math.max(1, Math.round(gameState.revenue / revenuePerEmployee));
    }

    // Update UI to show current state before loading next event
    updateUI();
    updateFamilyDisplay();

    // Check if game continues
    if (gameState.eventIndex < EVENTS.length) {
        loadEvent();
    } else {
        showEnding();
    }
}

// ============================================
// EFFECTIVE MANAGEMENT CALCULATION
// Management quality modified by monitoring and cohesion
// ============================================
function calculateEffectiveManagement() {
    let effective = gameState.managementQuality;

    // Shareholder monitoring improves management accountability
    // But only if there's something to monitor (board, governance)
    const monitoringBonus = (gameState.shareholderMonitoring / 100) * 10;
    effective += monitoringBonus;

    // Board effectiveness adds oversight value
    const boardBonus = (gameState.boardEffectiveness / 100) * 10;
    effective += boardBonus;

    // Family conflict reduces effective management (distraction, poor decisions)
    const cohesionPenalty = ((100 - gameState.familyCohesion) / 100) * 15;
    effective -= cohesionPenalty;

    // Unresolved shareholder conflicts create further drag
    const conflictPenalty = calculateConflictPenalty();
    effective -= conflictPenalty;

    return Math.max(0, Math.min(100, effective));
}

// ============================================
// DIVIDEND DISTRIBUTION
// Allocates dividends to shareholders, affects happiness
// ============================================
function distributeDividends(totalDividends) {
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        if (member.isDead || member.ownership <= 0) return;

        const share = totalDividends * (member.ownership / 100);
        const prefs = getMemberPreferences(member);

        // Happiness effect depends on dividend preference
        // High dividend preference + receiving dividends = happiness
        // But amount matters relative to expectations
        const expectedDividend = gameState.revenue * 0.05 * (member.ownership / 100);  // 5% of revenue share as baseline
        const satisfactionRatio = share / Math.max(1, expectedDividend);

        if (prefs.dividendPreference > 50) {
            // This shareholder cares about dividends
            if (satisfactionRatio >= 1) {
                member.happiness = Math.min(100, member.happiness + 3);
            } else if (satisfactionRatio < 0.5) {
                member.happiness = Math.max(0, member.happiness - 2);
            }
        }
    });
}

function calculateROA() {
    // Return on Assets = (Profit / Total Assets) * 100
    if (gameState.assets > 0) {
        return ((gameState.profit / gameState.assets) * 100).toFixed(1);
    }
    return '0.0';
}

function calculateFinancialHealth() {
    // Financial Health Score (0-100) for cardboard/packaging industry
    // Factors: profitability, cash position, debt burden
    let score = 50; // Start at neutral

    // Profitability component (+/- 30 points)
    // Cardboard has 4-8% margins typically
    if (gameState.profit > 0) {
        const profitMargin = (gameState.profit / gameState.revenue) * 100;
        if (profitMargin >= 8) score += 30;  // Excellent for cardboard
        else if (profitMargin >= 6) score += 20;  // Good for cardboard
        else if (profitMargin >= 4) score += 10;  // Acceptable for cardboard
        else if (profitMargin >= 2) score += 5;
        else score -= 10; // Very thin margins, problematic
    } else {
        score -= 30; // Losing money is bad
    }

    // Cash position component (+/- 25 points)
    const monthsOfCash = gameState.revenue > 0 ? (gameState.cash / (gameState.revenue / 12)) : 0;
    if (monthsOfCash >= 6) score += 25;
    else if (monthsOfCash >= 3) score += 15;
    else if (monthsOfCash >= 1) score += 5;
    else if (monthsOfCash < 0.5 && gameState.revenue > 0) score -= 20;

    // Debt burden component (+/- 45 points) - CRITICAL for cardboard industry
    // Cardboard is capital-intensive with thin margins, very sensitive to debt
    if (gameState.debt === 0) {
        score += 25; // No debt is great
    } else {
        const debtToAssets = gameState.assets > 0 ? (gameState.debt / gameState.assets) : 1;
        const debtToRevenue = gameState.revenue > 0 ? (gameState.debt / gameState.revenue) : 10;

        // Multiple debt ratio checks (cardboard industry specific)
        let debtPenalty = 0;

        // Debt-to-Assets ratio (most important for asset-heavy cardboard)
        if (debtToAssets >= 0.70) debtPenalty += 30; // Threatens survival (>70%)
        else if (debtToAssets >= 0.65) debtPenalty += 25; // Danger zone (65-70%)
        else if (debtToAssets >= 0.60) debtPenalty += 20; // High risk (60-65%)
        else if (debtToAssets >= 0.45) debtPenalty += 10; // Acceptable (45-60%)
        else if (debtToAssets >= 0.30) debtPenalty += 5; // Low debt (30-45%)
        else debtPenalty -= 10; // Very conservative (<30%)

        // Debt-to-Revenue ratio (secondary check)
        if (debtToRevenue >= 2.0) debtPenalty += 15; // Extreme danger (>2x revenue)
        else if (debtToRevenue >= 1.5) debtPenalty += 10; // Danger zone (1.5-2x revenue)
        else if (debtToRevenue >= 1.0) debtPenalty += 5; // Stretched (1-1.5x revenue)

        score -= debtPenalty;
    }

    // Clamp between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)));
}

function getHealthLabel(score) {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Critical';
}

function getHarmonyLabel(score) {
    if (score >= 80) return 'Strong';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Stable';
    if (score >= 30) return 'Strained';
    return 'Fractured';
}

function updateUI() {
    // Update business metrics
    document.getElementById('currentYear').textContent = gameState.year;
    document.getElementById('revenue').textContent = '$' + formatNumber(gameState.revenue);
    document.getElementById('profit').textContent = '$' + formatNumber(gameState.profit);

    // Update ROA
    const roa = calculateROA();
    document.getElementById('roa').textContent = roa + '%';

    // Update employees
    document.getElementById('employees').textContent = gameState.employees;

    // Update financial health
    const healthScore = calculateFinancialHealth();
    const healthLabel = getHealthLabel(healthScore);
    document.getElementById('financialHealth').textContent = healthScore + ' - ' + healthLabel;

    // Update family harmony
    const harmonyScore = getFamilyHarmonyScore();
    const harmonyLabel = getHarmonyLabel(harmonyScore);
    const harmonyEl = document.getElementById('familyHarmony');
    if (harmonyEl) {
        harmonyEl.textContent = harmonyLabel;
        // Color code the harmony display
        if (harmonyScore >= 70) {
            harmonyEl.style.color = '#4caf50';  // Green
        } else if (harmonyScore >= 50) {
            harmonyEl.style.color = '#8bc34a';  // Light green
        } else if (harmonyScore >= 30) {
            harmonyEl.style.color = '#ff9800';  // Orange
        } else {
            harmonyEl.style.color = '#f44336';  // Red
        }
    }
    
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
