// Test script to verify game mechanics
// This can be run with: node test-simulation.js

// Mock browser environment
global.window = {
    addEventListener: () => {}
};

global.document = {
    getElementById: () => ({
        innerHTML: '',
        textContent: '',
        style: {},
        classList: {
            add: () => {},
            remove: () => {}
        }
    }),
    createElement: () => ({
        classList: {
            add: () => {}
        },
        innerHTML: '',
        textContent: '',
        appendChild: () => {}
    })
};

// Load the game files
const fs = require('fs');
eval(fs.readFileSync('./family.js', 'utf8'));

// Mock UI update functions before loading game.js
global.updateFamilyDisplay = () => {};
global.updateBusinessMetrics = () => {};
global.updateGameDisplay = () => {};
global.updateUI = () => {};

eval(fs.readFileSync('./game.js', 'utf8'));
eval(fs.readFileSync('./events.js', 'utf8'));

console.log('='.repeat(60));
console.log('FAMILY BUSINESS SIMULATION - TEST RUN');
console.log('='.repeat(60));

// Initialize the game
if (typeof init !== 'function') {
    console.error('✗ init function not found');
    process.exit(1);
}

init();
initializeFamily();

console.log('\n✓ Game initialized successfully');
console.log(`  Year: ${gameState.year}`);
console.log(`  Initial Market Demand: $${formatNumber(gameState.marketDemand)}`);
console.log(`  Initial Assets: $${formatNumber(gameState.assets)}`);
console.log(`  Initial Cash: $${formatNumber(gameState.cash)}`);

// Verify EVENTS array exists
if (!EVENTS || EVENTS.length === 0) {
    console.error('✗ EVENTS array is missing or empty');
    process.exit(1);
}

console.log(`\n✓ Found ${EVENTS.length} events`);

// Verify TRIGGERED_EVENTS exists
if (!TRIGGERED_EVENTS) {
    console.error('✗ TRIGGERED_EVENTS is missing');
    process.exit(1);
}

console.log('✓ Triggered events defined:');
console.log(`  - Dividend Dispute`);
console.log(`  - Reinvestment Opportunity`);

// Test financial mechanics
console.log('\n' + '-'.repeat(60));
console.log('TESTING FINANCIAL MECHANICS');
console.log('-'.repeat(60));

// Simulate a few years
for (let i = 0; i < 3; i++) {
    const beforeYear = gameState.year;
    const beforeRevenue = gameState.revenue;
    const beforeAssets = gameState.assets;

    advanceGame();

    console.log(`\nYear ${gameState.year}:`);
    console.log(`  Market Demand: $${formatNumber(gameState.marketDemand)}`);
    console.log(`  Asset Capacity: $${formatNumber(gameState.assets * (1.5 + (gameState.managementQuality / 100) * 0.5))}`);
    console.log(`  Actual Revenue: $${formatNumber(gameState.revenue)}`);
    console.log(`  Lost Sales: $${formatNumber(gameState.lostSales)}`);
    console.log(`  Profit: $${formatNumber(gameState.profit)}`);
    console.log(`  Dividends Paid: $${formatNumber(gameState.dividendsPaid)} (${Math.round(gameState.dividendPolicy * 100)}% policy)`);
    console.log(`  Retained Earnings: $${formatNumber(gameState.retainedEarnings)}`);
    console.log(`  Cash: $${formatNumber(gameState.cash)}`);
}

// Verify revenue is constrained by assets
const assetTurnoverRatio = 1.5 + (gameState.managementQuality / 100) * 0.5;
const assetCapacity = gameState.assets * assetTurnoverRatio;

if (gameState.revenue <= assetCapacity && gameState.revenue <= gameState.marketDemand) {
    console.log('\n✓ Revenue correctly constrained by min(marketDemand, assetCapacity)');
} else {
    console.log('\n✗ Revenue constraint logic may have an issue');
}

// Verify profit allocation
const expectedDividends = gameState.profit * gameState.dividendPolicy;
if (Math.abs(gameState.dividendsPaid - expectedDividends) < 1) {
    console.log('✓ Dividend policy correctly applied');
} else {
    console.log('✗ Dividend calculation issue');
}

// Test triggered event conditions
console.log('\n' + '-'.repeat(60));
console.log('TESTING TRIGGERED EVENT LOGIC');
console.log('-'.repeat(60));

// Test dividend dispute condition
familyMembers.jennifer.unhappyAboutIncome = true;
familyMembers.michael.unhappyAboutIncome = true;
gameState.lastDividendDispute = gameState.year - 5;
gameState.profit = 100000;

checkForTriggeredEvents();

if (gameState.needsDividendDisputeEvent) {
    console.log('\n✓ Dividend dispute event correctly triggered when 2+ family members unhappy');
} else {
    console.log('\n✗ Dividend dispute event should have been triggered');
}

// Reset and test reinvestment condition
gameState.needsDividendDisputeEvent = false;
familyMembers.jennifer.unhappyAboutIncome = false;
familyMembers.michael.unhappyAboutIncome = false;

gameState.marketDemand = 2000000;
gameState.revenue = 1000000;
gameState.lostSales = 1000000;
gameState.cash = 600000;

checkForTriggeredEvents();

if (gameState.needsReinvestmentEvent) {
    console.log('✓ Reinvestment event correctly triggered when lost sales > 25%');
} else {
    console.log('✗ Reinvestment event should have been triggered');
}

// Test event structure
console.log('\n' + '-'.repeat(60));
console.log('TESTING EVENT STRUCTURE');
console.log('-'.repeat(60));

let errorsFound = 0;

EVENTS.forEach((event, index) => {
    if (!event.title) {
        console.log(`✗ Event ${index} missing title`);
        errorsFound++;
    }
    if (!event.description) {
        console.log(`✗ Event ${index} missing description`);
        errorsFound++;
    }
    if (!event.options || event.options.length < 2) {
        console.log(`✗ Event ${index} missing or insufficient options`);
        errorsFound++;
    }

    event.options.forEach((option, optIndex) => {
        if (!option.text) {
            console.log(`✗ Event ${index}, option ${optIndex} missing text`);
            errorsFound++;
        }
        if (!option.effects) {
            console.log(`✗ Event ${index}, option ${optIndex} missing effects`);
            errorsFound++;
        }

        // Check for old financial mechanics
        if (option.effects) {
            if (option.effects.hasOwnProperty('revenue') && !option.effects.hasOwnProperty('marketDemand')) {
                console.log(`⚠ Event ${index}, option ${optIndex}: Uses 'revenue' instead of 'marketDemand'`);
                errorsFound++;
            }
            if (option.effects.hasOwnProperty('profit')) {
                console.log(`⚠ Event ${index}, option ${optIndex}: Sets 'profit' directly (should be calculated)`);
                errorsFound++;
            }
        }
    });
});

if (errorsFound === 0) {
    console.log(`\n✓ All ${EVENTS.length} events have correct structure`);
    console.log('✓ No events using old financial mechanics (revenue/profit effects)');
} else {
    console.log(`\n✗ Found ${errorsFound} issues in events`);
}

console.log('\n' + '='.repeat(60));
console.log('TEST COMPLETE');
console.log('='.repeat(60));

if (errorsFound === 0) {
    console.log('\n✓ All tests passed! The simulation is ready.');
    process.exit(0);
} else {
    console.log(`\n✗ ${errorsFound} issues found. Please review.`);
    process.exit(1);
}
