// All 21 events for the 50-year family business simulation
// Each event has: date, title, description, and options with effects and impact

const EVENTS = [

                // Event 0: 1994 - The Beginning
                {
                    date: "1994",
                    title: "The Leap of Faith",
                    description: `Robert Anderson stands at a crossroads. He's 35 years old with a stable engineering job that pays $65,000 a year. But he's invented a specialized manufacturing component that he believes could revolutionize the industry.\n\nHis wife is supportive but nervous. They have three young children, a mortgage, and car payments. Their savings account has $50,000—enough to survive for maybe six months without income.\n\nTwo options lie before him: Bootstrap the business slowly, working nights and weekends while keeping his day job, or quit now, take a $100,000 loan, and go all-in.\n\nThe conservative path is safer. The aggressive path could make or break everything.`,
                    options: [
                        {
                            text: "Bootstrap slowly - keep the day job, grow cautiously",
                            effects: {
                                marketDemand: 150000,
                                cash: 30000,
                                assets: 60000,
                                robertSalary: 45000,  // Robert takes modest salary while keeping day job
                                robertHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert keeps his day job and works on the business nights and weekends. Progress is slow but steady.</p><p><span class='impact-positive'>The family maintains financial stability</span>, though Robert is exhausted from working 70-hour weeks.</p><p>After two years, the business brings in modest revenue, and Robert has kept his family secure. But <span class='impact-highlight'>Robert's happiness decreases</span> from the relentless grind.</p>`
                        },
                        {
                            text: "Take the $100K loan and go all-in immediately",
                            effects: {
                                marketDemand: 400000,
                                cash: -30000,
                                debt: 100000,
                                assets: 160000,
                                robertSalary: 80000,  // Robert pays himself good salary
                                robertHappiness: 10,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert quits his job and commits fully to the business. The $100K loan gives him capital to invest in equipment and hire his first employee.</p><p><span class='impact-positive'>Revenue grows rapidly to $400K</span> in the first two years. The risk pays off—but <span class='impact-negative'>the family now carries $100K in debt</span>.</p><p><span class='impact-highlight'>Robert</span> is energized and happy, though the pressure is intense. The family has bet everything on this dream.</p>`
                        }
                    ]
                },
                
                // Event 1: 1996 - First Major Client
                {
                    date: "1996",
                    title: "The First Major Client",
                    description: function() {
                        var baseDesc = "Two years in, Anderson Manufacturing has survived. ";
                        if (gameState.hasDebt) {
                            baseDesc += "The $100K loan is still being repaid, but cash flow is stabilizing.\n\n";
                        } else {
                            baseDesc += "The bootstrap approach worked—the business is growing steadily.\n\n";
                        }

                        baseDesc += "Now a Fortune 500 company has approached Robert with an opportunity that could transform everything: a $1.2M contract over three years.\n\n";
                        baseDesc += "The catch: To deliver at this scale, Robert needs to hire six more people immediately, lease a 10,000 sq ft facility, and invest $200K in equipment and setup. Monthly overhead will triple.\n\n";
                        baseDesc += "If Anderson Manufacturing delivers quality work on time, this client could become an anchor account worth millions over the next decade. But if they fail to deliver, the reputational damage in this tight-knit industry could be fatal.\n\n";
                        baseDesc += "Robert's current setup could maybe handle it—working nights and weekends, pushing his small team to the limit. But quality would likely suffer, and burnout is certain.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept the contract and invest in scaling up",
                            effects: {
                                marketDemand: 1200000,  // Adds to market demand
                                cash: -200000,  // Investment cost
                                assets: 200000,  // Buy equipment
                                robertHappiness: 15,
                                managementQuality: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert accepts the contract and makes the necessary investments. <span class='impact-positive'>Market demand jumps</span> with the new Fortune 500 client.</p><p>The new facility and expanded team deliver excellent work. <span class='impact-positive'>The client is impressed and extends the contract.</span></p><p><span class='impact-highlight'>Robert</span> is thrilled—the business is truly taking off. However, <span class='impact-negative'>cash reserves are depleted</span> from the expansion costs.</p>`
                        },
                        {
                            text: "Decline—stay small and avoid the risk",
                            effects: {
                                marketDemand: 200000,
                                cash: 50000,
                                robertHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert declines the major contract, choosing stability over growth risk.</p><p>The business continues to grow slowly. <span class='impact-positive'>Cash reserves remain healthy</span>, but market opportunities are modest.</p><p><span class='impact-highlight'>Robert</span> wonders if he's made a mistake. <span class='impact-negative'>His happiness decreases</span>—he can't shake the feeling that he's missed a huge opportunity.</p>`
                        }
                    ]
                },
                
                // Event 2: 2000 - Dot-com Crash Impact
                {
                    date: "2000",
                    title: "The Dot-Com Crash",
                    description: function() {
                        var baseDesc = "March 2000. The dot-com bubble has burst spectacularly. The NASDAQ has crashed, and the fallout is spreading through the entire economy.\n\n";
                        baseDesc += "Several of Anderson Manufacturing's clients are tech companies or tech suppliers. Orders are being canceled. One client just filed for bankruptcy owing Anderson $180K.\n\n";
                        baseDesc += "Robert looks at the numbers: revenue is projected to drop 30-40% this year. The company employs " + (gameState.employees || 15) + " people, many who have been with him since the early days.\n\n";

                        if (gameState.hasDebt && gameState.debt > 50000) {
                            baseDesc += "The situation is particularly dire because Anderson is carrying $" + formatNumber(gameState.debt) + " in debt. Loan payments are due every month regardless of revenue.\n\n";
                        }

                        baseDesc += "Robert faces brutal choices:\n\n";
                        baseDesc += "1. Lay off one-third of the workforce to slash costs and survive\n2. Take on $150K in new debt to maintain the team and weather the storm\n3. Pivot to more stable industries like traditional manufacturing and construction\n\n";
                        baseDesc += "Each path has consequences. Layoffs will devastate families. More debt in an uncertain economy is dangerous. Pivoting means abandoning years of relationship-building.\n\n";
                        baseDesc += "This crisis will define what kind of leader Robert is.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Lay off 5 employees to cut costs",
                            effects: {
                                marketDemand: -300000,  // Lost customers
                                cash: 100000,  // Reduced payroll saves cash
                                employees: -5,
                                robertHappiness: -15,
                                managementQuality: -8
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert makes the painful decision to lay off one-third of his workforce. <span class='impact-positive'>Cash flow stabilizes</span> from reduced payroll.</p><p>However, the smaller team struggles to serve all clients. <span class='impact-negative'>Some customers leave.</span></p><p><span class='impact-highlight'>Robert</span> is haunted by the decision. <span class='impact-negative'>His happiness drops significantly</span>—he feels he's failed the employees who trusted him.</p><p>The remaining team is nervous and morale is low.</p>`
                        },
                        {
                            text: "Take on $150K debt to maintain the full team",
                            effects: {
                                marketDemand: -200000,  // Market still down
                                debt: 150000,
                                cash: 150000,  // Debt provides cash cushion
                                robertHappiness: 5,
                                hasDebt: true,
                                managementQuality: 3
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert refuses to lay anyone off and borrows $150K to weather the storm. <span class='impact-negative'>Market demand decreases</span> as the economy contracts.</p><p>The team is grateful and loyal. <span class='impact-highlight'>Robert</span> feels he's done the right thing, though the financial pressure is intense.</p><p>The company survives with its team intact, but <span class='impact-negative'>now carries $150K in debt</span> going into an uncertain economy.</p>`
                        },
                        {
                            text: "Pivot to serving manufacturing and construction industries",
                            effects: {
                                marketDemand: 100000,  // New markets
                                cash: -50000,  // Marketing costs
                                robertHappiness: -5,
                                managementQuality: 2
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert pivots to more stable industries. <span class='impact-positive'>New demand emerges</span> as clients from construction and traditional manufacturing sign on.</p><p>However, building these new relationships takes time and money. <span class='impact-negative'>Cash reserves decrease</span> from sales and marketing efforts.</p><p><span class='impact-highlight'>Robert</span> is moderately stressed but believes this diversification will pay off long-term.</p>`
                        }
                    ]
                },
                
                // Event 3: 2004 - Industry Expansion
                {
                    date: "2004",
                    title: "New Market Opportunities",
                    description: function() {
                        var baseDesc = "Anderson Manufacturing has built a solid reputation in its core market. The business is now generating $" + formatNumber(gameState.revenue > 0 ? gameState.revenue : 2000000) + " annually.\n\n";
                        baseDesc += "Robert is 45 years old, and he's seeing opportunities to expand into adjacent industries—automotive and aerospace both need the specialized components Anderson produces.\n\n";
                        baseDesc += "However, these industries have stricter quality certifications and longer sales cycles. Breaking in will require significant investment in new certifications, equipment upgrades, and hiring specialized sales talent.\n\n";
                        baseDesc += "The safer path is to deepen relationships in current markets. The aggressive path could double the business in five years—or consume cash without results.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Invest $250K to pursue automotive and aerospace certifications",
                            effects: {
                                marketDemand: 800000,  // New market access
                                cash: -250000,  // Certification costs
                                assets: 250000,  // Equipment upgrades
                                robertHappiness: 10,
                                managementQuality: 8
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert invests heavily in certifications and equipment to break into automotive and aerospace markets.</p><p>The gamble pays off. <span class='impact-positive'>Demand surges by $800K</span> as Anderson Manufacturing wins its first aerospace contract. <span class='impact-positive'>Management quality improves</span> as the team develops expertise in these demanding industries.</p><p><span class='impact-highlight'>Robert</span> is energized by the growth. The business is reaching new heights.</p>`
                        },
                        {
                            text: "Stay focused on current markets and deepen existing relationships",
                            effects: {
                                marketDemand: 300000,  // Organic growth
                                cash: 100000,  // Retained earnings
                                robertHappiness: -3
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert chooses the conservative path, focusing on strengthening current customer relationships.</p><p><span class='impact-positive'>Cash reserves grow</span> and the business remains stable. Existing clients appreciate the dedicated focus.</p><p>However, <span class='impact-highlight'>Robert</span> watches competitors enter the aerospace market and wonders if he's being too cautious. Growth is steady but unspectacular.</p>`
                        }
                    ]
                },

                // Event 4: 2007 - Sarah and Michael Join
                {
                    date: "2007",
                    title: "The Next Generation Enters",
                    description: function() {
                        var baseDesc = "Robert is 48 years old. Anderson Manufacturing now generates $" + formatNumber(gameState.revenue > 0 ? gameState.revenue : 4500000) + " annually and employs " + (gameState.employees || 30) + " people. The business Robert started 13 years ago is thriving.\n\n";
                        baseDesc += "And now his children want in.\n\n";
                        baseDesc += "Sarah, 21, just graduated with her MBA from a top-tier program. She's smart, analytical, and has real business skills. She wants to join as a junior manager and work her way up.\n\n";
                        baseDesc += "Michael, 18, finished his undergraduate degree. He doesn't have Sarah's credentials or her strategic mind, but he's charismatic, loves people, and wants to work in sales.\n\n";
                        baseDesc += "Robert knows this moment is critical. How he brings them in will set precedents that echo for decades. Should they start at the bottom like any other employee? Should they receive market-rate salaries, or should family connection provide a premium?\n\n";
                        baseDesc += "Robert's non-family employees are watching carefully. So are Sarah and Michael, who will compare how they're treated to each other.\n\n";
                        baseDesc += "How Robert handles this will shape the next 30 years of family and business dynamics.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Hire both at market-rate salaries, make them earn their positions",
                            effects: {
                                marketDemand: 400000,
                                sarahSalary: 65000,  // Market rate for MBA grad
                                michaelSalary: 50000,  // Market rate for sales role
                                sarahHappiness: 5,
                                michaelHappiness: 5,
                                robertHappiness: 10,
                                managementQuality: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah starts as a junior manager at $65K, Michael in sales at $50K—both market rates for their experience.</p><p><span class='impact-positive'>Revenue increases</span> as both contribute to the business. Their salaries will be paid from profits.</p><p><span class='impact-highlight'>Sarah and Michael</span> appreciate being treated professionally, though they sometimes wonder if family connections should provide more benefits.</p><p><span class='impact-highlight'>Robert</span> is proud of the professional approach.</p>`
                        },
                        {
                            text: "Give them elevated positions and above-market compensation",
                            effects: {
                                marketDemand: 300000,
                                sarahSalary: 90000,  // Above market
                                michaelSalary: 75000,  // Above market
                                sarahHappiness: 15,
                                michaelHappiness: 15,
                                robertHappiness: -5,
                                managementQuality: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah starts as Assistant COO at $90K, Michael as Sales Director at $75K—well above market for their experience.</p><p><span class='impact-highlight'>Sarah and Michael</span> feel valued and trusted. <span class='impact-positive'>Their happiness increases significantly.</span></p><p>However, the high salaries will reduce profits. Non-family employees notice the special treatment and some grumble about nepotism.</p><p><span class='impact-highlight'>Robert</span> worries whether he's done the right thing.</p>`
                        }
                    ]
                },
                
                // Event 5: 2009 - Financial Crisis
                {
                    date: "2009",
                    title: "The Great Recession",
                    description: function() {
                        var baseDesc = "September 2009. The 2008 financial crisis has devastated the economy. Lehman Brothers collapsed. The auto industry is on life support. Credit markets are frozen.\n\n";
                        baseDesc += "Anderson Manufacturing's orders are down 40% year-over-year. Clients are canceling contracts, delaying payments, and some are going bankrupt.\n\n";
                        baseDesc += "The company employs " + (gameState.employees || 35) + " people. Cash reserves: $" + formatNumber(gameState.cash > 0 ? gameState.cash : 300000) + ". At the current burn rate, that's " + (gameState.cash > 200000 ? "3-4 months" : "6-8 weeks") + " of runway.\n\n";
                        baseDesc += "Sarah (23) and Michael (20) are both working in the business now. Jennifer (19) is in college, depending on dividend income to help with expenses.\n\n";
                        baseDesc += "Robert is facing the hardest decision since 1994. He needs to cut costs immediately:\n\n";
                        baseDesc += "1. Cut everyone's salary by 20%—family and non-family alike—to avoid layoffs\n2. Lay off 8 employees (including some who've been here for years)\n3. Family members take 40% salary cuts and zero dividends; protect all non-family jobs\n\n";
                        baseDesc += "Every option hurts someone. This crisis will reveal what Anderson Manufacturing truly values.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Cut all salaries by 20%, share the pain equally",
                            effects: {
                                robertSalary: 96000,  // 20% cut from ~$120K
                                sarahSalary: 52000,   // 20% cut from $65K
                                michaelSalary: 40000, // 20% cut from $50K
                                cash: 150000,  // Reduced payroll
                                robertHappiness: -10,
                                sarahHappiness: -5,
                                michaelHappiness: -5,
                                managementQuality: 3
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert announces a company-wide 20% salary cut. Everyone shares the pain—family and non-family employees alike.</p><p><span class='impact-positive'>Cash flow stabilizes</span> and <span class='impact-positive'>no one loses their job</span>. The team appreciates that everyone is sacrificing together.</p><p>The Anderson family's income drops sharply. <span class='impact-highlight'>Robert, Sarah, and Michael</span> all feel the financial strain, though they understand it's necessary.</p>`
                        },
                        {
                            text: "Lay off 8 non-family employees",
                            effects: {
                                cash: 120000,  // Lower payroll
                                marketDemand: -400000,  // Lost capacity
                                robertHappiness: -20,
                                sarahHappiness: -10,
                                michaelHappiness: -8,
                                employees: -8,
                                managementQuality: -8
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert makes the painful decision to lay off 8 employees. <span class='impact-positive'>Cash flow improves</span>, but <span class='impact-negative'>the smaller team can't serve all customers</span>.</p><p>The laid-off employees feel betrayed, especially when they see the Anderson family kept their positions. Company culture suffers.</p><p><span class='impact-highlight'>Robert</span> is devastated by the decision. <span class='impact-negative'>His happiness plummets</span>—he questions whether he should have protected his employees before his family.</p>`
                        },
                        {
                            text: "Family takes 40% salary cuts and no dividends; protect non-family jobs",
                            effects: {
                                robertSalary: 72000,  // 40% cut from ~$120K
                                sarahSalary: 39000,   // 40% cut from $65K
                                michaelSalary: 30000, // 40% cut from $50K
                                dividendPolicy: 0.0,  // No dividends temporarily
                                cash: 80000,
                                robertHappiness: 5,
                                sarahHappiness: 10,
                                michaelHappiness: 5,
                                jenniferHappiness: -15,
                                managementQuality: 6
                            },
                            impact: `<h4>Decision Impact</h4><p>The Anderson family agrees to deep salary cuts and forgoes all dividends to protect employee jobs.</p><p>The employees are deeply grateful. Non-family staff work even harder, knowing the family sacrificed for them. <span class='impact-positive'>Company loyalty and culture strengthens.</span></p><p><span class='impact-highlight'>Jennifer</span> is upset—she was counting on dividend income for college expenses. <span class='impact-negative'>Her happiness decreases significantly.</span></p><p><span class='impact-highlight'>Robert and Sarah</span> feel they've done the right thing.</p>`
                        }
                    ]
                },
                
                // Event 6: 2012 - Succession Decision
                {
                    date: "2012",
                    title: "The Succession Decision",
                    description: function() {
                        var baseDesc = "Robert is now 53. The business is generating $" + formatNumber(gameState.revenue > 0 ? gameState.revenue : 5000000) + " annually and employs " + (gameState.employees || 35) + " people.\n\n";
                        baseDesc += "Sarah has been COO for a year now. She's proven herself—implementing new systems, making tough operational decisions, and working tirelessly. Her MBA and business acumen are clear assets.\n\n";
                        baseDesc += "Michael runs sales and has brought in significant new business. He's charismatic with clients but lacks Sarah's operational depth and strategic thinking. He's 29 years old—still developing.\n\n";
                        baseDesc += "Robert needs to make a decision about succession. Not for tomorrow, but for 5-7 years from now. The decision will shape the next decade of family and business dynamics.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Name Sarah as successor CEO—give her clear path to leadership",
                            effects: {
                                sarahHappiness: 25,
                                michaelHappiness: -12,
                                robertHappiness: 5,
                                marketDemand: 400000,  // Clarity drives better execution
                                managementQuality: 10,
                                sarahSuccessor: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert announces that Sarah will become CEO when he retires, likely within 5-7 years.</p><p><span class='impact-highlight'>Sarah</span> is energized and deeply grateful. <span class='impact-positive'>Her happiness increases dramatically</span> and she redoubles her efforts. <span class='impact-positive'>Business performance improves</span> as she implements long-term strategies.</p><p><span class='impact-highlight'>Michael</span> is disappointed but not surprised. <span class='impact-negative'>His happiness decreases moderately</span>. He'll need to find his own path in the business.</p><p>The clarity is healthy. Everyone knows where they stand.</p>`
                        },
                        {
                            text: "Create co-leadership structure—both children share top roles",
                            effects: {
                                sarahHappiness: -8,
                                michaelHappiness: 12,
                                robertHappiness: -5,
                                managementQuality: -6
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert proposes that Sarah and Michael share leadership—Sarah as CEO, Michael as President, with major decisions made jointly.</p><p><span class='impact-highlight'>Sarah</span> is frustrated. After proving her capabilities, she doesn't want decision-making authority diluted. <span class='impact-negative'>Her happiness decreases.</span></p><p><span class='impact-highlight'>Michael</span> is pleased to have a leadership role, though he senses Sarah's resentment.</p><p>The ambiguous power structure creates friction. <span class='impact-negative'>Business performance suffers</span> from unclear accountability and sibling dynamics.</p>`
                        }
                    ]
                },
                
                // Event 7: 2014 - Growth Opportunity
                {
                    date: "2014",
                    title: "The Major Contract",
                    description: function() {
                        var baseDesc = "A Fortune 100 company has approached Anderson Manufacturing with a massive opportunity: a $3M annual contract for five years.\n\n";
                        baseDesc += "Currently, the company generates $" + formatNumber(gameState.revenue > 0 ? gameState.revenue : 4000000) + " in annual revenue. This single contract could increase revenue by 75%.\n\n";
                        baseDesc += "The catch: fulfilling it requires $1.2M in upfront investment—new equipment and hiring 20 additional workers.\n\n";
                        baseDesc += "Sarah, now COO, has prepared a detailed analysis showing 22% ROI over five years. The numbers are solid. Michael is excited about the growth.\n\n";
                        baseDesc += "But Jennifer is concerned. The investment will eliminate dividend payments for at least three years. She was counting on that income for a house down payment.\n\n";
                        baseDesc += "Growth versus family financial security. The classic family business tension.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept the contract and make the investment",
                            effects: {
                                marketDemand: 3000000,  // Major new contract
                                cash: -1200000,  // Investment
                                assets: 1200000,  // Equipment and facilities
                                debt: 500000,  // Partial debt financing
                                dividendPolicy: 0.1,  // Reduce dividends to 10% to fund growth
                                sarahHappiness: 15,
                                michaelHappiness: 15,
                                jenniferHappiness: -20,
                                hasDebt: true,
                                managementQuality: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>The company accepts the contract and makes the major investment. <span class='impact-positive'>Market demand increases by $3M annually</span> and <span class='impact-positive'>company valuation rises substantially</span>.</p><p>However, <span class='impact-negative'>cash is depleted and the company takes on $500K in debt</span> to complete the investment. Dividends are cut to 10% to conserve cash.</p><p><span class='impact-highlight'>Sarah and Michael</span> are thrilled with the growth opportunity. <span class='impact-highlight'>Jennifer</span> is upset—<span class='impact-negative'>her happiness drops significantly</span> as her dividend income plummets.</p>`
                        },
                        {
                            text: "Decline and maintain stable dividend payments",
                            effects: {
                                cash: 200000,
                                dividendPolicy: 0.4,  // Increase dividends to 40%
                                sarahHappiness: -15,
                                michaelHappiness: -15,
                                jenniferHappiness: 15,
                                robertHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert declines the contract to protect dividend payments and avoid risk. Dividend policy is increased to 40% of profits.</p><p><span class='impact-highlight'>Jennifer</span> is relieved—<span class='impact-positive'>her dividend income increases</span>, and she can proceed with buying her house.</p><p><span class='impact-highlight'>Sarah and Michael</span> are deeply frustrated. <span class='impact-negative'>Their happiness decreases significantly</span>. They feel the family is holding the business back.</p><p><span class='impact-highlight'>Robert</span> worries he's made the wrong choice and is limiting the company's potential.</p>`
                        }
                    ]
                },
                
                // Event 8: 2016 - Michael's Compensation Conflict
                {
                    date: "2016",
                    title: "The Compensation Debate",
                    description: function() {
                        var baseDesc = "Michael, now 29, requests a private meeting with Robert. He's prepared a spreadsheet.\n\n";
                        baseDesc += "\"Dad, I brought in $4.2M in new business last year—nearly " + (Math.round((4200000 / Math.max(gameState.revenue, 6000000)) * 100)) + "% of our total revenue. Sarah makes $180K as COO. I make $120K.\"\n\n";
                        baseDesc += "He pauses. \"I understand her role has more responsibility. But my results speak for themselves. I'm creating enormous value and being paid 33% less.\"\n\n";
                        baseDesc += "Robert recognizes Michael's frustration. Sarah works 60-hour weeks, makes strategic decisions, manages operations, and carries ultimate accountability. Her MBA and expertise justify the differential.\n\n";
                        baseDesc += "But Michael's sales performance has been exceptional. The company's growth is directly tied to the relationships he's built.\n\n";
                        baseDesc += "Fair isn't always equal. Equal isn't always fair. How Robert handles this will affect family dynamics for years.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Increase Michael's salary to $160K to recognize his sales success",
                            effects: {
                                michaelSalary: 160000,  // Raise from ~$120K to $160K
                                marketDemand: 500000,
                                michaelHappiness: 18,
                                sarahHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert raises Michael's salary to $160K, substantially narrowing the gap with Sarah.</p><p><span class='impact-highlight'>Michael</span> feels valued and recognized. <span class='impact-positive'>His happiness increases dramatically</span> and <span class='impact-positive'>his sales performance gets even better</span>.</p><p>The higher salary will reduce profits, but Michael's renewed energy drives more revenue.</p><p><span class='impact-highlight'>Sarah</span> is frustrated. She feels the differential should reflect their very different roles and responsibilities. <span class='impact-negative'>Her happiness decreases</span>.</p>`
                        },
                        {
                            text: "Maintain the differential and explain that different roles have different compensation",
                            effects: {
                                michaelHappiness: -15,
                                robertHappiness: -8,
                                marketDemand: -300000
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert explains that compensation reflects both results and responsibility level. Sarah's role as COO justifies higher pay regardless of Michael's sales numbers.</p><p><span class='impact-highlight'>Michael</span> feels unappreciated and resentful. <span class='impact-negative'>His happiness drops significantly</span>. His sales performance declines as his motivation suffers.</p><p><span class='impact-highlight'>Robert</span> stands by the decision but worries about the growing tension between his children.</p>`
                        }
                    ]
                },
                
                // Event 9: 2018 - Outside Executive Opportunity
                {
                    date: "2018",
                    title: "The Outside COO Candidate",
                    description: `A headhunter has approached Robert about Amanda Chen, a highly experienced COO from a $75M manufacturing company. She's interested in joining Anderson Manufacturing.\n\nAmanda has expertise that neither Sarah nor Michael possess. She could accelerate growth dramatically. But hiring her would demote Sarah, who has been COO for seven years.\n\nAmanda wants $220K salary plus 5% equity. The family would need to dilute their ownership.\n\nThis is a defining moment: professionalize with outside talent, or commit to family leadership?`,
                    options: [
                        {
                            text: "Hire Amanda as COO, moving Sarah to VP of Operations",
                            effects: {
                                marketDemand: 1500000,
                                cash: -50000,  // Recruiting costs
                                robertOwnership: -2,
                                sarahOwnership: -2,
                                michaelOwnership: -1,
                                jenniferOwnership: -1,
                                sarahHappiness: -30,
                                michaelHappiness: -15,
                                robertHappiness: 10,
                                hasOutsideCEO: true,
                                managementQuality: 15
                            },
                            impact: `<h4>Decision Impact</h4><p>Amanda joins as COO at $220K salary. <span class='impact-positive'>Market demand grows significantly</span> under her professional management. <span class='impact-positive'>Company valuation increases substantially.</span></p><p><span class='impact-highlight'>Sarah</span> is devastated. <span class='impact-negative'>Her happiness plummets</span>—after seven years as COO, she's been demoted in favor of an outsider. She's questioning whether to leave.</p><p><span class='impact-highlight'>Michael</span> also sees his advancement blocked. All family ownership stakes decrease slightly due to Amanda's 5% equity.</p><p><span class='impact-highlight'>Robert</span> believes he's made the right business decision, even if it's painful for the family.</p>`
                        },
                        {
                            text: "Stay family-led and invest in Sarah's development",
                            effects: {
                                cash: -50000,  // Coaching investment
                                sarahHappiness: 20,
                                michaelHappiness: 8,
                                robertHappiness: -5,
                                managementQuality: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert passes on Amanda and commits to Sarah's leadership. He invests $50K in executive coaching and development for her.</p><p><span class='impact-highlight'>Sarah</span> feels deeply valued and supported. <span class='impact-positive'>Her happiness increases dramatically.</span></p><p>The investment in Sarah pays dividends over time, though growth is slower than it might have been with Amanda's expertise.</p><p><span class='impact-highlight'>Robert</span> sometimes wonders if family loyalty is limiting the business's potential.</p>`
                        }
                    ]
                },
                
                // Event 10: 2020 - COVID-19 Crisis
                {
                    date: "2020",
                    title: "The Pandemic",
                    description: function() {
                        var baseDesc = "March 2020. COVID-19 has shut down the economy overnight. Factories are closing, supply chains are collapsing, clients are suspending operations.\n\n";
                        baseDesc += "Anderson Manufacturing's orders have dropped 60% in eight weeks. Current revenue run rate: $" + formatNumber(gameState.revenue > 0 ? gameState.revenue * 0.4 : 3000000) + " versus $" + formatNumber(gameState.revenue) + " last year.\n\n";

                        if (gameState.cash > 1500000) {
                            baseDesc += "The company has $" + formatNumber(gameState.cash) + " in cash reserves—enough for maybe 6-8 months at current burn. That's better than most, but this crisis shows no signs of ending quickly.\n\n";
                        } else if (gameState.cash > 500000) {
                            baseDesc += "Cash reserves: $" + formatNumber(gameState.cash) + ". At the current burn rate, that's 3-4 months. Maybe less.\n\n";
                        } else {
                            baseDesc += "Cash reserves: $" + formatNumber(gameState.cash) + ". Dangerously low.\n\n";
                        }

                        if (gameState.hasDebt && gameState.debt > 500000) {
                            baseDesc += "The situation is particularly dire because the company is carrying $" + formatNumber(gameState.debt) + " in debt with monthly payments due regardless of revenue.\n\n";
                        }

                        if (gameState.sarahCEO) {
                            baseDesc += "Sarah (34) is CEO now. This is her crisis to manage. ";
                        } else {
                            baseDesc += "Robert (61) is still CEO. Sarah (34) is COO. ";
                        }

                        baseDesc += "Michael (31) is watching orders evaporate in real-time.\n\n";

                        baseDesc += "The company employs " + (gameState.employees || 45) + " people—many have been here for years, have families, mortgages, children in college.\n\n";

                        // Check if they protected employees in 2009 crisis
                        var crisisEvent = gameState.decisions.find(function(d) { return d.event === 5; });
                        if (crisisEvent && crisisEvent.choice === 2) {
                            baseDesc += "In 2009, during the Great Recession, the Anderson family sacrificed their own salaries to protect every single job. Employees remember. The loyalty is deep. But can the family afford to do it again in a crisis that might last years?\n\n";
                        } else if (crisisEvent && crisisEvent.choice === 1) {
                            baseDesc += "In 2009, the company laid off employees to survive. Some of those same people are working here again, nervously watching history potentially repeat itself.\n\n";
                        }

                        baseDesc += "The PPP loan program offers some relief, but it won't be enough. The choices:\n\n";
                        baseDesc += "1. Lay off 20 employees immediately—preserve cash, ensure survival\n2. Family members take zero salary for 6 months—protect all jobs\n3. Take on $800K debt—maintain full operations, bet on quick recovery\n\n";
                        baseDesc += "This crisis will define what Anderson Manufacturing truly stands for.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Lay off 20 employees immediately to preserve cash",
                            effects: {
                                cash: 300000,
                                marketDemand: -2000000,
                                robertHappiness: -25,
                                sarahHappiness: -20,
                                michaelHappiness: -18,
                                employees: -20,
                                managementQuality: -6
                            },
                            impact: `<h4>Decision Impact</h4><p>The company makes the agonizing decision to lay off nearly half the workforce. <span class='impact-positive'>Cash reserves are protected</span>, ensuring company survival.</p><p><span class='impact-negative'>Market demand crashes</span> as the smaller team can't serve customers.</p><p>The entire Anderson family is traumatized by the decision. <span class='impact-highlight'>Robert, Sarah, and Michael</span> all experience <span class='impact-negative'>sharp decreases in happiness</span>.</p><p>The laid-off employees feel betrayed. Company culture may never fully recover.</p>`
                        },
                        {
                            text: "Family members take zero salary for 6 months, protect all jobs",
                            effects: {
                                robertSalary: 0,
                                sarahSalary: 0,
                                michaelSalary: 0,
                                dividendPolicy: 0.0,
                                cash: 180000,
                                robertHappiness: 10,
                                sarahHappiness: 15,
                                michaelHappiness: 10,
                                jenniferHappiness: -25,
                                managementQuality: 8
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert, Sarah, and Michael agree to forgo all salary and dividends for six months to save every job. <span class='impact-positive'>All employees keep their positions.</span></p><p>The employees are deeply moved. Loyalty and dedication skyrocket. When the economy recovers, the team works harder than ever.</p><p><span class='impact-highlight'>Robert, Sarah, and Michael</span> feel they've lived their values, despite the personal financial hardship.</p><p><span class='impact-highlight'>Jennifer</span> receives no dividends and is <span class='impact-negative'>very unhappy</span>—she's struggling financially and feels the business is always prioritized over her needs.</p>`
                        },
                        {
                            text: "Take on $800K debt, betting on quick recovery",
                            effects: {
                                debt: 800000,
                                cash: 800000,
                                robertHappiness: -15,
                                hasDebt: true,
                                managementQuality: 2
                            },
                            impact: `<h4>Decision Impact</h4><p>The company takes on $800K in debt to maintain operations and staff through the crisis.</p><p><span class='impact-positive'>All employees keep their jobs</span> and the company maintains its capabilities.</p><p>However, <span class='impact-negative'>the company now carries substantial debt</span> in a highly uncertain economic environment.</p><p><span class='impact-highlight'>Robert</span> is stressed and worried. If recovery takes longer than expected, this debt could sink the company.</p>`
                        }
                    ]
                },
                
                // Event 11: 2022 - Robert's Transition
                {
                    date: "2022",
                    title: "Letting Go",
                    description: function() {
                        var baseDesc = "Robert suffered a minor heart attack. He's recovering well, but it's a wake-up call—he's 63 years old.\n\n";
                        baseDesc += "The doctors have advised him to reduce stress and work fewer hours. His wife is insistent that he step back.\n\n";

                        // Check if Sarah was named successor in Event 6
                        var successionEvent = gameState.decisions.find(function(d) { return d.event === 6; });
                        if (successionEvent && successionEvent.choice === 0) {
                            baseDesc += "Years ago, Robert named Sarah as his successor. Now it's time to actually make it happen. But giving up control of what he built is harder than he expected.\n\n";
                            baseDesc += "Sarah is ready. She's been COO for over a decade. But Robert finds himself hesitating—can he really let go?";
                        } else {
                            baseDesc += "The health scare forces the question Robert has been avoiding: succession. Sarah has been COO for over a decade and is clearly ready. Michael has matured but lacks her operational expertise.\n\n";
                            baseDesc += "This crisis makes the decision urgent. Robert can no longer postpone it.";
                        }
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Make Sarah CEO now—Robert transitions to Executive Chairman",
                            effects: {
                                sarahSalary: 200000,  // CEO salary
                                robertSalary: 100000,  // Chairman retainer
                                sarahHappiness: 25,
                                michaelHappiness: -8,
                                robertHappiness: -5,
                                marketDemand: 900000,
                                robertRetired: true,
                                sarahCEO: true,
                                managementQuality: 12
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah becomes CEO immediately at $200K salary. <span class='impact-positive'>Market demand surges</span> as she implements changes she's been planning for years.</p><p><span class='impact-highlight'>Sarah</span> is energized and grateful. <span class='impact-positive'>Her happiness increases dramatically.</span></p><p><span class='impact-highlight'>Robert</span> struggles emotionally with stepping back, even though he knows it's right. He transitions to Chairman role at $100K. He attends board meetings but tries not to second-guess Sarah.</p><p>The transition is healthy for both Robert's health and the business's future.</p>`
                        },
                        {
                            text: "Stay involved as CEO—just work fewer hours",
                            effects: {
                                robertHappiness: 5,
                                sarahHappiness: -18,
                                michaelHappiness: -5,
                                marketDemand: -500000,
                                managementQuality: -8
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert promises to work less but refuses to give up the CEO title.</p><p>In practice, he can't let go. He still tries to control decisions while working part-time. <span class='impact-negative'>The company suffers from unclear leadership</span> and delayed decisions.</p><p><span class='impact-highlight'>Sarah</span> is deeply frustrated. <span class='impact-negative'>Her happiness plummets.</span> After a decade as COO and being clearly ready, she's still not trusted. She starts seriously considering opportunities elsewhere.</p><p>Employees sense the dysfunction. Top talent begins leaving.</p>`
                        }
                    ]
                },
                
                // Event 12: 2024 - Michael's Choice
                {
                    date: "2024",
                    title: "A Brother's Path",
                    description: function() {
                        var baseDesc = "Michael is now 41 years old. ";

                        if (gameState.sarahCEO) {
                            baseDesc += "Sarah has been CEO for two years now, and she's thriving. ";
                        } else {
                            baseDesc += "Sarah is COO and heir apparent. ";
                        }

                        baseDesc += "Michael has spent nearly 17 years in sales at Anderson Manufacturing, bringing in millions in new business.\n\n";
                        baseDesc += "A competitor has made him an attractive offer: VP of Sales at $220K plus equity, with a clear path to eventually becoming their Chief Revenue Officer.\n\n";

                        // Check if compensation conflict was resolved in his favor
                        var compensationEvent = gameState.decisions.find(function(d) { return d.event === 8; });
                        if (compensationEvent && compensationEvent.choice === 0) {
                            baseDesc += "\"You've always valued my contributions,\" Michael tells the family. \"You raised my salary years ago when I asked. But I need to know—is there real growth for me here, or am I always going to be 'the sales guy' while Sarah leads?\"\n\n";
                        } else {
                            baseDesc += "\"I've given 17 years to this company,\" Michael says. \"I love what we've built. But I need to know there's more for me here than just being 'the sales guy' forever.\"\n\n";
                        }

                        baseDesc += "He's not threatening to leave—he genuinely wants to stay. But he needs a real leadership role, not just a VP title.\n\n";
                        baseDesc += "Losing Michael would cost the company 40% of its new business pipeline. But creating a meaningful role for him might complicate Sarah's leadership.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Make Michael President with genuine strategic responsibilities",
                            effects: {
                                michaelSalary: 180000,  // President salary
                                marketDemand: 900000,
                                michaelHappiness: 28,
                                sarahHappiness: -10,
                                managementQuality: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>Michael becomes President at $180K with real responsibilities: business development, market expansion, and strategic partnerships. <span class='impact-positive'>His happiness increases dramatically</span> and he throws himself into the role.</p><p><span class='impact-positive'>Market demand grows substantially</span> as Michael's energy and networks open new opportunities.</p><p><span class='impact-highlight'>Sarah</span> has some initial concerns about sibling dynamics, but she works to build a strong CEO-President partnership. They establish clear boundaries and mutual respect.</p><p>The business benefits from having two committed second-generation leaders.</p>`
                        },
                        {
                            text: "Support Michael in taking the external opportunity",
                            effects: {
                                marketDemand: -1400000,
                                michaelHappiness: -35,
                                robertHappiness: -20,
                                jenniferHappiness: -15,
                                sarahHappiness: -12,
                                michaelLeft: true,
                                michaelOwnership: 0,
                                sarahOwnership: 24,
                                robertOwnership: 66
                            },
                            impact: `<h4>Decision Impact</h4><p>After much discussion, the family agrees that Michael should pursue this opportunity. He sells his 10% stake back to the family for fair value.</p><p><span class='impact-negative'>Market demand drops sharply</span> without Michael's relationships and sales prowess.</p><p><span class='impact-highlight'>Michael</span> is heartbroken despite understanding it's the right choice. <span class='impact-negative'>His happiness plummets.</span> He wanted to stay but needed more than they could offer.</p><p>The entire family grieves the decision. Holiday gatherings are strained. The family business has cost them family unity.</p>`
                        }
                    ]
                },
                
                // Event 13: 2026 - The Acquisition Offer
                {
                    date: "2026",
                    title: "The Temptation",
                    description: function() {
                        var offerAmount = gameState.revenue > 10000000 ? 35 : 28;
                        var baseDesc = "A private equity firm has made an unsolicited offer: $" + offerAmount + "M for Anderson Manufacturing.\n\n";

                        if (gameState.hasDebt && gameState.debt > 1000000) {
                            baseDesc += "Given the company's $" + formatNumber(gameState.debt) + " in debt, this offer is particularly attractive. It would clear all obligations and leave the family wealthy.\n\n";
                        }

                        baseDesc += "This values the company at far more than its current worth. The offer would give:\n";

                        if (gameState.michaelLeft) {
                            baseDesc += "- Robert: $" + (offerAmount * 0.7).toFixed(1) + "M for his 70%\n";
                            baseDesc += "- Sarah: $" + (offerAmount * 0.2).toFixed(1) + "M for her 20%\n";
                            baseDesc += "- Jennifer: $" + (offerAmount * 0.1).toFixed(1) + "M for her 10%\n\n";
                            baseDesc += "Michael left the business. The remaining family wonders what he would think of this offer.\n\n";
                        } else {
                            var robertPct = familyMembers.robert.ownership;
                            var sarahPct = familyMembers.sarah.ownership;
                            var michaelPct = familyMembers.michael.ownership;
                            var jenniferPct = familyMembers.jennifer.ownership;
                            baseDesc += "- Robert: $" + (offerAmount * robertPct / 100).toFixed(1) + "M for his " + robertPct + "%\n";
                            baseDesc += "- Sarah: $" + (offerAmount * sarahPct / 100).toFixed(1) + "M for her " + sarahPct + "%\n";
                            baseDesc += "- Michael: $" + (offerAmount * michaelPct / 100).toFixed(1) + "M for his " + michaelPct + "%\n";
                            baseDesc += "- Jennifer: $" + (offerAmount * jenniferPct / 100).toFixed(1) + "M for her " + jenniferPct + "%\n\n";
                        }

                        baseDesc += "The family could keep 30% ownership and stay in management, but the PE firm would control decisions.\n\nThis is life-changing money, especially for Jennifer. But it would end " + (gameState.year - 1994) + " years of independence.\n\n";
                        baseDesc += "Robert built this. Sarah now runs it. Does the family sell?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept the $28M acquisition offer",
                            effects: {
                                cash: 28000000,
                                robertOwnership: 21,
                                sarahOwnership: 5,
                                jenniferOwnership: 3,
                                robertHappiness: -15,
                                sarahHappiness: -20,
                                jenniferHappiness: 30,
                                michaelHappiness: 10
                            },
                            impact: `<h4>Decision Impact</h4><p>The family accepts the offer. Everyone becomes wealthy overnight.</p><p><span class='impact-highlight'>Jennifer</span> is thrilled—<span class='impact-positive'>she receives nearly $3M</span> and can finally live comfortably.</p><p><span class='impact-highlight'>Robert and Sarah</span> are conflicted. They have the money, but <span class='impact-negative'>they've given up the family legacy</span>. Their happiness decreases despite the wealth.</p><p>The PE firm immediately implements aggressive changes. The company Sarah built starts to feel foreign.</p>`
                        },
                        {
                            text: "Decline—keep Anderson Manufacturing family-owned",
                            effects: {
                                robertHappiness: 15,
                                sarahHappiness: 15,
                                jenniferHappiness: -30
                            },
                            impact: `<h4>Decision Impact</h4><p>The family chooses legacy over liquidity.</p><p><span class='impact-highlight'>Robert and Sarah</span> feel proud of maintaining independence and continuing the family business into its second generation.</p><p><span class='impact-highlight'>Jennifer</span> is devastated. <span class='impact-negative'>Her happiness plummets</span>—she watched nearly $3M disappear. She's still struggling financially while her siblings run a company she doesn't work for.</p><p>The decision creates a lasting rift. Jennifer feels her needs are always subordinated to the business.</p>`
                        }
                    ]
                },
                
                // Event 14: 2028 - Quality Crisis
                {
                    date: "2028",
                    title: "The Quality Crisis",
                    description: function() {
                        var baseDesc = "A major aerospace client has discovered defects in Anderson Manufacturing's delivered components. The problem affects $2.5M worth of goods already in the field.\n\n";
                        baseDesc += "The client is threatening to terminate their contract (worth $" + formatNumber(Math.max(3000000, gameState.revenue * 0.3)) + " annually) and sue for damages. Word is spreading in the industry. Anderson's reputation is at stake.\n\n";

                        // Check if they accepted the major growth contract in Event 7
                        var growthEvent = gameState.decisions.find(function(d) { return d.event === 7; });
                        if (growthEvent && growthEvent.choice === 0) {
                            baseDesc += "Sarah's investigation reveals the root cause: when the company took that major contract years ago and scaled rapidly, quality control protocols were quietly relaxed. The team was stretched too thin and supervisors looked the other way.\n\n";
                        } else if (gameState.hasDebt && gameState.debt > 1000000) {
                            baseDesc += "Sarah's investigation reveals the problem: under pressure from $" + formatNumber(gameState.debt) + " in debt obligations, production managers cut corners on inspections to reduce costs and speed throughput.\n\n";
                        } else {
                            baseDesc += "Sarah's investigation reveals the root cause: pressure to meet growth targets led to quality inspections being rushed. No single decision caused it—a culture of 'good enough' crept in gradually.\n\n";
                        }

                        baseDesc += "Sarah presents three options:\n\n";
                        baseDesc += "1. Accept full responsibility—recall everything, rebuild quality systems ($1.8M cost)\n2. Settle quietly to minimize liability and move on ($600K cost)\n\n";
                        baseDesc += "The first option is expensive and painful. The second protects cash but compromises integrity.\n\n";
                        baseDesc += "How the Anderson family responds will define who they are.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept full responsibility and bear the cost ($1.8M)",
                            effects: {
                                cash: -1800000,
                                marketDemand: 1000000,
                                assets: 500000,
                                sarahHappiness: 10,
                                robertHappiness: 15,
                                managementQuality: 7
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah announces full responsibility. <span class='impact-negative'>The company takes a $1.8M hit</span> for recalls and rebuilding quality systems.</p><p>The client is impressed by the integrity. <span class='impact-positive'>They not only maintain the contract but increase it.</span></p><p><span class='impact-highlight'>Sarah and Robert</span> feel they've upheld the company's values, despite the painful cost.</p><p>Employee morale and culture strengthen. The team sees leadership that prioritizes doing the right thing over short-term profits.</p>`
                        },
                        {
                            text: "Minimize liability and settle quietly ($600K)",
                            effects: {
                                cash: -600000,
                                marketDemand: -800000,
                                sarahHappiness: -15,
                                robertHappiness: -20,
                                hasQualityIssues: true,
                                managementQuality: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>The company settles quietly for $600K and moves on quickly.</p><p>The client accepts the settlement but doesn't renew the contract. <span class='impact-negative'>Revenue decreases as they take their business elsewhere.</span></p><p><span class='impact-highlight'>Sarah and Robert</span> both feel they've compromised their values. <span class='impact-negative'>Their happiness decreases</span> as they've chosen financial protection over doing the right thing.</p><p>Some employees lose respect for leadership. The culture begins to shift.</p>`
                        }
                    ]
                },
                
                // Event 15: 2030 - Digital Transformation
                {
                    date: "2030",
                    title: "The Digital Imperative",
                    description: function() {
                        var baseDesc = "Anderson Manufacturing is now 36 years old. ";
                        if (gameState.sarahCEO) {
                            baseDesc += "Sarah has been CEO for eight years and the business is generating $" + formatNumber(gameState.revenue > 0 ? gameState.revenue : 12000000) + " annually.\n\n";
                        } else {
                            baseDesc += "The business is generating $" + formatNumber(gameState.revenue > 0 ? gameState.revenue : 10000000) + " annually.\n\n";
                        }

                        baseDesc += "But the industry is changing rapidly. Competitors are implementing AI-driven supply chains, automated quality systems, and digital customer portals. Anderson's systems are still largely paper-based and manual.\n\n";
                        baseDesc += "Sarah has commissioned a digital transformation study. The recommendation: invest $1.2M over two years in cloud ERP, automated quality control, and digital customer systems.\n\n";

                        if (gameState.hasDebt && gameState.debt > 1000000) {
                            baseDesc += "The company is carrying $" + formatNumber(gameState.debt) + " in debt, making this large investment particularly challenging.\n\n";
                        }

                        baseDesc += "The investment would modernize operations and position Anderson for the future. But it's expensive, disruptive, and some longtime employees are resistant to change.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Invest $1.2M in comprehensive digital transformation",
                            effects: {
                                cash: -1200000,
                                debt: 800000,
                                marketDemand: 1800000,
                                assets: 1200000,
                                sarahHappiness: 15,
                                managementQuality: 18,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Anderson Manufacturing takes on $800K in additional debt to fund a comprehensive digital transformation.</p><p>The first year is chaotic—system migrations, employee training, workflow disruptions. But by year two, <span class='impact-positive'>revenue and profit surge</span> as efficiency multiplies.</p><p><span class='impact-positive'>Management quality improves dramatically.</span> The company can now serve customers faster, make data-driven decisions, and compete with larger manufacturers.</p><p><span class='impact-highlight'>Sarah</span> is energized. Anderson Manufacturing is positioned for the next 30 years.</p>`
                        },
                        {
                            text: "Implement selective improvements—upgrade gradually ($300K)",
                            effects: {
                                cash: -300000,
                                marketDemand: 400000,
                                sarahHappiness: -8,
                                managementQuality: 4
                            },
                            impact: `<h4>Decision Impact</h4><p>The company invests $300K in selective technology upgrades—a new CRM system and basic automation in quality control.</p><p><span class='impact-positive'>Revenue and profit increase modestly</span> from the improvements. The changes are less disruptive and employees adapt more easily.</p><p>However, <span class='impact-highlight'>Sarah</span> worries they're falling behind. Competitors who invested more aggressively are pulling ahead in capabilities and market share.</p><p>The incremental approach feels safe but may not be enough in a rapidly digitizing industry.</p>`
                        }
                    ]
                },
                
                // Event 16: 2032 - Jennifer's Request
                {
                    date: "2032",
                    title: "A Sister's Need",
                    description: function() {
                        var jenniferOwnership = familyMembers.jennifer.ownership || 10;
                        var companyValue = gameState.revenue * 3; // Rough 3x revenue valuation
                        var buyoutAmount = Math.round((companyValue * jenniferOwnership / 100) / 100000) * 100000; // Round to nearest 100K

                        var baseDesc = "Jennifer asks the family for a private meeting. She's now 40, still teaching, and she has something difficult to say.\n\n";
                        baseDesc += "\"I've been a shareholder for decades,\" she begins carefully. \"I own " + jenniferOwnership + "% of Anderson Manufacturing. But I don't work here, I rarely see dividends because everything gets reinvested, and I need capital.\"\n\n";
                        baseDesc += "She wants the company to buy out her stake. Based on current revenue of $" + formatNumber(gameState.revenue) + " and industry valuations, her " + jenniferOwnership + "% is worth roughly $" + formatNumber(buyoutAmount) + ".\n\n";

                        if (gameState.cash > buyoutAmount) {
                            baseDesc += "The company has $" + formatNumber(gameState.cash) + " in cash reserves—technically enough to cover it, but it would deplete resources needed for operations.\n\n";
                        } else {
                            baseDesc += "The company has $" + formatNumber(gameState.cash) + " in cash—not enough to cover the buyout. They'd need to take on significant debt.\n\n";
                        }

                        baseDesc += "\"I want to buy a house. Secure my retirement. I've waited long enough.\"\n\n";
                        baseDesc += "She has a point. She's been a loyal, patient shareholder who has rarely benefited. But buying her out will be expensive and concentrate ownership even further.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Buy out Jennifer's 10% for $3M",
                            effects: {
                                cash: -3000000,
                                debt: 2000000,
                                jenniferOwnership: 0,
                                robertOwnership: 75,
                                sarahOwnership: 25,
                                jenniferHappiness: 25,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>The family borrows $2M and uses $1M in cash to buy out Jennifer's stake.</p><p><span class='impact-highlight'>Jennifer</span> receives $3M and is grateful. <span class='impact-positive'>Her happiness increases significantly</span>—she can finally buy a home and build financial security.</p><p>Ownership is now split 75% Robert, 25% Sarah. <span class='impact-negative'>The company carries $2M in new debt.</span></p><p>Jennifer remains part of the family but is no longer a shareholder. Her connection to the business fades.</p>`
                        },
                        {
                            text: "Ask Jennifer to hold her shares—offer increased dividends instead",
                            effects: {
                                dividendPolicy: 0.5,
                                jenniferHappiness: -20
                            },
                            impact: `<h4>Decision Impact</h4><p>The family asks Jennifer to keep her ownership and commits to paying consistent dividends going forward.</p><p><span class='impact-highlight'>Jennifer</span> is disappointed and hurt. <span class='impact-negative'>Her happiness decreases substantially</span>—the family won't help when she needs it most.</p><p>She feels trapped as a passive shareholder in a business she doesn't control, unable to access the value of her shares.</p><p>Family relationships become strained. Sunday dinners are tense.</p>`
                        }
                    ]
                },
                
                // Event 17: 2034 - Robert's Death
                {
                    date: "2034",
                    title: "The Founder's Passing",
                    description: function() {
                        var companyValue = gameState.revenue * 3;
                        var baseDesc = "Robert Anderson passed away peacefully at age 75.\n\n";
                        baseDesc += "The man who started with $50,000 in 1994 built a company now generating $" + formatNumber(gameState.revenue) + " annually, worth approximately $" + formatNumber(companyValue) + ".\n\n";
                        baseDesc += "His funeral draws hundreds—employees past and present, clients, suppliers, even competitors. The eulogies speak of his integrity, his loyalty to employees, his handshake deals that he always honored.\n\n";

                        if (gameState.sarahCEO) {
                            baseDesc += "Sarah has been CEO for over a decade. She's ready to lead the company forward. But losing her father—her mentor, her biggest supporter—leaves a hole nothing can fill.\n\n";
                        } else {
                            baseDesc += "Robert never fully let go of the CEO role. His death leaves Sarah to step into leadership under the weight of grief.\n\n";
                        }

                        if (gameState.michaelLeft) {
                            baseDesc += "Michael left the business years ago. He's at the funeral, of course, grieving his father. But the distance between him and the family business feels permanent now.\n\n";
                        } else {
                            baseDesc += "Michael stands beside Sarah at the funeral. Whatever their differences, they both lost their father. The business he built is now theirs to steward.\n\n";
                        }

                        baseDesc += "Robert's will transfers his ownership to his children. Now the family must decide: honor Robert's conservative approach, or modernize for the future?";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Maintain Robert's vision and conservative approach",
                            effects: {
                                sarahOwnership: 70,
                                michaelOwnership: 30,
                                sarahHappiness: 5,
                                robertHappiness: 0,
                                robertDeceased: true,
                                marketDemand: -300000
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah commits to maintaining Robert's conservative, values-driven approach to the business.</p><p>The company continues steadily, but <span class='impact-negative'>growth slows</span> as opportunities are passed up to stay true to the founder's vision.</p><p>Some employees appreciate the continuity. Others feel the company is stuck in the past.</p><p>Sarah receives 70% ownership and Michael receives 30%.</p>`
                        },
                        {
                            text: "Honor his values but modernize the strategy",
                            effects: {
                                sarahOwnership: 70,
                                michaelOwnership: 30,
                                sarahHappiness: 15,
                                robertHappiness: 0,
                                robertDeceased: true,
                                marketDemand: 1200000,
                                assets: 800000
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah decides to honor Robert's core values—integrity, employee welfare, quality—while modernizing strategy for the next generation.</p><p><span class='impact-positive'>Revenue, profit, and valuation all increase</span> as Sarah implements changes she's been planning.</p><p>The company evolves while maintaining its soul. Employees embrace the changes.</p><p>Sarah receives 70% ownership and Michael receives 30%. The business enters its third decade under new leadership.</p>`
                        }
                    ]
                },
                
                // Event 18: 2036 - The Third Generation
                {
                    date: "2036",
                    title: "A New Generation Knocks",
                    description: function() {
                        var baseDesc = "Sarah's daughter Emily is 22, fresh out of MIT with an engineering degree. She's brilliant, driven, and wants to join Anderson Manufacturing.\n\n";

                        if (!gameState.michaelLeft) {
                            baseDesc += "Michael's son David is 20, finishing business school. He's got his father's charisma and is already networking with potential clients.\n\n";
                        }

                        baseDesc += "This is the moment Sarah both anticipated and dreaded. Bringing the third generation into the business.\n\n";

                        if (gameState.sarahCEO) {
                            baseDesc += "As CEO, Sarah has the authority to make this decision. But it's complicated when it's her own daughter.\n\n";
                        }

                        baseDesc += "Emily grew up watching her mother build this company. She knows the products, the clients, the challenges. But she has zero work experience outside of summer internships.\n\n";
                        baseDesc += "Some advisors recommend that family members work elsewhere for 3-5 years first—learn in someone else's business, make mistakes on someone else's dime, prove themselves independently.\n\n";
                        baseDesc += "But Emily is ready now, and making her wait feels arbitrary. The third generation represents the future of Anderson Manufacturing.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Hire Emily now—she's ready and the business needs young talent",
                            effects: {
                                marketDemand: 700000,
                                sarahHappiness: 18,
                                michaelHappiness: 5,
                                hasGen3: true,
                                managementQuality: 6
                            },
                            impact: `<h4>Decision Impact</h4><p>Emily joins Anderson Manufacturing as a junior engineer at $65K. She's energetic, tech-savvy, and eager to modernize operations.</p><p><span class='impact-positive'>Revenue increases</span> as Emily brings fresh ideas and quickly becomes productive. Her MIT education and digital fluency help the company adopt new technologies.</p><p><span class='impact-highlight'>Sarah</span> is proud to work alongside her daughter. Watching Emily contribute to the business Robert started is deeply meaningful.</p><p>Some longtime employees are skeptical—did she earn this, or is it nepotism? Emily will need to prove herself.</p>`
                        },
                        {
                            text: "Require 3-5 years external experience first—avoid nepotism concerns",
                            effects: {
                                sarahHappiness: 8,
                                michaelHappiness: 8,
                                managementQuality: 2
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah makes the hard decision: Emily must work elsewhere for 3-5 years before joining the family business.</p><p>Emily is disappointed but understands. She joins a leading aerospace manufacturer. The experience will be invaluable.</p><p>The policy sends a clear message: Anderson Manufacturing values competence over family connections. Employees respect the decision.</p><p>However, five years is a long time. Emily might build a career elsewhere and never return. Sarah wonders if she made the right choice.</p>`
                        }
                    ]
                },
                
                // Event 19: 2040 - Major Strategic Decision
                {
                    date: "2040",
                    title: "The Crossroads",
                    description: function() {
                        var baseDesc = "Anderson Manufacturing is 46 years old. Current revenue: $" + formatNumber(gameState.revenue) + " annually with " + gameState.employees + " employees. ";

                        if (gameState.revenue > 18000000 && gameState.profit > 2000000) {
                            baseDesc += "The company is thriving—one of the most successful family businesses in the region. Robert would be incredibly proud.\n\n";
                        } else if (gameState.revenue < 8000000) {
                            baseDesc += "The company has survived for nearly five decades but never quite achieved the scale Robert once envisioned.\n\n";
                        } else {
                            baseDesc += "The company is solid and profitable—a respectable mid-market manufacturer.\n\n";
                        }

                        if (gameState.sarahCEO) {
                            baseDesc += "Sarah (54) has been CEO for 18 years. She's built a strong company. But she also sees the threats on the horizon.\n\n";
                        }

                        baseDesc += "The manufacturing industry is being transformed by automation, AI, and global competition. Companies that don't modernize are being left behind. The next 10 years will separate winners from losers.\n\n";

                        // Reference financial position
                        if (gameState.hasDebt && gameState.debt > 2000000) {
                            baseDesc += "The company carries $" + formatNumber(gameState.debt) + " in debt. Taking on more is risky but may be necessary.\n\n";
                        } else if (gameState.cash > 5000000) {
                            baseDesc += "Strong cash reserves of $" + formatNumber(gameState.cash) + " provide flexibility for major investments.\n\n";
                        } else {
                            baseDesc += "Cash reserves of $" + formatNumber(gameState.cash) + " are adequate but not abundant. Major investments will require debt.\n\n";
                        }

                        baseDesc += "Sarah has commissioned studies and identified three strategic paths:\n\n";
                        baseDesc += "1. Invest $5M in cutting-edge automation and AI (modernize aggressively)\n2. Acquire a struggling competitor for $4M (consolidate market share)\n3. Stay the current course (organic growth, avoid risk)\n\n";

                        if (gameState.hasGen3) {
                            baseDesc += "Emily (26), now a rising leader, strongly advocates for option 1. \"We need to modernize or we'll be irrelevant in 10 years,\" she argues.\n\n";
                        }

                        baseDesc += "Some longtime employees worry about automation eliminating jobs. Acquisitions bring cultural integration challenges.\n\n";
                        baseDesc += "This decision will define Anderson Manufacturing's final decade as a family business.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Invest $5M in automation and AI",
                            effects: {
                                cash: -5000000,
                                debt: 3000000,
                                marketDemand: 5000000,
                                assets: 5000000,
                                sarahHappiness: 10,
                                hasDebt: true,
                                managementQuality: 15
                            },
                            impact: `<h4>Decision Impact</h4><p>Anderson Manufacturing takes on $3M debt and invests heavily in cutting-edge technology.</p><p>The transition is painful. Some long-time employees are displaced. But <span class='impact-positive'>revenue and profit surge</span> as efficiency multiplies.</p><p><span class='impact-positive'>Company valuation increases dramatically.</span> Anderson Manufacturing is now positioned for the future.</p><p>Emily and David, the third generation, are instrumental in the transformation. The company is ready for its next 50 years.</p>`
                        },
                        {
                            text: "Acquire competitor for $4M",
                            effects: {
                                cash: -4000000,
                                debt: 2500000,
                                marketDemand: 4500000,
                                assets: 3500000,
                                sarahHappiness: 5,
                                hasDebt: true,
                                managementQuality: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>The company acquires a competitor, doubling in size overnight.</p><p><span class='impact-positive'>Revenue and profit increase substantially</span>, but integrating two company cultures proves challenging.</p><p>The acquisition brings new clients but also new problems. Growth through acquisition is messier than Sarah expected.</p><p>Still, Anderson Manufacturing is now a major regional player. <span class='impact-positive'>Valuation increases significantly.</span></p>`
                        },
                        {
                            text: "Stay the course—gradual, organic growth",
                            effects: {
                                marketDemand: 500000,
                                sarahHappiness: -10,
                                managementQuality: -3
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah chooses the conservative path, avoiding risk and debt.</p><p>The company continues to grow modestly. <span class='impact-positive'>Employees appreciate the stability</span> and lack of disruption.</p><p>But <span class='impact-highlight'>Sarah</span> worries they're being left behind. Competitors are modernizing. Anderson Manufacturing feels increasingly dated.</p><p>Emily and David are frustrated by the cautious approach. They wonder if the family business will survive their generation.</p>`
                        }
                    ]
                },
                
                // Event 20: 2044 - Final Decision
                {
                    date: "2044",
                    title: "Fifty Years",
                    description: function() {
                        var baseDesc = "Fifty years. Half a century since Robert Anderson walked away from his $65K engineering job to build something of his own.\n\n";

                        baseDesc += "Anderson Manufacturing now generates $" + formatNumber(gameState.revenue) + " in annual revenue, employs " + gameState.employees + " people, and has impacted hundreds of lives—employees, their families, customers, the community.\n\n";

                        if (!gameState.robertDeceased) {
                            baseDesc += "Robert is 85 now, frail but still sharp. He still comes to the office some days, walking slowly through the facility, talking to employees he's known for decades.\n\n";
                        } else {
                            baseDesc += "Robert passed away a decade ago. But his presence is everywhere—in the company culture, in the values that guide decisions, in the way employees are treated.\n\n";
                        }

                        if (gameState.sarahCEO) {
                            baseDesc += "Sarah is 58, now in her ";
                            var yearsAsCEO = 2044 - 2022;
                            if (gameState.decisions.find(function(d) { return d.event === 11 && d.choice === 0; })) {
                                yearsAsCEO = 22;
                            }
                            baseDesc += yearsAsCEO + "th year as CEO. ";
                        } else {
                            baseDesc += "Sarah is 58, having led operations for decades. ";
                        }

                        if (gameState.hasGen3) {
                            baseDesc += "Emily (30) has proven herself and is being groomed for CEO. The third generation is ready.\n\n";
                        } else {
                            baseDesc += "The question of third-generation leadership remains unresolved.\n\n";
                        }

                        // Offer amount varies based on company performance
                        var offerAmount = 45;
                        if (gameState.revenue > 20000000) {
                            offerAmount = 65;
                        } else if (gameState.revenue > 15000000) {
                            offerAmount = 50;
                        } else if (gameState.revenue < 10000000) {
                            offerAmount = 28;
                        }

                        baseDesc += "A private equity firm has made an acquisition offer: $" + offerAmount + "M in cash.\n\n";

                        // Reference if they declined a previous offer
                        var prevOffer = gameState.decisions.find(function(d) { return d.event === 13; });
                        if (prevOffer && prevOffer.choice === 1) {
                            baseDesc += "The family declined an offer years ago. This new offer is ";
                            if (offerAmount >= 45) {
                                baseDesc += "substantially higher—holding on has paid off financially.\n\n";
                            } else {
                                baseDesc += "only marginally better. Some wonder if they should have sold when they had the chance.\n\n";
                            }
                        }

                        if (gameState.michaelLeft) {
                            baseDesc += "Michael left the business in 2024. Twenty years later, he's successful in his own right, but the family rift never fully healed.\n\n";
                        } else {
                            baseDesc += "Michael is 61, still active in the business, proud of what he and Sarah have built together.\n\n";
                        }

                        baseDesc += "The question Sarah faces: cash out and secure generational wealth for the Anderson family? Or continue the legacy and hand Anderson Manufacturing to Emily and the third generation?\n\n";
                        baseDesc += "Fifty years of decisions have led to this moment.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept the acquisition offer—take the money",
                            effects: {
                                cash: 50000000,
                                sarahHappiness: -8,
                                michaelHappiness: 15
                            },
                            impact: function() {
                                var offerAmount = 45;
                                if (gameState.revenue > 20000000) offerAmount = 65;
                                else if (gameState.revenue > 15000000) offerAmount = 50;
                                else if (gameState.revenue < 10000000) offerAmount = 28;

                                var impact = "<h4>Decision Impact</h4><p>The Anderson family accepts the $" + offerAmount + "M offer.</p>";
                                impact += "<p>After 50 years, Anderson Manufacturing is sold. The family is set for generations.</p>";
                                impact += "<p><span class='impact-highlight'>Sarah</span> has complicated feelings. Pride in building a company worth this much. Sadness that the family legacy ends here.</p>";

                                if (gameState.hasGen3) {
                                    impact += "<p>Emily is disappointed—she wanted to lead Anderson Manufacturing into its next chapter. But $" + offerAmount + "M is life-changing wealth.</p>";
                                }

                                if (gameState.michaelLeft) {
                                    impact += "<p><span class='impact-highlight'>Michael</span> receives his share and finally feels validated. Leaving was painful, but it worked out.</p>";
                                }

                                impact += "<p>Robert's $50,000 and a dream in 1994 became $" + offerAmount + "M in 2044. The family business achieved its ultimate goal: transforming the Anderson family's future.</p>";
                                return impact;
                            }
                        },
                        {
                            text: "Keep the business—transition to Emily and the third generation",
                            effects: {
                                sarahHappiness: 22,
                                marketDemand: 2500000,
                                managementQuality: 10
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah declines the offer and announces Emily will become CEO within three years.</p><p>The third generation takes the helm. <span class='impact-positive'>Revenue and profit surge</span> as Emily and her generation bring digital fluency, new networks, and fresh perspectives.</p><p><span class='impact-highlight'>Sarah</span> transitions to Executive Chairman, feeling profound pride. She gets to watch her daughter lead the company her grandfather started.</p><p>Anderson Manufacturing enters its second half-century as a family business. Robert's dream doesn't just survive—it thrives.</p><p>Fifty years from now, in 2094, Emily's children might face this same decision. But today, the family chooses legacy over liquidity.</p>`
                        }
                    ]
                }

];

// ============================================================================
// TRIGGERED EVENTS
// These events are dynamically inserted based on game state conditions
// ============================================================================

const TRIGGERED_EVENTS = {

    // Triggered when 2+ family members are unhappy about declining income
    dividendDispute: {
        title: "Family Income Crisis",
        description: function() {
            var unhappyMembers = [];

            Object.keys(familyMembers).forEach(function(key) {
                var member = familyMembers[key];
                if (member.unhappyAboutIncome && member.ownership > 0) {
                    unhappyMembers.push(member.name);
                }
            });

            var baseDesc = "Tensions are rising in the Anderson family. ";

            if (unhappyMembers.length >= 2) {
                baseDesc += unhappyMembers.slice(0, -1).join(", ") + " and " + unhappyMembers[unhappyMembers.length - 1];
                baseDesc += " are all unhappy about their declining income from the business.\n\n";
            } else if (unhappyMembers.length === 1) {
                baseDesc += unhappyMembers[0] + " is upset about declining income from the business.\n\n";
            }

            baseDesc += "For years, the family has grown accustomed to a certain lifestyle supported by the business. But recent decisions to reinvest profits have meant smaller dividend payments.\n\n";

            baseDesc += "Current dividend policy pays out " + Math.round(gameState.dividendPolicy * 100) + "% of profits as dividends. ";
            baseDesc += "Last year's dividends: $" + formatNumber(gameState.dividendsPaid) + " total.\n\n";

            var totalOwnership = 0;
            Object.keys(familyMembers).forEach(function(key) {
                if (familyMembers[key].ownership > 0 && !familyMembers[key].deceased) {
                    totalOwnership += familyMembers[key].ownership;
                }
            });

            baseDesc += "The unhappy family members are demanding a meeting to discuss dividend policy. They argue they've sacrificed enough and deserve to benefit from their ownership.\n\n";
            baseDesc += "But increasing dividends means less cash for reinvestment, which could limit growth and put the company at a competitive disadvantage.\n\n";
            baseDesc += "How should the family resolve this dispute?";

            return baseDesc;
        },
        options: [
            {
                text: "Increase dividend payout to 60% of profits",
                effects: {
                    dividendPolicy: 0.60,
                    robertHappiness: 8,
                    sarahHappiness: -12,
                    michaelHappiness: 12,
                    jenniferHappiness: 20,
                    managementQuality: -5
                },
                impact: `<h4>Decision Impact</h4><p>The family agrees to increase dividends to 60% of profits, significantly boosting family income.</p><p>Unhappy family members are relieved. <span class='impact-positive'>Jennifer and Michael's happiness increases</span> as they finally see better returns on their ownership.</p><p>However, <span class='impact-highlight'>Sarah</span> worries about the company's growth prospects. <span class='impact-negative'>Less retained earnings means slower expansion</span> and potentially falling behind competitors.</p><p><span class='impact-negative'>Management quality decreases</span> as the company can't invest as much in training, systems, and talent.</p><p>The family has chosen short-term income over long-term growth.</p>`
            },
            {
                text: "Compromise at 40% dividend payout",
                effects: {
                    dividendPolicy: 0.40,
                    robertHappiness: 3,
                    sarahHappiness: -5,
                    michaelHappiness: 5,
                    jenniferHappiness: 8,
                    managementQuality: -2
                },
                impact: `<h4>Decision Impact</h4><p>The family reaches a compromise: 40% of profits will go to dividends, balancing family needs with business reinvestment.</p><p>No one is thrilled, but everyone can live with it. <span class='impact-positive'>Passive shareholders get more income</span>, while the business still retains enough to grow.</p><p>Sarah accepts the compromise but remains concerned about competitive pressures. The company will need to be more selective about which growth opportunities to pursue.</p><p>The dispute is resolved, but the tension between family income and business growth remains.</p>`
            },
            {
                text: "Maintain current policy—emphasize long-term value",
                effects: {
                    robertHappiness: -5,
                    sarahHappiness: 10,
                    michaelHappiness: -15,
                    jenniferHappiness: -25,
                    managementQuality: 3
                },
                impact: `<h4>Decision Impact</h4><p>Sarah argues forcefully that the current dividend policy is right for the business's long-term health. The active leadership refuses to change course.</p><p><span class='impact-highlight'>Passive shareholders</span> are furious. <span class='impact-negative'>Jennifer and Michael's happiness plummets</span>—they feel their needs are being ignored by those who control the company.</p><p>However, <span class='impact-positive'>the business maintains strong reinvestment</span>, allowing continued growth and modernization.</p><p>Family relationships suffer. The rift between active management and passive shareholders deepens. Some wonder how long this can continue.</p>`
            }
        ]
    },

    // Triggered when lost sales exceed 25% of revenue (capacity constraint)
    reinvestmentOpportunity: {
        title: "Growth Constrained",
        description: function() {
            var lostSalesPercent = Math.round((gameState.lostSales / gameState.marketDemand) * 100);
            var lostSalesAmount = gameState.lostSales;

            var baseDesc = "Anderson Manufacturing is leaving money on the table.\n\n";

            baseDesc += "Current situation:\n";
            baseDesc += "- Market demand: $" + formatNumber(gameState.marketDemand) + "\n";
            baseDesc += "- Actual revenue: $" + formatNumber(gameState.revenue) + "\n";
            baseDesc += "- Lost sales (unmet demand): $" + formatNumber(lostSalesAmount) + " (" + lostSalesPercent + "%)\n\n";

            baseDesc += "The company is turning away customers. Demand exceeds capacity. The sales team is frustrated—they could be selling significantly more if the company could produce more.\n\n";

            if (gameState.sarahCEO) {
                baseDesc += "Sarah presents the analysis: the business needs approximately $" + formatNumber(Math.round(lostSalesAmount * 0.6 / 100000) * 100000) + " in additional assets ";
            } else {
                baseDesc += "Robert reviews the numbers: the business needs approximately $" + formatNumber(Math.round(lostSalesAmount * 0.6 / 100000) * 100000) + " in additional assets ";
            }

            baseDesc += "(equipment, facilities, inventory) to meet current demand.\n\n";

            var investmentAmount = Math.round(lostSalesAmount * 0.6 / 100000) * 100000;

            if (gameState.cash > investmentAmount) {
                baseDesc += "The company has $" + formatNumber(gameState.cash) + " in cash reserves—enough to fund the expansion from internal resources.\n\n";
            } else if (gameState.cash > investmentAmount * 0.4) {
                baseDesc += "The company has $" + formatNumber(gameState.cash) + " in cash. They could fund part of the investment internally and take on debt for the rest.\n\n";
            } else {
                baseDesc += "The company has $" + formatNumber(gameState.cash) + " in cash—not enough to fund the expansion. They would need significant debt.\n\n";
            }

            baseDesc += "Investing now would capture the market opportunity and increase revenue substantially. But it also means committing capital and possibly taking on debt.\n\n";
            baseDesc += "What should the company do?";

            return baseDesc;
        },
        options: [
            {
                text: function() {
                    var investmentAmount = Math.round(gameState.lostSales * 0.6 / 100000) * 100000;
                    return "Invest aggressively—capture the full market opportunity ($" + formatNumber(investmentAmount) + ")";
                },
                effects: function() {
                    var investmentAmount = Math.round(gameState.lostSales * 0.6 / 100000) * 100000;
                    var debtNeeded = Math.max(0, investmentAmount - gameState.cash * 0.8);

                    return {
                        cash: -Math.min(gameState.cash * 0.8, investmentAmount),
                        assets: investmentAmount,
                        debt: debtNeeded,
                        marketDemand: gameState.lostSales * 0.3,
                        sarahHappiness: 15,
                        robertHappiness: 8,
                        hasDebt: debtNeeded > 0,
                        managementQuality: 8
                    };
                },
                impact: `<h4>Decision Impact</h4><p>The company commits to a major expansion to meet market demand.</p><p><span class='impact-positive'>Assets increase significantly</span>, allowing the company to capture previously lost sales. Revenue surges as capacity constraints are eliminated.</p><p><span class='impact-highlight'>Sarah</span> is energized by the growth. The aggressive investment demonstrates confidence in the business's future.</p><p>Some passive shareholders worry about the debt load, but the market opportunity is undeniable. The company is positioned to dominate its market segment.</p>`
            },
            {
                text: function() {
                    var investmentAmount = Math.round(gameState.lostSales * 0.35 / 100000) * 100000;
                    return "Invest conservatively—gradual expansion ($" + formatNumber(investmentAmount) + ")";
                },
                effects: function() {
                    var investmentAmount = Math.round(gameState.lostSales * 0.35 / 100000) * 100000;
                    var debtNeeded = Math.max(0, investmentAmount - gameState.cash * 0.5);

                    return {
                        cash: -Math.min(gameState.cash * 0.5, investmentAmount),
                        assets: investmentAmount,
                        debt: debtNeeded,
                        marketDemand: gameState.lostSales * 0.15,
                        sarahHappiness: 3,
                        robertHappiness: 5,
                        hasDebt: debtNeeded > 0,
                        managementQuality: 3
                    };
                },
                impact: `<h4>Decision Impact</h4><p>The company invests conservatively, expanding capacity gradually to reduce risk.</p><p><span class='impact-positive'>Revenue increases modestly</span> as some of the lost sales are captured. The conservative approach limits debt and preserves flexibility.</p><p>However, the company still can't meet full market demand. Competitors may step in to serve customers Anderson Manufacturing is turning away.</p><p>Leadership feels they've balanced growth with prudence, but wonder if they're missing a major opportunity.</p>`
            },
            {
                text: "Don't invest now—wait for better timing",
                effects: {
                    sarahHappiness: -8,
                    robertHappiness: -5,
                    managementQuality: -4
                },
                impact: `<h4>Decision Impact</h4><p>The family decides not to invest now, waiting for what they consider better timing or clearer market signals.</p><p>The opportunity passes. Frustrated customers find other suppliers. <span class='impact-negative'>Some of the market demand evaporates</span> as competitors fill the gap.</p><p><span class='impact-highlight'>Sarah and the sales team</span> are disappointed. They watched revenue slip away because the company wouldn't invest in capacity.</p><p><span class='impact-negative'>Management quality decreases</span> as the best employees question whether leadership can seize opportunities.</p><p>The conservative decision preserved cash but may have cost the company its competitive position.</p>`
            }
        ]
    }
};
