// All 21 events for the 50-year family business simulation
// Each event has: date, title, description, and options with effects and impact

const EVENTS = [

                // Event 0: 1994 - The Beginning
                {
                    date: "1994",
                    title: "The Leap of Faith",
                    description: `Robert Anderson stands at a crossroads. He's 35 years old with a stable engineering job that pays $65,000 a year. But he's developed an innovative corrugated cardboard design that could serve the booming e-commerce packaging market.\n\nHis wife Patricia is supportive but nervous. They have three young children, a mortgage, and car payments. Their savings account has $50,000—enough to survive for maybe six months without income.\n\nTwo options lie before him: Bootstrap the business slowly, working nights and weekends while keeping his day job, or quit now, take a $100,000 loan, and go all-in.\n\nThe conservative path is safer. The aggressive path could make or break everything.`,
                    options: [
                        {
                            text: "Bootstrap slowly - keep the day job, grow cautiously",
                            effects: {
                                revenue: 150000,
                                profit: 9000,  // 6% margin on cardboard
                                cash: 30000,
                                assets: 60000,
                                robertHappiness: -5
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert keeps his day job and works on the business nights and weekends. Progress is slow but steady.</p><p><span class='impact-positive'>The family maintains financial stability</span>, though Robert is exhausted from working 70-hour weeks.</p><p>After two years, the business brings in modest revenue, and Robert has kept his family secure. But <span class='impact-highlight'>Robert's happiness decreases</span> from the relentless grind.</p>`
                        },
                        {
                            text: "Take the $100K loan and go all-in immediately",
                            effects: {
                                revenue: 400000,
                                profit: 24000,  // 6% margin on cardboard
                                cash: -30000,
                                debt: 100000,
                                assets: 160000,
                                robertHappiness: 10,
                                hasDebt: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert quits his job and commits fully to the business. The $100K loan gives him capital to invest in equipment and hire his first employee.</p><p><span class='impact-positive'>Revenue grows rapidly to $400K</span> in the first two years. The risk pays off—but <span class='impact-negative'>the family now carries $100K in debt</span>.</p><p><span class='impact-highlight'>Robert</span> is energized and happy, though the pressure is intense. The family has bet everything on this dream.</p>`
                        }
                    ]
                },
                
                // Event 1: 1996 - Family Involvement
                {
                    date: "1996",
                    title: "A Partner or Just a Spouse?",
                    description: `The business is growing steadily. Robert's wife, Patricia, has been supportive from day one—managing the household, raising three children, and providing emotional support through the uncertain early years.\n\nOne evening, Patricia sits down across from Robert: "We need to talk about the business."\n\n"What about it?"\n\n"I've been doing your bookkeeping nights after the kids go to bed. I've been handling supplier calls. I helped you prepare that big presentation last month." She takes a breath. "I have a business degree. I'm essentially working as your unpaid CFO. Why shouldn't I get a title, a salary, and real ownership?"\n\nRobert shifts uncomfortably. "Patricia, you know how much I appreciate—"\n\n"That's not what I'm asking for," she interrupts gently. "I'm asking to be your partner. Really. Or... do you see this as just your business?"\n\nSarah (10), Michael (7), and Jennifer (4) are watching TV in the next room, unaware their parents are discussing something that will shape their entire futures.\n\nRobert sees two paths: Bring Patricia in as equal partner with 50/50 ownership, or keep clean boundaries between business and family.`,
                    options: [
                        {
                            text: "Bring Patricia in as CFO with 50/50 ownership",
                            effects: {
                                revenue: 300000,
                                profit: 18000,  // 6% margin on cardboard
                                cash: -50000,
                                assets: 100000,
                                robertHappiness: 10,
                                robertOwnership: -50,
                                patriciaOwnership: 50,
                                patriciaHappiness: 20,
                                patriciaCFO: true,
                                managementQuality: 10
                            },
                            impact: `<h4>Decision Impact</h4><p>Patricia joins Anderson Packaging as CFO with equal ownership. <span class='impact-positive'>The business becomes more professionally managed</span> with clear financial systems and HR policies.</p><p><span class='impact-positive'>Management quality improves significantly.</span> Patricia's organizational skills complement Robert's technical vision.</p><p><span class='impact-highlight'>Robert</span> is happy to have his wife as a true partner—but now every business disagreement happens at the dinner table too.</p><p>The children see their parents working together as equal partners. This will shape their understanding of what the family business means.</p>`
                        },
                        {
                            text: "Keep business and family separate—hire professional staff",
                            effects: {
                                revenue: 250000,
                                profit: 15000,  // 6% margin on cardboard
                                cash: 30000,
                                assets: 80000,
                                robertHappiness: -5,
                                managementQuality: 3
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert hires a professional bookkeeper and keeps Patricia separate from the business. Clear boundaries between work and family.</p><p><span class='impact-positive'>The business continues to grow steadily</span> with professional management developing.</p><p>Patricia is disappointed. She feels her contributions aren't valued. <span class='impact-negative'>Dinner conversations become tense</span> when Robert talks about "his" business.</p><p>The children notice the tension. They learn that the family business can create division even when it's successful.</p>`
                        }
                    ]
                },
                
                // Event 2: 2000 - Family Employment Policy
                {
                    date: "2000",
                    title: "Setting the Rules",
                    description: function() {
                        let baseDesc = "Anderson Packaging is growing steadily. Robert has 15 employees and revenue is approaching $1M annually.\n\nSarah (14) has started showing interest in the business, asking questions about operations. Michael (11) says he wants to work there someday. Jennifer (8) is too young to know yet.\n\n";

                        if (familyMembers.patricia.ownership > 0) {
                            baseDesc += "One evening, Patricia raises an important question: \"We need to decide now—what are the rules for our children joining the business?\"\n\n\"They're still kids,\" Robert says.\n\n\"Exactly,\" Patricia replies. \"Which means we can set expectations now, before anyone feels entitled. Do we require them to work elsewhere first? Get degrees? Start at entry level? Or do we keep it flexible?\"\n\n";
                        } else {
                            baseDesc += "Robert's lawyer suggests: \"You should establish family employment policies now, while your kids are young. It's much easier to set rules before people have expectations.\"\n\nRobert brings it up with Patricia: \"Should we require the kids to work elsewhere first before joining? Maybe get business degrees? Or keep it flexible?\"\n\n";
                        }

                        baseDesc += "Robert's friend runs a family business where his unqualified son was given a VP title and nearly destroyed the company. Another friend requires all family members to earn their way up from entry level, which creates resentment.\n\n";

                        baseDesc += "This decision will shape what opportunities are available to Sarah, Michael, and Jennifer—and establish precedent for all future generations.\n\nWhat standard should the Anderson family set?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Require 3-5 years external experience + qualifications before family can join",
                            effects: {
                                robertHappiness: 10,
                                patriciaHappiness: 10,
                                managementQuality: 8,
                                hasFamilyEmploymentPolicy: true,
                                strictFamilyPolicy: true
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert and Patricia establish a strict policy: Family members must work elsewhere for 3-5 years and demonstrate relevant qualifications before joining Anderson Packaging.</p><p>"We're setting a high bar," Robert explains to the kids. "This business has to earn respect in the market. Family privilege alone won't cut it."</p><p><span class='impact-positive'>The policy ensures only qualified family members join</span>, protecting business quality. <span class='impact-positive'>Management quality standards are established.</span></p><p>But it also means Sarah, Michael, and Jennifer know they can't simply "come home" to the family business if life gets hard. They must prove themselves first.</p><p><span class='impact-highlight'>This precedent will apply to all future generations.</span> Grandchildren will face the same high bar.</p>`
                        },
                        {
                            text: "Family members welcome but must start at entry level and prove themselves",
                            effects: {
                                robertHappiness: 5,
                                sarahHappiness: 5,
                                michaelHappiness: 5,
                                managementQuality: 3,
                                hasFamilyEmploymentPolicy: true,
                                strictFamilyPolicy: false
                            },
                            impact: `<h4>Decision Impact</h4><p>The Andersons establish a moderate policy: Family members can join without external experience, but must start at entry-level positions and work their way up.</p><p>"The door is open," Robert tells the kids. "But you'll earn every promotion just like any other employee."</p><p><span class='impact-positive'>Family members have opportunity</span> but must demonstrate competence. Non-family employees appreciate that family members aren't parachuted into leadership.</p><p>However, there's still risk that family members join without sufficient external perspective or proven skills.</p><p><span class='impact-highlight'>This precedent will apply to all future generations.</span> The business remains accessible to family, for better or worse.</p>`
                        },
                        {
                            text: "Keep it flexible—evaluate each family member individually when the time comes",
                            effects: {
                                robertHappiness: -5,
                                patriciaHappiness: -10,
                                sarahHappiness: 5,
                                michaelHappiness: 5,
                                jenniferHappiness: 5,
                                managementQuality: -2
                            },
                            impact: function() {
                                if (familyMembers.patricia.ownership > 0) {
                                    return `<h4>Decision Impact</h4><p>Robert and Patricia decide not to establish formal policies. They'll evaluate each family member individually when the time comes.</p><p>"Every situation is different," Robert argues. "We should keep our options open."</p><p><span class='impact-highlight'>Patricia</span> disagrees but goes along. She worries this is a recipe for future conflict and perceived unfairness.</p><p><span class='impact-negative'>Without clear standards, every family employment decision becomes a negotiation.</span> What's fair for Sarah may not be fair for Michael. Inconsistency breeds resentment.</p><p>The children sense uncertainty about their futures. Years later, the lack of clear rules will create confusion and family conflict.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Robert decides not to establish formal policies. He'll evaluate each family member individually when the time comes.</p><p>"Every situation is different," Robert explains to Patricia. "We should keep our options open."</p><p><span class='impact-highlight'>Patricia</span> is frustrated—another business decision made without her input. She worries this lack of structure will create problems.</p><p><span class='impact-negative'>Without clear standards, every family employment decision becomes a negotiation.</span> What's fair for one child may not be fair for another. Inconsistency breeds resentment.</p><p>The children sense uncertainty about their futures. Years later, the lack of clear rules will create confusion and family conflict.</p>`;
                                }
                            }
                        }
                    ]
                },
                
                // Event 3: 2004 - First Succession Thoughts
                {
                    date: "2004",
                    title: "Looking to the Future",
                    description: `Robert is 45 years old. The business is doing well with healthy margins and steady growth. He's been thinking about the future.\n\nSarah is 18 and just started college, studying business. She's shown interest in joining the company someday. Michael (15) is more interested in sports than business, but that could change. Jennifer (12) is still young.\n\nRobert's lawyer suggests creating a formal succession plan now, even though the children are young. Some advisors recommend setting up trusts or documenting intentions for the future. Others say he should wait until the children are actually working in the business.\n\nPatricia thinks they should at least start conversations with Sarah about the business's future.`,
                    options: [
                        {
                            text: "Create formal family business constitution and document succession intentions",
                            effects: {
                                sarahHappiness: 10,
                                michaelHappiness: 5,
                                robertHappiness: 5,
                                managementQuality: 5,
                                employees: 3
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert works with his lawyer to create a family business constitution that outlines governance principles, future ownership transfer plans, and expectations for family members who want to join the business.</p><p><span class='impact-highlight'>Sarah</span> is excited to see her father taking succession seriously. She feels more confident about her future role.</p><p><span class='impact-positive'>The formal planning improves management quality</span> and creates clarity for the future, though no ownership changes hands yet—the children are too young.</p><p>The document will guide future decisions about ownership transfers when the children are older.</p>`
                        },
                        {
                            text: "Keep it informal—cross that bridge when they're older and in the business",
                            effects: {
                                cash: 50000,
                                robertHappiness: -5,
                                sarahHappiness: -5,
                                employees: 2
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert decides it's too early for formal planning. The children are too young, and he doesn't know which ones will actually want to join the business.</p><p>The business continues to grow without complication from succession planning. <span class='impact-positive'>Robert maintains full flexibility</span> for future decisions.</p><p>However, <span class='impact-highlight'>Sarah</span> notices her friends' parents are bringing them into family businesses and wonders if her father sees a future for her in the company. The lack of clarity creates some uncertainty.</p>`
                        }
                    ]
                },
                
                // Event 4: 2007 - Sarah Joins
                {
                    date: "2007",
                    title: "The Next Generation Enters",
                    description: `Sarah has graduated with her MBA and wants to join Anderson Packaging. She's 21, smart, ambitious, and has real business skills.\n\nMichael is 18 and just starting college. He's shown interest in sales but won't be ready to join for a few years.\n\nRobert faces an important decision about HOW to bring Sarah into the business:\n\n"Should I start her at entry-level to earn her way up?" he asks Patricia. "Or recognize her credentials with an immediate leadership role?"\n\n"What about ownership?" Patricia asks. "Are you thinking of giving her shares now?"\n\n"I don't know," Robert admits.`,
                    options: [
                        {
                            text: "Entry-level role, earn her way up, no immediate ownership",
                            effects: {
                                profit: 12000,  // 6% margin on cardboard
                                revenue: 200000,
                                sarahHappiness: 5,
                                robertHappiness: 10,
                                managementQuality: 5,
                                employees: 1
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah starts as a junior operations manager at $55K—market rate for her experience. No ownership stake.</p><p>"I appreciate you treating me like any other employee," Sarah says, though she wonders when ownership might come.</p><p><span class='impact-positive'>Revenue increases as Sarah contributes to operations.</span> She generates more value than she costs, so <span class='impact-positive'>profit increases modestly</span>.</p><p>Non-family employees respect that Sarah is earning her position. <span class='impact-positive'>Management quality improves.</span></p><p><span class='impact-highlight'>Robert</span> feels proud of setting a meritocratic precedent. The ownership question remains open for the future.</p>`
                        },
                        {
                            text: "Manager role with 10% ownership stake (recognizes credentials & commitment)",
                            effects: {
                                profit: -15000,
                                revenue: 250000,
                                sarahOwnership: 10,
                                robertOwnership: -5,
                                patriciaOwnership: -5,  // If Patricia is partner, she gives up 5% too
                                sarahHappiness: 20,
                                robertHappiness: 5,
                                managementQuality: 3,
                                employees: 1
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah joins as Operations Manager at $75K with an immediate 10% ownership stake.</p><p>"Thank you for showing confidence in me, Dad," Sarah says, clearly touched by the gesture.</p><p><span class='impact-highlight'>Sarah</span> feels deeply committed to the business. <span class='impact-positive'>Her happiness increases significantly.</span></p><p><span class='impact-negative'>Profit decreases</span> from the higher compensation, but Sarah's ownership creates strong alignment.</p><p>The decision sets a precedent: joining the family business comes with ownership. This will affect how Michael and Jennifer are treated later.</p><p>Non-family employees notice the preferential treatment. Some wonder if they'll ever get equity.</p>`
                        },
                        {
                            text: "Senior role BUT ownership deferred until she proves herself (2-3 years)",
                            effects: {
                                profit: -5000,
                                revenue: 225000,
                                sarahHappiness: 12,
                                robertHappiness: 8,
                                managementQuality: 4,
                                employees: 1,
                                sarahOwnershipPending: true  // Flag for future ownership decision
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah joins as Operations Manager at $70K, with the understanding that ownership will be discussed after she proves herself over 2-3 years.</p><p>"I get it," Sarah says. "I want to earn it anyway."</p><p><span class='impact-positive'>Revenue increases</span> as Sarah takes on real responsibility immediately. Her MBA and fresh perspective bring value.</p><p><span class='impact-highlight'>Sarah</span> feels respected by the approach—challenged to prove herself but with a clear path to ownership.</p><p>This hybrid approach balances meritocracy with family commitment. The ownership conversation will happen later, once Sarah has established her value.</p>`
                        }
                    ]
                },
                
                // Event 5: 2009 - Michael's Performance Problem
                {
                    date: "2009",
                    title: "The Family Competence Question",
                    description: function() {
                        let baseDesc = "Michael has been running sales for two years. He's enthusiastic and clients like his personality. But the numbers are concerning.\n\nSarah, now COO, reviews the data: Michael's deals have a 40% higher defect rate than other salespeople. He overpromises to close deals, then operations can't deliver. His pipeline looks impressive, but profitability on his accounts is below standard.\n\n";

                        if (familyMembers.patricia.ownership > 0) {
                            baseDesc += "Patricia pulls Robert aside: \"We need to talk about Michael. As CFO, I'm seeing the impact of his mistakes. It's costing us.\"\n\n\"He's learning,\" Robert says defensively.\n\n\"Robert, any non-family employee with this track record would already be on a performance improvement plan—or fired. Are we holding family to lower standards?\"\n\n";
                        } else {
                            baseDesc += "Robert receives complaints from operations about Michael's unrealistic promises. The head of production says: \"I like Michael, but he's making commitments we can't keep. It's damaging our reputation.\"\n\n";
                        }

                        baseDesc += "Sarah is uncomfortable. \"Dad, Michael is my brother. But if he were anyone else, we'd be having a very different conversation.\"\n\nMichael owns " + (familyMembers.michael.ownership || 0).toFixed(0) + "% of the company. ";
                        baseDesc += familyMembers.michael.ownership > 0 ? "He's both an employee AND an owner. " : "";
                        baseDesc += "He's family.\n\n";

                        baseDesc += "This raises a fundamental question: Should family members be held to the same performance standards as non-family employees? What happens when a family member isn't competent in their role?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Move Michael to a different role that suits his strengths better",
                            effects: {
                                revenue: 200000,
                                profit: 30000,
                                michaelHappiness: -12,
                                robertHappiness: -5,
                                sarahHappiness: 10,
                                managementQuality: 5
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>Robert creates a "Business Development" role for Michael, focusing on relationship-building rather than sales execution. Sarah manages the technical sales process.</p><p><span class='impact-positive'>Performance and profitability improve</span> as Michael's deals are now properly vetted. <span class='impact-positive'>Management quality increases</span> with appropriate role fit.</p><p><span class='impact-highlight'>Michael</span> feels demoted and embarrassed. <span class='impact-negative'>His happiness decreases</span>—everyone knows he was moved because he couldn't handle sales.</p><p><span class='impact-highlight'>Sarah</span> is relieved but feels guilty. <span class='impact-highlight'>Robert</span> wonders if he's been too easy on family members.</p><p>Non-family employees notice: family gets second chances and special roles, not termination. The precedent is set.</p>`;
                            }
                        },
                        {
                            text: "Require Michael to undergo performance improvement with clear metrics (treat like any employee)",
                            effects: {
                                revenue: 100000,
                                michaelHappiness: -20,
                                robertHappiness: 10,
                                sarahHappiness: 15,
                                managementQuality: 10,
                                michaelPerformanceImprovement: true
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>Robert institutes a formal 90-day performance improvement plan for Michael with clear metrics, identical to what any non-family employee would receive.</p><p>"You're my son, and I love you," Robert says firmly. "But in this business, you're an employee. And employees have to meet standards."</p><p><span class='impact-highlight'>Michael</span> is hurt and angry. <span class='impact-negative'>His happiness drops significantly.</span> He feels his father is choosing the business over family.</p><p><span class='impact-highlight'>Sarah</span> and non-family employees are impressed—<span class='impact-positive'>the family truly holds everyone to the same standard</span>. <span class='impact-positive'>Management credibility strengthens dramatically.</span></p><p>The precedent is clear: <span class='impact-positive'>being family doesn't exempt you from accountability</span>. This will shape how all future family employees are managed.</p>`;
                            }
                        },
                        {
                            text: "Give Michael more time and coaching—family deserves extra support",
                            effects: {
                                revenue: -200000,
                                profit: -50000,
                                michaelHappiness: 5,
                                robertHappiness: -10,
                                sarahHappiness: -20,
                                managementQuality: -12,
                                employees: -2
                            },
                            impact: function() {
                                const michaelOwn = familyMembers.michael.ownership;
                                let result = `<h4>Decision Impact</h4><p>Robert decides Michael needs more support and coaching. "He's family. We don't give up on family."</p>`;

                                result += `<p><span class='impact-negative'>Performance continues declining</span>. Michael's poor deals cost the company significantly. <span class='impact-negative'>Revenue and profit drop.</span></p><p>Two frustrated operations employees quit, citing favoritism toward incompetent family members.</p>`;

                                result += `<p><span class='impact-highlight'>Sarah</span> is furious. <span class='impact-negative'>Her happiness plummets.</span> "So family gets unlimited chances while we fire non-family employees for less? This is wrong, Dad."</p>`;

                                if (michaelOwn > 0) {
                                    result += `<p><span class='impact-highlight'>Michael</span> owns ${michaelOwn.toFixed(0)}% of the company, so he can't easily be removed. But the dual role of owner and incompetent employee creates ongoing dysfunction.</p>`;
                                }

                                result += `<p>The precedent is devastating: <span class='impact-negative'>family members are held to lower standards</span>. Non-family employees lose respect for leadership. The culture of meritocracy erodes.</p>`;

                                return result;
                            }
                        }
                    ]
                },

                // Event 6: 2010 - Michael Joins & Ownership Question
                {
                    date: "2010",
                    title: "Michael Joins & The Ownership Question",
                    description: function() {
                        let baseDesc = "Michael has graduated from college at age 23. He's energetic, loves connecting with people, and wants to join the family business in sales.\n\n";

                        // Check if Sarah already has ownership
                        if (familyMembers.sarah.ownership > 0) {
                            baseDesc += "Sarah has been working in the business for three years now and already owns " + familyMembers.sarah.ownership.toFixed(0) + "% of the company.\n\n";
                            baseDesc += "Michael looks at his older sister: \"So... when do I get ownership like Sarah?\"\n\n";
                            baseDesc += "Robert faces a decision: Should Michael receive the same ownership stake Sarah got? Or has the situation changed?\n\n";
                        } else {
                            baseDesc += "Sarah has been working in the business for three years but doesn't have ownership yet. Neither sibling owns shares.\n\n";
                            baseDesc += "Over Sunday dinner, the ownership question resurfaces.\n\n";
                            baseDesc += "\"Sarah and I have both joined the business now,\" Michael says. \"What about ownership? And what about Jennifer—does she get anything?\"\n\n";
                            baseDesc += "Jennifer (24, now a teacher) looks uncomfortable. \"I'm not in the business. But I'm still your daughter, Dad.\"\n\n";
                        }

                        baseDesc += "Robert must decide how to handle ownership distribution now that two children are in the business and one has chosen a different career.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: function() {
                                if (familyMembers.sarah.ownership > 0) {
                                    return "Give Michael same " + familyMembers.sarah.ownership.toFixed(0) + "% as Sarah (consistent treatment)";
                                } else {
                                    return "Give Michael 10% ownership (even though Sarah has none yet)";
                                }
                            },
                            effects: {
                                profit: -40000,
                                revenue: 350000,
                                michaelOwnership: 10,
                                robertOwnership: -5,
                                patriciaOwnership: -5,
                                michaelHappiness: 20,
                                sarahHappiness: function() {
                                    return familyMembers.sarah.ownership > 0 ? 5 : -10;
                                },
                                robertHappiness: 5,
                                employees: 1
                            },
                            impact: function() {
                                if (familyMembers.sarah.ownership > 0) {
                                    return `<h4>Decision Impact</h4><p>Michael receives 10% ownership, matching Sarah's stake.</p><p>"Thank you for treating us equally, Dad," Michael says with genuine gratitude.</p><p><span class='impact-highlight'>Michael</span> feels valued and committed. <span class='impact-positive'>His happiness increases significantly.</span></p><p><span class='impact-positive'>Revenue increases</span> as Michael attacks the sales role with energy and ownership mentality.</p><p>The siblings are treated consistently, avoiding resentment. However, Jennifer notices she's still excluded from ownership despite being family.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Michael receives 10% ownership—but Sarah, who has been working here for three years, still has none.</p><p>"Thank you, Dad," Michael says, though he looks uncomfortable.</p><p><span class='impact-highlight'>Sarah</span> is hurt and confused. <span class='impact-negative'>Her happiness decreases.</span> "I've been here for three years and I don't have ownership. Michael joins and gets 10% immediately?"</p><p><span class='impact-highlight'>Michael</span> feels valued but guilty about the inconsistency.</p><p>The unfair treatment damages Sarah's motivation and creates awkward family dynamics.</p>`;
                                }
                            }
                        },
                        {
                            text: "Give 10% to ALL THREE siblings equally (family unity)",
                            effects: {
                                profit: -50000,
                                revenue: 350000,
                                michaelOwnership: 10,
                                sarahOwnership: function() {
                                    // Only give Sarah 10% if she doesn't already have it
                                    return familyMembers.sarah.ownership > 0 ? 0 : 10;
                                },
                                jenniferOwnership: 10,
                                robertOwnership: -15,
                                patriciaOwnership: -15,
                                michaelHappiness: 18,
                                sarahHappiness: function() {
                                    return familyMembers.sarah.ownership > 0 ? 5 : 15;
                                },
                                jenniferHappiness: 25,
                                robertHappiness: 10,
                                employees: 1
                            },
                            impact: function() {
                                if (familyMembers.sarah.ownership > 0) {
                                    return `<h4>Decision Impact</h4><p>Robert gives 10% ownership to Michael and Jennifer. Sarah already has her 10% from when she joined.</p><p>"I won't create tiers among my children," Robert says firmly. "You're all equal in my eyes, business or not."</p><p><span class='impact-highlight'>Jennifer</span> is overwhelmed with gratitude. <span class='impact-positive'>She feels truly valued as part of the family legacy.</span></p><p><span class='impact-highlight'>Michael</span> is pleased, though slightly bothered that Jennifer gets the same stake without working.</p><p><span class='impact-highlight'>Sarah</span> appreciates the equality, though she wonders if Jennifer should get ownership without contributing to the business.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Robert gives 10% ownership to each of his three children—regardless of business involvement.</p><p>"I won't create tiers among my children," Robert says firmly. "You're all equal in my eyes, business or not."</p><p><span class='impact-highlight'>Jennifer</span> is overwhelmed with gratitude. <span class='impact-positive'>She feels truly valued as part of the family legacy.</span></p><p><span class='impact-highlight'>Michael</span> is pleased, though slightly bothered that Jennifer gets the same stake without working.</p><p><span class='impact-highlight'>Sarah</span> feels relieved to finally get ownership after three years—though she has mixed feelings that Jennifer gets the same reward for doing nothing in the business.</p>`;
                                }
                            }
                        },
                        {
                            text: "Michael gets employment but NO ownership yet—must earn it",
                            effects: {
                                profit: -20000,
                                revenue: 300000,
                                michaelHappiness: function() {
                                    return familyMembers.sarah.ownership > 0 ? -15 : -5;
                                },
                                sarahHappiness: 10,
                                jenniferHappiness: -5,
                                robertHappiness: -5,
                                employees: 1
                            },
                            impact: function() {
                                if (familyMembers.sarah.ownership > 0) {
                                    return `<h4>Decision Impact</h4><p>Michael joins as Sales Associate at market rate, but receives no ownership stake.</p><p>"Wait—Sarah got 10% when she joined," Michael says, confused and hurt. "Why am I different?"</p><p>"You need to prove yourself first," Robert explains, though the inconsistency is obvious.</p><p><span class='impact-highlight'>Michael</span> feels second-class compared to his sister. <span class='impact-negative'>His happiness decreases significantly.</span> His motivation suffers from the perceived unfairness.</p><p><span class='impact-highlight'>Sarah</span> feels awkward—she knows the treatment is inconsistent and feels bad for her brother.</p><p>The unfair treatment plants deep seeds of resentment.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Michael joins as Sales Associate at market rate, but receives no ownership stake—same as Sarah.</p><p>"So neither of us gets ownership?" Michael asks.</p><p>"Not yet," Robert says. "You both need to earn it."</p><p><span class='impact-highlight'>Michael</span> is disappointed but appreciates the consistent treatment. At least he's not being singled out.</p><p><span class='impact-highlight'>Sarah</span> feels validated that the ownership bar applies equally to both of them.</p><p>The consistent approach is fair, though both siblings wonder when ownership will come.</p>`;
                                }
                            }
                        }
                    ]
                },

                // Event 7: 2012 - Succession Discussion
                {
                    date: "2012",
                    title: "The Sunday Dinner Discussion",
                    description: function() {
                        let baseDesc = "Robert is now 53. Over Sunday dinner, he brings up succession planning.\n\n\"I'm not retiring tomorrow,\" he says, \"but we need to talk about the future. About who will lead this company when I step back.\"\n\nThe table goes quiet.\n\nSarah has been COO for a year now. She's earned it—working 60-hour weeks, taking on more responsibility, making tough calls. She glances at Robert hopefully.\n\nMichael sets down his fork. He runs sales and has brought in significant new business, though his management skills are less developed than Sarah's. \"Are we really having this conversation now?\" he asks.\n\n";

                        if (familyMembers.jennifer.ownership > 0) {
                            baseDesc += "Jennifer, who became a teacher, looks concerned. She owns " + familyMembers.jennifer.ownership.toFixed(0) + "% and depends on dividends. \"Whoever leads, I just hope they remember that some of us aren't in the business.\"\n\n";
                        } else {
                            baseDesc += "Jennifer, who became a teacher, looks concerned. She doesn't own any shares. \"I'm not in the business, but I still care who leads it,\" she says quietly.\n\n";
                        }

                        baseDesc += "Patricia touches Robert's hand. This is a minefield.\n\nShould he commit to Sarah as next CEO? Keep options open and evaluate both over time? This decision will shape family dynamics for years.";
                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Commit to Sarah as next CEO within 5 years",
                            effects: {
                                sarahHappiness: 20,
                                michaelHappiness: -15,
                                robertHappiness: 5,
                                revenue: 300000,
                                profit: 50000,
                                managementQuality: 8
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert announces that Sarah will become CEO when he steps down, likely within five years.</p><p><span class='impact-highlight'>Sarah</span> is energized and relieved. <span class='impact-positive'>Her happiness increases dramatically</span> and she works even harder. <span class='impact-positive'>Business performance improves under her clear leadership path.</span></p><p><span class='impact-highlight'>Michael</span> is disappointed and hurt. <span class='impact-negative'>His happiness drops significantly</span>—he feels his contributions are undervalued.</p><p><span class='impact-highlight'>Robert</span> appreciates the clarity, though he worries about Michael's reaction.</p>`
                        },
                        {
                            text: "Keep options open—evaluate both Sarah and Michael over time",
                            effects: {
                                sarahHappiness: -12,
                                michaelHappiness: 8,
                                robertHappiness: -8,
                                profit: -30000,
                                managementQuality: -4
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert decides not to commit to anyone yet, saying both Sarah and Michael will be evaluated over the next several years.</p><p><span class='impact-highlight'>Sarah</span> is frustrated and hurt. After years of hard work and clear qualification, <span class='impact-negative'>her happiness decreases</span>. She wonders if she should look for CEO opportunities elsewhere.</p><p><span class='impact-highlight'>Michael</span> feels he still has a shot and his <span class='impact-positive'>happiness improves</span>.</p><p>The ambiguity creates tension. <span class='impact-negative'>Business performance suffers slightly</span> from the uncertainty and sibling competition.</p>`
                        }
                    ]
                },
                
                // Event 8: 2014 - Growth Opportunity
                {
                    date: "2014",
                    title: "The Major Contract",
                    description: function() {
                        let baseDesc = "A Fortune 100 company has offered Anderson Packaging a massive contract: $3M annually for five years.\n\nThe catch: fulfilling it requires a $1.2M investment in new equipment and hiring 20 additional workers.\n\n";

                        // Build narrative based on ownership structure
                        const sarahOwn = familyMembers.sarah.ownership;
                        const michaelOwn = familyMembers.michael.ownership;
                        const jenOwn = familyMembers.jennifer.ownership;
                        const robertOwn = familyMembers.robert.ownership;

                        baseDesc += "At the family meeting, Sarah presents her analysis: \"This is a 22% ROI over five years. It's an incredible opportunity.\"\n\nMichael agrees enthusiastically: \"This could transform the company. We can't pass this up.\"\n\n";

                        if (jenOwn > 0) {
                            baseDesc += "Jennifer shifts uncomfortably. \"But what about dividends? I own " + jenOwn.toFixed(0) + "% of this company. I'm trying to save for a house, and teaching doesn't pay much. You're talking about years with no dividends.\"\n\n";
                        } else {
                            baseDesc += "Jennifer speaks up quietly: \"What about me? I don't own shares, but I'm still part of this family. You're all building wealth through this business while I can barely afford rent.\"\n\n";
                        }

                        baseDesc += "\"The business comes first, Jen,\" Michael says impatiently.\n\n\"Easy for you to say—you get a salary from the company,\" Jennifer shoots back. \"";

                        if (jenOwn > 0) {
                            baseDesc += "But I'm an owner too. Don't I get a vote on whether we reinvest everything I own into your growth plans?\"\n\n";
                        } else {
                            baseDesc += "You and Sarah are building careers and equity. What am I building?\"\n\n";
                        }

                        baseDesc += "Robert looks around the table. Sarah and Michael work in the business and want growth. Jennifer ";
                        baseDesc += jenOwn > 0 ? "owns shares but doesn't work there. " : "doesn't work there and has no ownership. ";

                        baseDesc += "\n\nThis raises a fundamental question: Who gets to decide how capital is allocated in a family business? Those who work in it? Those who own it? Or should all family members have equal say?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept contract—business growth over dividends",
                            effects: {
                                revenue: 3000000,
                                profit: 180000,  // 6% margin on cardboard
                                cash: -1200000,
                                assets: 1200000,
                                debt: 500000,
                                sarahHappiness: 15,
                                michaelHappiness: 15,
                                jenniferHappiness: -20,
                                robertHappiness: 5,
                                hasDebt: true
                            },
                            impact: function() {
                                const jenOwn = familyMembers.jennifer.ownership;
                                if (jenOwn > 0) {
                                    return `<h4>Decision Impact</h4><p>Robert sides with Sarah and Michael. The company accepts the contract and makes the major investment. <span class='impact-positive'>Revenue increases by $3M annually</span> and <span class='impact-positive'>company valuation rises substantially</span>.</p><p>However, <span class='impact-negative'>cash is depleted and the company takes on $500K in debt</span> to complete the investment.</p><p><span class='impact-highlight'>Sarah and Michael</span> are thrilled with the growth opportunity.</p><p><span class='impact-highlight'>Jennifer</span> feels powerless. <span class='impact-negative'>Her happiness drops significantly.</span> "I own ${jenOwn.toFixed(0)}% but apparently that doesn't matter. You all just decided for me." Her dividend income disappears for years.</p><p>The decision establishes a precedent: <span class='impact-negative'>active family members control decisions</span>, even over passive owners' objections.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Robert sides with Sarah and Michael. The company accepts the contract and makes the major investment. <span class='impact-positive'>Revenue increases by $3M annually</span> and <span class='impact-positive'>company valuation rises substantially</span>.</p><p>However, <span class='impact-negative'>cash is depleted and the company takes on $500K in debt</span> to complete the investment.</p><p><span class='impact-highlight'>Sarah and Michael</span> are thrilled with the growth opportunity.</p><p><span class='impact-highlight'>Jennifer</span> is devastated. <span class='impact-negative'>Her happiness drops significantly.</span> "So I just... don't matter? You all get to build wealth while I struggle?" She stops attending family dinners for months.</p><p>The growing wealth gap between family members in the business and those outside it becomes painfully visible.</p>`;
                                }
                            }
                        },
                        {
                            text: "Decline contract—protect Jennifer's financial needs",
                            effects: {
                                cash: 200000,
                                sarahHappiness: -15,
                                michaelHappiness: -15,
                                jenniferHappiness: 15,
                                robertHappiness: -10
                            },
                            impact: function() {
                                const jenOwn = familyMembers.jennifer.ownership;
                                if (jenOwn > 0) {
                                    return `<h4>Decision Impact</h4><p>Robert declines the contract to honor Jennifer's ownership rights and financial needs.</p><p><span class='impact-highlight'>Jennifer</span> is relieved—<span class='impact-positive'>her dividend income continues</span>, and she can proceed with buying her house. Her ownership stake is finally being respected.</p><p><span class='impact-highlight'>Sarah and Michael</span> are furious. <span class='impact-negative'>Their happiness decreases significantly.</span> "We're letting Jennifer's ${jenOwn.toFixed(0)}% ownership block a transformational opportunity? This is insane," Michael says bitterly.</p><p>Sarah starts quietly exploring CEO opportunities at other companies. The family business feels like a cage.</p><p>The decision establishes a different precedent: <span class='impact-negative'>ownership rights can block operational growth</span>, even when it hurts the business.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Robert declines the contract to protect family harmony and Jennifer's needs, even though she doesn't own shares.</p><p><span class='impact-highlight'>Jennifer</span> is relieved and grateful that she still matters to the family.</p><p><span class='impact-highlight'>Sarah and Michael</span> are furious. <span class='impact-negative'>Their happiness decreases significantly.</span> "We're turning down a transformational opportunity for Jennifer, who doesn't even work here or own shares? This is insane," Michael says bitterly.</p><p>Sarah starts quietly exploring CEO opportunities at other companies. The family business feels like it prioritizes everyone except those who actually run it.</p>`;
                                }
                            }
                        },
                        {
                            text: "Compromise: Accept contract but guarantee Jennifer dividend priority",
                            effects: {
                                revenue: 3000000,
                                profit: 180000,
                                cash: -1200000,
                                assets: 1200000,
                                debt: 500000,
                                sarahHappiness: 8,
                                michaelHappiness: 8,
                                jenniferHappiness: 10,
                                robertHappiness: 10,
                                hasDebt: true
                            },
                            impact: function() {
                                const jenOwn = familyMembers.jennifer.ownership;
                                if (jenOwn > 0) {
                                    return `<h4>Decision Impact</h4><p>Robert proposes a compromise: accept the contract, but guarantee Jennifer receives dividends equal to 8% return on her ownership stake annually, even during the investment period.</p><p><span class='impact-positive'>Revenue grows substantially</span>, and <span class='impact-positive'>company valuation increases</span>. <span class='impact-negative'>The company takes on debt</span> to fund both the investment and Jennifer's dividends.</p><p>Everyone is moderately satisfied but not thrilled. <span class='impact-highlight'>Sarah and Michael</span> feel they're "paying Jennifer" for growth. <span class='impact-highlight'>Jennifer</span> appreciates being considered but wonders if she's now seen as a burden.</p><p>The compromise establishes important precedent: <span class='impact-positive'>passive owners have rights that must be balanced with business needs</span>. But it's messy and expensive.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Robert proposes a compromise: accept the contract, but the family will personally support Jennifer with $30K annually during the investment period.</p><p><span class='impact-positive'>Revenue grows substantially</span>, and <span class='impact-positive'>company valuation increases</span>. <span class='impact-negative'>The company takes on debt</span> for the investment.</p><p>Everyone is moderately satisfied. <span class='impact-highlight'>Jennifer</span> feels the family cares about her welfare even though she's not in the business.</p><p><span class='impact-highlight'>Sarah and Michael</span> accept this but wonder: "Will Jennifer always constrain our decisions? Should we have given her ownership just to formalize this?"</p><p>The compromise keeps family harmony but raises questions about fairness and precedent.</p>`;
                                }
                            }
                        }
                    ]
                },
                
                // Event 9: 2016 - Michael's Compensation Conflict
                {
                    date: "2016",
                    title: "The Compensation Debate",
                    description: `Michael requests a meeting with Robert. He's done the math.\n\n"I've brought in significant new business—my sales results have been exceptional," Michael explains. "But Sarah makes considerably more as COO. I understand her role has more responsibility, but my results speak for themselves."\n\nHe has a point. Michael's sales performance has been exceptional. But Sarah's role requires more expertise, works longer hours, and carries ultimate operational responsibility.\n\nFair isn't always equal. Equal isn't always fair.\n\nRobert needs to decide how to value different types of contributions.`,
                    options: [
                        {
                            text: "Increase Michael's salary to $160K to recognize his sales success",
                            effects: {
                                profit: -40000,
                                revenue: 500000,  // Michael brings in new sales
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
                
                // Event 10: 2018 - Professionalization & Governance
                {
                    date: "2018",
                    title: "Professionalization Decisions",
                    description: function() {
                        let baseDesc = "Anderson Packaging has reached a critical juncture. The company employs 35+ people and generates over $8M in revenue. But Robert senses they're hitting a ceiling.\n\nTwo opportunities have emerged simultaneously:\n\n1. A headhunter has approached Robert about Amanda Chen, a highly experienced COO from a $75M packaging company. She could bring sophisticated management expertise—but would displace Sarah.\n\n2. Robert's advisor strongly recommends adding independent directors to the board: \"You need outside perspective and accountability. Right now, it's just family making all the decisions. That works until it doesn't.\"\n\n";

                        if (familyMembers.patricia.ownership > 0) {
                            baseDesc += "Patricia agrees: \"The advisor is right. We're too insular. We need people who can challenge our thinking and bring industry expertise.\"\n\n";
                        }

                        baseDesc += "Sarah is concerned: \"Independent directors means outsiders scrutinizing our decisions and family dynamics. They might push us toward decisions that maximize profit over family values.\"\n\n";

                        if (!gameState.michaelLeft) {
                            baseDesc += "Michael worries: \"Will independent directors support family employment, or will they want to replace us with non-family professionals?\"\n\n";
                        }

                        baseDesc += "This is a defining moment about governance: How professional should the family business become? Do they bring in outside executives? Outside directors? Both? Or neither?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Add 3 independent directors to board—keep family management intact",
                            effects: {
                                revenue: 800000,
                                profit: 150000,
                                robertHappiness: 15,
                                sarahHappiness: 12,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : 10; },
                                managementQuality: 12,
                                hasIndependentBoard: true
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>Robert recruits three independent directors: a former CEO of a packaging company, a CFO with manufacturing experience, and a family business governance expert.</p><p>The board meets quarterly and provides rigorous oversight. <span class='impact-positive'>Revenue and profit increase</span> from better strategic guidance. <span class='impact-positive'>Management quality improves significantly.</span></p><p>The independent directors challenge family decisions and bring accountability—but they also respect the family's values and commitment to keeping management within the family.</p><p><span class='impact-highlight'>Robert and Sarah</span> appreciate the outside perspective, even when it's uncomfortable. The business becomes more professional without displacing family leadership.</p><p><span class='impact-highlight'>This governance structure will serve the family for generations.</span> Future family leaders will inherit a board that provides guidance and accountability.</p>`;
                            }
                        },
                        {
                            text: "Hire Amanda as COO + add 2 independent directors—full professionalization",
                            effects: {
                                revenue: 1800000,
                                profit: 200000,
                                assets: 1200000,
                                robertOwnership: -2,
                                sarahOwnership: -2,
                                michaelOwnership: -1,
                                jenniferOwnership: -1,
                                sarahHappiness: -25,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : -12; },
                                robertHappiness: 12,
                                hasOutsideCOO: true,
                                hasIndependentBoard: true,
                                managementQuality: 20
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>Robert makes a bold move: hire Amanda Chen as COO (Sarah moves to VP of Operations) AND add two independent directors to provide governance oversight.</p><p><span class='impact-positive'>The transformation is dramatic. Revenue and profit surge under professional management and board oversight.</span> <span class='impact-positive'>Management quality reaches new heights.</span></p><p><span class='impact-highlight'>Sarah</span> is devastated by the demotion. <span class='impact-negative'>Her happiness drops significantly.</span> After years of leadership, she's been displaced by a non-family executive. She questions her future in the company.</p><p>The independent directors support the decision: "This is what's best for the business." But they also note the family pain it causes.</p><p>The company is now highly professionalized—but at significant cost to family relationships and Sarah's commitment.</p>`;
                            }
                        },
                        {
                            text: "Keep it family-only—no outside executives or directors",
                            effects: {
                                profit: -80000,
                                sarahHappiness: 15,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : 12; },
                                robertHappiness: -10,
                                managementQuality: -5
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>Robert declines both opportunities. Anderson Packaging will remain fully family-controlled in management and governance.</p><p>"This is a family business," Robert explains. "We'll succeed or fail as a family."</p><p><span class='impact-highlight'>Sarah` + (gameState.michaelLeft ? "" : ` and Michael`) + `</span> ` + (gameState.michaelLeft ? "is" : "are") + ` relieved and grateful. <span class='impact-positive'>` + (gameState.michaelLeft ? "She feels" : "They feel") + ` secure in the family business.</span></p><p>However, <span class='impact-negative'>performance stagnates</span>. Without outside perspective, the family makes insular decisions and misses opportunities. The company lacks the strategic sophistication of competitors.</p><p><span class='impact-highlight'>Robert</span> wonders if he's held the business back by prioritizing family comfort over professional growth. The decision limits future options.</p>`;
                            }
                        }
                    ]
                },
                
                // Event 11: 2020 - Family Governance Formalization
                {
                    date: "2020",
                    title: "Formalizing Family Governance",
                    description: function() {
                        let baseDesc = "Anderson Packaging now spans multiple family members across two generations. The informal decision-making that worked when it was just Robert and Patricia has become increasingly chaotic.\n\n";

                        const jenOwn = familyMembers.jennifer.ownership;
                        const sarahOwn = familyMembers.sarah.ownership;
                        const michaelOwn = familyMembers.michael.ownership;

                        if (jenOwn > 0) {
                            baseDesc += "Recent tensions have highlighted the problem: Jennifer (who owns " + jenOwn.toFixed(0) + "% but doesn't work in the business) feels excluded from decisions. ";
                        } else {
                            baseDesc += "Recent tensions have highlighted the problem: Jennifer feels completely powerless and excluded from family business decisions. ";
                        }

                        if (!gameState.michaelLeft) {
                            baseDesc += "Michael and Sarah sometimes disagree on strategy but have no formal process for resolving conflicts.\n\n";
                        } else {
                            baseDesc += "Michael's departure was traumatic, partly because there was no formal governance structure to address his concerns.\n\n";
                        }

                        baseDesc += "A family business consultant reviews their situation: \"You need formal family governance structures. You're making decisions ad-hoc, which breeds resentment and inefficiency.\"\n\nThe consultant recommends:\n\n";
                        baseDesc += "1. **Family Council** - Regular meetings for ALL family members (working or not) to discuss family matters, values, and concerns\n";
                        baseDesc += "2. **Family Constitution** - Written document defining roles, decision rights, conflict resolution, and succession principles\n";
                        baseDesc += "3. **Formal Voting Rules** - Clear rules about who votes on what decisions (ownership-based vs family-based)\n\n";

                        if (familyMembers.patricia.ownership > 0) {
                            baseDesc += "Patricia strongly supports formalization: \"We need structure. Right now, every decision becomes a negotiation and someone always feels slighted.\"\n\n";
                        }

                        baseDesc += "Sarah sees both sides: \"Structure could help, but it also means giving up some flexibility. Do we really want to be bound by formal rules?\"\n\n";

                        if (jenOwn > 0) {
                            baseDesc += "Jennifer is enthusiastic: \"Finally, a voice for passive shareholders! I've felt powerless for years.\"\n\n";
                        } else {
                            baseDesc += "Jennifer is hopeful: \"Maybe this means my voice would finally matter, even though I don't own shares.\"\n\n";
                        }

                        baseDesc += "This decision will fundamentally shape how the family governs itself for generations.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Implement full governance structure (Family Council + Constitution + Voting Rules)",
                            effects: {
                                robertHappiness: 10,
                                sarahHappiness: 15,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : 12; },
                                jenniferHappiness: 20,
                                patriciaHappiness: 15,
                                managementQuality: 15,
                                hasFamilyCouncil: true,
                                hasFamilyConstitution: true
                            },
                            impact: function() {
                                const jenOwn = familyMembers.jennifer.ownership;
                                return `<h4>Decision Impact</h4><p>The Anderson family implements comprehensive governance structures:</p><p><span class='impact-positive'>Family Council meets quarterly</span> to discuss family matters separate from business operations. ALL family members participate, regardless of employment or ownership.</p><p><span class='impact-positive'>Family Constitution documents</span> core principles: how family members join the business, performance expectations, ownership transfer rules, dividend policies, and conflict resolution processes.</p><p><span class='impact-positive'>Voting rules are clarified</span>: operational decisions require management authority, strategic decisions require ownership majority, family decisions use one-person-one-vote.</p><p><span class='impact-highlight'>Jennifer</span> finally has a formal voice. ` + (jenOwn > 0 ? "Her ownership rights are now clearly defined and respected." : "Even without ownership, she can participate in family governance.") + `</p><p>The structure creates accountability and reduces ad-hoc conflicts. <span class='impact-positive'>Family harmony improves significantly.</span></p><p><span class='impact-highlight'>This governance foundation will serve the family for generations.</span> When Gen 3 enters, clear rules already exist.</p>`;
                            }
                        },
                        {
                            text: "Implement Family Council only—keep constitution and voting informal",
                            effects: {
                                robertHappiness: 5,
                                sarahHappiness: 8,
                                jenniferHappiness: 10,
                                managementQuality: 5,
                                hasFamilyCouncil: true
                            },
                            impact: `<h4>Decision Impact</h4><p>The family establishes quarterly Family Council meetings where everyone can voice concerns and discuss family matters.</p><p><span class='impact-positive'>Communication improves</span> as family members have a regular forum. Tensions decrease from better dialogue.</p><p>However, without a written constitution or formal voting rules, <span class='impact-negative'>many governance questions remain ambiguous</span>. The Council can discuss issues, but decision authority is still unclear.</p><p>"Who actually decides?" becomes a recurring question. Some family members feel heard but not empowered.</p><p>The moderate approach provides some structure without full commitment to formal governance.</p>`
                        },
                        {
                            text: "Keep governance informal—maintain flexibility and family discretion",
                            effects: {
                                robertHappiness: -5,
                                sarahHappiness: -10,
                                jenniferHappiness: -25,
                                managementQuality: -8
                            },
                            impact: function() {
                                const jenOwn = familyMembers.jennifer.ownership;
                                let result = `<h4>Decision Impact</h4><p>Robert decides against formal governance structures. "We're a family, not a corporation. We'll work things out as they come."</p>`;

                                result += `<p><span class='impact-highlight'>Jennifer</span> is devastated. <span class='impact-negative'>Her happiness plummets.</span> "So I just... don't matter? My voice will never be heard in this family?"</p>`;

                                if (jenOwn > 0) {
                                    result += `<p>Despite owning ${jenOwn.toFixed(0)}% of the company, Jennifer has no formal mechanism to exercise her ownership rights or influence decisions.</p>`;
                                }

                                result += `<p><span class='impact-negative'>Family conflicts continue unresolved.</span> Without clear governance, every major decision becomes a power struggle or emotional negotiation.</p><p><span class='impact-highlight'>Sarah</span> is frustrated—she needs clear authority to lead effectively. The lack of structure undermines professional management.</p><p>The decision to stay informal works for Robert but creates lasting dysfunction for the next generation. When Gen 3 arrives, they'll inherit governance chaos.</p>`;

                                return result;
                            }
                        }
                    ]
                },
                
                // Event 12: 2022 - Robert's Health Scare
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
                                sarahCEO: true,
                                managementQuality: 12
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
                                revenue: -400000,
                                managementQuality: -7
                            },
                            impact: `<h4>Decision Impact</h4><p>Robert stays on as CEO, promising to work less and delegate more.</p><p>In practice, he can't let go. He still involves himself in day-to-day decisions. <span class='impact-negative'>The company suffers from indecisive leadership</span> as responsibility is unclear.</p><p><span class='impact-highlight'>Sarah</span> is deeply frustrated. <span class='impact-negative'>Her happiness decreases substantially</span>—even a health scare wasn't enough to trigger real succession.</p><p>She begins quietly exploring CEO opportunities at other companies.</p>`
                        }
                    ]
                },
                
                // Event 13: 2024 - Michael's External Offer
                {
                    date: "2024",
                    title: "Michael's Crossroads",
                    description: function() {
                        var baseDesc = "Michael has received an offer from a competitor: $200K salary plus substantial equity and a VP title. It's a clear path to eventual CEO.\n\n";

                        // Check if compensation conflict was resolved in his favor
                        var compensationEvent = gameState.decisions.find(function(d) { return d.event === 9; });
                        if (compensationEvent && compensationEvent.choice === 0) {
                            baseDesc += "\"Dad, I appreciate that you increased my salary a few years ago,\" Michael says. \"But even at $160K, I'm still watching Sarah make more strategic decisions while I'm stuck in sales.\"\n\n";
                        } else if (compensationEvent && compensationEvent.choice === 1) {
                            baseDesc += "\"Dad, remember when I asked about my compensation years ago? You explained that different roles have different pay. Well, this new role would finally value my contributions properly.\"\n\n";
                        } else {
                            baseDesc += "He comes to Robert: \"Dad, I love this company, but I need to know there's a future for me here.\"\n\n";
                        }

                        baseDesc += "Sarah is CEO. You're Executive Chairman. Where do I fit long-term?\"\n\nRobert is quiet for a long moment.\n\nMichael continues: \"I've given everything to this business. But I need to know—is there actually a path for me here, or am I just the sales guy forever while Sarah runs everything?\"\n\n\"Michael, you're not 'just the sales guy'—\" Robert starts.\n\n\"Then what am I, Dad?\" Michael's voice cracks slightly. \"What's my future here?\"\n\nLosing Michael would hurt the company significantly—he brings in 40% of new business. But keeping him might require creating a role that's somewhat artificial.";
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
                                michaelOwnership: function() {
                                    return -familyMembers.michael.ownership;
                                },
                                robertOwnership: function() {
                                    return familyMembers.michael.ownership * 0.7;
                                },
                                sarahOwnership: function() {
                                    return familyMembers.michael.ownership * 0.3;
                                }
                            },
                            impact: function() {
                                const michaelOwn = familyMembers.michael.ownership;

                                if (michaelOwn > 0) {
                                    return `<h4>Decision Impact</h4><p>Michael leaves Anderson Packaging for the competitor. <span class='impact-negative'>Revenue and profit drop sharply</span> without his sales leadership.</p><p><span class='impact-highlight'>Michael</span> is heartbroken. <span class='impact-negative'>His happiness plummets</span>—he wanted to stay but felt there was no path forward.</p><p>He sells his ${michaelOwn.toFixed(0)}% ownership back to the family. The entire Anderson family is devastated by his departure.</p><p>Sunday dinners become awkward. The family business has fractured the family.</p>`;
                                } else {
                                    return `<h4>Decision Impact</h4><p>Michael leaves Anderson Packaging for the competitor. <span class='impact-negative'>Revenue and profit drop sharply</span> without his sales leadership.</p><p><span class='impact-highlight'>Michael</span> is heartbroken. <span class='impact-negative'>His happiness plummets</span>—he wanted to stay but felt there was no path forward.</p><p>The entire Anderson family is devastated by his departure. He never received ownership, and now he's gone.</p><p>Sunday dinners become awkward. The family business has fractured the family.</p>`;
                                }
                            }
                        }
                    ]
                },
                
                // Event 14: 2026 - The Acquisition Offer
                {
                    date: "2026",
                    title: "The Temptation",
                    description: function() {
                        var offerAmount = gameState.revenue > 10000000 ? 35 : 28;
                        var baseDesc = "A private equity firm has made an unsolicited offer: $" + offerAmount + "M for Anderson Packaging.\n\n";

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
                            text: "Decline—keep Anderson Packaging family-owned",
                            effects: {
                                robertHappiness: 15,
                                sarahHappiness: 15,
                                jenniferHappiness: -30
                            },
                            impact: `<h4>Decision Impact</h4><p>The family chooses legacy over liquidity.</p><p><span class='impact-highlight'>Robert and Sarah</span> feel proud of maintaining independence and continuing the family business into its second generation.</p><p><span class='impact-highlight'>Jennifer</span> is devastated. <span class='impact-negative'>Her happiness plummets</span>—she watched nearly $3M disappear. She's still struggling financially while her siblings run a company she doesn't work for.</p><p>The decision creates a lasting rift. Jennifer feels her needs are always subordinated to the business.</p>`
                        }
                    ]
                },
                
                // Event 15: 2028 - Quality Crisis & Family Accountability
                {
                    date: "2028",
                    title: "The Quality Crisis",
                    description: function() {
                        var baseDesc = "A major client has discovered defects in Anderson Packaging's products. The problem affects $2.5M worth of delivered goods. The client is threatening to terminate their contract and sue.\n\nThe Anderson family name is on the line.\n\n";

                        const sarahIsCEO = gameState.sarahCEO;
                        const michaelStillHere = !gameState.michaelLeft;
                        const robertRetired = gameState.robertRetired;

                        // Determine root cause narrative
                        var growthEvent = gameState.decisions.find(function(d) { return d.event === 8; });
                        if (growthEvent && growthEvent.choice === 0) {
                            baseDesc += "Sarah's investigation reveals the root cause: the aggressive growth from that major contract years ago. The team was stretched too thin, and quality control protocols were compromised.\n\n";
                        } else if (gameState.hasDebt && gameState.debt > 500000) {
                            baseDesc += "Sarah's investigation reveals the root cause: under pressure from debt obligations, quality inspections were loosened to reduce costs.\n\n";
                        } else {
                            baseDesc += "Sarah's investigation reveals the root cause: aggressive growth targets led to loosened quality control.\n\n";
                        }

                        // Family accountability conversation
                        if (sarahIsCEO) {
                            baseDesc += "\"This happened on my watch,\" Sarah says, her voice tight. \"I'm the CEO. This is my responsibility.\"\n\n";
                            if (!robertRetired) {
                                baseDesc += "Robert shakes his head. \"Sarah, some of these problems started years ago, during my leadership. We share this.\"\n\n";
                            }
                            if (michaelStillHere) {
                                baseDesc += "Michael speaks up: \"I run sales—I'm the one who pushed for those aggressive timelines to land clients. I'm culpable too.\"\n\n";
                            }
                        } else {
                            baseDesc += "Robert, still CEO, reviews the findings grimly. \"This happened under my leadership,\" he says.\n\nSarah tries to be diplomatic: \"Dad, this was a systemic issue. It's not about one person.\"\n\n";
                            if (michaelStillHere) {
                                baseDesc += "Michael adds: \"We all made decisions that led here. The whole family leadership bears responsibility.\"\n\n";
                            }
                        }

                        baseDesc += "\nThe question isn't just about the right thing to do—it's about what the Anderson name means. ";
                        baseDesc += "Robert built this company on integrity. If the family compromises now to save money, what does that say about the Anderson legacy?\n\n";

                        baseDesc += "But there's also a practical question: Should the family personally contribute money to make this right, or is this purely a business expense?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Accept full responsibility—family personally contributes $500K of the $1.8M cost",
                            effects: {
                                profit: -1800000,
                                cash: -1800000,
                                revenue: 1000000,
                                assets: 500000,
                                robertOwnership: 2,  // Family puts personal money in
                                sarahOwnership: 1,
                                michaelOwnership: function() { return gameState.michaelLeft ? 0 : 0.5; },
                                sarahHappiness: 15,
                                robertHappiness: 20,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : 10; },
                                managementQuality: 10
                            },
                            impact: function() {
                                const michaelStillHere = !gameState.michaelLeft;
                                const familyContrib = michaelStillHere ? "$500K split three ways" : "$500K split between Robert and Sarah";

                                return `<h4>Decision Impact</h4><p>The Anderson family makes a powerful statement: they personally contribute ${familyContrib} from their own wealth, with the company covering the remaining $1.3M.</p><p>"The Anderson name means something," ` + (gameState.sarahCEO ? "Sarah" : "Robert") + ` announces publicly. "When we fail, we own it completely."</p><p><span class='impact-negative'>The total cost is enormous</span>, but the client is deeply impressed. <span class='impact-positive'>They not only maintain the contract but increase it</span> and refer new business.</p><p>The personal financial sacrifice by the family sends a powerful message to employees: <span class='impact-positive'>leadership accountability is real</span>, not just words.</p><p>The Anderson family's reputation for integrity becomes legendary in the industry. Competitors talk about this decision for years.</p>`;
                            }
                        },
                        {
                            text: "Company accepts full responsibility and bears the $1.8M cost",
                            effects: {
                                profit: -1800000,
                                cash: -1800000,
                                revenue: 1000000,
                                assets: 500000,
                                sarahHappiness: 10,
                                robertHappiness: 12,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : 8; },
                                managementQuality: 7
                            },
                            impact: `<h4>Decision Impact</h4><p>The company accepts full responsibility. <span class='impact-negative'>The business takes a major financial hit</span> for recalls and rebuilding quality systems.</p><p>The client is impressed by the integrity. <span class='impact-positive'>They maintain the contract and eventually increase it.</span></p><p><span class='impact-highlight'>The Anderson family</span> feels they've upheld their values, though some wonder if personal family contribution would have sent a stronger message about accountability.</p><p>Employee morale improves—leadership did the right thing, even though it was expensive.</p>`
                        },
                        {
                            text: "Settle quietly for $600K—protect family wealth and business",
                            effects: {
                                profit: -600000,
                                cash: -600000,
                                revenue: -800000,
                                sarahHappiness: -18,
                                robertHappiness: -25,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : -12; },
                                hasQualityIssues: true,
                                managementQuality: -12
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>The family chooses the cheaper settlement, avoiding full accountability.</p><p>The client accepts the settlement but terminates the contract. <span class='impact-negative'>Revenue decreases substantially.</span> Word spreads in the industry that the Andersons cut corners.</p><p><span class='impact-highlight'>Robert</span> is devastated. <span class='impact-negative'>His happiness plummets.</span> "I spent 30+ years building a reputation for integrity. We just sold it for $1.2M in savings."</p><p><span class='impact-highlight'>Sarah</span> also struggles with deep regret. ` + (gameState.sarahCEO ? "As CEO, she feels she's betrayed her father's legacy." : "She wonders if she should have pushed harder for full accountability.") + `</p><p>Employees lose respect for family leadership. <span class='impact-negative'>Some of the best people start quietly looking for other jobs.</span> The company culture shifts—integrity is negotiable after all.</p>`;
                            }
                        }
                    ]
                },
                
                // Event 16: 2030 - Third Generation
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
                            impact: `<h4>Decision Impact</h4><p>The family creates a formal policy: all third-generation members must work elsewhere for at least three years and demonstrate relevant skills before joining Anderson Packaging.</p><p><span class='impact-highlight'>Sarah and Robert</span> believe this professionalizes the business and ensures competence over family privilege.</p><p><span class='impact-highlight'>Jennifer</span> worries this policy disadvantages her son Lucas, who is younger and less obviously business-oriented than Emily and David.</p><p>The policy sets important precedents for the future, though it may create resentment.</p>`
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
                
                // Event 17: 2032 - Jennifer's Buyout Request (only if she has ownership)
                {
                    date: "2032",
                    title: function() {
                        return familyMembers.jennifer.ownership > 0 ? "Jennifer's Request" : "Jennifer's Financial Struggle";
                    },
                    condition: function() {
                        // Only show this event if Jennifer has ownership OR if we want alternate version
                        return true; // Show either version depending on ownership
                    },
                    description: function() {
                        const jenOwnership = familyMembers.jennifer.ownership;

                        if (jenOwnership > 0) {
                            const valuation = jenOwnership * 300000; // Rough valuation
                            const valuationM = (valuation / 1000000).toFixed(1);

                            return `Jennifer has come to the family with a difficult conversation. She's now 40, still teaching, and she'd like the company to buy out her ${jenOwnership.toFixed(0)}% stake.\n\n"I've been patient," she says, her voice shaking slightly. "I've supported all of your decisions. Every time the business needed something, I voted yes. When you wanted to reinvest instead of paying dividends, I said okay."\n\nShe takes a breath: "But I'm 40 years old. I don't work in the business. I rarely see dividends. And I need capital. I want to buy a house. I want to secure my retirement. I'm asking you to buy me out for $${valuationM}M—that's fair value based on recent offers."\n\nSarah shifts uncomfortably. ${gameState.michaelLeft ? '' : 'Michael looks away.'}\n\n"I know it's not easy," Jennifer continues. "But I've been a passive shareholder for decades with almost no benefit. When does my financial security matter?"\n\nThis would require the company to use cash reserves or take on debt. But Jennifer has a point.`;
                        } else {
                            return `Jennifer calls a family meeting. She's now 40, still teaching, and she's struggling financially.\n\n"I know I don't own any shares," she says, her voice shaking slightly. "I chose teaching instead of the business. That was my choice, and I accept it."\n\nShe takes a breath: "But I'm watching you all build wealth through this company while I can barely afford rent. I can't buy a house. I can't save for retirement. And I'm starting to wonder... do I even matter to this family?"\n\nSarah shifts uncomfortably. ${gameState.michaelLeft ? '' : 'Michael looks away.'}\n\n"I'm not asking for a handout," Jennifer continues. "But could the company hire me for something? Give me a role? Or... maybe it's time to finally give me an ownership stake?"\n\nThis is awkward. Jennifer has never worked in the business and has no relevant skills. But she's family.`;
                        }
                    },
                    options: function() {
                        const jenOwnership = familyMembers.jennifer.ownership;

                        if (jenOwnership > 0) {
                            // Jennifer HAS ownership - buyout options
                            const buyoutValue = jenOwnership * 300000;
                            const buyoutValueM = (buyoutValue / 1000000).toFixed(1);

                            return [
                                {
                                    text: `Buy out Jennifer's ${jenOwnership.toFixed(0)}% for $${buyoutValueM}M`,
                                    effects: {
                                        cash: -buyoutValue,
                                        debt: Math.max(0, buyoutValue - gameState.cash),
                                        jenniferOwnership: -jenOwnership,
                                        robertOwnership: jenOwnership * 0.7,
                                        sarahOwnership: jenOwnership * 0.3,
                                        jenniferHappiness: 25,
                                        hasDebt: true
                                    },
                                    impact: `<h4>Decision Impact</h4><p>The family buys out Jennifer's ${jenOwnership.toFixed(0)}% stake for $${buyoutValueM}M.</p><p><span class='impact-highlight'>Jennifer</span> receives the money and is grateful. <span class='impact-positive'>Her happiness increases significantly</span>—she can finally buy a home and build financial security.</p><p>The family had to borrow to complete the buyout. <span class='impact-negative'>The company carries new debt.</span></p><p>Jennifer remains part of the family but is no longer a shareholder. Her connection to the business fades.</p>`
                                },
                                {
                                    text: "Ask Jennifer to hold her shares—offer increased dividends instead",
                                    effects: {
                                        profit: -150000,
                                        jenniferHappiness: -20
                                    },
                                    impact: `<h4>Decision Impact</h4><p>The family asks Jennifer to keep her ownership and commits to paying consistent dividends going forward.</p><p><span class='impact-highlight'>Jennifer</span> is disappointed and hurt. <span class='impact-negative'>Her happiness decreases substantially</span>—the family won't help when she needs it most.</p><p>She feels trapped as a passive shareholder in a business she doesn't control, unable to access the value of her shares.</p><p>Family relationships become strained. Sunday dinners are tense.</p>`
                                }
                            ];
                        } else {
                            // Jennifer has NO ownership - different options
                            return [
                                {
                                    text: "Give Jennifer 10% ownership now (retroactive fairness)",
                                    effects: {
                                        jenniferOwnership: 10,
                                        robertOwnership: -5,
                                        sarahOwnership: -5,
                                        jenniferHappiness: 30,
                                        sarahHappiness: -10,
                                        michaelHappiness: -8
                                    },
                                    impact: `<h4>Decision Impact</h4><p>The family grants Jennifer 10% ownership as a gesture of inclusion and fairness.</p><p><span class='impact-highlight'>Jennifer</span> is overwhelmed and grateful. <span class='impact-positive'>Her happiness soars</span>—she finally feels valued as part of the family legacy.</p><p><span class='impact-highlight'>Sarah</span> is frustrated. "She's never worked a day in the business and now gets 10%?" ${gameState.michaelLeft ? '' : '<span class=\'impact-highlight\'>Michael</span> also resents the decision.'}</p><p>The gift solves Jennifer's immediate problem but creates new tensions about merit vs. family equality.</p>`
                                },
                                {
                                    text: "Offer Jennifer a token role with modest salary",
                                    effects: {
                                        profit: -60000,
                                        jenniferHappiness: -5,
                                        robertHappiness: -5,
                                        employees: 1
                                    },
                                    impact: `<h4>Decision Impact</h4><p>The company creates a "Community Relations" role for Jennifer at $60K/year.</p><p><span class='impact-highlight'>Jennifer</span> accepts reluctantly. She knows it's a pity hire. The modest salary helps, but she's still far behind her siblings financially.</p><p>Employees notice Jennifer has a job but no real responsibilities. It's awkward for everyone.</p><p>The compromise satisfies no one—Jennifer still feels like an outsider, and the business has an unproductive employee on payroll.</p>`
                                },
                                {
                                    text: "Explain that ownership must be earned through business contribution",
                                    effects: {
                                        jenniferHappiness: -30,
                                        robertHappiness: -15
                                    },
                                    impact: `<h4>Decision Impact</h4><p>Robert gently but firmly explains that ownership requires direct business contribution.</p><p><span class='impact-highlight'>Jennifer</span> is devastated. <span class='impact-negative'>Her happiness plummets.</span> "So I'm just... not really part of this family?" she asks, tears streaming down her face.</p><p>She leaves the meeting early. Over the following months, she stops attending family gatherings.</p><p><span class='impact-highlight'>Robert</span> questions whether he made the right choice. The principle is sound, but the human cost is high.</p><p>The family business has created a permanent rift in the family.</p>`
                                }
                            ];
                        }
                    }
                },
                
                // Event 18: 2034 - Robert's Death
                {
                    date: "2034",
                    title: "The Founder's Passing",
                    description: `Robert Anderson passed away peacefully at age 75. The man who started with $50,000 in 1994 built a thriving company that employs over a hundred people and serves clients nationwide.\n\nHis funeral draws hundreds—employees past and present, clients, competitors, community members. The tributes speak of his integrity, vision, and loyalty.\n\nNow the family must navigate grief while managing succession. Robert's will transfers his ownership to Sarah (60%) and equally to any other active family members (40% if Michael still there, 0% if he left).\n\nSarah is now fully in control. But leading without her father's guidance—and wisdom—will be different.\n\nThe company must decide how to honor Robert's legacy while moving forward.`,
                    options: [
                        {
                            text: "Maintain Robert's vision and conservative approach",
                            effects: {
                                robertDeceased: true,
                                robertOwnershipTransfer: true, // Special flag to handle ownership transfer
                                sarahHappiness: 5,
                                robertHappiness: 0,
                                revenue: -300000
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>Sarah commits to maintaining Robert's conservative, values-driven approach to the business.</p><p>The company continues steadily, but <span class='impact-negative'>growth slows</span> as opportunities are passed up to stay true to the founder's vision.</p><p>Some employees appreciate the continuity. Others feel the company is stuck in the past.</p><p>Sarah receives ` + (gameState.michaelLeft ? "85%" : "70%") + `% ownership. ` + (gameState.michaelLeft ? "She is now the overwhelming majority owner." : "Michael receives 30%.") + `</p>`;
                            }
                        },
                        {
                            text: "Honor his values but modernize the strategy",
                            effects: {
                                robertDeceased: true,
                                robertOwnershipTransfer: true, // Special flag to handle ownership transfer
                                sarahHappiness: 15,
                                robertHappiness: 0,
                                revenue: 1200000,
                                profit: 72000,  // 6% margin on cardboard
                                assets: 800000
                            },
                            impact: function() {
                                return `<h4>Decision Impact</h4><p>Sarah decides to honor Robert's core values—integrity, employee welfare, quality—while modernizing strategy for the next generation.</p><p><span class='impact-positive'>Revenue, profit, and valuation all increase</span> as Sarah implements changes she's been planning.</p><p>The company evolves while maintaining its soul. Employees embrace the changes.</p><p>Sarah receives ` + (gameState.michaelLeft ? "85%" : "70%") + `% ownership. ` + (gameState.michaelLeft ? "She is now the overwhelming majority owner." : "Michael receives 30%.") + ` The business enters its third decade under new leadership.</p>`;
                            }
                        }
                    ]
                },
                
                // Event 19: 2036 - Cousins Enter Business
                {
                    date: "2036",
                    title: "The Third Generation Arrives",
                    description: `Emily (22) has graduated with an engineering degree from MIT. She wants to join Anderson Packaging.\n\nDavid (20) is finishing business school. He's charismatic and entrepreneurial, already talking about expanding into new markets.\n\nBut this is delicate. If the family implemented the "work elsewhere first" policy, Emily and David need to follow it. If they didn't, Sarah needs to decide whether to hire her daughter and nephew without external experience.\n\nThe third generation brings energy and ideas—but also the risk of repeating the conflicts that challenged the second generation.`,
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
                            impact: `<h4>Decision Impact</h4><p>Sarah implements the professional standard: Emily and David must work elsewhere first.</p><p>Emily is disappointed but accepts it. She joins a major packaging firm. David takes a sales role at a tech startup.</p><p>The policy ensures they'll bring outside experience and perspective. It also signals that Anderson Packaging values competence over family privilege.</p><p>However, three years is a long time. Will they still want to join the family business after building careers elsewhere?</p>`
                        }
                    ]
                },
                
                // Event 20: 2040 - Legacy vs. Modernization
                {
                    date: "2040",
                    title: "The Crossroads",
                    description: function() {
                        var baseDesc = "Anderson Packaging is now 46 years old. ";

                        if (gameState.robertDeceased) {
                            baseDesc += "Robert has been gone for six years, but his presence still looms over every major decision. ";
                        } else {
                            baseDesc += "Robert, now 81, still attends board meetings when his health allows. ";
                        }

                        baseDesc += "Revenue is $" + formatNumber(gameState.revenue) + " annually. ";

                        if (gameState.revenue > 15000000 && gameState.assets > 20000000) {
                            baseDesc += "The company is thriving.\n\n";
                        } else if (gameState.revenue < 8000000) {
                            baseDesc += "The company has survived but plateaued.\n\n";
                        } else {
                            baseDesc += "The company is stable and profitable.\n\n";
                        }

                        baseDesc += "Sarah, now 54, faces a defining moment. The packaging industry is transforming—automation, AI, sustainable materials, global competition. In 10 years, the industry will be unrecognizable.\n\n";

                        if (gameState.hasGen3) {
                            baseDesc += "Emily (26) and David (24) have been working in the business for several years now. Over Sunday dinner, Emily makes her case:\n\n\"Grandpa built something incredible from nothing. But the world has changed. If we don't modernize dramatically, we won't survive another generation.\"\n\nDavid agrees: \"We need to go big. Automation, AI, acquisitions. The companies that don't transform won't make it.\"\n\n";
                        } else {
                            baseDesc += "Sarah sees younger competitors implementing automation and AI. Without the next generation in the business yet, any transformation will fall entirely on her aging management team.\n\n";
                        }

                        if (gameState.robertDeceased) {
                            baseDesc += "Sarah thinks about her father. \"What would Robert want?\" she wonders. \"Would he want us to preserve what he built, or transform it to survive?\"\n\n";
                        } else {
                            baseDesc += "Robert speaks quietly from across the table: \"I'm not telling you what to do, Sarah. This is your company now. But I built this with my hands, one customer at a time. I'm... not sure I recognize what you're describing.\"\n\n";
                        }

                        baseDesc += "The question isn't just strategic—it's existential. Should the family preserve Robert's legacy as he built it? Or transform it so radically that it barely resembles the company he founded?\n\n";

                        baseDesc += "This is a defining moment about family identity: Are the Andersons builders who constantly evolve? Or preservers who honor what came before?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Transform dramatically—$5M automation investment (Gen 3 leads)",
                            effects: {
                                cash: -5000000,
                                debt: 3000000,
                                revenue: 5000000,
                                profit: 300000,
                                assets: 5000000,
                                sarahHappiness: function() { return gameState.hasGen3 ? 15 : 5; },
                                robertHappiness: function() { return gameState.robertDeceased ? 0 : -15; },
                                hasDebt: true,
                                managementQuality: 15,
                                employees: -12  // Automation displaces workers
                            },
                            impact: function() {
                                let result = `<h4>Decision Impact</h4><p>Sarah gives the green light. The company takes on $3M debt and invests massively in automation and AI.</p>`;

                                if (gameState.hasGen3) {
                                    result += `<p>Emily and David lead the transformation. <span class='impact-positive'>Revenue and profit surge</span> as efficiency multiplies. <span class='impact-positive'>Company valuation increases dramatically.</span></p><p>But the transformation is wrenching. <span class='impact-negative'>Twelve long-time employees lose their jobs to automation</span>—people who knew Robert personally. Some had been with the company for 20+ years.</p>`;
                                } else {
                                    result += `<p>Without the next generation to drive it, the transformation is slower and more difficult. <span class='impact-positive'>Revenue eventually increases</span>, but <span class='impact-highlight'>Sarah</span> shoulders an enormous burden.</p><p><span class='impact-negative'>Twelve long-time employees lose their jobs to automation.</span></p>`;
                                }

                                if (gameState.robertDeceased) {
                                    result += `<p><span class='impact-highlight'>Sarah</span> wonders what her father would think. "Did I honor his legacy by ensuring survival? Or betray it by transforming everything he built?"</p>`;
                                } else {
                                    result += `<p><span class='impact-highlight'>Robert</span> is deeply troubled. <span class='impact-negative'>His happiness drops significantly.</span> He barely recognizes the company he founded. "I built this with relationships and craftsmanship. Now it's algorithms and machines."</p>`;
                                }

                                result += `<p>The third generation will inherit a modernized, competitive company. But it looks nothing like the business Robert started in 1994.</p>`;

                                return result;
                            }
                        },
                        {
                            text: "Preserve Robert's approach—modest organic growth only",
                            effects: {
                                revenue: 500000,
                                profit: 30000,
                                sarahHappiness: function() { return gameState.hasGen3 ? -15 : 5; },
                                robertHappiness: function() { return gameState.robertDeceased ? 0 : 15; },
                                managementQuality: -5,
                                employees: 0
                            },
                            impact: function() {
                                let result = `<h4>Decision Impact</h4><p>Sarah chooses to honor Robert's legacy by preserving his approach—personal relationships, craftsmanship, steady organic growth.</p>`;

                                result += `<p><span class='impact-positive'>No employees lose their jobs.</span> The company culture remains unchanged. Loyal customers appreciate the continuity.</p>`;

                                if (gameState.hasGen3) {
                                    result += `<p>But Emily and David are devastated. "Mom, we're choosing to become irrelevant," Emily argues. "Grandpa would want us to survive, not to preserve a museum."</p><p>David starts exploring opportunities at other companies. The third generation may not stick around to inherit a declining business.</p>`;
                                } else {
                                    result += `<p><span class='impact-highlight'>Sarah</span> feels she's honored her father's vision, even though it means slower growth.</p>`;
                                }

                                if (gameState.robertDeceased) {
                                    result += `<p><span class='impact-highlight'>Sarah</span> feels at peace. She preserved what Robert built, even if it means the company won't dominate the market.</p>`;
                                } else {
                                    result += `<p><span class='impact-highlight'>Robert</span> is grateful. "Thank you for keeping my vision alive, Sarah. This is the company I wanted it to be."</p>`;
                                }

                                result += `<p>The company remains recognizable as Robert Anderson's creation. But competitors are pulling ahead. The question becomes: Will there be a fourth generation to inherit this?</p>`;

                                return result;
                            }
                        },
                        {
                            text: "Hybrid approach—modernize gradually while preserving culture ($2M investment)",
                            effects: {
                                cash: -2000000,
                                debt: 1000000,
                                revenue: 2500000,
                                profit: 150000,
                                assets: 2000000,
                                sarahHappiness: 10,
                                robertHappiness: function() { return gameState.robertDeceased ? 0 : 5; },
                                hasDebt: true,
                                managementQuality: 8,
                                employees: -3  // Modest workforce reduction
                            },
                            impact: function() {
                                let result = `<h4>Decision Impact</h4><p>Sarah charts a middle path: modernize selectively while preserving the company culture and values Robert built.</p>`;

                                result += `<p>The company invests $2M in targeted automation—enough to stay competitive without becoming unrecognizable. <span class='impact-positive'>Revenue and profit increase moderately.</span></p><p><span class='impact-negative'>Three positions are eliminated</span>, but Sarah works to find those employees other roles or generous severance packages.</p>`;

                                if (gameState.hasGen3) {
                                    result += `<p>Emily and David are moderately satisfied. It's not the aggressive transformation they wanted, but it's progress. They can work with this.</p>`;
                                }

                                if (gameState.robertDeceased) {
                                    result += `<p><span class='impact-highlight'>Sarah</span> believes she's found the balance her father would have wanted—evolution without revolution.</p>`;
                                } else {
                                    result += `<p><span class='impact-highlight'>Robert</span> accepts the compromise. "It's not what I would have chosen, but I understand. Times change."</p>`;
                                }

                                result += `<p>The company remains recognizably "Anderson Packaging" while adapting to survive. It's not the most aggressive path, but it honors both legacy and pragmatism.</p><p>The family has chosen to be both builders AND preservers—a delicate balance that defines who the Andersons are.</p>`;

                                return result;
                            }
                        }
                    ]
                },
                
                // Event 21: 2044 - Final Decision
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

                        baseDesc += "The company employs " + gameState.employees + " people.\n\n";

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
                            baseDesc += "—Emily as eventual CEO, David as President. The third generation could lead Anderson Packaging through its next 50 years.\n\n";
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
                            impact: `<h4>Decision Impact</h4><p>The Anderson family accepts the $45M offer.</p><p>After 50 years, Anderson Packaging is sold. The family becomes wealthy beyond Robert's wildest 1994 dreams.</p><p><span class='impact-highlight'>Sarah</span> has mixed emotions. Pride in what they built. Sadness that it's over.</p><p>Emily and David are disappointed—they wanted to lead the third generation. But they also understand the remarkable achievement.</p><p>Robert Anderson's $50,000 investment in 1994 has become $45M in 2044. The family business has changed the Anderson family forever.</p>`
                        },
                        {
                            text: "Transition to third generation—Emily as CEO",
                            effects: {
                                sarahHappiness: 20,
                                revenue: 2000000,
                                profit: 120000  // 6% margin on cardboard
                            },
                            impact: `<h4>Decision Impact</h4><p>Sarah announces that Emily will become CEO within two years. David will be President.</p><p>The third generation takes the helm. <span class='impact-positive'>Revenue and profit grow</span> under fresh leadership with new ideas.</p><p><span class='impact-highlight'>Sarah</span> is proud and happy—the family legacy continues.</p><p>Anderson Packaging enters its second half-century under third-generation leadership.</p><p>Robert's dream lives on. The family business he started in 1994 will see 2050 and beyond.</p>`
                        }
                    ]
                }
            
];
