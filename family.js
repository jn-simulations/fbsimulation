// Family member data and management
// Tracks ownership, happiness, roles, and life events for each family member
// Implements Three Circle Model: Family, Ownership, Business segments

let familyMembers = {};

function initializeFamily() {
    familyMembers = {
        robert: {
            name: "Robert Anderson",
            age: 35,
            role: "Founder & CEO",
            ownership: 100,
            happiness: 70,
            isActive: true,
            inBusiness: true,
            isDead: false,
            // Three Circle Model attributes
            generation: 1,  // Founder
            hasBusinessTraining: false,  // Self-taught entrepreneur
            otherIncome: "none",  // Business is sole income
            liquidityNeeds: "low"  // Focused on building
        },
        patricia: {
            name: "Patricia Anderson",
            age: 34,
            role: "Spouse",
            ownership: 0,
            happiness: 70,
            isActive: false,
            inBusiness: false,
            isDead: false,
            // Three Circle Model attributes
            generation: 1,  // Founder generation (spouse)
            hasBusinessTraining: true,  // Has accounting background
            otherIncome: "low",  // Some independent income
            liquidityNeeds: "low"
        },
        sarah: {
            name: "Sarah Anderson",
            age: 8,
            role: "Daughter",
            ownership: 0,
            happiness: 75,
            isActive: false,
            inBusiness: false,
            isDead: false,
            // Three Circle Model attributes
            generation: 2,
            hasBusinessTraining: false,  // Will get MBA later
            otherIncome: "none",
            liquidityNeeds: "low"
        },
        michael: {
            name: "Michael Anderson",
            age: 5,
            role: "Son",
            ownership: 0,
            happiness: 75,
            isActive: false,
            inBusiness: false,
            isDead: false,
            // Three Circle Model attributes
            generation: 2,
            hasBusinessTraining: false,
            otherIncome: "none",
            liquidityNeeds: "low"
        },
        jennifer: {
            name: "Jennifer Anderson",
            age: 2,
            role: "Daughter",
            ownership: 0,
            happiness: 75,
            isActive: false,
            inBusiness: false,
            isDead: false,
            // Three Circle Model attributes
            generation: 2,
            hasBusinessTraining: false,
            otherIncome: "medium",  // Will have teaching career
            liquidityNeeds: "medium"
        }
    };
}

// ============================================
// THREE CIRCLE MODEL - Segment Classification
// ============================================

function getMemberSegment(member) {
    // Returns segment based on Three Circle Model position
    // F = Family, O = Ownership, B = Business
    const inFamily = true;  // All familyMembers are family
    const hasOwnership = member.ownership > 0;
    const inBusiness = member.inBusiness;

    if (hasOwnership && inBusiness) return "FOB";      // Center: Family + Ownership + Business
    if (hasOwnership && !inBusiness) return "FO";      // Family + Ownership (passive shareholder)
    if (!hasOwnership && inBusiness) return "FB";      // Family + Business (working, no shares)
    return "F";                                         // Family only
}

// ============================================
// PREFERENCE DERIVATION
// Based on segment, generation, age, and context
// ============================================

function getSegmentBaselinePreferences(segment) {
    // Base preferences by segment (0-100 scale)
    const baselines = {
        "FOB": {  // Center - active owner-managers
            riskTolerance: 55,
            dividendPreference: 25,  // Has salary, less need
            growthPreference: 70,
            professionalizationSupport: 50
        },
        "FO": {  // Passive shareholders
            riskTolerance: 35,       // No control = risk averse
            dividendPreference: 70,  // Main way to get returns
            growthPreference: 30,
            professionalizationSupport: 60  // Want accountability
        },
        "FB": {  // Working but no ownership
            riskTolerance: 45,
            dividendPreference: 0,   // N/A - no shares
            growthPreference: 55,    // Job security through growth
            professionalizationSupport: 65  // Want merit-based advancement
        },
        "F": {  // Family only
            riskTolerance: 30,       // Uninformed, cautious
            dividendPreference: 0,   // N/A - no shares
            growthPreference: 40,    // Prefers stability
            professionalizationSupport: 40
        }
    };
    return { ...baselines[segment] };
}

function applyGenerationModifiers(prefs, generation, age) {
    // Generation affects preferences differently than age
    switch(generation) {
        case 1:  // Founder
            if (age < 50) {
                // Young founder: high risk, reinvest everything
                prefs.riskTolerance += 20;
                prefs.dividendPreference -= 30;
                prefs.growthPreference += 15;
            } else if (age < 65) {
                // Mature founder: more balanced
                prefs.riskTolerance -= 5;
                prefs.dividendPreference += 10;
            } else {
                // Late founder: conservative, legacy-focused
                prefs.riskTolerance -= 15;
                prefs.dividendPreference += 20;
                prefs.professionalizationSupport -= 10;  // "Built it my way"
            }
            break;
        case 2:  // Second generation
            // "Don't be the one who lost it" mentality
            prefs.riskTolerance -= 10;
            prefs.professionalizationSupport += 10;  // Implement governance
            break;
        case 3:  // Third+ generation
            // Want to make their mark, need liquidity options
            prefs.riskTolerance += 10;
            prefs.dividendPreference += 10;  // Many passive owners by now
            prefs.professionalizationSupport += 15;
            break;
    }
    return prefs;
}

function applyAgeModifiers(prefs, age) {
    // Age-specific adjustments (separate from generation)
    if (age < 35) {
        prefs.riskTolerance += 15;
        prefs.dividendPreference -= 10;  // Can wait for returns
    } else if (age >= 35 && age < 55) {
        // Peak earning years - neutral adjustments
    } else if (age >= 55 && age < 70) {
        prefs.riskTolerance -= 15;
        prefs.dividendPreference += 20;  // Need income
        prefs.growthPreference -= 10;
    } else if (age >= 70) {
        prefs.riskTolerance -= 25;
        prefs.dividendPreference += 30;
        prefs.growthPreference -= 15;
        prefs.professionalizationSupport -= 5;  // Resist change
    }
    return prefs;
}

function applyContextualModifiers(prefs, member) {
    // Contextual factors

    // Liquidity needs
    if (member.liquidityNeeds === "high") {
        prefs.dividendPreference += 25;
        prefs.riskTolerance -= 10;
    } else if (member.liquidityNeeds === "medium") {
        prefs.dividendPreference += 10;
    }

    // Other income sources
    if (member.otherIncome === "high") {
        prefs.dividendPreference -= 15;  // Less dependent
        prefs.riskTolerance += 10;       // Can afford to wait
    } else if (member.otherIncome === "none") {
        prefs.dividendPreference += 10;  // More dependent on business
    }

    // Business training
    if (member.hasBusinessTraining) {
        prefs.professionalizationSupport += 15;
        prefs.riskTolerance += 5;  // Better at evaluating risk
    }

    return prefs;
}

function getMemberPreferences(member) {
    // Get full preference profile for a family member
    const segment = getMemberSegment(member);
    let prefs = getSegmentBaselinePreferences(segment);

    prefs = applyGenerationModifiers(prefs, member.generation, member.age);
    prefs = applyAgeModifiers(prefs, member.age);
    prefs = applyContextualModifiers(prefs, member);

    // Clamp all values to 0-100
    Object.keys(prefs).forEach(key => {
        prefs[key] = Math.max(0, Math.min(100, prefs[key]));
    });

    prefs.segment = segment;
    return prefs;
}

// ============================================
// SHAREHOLDER PREFERENCE AGGREGATION
// Weighted by ownership percentage with minority protections
// ============================================

function getShareholderPreferences() {
    // Aggregate preferences weighted by ownership
    // Enhanced: Includes minority shareholder influence and blocking rights
    let aggregated = {
        riskTolerance: 0,
        dividendPreference: 0,
        growthPreference: 0,
        professionalizationSupport: 0
    };

    let totalOwnership = 0;
    const shareholders = [];

    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        if (member.isDead || member.ownership <= 0) return;

        const prefs = getMemberPreferences(member);
        shareholders.push({ member, prefs, ownership: member.ownership });
        totalOwnership += member.ownership;
    });

    // Basic ownership-weighted aggregation
    shareholders.forEach(({ member, prefs, ownership }) => {
        const weight = ownership / totalOwnership;

        aggregated.riskTolerance += prefs.riskTolerance * weight;
        aggregated.dividendPreference += prefs.dividendPreference * weight;
        aggregated.growthPreference += prefs.growthPreference * weight;
        aggregated.professionalizationSupport += prefs.professionalizationSupport * weight;
    });

    // ============================================
    // MINORITY SHAREHOLDER PROTECTIONS
    // Shareholders with 10%+ can influence decisions
    // Shareholders with 20%+ have stronger blocking power
    // ============================================
    const minorityShareholdersWithInfluence = shareholders.filter(s =>
        s.ownership >= 10 && s.ownership < 50
    );

    if (minorityShareholdersWithInfluence.length > 0) {
        // Calculate minority coalition preferences
        let minorityWeight = 0;
        let minorityPrefs = {
            riskTolerance: 0,
            dividendPreference: 0,
            growthPreference: 0,
            professionalizationSupport: 0
        };

        minorityShareholdersWithInfluence.forEach(({ prefs, ownership }) => {
            minorityWeight += ownership;
            minorityPrefs.riskTolerance += prefs.riskTolerance * ownership;
            minorityPrefs.dividendPreference += prefs.dividendPreference * ownership;
            minorityPrefs.growthPreference += prefs.growthPreference * ownership;
            minorityPrefs.professionalizationSupport += prefs.professionalizationSupport * ownership;
        });

        if (minorityWeight > 0) {
            // Normalize minority preferences
            Object.keys(minorityPrefs).forEach(key => {
                minorityPrefs[key] /= minorityWeight;
            });

            // Minority influence factor: 20-30% pull toward minority preferences
            // This represents minority blocking power on major decisions
            const minorityInfluence = Math.min(0.30, minorityWeight / 100 * 0.5);

            // Blend: if minorities strongly disagree, they pull the aggregate toward moderation
            Object.keys(aggregated).forEach(key => {
                const majorityPref = aggregated[key];
                const minorityPref = minorityPrefs[key];

                // If there's significant disagreement (>20 points), minorities have blocking influence
                if (Math.abs(majorityPref - minorityPref) > 20) {
                    // Pull toward compromise (weighted average favoring minorities somewhat)
                    aggregated[key] = majorityPref * (1 - minorityInfluence) + minorityPref * minorityInfluence;
                }
            });
        }
    }

    // ============================================
    // PASSIVE SHAREHOLDER DIVIDEND FLOOR
    // If significant passive ownership exists, ensure minimum dividend consideration
    // ============================================
    const passiveOwnership = shareholders
        .filter(s => !s.member.inBusiness)
        .reduce((sum, s) => sum + s.ownership, 0);

    if (passiveOwnership >= 20) {
        // Passive owners with 20%+ ensure dividend preference doesn't go too low
        const passiveFloor = 30 + (passiveOwnership - 20) * 0.5; // 30-50 floor
        aggregated.dividendPreference = Math.max(aggregated.dividendPreference, passiveFloor);

        // Also reduce risk tolerance if significant passive ownership
        aggregated.riskTolerance = Math.min(aggregated.riskTolerance, 60);
    }

    return aggregated;
}

// ============================================
// CONFLICT DETECTION
// Based on preference divergence among shareholders
// ============================================

function detectShareholderConflicts() {
    const conflicts = [];
    const owners = Object.keys(familyMembers)
        .filter(key => !familyMembers[key].isDead && familyMembers[key].ownership > 0)
        .map(key => ({
            key,
            member: familyMembers[key],
            prefs: getMemberPreferences(familyMembers[key])
        }));

    if (owners.length < 2) return conflicts;

    // Calculate preference variance for each dimension
    const dimensions = ['riskTolerance', 'dividendPreference', 'growthPreference'];

    dimensions.forEach(dim => {
        const values = owners.map(o => o.prefs[dim]);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
        const stdDev = Math.sqrt(variance);

        // High standard deviation = conflict
        if (stdDev > 20) {
            const highSide = owners.filter(o => o.prefs[dim] > mean + 10);
            const lowSide = owners.filter(o => o.prefs[dim] < mean - 10);

            if (highSide.length > 0 && lowSide.length > 0) {
                conflicts.push({
                    type: dim,
                    severity: Math.min(1, stdDev / 30),  // 0-1 scale
                    highSide: highSide.map(o => o.member.name),
                    lowSide: lowSide.map(o => o.member.name),
                    description: getConflictDescription(dim, highSide, lowSide)
                });
            }
        }
    });

    // Active vs Passive conflict
    const activeOwners = owners.filter(o => o.member.inBusiness);
    const passiveOwners = owners.filter(o => !o.member.inBusiness);

    if (activeOwners.length > 0 && passiveOwners.length > 0) {
        const activeAvgDiv = activeOwners.reduce((sum, o) => sum + o.prefs.dividendPreference, 0) / activeOwners.length;
        const passiveAvgDiv = passiveOwners.reduce((sum, o) => sum + o.prefs.dividendPreference, 0) / passiveOwners.length;

        if (passiveAvgDiv - activeAvgDiv > 25) {
            conflicts.push({
                type: "activeVsPassive",
                severity: Math.min(1, (passiveAvgDiv - activeAvgDiv) / 50),
                highSide: passiveOwners.map(o => o.member.name),
                lowSide: activeOwners.map(o => o.member.name),
                description: "Passive shareholders want higher dividends while active managers prefer reinvestment"
            });
        }
    }

    return conflicts;
}

function getConflictDescription(dimension, highSide, lowSide) {
    const highNames = highSide.map(o => o.member.name.split(' ')[0]).join(' and ');
    const lowNames = lowSide.map(o => o.member.name.split(' ')[0]).join(' and ');

    switch(dimension) {
        case 'riskTolerance':
            return `${highNames} want aggressive growth while ${lowNames} prefer conservative stability`;
        case 'dividendPreference':
            return `${highNames} want higher dividends while ${lowNames} prefer reinvestment`;
        case 'growthPreference':
            return `${highNames} prioritize growth while ${lowNames} focus on profitability`;
        default:
            return "Shareholders have diverging preferences";
    }
}

function calculateConflictPenalty() {
    // Returns negative impact on management quality from unresolved conflicts
    // Enhanced: Stronger penalties with lasting effects
    const conflicts = detectShareholderConflicts();
    let penalty = 0;

    conflicts.forEach(conflict => {
        // Base penalty: 12 points per severe conflict (increased from 8)
        let conflictPenalty = conflict.severity * 12;

        // Active vs Passive conflicts are particularly damaging
        if (conflict.type === 'activeVsPassive') {
            conflictPenalty *= 1.3; // 30% worse
        }

        // Conflicts involving high-ownership members are worse
        const ownershipAtStake = conflict.highSide.reduce((sum, name) => {
            const member = Object.values(familyMembers).find(m => m.name === name);
            return sum + (member ? member.ownership : 0);
        }, 0) + conflict.lowSide.reduce((sum, name) => {
            const member = Object.values(familyMembers).find(m => m.name === name);
            return sum + (member ? member.ownership : 0);
        }, 0);

        if (ownershipAtStake > 60) {
            conflictPenalty *= 1.2; // Major shareholders in conflict = worse
        }

        penalty += conflictPenalty;
    });

    // Add lingering penalty from historical conflicts (trust takes time to rebuild)
    if (typeof gameState !== 'undefined' && gameState.conflictHistory) {
        gameState.conflictHistory.forEach(historical => {
            if (!historical.resolved) {
                penalty += historical.severity * 0.3; // Historical conflicts still hurt
            }
        });
    }

    // Cap at 40 points (increased from 25) - severe conflicts can cripple a company
    return Math.min(40, penalty);
}

function updateFamilyDisplay() {
    const container = document.getElementById('familyContainer');
    if (!container) return;

    container.innerHTML = '';

    // Display each family member
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];

        // Skip if deceased
        if (member.isDead) return;

        const memberDiv = document.createElement('div');
        memberDiv.className = 'family-member';

        // Name and age
        const nameDiv = document.createElement('div');
        nameDiv.className = 'family-name';
        nameDiv.textContent = `${member.name} (${member.age})`;
        memberDiv.appendChild(nameDiv);

        // Role
        const roleDiv = document.createElement('div');
        roleDiv.className = 'family-role';
        roleDiv.textContent = member.role;
        memberDiv.appendChild(roleDiv);

        // Ownership (if any)
        if (member.ownership > 0) {
            const ownershipDiv = document.createElement('div');
            ownershipDiv.className = 'family-ownership';
            ownershipDiv.textContent = `Ownership: ${member.ownership.toFixed(1)}%`;
            memberDiv.appendChild(ownershipDiv);
        }

        // Happiness indicator (color only, no percentage)
        const happinessDiv = document.createElement('div');
        happinessDiv.className = 'family-happiness';

        const happinessLabel = document.createElement('div');
        happinessLabel.className = 'happiness-label';
        happinessLabel.textContent = 'Mood';
        happinessDiv.appendChild(happinessLabel);

        const happinessIndicator = document.createElement('div');
        happinessIndicator.className = 'happiness-indicator';

        // Color and label based on happiness level
        let moodColor, moodLabel;
        if (member.happiness >= 80) {
            moodColor = '#4caf50';  // Green
            moodLabel = '●●●';
        } else if (member.happiness >= 60) {
            moodColor = '#8bc34a';  // Light green
            moodLabel = '●●○';
        } else if (member.happiness >= 40) {
            moodColor = '#ff9800';  // Orange
            moodLabel = '●○○';
        } else if (member.happiness >= 20) {
            moodColor = '#ff5722';  // Deep orange
            moodLabel = '●○○';
        } else {
            moodColor = '#f44336';  // Red
            moodLabel = '○○○';
        }

        happinessIndicator.style.color = moodColor;
        happinessIndicator.style.fontSize = '18px';
        happinessIndicator.style.fontWeight = 'bold';
        happinessIndicator.textContent = moodLabel;

        happinessDiv.appendChild(happinessIndicator);
        memberDiv.appendChild(happinessDiv);

        // Status indicators
        if (member.inBusiness) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'family-status active';
            statusDiv.textContent = '● In Business';
            memberDiv.appendChild(statusDiv);
        } else if (member.isActive) {
            const statusDiv = document.createElement('div');
            statusDiv.className = 'family-status';
            statusDiv.textContent = '○ Family Member';
            memberDiv.appendChild(statusDiv);
        }

        container.appendChild(memberDiv);
    });
}

function checkLifeEvents() {
    // Update roles and Three Circle attributes based on age and game state

    // Sarah becomes adult and enters business around age 22
    if (familyMembers.sarah.age >= 22 && !familyMembers.sarah.isActive) {
        familyMembers.sarah.isActive = true;
        if (familyMembers.sarah.age >= 25) {
            familyMembers.sarah.role = "MBA Graduate";
            familyMembers.sarah.hasBusinessTraining = true;  // MBA = business training
        } else {
            familyMembers.sarah.role = "College Student";
        }
    }

    // Michael becomes adult
    if (familyMembers.michael.age >= 22 && !familyMembers.michael.isActive) {
        familyMembers.michael.isActive = true;
        if (familyMembers.michael.age >= 25) {
            familyMembers.michael.role = "College Graduate";
        } else {
            familyMembers.michael.role = "College Student";
        }
    }

    // Jennifer becomes adult
    if (familyMembers.jennifer.age >= 22 && !familyMembers.jennifer.isActive) {
        familyMembers.jennifer.isActive = true;
        if (familyMembers.jennifer.age >= 25) {
            familyMembers.jennifer.role = "Teacher";
            familyMembers.jennifer.otherIncome = "medium";  // Teaching income
        } else {
            familyMembers.jennifer.role = "College Student";
        }
    }

    // Update roles based on game state
    if (gameState.sarahCEO && familyMembers.sarah.role !== "CEO") {
        familyMembers.sarah.role = "CEO";
    }

    if (gameState.robertRetired && familyMembers.robert.role !== "Executive Chairman") {
        familyMembers.robert.role = "Executive Chairman";
        // Retired founder may have higher liquidity needs
        if (familyMembers.robert.age >= 65) {
            familyMembers.robert.liquidityNeeds = "medium";
        }
    }

    if (gameState.michaelLeft && familyMembers.michael.inBusiness) {
        familyMembers.michael.inBusiness = false;
        familyMembers.michael.role = "Former Employee";
        // Left business but may still have ownership = passive shareholder tension
        familyMembers.michael.otherIncome = "medium";  // Has other career now
    }

    // Update business involvement based on event outcomes
    // This is handled by the events themselves, but we can add default role updates
    if (familyMembers.sarah.inBusiness && !gameState.sarahCEO && familyMembers.sarah.age >= 30) {
        if (familyMembers.sarah.role === "MBA Graduate") {
            familyMembers.sarah.role = "COO";
        }
    }

    if (familyMembers.michael.inBusiness && familyMembers.michael.age >= 28) {
        if (familyMembers.michael.role === "College Graduate") {
            familyMembers.michael.role = "Sales Director";
        }
    }

    // Age-based liquidity need changes
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        if (member.isDead) return;

        // Life stage affects liquidity needs
        if (member.age >= 28 && member.age <= 40 && member.liquidityNeeds === "low") {
            // Family formation years - may need cash for house, kids
            if (!member.inBusiness || member.otherIncome === "none") {
                member.liquidityNeeds = "medium";
            }
        }
        if (member.age >= 65 && !member.inBusiness) {
            // Retirement - need income
            member.liquidityNeeds = "high";
        }
    });
}

function getHappinessEmoji(happiness) {
    if (happiness >= 80) return '😊';
    if (happiness >= 60) return '🙂';
    if (happiness >= 40) return '😐';
    if (happiness >= 20) return '😟';
    return '😢';
}

function getFamilyAverageHappiness() {
    let total = 0;
    let count = 0;

    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        if (!member.isDead) {
            total += member.happiness;
            count++;
        }
    });

    return count > 0 ? total / count : 0;
}

function getBusinessPerformanceScore() {
    let score = 0;

    // Revenue contribution (0-25 points)
    if (gameState.revenue >= 20000000) score += 25;
    else if (gameState.revenue >= 15000000) score += 20;
    else if (gameState.revenue >= 10000000) score += 15;
    else if (gameState.revenue >= 5000000) score += 10;
    else if (gameState.revenue >= 2000000) score += 5;
    else score += 2;

    // Profitability (0-20 points)
    if (gameState.profit >= 2000000) score += 20;
    else if (gameState.profit >= 1000000) score += 15;
    else if (gameState.profit >= 500000) score += 10;
    else if (gameState.profit >= 200000) score += 5;
    else if (gameState.profit < 0) score -= 10;

    // Cash position (0-15 points)
    if (gameState.cash >= 5000000) score += 15;
    else if (gameState.cash >= 2000000) score += 12;
    else if (gameState.cash >= 1000000) score += 8;
    else if (gameState.cash >= 500000) score += 4;
    else if (gameState.cash < 0) score -= 10;

    // Debt management (0-15 points)
    const debtToRevenue = gameState.revenue > 0 ? gameState.debt / gameState.revenue : 0;
    if (!gameState.hasDebt || gameState.debt === 0) score += 15;
    else if (debtToRevenue < 0.3) score += 10;
    else if (debtToRevenue < 0.6) score += 5;
    else if (debtToRevenue > 1.0) score -= 10;

    // Growth and sustainability based on assets (0-10 points)
    if (gameState.assets >= 20000000) score += 10;
    else if (gameState.assets >= 10000000) score += 7;
    else if (gameState.assets >= 5000000) score += 4;

    // Credit rating health (0-10 points) - new mechanic
    if (gameState.creditRating) {
        if (gameState.creditRating >= 80) score += 10;
        else if (gameState.creditRating >= 60) score += 6;
        else if (gameState.creditRating >= 40) score += 3;
        else score -= 5;
    }

    // Equipment health (0-5 points) - new mechanic
    if (gameState.equipmentAge !== undefined) {
        if (gameState.equipmentAge <= 5) score += 5;
        else if (gameState.equipmentAge <= 10) score += 3;
        else if (gameState.equipmentAge > 15) score -= 5;
    }

    // Ending in a recession is harder (-5 penalty if in recession)
    if (gameState.economicCycle === 'recession') {
        score -= 5;
    } else if (gameState.economicCycle === 'boom') {
        score += 3;
    }

    return Math.max(0, Math.min(100, score));
}

function getFamilyHarmonyScore() {
    let score = 100;

    // Check for major family fractures (structural problems)
    if (gameState.michaelLeft) score -= 25; // Sibling left the business/family

    // Check for happiness DISPARITY (not low happiness, but inequality)
    const happinessValues = Object.keys(familyMembers)
        .filter(key => !familyMembers[key].isDead)
        .map(key => familyMembers[key].happiness);

    if (happinessValues.length > 1) {
        const maxHappiness = Math.max(...happinessValues);
        const minHappiness = Math.min(...happinessValues);
        const disparity = maxHappiness - minHappiness;

        // Large happiness gaps indicate relationship problems
        if (disparity > 50) score -= 20; // One person thriving, another miserable = bad harmony
        else if (disparity > 35) score -= 10;
        else if (disparity > 20) score -= 5;
    }

    // Ownership inequality creates resentment
    const ownershipDisparity = checkOwnershipFairness();
    score -= ownershipDisparity;

    // Check for any severely unhappy family members (indicates unresolved conflict)
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        if (!member.isDead && member.happiness < 30) {
            score -= 15; // Someone is deeply unhappy = harmony problem
        }
    });

    // Active business involvement vs passive ownership creates tension
    const activeMismatch = checkActivePassiveTension();
    score -= activeMismatch;

    // Robert's death without good relationships is especially hard
    if (gameState.robertDeceased) {
        const avgHappiness = getFamilyAverageHappiness();
        if (avgHappiness < 50) score -= 10; // Grief + poor relationships = very strained
    }

    // Penalty for unresolved historical conflicts (new mechanic)
    if (gameState.conflictHistory && gameState.conflictHistory.length > 0) {
        const unresolvedConflicts = gameState.conflictHistory.filter(c => !c.resolved);
        score -= unresolvedConflicts.length * 5; // Each unresolved conflict hurts harmony
    }

    // Bonus for family cohesion maintained over time
    if (gameState.familyCohesion >= 70) {
        score += 5; // Bonus for maintaining high cohesion
    } else if (gameState.familyCohesion < 40) {
        score -= 10; // Penalty for very low cohesion
    }

    return Math.max(0, Math.min(100, score));
}

function checkOwnershipFairness() {
    // Returns penalty points for ownership-related conflicts
    let penalty = 0;

    const active = [];
    const passive = [];

    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        if (!member.isDead) {
            if (member.inBusiness && member.ownership > 0) {
                active.push(member.ownership);
            } else if (!member.inBusiness && member.ownership > 0) {
                passive.push(member.ownership);
            } else if (member.inBusiness && member.ownership === 0 && member.isActive) {
                // Working in business but no ownership = resentment
                penalty += 10;
            }
        }
    });

    // Passive owners with significant stakes while others work = tension
    if (passive.length > 0 && active.length > 0) {
        const maxPassive = Math.max(...passive);
        const maxActive = Math.max(...active);

        // If passive owner has more than active workers, that's problematic
        if (maxPassive > maxActive) {
            penalty += 15;
        } else if (maxPassive > 0) {
            penalty += 5; // Some tension from passive ownership
        }
    }

    return penalty;
}

function checkActivePassiveTension() {
    // Returns penalty for active vs passive member conflicts
    let penalty = 0;

    const inBusiness = Object.keys(familyMembers).filter(k =>
        !familyMembers[k].isDead && familyMembers[k].inBusiness
    ).length;

    const hasOwnership = Object.keys(familyMembers).filter(k =>
        !familyMembers[k].isDead && familyMembers[k].ownership > 0
    ).length;

    const notInBusinessButOwns = Object.keys(familyMembers).filter(k =>
        !familyMembers[k].isDead && !familyMembers[k].inBusiness && familyMembers[k].ownership > 0
    ).length;

    // Passive owners create complexity
    if (notInBusinessButOwns > 0 && inBusiness > 0) {
        penalty += 5 * notInBusinessButOwns;
    }

    return penalty;
}

function calculateOwnershipConcentration() {
    // Simple Gini-like coefficient for ownership concentration
    const ownerships = Object.keys(familyMembers)
        .map(key => familyMembers[key].ownership)
        .filter(o => o > 0)
        .sort((a, b) => a - b);

    if (ownerships.length === 0) return 0;
    if (ownerships.length === 1) return 1;

    const maxOwnership = Math.max(...ownerships);
    return maxOwnership / 100;
}
