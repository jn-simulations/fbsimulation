// Family member data and management
// Tracks ownership, happiness, roles, and life events for each family member

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
            isDead: false
        },
        patricia: {
            name: "Patricia Anderson",
            age: 34,
            role: "Spouse",
            ownership: 0,
            happiness: 70,
            isActive: false,
            inBusiness: false,
            isDead: false
        },
        sarah: {
            name: "Sarah Anderson",
            age: 8,
            role: "Daughter",
            ownership: 0,
            happiness: 75,
            isActive: false,
            inBusiness: false,
            isDead: false
        },
        michael: {
            name: "Michael Anderson",
            age: 5,
            role: "Son",
            ownership: 0,
            happiness: 75,
            isActive: false,
            inBusiness: false,
            isDead: false
        },
        jennifer: {
            name: "Jennifer Anderson",
            age: 2,
            role: "Daughter",
            ownership: 0,
            happiness: 75,
            isActive: false,
            inBusiness: false,
            isDead: false
        }
    };
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
    // Update roles based on age and game state

    // Sarah becomes adult and enters business around age 22
    if (familyMembers.sarah.age >= 22 && !familyMembers.sarah.isActive) {
        familyMembers.sarah.isActive = true;
        if (familyMembers.sarah.age >= 25) {
            familyMembers.sarah.role = "MBA Graduate";
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
    }

    if (gameState.michaelLeft && familyMembers.michael.inBusiness) {
        familyMembers.michael.inBusiness = false;
        familyMembers.michael.role = "Former Employee";
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

    // Revenue contribution (0-30 points)
    if (gameState.revenue >= 20000000) score += 30;
    else if (gameState.revenue >= 15000000) score += 25;
    else if (gameState.revenue >= 10000000) score += 20;
    else if (gameState.revenue >= 5000000) score += 15;
    else if (gameState.revenue >= 2000000) score += 10;
    else score += 5;

    // Profitability (0-20 points)
    if (gameState.profit >= 3000000) score += 20;
    else if (gameState.profit >= 2000000) score += 15;
    else if (gameState.profit >= 1000000) score += 10;
    else if (gameState.profit >= 500000) score += 5;

    // Cash position (0-20 points)
    if (gameState.cash >= 5000000) score += 20;
    else if (gameState.cash >= 3000000) score += 15;
    else if (gameState.cash >= 1000000) score += 10;
    else if (gameState.cash >= 500000) score += 5;
    else if (gameState.cash < 0) score -= 10;

    // Debt management (0-15 points)
    if (!gameState.hasDebt || gameState.debt === 0) score += 15;
    else if (gameState.debt < 1000000) score += 10;
    else if (gameState.debt < 3000000) score += 5;
    else score -= 5;

    // Growth and sustainability based on assets (0-15 points)
    if (gameState.assets >= 25000000) score += 15;
    else if (gameState.assets >= 15000000) score += 10;
    else if (gameState.assets >= 8000000) score += 5;

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
