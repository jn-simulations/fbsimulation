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
        profitMargin: 0.04,  // Base profit margin - realistic 4% for cardboard industry
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
        creditRating: 70,            // Credit rating 0-100, affects interest rates

        // Growth constraints tracking
        capitalConstrained: false,   // Was growth limited by capital?
        fundingGap: 0,               // How much capital was needed but unavailable?

        // Working capital tracking (new)
        inventory: 0,                // Raw materials and finished goods
        accountsReceivable: 0,       // Money owed by customers
        accountsPayable: 0,          // Money owed to suppliers
        workingCapitalRatio: 0.15,   // Working capital as % of revenue

        // Economic cycle (new)
        economicCycle: 'normal',     // 'boom', 'normal', 'recession'
        cycleYearsRemaining: 0,      // Years until next cycle change
        marketGrowthRate: 0.02,      // Industry baseline growth (2% for packaging)

        // Equipment and depreciation (new)
        equipmentValue: 50000,       // Current value of equipment
        equipmentAge: 0,             // Years since last major upgrade
        maintenanceCosts: 0,         // Annual maintenance expenses

        // Tax tracking (new)
        taxRate: 0.25,               // Effective corporate tax rate
        accumulatedTaxes: 0,         // Taxes paid this period

        // Conflict tracking (new)
        unresolvedConflicts: [],     // Tracks ongoing family conflicts
        conflictHistory: [],         // Past conflicts and their resolution

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

    // Helper function to resolve effect values (handles functions)
    function resolveEffectValue(value) {
        return typeof value === 'function' ? value() : value;
    }

    // Apply numeric effects
    const numericFields = ['revenue', 'profit', 'cash', 'assets', 'debt', 'employees'];
    numericFields.forEach(field => {
        if (effects[field] !== undefined) {
            const effectValue = resolveEffectValue(effects[field]);
            gameState[field] += effectValue;
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
    
    // Apply family effects (with function resolution for dynamic effects)
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        const happinessEffect = effects[key + 'Happiness'];
        if (happinessEffect !== undefined) {
            const happinessChange = resolveEffectValue(happinessEffect);
            member.happiness += happinessChange;
            member.happiness = Math.max(0, Math.min(100, member.happiness));
        }

        const ownershipEffect = effects[key + 'Ownership'];
        if (ownershipEffect !== undefined) {
            const ownershipChange = resolveEffectValue(ownershipEffect);
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
    // ECONOMIC CYCLE SIMULATION
    // Realistic market conditions affect all businesses
    // ============================================
    updateEconomicCycle(yearsToAdvance);

    // ============================================
    // CONFLICT EFFECTS (Enhanced)
    // Unresolved shareholder conflicts hurt performance with lasting impact
    // ============================================
    const conflictPenalty = calculateConflictPenalty();
    if (conflictPenalty > 0) {
        // Conflicts reduce effective management quality AND family cohesion
        gameState.familyCohesion = Math.max(0, gameState.familyCohesion - conflictPenalty * 0.8);

        // Track unresolved conflicts for lasting effects
        if (conflictPenalty > 10) {
            gameState.conflictHistory.push({
                year: gameState.year,
                severity: conflictPenalty,
                resolved: false
            });
        }
    }

    // Slowly heal old conflicts (trust takes time to rebuild)
    gameState.conflictHistory = gameState.conflictHistory.map(conflict => {
        if (!conflict.resolved && (gameState.year - conflict.year) > 4) {
            conflict.severity *= 0.7; // Decay over time
            if (conflict.severity < 3) conflict.resolved = true;
        }
        return conflict;
    }).filter(c => !c.resolved || (gameState.year - c.year) < 10);

    // Effective management quality considers monitoring and conflicts
    const effectiveManagement = calculateEffectiveManagement();

    // ============================================
    // SHAREHOLDER PREFERENCE INFLUENCE
    // Aggregate preferences affect growth/margin tradeoffs
    // ============================================
    const shareholderPrefs = getShareholderPreferences();

    // ============================================
    // PROFIT ALLOCATION & GROWTH MODEL (Enhanced)
    // ============================================
    if (gameState.revenue > 0) {
        // ============================================
        // EQUIPMENT DEPRECIATION & MAINTENANCE
        // Manufacturing requires ongoing capex
        // ============================================
        gameState.equipmentAge += yearsToAdvance;

        // Equipment depreciates ~10% per year
        const depreciation = gameState.equipmentValue * 0.10 * yearsToAdvance;
        gameState.equipmentValue = Math.max(10000, gameState.equipmentValue - depreciation);

        // Maintenance costs increase with equipment age
        const baseMaintenancerate = 0.02; // 2% of equipment value
        const ageMultiplier = 1 + (gameState.equipmentAge / 10); // Increases with age
        gameState.maintenanceCosts = gameState.equipmentValue * baseMaintenancerate * ageMultiplier * yearsToAdvance;

        // Old equipment hurts productivity (equipment older than 10 years)
        const equipmentPenalty = gameState.equipmentAge > 10 ?
            Math.min(0.02, (gameState.equipmentAge - 10) * 0.003) : 0;

        // ============================================
        // WORKING CAPITAL REQUIREMENTS
        // Cash tied up in operations
        // ============================================
        const workingCapitalNeeded = gameState.revenue * gameState.workingCapitalRatio;
        gameState.inventory = workingCapitalNeeded * 0.4;
        gameState.accountsReceivable = workingCapitalNeeded * 0.5;
        gameState.accountsPayable = workingCapitalNeeded * 0.3;
        const netWorkingCapital = gameState.inventory + gameState.accountsReceivable - gameState.accountsPayable;

        // ============================================
        // GROSS PROFIT CALCULATION
        // ============================================
        // Economic cycle affects revenue
        let cycleMultiplier = 1.0;
        if (gameState.economicCycle === 'boom') cycleMultiplier = 1.08;
        else if (gameState.economicCycle === 'recession') cycleMultiplier = 0.92;

        const currentProfit = gameState.revenue * gameState.profitMargin * cycleMultiplier;

        // Deduct maintenance costs from profit
        const operatingProfit = Math.max(0, currentProfit - gameState.maintenanceCosts);

        // Allocate profit according to current allocation percentages
        const allocated = {
            growth: operatingProfit * (gameState.allocation.growth / 100),
            efficiency: operatingProfit * (gameState.allocation.efficiency / 100),
            cash: operatingProfit * (gameState.allocation.cash / 100),
            dividends: operatingProfit * (gameState.allocation.dividends / 100)
        };

        // ============================================
        // GROWTH RATE & CAPITAL CONSTRAINTS (Realistic)
        // Industry-appropriate growth rates
        // ============================================
        // Packaging industry grows 1-3% annually, not 7%
        const baseGrowth = gameState.marketGrowthRate; // 2% baseline

        // Economic cycle affects growth potential
        let cycleGrowthBonus = 0;
        if (gameState.economicCycle === 'boom') cycleGrowthBonus = 0.015;
        else if (gameState.economicCycle === 'recession') cycleGrowthBonus = -0.02;

        // Risk preference bonus (from shareholders): 0-1.5% (reduced from 3%)
        const riskBonus = (shareholderPrefs.riskTolerance / 100) * 0.015;

        // Management execution bonus: 0-1.5% (reduced from 2%)
        const managementBonus = (effectiveManagement / 100) * 0.015;

        // Desired growth rate based on preferences and management
        // Max realistic growth for packaging: ~5-6% in best conditions
        const desiredGrowthRate = Math.min(0.06,
            baseGrowth + cycleGrowthBonus + riskBonus + managementBonus - equipmentPenalty);

        // Capital required to achieve desired growth
        // Manufacturing needs ~0.8x of revenue growth in capital (more realistic)
        const desiredRevenueIncrease = gameState.revenue * (Math.pow(1 + desiredGrowthRate, yearsToAdvance) - 1);
        const capitalRequired = desiredRevenueIncrease * 0.8;

        // Available capital sources
        const internalCapital = allocated.growth;
        // Keep 3 months operating expenses as reserve
        const minimumReserve = (gameState.revenue / 12) * 3;
        const availableCash = Math.max(0, gameState.cash - minimumReserve - netWorkingCapital);
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

                // Taking on debt REDUCES future capacity (not increases it)
                gameState.creditRating = Math.max(20, gameState.creditRating - 5);
            }

            // 3. If still short, growth is constrained
            if (fundingGap > 0) {
                gameState.capitalConstrained = true;
                gameState.fundingGap = fundingGap;
            }
        }

        // Actual growth rate based on capital actually deployed
        const capitalRatio = capitalRequired > 0 ? actualGrowthCapital / capitalRequired : 1;
        const actualGrowthRate = desiredGrowthRate * Math.min(1, capitalRatio);

        // Apply growth over the period (with market saturation dampening for very large companies)
        const marketSaturationFactor = gameState.revenue > 20000000 ?
            Math.max(0.5, 1 - (gameState.revenue - 20000000) / 50000000) : 1;
        gameState.revenue *= Math.pow(1 + (actualGrowthRate * marketSaturationFactor), yearsToAdvance);

        // ============================================
        // INTEREST EXPENSE (Realistic rates)
        // Interest rate varies by credit rating and debt level
        // ============================================
        if (gameState.debt > 0) {
            // Base rate 6%, adjusted by credit rating (4-12% range)
            const debtToEquity = gameState.debt / Math.max(1, gameState.assets - gameState.debt);
            const baseInterestRate = 0.06;
            const creditAdjustment = (100 - gameState.creditRating) / 100 * 0.04; // 0-4% penalty
            const leverageAdjustment = Math.min(0.02, debtToEquity * 0.02); // 0-2% for high leverage

            const effectiveInterestRate = baseInterestRate + creditAdjustment + leverageAdjustment;
            const interestExpense = gameState.debt * effectiveInterestRate * yearsToAdvance;
            gameState.cash -= interestExpense;

            // Slowly improve credit rating if debt is being managed well
            if (debtToEquity < 0.5) {
                gameState.creditRating = Math.min(90, gameState.creditRating + 2);
            }
        }

        // ============================================
        // PROFIT MARGIN (Enhanced)
        // More realistic efficiency gains
        // ============================================
        const baseMargin = 0.03;  // 3% baseline for cardboard industry

        // Cumulative efficiency investment with diminishing returns
        gameState.cumulativeEfficiencyInvestment += allocated.efficiency;
        const efficiencyRatio = gameState.cumulativeEfficiencyInvestment / Math.max(1, gameState.revenue);
        // Diminishing returns: sqrt function caps effective improvement
        const efficiencyBonus = Math.min(0.025, Math.sqrt(efficiencyRatio) * 0.05);

        // Management quality bonus: 0-1.5% (reduced)
        const marginManagementBonus = (effectiveManagement / 100) * 0.015;

        // Focus preference: growth-focused sacrifices margin (increased penalty)
        const focusPenalty = ((shareholderPrefs.growthPreference - 50) / 100) * 0.015;

        // Economic cycle affects margins
        let cycleMargInImpact = 0;
        if (gameState.economicCycle === 'boom') cycleMargInImpact = 0.005;
        else if (gameState.economicCycle === 'recession') cycleMargInImpact = -0.01;

        gameState.profitMargin = Math.max(0.01, Math.min(0.08,
            baseMargin + efficiencyBonus + marginManagementBonus - focusPenalty + cycleMargInImpact - equipmentPenalty
        ));

        // ============================================
        // TAX CALCULATION
        // Corporate taxes reduce available cash
        // ============================================
        const grossProfit = gameState.revenue * gameState.profitMargin;
        const taxableIncome = Math.max(0, grossProfit - (gameState.debt > 0 ? gameState.debt * 0.06 : 0)); // Interest is deductible
        const taxes = taxableIncome * gameState.taxRate;
        gameState.accumulatedTaxes = taxes;

        // After-tax profit
        gameState.profit = grossProfit - taxes - gameState.maintenanceCosts;

        // ============================================
        // CASH RETENTION
        // ============================================
        gameState.cash += allocated.cash - taxes;

        // ============================================
        // DIVIDEND DISTRIBUTION (after tax)
        // ============================================
        const afterTaxDividends = allocated.dividends * (1 - gameState.taxRate * 0.5); // Partial double-taxation
        if (afterTaxDividends > 0) {
            distributeDividends(afterTaxDividends);
        }

        // ============================================
        // ASSETS (Including equipment)
        // ============================================
        const assetRatio = 0.6 - (effectiveManagement / 100) * 0.15;
        gameState.assets = gameState.cash + gameState.equipmentValue + (gameState.revenue * assetRatio);

        // ============================================
        // DEBT CAPACITY (Realistic)
        // Based on EBITDA multiple and credit rating
        // ============================================
        const ebitda = gameState.profit + gameState.maintenanceCosts + (gameState.debt * 0.06);
        const creditMultiplier = 2 + (gameState.creditRating / 100) * 2; // 2-4x EBITDA
        gameState.debtCapacity = Math.max(200000, ebitda * creditMultiplier);

        // ============================================
        // EMPLOYEES
        // Better management = higher productivity (realistic range)
        // ============================================
        // Manufacturing: $60K-$120K revenue per employee
        const revenuePerEmployee = 60000 + (effectiveManagement / 100) * 60000;
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
// ECONOMIC CYCLE SIMULATION
// Realistic boom/recession cycles affecting all businesses
// ============================================
function updateEconomicCycle(yearsToAdvance) {
    // Decrease remaining years in current cycle
    gameState.cycleYearsRemaining -= yearsToAdvance;

    // Check if cycle should change
    if (gameState.cycleYearsRemaining <= 0) {
        // Economic cycles follow patterns
        const random = Math.random();
        const currentCycle = gameState.economicCycle;

        if (currentCycle === 'normal') {
            // From normal: 30% chance boom, 25% chance recession, 45% stay normal
            if (random < 0.30) {
                gameState.economicCycle = 'boom';
                gameState.cycleYearsRemaining = 4 + Math.floor(Math.random() * 4); // 4-7 years
            } else if (random < 0.55) {
                gameState.economicCycle = 'recession';
                gameState.cycleYearsRemaining = 2 + Math.floor(Math.random() * 3); // 2-4 years
            } else {
                gameState.cycleYearsRemaining = 4 + Math.floor(Math.random() * 4); // Stay normal 4-7 years
            }
        } else if (currentCycle === 'boom') {
            // Booms tend to end in recession or return to normal
            if (random < 0.40) {
                gameState.economicCycle = 'recession';
                gameState.cycleYearsRemaining = 2 + Math.floor(Math.random() * 2); // 2-3 years
            } else {
                gameState.economicCycle = 'normal';
                gameState.cycleYearsRemaining = 4 + Math.floor(Math.random() * 4);
            }
        } else if (currentCycle === 'recession') {
            // Recessions usually return to normal, rarely go to boom immediately
            if (random < 0.15) {
                gameState.economicCycle = 'boom';
                gameState.cycleYearsRemaining = 4 + Math.floor(Math.random() * 3);
            } else {
                gameState.economicCycle = 'normal';
                gameState.cycleYearsRemaining = 4 + Math.floor(Math.random() * 4);
            }
        }

        // Adjust market growth rate based on cycle
        if (gameState.economicCycle === 'boom') {
            gameState.marketGrowthRate = 0.03; // 3% in boom
        } else if (gameState.economicCycle === 'recession') {
            gameState.marketGrowthRate = 0.005; // 0.5% in recession
        } else {
            gameState.marketGrowthRate = 0.02; // 2% normal
        }
    }
}

// ============================================
// EQUIPMENT UPGRADE CHECK
// Determines if equipment needs major upgrade
// ============================================
function needsEquipmentUpgrade() {
    return gameState.equipmentAge > 12 || gameState.equipmentValue < gameState.revenue * 0.1;
}

function getEquipmentUpgradeCost() {
    // Cost scales with company size
    return Math.max(200000, gameState.revenue * 0.15);
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

    // Update economic cycle indicator (if element exists)
    const economyEl = document.getElementById('economicCycle');
    if (economyEl) {
        let cycleText = gameState.economicCycle.charAt(0).toUpperCase() + gameState.economicCycle.slice(1);
        let cycleColor = '#666';
        if (gameState.economicCycle === 'boom') {
            cycleText = '📈 Boom';
            cycleColor = '#4caf50';
        } else if (gameState.economicCycle === 'recession') {
            cycleText = '📉 Recession';
            cycleColor = '#f44336';
        } else {
            cycleText = '➡️ Stable';
            cycleColor = '#2196f3';
        }
        economyEl.textContent = cycleText;
        economyEl.style.color = cycleColor;
    }

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
