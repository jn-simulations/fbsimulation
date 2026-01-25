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
                            impact: `<p>Robert keeps his day job and works on the business nights and weekends. Progress is slow but steady.</p><p>The family maintains financial stability, though Robert is exhausted from working 70-hour weeks.</p><p>After two years, the business brings in modest revenue. The family is secure, but Robert feels the weight of the relentless grind.</p>`
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
                            impact: `<p>Robert quits his job and commits fully to the business. The $100K loan gives him capital to invest in equipment and hire his first employee.</p><p>Revenue grows rapidly to $400K in the first two years. The risk pays off—though the family now carries $100K in debt.</p><p>Robert is energized, though the pressure is intense. The family has bet everything on this dream.</p>`
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
                                revenue: 280000,
                                profit: 16000,
                                cash: -30000,
                                assets: 90000,
                                robertHappiness: 5,
                                robertOwnership: -50,
                                patriciaOwnership: 50,
                                patriciaHappiness: 20,
                                patriciaCFO: true,
                                managementQuality: 8
                            },
                            impact: `<p>Patricia joins Anderson Packaging as CFO with equal ownership. The business becomes more professionally managed with clear financial systems.</p><p>The company Robert started alone is now jointly owned. Patricia brings real expertise and dedication, though now their marriage and business are bound together.</p><p>Disagreements about vendor contracts continue at the dinner table. The children watch their parents discuss inventory management over breakfast.</p><p>"We never stop working," Patricia admits after a month. "Even date night becomes a strategy session."</p><p>The boundary between marriage and business has dissolved. Whether that's a strength or a vulnerability, only time will tell.</p>`
                        },
                        {
                            text: "Keep business and family separate—hire professional staff instead",
                            effects: {
                                revenue: 250000,
                                profit: 15000,
                                cash: 40000,
                                assets: 85000,
                                robertHappiness: 5,
                                patriciaHappiness: -10,
                                managementQuality: 5
                            },
                            impact: `<p>Robert hires a professional bookkeeper and keeps Patricia separate from the business. Clear boundaries between work and family are maintained.</p><p>Patricia is hurt. "I've been doing this work for free. Now you'd rather pay a stranger than make me a partner?"</p><p>Home remains separate from work stress. When Robert has a bad day at the office, Patricia can provide perspective as a spouse, not a co-owner with her own stake in the outcome.</p><p>Robert retains 100% ownership. The professional bookkeeper brings fresh expertise without family complications.</p><p>The children see their father as sole owner of "his" business—which may shape how they view their own future roles.</p>`
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
                                robertHappiness: 5,
                                patriciaHappiness: 5,
                                sarahHappiness: -10,
                                michaelHappiness: -10,
                                jenniferHappiness: -5,
                                managementQuality: 6,
                                hasFamilyEmploymentPolicy: true,
                                strictFamilyPolicy: true
                            },
                            impact: `<p>Robert and Patricia establish a strict policy: Family members must work elsewhere for 3-5 years and demonstrate relevant qualifications before joining Anderson Packaging.</p><p>Sarah is hurt. "So I can't come home after college? I have to go work for strangers first?"</p><p>Michael feels the door has been closed before he's even tried. "You're already assuming I won't be good enough."</p><p>The policy ensures professional standards, but it signals something to the children. They must prove themselves to outsiders before their own parents will accept them.</p><p>This precedent will apply to all future generations. Some may never return after building careers elsewhere.</p>`
                        },
                        {
                            text: "Family members welcome but must start at entry level and prove themselves",
                            effects: {
                                robertHappiness: 5,
                                sarahHappiness: 10,
                                michaelHappiness: 10,
                                jenniferHappiness: 5,
                                managementQuality: 3,
                                hasFamilyEmploymentPolicy: true,
                                strictFamilyPolicy: false
                            },
                            impact: `<p>The Andersons establish a moderate policy: Family members can join directly, but must start at entry-level positions and work their way up.</p><p>"The door is open," Robert tells the kids. "But you'll earn every promotion just like any other employee."</p><p>The children are excited—they have a clear path into the family business.</p><p>Non-family employees may wonder about family members who join without proving themselves externally first. And there's always the question of whether family members join out of genuine calling or convenience.</p><p>This precedent will apply to all future generations. The business remains accessible to family.</p>`
                        },
                        {
                            text: "Keep it flexible—evaluate each family member individually when the time comes",
                            effects: {
                                robertHappiness: -5,
                                patriciaHappiness: -5,
                                sarahHappiness: 5,
                                michaelHappiness: 5,
                                jenniferHappiness: 10,
                                managementQuality: -2
                            },
                            impact: function() {
                                if (familyMembers.patricia.ownership > 0) {
                                    return `<p>Robert and Patricia decide not to establish formal policies. They'll evaluate each family member individually when the time comes.</p><p>"Every situation is different," Robert argues. "We should keep our options open."</p><p>Patricia disagrees but goes along. She worries this approach may lead to future conflict.</p><p>Without clear standards, every family employment decision becomes a negotiation. What's fair for Sarah may not be fair for Michael.</p><p>The children sense uncertainty about their futures. The lack of clear rules preserves flexibility—but leaves questions unanswered.</p>`;
                                } else {
                                    return `<p>Robert decides not to establish formal policies. He'll evaluate each family member individually when the time comes.</p><p>"Every situation is different," Robert explains to Patricia. "We should keep our options open."</p><p>Patricia is frustrated—another business decision made without her input. She worries this lack of structure will create problems.</p><p>Without clear standards, every family employment decision becomes a negotiation. What's fair for one child may not be fair for another.</p><p>The children sense uncertainty about their futures. The lack of clear rules preserves flexibility—but leaves questions unanswered.</p>`;
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
                                sarahHappiness: 15,
                                michaelHappiness: -5,
                                jenniferHappiness: -10,
                                robertHappiness: 5,
                                cash: -30000,
                                managementQuality: 4,
                                employees: 3
                            },
                            impact: `<p>Robert works with lawyers to create a formal family business constitution outlining governance, ownership transfer plans, and succession expectations.</p><p>Sarah is thrilled—the document clearly identifies her as the likely successor.</p><p>But Michael reads between the lines. "So I'm already written off at 15?" He feels the future has been decided without him.</p><p>Jennifer notices she's barely mentioned. "What about me?"</p><p>Legal fees cost $30K. The document brings clarity, though it may prove rigid if the children develop differently than expected.</p><p>The constitution establishes a clear vision for the future—one that names winners and leaves others wondering where they fit.</p>`
                        },
                        {
                            text: "Keep it informal—the children should find their own paths without pressure",
                            effects: {
                                cash: 30000,
                                robertHappiness: 5,
                                sarahHappiness: -5,
                                michaelHappiness: 10,
                                jenniferHappiness: 10,
                                employees: 2
                            },
                            impact: `<p>Robert decides it's too early for formal planning. "They're 18, 15, and 12. Let them figure out who they want to be before we box them in."</p><p>Michael and Jennifer appreciate not being compared to Sarah yet. They have room to grow without pressure.</p><p>Sarah is slightly disappointed—she was hoping for more certainty about her future.</p><p>The approach preserves flexibility and avoids premature commitments. Robert saves $30K in legal fees.</p><p>When succession questions arise later, there will be no documented principles to guide decisions. Whether that's freedom or confusion remains to be seen.</p>`
                        }
                    ]
                },
                
                // Event 4: 2007 - Sarah Joins (Narrative)
                {
                    date: "2007",
                    title: "The Next Generation Enters",
                    description: `Sarah has graduated with her MBA and is eager to join Anderson Packaging. She's 21, smart, ambitious, and has real business skills.\n\nAfter much discussion with Patricia, Robert decides on a balanced approach: Sarah will join as Operations Manager at a competitive salary, with ownership to be discussed after she proves herself over the next few years.\n\n"I want to earn my place here," Sarah tells her parents. "I don't want anyone saying I got special treatment."\n\nRobert is proud of his daughter's attitude. Michael, now 18 and starting college, watches his sister's entry with interest—knowing his turn will come eventually.\n\nSarah throws herself into the work, learning every aspect of the business. Within months, she's made herself indispensable.`,
                    options: [
                        {
                            text: "Continue",
                            effects: {
                                profit: 10000,
                                revenue: 220000,
                                sarahHappiness: 10,
                                robertHappiness: 8,
                                managementQuality: 4,
                                employees: 1
                            },
                            impact: `<p>Sarah begins her career at Anderson Packaging as Operations Manager. She's eager to prove herself and quickly becomes a valuable contributor.</p><p>Revenue increases as Sarah brings fresh ideas and energy to operations.</p><p>The ownership question remains open—Robert will revisit it once Sarah has established her track record.</p>`
                        }
                    ]
                },

                // Event 5: 2008 - Sarah's Marriage (Narrative)
                {
                    date: "2008",
                    title: "Sarah's Wedding",
                    description: function() {
                        let baseDesc = "Sarah has been working at Anderson Packaging for a year now, proving herself as a capable operations manager. But today the family is gathered for a different reason: Sarah is getting married.\n\n";

                        baseDesc += "Mark Thompson is 27, charismatic, and ambitious. He has an MBA from a top program and works in management consulting. He's smart, driven, and clearly adores Sarah.\n\n";

                        baseDesc += "The wedding is beautiful—a perfect spring day with family and friends celebrating the happy couple. During the reception, Mark pulls Robert aside for a moment.\n\n";

                        baseDesc += "\"I want you to know how much I admire what you've built, Robert. Anderson Packaging is impressive. If there's ever an opportunity to be involved...\" Mark trails off with a hopeful look.\n\n";

                        baseDesc += "Robert smiles noncommittally. \"Tonight's about you and Sarah. We can talk about business another time.\"\n\n";

                        baseDesc += "Mark nods, accepting the deflection, but Robert notices how intently his new son-in-law watches the family business discussions at dinner.\n\n";

                        baseDesc += "Later, Patricia comments: \"Mark's ambitious. He's not going to stay on the sidelines forever. We'll need to think about how we handle in-laws eventually.\"\n\n";

                        baseDesc += "The question of whether spouses can join the family business has been raised for the first time. It won't be the last.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Continue",
                            effects: {
                                sarahHappiness: 10,
                                robertHappiness: 5,
                                markInterestedInBusiness: true
                            },
                            impact: `<p>Sarah and Mark begin their life together. The wedding is joyful, though Robert can't help noticing Mark's interest in the family business.</p><p>The question of in-law involvement has been planted. It will resurface as the family grows.</p>`
                        }
                    ]
                },

                // Event 6: 2009 - Michael's Performance Problem
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
                                return `<p>Robert creates a "Business Development" role for Michael, focusing on relationship-building rather than sales execution. Sarah manages the technical sales process.</p><p>Performance and profitability improve as Michael's deals are now properly vetted.</p><p>Michael feels demoted and embarrassed—everyone knows he was moved because he couldn't handle sales.</p><p>Sarah is relieved but feels guilty. Robert wonders if he's been too easy on family members.</p><p>Non-family employees notice: family gets second chances and special roles, not termination. The precedent is set.</p>`;
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
                                return `<p>Robert institutes a formal 90-day performance improvement plan for Michael with clear metrics, identical to what any non-family employee would receive.</p><p>"You're my son, and I love you," Robert says firmly. "But in this business, you're an employee. And employees have to meet standards."</p><p>Michael is hurt and angry. He feels his father is choosing the business over family.</p><p>Sarah and non-family employees are impressed—the family truly holds everyone to the same standard.</p><p>The precedent is clear: being family doesn't exempt you from accountability. This will shape how all future family employees are managed.</p>`;
                            }
                        },
                        {
                            text: "Give Michael more time and coaching—family deserves patience and support",
                            effects: {
                                revenue: -100000,
                                profit: -25000,
                                michaelHappiness: 15,
                                robertHappiness: 5,
                                sarahHappiness: -10,
                                managementQuality: -5
                            },
                            impact: function() {
                                let result = `<p>Robert decides Michael needs more support and coaching. "He's 24 years old. We can't expect perfection. Family means giving people room to grow."</p>`;

                                result += `<p>Robert personally mentors Michael, spending evenings teaching him the business. It's exhausting but brings them closer together.</p>`;

                                result += `<p>Michael feels supported and loved. He's grateful his father believes in him. Over time, his performance slowly improves.</p>`;

                                result += `<p>Sarah is frustrated. "I had to prove myself immediately. Why does Michael get special treatment?" She wonders if being the firstborn means being held to higher standards.</p>`;

                                result += `<p>Short-term performance suffers while Michael develops. Some non-family employees grumble about favoritism.</p>`;

                                result += `<p>But the message is clear: the Andersons don't abandon family when things get hard. This loyalty may prove valuable when future challenges arise.</p>`;

                                return result;
                            }
                        }
                    ]
                },

                // Event 7: 2010 - Michael Joins & Ownership Question
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
                                    return `<p>Michael receives 10% ownership, matching Sarah's stake.</p><p>"Thank you for treating us equally, Dad," Michael says with genuine gratitude.</p><p>Michael feels valued and committed. Revenue increases as Michael attacks the sales role with energy and ownership mentality.</p><p>The siblings are treated consistently. However, Jennifer notices she's still excluded from ownership despite being family.</p>`;
                                } else {
                                    return `<p>Michael receives 10% ownership—but Sarah, who has been working here for three years, still has none.</p><p>"Thank you, Dad," Michael says, though he looks uncomfortable.</p><p>Sarah is hurt and confused. "I've been here for three years and I don't have ownership. Michael joins and gets 10% immediately?"</p><p>Michael feels valued but guilty about the inconsistency. The treatment creates awkward family dynamics.</p>`;
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
                                    return `<p>Robert gives 10% ownership to Michael and Jennifer. Sarah already has her 10% from when she joined.</p><p>"I won't create tiers among my children," Robert says firmly. "You're all equal in my eyes, business or not."</p><p>Jennifer is overwhelmed with gratitude. She feels truly valued as part of the family legacy.</p><p>Michael is pleased, though he wonders if Jennifer should get the same stake without working.</p><p>Sarah appreciates the equality, though she has similar questions about Jennifer receiving ownership without contributing.</p>`;
                                } else {
                                    return `<p>Robert gives 10% ownership to each of his three children—regardless of business involvement.</p><p>"I won't create tiers among my children," Robert says firmly. "You're all equal in my eyes, business or not."</p><p>Jennifer is overwhelmed with gratitude. She feels truly valued as part of the family legacy.</p><p>Michael is pleased, though slightly bothered that Jennifer gets the same stake without working.</p><p>Sarah feels relieved to finally get ownership after three years—though she has mixed feelings that Jennifer gets the same reward for doing nothing in the business.</p>`;
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
                                    return `<p>Michael joins as Sales Associate at market rate, but receives no ownership stake.</p><p>"Wait—Sarah got 10% when she joined," Michael says, confused and hurt. "Why am I different?"</p><p>"You need to prove yourself first," Robert explains, though the inconsistency is obvious.</p><p>Michael feels second-class compared to his sister. His motivation suffers from the perceived unfairness.</p><p>Sarah feels awkward—she knows the treatment is inconsistent and feels bad for her brother.</p><p>The unequal treatment plants seeds of resentment.</p>`;
                                } else {
                                    return `<p>Michael joins as Sales Associate at market rate, but receives no ownership stake—same as Sarah.</p><p>"So neither of us gets ownership?" Michael asks.</p><p>"Not yet," Robert says. "You both need to earn it."</p><p>Michael is disappointed but appreciates the consistent treatment. At least he's not being singled out.</p><p>Sarah feels validated that the ownership bar applies equally to both of them.</p><p>The consistent approach is fair, though both siblings wonder when ownership will come.</p>`;
                                }
                            }
                        }
                    ]
                },

                // Event 8: 2011 - Michael's Marriage (Narrative)
                {
                    date: "2011",
                    title: "Michael's Wedding",
                    description: function() {
                        let baseDesc = "Michael is getting married to Lisa Chen. They met through mutual friends two years ago, and the relationship has moved quickly.\n\n";

                        baseDesc += "Lisa is 26, ambitious, and whip-smart. She has a background in marketing and currently works at a tech startup. She's outspoken, confident, and not afraid to challenge people—including the Andersons.\n\n";

                        baseDesc += "At the rehearsal dinner, Lisa wastes no time sharing her observations about Anderson Packaging with Robert. \"The packaging industry is ripe for disruption—have you thought about digital marketing? Social media?\"\n\n";

                        baseDesc += "Robert is taken aback by her directness. Before he can respond, Lisa continues: \"I have some ideas. Maybe Michael and I could present them sometime?\"\n\n";

                        baseDesc += "Sarah whispers to Mark: \"Looks like we might have competition for the 'ambitious spouse' title.\"\n\n";

                        baseDesc += "The wedding is lovely—Lisa's taste is impeccable. But Robert can't shake the feeling that he's gained not just a daughter-in-law, but a business proposition waiting to happen.\n\n";

                        baseDesc += "Both Sarah and Michael are now married to ambitious spouses with business interests. The family dynamic has become more complex. Eventually, the Andersons will need to decide how to handle in-laws who want to join the business.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Continue",
                            effects: {
                                michaelHappiness: 10,
                                robertHappiness: 5,
                                lisaInterestedInBusiness: true
                            },
                            impact: `<p>Michael and Lisa begin their life together. The wedding is joyful, and the family welcomes Lisa warmly.</p><p>Like Mark before her, Lisa has made her interest in the family business known. With two ambitious in-laws now, the question of spouse involvement will need to be addressed.</p>`
                        }
                    ]
                },

                // Event 9: 2012 - Succession Discussion
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
                            impact: `<p>Robert announces that Sarah will become CEO when he steps down, likely within five years.</p><p>Sarah is energized and relieved. She works even harder. Business performance improves under her clear leadership path.</p><p>Michael is disappointed and hurt—he feels his contributions are undervalued.</p><p>Robert appreciates the clarity, though he worries about Michael's reaction.</p>`
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
                            impact: `<p>Robert decides not to commit to anyone yet, saying both Sarah and Michael will be evaluated over the next several years.</p><p>Sarah is frustrated. After years of hard work and clear qualification, she wonders if she should look for CEO opportunities elsewhere.</p><p>Michael feels he still has a shot.</p><p>The ambiguity creates tension between the siblings. The uncertainty affects day-to-day operations as both compete for position.</p>`
                        }
                    ]
                },

                // Event 10: 2013 - In-Law Employment Dilemma
                {
                    date: "2013",
                    title: "The In-Law Question",
                    description: function() {
                        let baseDesc = "The moment Robert has been dreading has arrived. Mark and Lisa have both formally asked about joining Anderson Packaging.\n\n";

                        baseDesc += "Mark's pitch: \"Robert, I've been in consulting for six years. I've helped companies three times your size optimize operations. I could be your VP of Strategy. Sarah and I would make an incredible team.\"\n\n";

                        baseDesc += "Lisa's pitch: \"My startup just got acquired. I'm looking for my next chapter. Anderson's marketing is stuck in 1995—no offense. Give me a year as Marketing Director and I'll double your brand awareness.\"\n\n";

                        // Reference previous decisions about in-laws
                        if (gameState.openToInLaws === true) {
                            baseDesc += "Robert remembers leaving the door open at Sarah's wedding. Well, both in-laws have now walked through it.\n\n";
                        } else if (gameState.openToInLaws === false) {
                            baseDesc += "Robert remembers firmly setting boundaries. But both Mark and Lisa have persisted, and their credentials are undeniably strong.\n\n";
                        } else {
                            baseDesc += "Robert had hoped to defer this question indefinitely. That's no longer possible.\n\n";
                        }

                        if (gameState.lisaEngaged && gameState.markEngaged) {
                            baseDesc += "After the \"in-law innovation day,\" both spouses are convinced they've proven themselves. They're not asking anymore—they're expecting.\n\n";
                        }

                        baseDesc += "Sarah and Michael watch nervously. If their spouses join, family dinners become business meetings. If they're rejected, marital tensions seem inevitable.\n\n";

                        if (familyMembers.patricia.ownership > 0) {
                            baseDesc += "Patricia is deeply conflicted. \"They're both talented. But hiring your children's spouses? We'll have four adult children of the founder working here—two by blood, two by marriage. The dynamics will be impossible.\"\n\n";
                        }

                        baseDesc += "Robert needs to decide: How does Anderson Packaging handle in-laws who want to join the business?";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Hire both Mark and Lisa—embrace in-laws as full members of the business family",
                            effects: {
                                revenue: 500000,
                                profit: -100000,
                                employees: 2,
                                sarahHappiness: 15,
                                michaelHappiness: 15,
                                robertHappiness: -10,
                                patriciaHappiness: -15,
                                managementQuality: 8,
                                markInBusiness: true,
                                lisaInBusiness: true,
                                hasInLawsInBusiness: true
                            },
                            impact: function() {
                                let result = `<p>Robert makes a bold decision: both Mark and Lisa will join Anderson Packaging. Mark as VP of Strategy, Lisa as Marketing Director.</p>`;

                                result += `<p>Revenue increases from Lisa's marketing initiatives and Mark's strategic planning. Management quality improves.</p>`;

                                result += `<p>However, profit decreases from two executive salaries. And the complexity multiplies.</p>`;

                                result += `<p>Sarah and Michael are thrilled. Working alongside their spouses feels like a dream.</p>`;

                                result += `<p>Robert is exhausted by the family dynamics. Every meeting is now a family affair. Every disagreement has marital and sibling undertones.</p>`;

                                if (familyMembers.patricia.ownership > 0) {
                                    result += `<p>Patricia shakes her head. "Robert, you've turned our business into a family reunion. When this blows up—and it will—don't say I didn't warn you."</p>`;
                                }

                                result += `<p>Anderson Packaging now has four members of the next generation working together. The potential for conflict has quadrupled, but so has the talent pool.</p>`;

                                result += `<p>This decision will require clear governance structures to manage.</p>`;

                                return result;
                            }
                        },
                        {
                            text: "Hire one in-law (the more qualified one) but not both—be selective",
                            effects: {
                                revenue: 300000,
                                profit: -50000,
                                employees: 1,
                                sarahHappiness: -8,
                                michaelHappiness: -8,
                                robertHappiness: 5,
                                managementQuality: 5,
                                selectiveInLawPolicy: true,
                                hasInLawsInBusiness: true
                            },
                            impact: function() {
                                let result = `<p>Robert decides to be selective. After careful evaluation, he offers a position to the candidate with stronger, more relevant credentials.</p>`;

                                // Determine who gets hired based on whether Lisa was engaged with earlier
                                if (gameState.lisaEngaged && !gameState.markEngaged) {
                                    result += `<p>Lisa joins as Marketing Director. Her ideas have been impressive, and marketing is a clear gap in the company.</p>`;
                                    result += `<p>Mark is politely declined. Sarah is hurt on his behalf. "Dad, you're going to create problems in my marriage."</p>`;
                                } else {
                                    result += `<p>Mark joins as VP of Strategy. His consulting background provides skills the company lacks.</p>`;
                                    result += `<p>Lisa is politely declined. Michael is furious. "You picked Sarah's husband over my wife? How is that fair?"</p>`;
                                }

                                result += `<p>Both Sarah and Michael are disappointed by the inconsistency. One couple wins, one loses. Family dinners become awkward.</p>`;

                                result += `<p>Revenue increases and management quality improves from the new hire, but the family dynamic is strained.</p>`;

                                result += `<p>The rejected spouse remains polite but never quite forgives the decision. This tension will persist for years.</p>`;

                                return result;
                            }
                        },
                        {
                            text: "Decline both—establish that in-laws cannot work in the family business",
                            effects: {
                                sarahHappiness: -15,
                                michaelHappiness: -15,
                                robertHappiness: 10,
                                patriciaHappiness: 15,
                                managementQuality: -3,
                                noInLawsPolicy: true
                            },
                            impact: function() {
                                let result = `<p>Robert makes a firm decision. "After a lot of thought, Patricia and I have decided that Anderson Packaging will remain a blood-family business. We value both of you, but we believe in-laws working here creates too much complexity."</p>`;

                                result += `<p>Mark accepts the decision gracefully. "I understand. Family businesses have to make these calls."</p>`;

                                result += `<p>Lisa is less diplomatic. "So you'll hire your own children regardless of qualifications, but spouses who are actually qualified get turned away? Interesting priorities."</p>`;

                                result += `<p>Sarah and Michael are both disappointed. They'll have to explain to their spouses why the family business is closed to them.</p>`;

                                if (familyMembers.patricia.ownership > 0) {
                                    result += `<p>Patricia is relieved. "This is the right call. Clear boundaries prevent messy situations."</p>`;
                                }

                                result += `<p>Robert feels a weight lifted. The business will remain simpler to manage.</p>`;

                                result += `<p>The company loses access to talented in-laws who could have contributed.</p>`;

                                result += `<p>A clear policy has been established: In-laws are family, but they're not business family. This precedent will govern all future generations.</p>`;

                                return result;
                            }
                        }
                    ]
                },

                // Event 11: 2014 - Growth Opportunity
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
                                    return `<p>Robert sides with Sarah and Michael. The company accepts the contract and makes the major investment. Revenue increases by $3M annually and company valuation rises substantially.</p><p>However, cash is depleted and the company takes on $500K in debt to complete the investment.</p><p>Sarah and Michael are thrilled with the growth opportunity.</p><p>Jennifer feels powerless. "I own ${jenOwn.toFixed(0)}% but apparently that doesn't matter. You all just decided for me." Her dividend income disappears for years.</p><p>The decision establishes a precedent: active family members control decisions, even over passive owners' objections.</p>`;
                                } else {
                                    return `<p>Robert sides with Sarah and Michael. The company accepts the contract and makes the major investment. Revenue increases by $3M annually and company valuation rises substantially.</p><p>However, cash is depleted and the company takes on $500K in debt to complete the investment.</p><p>Sarah and Michael are thrilled with the growth opportunity.</p><p>Jennifer is devastated. "So I just... don't matter? You all get to build wealth while I struggle?" She stops attending family dinners for months.</p><p>The growing wealth gap between family members in the business and those outside it becomes painfully visible.</p>`;
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
                                    return `<p>Robert declines the contract to honor Jennifer's ownership rights and financial needs.</p><p>Jennifer is relieved—her dividend income continues, and she can proceed with buying her house. Her ownership stake is finally being respected.</p><p>Sarah and Michael are furious. "We're letting Jennifer's ${jenOwn.toFixed(0)}% ownership block a transformational opportunity? This is insane," Michael says bitterly.</p><p>Sarah starts quietly exploring CEO opportunities at other companies. The family business feels like a cage.</p><p>The decision establishes a precedent: ownership rights can block operational growth.</p>`;
                                } else {
                                    return `<p>Robert declines the contract to protect family harmony and Jennifer's needs, even though she doesn't own shares.</p><p>Jennifer is relieved and grateful that she still matters to the family.</p><p>Sarah and Michael are furious. "We're turning down a transformational opportunity for Jennifer, who doesn't even work here or own shares? This is insane," Michael says bitterly.</p><p>Sarah starts quietly exploring CEO opportunities at other companies. The family business feels like it prioritizes everyone except those who actually run it.</p>`;
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
                                    return `<p>Robert proposes a compromise: accept the contract, but guarantee Jennifer receives dividends equal to 8% return on her ownership stake annually, even during the investment period.</p><p>Revenue grows substantially, and company valuation increases. The company takes on debt to fund both the investment and Jennifer's dividends.</p><p>Everyone is moderately satisfied but not thrilled. Sarah and Michael feel they're "paying Jennifer" for growth. Jennifer appreciates being considered but wonders if she's now seen as a burden.</p><p>The compromise establishes an important precedent: passive owners have rights that must be balanced with business needs. But it's messy and expensive.</p>`;
                                } else {
                                    return `<p>Robert proposes a compromise: accept the contract, but the family will personally support Jennifer with $30K annually during the investment period.</p><p>Revenue grows substantially, and company valuation increases. The company takes on debt for the investment.</p><p>Everyone is moderately satisfied. Jennifer feels the family cares about her welfare even though she's not in the business.</p><p>Sarah and Michael accept this but wonder: "Will Jennifer always constrain our decisions? Should we have given her ownership just to formalize this?"</p><p>The compromise keeps family harmony but raises questions about fairness and precedent.</p>`;
                                }
                            }
                        }
                    ]
                },
                
                // Event 12: 2016 - Michael's Compensation Conflict
                {
                    date: "2016",
                    title: "The Compensation Debate",
                    description: `Michael requests a meeting with Robert. He's done the math.\n\n"I've brought in significant new business—my sales results have been exceptional," Michael explains. "But Sarah makes considerably more as COO. I understand her role has more responsibility, but my results speak for themselves."\n\nHe has a point. Michael's sales performance has been exceptional. But Sarah's role requires more expertise, works longer hours, and carries ultimate operational responsibility.\n\nFair isn't always equal. Equal isn't always fair.\n\nRobert needs to decide how to value different types of contributions.`,
                    options: [
                        {
                            text: "Increase Michael's salary to $160K to recognize his sales success",
                            effects: {
                                profit: -40000,
                                revenue: 300000,
                                michaelHappiness: 15,
                                sarahHappiness: -15,
                                managementQuality: -3
                            },
                            impact: `<p>Robert raises Michael's salary to $160K, substantially narrowing the gap with Sarah.</p><p>Michael feels valued and recognized.</p><p>Sarah is frustrated. "I work 60-hour weeks managing the entire operation. Michael schmoozes clients and now makes almost what I make? How is that fair?"</p><p>The decision signals that sales results matter more than operational responsibility. Other employees notice the shift.</p>`
                        },
                        {
                            text: "Maintain the differential—different roles have different compensation",
                            effects: {
                                michaelHappiness: -15,
                                sarahHappiness: 10,
                                robertHappiness: -5,
                                revenue: -200000,
                                managementQuality: 5
                            },
                            impact: `<p>Robert explains that compensation reflects responsibility level, not just results. Sarah's role as COO justifies higher pay.</p><p>Michael feels unappreciated. "So my sales numbers don't matter? I bring in millions and get treated like support staff."</p><p>Sarah feels validated. "Thank you for recognizing that my job is harder."</p><p>Michael's sales motivation suffers. He starts putting in less effort. Why hustle when it doesn't pay?</p><p>Compensation now reflects role complexity. But family tension grows.</p>`
                        },
                        {
                            text: "Create a performance bonus structure—base salary stays, but Michael can earn more through commissions",
                            effects: {
                                profit: -20000,
                                revenue: 200000,
                                michaelHappiness: 8,
                                sarahHappiness: -5,
                                robertHappiness: 10,
                                managementQuality: 3
                            },
                            impact: `<p>Robert implements a performance bonus system. Michael's base salary stays the same, but he can earn substantial commissions on new business.</p><p>Michael is moderately satisfied. It's not the raise he wanted, but at least his efforts can be rewarded.</p><p>Sarah is uneasy. "Now Michael could out-earn me in a good year. And there's no bonus for keeping operations running smoothly."</p><p>The compromise is fair in principle but creates new questions. Sarah starts asking about her own bonus structure.</p><p>Robert is relieved to have avoided direct conflict, but he's opened a can of worms about performance incentives for everyone.</p>`
                        }
                    ]
                },

                // Event 13: 2017 - Spouse & In-Law Governance Policy
                {
                    date: "2017",
                    title: "Family Boundaries",
                    description: function() {
                        let baseDesc = "The family business has grown—and so has the family itself. Sarah and Michael are both married with children. The grandchildren are starting to show their personalities. And tensions around who belongs in the business have been simmering for years.\n\n";

                        if (gameState.hasInLawsInBusiness) {
                            baseDesc += "Since Mark and/or Lisa joined the company, family dynamics have become more complex. Decisions that used to be sibling discussions now involve spouses with their own interests and opinions.\n\n";

                            baseDesc += "At a recent leadership meeting, Lisa challenged one of Sarah's operational decisions. \"I'm just asking questions,\" Lisa said. Sarah's response was icy: \"And I'm just running operations.\"\n\n";

                            baseDesc += "Later, Michael defended his wife: \"Lisa has valid points.\" Sarah snapped back: \"Of course you'd say that.\"\n\n";

                            baseDesc += "Robert watched the exchange with a sinking feeling. This is exactly what he'd feared.\n\n";
                        } else {
                            baseDesc += "Mark and Lisa remain outside the business, but they haven't stopped having opinions about it. At family dinners, business discussions now include spouses who critique decisions they have no role in making.\n\n";

                            baseDesc += "\"I'm just saying, if I were running marketing...\" Lisa begins.\n\n\"But you're not,\" Sarah interrupts. \"Remember?\"\n\n";

                            baseDesc += "The table goes silent. Michael looks between his wife and his sister. Mark stares at his plate.\n\n";
                        }

                        baseDesc += "Jennifer—who has watched these dynamics from the outside—finally speaks up: \"Can we just agree on some rules? Who's in the business, who's not, who gets to have opinions at Sunday dinner, who doesn't? I'm exhausted by the constant tension.\"\n\n";

                        if (familyMembers.patricia.ownership > 0) {
                            baseDesc += "Patricia nods vigorously. \"Jennifer's right. We need formal policies. Who qualifies as 'family' for business purposes? What rights do spouses have? What about future grandchildren's spouses?\"\n\n";
                        }

                        baseDesc += "Robert realizes this conversation is long overdue. The family has grown beyond informal understandings. They need a Spouse and In-Law Policy.\n\n";

                        baseDesc += "This is a fundamental governance decision that will define the Anderson family business for generations.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Implement comprehensive Spouse & In-Law Policy (formal governance)",
                            effects: {
                                sarahHappiness: 5,
                                michaelHappiness: function() { return gameState.hasInLawsInBusiness ? -15 : 0; },
                                jenniferHappiness: 10,
                                patriciaHappiness: 10,
                                robertHappiness: 5,
                                managementQuality: 8,
                                hasSpousePolicy: true,
                                hasFormalSpouseGovernance: true
                            },
                            impact: function() {
                                let result = `<p>The Anderson family adopts a comprehensive Spouse & In-Law Policy with these key provisions:</p>`;

                                result += `<p><strong>Employment:</strong> Spouses may be considered for employment only if they meet the same external experience requirements as blood family members. Positions must be justified by business need, not family connection.</p>`;

                                result += `<p><strong>Governance Rights:</strong> Spouses do not automatically gain voting rights on family business matters. They may attend Family Council meetings as observers but cannot vote unless granted ownership.</p>`;

                                result += `<p><strong>Ownership:</strong> Ownership remains with blood Andersons unless transferred through formal board approval. Marital property laws are addressed through prenuptial agreements for future marriages.</p>`;

                                result += `<p><strong>Divorce Protocol:</strong> In case of divorce, business interests remain with the blood Anderson. Buyout provisions protect the company from contentious property divisions.</p>`;

                                result += `<p>Management quality improves as roles and boundaries become clear.</p>`;

                                if (gameState.hasInLawsInBusiness) {
                                    result += `<p>Mark and/or Lisa feel demoted and resentful. They went from trusted contributors to second-class family members overnight. Michael is furious on Lisa's behalf.</p>`;
                                }

                                result += `<p>However, the formal policies feel cold and corporate. "We're treating family like a legal contract," Michael complains. "Whatever happened to trust?"</p>`;

                                result += `<p>Future spouses will know exactly where they stand—which may discourage talented people from marrying into the family. The prenuptial requirements feel unromantic.</p>`;

                                result += `<p>The family is now governed by rules rather than relationships. That brings order, but something intangible has been lost.</p>`;

                                return result;
                            }
                        },
                        {
                            text: "Create advisory roles for spouses—involvement without formal power",
                            effects: {
                                sarahHappiness: 5,
                                michaelHappiness: 10,
                                jenniferHappiness: 5,
                                patriciaHappiness: 5,
                                robertHappiness: 5,
                                managementQuality: 5,
                                hasSpousePolicy: true,
                                spouseAdvisoryRoles: true
                            },
                            impact: function() {
                                let result = `<p>The family creates a compromise: formal \"Spouse Advisory\" roles that give in-laws a voice without voting power.</p>`;

                                result += `<p>Spouses can attend Family Council meetings, offer input on decisions, and even take on project-based consulting work—but they cannot vote on business matters or hold executive positions.</p>`;

                                result += `<p>Everyone is moderately satisfied. Spouses feel included without threatening the blood-family control structure.</p>`;

                                if (gameState.hasInLawsInBusiness) {
                                    result += `<p>Mark and/or Lisa retain their current roles but understand that future advancement may be limited.</p>`;
                                } else {
                                    result += `<p>Mark and Lisa appreciate having a defined way to contribute, even without full membership.</p>`;
                                }

                                result += `<p>However, the advisory structure is somewhat ambiguous. What happens when a spouse's \"advice\" is ignored? How much influence do they really have?</p>`;

                                result += `<p>The policy provides structure but leaves room for future conflict.</p>`;

                                return result;
                            }
                        },
                        {
                            text: "Maintain current approach—keep spouse involvement informal and relationship-based",
                            effects: {
                                sarahHappiness: -5,
                                michaelHappiness: function() { return gameState.hasInLawsInBusiness ? 10 : 0; },
                                jenniferHappiness: -5,
                                patriciaHappiness: -5,
                                robertHappiness: 5,
                                managementQuality: -3
                            },
                            impact: function() {
                                let result = `<p>Robert decides against formal policies. "We're family, not a corporation. We'll work things out based on relationships, not rulebooks."</p>`;

                                if (gameState.hasInLawsInBusiness) {
                                    result += `<p>Mark and Lisa are relieved—they're still trusted family members, not second-class citizens governed by prenups and policies.</p>`;
                                }

                                result += `<p>Robert feels this preserves what makes family businesses special—the warmth, flexibility, and trust that corporations can't match.</p>`;

                                result += `<p>However, Jennifer and Patricia are disappointed. They wanted clarity.</p>`;

                                result += `<p>The family retains flexibility to handle unique situations with grace rather than rigid rules.</p>`;

                                result += `<p>The approach is messy but human. Each situation will be handled individually—which could mean either wise judgment or inconsistent favoritism, depending on how it plays out.</p>`;

                                return result;
                            }
                        }
                    ]
                },

                // Event 14: 2018 - Professionalization & Governance
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
                                revenue: 500000,
                                profit: 80000,
                                cash: -50000,
                                robertHappiness: 5,
                                sarahHappiness: -5,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : -8; },
                                managementQuality: 10,
                                hasIndependentBoard: true
                            },
                            impact: function() {
                                return `<p>Robert recruits three independent directors: a former CEO of a packaging company, a CFO with manufacturing experience, and a governance expert.</p><p>The board meets quarterly and provides rigorous oversight. Revenue and profit increase from better strategic guidance.</p><p>However, the directors don't just advise—they challenge. At the first meeting, they question Sarah's operational decisions and suggest Michael's sales approach is outdated.</p><p>Sarah feels scrutinized and second-guessed. "I've been running operations successfully for years. Now I have to justify every decision to outsiders?"</p><p>Michael resents the intrusion. "They don't understand our culture. They just see spreadsheets."</p><p>Director fees cost $50K annually. The family has gained accountability but lost autonomy. Every major decision now requires board approval.</p>`;
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
                                return `<p>Robert makes a bold move: hire Amanda Chen as COO (Sarah moves to VP of Operations) AND add two independent directors to provide governance oversight.</p><p>The transformation is dramatic. Revenue and profit surge under professional management and board oversight. Management quality reaches new heights.</p><p>Sarah is devastated by the demotion. After years of leadership, she's been displaced by a non-family executive. She questions her future in the company.</p><p>The independent directors support the decision: "This is what's best for the business." But they also note the family pain it causes.</p><p>The company is now highly professionalized—but at significant cost to family relationships and Sarah's commitment.</p>`;
                            }
                        },
                        {
                            text: "Keep it family-only—preserve independence and culture",
                            effects: {
                                profit: -30000,
                                sarahHappiness: 15,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : 12; },
                                robertHappiness: 5,
                                managementQuality: -3
                            },
                            impact: function() {
                                return `<p>Robert declines both opportunities. Anderson Packaging will remain fully family-controlled.</p><p>"This is a family business," Robert explains. "Our culture, our values, our way of doing things—that's what makes us special. Outsiders would change that."</p><p>` + (gameState.michaelLeft ? "Sarah is" : "Sarah and Michael are") + ` relieved. No outsiders will second-guess ` + (gameState.michaelLeft ? "her" : "their") + ` decisions or threaten ` + (gameState.michaelLeft ? "her" : "their") + ` future.</p><p>The company continues with its distinctive family culture intact. Employees appreciate that the Andersons haven't "sold out" to corporate thinking.</p><p>However, growth may be limited. Without outside perspective, the family risks blind spots. Competitors with professional boards may gain advantages.</p><p>The family retains complete control—but complete responsibility too. There are no outside experts to blame if things go wrong.</p>`;
                            }
                        }
                    ]
                },
                
                // Event 15: 2020 - Family Governance Formalization
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
                                return `<p>The Anderson family implements comprehensive governance structures:</p><p>Family Council meets quarterly to discuss family matters separate from business operations. ALL family members participate, regardless of employment or ownership.</p><p>Family Constitution documents core principles: how family members join the business, performance expectations, ownership transfer rules, dividend policies, and conflict resolution processes.</p><p>Voting rules are clarified: operational decisions require management authority, strategic decisions require ownership majority, family decisions use one-person-one-vote.</p><p>Jennifer finally has a formal voice. ` + (jenOwn > 0 ? "Her ownership rights are now clearly defined and respected." : "Even without ownership, she can participate in family governance.") + `</p><p>The structure creates accountability and reduces ad-hoc conflicts. Family harmony improves.</p><p>This governance foundation will serve the family for generations. When Gen 3 enters, clear rules already exist.</p>`;
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
                            impact: `<p>The family establishes quarterly Family Council meetings where everyone can voice concerns and discuss family matters.</p><p>Communication improves as family members have a regular forum. Tensions decrease from better dialogue.</p><p>However, without a written constitution or formal voting rules, many governance questions remain ambiguous. The Council can discuss issues, but decision authority is still unclear.</p><p>"Who actually decides?" becomes a recurring question. Some family members feel heard but not empowered.</p><p>The moderate approach provides some structure without full commitment to formal governance.</p>`
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
                                let result = `<p>Robert decides against formal governance structures. "We're a family, not a corporation. We'll work things out as they come."</p>`;

                                result += `<p>Jennifer is devastated. "So I just... don't matter? My voice will never be heard in this family?"</p>`;

                                if (jenOwn > 0) {
                                    result += `<p>Despite owning ${jenOwn.toFixed(0)}% of the company, Jennifer has no formal mechanism to exercise her ownership rights or influence decisions.</p>`;
                                }

                                result += `<p>Family conflicts continue unresolved. Without clear governance, every major decision becomes a power struggle or emotional negotiation.</p><p>Sarah is frustrated—she needs clear authority to lead effectively. The lack of structure undermines professional management.</p><p>The decision to stay informal works for Robert but creates lasting dysfunction for the next generation. When Gen 3 arrives, they'll inherit governance chaos.</p>`;

                                return result;
                            }
                        }
                    ]
                },
                
                // Event 16: 2022 - Robert's Health Scare
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
                            impact: `<p>Sarah becomes CEO. She's energized and ready. Revenue and profit increase as she implements changes she's been planning for years.</p><p>Sarah is thrilled—she's finally leading the company.</p><p>Michael feels definitively passed over.</p><p>Robert struggles with letting go, even though he knows it's right. He stays involved as Executive Chairman, sometimes second-guessing Sarah's decisions.</p>`
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
                            impact: `<p>Robert stays on as CEO, promising to work less and delegate more.</p><p>In practice, he can't let go. He still involves himself in day-to-day decisions. The company suffers from unclear leadership as responsibility is ambiguous.</p><p>Sarah is deeply frustrated—even a health scare wasn't enough to trigger real succession.</p><p>She begins quietly exploring CEO opportunities at other companies.</p>`
                        }
                    ]
                },
                
                // Event 17: 2024 - Michael's External Offer
                {
                    date: "2024",
                    title: "Michael's Crossroads",
                    description: function() {
                        var baseDesc = "Michael has received an offer from a competitor: $200K salary plus substantial equity and a VP title. It's a clear path to eventual CEO.\n\n";

                        // Check if compensation conflict was resolved in his favor
                        var compensationEvent = gameState.decisions.find(function(d) { return d.event === 12; });
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
                            impact: `<p>Michael becomes President, overseeing sales and business development. Revenue grows from his renewed energy.</p><p>Profit decreases due to Michael's higher compensation package.</p><p>Sarah is concerned about having her brother as President reporting to her. Will he undermine her authority? Will family dynamics complicate the reporting relationship?</p><p>The company now has two siblings in top leadership with complex family dynamics.</p>`
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
                                    return `<p>Michael leaves Anderson Packaging for the competitor. Revenue and profit drop sharply without his sales leadership.</p><p>Michael is heartbroken—he wanted to stay but felt there was no path forward.</p><p>He sells his ${michaelOwn.toFixed(0)}% ownership back to the family. The entire Anderson family is devastated by his departure.</p><p>Sunday dinners become awkward. The family business has fractured the family.</p>`;
                                } else {
                                    return `<p>Michael leaves Anderson Packaging for the competitor. Revenue and profit drop sharply without his sales leadership.</p><p>Michael is heartbroken—he wanted to stay but felt there was no path forward.</p><p>The entire Anderson family is devastated by his departure. He never received ownership, and now he's gone.</p><p>Sunday dinners become awkward. The family business has fractured the family.</p>`;
                                }
                            }
                        }
                    ]
                },
                
                // Event 18: 2026 - The Acquisition Offer
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
                            impact: `<p>The family accepts the offer. Everyone becomes wealthy overnight.</p><p>Jennifer is thrilled—she receives nearly $3M and can finally live comfortably.</p><p>Robert and Sarah are conflicted. They have the money, but they've given up the family legacy.</p><p>The PE firm immediately implements aggressive changes. The company Sarah built starts to feel foreign.</p>`
                        },
                        {
                            text: "Decline—keep Anderson Packaging family-owned",
                            effects: {
                                robertHappiness: 15,
                                sarahHappiness: 15,
                                jenniferHappiness: -30
                            },
                            impact: `<p>The family chooses legacy over liquidity.</p><p>Robert and Sarah feel proud of maintaining independence and continuing the family business into its second generation.</p><p>Jennifer is devastated—she watched nearly $3M disappear. She's still struggling financially while her siblings run a company she doesn't work for.</p><p>The decision creates a lasting rift. Jennifer feels her needs are always subordinated to the business.</p>`
                        }
                    ]
                },
                
                // Event 19: 2028 - Quality Crisis & Family Accountability
                {
                    date: "2028",
                    title: "The Quality Crisis",
                    description: function() {
                        var baseDesc = "A major client has discovered defects in Anderson Packaging's products. The problem affects $2.5M worth of delivered goods. The client is threatening to terminate their contract and sue.\n\nThe Anderson family name is on the line.\n\n";

                        const sarahIsCEO = gameState.sarahCEO;
                        const michaelStillHere = !gameState.michaelLeft;
                        const robertRetired = gameState.robertRetired;

                        // Determine root cause narrative
                        var growthEvent = gameState.decisions.find(function(d) { return d.event === 11; });
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

                                return `<p>The Anderson family makes a powerful statement: they personally contribute ${familyContrib} from their own wealth, with the company covering the remaining $1.3M.</p><p>"The Anderson name means something," ` + (gameState.sarahCEO ? "Sarah" : "Robert") + ` announces publicly. "When we fail, we own it completely."</p><p>The total cost is enormous, but the client is deeply impressed. They not only maintain the contract but increase it and refer new business.</p><p>The personal financial sacrifice by the family sends a powerful message to employees: leadership accountability is real, not just words.</p><p>The Anderson family's reputation for integrity becomes legendary in the industry. Competitors talk about this decision for years.</p>`;
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
                            impact: `<p>The company accepts full responsibility. The business takes a major financial hit for recalls and rebuilding quality systems.</p><p>The client is impressed by the integrity. They maintain the contract and eventually increase it.</p><p>The Anderson family feels they've upheld their values, though some wonder if personal family contribution would have sent a stronger message about accountability.</p><p>Employee morale improves—leadership did the right thing, even though it was expensive.</p>`
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
                                return `<p>The family chooses the cheaper settlement, avoiding full accountability.</p><p>The client accepts the settlement but terminates the contract. Revenue decreases substantially. Word spreads in the industry that the Andersons cut corners.</p><p>Robert is devastated. "I spent 30+ years building a reputation for integrity. We just sold it for $1.2M in savings."</p><p>Sarah also struggles with deep regret. ` + (gameState.sarahCEO ? "As CEO, she feels she's betrayed her father's legacy." : "She wonders if she should have pushed harder for full accountability.") + `</p><p>Employees lose respect for family leadership. Some of the best people start quietly looking for other jobs. The company culture shifts—integrity is negotiable after all.</p>`;
                            }
                        }
                    ]
                },
                
                // Event 20: 2030 - Third Generation (Narrative)
                {
                    date: "2030",
                    title: "The Next Generation",
                    description: function() {
                        let baseDesc = "The third generation is growing up. Sarah's daughter Emily is now 16 and brilliant—she's already talking about studying engineering and joining the family business someday. Michael's son David is 14 and entrepreneurial, always starting small ventures.\n\n";

                        baseDesc += "Over Sunday dinner, the conversation naturally turns to the grandchildren's futures.\n\n";

                        baseDesc += "\"Emily keeps asking me about operations,\" Sarah says proudly. \"She wants to do an internship next summer.\"\n\n";

                        if (!gameState.michaelLeft) {
                            baseDesc += "\"David's the same way,\" Michael adds. \"He's already pitching me business ideas.\"\n\n";
                        }

                        baseDesc += "Jennifer watches quietly. Her son Lucas, 10, shows no particular interest in business. She wonders if he'll be left behind.\n\n";

                        baseDesc += "Robert smiles at his grandchildren's enthusiasm, but he also remembers the challenges of bringing the second generation into the business. He hopes the family has learned from those experiences.\n\n";

                        baseDesc += "\"When the time comes,\" Sarah says, \"we should require them to work elsewhere first. Get outside experience. We made that mistake with ourselves.\"\n\n";

                        baseDesc += "The family agrees this makes sense. The third generation will need to prove themselves before joining Anderson Packaging—a lesson learned from the second generation's growing pains.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Continue",
                            effects: {
                                sarahHappiness: 10,
                                robertHappiness: 10
                            },
                            impact: `<p>Emily and David show promise for the future of Anderson Packaging. The family informally agrees that the grandchildren should gain outside experience before joining the business.</p><p>The third generation is still years away from entering the workforce, but the seeds of the next transition are being planted.</p>`
                        }
                    ]
                },
                
                // Event 21: 2032 - Jennifer's Buyout Request
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
                                    impact: `<p>The family buys out Jennifer's ${jenOwnership.toFixed(0)}% stake for $${buyoutValueM}M.</p><p>Jennifer receives the money and is grateful—she can finally buy a home and build financial security.</p><p>The family had to borrow to complete the buyout. The company carries new debt.</p><p>Jennifer remains part of the family but is no longer a shareholder. Her connection to the business fades.</p>`
                                },
                                {
                                    text: "Ask Jennifer to hold her shares—offer increased dividends instead",
                                    effects: {
                                        profit: -150000,
                                        jenniferHappiness: -20
                                    },
                                    impact: `<p>The family asks Jennifer to keep her ownership and commits to paying consistent dividends going forward.</p><p>Jennifer is disappointed and hurt—the family won't help when she needs it most.</p><p>She feels trapped as a passive shareholder in a business she doesn't control, unable to access the value of her shares.</p><p>Family relationships become strained. Sunday dinners are tense.</p>`
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
                                    impact: `<p>The family grants Jennifer 10% ownership as a gesture of inclusion and fairness.</p><p>Jennifer is overwhelmed and grateful—she finally feels valued as part of the family legacy.</p><p>Sarah is frustrated. "She's never worked a day in the business and now gets 10%?" ${gameState.michaelLeft ? '' : 'Michael also resents the decision.'}</p><p>The gift solves Jennifer's immediate problem but creates new tensions about merit vs. family equality.</p>`
                                },
                                {
                                    text: "Offer Jennifer a token role with modest salary",
                                    effects: {
                                        profit: -60000,
                                        jenniferHappiness: -5,
                                        robertHappiness: -5,
                                        employees: 1
                                    },
                                    impact: `<p>The company creates a "Community Relations" role for Jennifer at $60K/year.</p><p>Jennifer accepts reluctantly. She knows it's a pity hire. The modest salary helps, but she's still far behind her siblings financially.</p><p>Employees notice Jennifer has a job but no real responsibilities. It's awkward for everyone.</p><p>The compromise satisfies no one—Jennifer still feels like an outsider, and the business has an unproductive employee on payroll.</p>`
                                },
                                {
                                    text: "Explain that ownership must be earned through business contribution",
                                    effects: {
                                        jenniferHappiness: -30,
                                        robertHappiness: -15
                                    },
                                    impact: `<p>Robert gently but firmly explains that ownership requires direct business contribution.</p><p>Jennifer is devastated. "So I'm just... not really part of this family?" she asks, tears streaming down her face.</p><p>She leaves the meeting early. Over the following months, she stops attending family gatherings.</p><p>Robert questions whether he made the right choice. The principle is sound, but the human cost is high.</p><p>The family business has created a permanent rift in the family.</p>`
                                }
                            ];
                        }
                    }
                },
                
                // Event 22: 2034 - The Founder's Passing (Narrative)
                {
                    date: "2034",
                    title: "The Founder's Passing",
                    description: function() {
                        let baseDesc = "Robert Anderson passed away peacefully at age 75. The man who started with $50,000 in 1994 built a thriving company that employs over a hundred people and serves clients nationwide.\n\n";

                        baseDesc += "His funeral draws hundreds—employees past and present, clients, competitors, community members. The tributes speak of his integrity, vision, and loyalty.\n\n";

                        baseDesc += "At the reception, stories flow: the time Robert personally delivered an order when a truck broke down, the way he remembered every employee's name, his insistence on quality over shortcuts.\n\n";

                        baseDesc += "\"He built something real,\" one longtime client says. \"Not just a business—a legacy.\"\n\n";

                        baseDesc += "Robert's will transfers his ownership to Sarah";
                        if (!gameState.michaelLeft) {
                            baseDesc += " (60%) and Michael (40%)";
                        }
                        baseDesc += ". The transition he planned for years has finally arrived.\n\n";

                        baseDesc += "Sarah stands at her father's grave as the crowd disperses. She makes a silent promise: to honor his values while building on his foundation. The company will evolve, but its soul will remain.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Continue",
                            effects: {
                                robertDeceased: true,
                                robertOwnershipTransfer: true,
                                sarahHappiness: 5,
                                revenue: 500000,
                                profit: 30000
                            },
                            impact: function() {
                                let result = `<p>Robert Anderson's legacy lives on in the company he built and the values he instilled.</p>`;
                                result += `<p>Sarah inherits ` + (gameState.michaelLeft ? "all" : "60%") + ` of Robert's ownership. `;
                                if (!gameState.michaelLeft) {
                                    result += `Michael receives 40%. `;
                                }
                                result += `</p><p>The second generation now leads Anderson Packaging into its next chapter, carrying forward Robert's vision while adapting to the future.</p>`;
                                return result;
                            }
                        }
                    ]
                },
                
                // Event 23: 2036 - Third Generation Arrives (Narrative)
                {
                    date: "2036",
                    title: "The Third Generation Arrives",
                    description: function() {
                        let baseDesc = "Emily (22) has graduated with an engineering degree from MIT. After working for two years at a major packaging competitor—honoring the family's commitment to outside experience—she's ready to join Anderson Packaging.\n\n";

                        baseDesc += "\"I learned so much out there,\" Emily tells Sarah. \"But I always knew I'd come back. This is our family's legacy.\"\n\n";

                        if (!gameState.michaelLeft) {
                            baseDesc += "David (20), Michael's son, is finishing business school. He's been interning at a tech startup, learning modern marketing and e-commerce. He'll join next year.\n\n";
                        }

                        baseDesc += "Sarah watches her daughter settle into her new office—the same office Sarah herself occupied when she first joined the company nearly 30 years ago.\n\n";

                        baseDesc += "\"Grandpa would be proud,\" Emily says, looking at Robert's photo on the wall.\n\n";

                        baseDesc += "\"He would,\" Sarah agrees, feeling the weight of three generations of Anderson ambition and responsibility. The third generation has arrived.";

                        return baseDesc;
                    },
                    options: [
                        {
                            text: "Continue",
                            effects: {
                                profit: -75000,
                                revenue: 400000,
                                sarahHappiness: 15,
                                michaelHappiness: function() { return gameState.michaelLeft ? 0 : 10; },
                                hasGen3: true
                            },
                            impact: function() {
                                let result = `<p>Emily joins Anderson Packaging as a junior engineer, bringing fresh ideas and outside experience.</p>`;
                                if (!gameState.michaelLeft) {
                                    result += `<p>David will join next year in business development.</p>`;
                                }
                                result += `<p>Revenue increases as the young generation brings new energy.</p><p>The third generation is now part of the family business, carrying forward Robert's legacy into a new era.</p>`;
                                return result;
                            }
                        }
                    ]
                },
                
                // Event 24: 2040 - The Crossroads
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
                                let result = `<p>Sarah gives the green light. The company takes on $3M debt and invests massively in automation and AI.</p>`;

                                if (gameState.hasGen3) {
                                    result += `<p>Emily and David lead the transformation. Revenue and profit surge as efficiency multiplies. Company valuation increases dramatically.</p><p>But the transformation is wrenching. Twelve long-time employees lose their jobs to automation—people who knew Robert personally. Some had been with the company for 20+ years.</p>`;
                                } else {
                                    result += `<p>Without the next generation to drive it, the transformation is slower and more difficult. Revenue eventually increases, but Sarah shoulders an enormous burden.</p><p>Twelve long-time employees lose their jobs to automation.</p>`;
                                }

                                if (gameState.robertDeceased) {
                                    result += `<p>Sarah wonders what her father would think. "Did I honor his legacy by ensuring survival? Or betray it by transforming everything he built?"</p>`;
                                } else {
                                    result += `<p>Robert is deeply troubled. He barely recognizes the company he founded. "I built this with relationships and craftsmanship. Now it's algorithms and machines."</p>`;
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
                                let result = `<p>Sarah chooses to honor Robert's legacy by preserving his approach—personal relationships, craftsmanship, steady organic growth.</p>`;

                                result += `<p>No employees lose their jobs. The company culture remains unchanged. Loyal customers appreciate the continuity.</p>`;

                                if (gameState.hasGen3) {
                                    result += `<p>But Emily and David are devastated. "Mom, we're choosing to become irrelevant," Emily argues. "Grandpa would want us to survive, not to preserve a museum."</p><p>David starts exploring opportunities at other companies. The third generation may not stick around to inherit a declining business.</p>`;
                                } else {
                                    result += `<p>Sarah feels she's honored her father's vision, even though it means slower growth.</p>`;
                                }

                                if (gameState.robertDeceased) {
                                    result += `<p>Sarah feels at peace. She preserved what Robert built, even if it means the company won't dominate the market.</p>`;
                                } else {
                                    result += `<p>Robert is grateful. "Thank you for keeping my vision alive, Sarah. This is the company I wanted it to be."</p>`;
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
                                let result = `<p>Sarah charts a middle path: modernize selectively while preserving the company culture and values Robert built.</p>`;

                                result += `<p>The company invests $2M in targeted automation—enough to stay competitive without becoming unrecognizable. Revenue and profit increase moderately.</p><p>Three positions are eliminated, but Sarah works to find those employees other roles or generous severance packages.</p>`;

                                if (gameState.hasGen3) {
                                    result += `<p>Emily and David are moderately satisfied. It's not the aggressive transformation they wanted, but it's progress. They can work with this.</p>`;
                                }

                                if (gameState.robertDeceased) {
                                    result += `<p>Sarah believes she's found the balance her father would have wanted—evolution without revolution.</p>`;
                                } else {
                                    result += `<p>Robert accepts the compromise. "It's not what I would have chosen, but I understand. Times change."</p>`;
                                }

                                result += `<p>The company remains recognizably "Anderson Packaging" while adapting to survive. It's not the most aggressive path, but it honors both legacy and pragmatism.</p><p>The family has chosen to be both builders AND preservers—a delicate balance that defines who the Andersons are.</p>`;

                                return result;
                            }
                        }
                    ]
                },
                
                // Event 25: 2044 - Fifty Years
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
                        var prevOffer = gameState.decisions.find(function(d) { return d.event === 18; });
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
                            impact: `<p>The Anderson family accepts the $45M offer.</p><p>After 50 years, Anderson Packaging is sold. The family becomes wealthy beyond Robert's wildest 1994 dreams.</p><p>Sarah has mixed emotions. Pride in what they built. Sadness that it's over.</p><p>Emily and David are disappointed—they wanted to lead the third generation. But they also understand the remarkable achievement.</p><p>Robert Anderson's $50,000 investment in 1994 has become $45M in 2044. The family business has changed the Anderson family forever.</p>`
                        },
                        {
                            text: "Transition to third generation—Emily as CEO",
                            effects: {
                                sarahHappiness: 20,
                                revenue: 2000000,
                                profit: 120000  // 6% margin on cardboard
                            },
                            impact: `<p>Sarah announces that Emily will become CEO within two years. David will be President.</p><p>The third generation takes the helm. Revenue and profit grow under fresh leadership with new ideas.</p><p>Sarah is proud—the family legacy continues.</p><p>Anderson Packaging enters its second half-century under third-generation leadership.</p><p>Robert's dream lives on. The family business he started in 1994 will see 2050 and beyond.</p>`
                        }
                    ]
                }
            
];
