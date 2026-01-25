// Game endings and final scoring
// Evaluates 50 years of decisions and provides personalized ending narrative

function showEnding() {
    console.log("Showing ending");

    // Calculate final scores
    const businessScore = getBusinessPerformanceScore();
    const harmonyScore = getFamilyHarmonyScore();
    const overallScore = (businessScore * 0.6 + harmonyScore * 0.4);

    // Determine ending type
    const ending = determineEnding(businessScore, harmonyScore);

    // Hide event card
    document.getElementById('eventCard').classList.add('hidden');

    // Create ending screen
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = `
        <div class="ending-screen">
            <div class="ending-header">
                <h2>The Anderson Family Business: 1994-2044</h2>
                <h3>Fifty Years Later</h3>
            </div>

            <div class="ending-scores">
                <div class="score-card">
                    <div class="score-label">Business Performance</div>
                    <div class="score-value">${businessScore}/100</div>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${businessScore}%; background: ${getScoreColor(businessScore)}"></div>
                    </div>
                </div>
                <div class="score-card">
                    <div class="score-label">Family Harmony</div>
                    <div class="score-value">${harmonyScore.toFixed(0)}/100</div>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${harmonyScore}%; background: ${getScoreColor(harmonyScore)}"></div>
                    </div>
                </div>
                <div class="score-card overall">
                    <div class="score-label">Overall Legacy</div>
                    <div class="score-value">${overallScore.toFixed(0)}/100</div>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${overallScore}%; background: ${getScoreColor(overallScore)}"></div>
                    </div>
                </div>
            </div>

            <div class="ending-narrative">
                <h3>${ending.title}</h3>
                ${ending.narrative}
            </div>

            <div class="ending-stats">
                <h3>Final Business Metrics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-label">Final Revenue</div>
                        <div class="stat-value">$${formatNumber(gameState.revenue)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Final Profit</div>
                        <div class="stat-value">$${formatNumber(gameState.profit)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Company Valuation</div>
                        <div class="stat-value">$${formatNumber(gameState.valuation)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Cash Position</div>
                        <div class="stat-value">$${formatNumber(gameState.cash)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Outstanding Debt</div>
                        <div class="stat-value">$${formatNumber(gameState.debt)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Family Avg. Happiness</div>
                        <div class="stat-value">${getFamilyAverageHappiness().toFixed(0)}%</div>
                    </div>
                </div>
            </div>

            <div class="ending-family">
                <h3>Where Are They Now?</h3>
                ${generateFamilyEndings()}
            </div>

            <div class="ending-lessons">
                <h3>Key Lessons</h3>
                ${generateLessons()}
            </div>

            <div class="ending-actions">
                <button class="btn" onclick="location.reload()">Play Again</button>
            </div>
        </div>
    `;
}

function determineEnding(businessScore, harmonyScore) {
    // Check for specific story endings first
    const lastDecision = gameState.decisions[gameState.decisions.length - 1];

    // Sold to PE firm ending
    if (lastDecision && lastDecision.event === 19 && lastDecision.choice === 0) {
        if (harmonyScore >= 70) {
            return {
                title: "The Golden Exit",
                narrative: `
                    <p>The Anderson family sold the business for $45M+ after 50 remarkable years. Robert's original $50,000 investment grew one-thousand-fold.</p>
                    <p>More importantly, the family remained united through the journey. While selling meant the end of the family business, it also meant financial security for generations to come.</p>
                    <p><strong>The family succeeded in both wealth creation and maintaining strong bonds—the rarest of outcomes.</strong></p>
                    <p>Sarah sometimes wonders what would have happened if they'd kept it, but she knows they made the right choice for the family as a whole.</p>
                `
            };
        } else {
            return {
                title: "The Exit",
                narrative: `
                    <p>The Anderson family sold the business for $45M+ after 50 years. Financially, they succeeded beyond Robert's wildest dreams.</p>
                    <p>But the journey took its toll on family relationships. The wealth is real, but so are the rifts that developed over decades of difficult decisions.</p>
                    <p><strong>They built wealth but fractured relationships along the way.</strong></p>
                    <p>At family gatherings, there's money but also awkward silences about old resentments that never fully healed.</p>
                `
            };
        }
    }

    // Third generation transition ending
    if (lastDecision && lastDecision.event === 19 && lastDecision.choice === 1) {
        if (businessScore >= 70 && harmonyScore >= 70) {
            return {
                title: "The Dynasty Continues",
                narrative: `
                    <p>Emily Anderson became CEO in 2044, leading Anderson Manufacturing into its third generation of family ownership.</p>
                    <p>The business thrived financially, and more remarkably, the family remained unified and happy throughout the 50-year journey.</p>
                    <p><strong>This is the dream outcome: a thriving business and a harmonious family, passing the torch to the next generation.</strong></p>
                    <p>Robert would be incredibly proud. The family business he started continues, stronger than ever, with his grandchildren at the helm.</p>
                `
            };
        } else if (businessScore >= 60 && harmonyScore < 50) {
            return {
                title: "Success at a Cost",
                narrative: `
                    <p>Anderson Manufacturing transitioned to third-generation leadership under Emily. The business performed well financially.</p>
                    <p>But the 50-year journey fractured family relationships. Success came at the cost of family harmony—some members are barely speaking to each other.</p>
                    <p><strong>The business survived, but was it worth the family pain?</strong></p>
                    <p>Emily inherits not just a company but also decades of unresolved family conflicts.</p>
                `
            };
        } else if (businessScore < 60 && harmonyScore >= 60) {
            return {
                title: "Together but Struggling",
                narrative: `
                    <p>The family remained close and caring despite business challenges. Anderson Manufacturing never achieved its full potential, but the Andersons stayed united.</p>
                    <p><strong>They chose family over maximum business growth—and lived with the consequences.</strong></p>
                    <p>Emily takes over a smaller company, but one where family members actually enjoy Thanksgiving dinner together.</p>
                `
            };
        } else {
            return {
                title: "The Burden",
                narrative: `
                    <p>Emily inherits Anderson Manufacturing, but it's a struggling business with fractured family relationships.</p>
                    <p>Fifty years of difficult decisions left the company weakened and the family divided.</p>
                    <p><strong>The third generation inherits problems, not opportunities.</strong></p>
                    <p>Emily wonders if she should have started her own company instead.</p>
                `
            };
        }
    }

    // General endings based on scores
    if (businessScore >= 75 && harmonyScore >= 75) {
        return {
            title: "The Dream Outcome",
            narrative: `
                <p>Fifty years after Robert took the leap, Anderson Manufacturing stands as both a business success and a testament to family unity.</p>
                <p><strong>You achieved what few family businesses accomplish: thriving financially while keeping the family together.</strong></p>
                <p>The decisions weren't always easy, but they balanced business needs with family welfare—and it worked.</p>
            `
        };
    } else if (businessScore >= 75 && harmonyScore < 50) {
        return {
            title: "Pyrrhic Victory",
            narrative: `
                <p>Anderson Manufacturing became a financial powerhouse. Revenue soared, profits multiplied, and the company dominated its market.</p>
                <p>But family relationships paid the price. <strong>Business success came at the cost of family harmony.</strong></p>
                <p>Some family members haven't spoken in years. Was it worth it?</p>
            `
        };
    } else if (businessScore < 50 && harmonyScore >= 75) {
        return {
            title: "Family First",
            narrative: `
                <p>The business never became the empire it could have been. Conservative choices protected the family but limited growth.</p>
                <p><strong>The Andersons chose family over profit—and they're happy with that choice.</strong></p>
                <p>Sunday dinners are warm and genuine. That's worth more than another million in revenue.</p>
            `
        };
    } else if (businessScore >= 60 && harmonyScore >= 60) {
        return {
            title: "Balanced Legacy",
            narrative: `
                <p>Anderson Manufacturing found a middle path. The business succeeded reasonably well, and the family maintained decent relationships.</p>
                <p><strong>Not perfect, but sustainable—which is its own kind of success.</strong></p>
                <p>Fifty years in business with the family still intact is an achievement worth celebrating.</p>
            `
        };
    } else {
        return {
            title: "Lessons Learned the Hard Way",
            narrative: `
                <p>The 50-year journey was difficult. The business struggled, and family relationships frayed under the pressure.</p>
                <p><strong>Family business is harder than it looks.</strong> Perhaps some of the early decisions should have been different.</p>
                <p>Still, Anderson Manufacturing survived five decades—many businesses don't make it this far.</p>
            `
        };
    }
}

function generateFamilyEndings() {
    let html = '<div class="family-endings">';

    // Robert
    if (familyMembers.robert.isDead) {
        html += `
            <div class="family-ending-item">
                <strong>Robert Anderson</strong> (1959-2034) - The founder passed away at 75, leaving behind a company that transformed his family's destiny. His legacy lives on in every decision the company makes.
            </div>
        `;
    } else {
        html += `
            <div class="family-ending-item">
                <strong>Robert Anderson</strong> (age ${familyMembers.robert.age}) - The founder is still alive, watching with pride (or concern) as the next generation leads the company he built. Happiness: ${Math.round(familyMembers.robert.happiness)}%
            </div>
        `;
    }

    // Sarah
    if (gameState.sarahCEO) {
        html += `
            <div class="family-ending-item">
                <strong>Sarah Anderson</strong> (age ${familyMembers.sarah.age}) - Serves as CEO, leading the company her father built. ${familyMembers.sarah.happiness >= 70 ? 'She loves her role and feels fulfilled.' : familyMembers.sarah.happiness >= 40 ? 'She carries the weight of leadership with mixed feelings.' : 'The burden of leadership has taken its toll.'} Happiness: ${Math.round(familyMembers.sarah.happiness)}%
            </div>
        `;
    } else if (familyMembers.sarah.inBusiness) {
        html += `
            <div class="family-ending-item">
                <strong>Sarah Anderson</strong> (age ${familyMembers.sarah.age}) - Works in the family business as ${familyMembers.sarah.role}. ${familyMembers.sarah.happiness >= 60 ? 'She finds meaning in contributing to the family legacy.' : 'She sometimes wonders about the path not taken.'} Happiness: ${Math.round(familyMembers.sarah.happiness)}%
            </div>
        `;
    } else {
        html += `
            <div class="family-ending-item">
                <strong>Sarah Anderson</strong> (age ${familyMembers.sarah.age}) - Built a career outside the family business. ${familyMembers.sarah.happiness >= 60 ? 'She\'s happy with her independence.' : 'She has complicated feelings about her relationship with the family business.'} Happiness: ${Math.round(familyMembers.sarah.happiness)}%
            </div>
        `;
    }

    // Michael
    if (gameState.michaelLeft) {
        html += `
            <div class="family-ending-item">
                <strong>Michael Anderson</strong> (age ${familyMembers.michael.age}) - Left the family business to build his own career. ${familyMembers.michael.happiness >= 60 ? 'He succeeded independently and has made peace with his decision.' : 'He still carries resentment about how things unfolded.'} Family dinners remain somewhat awkward. Happiness: ${Math.round(familyMembers.michael.happiness)}%
            </div>
        `;
    } else if (familyMembers.michael.inBusiness) {
        html += `
            <div class="family-ending-item">
                <strong>Michael Anderson</strong> (age ${familyMembers.michael.age}) - Remains with the family business as ${familyMembers.michael.role}. ${familyMembers.michael.happiness >= 60 ? 'He found his place and contributes meaningfully.' : 'He sometimes wonders if he should have left to forge his own path.'} Happiness: ${Math.round(familyMembers.michael.happiness)}%
            </div>
        `;
    } else {
        html += `
            <div class="family-ending-item">
                <strong>Michael Anderson</strong> (age ${familyMembers.michael.age}) - Never joined the family business, building his own career instead. ${familyMembers.michael.happiness >= 60 ? 'He\'s content with his choices.' : 'He has mixed feelings about his relationship with the family enterprise.'} Happiness: ${Math.round(familyMembers.michael.happiness)}%
            </div>
        `;
    }

    // Jennifer
    if (familyMembers.jennifer.ownership === 0) {
        html += `
            <div class="family-ending-item">
                <strong>Jennifer Anderson</strong> (age ${familyMembers.jennifer.age}) - The teacher who was bought out of the family business. ${familyMembers.jennifer.happiness >= 60 ? 'She used the money to build financial security and is at peace.' : 'She sometimes resents being the "outside" sibling, despite the payout.'} Happiness: ${Math.round(familyMembers.jennifer.happiness)}%
            </div>
        `;
    } else if (familyMembers.jennifer.ownership > 0) {
        html += `
            <div class="family-ending-item">
                <strong>Jennifer Anderson</strong> (age ${familyMembers.jennifer.age}) - Remained a shareholder (${familyMembers.jennifer.ownership.toFixed(1)}%) while building her teaching career. ${familyMembers.jennifer.happiness >= 60 ? 'She appreciates having a stake in the family legacy.' : 'She feels trapped as a passive shareholder in a business she doesn\'t control.'} Happiness: ${Math.round(familyMembers.jennifer.happiness)}%
            </div>
        `;
    }

    html += '</div>';
    return html;
}

function generateLessons() {
    const lessons = [];

    // Analyze key decision patterns
    const protectedEmployees2009 = gameState.decisions.find(d => d.event === 4 && d.choice === 2);
    const protectedEmployees2020 = gameState.decisions.find(d => d.event === 9 && d.choice === 1);
    const qualityDecision = gameState.decisions.find(d => d.event === 13);
    const michaelCompensation = gameState.decisions.find(d => d.event === 7);
    const successionClarity = gameState.decisions.find(d => d.event === 5);

    // Lesson 1: Values vs Profits
    if (protectedEmployees2009 || protectedEmployees2020) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Values Matter More Than Quarterly Results</strong> - You chose to protect employees during crises, even at personal cost. This builds loyalty and culture that can't be bought.
            </div>
        `);
    }

    if (qualityDecision && qualityDecision.choice === 0) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Integrity is Expensive But Priceless</strong> - Taking full responsibility for quality issues cost money but preserved reputation and values.
            </div>
        `);
    }

    // Lesson 2: Succession Planning
    if (successionClarity && successionClarity.choice === 0) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Early Succession Planning Reduces Conflict</strong> - Committing to Sarah early provided clarity and reduced family tension about leadership.
            </div>
        `);
    } else if (successionClarity && successionClarity.choice === 1) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Ambiguity Breeds Conflict</strong> - Delaying succession decisions created unnecessary competition and resentment between siblings.
            </div>
        `);
    }

    // Lesson 3: Fair vs Equal
    if (michaelCompensation) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Fair Is Not Always Equal</strong> - Compensation and ownership decisions in family business require balancing contribution, role, and family relationships.
            </div>
        `);
    }

    // Lesson 4: Growth vs Family
    const majorInvestments = gameState.decisions.filter(d =>
        (d.event === 6 && d.choice === 0) ||
        (d.event === 18 && d.choice === 0)
    );
    if (majorInvestments.length >= 2) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Growth Requires Sacrifice</strong> - You consistently chose growth over short-term family comfort. This paid off financially but affected relationships.
            </div>
        `);
    }

    // Lesson 5: Exit timing
    const acquisitionOffers = gameState.decisions.filter(d => d.event === 12 || d.event === 19);
    const declined = acquisitionOffers.filter(d => d.choice === 1);
    if (declined.length >= 2) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Legacy Over Liquidity</strong> - You chose to maintain family ownership over cashing out. This preserves the family business for future generations.
            </div>
        `);
    }

    // Lesson 6: Michael leaving
    if (gameState.michaelLeft) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Not Everyone Stays</strong> - Even in family businesses, not all family members find their place. Michael's departure is a reminder that family dynamics are complex.
            </div>
        `);
    }

    // Default lessons if few specific ones triggered
    if (lessons.length < 3) {
        lessons.push(`
            <div class="lesson-item">
                <strong>Family Business is a Marathon</strong> - Fifty years requires balancing short-term pressures with long-term relationships and values.
            </div>
        `);
        lessons.push(`
            <div class="lesson-item">
                <strong>No Perfect Answers</strong> - Every major decision involved trade-offs. Success means making thoughtful choices and living with the consequences.
            </div>
        `);
    }

    return '<div class="lessons-grid">' + lessons.join('') + '</div>';
}

function getScoreColor(score) {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#8bc34a';
    if (score >= 40) return '#ff9800';
    if (score >= 20) return '#ff5722';
    return '#f44336';
}
