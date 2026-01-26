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
            liquidityNeeds: "low",  // Focused on building
            // Enhanced attributes
            yearsInBusiness: 0,           // Will track tenure
            isSpouseOfFounder: false,
            leftBusiness: false,
            hasSiblings: false             // Only child or N/A for founder
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
            liquidityNeeds: "low",
            // Enhanced attributes
            yearsInBusiness: 0,
            isSpouseOfFounder: true,       // Married to founder
            leftBusiness: false,
            hasSiblings: false
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
            liquidityNeeds: "low",
            // Enhanced attributes
            yearsInBusiness: 0,
            isSpouseOfFounder: false,
            leftBusiness: false,
            hasSiblings: true              // Has Michael and Jennifer
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
            liquidityNeeds: "low",
            // Enhanced attributes
            yearsInBusiness: 0,
            isSpouseOfFounder: false,
            leftBusiness: false,
            hasSiblings: true
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
            liquidityNeeds: "medium",
            // Enhanced attributes
            yearsInBusiness: 0,
            isSpouseOfFounder: false,
            leftBusiness: false,
            hasSiblings: true
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
// ENHANCED PREFERENCE DERIVATION
// Based on: Three-Circle position, generation, age, tenure, context
// ============================================

function getSegmentBaselinePreferences(segment, member) {
    // Enhanced base preferences by segment (0-100 scale)
    // Now considers ownership percentage and role importance

    const ownershipLevel = member.ownership || 0;
    const isExecutive = member.role && (
        member.role.includes('CEO') ||
        member.role.includes('CFO') ||
        member.role.includes('COO') ||
        member.role.includes('President')
    );

    const baselines = {
        "FOB": {  // Center - active owner-managers
            riskTolerance: 55,
            dividendPreference: 20,      // Has salary, less need for dividends
            growthPreference: 70,        // Growth increases their equity value AND salary
            professionalizationSupport: 45,
            controlPreference: 80,       // Want to maintain control
            successionUrgency: 30,       // Not urgent if they're running it
            liquidityInterest: 20        // Illiquid but in control
        },
        "FO": {  // Passive shareholders - Family + Ownership
            riskTolerance: 35,           // No control = risk averse
            dividendPreference: 75,      // Main way to get returns
            growthPreference: 25,        // Growth may mean less dividends
            professionalizationSupport: 65, // Want accountability for their investment
            controlPreference: 40,       // Want voice but can't control day-to-day
            successionUrgency: 50,       // Concerned about who runs their investment
            liquidityInterest: 70        // Often want exit options
        },
        "FB": {  // Working but no ownership - Family + Business
            riskTolerance: 50,
            dividendPreference: 0,       // N/A - no shares
            growthPreference: 60,        // Job security through growth
            professionalizationSupport: 70, // Want merit-based advancement
            controlPreference: 30,       // Want operational autonomy
            successionUrgency: 40,       // Their job depends on succession clarity
            liquidityInterest: 0         // No equity to liquidate
        },
        "F": {  // Family only - no ownership, no work
            riskTolerance: 30,           // Uninformed, cautious
            dividendPreference: 0,       // N/A - no shares
            growthPreference: 40,        // Prefers family stability
            professionalizationSupport: 35,
            controlPreference: 20,       // Want family harmony
            successionUrgency: 25,       // Distant concern
            liquidityInterest: 0         // No equity
        }
    };

    let prefs = { ...baselines[segment] };

    // Adjust based on ownership concentration (for FOB and FO)
    if (segment === "FOB" || segment === "FO") {
        if (ownershipLevel >= 50) {
            // Majority owner
            prefs.controlPreference += 15;
            prefs.riskTolerance += 10;      // Can afford to take risks
            prefs.dividendPreference -= 10; // Can wait for returns
        } else if (ownershipLevel >= 20) {
            // Significant minority
            prefs.controlPreference += 5;
            prefs.professionalizationSupport += 10; // Want governance protection
        } else if (ownershipLevel < 10) {
            // Small minority
            prefs.liquidityInterest += 20;   // May want to sell
            prefs.dividendPreference += 15;  // Need some return on trapped capital
            prefs.controlPreference -= 10;
        }
    }

    // Adjust based on executive role
    if (isExecutive && segment === "FOB") {
        prefs.growthPreference += 10;        // Empire building tendency
        prefs.professionalizationSupport -= 10; // May resist oversight
        prefs.controlPreference += 10;
    }

    return prefs;
}

function applyGenerationModifiers(prefs, generation, age, segment, member) {
    // Enhanced generation effects that interact with position and age

    const isInBusiness = segment === "FOB" || segment === "FB";
    const hasOwnership = segment === "FOB" || segment === "FO";
    const yearsInBusiness = member.yearsInBusiness || 0;

    switch(generation) {
        case 1:  // Founder generation
            // Founders have unique psychology based on life stage
            if (age < 45) {
                // Young founder: Building phase
                prefs.riskTolerance += 25;
                prefs.dividendPreference -= 40;   // Reinvest everything
                prefs.growthPreference += 20;
                prefs.controlPreference += 15;
                prefs.successionUrgency -= 20;    // "I'll run this forever"
            } else if (age < 55) {
                // Mature founder: Peak performance
                prefs.riskTolerance += 10;
                prefs.dividendPreference -= 20;
                prefs.growthPreference += 10;
                prefs.professionalizationSupport += 5; // Starting to see value
            } else if (age < 65) {
                // Pre-retirement founder: Transition thinking
                prefs.riskTolerance -= 10;
                prefs.dividendPreference += 15;
                prefs.successionUrgency += 25;    // Need to plan
                prefs.controlPreference -= 5;     // Slowly letting go
            } else if (age < 75) {
                // Late founder: Legacy preservation
                prefs.riskTolerance -= 25;
                prefs.dividendPreference += 30;
                prefs.growthPreference -= 15;
                prefs.professionalizationSupport -= 15; // "My way worked"
                prefs.successionUrgency += 40;
                prefs.controlPreference -= 15;    // Should let go but often doesn't
            } else {
                // Very late founder: Should have transitioned
                prefs.riskTolerance -= 35;
                prefs.dividendPreference += 40;
                prefs.growthPreference -= 25;
                prefs.professionalizationSupport -= 20;
                prefs.successionUrgency += 60;
            }

            // Founder spouse (Patricia) has different dynamics
            if (!member.role?.includes('CEO') && !member.role?.includes('Founder')) {
                prefs.professionalizationSupport += 15; // Often sees need for structure
                prefs.controlPreference -= 20;
            }
            break;

        case 2:  // Second generation
            // "Stewardship generation" - Don't lose what was built
            prefs.riskTolerance -= 15;           // Conservative - don't lose it
            prefs.professionalizationSupport += 15; // Implement governance

            if (isInBusiness) {
                // Working 2nd gen has different concerns
                if (age < 35) {
                    // Young, proving themselves
                    prefs.growthPreference += 15;
                    prefs.riskTolerance += 10;    // Want to make their mark
                    prefs.successionUrgency -= 10;
                } else if (age < 50) {
                    // Prime leadership years
                    prefs.controlPreference += 10;
                    prefs.growthPreference += 5;
                } else {
                    // Mature 2nd gen - thinking about 3rd gen
                    prefs.successionUrgency += 20;
                    prefs.professionalizationSupport += 10;
                }
            } else if (hasOwnership) {
                // Passive 2nd gen shareholder
                prefs.dividendPreference += 20;
                prefs.liquidityInterest += 15;
                prefs.professionalizationSupport += 20; // Want accountability
            }

            // Sibling dynamics: multiple 2nd gen = more complexity
            if (member.hasSiblings !== false) {
                prefs.professionalizationSupport += 10; // Need formal processes
            }
            break;

        case 3:  // Third generation
            // "Cousins generation" - Diverse interests, need for liquidity
            prefs.professionalizationSupport += 20;  // Essential for cousins
            prefs.liquidityInterest += 20;           // Many want exit options

            if (isInBusiness) {
                // Working 3rd gen wants to prove they're not just legacy hires
                prefs.growthPreference += 15;
                prefs.riskTolerance += 15;           // Make their mark
                prefs.professionalizationSupport += 5; // Merit-based recognition
            } else if (hasOwnership) {
                // Passive 3rd gen - often disconnected
                prefs.dividendPreference += 30;
                prefs.liquidityInterest += 30;       // Many want to sell
                prefs.riskTolerance -= 10;           // Protect inheritance
                prefs.controlPreference -= 15;      // Often have less voice
            } else {
                // Non-owning 3rd gen family
                prefs.growthPreference += 5;        // Hope for future opportunity
            }
            break;

        default:  // 4th+ generation
            prefs.professionalizationSupport += 25;
            prefs.liquidityInterest += 35;
            prefs.dividendPreference += 25;
            prefs.riskTolerance -= 15;
            break;
    }

    return prefs;
}

function applyAgeModifiers(prefs, age, segment, generation) {
    // Life-stage adjustments that interact with position and generation

    const isActiveOwner = segment === "FOB";
    const isPassiveOwner = segment === "FO";
    const hasOwnership = isActiveOwner || isPassiveOwner;

    // Age brackets represent life stages
    if (age < 25) {
        // Young adult - limited influence
        prefs.riskTolerance += 20;
        prefs.dividendPreference -= 15;
        prefs.growthPreference += 10;
        prefs.controlPreference -= 20;       // Haven't earned influence yet
        prefs.successionUrgency -= 15;       // Not thinking about this
    } else if (age < 35) {
        // Establishing career
        prefs.riskTolerance += 15;
        prefs.dividendPreference -= 10;
        prefs.growthPreference += 10;

        if (isActiveOwner) {
            prefs.controlPreference += 5;    // Starting to assert
        }
    } else if (age < 45) {
        // Prime building years
        prefs.riskTolerance += 5;
        prefs.growthPreference += 5;

        if (isActiveOwner) {
            prefs.controlPreference += 10;
        }
    } else if (age >= 45 && age < 55) {
        // Peak leadership / mid-career
        // Neutral - this is baseline behavior for most calculations
        if (isPassiveOwner) {
            prefs.dividendPreference += 10;  // Kids' college, etc.
        }
    } else if (age >= 55 && age < 65) {
        // Pre-retirement
        prefs.riskTolerance -= 20;
        prefs.dividendPreference += 25;
        prefs.growthPreference -= 15;
        prefs.successionUrgency += 20;

        if (isActiveOwner) {
            prefs.controlPreference -= 10;   // Should start letting go
        }
        if (isPassiveOwner) {
            prefs.liquidityInterest += 20;   // May want to fund retirement
        }
    } else if (age >= 65 && age < 75) {
        // Early retirement age
        prefs.riskTolerance -= 30;
        prefs.dividendPreference += 35;
        prefs.growthPreference -= 20;
        prefs.successionUrgency += 30;
        prefs.professionalizationSupport -= 10; // Resistance to change

        if (hasOwnership) {
            prefs.liquidityInterest += 25;
        }
    } else if (age >= 75) {
        // Late stage
        prefs.riskTolerance -= 40;
        prefs.dividendPreference += 45;
        prefs.growthPreference -= 25;
        prefs.successionUrgency += 40;
        prefs.professionalizationSupport -= 15;
        prefs.controlPreference -= 20;       // Health may limit involvement

        if (hasOwnership) {
            prefs.liquidityInterest += 15;   // Estate planning
        }
    }

    return prefs;
}

function applyContextualModifiers(prefs, member, segment) {
    // Contextual factors based on individual circumstances

    // Liquidity needs (financial pressure)
    if (member.liquidityNeeds === "high") {
        prefs.dividendPreference += 30;
        prefs.liquidityInterest += 25;
        prefs.riskTolerance -= 15;
        prefs.growthPreference -= 10;  // Want cash now, not future value
    } else if (member.liquidityNeeds === "medium") {
        prefs.dividendPreference += 15;
        prefs.liquidityInterest += 10;
    } else if (member.liquidityNeeds === "low") {
        prefs.dividendPreference -= 5;
        prefs.riskTolerance += 5;
    }

    // Other income sources
    if (member.otherIncome === "high") {
        prefs.dividendPreference -= 20;  // Less dependent on business
        prefs.riskTolerance += 15;       // Can afford to wait
        prefs.liquidityInterest -= 15;   // Less pressure to sell
    } else if (member.otherIncome === "medium") {
        prefs.dividendPreference -= 10;
        prefs.riskTolerance += 5;
    } else if (member.otherIncome === "none" || member.otherIncome === "low") {
        prefs.dividendPreference += 15;  // Dependent on business
        prefs.riskTolerance -= 10;       // Can't afford losses
    }

    // Business training/education
    if (member.hasBusinessTraining) {
        prefs.professionalizationSupport += 20;
        prefs.riskTolerance += 10;       // Better at evaluating risk
        prefs.growthPreference += 5;     // Understands value creation
    }

    // Tenure in business (years working there)
    const yearsInBusiness = member.yearsInBusiness || 0;
    if (yearsInBusiness > 20) {
        prefs.controlPreference += 15;   // Earned their stripes
        prefs.professionalizationSupport -= 5; // "This is how we do things"
    } else if (yearsInBusiness > 10) {
        prefs.controlPreference += 10;
    } else if (yearsInBusiness > 0 && yearsInBusiness < 5) {
        prefs.professionalizationSupport += 10; // Fresh perspective
        prefs.growthPreference += 5;
    }

    // Role-specific adjustments
    if (member.role) {
        if (member.role.includes('CEO')) {
            prefs.controlPreference += 20;
            prefs.growthPreference += 10;
            prefs.professionalizationSupport -= 5;
        } else if (member.role.includes('CFO')) {
            prefs.riskTolerance -= 10;
            prefs.professionalizationSupport += 15;
            prefs.dividendPreference += 5;  // Focused on financial discipline
        } else if (member.role.includes('Sales') || member.role.includes('Business Development')) {
            prefs.growthPreference += 15;
            prefs.riskTolerance += 10;
        } else if (member.role.includes('Operations') || member.role.includes('COO')) {
            prefs.professionalizationSupport += 10;
            prefs.riskTolerance -= 5;       // Operationally conservative
        }
    }

    // Relationship to founder
    if (member.isSpouseOfFounder) {
        prefs.professionalizationSupport += 10; // Often sees need for structure
        prefs.successionUrgency += 10;          // Concerned about spouse's health
    }

    // Left the business (like Michael if he left)
    if (member.leftBusiness) {
        prefs.liquidityInterest += 30;   // Disconnected, want out
        prefs.dividendPreference += 25;  // If stuck with shares
        prefs.controlPreference -= 30;   // No interest in running it
    }

    return prefs;
}

function getMemberPreferences(member) {
    // Get full preference profile for a family member
    // Enhanced to pass more context through the preference chain

    const segment = getMemberSegment(member);
    let prefs = getSegmentBaselinePreferences(segment, member);

    prefs = applyGenerationModifiers(prefs, member.generation, member.age, segment, member);
    prefs = applyAgeModifiers(prefs, member.age, segment, member.generation);
    prefs = applyContextualModifiers(prefs, member, segment);

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
