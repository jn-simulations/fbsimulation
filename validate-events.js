// Simple event validation script
// Validates that all events have been updated to use new financial mechanics

const fs = require('fs');

console.log('='.repeat(60));
console.log('EVENT VALIDATION - NEW FINANCIAL MECHANICS');
console.log('='.repeat(60));

// Read events.js file
const eventsCode = fs.readFileSync('./events.js', 'utf8');

// Check for old financial mechanics patterns
const issues = [];

// Pattern 1: Direct revenue effects (should be marketDemand)
const revenueMatches = eventsCode.match(/\n\s+revenue:\s*[-\d]/g);
if (revenueMatches) {
    issues.push(`Found ${revenueMatches.length} instances of 'revenue:' in effects (should be 'marketDemand:')`);
}

// Pattern 2: Direct profit effects (should be calculated)
const profitMatches = eventsCode.match(/\n\s+profit:\s*[-\d]/g);
if (profitMatches) {
    issues.push(`Found ${profitMatches.length} instances of 'profit:' in effects (profit should be calculated, not set)`);
}

// Pattern 3: Using gameState in effects (won't work at definition time)
const gameStateInEffects = eventsCode.match(/effects:\s*\{[^}]*gameState\./g);
if (gameStateInEffects) {
    issues.push(`Found ${gameStateInEffects.length} instances of 'gameState.' used in effects objects (must use fixed values)`);
}

// Validate file structure
if (!eventsCode.includes('const EVENTS = [')) {
    issues.push('EVENTS array not found or not using const');
}

if (!eventsCode.includes('const TRIGGERED_EVENTS = {')) {
    issues.push('TRIGGERED_EVENTS not found or not using const');
}

if (!eventsCode.includes('dividendDispute:')) {
    issues.push('Dividend dispute triggered event not found');
}

if (!eventsCode.includes('reinvestmentOpportunity:')) {
    issues.push('Reinvestment opportunity triggered event not found');
}

// Check for marketDemand usage (should be present)
const marketDemandMatches = eventsCode.match(/marketDemand:\s*[-\d]/g);
if (marketDemandMatches) {
    console.log(`\n✓ Found ${marketDemandMatches.length} uses of 'marketDemand:' in effects`);
} else {
    issues.push('No marketDemand effects found - events may not be updated');
}

// Check for dividendPolicy usage
const dividendPolicyMatches = eventsCode.match(/dividendPolicy:\s*[0-9.]/g);
if (dividendPolicyMatches) {
    console.log(`✓ Found ${dividendPolicyMatches.length} uses of 'dividendPolicy:' in effects`);
}

// Check for salary effects
const salaryMatches = eventsCode.match(/(robertSalary|sarahSalary|michaelSalary):\s*\d/g);
if (salaryMatches) {
    console.log(`✓ Found ${salaryMatches.length} salary effects`);
}

// Report results
console.log('\n' + '-'.repeat(60));
if (issues.length === 0) {
    console.log('✓ All validation checks passed!');
    console.log('✓ Events have been updated to use new financial mechanics');
    console.log('✓ No old patterns (direct revenue/profit effects) found');
    console.log('✓ Triggered events are properly defined');
    console.log('\n' + '='.repeat(60));
    console.log('VALIDATION SUCCESSFUL');
    console.log('='.repeat(60));
    process.exit(0);
} else {
    console.log('✗ Validation issues found:\n');
    issues.forEach((issue, i) => {
        console.log(`  ${i + 1}. ${issue}`);
    });
    console.log('\n' + '='.repeat(60));
    console.log('VALIDATION FAILED');
    console.log('='.repeat(60));
    process.exit(1);
}
