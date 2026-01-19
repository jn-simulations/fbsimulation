# Legacy & Leadership: Family Business Simulation

A 50-year family business simulation game designed for MBA education. Players make critical decisions across three generations of the Anderson family as they build and manage a manufacturing company from 1994 to 2044.

## 📁 Project Structure

```
family-business-game/
├── index.html      # Main HTML structure and UI
├── styles.css      # All styling and layout
├── events.js       # All 21 events (complete event library)
├── family.js       # Family member management & life events
├── endings.js      # 4 different game endings
├── game.js         # Main game logic and state management
└── README.md       # This file
```

## 🎮 Game Features

### Complete 50-Year Timeline
- **21 Major Events** spanning 1994-2044
- **3 Generations**: Founder (Robert) → Siblings (Sarah, Michael, Jennifer) → Cousins (Emily, David)
- **State-Dependent Events**: Later events adapt based on previous decisions
- **Life Events**: Births, marriages, promotions, deaths between major decisions

### Decision Categories
1. **Founding & Risk** (1994-2000): Bootstrap vs. loan, growth vs. stability
2. **Family Entry** (2000-2010): Nepotism, compensation, succession planning
3. **Crises** (2009, 2020): Financial crisis, pandemic, quality issues
4. **Succession** (2012-2024): CEO transition, health scares, Michael's departure
5. **Growth Decisions** (2014-2040): Major contracts, acquisitions, automation
6. **Exit Strategy** (2026, 2044): Private equity offers, third generation transition

### 4 Different Endings
Based on business success (revenue/valuation) and family harmony (average happiness):
1. **🏆 Golden Legacy** - High business success + High family harmony
2. **💼 Business Success, Family Cost** - High business + Low harmony
3. **❤️ Family First** - Low business + High harmony
4. **⚠️ The Struggle** - Low business + Low harmony

## 🔧 How to Use in Code Mode

### Option 1: Simple Local Development
1. Copy all files to a folder
2. Open `index.html` in a browser
3. That's it! No build process needed.

### Option 2: With Live Server (Recommended for Development)
1. Open the folder in VS Code or Code mode
2. Use Live Server extension or similar
3. Edit files and see changes immediately

### Option 3: Add More Features
The modular structure makes it easy to:
- Add more events in `events.js`
- Modify family logic in `family.js`
- Create new endings in `endings.js`
- Add save/load functionality in `game.js`

## 📊 State Tracking

### Game State Variables
```javascript
gameState = {
    year: 1994,              // Current year
    eventIndex: 0,           // Which event (0-20)
    revenue: 0,              // Annual revenue
    profit: 0,               // Annual profit
    cash: 50000,             // Cash reserves
    valuation: 0,            // Company valuation
    debt: 0,                 // Outstanding debt
    
    // Decision tracking
    decisions: [],           // Array of {event, choice, year}
    
    // Business flags
    hasOutsideCEO: false,
    hasProfessionalBoard: false,
    hasGen3: false,
    robertRetired: false,
    robertDeceased: false,
    sarahCEO: false,
    michaelLeft: false,
    hasQualityIssues: false,
    hasDebt: false
}
```

### Family Members
Each family member tracks:
- `name`, `age`, `generation`
- `role` (Founder, CEO, COO, etc.)
- `ownership` (percentage)
- `happiness` (0-100 scale)
- `isActive`, `isDead`, `inBusiness`

## 🎓 Educational Value

This simulation teaches:
- **Succession Planning**: Timing, communication, fairness vs. meritocracy
- **Family Dynamics**: Compensation equity, passive shareholders, sibling rivalry
- **Growth vs. Dividends**: Reinvestment decisions, cash flow management
- **Crisis Management**: Layoffs, debt, quality issues
- **Governance**: Professional management, outside executives, family councils
- **Exit Strategy**: When/how to sell, generational transitions
- **Values**: Integrity, employee welfare, long-term thinking

## 🔄 State Dependencies

Events adapt based on:
- **Event 10 (COVID)**: References 2009 crisis decisions & financial health
- **Event 12 (Michael's Offer)**: References compensation conflict resolution
- **Event 13 (Acquisition Offer)**: Offer amount varies by revenue ($28M-$35M)
- **Event 14 (Quality Crisis)**: Root cause varies by growth/debt decisions
- **Event 19 (Strategic Decision)**: Descriptions adapt to company performance
- **Event 20 (Final Decision)**: Offer varies $30M-$55M, references past choices
- **All Endings**: Reference specific decisions (quality crisis, COVID, buyouts)

## 💾 Future Enhancements

Easy to add:
- Save/load game functionality (localStorage)
- Multiple playthrough comparison
- Detailed decision history view
- More events (easily add to EVENTS array)
- Different starting scenarios
- Achievement system
- Analytics dashboard

## 📝 Notes

- All 21 events are complete and tested
- State dependencies work correctly
- No quote escaping issues (uses template literals)
- Clean separation of concerns
- Easy to modify and extend
- No external dependencies except Google Fonts

## 🚀 Getting Started in Code Mode

1. Create a new project in Code mode
2. Copy all files from this folder
3. Open `index.html` - the game will work immediately
4. Modify `events.js` to add/edit events
5. Customize styling in `styles.css`
6. Extend game logic in `game.js`

Everything is preserved - all 21 events, state dependencies, endings, and educational value intact!
