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
                                revenue: 150000,
                                profit: 30000,
                                cash: 30000,
                                valuation: 60000,
                                robertHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert keeps his day job and works on the business nights and weekends. Progress is slow but steady.</p><p><span class='impact-positive'>The family maintains financial stability</span>, though Robert is exhausted from working 70-hour weeks.</p><p>After two years, the business brings in modest revenue, and Robert has kept his family secure. But <span class='impact-highlight'>Robert's happiness decreases</span> from the relentless grind.</p>`
                        },
                        {
                            text: "Take the $100K loan and go all-in immediately",
                            effects: {
                                revenue: 400000,
                                profit: 60000,
                                cash: -30000,
                                debt: 100000,
                                valuation: 160000,
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
                    description: `The business has survived its early years. Now, a Fortune 500 company has approached Anderson Manufacturing with a contract that could transform everything: $1.2M over three years.\n\nThere's a catch. To fulfill the contract, Robert needs to hire six more people immediately and lease a larger facility. This means $200K in upfront costs and significantly higher monthly overhead.\n\nIf the client is satisfied, it could lead to even bigger contracts. But if Anderson Manufacturing can't deliver quality work on time, the reputational damage could be fatal.\n\nRobert's current facility could maybe handle the work—but just barely, and quality might suffer.`,
                    options: [
                        {
                            text: "Accept the contract and invest in scaling up",
                            effects: {
                                revenue: 1200000,
                                profit: 180000,
                                cash: -200000,
                                valuation: 480000,
                                robertHappiness: 15
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert accepts the contract and makes the necessary investments. <span class='impact-positive'>Revenue jumps to over $1.6M</span> annually.</p><p>The new facility and expanded team deliver excellent work. <span class='impact-positive'>The Fortune 500 client is impressed and extends the contract.</span></p><p><span class='impact-highlight'>Robert</span> is thrilled—the business is truly taking off. However, <span class='impact-negative'>cash reserves are depleted</span> from the expansion costs.</p>`
                        },
                        {
                            text: "Decline—stay small and avoid the risk",
                            effects: {
                                revenue: 200000,
                                profit: 40000,
                                cash: 50000,
                                valuation: 80000,
                                robertHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert declines the major contract, choosing stability over growth risk.</p><p>The business continues to grow slowly. <span class='impact-positive'>Cash reserves remain healthy</span>, but revenue growth is modest.</p><p><span class='impact-highlight'>Robert</span> wonders if he's made a mistake. <span class='impact-negative'>His happiness decreases</span>—he can't shake the feeling that he's missed a huge opportunity.</p>`
                        }
                    ]
                },
                
                // Event 2: 2000 - Dot-com Crash Impact
                {
                    date: "2000",
                    title: "The Dot-Com Crash",
                    description: `The dot-com bubble has burst. Several of Anderson Manufacturing's clients are tech companies or tech suppliers—and they're cutting orders dramatically.\n\nRevenue is down 30% from last year. Robert has 15 employees, and he's struggling to make payroll. He has three options:\n\n1. Lay off 5 employees to cut costs and survive\n2. Take on more debt to maintain the team through the downturn\n3. Pivot to serving more stable industries, though this means abandoning relationships Robert has spent years building\n\nEach choice has consequences. Layoffs will devastate families who depend on these jobs. Debt is risky in an uncertain economy. Pivoting means starting over in some ways.`,
                    options: [
                        {
                            text: "Lay off 5 employees to cut costs",
                            effects: {
                                revenue: -300000,
                                profit: -50000,
                                cash: 100000,
                                robertHappiness: -15
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert makes the painful decision to lay off one-third of his workforce. <span class='impact-negative'>Revenue and profit decline</span>, but <span class='impact-positive'>cash flow stabilizes</span>.</p><p>The layoffs save the company, but <span class='impact-highlight'>Robert</span> is haunted by the decision. <span class='impact-negative'>His happiness drops significantly</span>—he feels he's failed the employees who trusted him.</p><p>The remaining team is nervous and morale is low.</p>`
                        },
                        {
                            text: "Take on $150K debt to maintain the full team",
                            effects: {
                                revenue: -200000,
                                profit: -80000,
                                debt: 150000,
                                cash: 50000,
                                robertHappiness: 5,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert refuses to lay anyone off and borrows $150K to weather the storm. <span class='impact-negative'>Revenue and profit decrease</span>, and <span class='impact-negative'>debt increases</span>.</p><p>The team is grateful and loyal. <span class='impact-highlight'>Robert</span> feels he's done the right thing, though the financial pressure is intense.</p><p>The company survives with its team intact, but now carries significant debt going into an uncertain economy.</p>`
                        },
                        {
                            text: "Pivot to serving manufacturing and construction industries",
                            effects: {
                                revenue: 100000,
                                profit: 20000,
                                cash: -50000,
                                valuation: 100000,
                                robertHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert pivots to more stable industries. <span class='impact-positive'>Revenue stabilizes</span> as new clients from construction and traditional manufacturing sign on.</p><p>However, building these new relationships takes time and money. <span class='impact-negative'>Cash reserves decrease</span> from sales and marketing efforts.</p><p><span class='impact-highlight'>Robert</span> is moderately stressed but believes this diversification will pay off long-term.</p>`
                        }
                    ]
                },
                
                // Event 3: 2004 - First Succession Thoughts
                {
                    date: "2004",
                    title: "Looking to the Future",
                    description: `Robert is 45 years old. The business is doing well, bringing in $3M annually with healthy margins. He's been thinking about the future.\n\nSarah is 18 and just started college, studying business. She's shown interest in joining the company someday. Michael (15) is more interested in sports than business, but that could change. Jennifer (12) is still young.\n\nRobert has never given his children formal ownership. Some advisors tell him to start transferring shares now for tax purposes and to begin grooming successors. Others say he should wait—the kids are too young, and it's too early to commit to succession plans.\n\nRobert's wife suggests he at least create a basic estate plan and start documenting the business.`,
                    options: [
                        {
                            text: "Begin transferring 30% ownership to children (10% each) and create formal succession plan",
                            effects: {
                                robertOwnership: -30,
                                sarahOwnership: 10,
                                michaelOwnership: 10,
                                jenniferOwnership: 10,
                                sarahHappiness: 10,
                                michaelHappiness: 5,
                                robertHappiness: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert transfers 10% ownership to each of his three children and begins documenting succession plans.</p><p><span class='impact-highlight'>Sarah</span> is excited and feels trusted. <span class='impact-highlight'>Michael</span> is pleased but unsure what it means yet. <span class='impact-highlight'>Jennifer</span> is too young to fully understand.</p><p>The early planning creates clarity and tax advantages, though Robert sometimes second-guesses whether it's too soon.</p>`
                        },
                        {
                            text: "Wait—the children are too young to make ownership decisions now",
                            effects: {
                                cash: 50000,
                                robertHappiness: -5,
                                sarahHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert decides to wait on ownership transfers and formal succession planning.</p><p>The business continues to grow without complication from family ownership issues. <span class='impact-positive'>Robert maintains full control and operational flexibility.</span></p><p>However, <span class='impact-highlight'>Sarah</span> notices her friends' parents are bringing them into family businesses and wonders if her father sees a future for her in the company.</p>`
                        }
                    ]
                },
                
                // Event 4: 2007 - Sarah and Michael Join
                {
                    date: "2007",
                    title: "The Next Generation Enters",
                    description: `Sarah graduated with her MBA and wants to join Anderson Manufacturing. She's smart, ambitious, and has real business skills.\n\nMichael also finished college. He doesn't have Sarah's credentials, but he's charismatic and interested in sales.\n\nRobert needs to decide how to bring them into the business. Should they start at the bottom and earn their way up? Should they get special treatment as family? Should their compensation reflect market rates or family privilege?\n\nRobert knows that how he handles this will set precedents for years to come. He's also aware that Sarah and Michael might end up competing for leadership someday.`,
                    options: [
                        {
                            text: "Hire both at market-rate salaries, make them earn their positions",
                            effects: {
                                profit: -180000,
                                revenue: 400000,
                                sarahHappiness: 5,
                                michaelHappiness: 5,
                                robertHappiness: 10
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah starts as a junior manager at $65K, Michael in sales at $55K—both market rates for their experience.</p><p><span class='impact-positive'>Revenue increases</span> as both contribute to the business. <span class='impact-negative'>Profit decreases</span> due to additional payroll.</p><p><span class='impact-highlight'>Sarah and Michael</span> appreciate being treated professionally, though they sometimes wonder if family connections should provide more benefits.</p><p><span class='impact-highlight'>Robert</span> is proud of the professional approach.</p>`
                        },
                        {
                            text: "Give them elevated positions and above-market compensation",
                            effects: {
                                profit: -250000,
                                revenue: 300000,
                                sarahHappiness: 15,
                                michaelHappiness: 15,
                                robertHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah starts as Assistant COO at $90K, Michael as Sales Director at $80K—well above market for their experience.</p><p><span class='impact-highlight'>Sarah and Michael</span> feel valued and trusted. <span class='impact-positive'>Their happiness increases significantly.</span></p><p>However, <span class='impact-negative'>profit decreases substantially</span> from the high salaries. Non-family employees notice the special treatment and some grumble about nepotism.</p><p><span class='impact-highlight'>Robert</span> worries whether he's done the right thing.</p>`
                        }
                    ]
                },
                
                // Event 5: 2009 - Financial Crisis
                {
                    date: "2009",
                    title: "The Great Recession",
                    description: `The 2008 financial crisis has devastated the economy. Anderson Manufacturing's orders are down 40%. Cash flow is critical.\n\nRobert is facing the hardest decision since founding the company. He needs to cut costs immediately. Options:\n\n1. Cut everyone's salary by 20%, including his own, to avoid layoffs\n2. Lay off 8 employees (including some who've been with him for years)\n3. Ask the family shareholders to forgo dividends and take salary cuts, protecting non-family employees\n\nSarah and Michael are both in the business now. Jennifer is in college and depends on dividend income to help with expenses.\n\nEvery option hurts someone.`,
                    options: [
                        {
                            text: "Cut all salaries by 20%, share the pain equally",
                            effects: {
                                profit: 100000,
                                cash: 150000,
                                robertHappiness: -10,
                                sarahHappiness: -5,
                                michaelHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert announces a company-wide 20% salary cut. Everyone shares the pain—family and non-family employees alike.</p><p><span class='impact-positive'>Cash flow stabilizes</span> and <span class='impact-positive'>no one loses their job</span>. The team appreciates that everyone is sacrificing together.</p><p>The Anderson family's income drops sharply. <span class='impact-highlight'>Robert, Sarah, and Michael</span> all feel the financial strain, though they understand it's necessary.</p>`
                        },
                        {
                            text: "Lay off 8 non-family employees",
                            effects: {
                                profit: 80000,
                                cash: 120000,
                                revenue: -400000,
                                robertHappiness: -20,
                                sarahHappiness: -10,
                                michaelHappiness: -8
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert makes the painful decision to lay off 8 employees. <span class='impact-positive'>Cash flow improves</span>, but <span class='impact-negative'>revenue decreases</span> with the smaller team.</p><p>The laid-off employees feel betrayed, especially when they see the Anderson family kept their positions. Company culture suffers.</p><p><span class='impact-highlight'>Robert</span> is devastated by the decision. <span class='impact-negative'>His happiness plummets</span>—he questions whether he should have protected his employees before his family.</p>`
                        },
                        {
                            text: "Family takes 40% salary cuts and no dividends; protect non-family jobs",
                            effects: {
                                profit: 50000,
                                cash: 80000,
                                robertHappiness: 5,
                                sarahHappiness: 10,
                                michaelHappiness: 5,
                                jenniferHappiness: -15
                            },
                            impact: `<h4>Decision Impact</h4><p>The Anderson family agrees to deep salary cuts and forgoes all dividends to protect employee jobs.</p><p>The employees are deeply grateful. Non-family staff work even harder, knowing the family sacrificed for them. <span class='impact-positive'>Company loyalty and culture strengthens.</span></p><p><span class='impact-highlight'>Jennifer</span> is upset—she was counting on dividend income for college expenses. <span class='impact-negative'>Her happiness decreases significantly.</span></p><p><span class='impact-highlight'>Robert and Sarah</span> feel they've done the right thing.</p>`
                        }
                    ]
                },
                
                // Event 6: 2012 - Succession Discussion
                {
                    date: "2012",
                    title: "The Sunday Dinner Discussion",
                    description: `Robert is now 53. Over Sunday dinner, he brings up succession planning.\n\n"I'm not retiring tomorrow," he says, "but we need to talk about the future."\n\nSarah has been COO for a year now. She's earned it—working 60-hour weeks, taking on more responsibility, making tough calls. Michael runs sales and has brought in significant new business, though his management skills are less developed.\n\nJennifer, who became a teacher, looks concerned. She owns 10% and depends on dividends.\n\nRobert doesn't have all the answers. But this conversation needs to happen.\n\nShould he commit to Sarah as next CEO? Keep options open? Create a competition between Sarah and Michael?`,
                    options: [
                        {
                            text: "Commit to Sarah as next CEO within 5 years",
                            effects: {
                                sarahHappiness: 20,
                                michaelHappiness: -15,
                                robertHappiness: 5,
                                revenue: 300000,
                                profit: 50000
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert announces that Sarah will become CEO when he steps down, likely within five years.</p><p><span class='impact-highlight'>Sarah</span> is energized and relieved. <span class='impact-positive'>Her happiness increases dramatically</span> and she works even harder. <span class='impact-positive'>Business performance improves under her clear leadership path.</span></p><p><span class='impact-highlight'>Michael</span> is disappointed and hurt. <span class='impact-negative'>His happiness drops significantly</span>—he feels his contributions are undervalued.</p><p><span class='impact-highlight'>Robert</span> appreciates the clarity, though he worries about Michael's reaction.</p>`
                        },
                        {
                            text: "Keep options open—evaluate both Sarah and Michael over time",
                            effects: {
                                sarahHappiness: -12,
                                michaelHappiness: 8,
                                robertHappiness: -8,
                                profit: -30000
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert decides not to commit to anyone yet, saying both Sarah and Michael will be evaluated over the next several years.</p><p><span class='impact-highlight'>Sarah</span> is frustrated and hurt. After years of hard work and clear qualification, <span class='impact-negative'>her happiness decreases</span>. She wonders if she should look for CEO opportunities elsewhere.</p><p><span class='impact-highlight'>Michael</span> feels he still has a shot and his <span class='impact-positive'>happiness improves</span>.</p><p>The ambiguity creates tension. <span class='impact-negative'>Business performance suffers slightly</span> from the uncertainty and sibling competition.</p>`
                        }
                    ]
                },
                
                // Event 7: 2014 - Growth Opportunity
                {
                    date: "2014",
                    title: "The Major Contract",
                    description: `A Fortune 100 company has offered Anderson Manufacturing a massive contract: $3M annually for five years.\n\nThe catch: fulfilling it requires a $1.2M investment in new equipment and hiring 20 additional workers.\n\nSarah has prepared a detailed analysis showing 22% ROI over five years. The numbers look solid. Michael is excited about the growth.\n\nBut Jennifer is concerned. The investment will reduce dividend payments for at least three years. She was counting on that income—teaching doesn't pay much, and she's planning to buy a house.\n\nRobert must balance growth ambitions with family member's financial needs.`,
                    options: [
                        {
                            text: "Accept the contract and make the investment",
                            effects: {
                                revenue: 3000000,
                                profit: 450000,
                                cash: -1200000,
                                valuation: 1200000,
                                debt: 500000,
                                sarahHappiness: 15,
                                michaelHappiness: 15,
                                jenniferHappiness: -20,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>The company accepts the contract and makes the major investment. <span class='impact-positive'>Revenue increases by $3M annually</span> and <span class='impact-positive'>company valuation rises substantially</span>.</p><p>However, <span class='impact-negative'>cash is depleted and the company takes on $500K in debt</span> to complete the investment.</p><p><span class='impact-highlight'>Sarah and Michael</span> are thrilled with the growth opportunity. <span class='impact-highlight'>Jennifer</span> is upset—<span class='impact-negative'>her happiness drops significantly</span> as her dividend income disappears for years.</p>`
                        },
                        {
                            text: "Decline and maintain stable dividend payments",
                            effects: {
                                cash: 200000,
                                sarahHappiness: -15,
                                michaelHappiness: -15,
                                jenniferHappiness: 15,
                                robertHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert declines the contract to protect dividend payments and avoid risk.</p><p><span class='impact-highlight'>Jennifer</span> is relieved—<span class='impact-positive'>her dividend income continues</span>, and she can proceed with buying her house.</p><p><span class='impact-highlight'>Sarah and Michael</span> are deeply frustrated. <span class='impact-negative'>Their happiness decreases significantly</span>. They feel the family is holding the business back.</p><p><span class='impact-highlight'>Robert</span> worries he's made the wrong choice and is limiting the company's potential.</p>`
                        }
                    ]
                },
                
                // Event 8: 2016 - Michael's Compensation Conflict
                {
                    date: "2016",
                    title: "The Compensation Debate",
                    description: `Michael requests a meeting with Robert. He's done the math.\n\n"I brought in $4.2M in new business last year," Michael explains. "But Sarah makes $180K as COO while I make $120K. I understand her role has more responsibility, but my results speak for themselves."\n\nHe has a point. Michael's sales performance has been exceptional. But Sarah's role requires more expertise, works longer hours, and carries ultimate operational responsibility.\n\nFair isn't always equal. Equal isn't always fair.\n\nRobert needs to decide how to value different types of contributions.`,
                    options: [
                        {
                            text: "Increase Michael's salary to $160K to recognize his sales success",
                            effects: {
                                profit: -40000,
                                revenue: 500000,
                                michaelHappiness: 18,
                                sarahHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert raises Michael's salary to $160K, substantially narrowing the gap with Sarah.</p><p><span class='impact-highlight'>Michael</span> feels valued and recognized. <span class='impact-positive'>His happiness increases dramatically</span> and <span class='impact-positive'>his sales performance gets even better</span>.</p><p><span class='impact-negative'>Profit decreases</span> due to the higher compensation.</p><p><span class='impact-highlight'>Sarah</span> is frustrated. She feels the differential should reflect their very different roles and responsibilities. <span class='impact-negative'>Her happiness decreases</span>.</p>`
                        },
                        {
                            text: "Maintain the differential and explain that different roles have different compensation",
                            effects: {
                                michaelHappiness: -15,
                                robertHappiness: -8,
                                revenue: -300000
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
                                revenue: 1500000,
                                profit: 250000,
                                valuation: 1000000,
                                robertOwnership: -2,
                                sarahOwnership: -2,
                                michaelOwnership: -1,
                                jenniferOwnership: -1,
                                sarahHappiness: -30,
                                michaelHappiness: -15,
                                robertHappiness: 10,
                                hasOutsideCEO: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Amanda joins as COO. <span class='impact-positive'>Revenue and profit grow significantly</span> under her professional management. <span class='impact-positive'>Company valuation increases substantially.</span></p><p><span class='impact-highlight'>Sarah</span> is devastated. <span class='impact-negative'>Her happiness plummets</span>—after seven years as COO, she's been demoted in favor of an outsider. She's questioning whether to leave.</p><p><span class='impact-highlight'>Michael</span> also sees his advancement blocked. All family ownership stakes decrease slightly due to Amanda's equity.</p><p><span class='impact-highlight'>Robert</span> believes he's made the right business decision, even if it's painful for the family.</p>`
                        },
                        {
                            text: "Stay family-led and invest in Sarah's development",
                            effects: {
                                profit: -100000,
                                cash: -50000,
                                sarahHappiness: 20,
                                michaelHappiness: 8,
                                robertHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert passes on Amanda and commits to Sarah's leadership. He invests $50K in executive coaching and development for her.</p><p><span class='impact-highlight'>Sarah</span> feels deeply valued and supported. <span class='impact-positive'>Her happiness increases dramatically.</span></p><p>However, <span class='impact-negative'>profit decreases</span> as the company misses opportunities that Amanda's expertise could have captured.</p><p><span class='impact-highlight'>Robert</span> sometimes wonders if family loyalty is limiting the business's potential.</p>`
                        }
                    ]
                },
                
                // Event 10: 2020 - COVID-19 Crisis
                {
                    date: "2020",
                    title: "The Pandemic",
                    description: function() {
                        var baseDesc = "COVID-19 has shut down the economy. Anderson Manufacturing's orders have dropped 60% in two months.\n\n";

                        if (gameState.cash > 1000000) {
                            baseDesc += "Fortunately, the company has strong cash reserves of $" + formatNumber(gameState.cash) + ", which provides some cushion. But even that won't last long at this burn rate.\n\n";
                        } else if (gameState.hasDebt && gameState.debt > 500000) {
                            baseDesc += "The situation is dire. The company is carrying $" + formatNumber(gameState.debt) + " in debt, and cash reserves are thin. Debt payments are due monthly.\n\n";
                        }

                        baseDesc += "Robert is 61. Sarah is 34. Michael is 31. The company employs 45 people, many with families who depend on these paychecks.\n\n";

                        // Check if they protected employees in 2009 crisis
                        var crisisEvent = gameState.decisions.find(function(d) { return d.event === 5; });
                        if (crisisEvent && crisisEvent.choice === 2) {
                            baseDesc += "In 2009, the family sacrificed their own salaries to protect employee jobs. Employees remember. There's strong loyalty, but can the family do it again?\n\n";
                        } else if (crisisEvent && crisisEvent.choice === 1) {
                            baseDesc += "In 2009, the company laid off employees to survive. Some of those people are back working here now, nervous about history repeating.\n\n";
                        }

                        baseDesc += "The PPP loan program offers some relief, but it's not enough. Robert faces brutal choices:\n\n1. Massive layoffs to preserve cash\n2. Family members take no salary to protect jobs\n3. Take on significant debt, gambling on recovery\n\nThis crisis will define the company's character and the family's values.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Lay off 20 employees immediately to preserve cash",
                            effects: {
                                profit: -200000,
                                cash: 300000,
                                revenue: -2000000,
                                robertHappiness: -25,
                                sarahHappiness: -20,
                                michaelHappiness: -18
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert makes the agonizing decision to lay off nearly half the workforce. <span class='impact-positive'>Cash reserves are protected</span>, ensuring company survival.</p><p><span class='impact-negative'>Revenue drops significantly</span> with the smaller team.</p><p>The entire Anderson family is traumatized by the decision. <span class='impact-highlight'>Robert, Sarah, and Michael</span> all experience <span class='impact-negative'>sharp decreases in happiness</span>.</p><p>The laid-off employees feel betrayed. Company culture may never fully recover.</p>`
                        },
                        {
                            text: "Family members take zero salary for 6 months, protect all jobs",
                            effects: {
                                cash: 180000,
                                profit: -100000,
                                robertHappiness: 10,
                                sarahHappiness: 15,
                                michaelHappiness: 10,
                                jenniferHappiness: -25
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert, Sarah, and Michael agree to forgo all salary for six months to save every job. <span class='impact-positive'>All 45 employees keep their positions.</span></p><p>The employees are deeply moved. Loyalty and dedication skyrocket. When the economy recovers, the team works harder than ever.</p><p><span class='impact-highlight'>Robert, Sarah, and Michael</span> feel they've lived their values, despite the personal financial hardship.</p><p><span class='impact-highlight'>Jennifer</span> receives no dividends and is <span class='impact-negative'>very unhappy</span>—she's struggling financially and feels the business is always prioritized over her needs.</p>`
                        },
                        {
                            text: "Take on $800K debt, betting on quick recovery",
                            effects: {
                                debt: 800000,
                                cash: 600000,
                                profit: -300000,
                                robertHappiness: -15,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>The company takes on $800K in debt to maintain operations and staff through the crisis.</p><p><span class='impact-positive'>All employees keep their jobs</span> and the company maintains its capabilities.</p><p>However, <span class='impact-negative'>the company now carries substantial debt</span> in a highly uncertain economic environment.</p><p><span class='impact-highlight'>Robert</span> is stressed and worried. If recovery takes longer than expected, this debt could sink the company.</p>`
                        }
                    ]
                },
                
                // Event 11: 2022 - Robert's Health Scare
                {
                    date: "2022",
                    title: "A Wake-Up Call",
                    description: `Robert suffered a minor heart attack. He's recovering well, but it's a stark reminder that he's 63 years old and can't work forever.\n\nThe doctors have advised him to reduce stress and work fewer hours. His wife is insistent.\n\nThis forces the succession question that Robert has been postponing. Sarah is clearly the logical choice for CEO—she has the skills, experience, and has been groomed for the role. But actually pulling the trigger means Robert giving up control of what he built.\n\nMichael has matured significantly but still lacks Sarah's operational depth.`,
                    options: [
                        {
                            text: "Make Sarah CEO immediately, Robert becomes Executive Chairman",
                            effects: {
                                sarahHappiness: 25,
                                michaelHappiness: -18,
                                robertHappiness: -5,
                                revenue: 800000,
                                profit: 150000,
                                robertRetired: true,
                                sarahCEO: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah becomes CEO. She's energized and ready. <span class='impact-positive'>Revenue and profit increase</span> as she implements changes she's been planning for years.</p><p><span class='impact-highlight'>Sarah's happiness increases dramatically</span>—she's finally leading the company.</p><p><span class='impact-highlight'>Michael</span> feels definitively passed over. <span class='impact-negative'>His happiness drops significantly.</span></p><p><span class='impact-highlight'>Robert</span> struggles with letting go, even though he knows it's right. He stays involved as Executive Chairman, sometimes second-guessing Sarah's decisions.</p>`
                        },
                        {
                            text: "Continue as CEO but delegate more responsibilities",
                            effects: {
                                robertHappiness: 5,
                                sarahHappiness: -15,
                                michaelHappiness: 5,
                                profit: -150000,
                                revenue: -400000
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert stays on as CEO, promising to work less and delegate more.</p><p>In practice, he can't let go. He still involves himself in day-to-day decisions. <span class='impact-negative'>The company suffers from indecisive leadership</span> as responsibility is unclear.</p><p><span class='impact-highlight'>Sarah</span> is deeply frustrated. <span class='impact-negative'>Her happiness decreases substantially</span>—even a health scare wasn't enough to trigger real succession.</p><p>She begins quietly exploring CEO opportunities at other companies.</p>`
                        }
                    ]
                },
                
                // Event 12: 2024 - Michael's External Offer
                {
                    date: "2024",
                    title: "Michael's Crossroads",
                    description: function() {
                        var baseDesc = "Michael has received an offer from a competitor: $200K salary plus substantial equity and a VP title. It's a clear path to eventual CEO.\n\n";

                        // Check if compensation conflict was resolved in his favor
                        var compensationEvent = gameState.decisions.find(function(d) { return d.event === 8; });
                        if (compensationEvent && compensationEvent.choice === 0) {
                            baseDesc += "\"Dad, I appreciate that you increased my salary a few years ago,\" Michael says. \"But even at $160K, I'm still watching Sarah make more strategic decisions while I'm stuck in sales.\"\n\n";
                        } else if (compensationEvent && compensationEvent.choice === 1) {
                            baseDesc += "\"Dad, remember when I asked about my compensation years ago? You explained that different roles have different pay. Well, this new role would finally value my contributions properly.\"\n\n";
                        } else {
                            baseDesc += "He comes to Robert: \"Dad, I love this company, but I need to know there's a future for me here.\"\n\n";
                        }

                        baseDesc += "Sarah is CEO. You're Executive Chairman. Where do I fit long-term?\"\n\nLosing Michael would hurt the company significantly—he brings in 40% of new business. But keeping him might require creating a role that's somewhat artificial.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Create President role for Michael, reporting to CEO Sarah",
                            effects: {
                                profit: -80000,
                                revenue: 700000,
                                michaelHappiness: 25,
                                sarahHappiness: -15
                            },
                            impact: `<h4>Decision Impact</h4><p>Michael becomes President, overseeing sales and business development. <span class='impact-positive'>His happiness increases dramatically</span> and <span class='impact-positive'>revenue grows</span> from his renewed energy.</p><p><span class='impact-negative'>Profit decreases</span> due to Michael's higher compensation package.</p><p><span class='impact-highlight'>Sarah</span> is concerned about having her brother as President reporting to her. Will he undermine her authority? Will family dynamics complicate the reporting relationship?</p><p>The company now has two siblings in top leadership with complex family dynamics.</p>`
                        },
                        {
                            text: "Encourage Michael to take the external opportunity",
                            effects: {
                                revenue: -1200000,
                                profit: -250000,
                                michaelHappiness: -35,
                                robertHappiness: -20,
                                jenniferHappiness: -15,
                                sarahHappiness: -10,
                                michaelLeft: true,
                                michaelOwnership: 0,
                                robertOwnership: 73,
                                sarahOwnership: 17
                            },
                            impact: `<h4>Decision Impact</h4><p>Michael leaves Anderson Manufacturing for the competitor. <span class='impact-negative'>Revenue and profit drop sharply</span> without his sales leadership.</p><p><span class='impact-highlight'>Michael</span> is heartbroken. <span class='impact-negative'>His happiness plummets</span>—he wanted to stay but felt there was no path forward.</p><p>He sells his 10% ownership back to the family. The entire Anderson family is devastated by his departure.</p><p>Sunday dinners become awkward. The family business has fractured the family.</p>`
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
                        var baseDesc = "A major client has discovered defects in Anderson Manufacturing's products. The problem affects $2.5M worth of delivered goods.\n\nThe client is threatening to terminate their contract and sue for damages. Industry reputation is at stake.\n\n";

                        // Check if they accepted the major growth contract in Event 7
                        var growthEvent = gameState.decisions.find(function(d) { return d.event === 7; });
                        if (growthEvent && growthEvent.choice === 0) {
                            baseDesc += "Sarah's investigation reveals the root cause: to meet the aggressive growth targets from that major contract years ago, quality control protocols were loosened. The team was stretched too thin.\n\n";
                        } else if (gameState.hasDebt && gameState.debt > 500000) {
                            baseDesc += "Sarah's investigation reveals the problem: under pressure from debt obligations, the company cut corners on quality inspections to reduce costs and speed up production.\n\n";
                        } else {
                            baseDesc += "Sarah's investigation reveals the root cause: to meet aggressive growth targets, quality control was loosened. Some of this happened under pressure to perform.\n\n";
                        }

                        baseDesc += "Options:\n1. Fight the claims and minimize liability\n2. Accept full responsibility, recall everything, and rebuild quality systems (expensive)\n3. Blame the problem on a specific employee to contain the crisis\n\nHow the family handles this will define their integrity.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept full responsibility and bear the cost ($1.8M)",
                            effects: {
                                profit: -1800000,
                                cash: -1800000,
                                revenue: 1000000,
                                valuation: 500000,
                                sarahHappiness: 10,
                                robertHappiness: 15
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah announces full responsibility. <span class='impact-negative'>The company takes a $1.8M hit</span> for recalls and rebuilding quality systems.</p><p>The client is impressed by the integrity. <span class='impact-positive'>They not only maintain the contract but increase it.</span></p><p><span class='impact-highlight'>Sarah and Robert</span> feel they've upheld the company's values, despite the painful cost.</p><p>Employee morale and culture strengthen. The team sees leadership that prioritizes doing the right thing over short-term profits.</p>`
                        },
                        {
                            text: "Minimize liability and settle quietly ($600K)",
                            effects: {
                                profit: -600000,
                                cash: -600000,
                                revenue: -800000,
                                sarahHappiness: -15,
                                robertHappiness: -20,
                                hasQualityIssues: true
                            },
                            impact: `<h4>Decision Impact</h4><p>The company settles quietly for $600K and moves on quickly.</p><p>The client accepts the settlement but doesn't renew the contract. <span class='impact-negative'>Revenue decreases as they take their business elsewhere.</span></p><p><span class='impact-highlight'>Sarah and Robert</span> both feel they've compromised their values. <span class='impact-negative'>Their happiness decreases</span> as they've chosen financial protection over doing the right thing.</p><p>Some employees lose respect for leadership. The culture begins to shift.</p>`
                        }
                    ]
                },
                
                // Event 15: 2030 - Third Generation
                {
                    date: "2030",
                    title: "The Next Generation",
                    description: `Sarah's daughter Emily is now 16 and brilliant—she's already talking about studying engineering and joining the family business.\n\nMichael's son David is 14 and entrepreneurial, always starting small businesses.\n\nBut the family hasn't discussed how the third generation will enter the business. Should there be requirements? Standards? Or should all grandchildren have a guaranteed place?\n\nRobert remembers bringing Sarah and Michael into the business without clear policies. Sometimes it worked, sometimes it created problems.\n\nSarah wants to professionalize the entry process. Jennifer worries about her son Lucas (10) being disadvantaged if he doesn't show business interest.`,
                    options: [
                        {
                            text: "Institute formal policy: Gen 3 must work elsewhere for 3+ years first",
                            effects: {
                                sarahHappiness: 15,
                                robertHappiness: 15,
                                jenniferHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>The family creates a formal policy: all third-generation members must work elsewhere for at least three years and demonstrate relevant skills before joining Anderson Manufacturing.</p><p><span class='impact-highlight'>Sarah and Robert</span> believe this professionalizes the business and ensures competence over family privilege.</p><p><span class='impact-highlight'>Jennifer</span> worries this policy disadvantages her son Lucas, who is younger and less obviously business-oriented than Emily and David.</p><p>The policy sets important precedents for the future, though it may create resentment.</p>`
                        },
                        {
                            text: "Keep it informal—evaluate each grandchild individually when the time comes",
                            effects: {
                                sarahHappiness: -5,
                                jenniferHappiness: 10,
                                robertHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>The family decides not to create formal policies, preferring to evaluate each situation individually.</p><p><span class='impact-highlight'>Jennifer</span> is relieved—flexibility means Lucas won't be automatically excluded.</p><p><span class='impact-highlight'>Sarah</span> worries this approach will lead to the same conflicts the second generation faced. Lack of clear standards could breed resentment and nepotism.</p><p>The family has deferred difficult decisions that will likely resurface later.</p>`
                        }
                    ]
                },
                
                // Event 16: 2032 - Jennifer's Buyout Request
                {
                    date: "2032",
                    title: "Jennifer's Request",
                    description: `Jennifer has come to the family with a difficult conversation. She's now 40, still teaching, and she'd like the company to buy out her 10% stake.\n\n"I've been patient," she explains. "I supported all of you. But I don't work in the business, I rarely see dividends when you reinvest everything, and I need capital. I want to buy a house and secure my retirement."\n\nShe's asking for $3M for her 10%—a fair valuation based on recent offers.\n\nThis would require the company to either use cash reserves or take on debt. It would also concentrate ownership further in Robert and Sarah's hands.\n\nBut Jennifer has a point. She's been a passive shareholder for decades with little benefit.`,
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
                                profit: -150000,
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
                    description: `Robert Anderson passed away peacefully at age 75. The man who started with $50,000 in 1994 built a company now worth over $30M.\n\nHis funeral draws hundreds—employees past and present, clients, competitors, community members. The tributes speak of his integrity, vision, and loyalty.\n\nNow the family must navigate grief while managing succession. Robert's will transfers his ownership to Sarah (60%) and equally to any other active family members (40% if Michael still there, 0% if he left).\n\nSarah is now fully in control. But leading without her father's guidance—and wisdom—will be different.\n\nThe company must decide how to honor Robert's legacy while moving forward.`,
                    options: [
                        {
                            text: "Maintain Robert's vision and conservative approach",
                            effects: {
                                sarahOwnership: 70,
                                michaelOwnership: 30,
                                sarahHappiness: 5,
                                robertHappiness: 0,
                                robertDeceased: true,
                                revenue: -300000
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah commits to maintaining Robert's conservative, values-driven approach to the business.</p><p>The company continues steadily, but <span class='impact-negative'>growth slows</span> as opportunities are passed up to stay true to the founder's vision.</p><p>Some employees appreciate the continuity. Others feel the company is stuck in the past.</p><p>Ownership is transferred according to Robert's will.</p>`
                        },
                        {
                            text: "Honor his values but modernize the strategy",
                            effects: {
                                sarahOwnership: 70,
                                michaelOwnership: 30,
                                sarahHappiness: 15,
                                robertHappiness: 0,
                                robertDeceased: true,
                                revenue: 1200000,
                                profit: 250000,
                                valuation: 800000
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah decides to honor Robert's core values—integrity, employee welfare, quality—while modernizing strategy for the next generation.</p><p><span class='impact-positive'>Revenue, profit, and valuation all increase</span> as Sarah implements changes she's been planning.</p><p>The company evolves while maintaining its soul. Employees embrace the changes.</p><p>Ownership is transferred according to Robert's will. The business enters its third decade under new leadership.</p>`
                        }
                    ]
                },
                
                // Event 18: 2036 - Cousins Enter Business
                {
                    date: "2036",
                    title: "The Third Generation Arrives",
                    description: `Emily (22) has graduated with an engineering degree from MIT. She wants to join Anderson Manufacturing.\n\nDavid (20) is finishing business school. He's charismatic and entrepreneurial, already talking about expanding into new markets.\n\nBut this is delicate. If the family implemented the "work elsewhere first" policy, Emily and David need to follow it. If they didn't, Sarah needs to decide whether to hire her daughter and nephew without external experience.\n\nThe third generation brings energy and ideas—but also the risk of repeating the conflicts that challenged the second generation.`,
                    options: [
                        {
                            text: "Hire both immediately in entry-level roles",
                            effects: {
                                profit: -150000,
                                revenue: 600000,
                                sarahHappiness: 15,
                                michaelHappiness: 10,
                                hasGen3: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Emily joins as a junior engineer, David in business development. Both at entry-level salaries.</p><p><span class='impact-positive'>Revenue increases</span> as the young generation brings fresh energy and ideas.</p><p><span class='impact-negative'>Profit decreases</span> from additional payroll.</p><p>The third generation is now in the business. Emily and David are eager to prove themselves, but also bring the natural confidence of family privilege.</p><p>Some long-time employees question whether they earned their positions or received them due to family connections.</p>`
                        },
                        {
                            text: "Require them to work elsewhere for 3 years first",
                            effects: {
                                sarahHappiness: 10,
                                michaelHappiness: 5
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah implements the professional standard: Emily and David must work elsewhere first.</p><p>Emily is disappointed but accepts it. She joins a major manufacturing firm. David takes a sales role at a tech startup.</p><p>The policy ensures they'll bring outside experience and perspective. It also signals that Anderson Manufacturing values competence over family privilege.</p><p>However, three years is a long time. Will they still want to join the family business after building careers elsewhere?</p>`
                        }
                    ]
                },
                
                // Event 19: 2040 - Major Strategic Decision
                {
                    date: "2040",
                    title: "The Crossroads",
                    description: function() {
                        var baseDesc = "Anderson Manufacturing is now 46 years old. Revenue is $" + formatNumber(gameState.revenue) + " annually. ";

                        if (gameState.revenue > 15000000 && gameState.valuation > 25000000) {
                            baseDesc += "The company is thriving—Robert would be proud.\n\n";
                        } else if (gameState.revenue < 8000000) {
                            baseDesc += "The company has survived but never reached its full potential.\n\n";
                        } else {
                            baseDesc += "The company is stable and profitable.\n\n";
                        }

                        baseDesc += "But Sarah sees the writing on the wall: manufacturing is changing rapidly. Automation, AI, global competition—the industry won't look the same in 10 years.\n\n";

                        // Reference if they took on debt before
                        if (gameState.hasDebt && gameState.debt > 2000000) {
                            baseDesc += "The company still carries $" + formatNumber(gameState.debt) + " in debt from earlier decisions. Taking on more is risky.\n\n";
                        } else if (gameState.cash > 5000000) {
                            baseDesc += "The company has strong cash reserves of $" + formatNumber(gameState.cash) + ", which provides flexibility for major investments.\n\n";
                        }

                        baseDesc += "She's identified three paths:\n\n1. Invest $5M in automation and AI (modernize or die)\n2. Acquire a smaller competitor for $4M (grow through consolidation)\n3. Stay the course (conservative approach, gradually decline)\n\n";

                        if (gameState.hasGen3) {
                            baseDesc += "Emily and David push for aggressive growth. They're the future of this company.\n\n";
                        }

                        baseDesc += "Older employees worry about their jobs being automated.\n\nThis decision will shape Anderson Manufacturing for its final decade.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Invest $5M in automation and AI",
                            effects: {
                                cash: -5000000,
                                debt: 3000000,
                                revenue: 5000000,
                                profit: 1200000,
                                valuation: 5000000,
                                sarahHappiness: 10,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Anderson Manufacturing takes on $3M debt and invests heavily in cutting-edge technology.</p><p>The transition is painful. Some long-time employees are displaced. But <span class='impact-positive'>revenue and profit surge</span> as efficiency multiplies.</p><p><span class='impact-positive'>Company valuation increases dramatically.</span> Anderson Manufacturing is now positioned for the future.</p><p>Emily and David, the third generation, are instrumental in the transformation. The company is ready for its next 50 years.</p>`
                        },
                        {
                            text: "Acquire competitor for $4M",
                            effects: {
                                cash: -4000000,
                                debt: 2500000,
                                revenue: 4500000,
                                profit: 800000,
                                valuation: 3500000,
                                sarahHappiness: 5,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>The company acquires a competitor, doubling in size overnight.</p><p><span class='impact-positive'>Revenue and profit increase substantially</span>, but integrating two company cultures proves challenging.</p><p>The acquisition brings new clients but also new problems. Growth through acquisition is messier than Sarah expected.</p><p>Still, Anderson Manufacturing is now a major regional player. <span class='impact-positive'>Valuation increases significantly.</span></p>`
                        },
                        {
                            text: "Stay the course—gradual, organic growth",
                            effects: {
                                revenue: 500000,
                                profit: 100000,
                                sarahHappiness: -10
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
                        var baseDesc = "It's been 50 years since Robert Anderson started with $50,000 and a dream.\n\n";

                        if (!gameState.robertDeceased) {
                            baseDesc += "Robert is 85 now, still attending board meetings when his health allows. ";
                        } else {
                            baseDesc += "Robert passed away years ago, but his legacy lives on. ";
                        }

                        baseDesc += "Sarah is 58 now. ";

                        if (gameState.hasGen3) {
                            baseDesc += "Emily (30) and David (28) are rising leaders in the company. ";
                        }

                        baseDesc += "The company employs over 100 people.\n\n";

                        // Offer amount varies based on company performance
                        var offerAmount = 45;
                        if (gameState.revenue > 20000000) {
                            offerAmount = 55;
                        } else if (gameState.revenue < 10000000) {
                            offerAmount = 30;
                        }

                        baseDesc += "A private equity firm has made another offer: $" + offerAmount + "M.\n\n";

                        // Reference if they declined a previous offer
                        var prevOffer = gameState.decisions.find(function(d) { return d.event === 13; });
                        if (prevOffer && prevOffer.choice === 1) {
                            baseDesc += "The family declined a $28M offer back in 2026. This new offer is ";
                            if (offerAmount > 35) {
                                baseDesc += "significantly higher—perhaps they made the right choice to wait.\n\n";
                            } else {
                                baseDesc += "barely better. They wonder if they should have sold then.\n\n";
                            }
                        }

                        if (gameState.michaelLeft) {
                            baseDesc += "Michael left the business years ago. He's built a successful career elsewhere, but family gatherings remain somewhat awkward.\n\n";
                        }

                        baseDesc += "Alternatively, Sarah could plan for the next transition";

                        if (gameState.hasGen3) {
                            baseDesc += "—Emily as eventual CEO, David as President. The third generation could lead Anderson Manufacturing through its next 50 years.\n\n";
                        } else {
                            baseDesc += ". Though without clear successors, the future is uncertain.\n\n";
                        }

                        baseDesc += "Or the family could take the money, having built something remarkable and changed their family's trajectory forever.\n\nThis is the final decision in a 50-year journey.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept the $45M offer—complete the journey",
                            effects: {
                                cash: 45000000,
                                sarahHappiness: -10
                            },
                            impact: `<h4>Decision Impact</h4><p>The Anderson family accepts the $45M offer.</p><p>After 50 years, Anderson Manufacturing is sold. The family becomes wealthy beyond Robert's wildest 1994 dreams.</p><p><span class='impact-highlight'>Sarah</span> has mixed emotions. Pride in what they built. Sadness that it's over.</p><p>Emily and David are disappointed—they wanted to lead the third generation. But they also understand the remarkable achievement.</p><p>Robert Anderson's $50,000 investment in 1994 has become $45M in 2044. The family business has changed the Anderson family forever.</p>`
                        },
                        {
                            text: "Transition to third generation—Emily as CEO",
                            effects: {
                                sarahHappiness: 20,
                                revenue: 2000000,
                                profit: 400000
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah announces that Emily will become CEO within two years. David will be President.</p><p>The third generation takes the helm. <span class='impact-positive'>Revenue and profit grow</span> under fresh leadership with new ideas.</p><p><span class='impact-highlight'>Sarah</span> is proud and happy—the family legacy continues.</p><p>Anderson Manufacturing enters its second half-century under third-generation leadership.</p><p>Robert's dream lives on. The family business he started in 1994 will see 2050 and beyond.</p>`
                        }
                    ]
                }
            
];
