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
            isDead: false,
            // Income tracking (backend only, not displayed)
            accustomedIncome: 0,
            incomeExpectation: 0,
            lastSalary: 0,
            lastDividendIncome: 0,
            lastTotalIncome: 0,
            unhappyAboutIncome: false
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
            // Income tracking
            accustomedIncome: 0,
            incomeExpectation: 0,
            lastSalary: 0,
            lastDividendIncome: 0,
            lastTotalIncome: 0,
            unhappyAboutIncome: false
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
            // Income tracking
            accustomedIncome: 0,
            incomeExpectation: 0,
            lastSalary: 0,
            lastDividendIncome: 0,
            lastTotalIncome: 0,
            unhappyAboutIncome: false
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
            // Income tracking
            accustomedIncome: 0,
            incomeExpectation: 0,
            lastSalary: 0,
            lastDividendIncome: 0,
            lastTotalIncome: 0,
            unhappyAboutIncome: false
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

        // Happiness meter
        const happinessDiv = document.createElement('div');
        happinessDiv.className = 'family-happiness';

        const happinessLabel = document.createElement('div');
        happinessLabel.className = 'happiness-label';
        happinessLabel.textContent = 'Happiness';
        happinessDiv.appendChild(happinessLabel);

        const happinessBar = document.createElement('div');
        happinessBar.className = 'happiness-bar';

        const happinessLevel = document.createElement('div');
        happinessLevel.className = 'happiness-level';
        happinessLevel.style.width = `${member.happiness}%`;

        // Color based on happiness level
        if (member.happiness >= 70) {
            happinessLevel.style.backgroundColor = '#4caf50';
        } else if (member.happiness >= 40) {
            happinessLevel.style.backgroundColor = '#ff9800';
        } else {
            happinessLevel.style.backgroundColor = '#f44336';
        }

        happinessBar.appendChild(happinessLevel);
        happinessDiv.appendChild(happinessBar);

        const happinessValue = document.createElement('div');
        happinessValue.className = 'happiness-value';
        happinessValue.textContent = `${Math.round(member.happiness)}%`;
        happinessDiv.appendChild(happinessValue);

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

    // Average happiness impact (worth 40 points)
    const avgHappiness = getFamilyAverageHappiness();
    const happinessScore = (avgHappiness / 100) * 40;
    score = happinessScore;

    // Family unity bonuses/penalties
    if (gameState.michaelLeft) score -= 20; // Major family fracture
    if (gameState.robertDeceased && getFamilyAverageHappiness() < 50) score -= 10;

    // Ownership distribution (concentrated ownership can mean family conflict)
    const ownershipGini = calculateOwnershipConcentration();
    if (ownershipGini > 0.7) score -= 10; // Very concentrated
    else if (ownershipGini > 0.5) score -= 5;

    // Check for very unhappy family members
    Object.keys(familyMembers).forEach(key => {
        const member = familyMembers[key];
        if (!member.isDead && member.happiness < 30) {
            score -= 10; // Penalty for severely unhappy family members
        }
    });

    return Math.max(0, Math.min(100, score));
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
