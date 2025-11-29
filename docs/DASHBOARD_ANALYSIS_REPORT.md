# Dashboard Prototype Analysis: Design Validation Report

> 📌 **Related Document:** See `JTBD_FRAMEWORK.md` for core framework reference and 10 test scenarios

**Date:** November 29, 2024
**Purpose:** Evaluate whether the UI prototype properly surfaces all data needed to validate JTBD design
**Context:** This is a design prototype for team alignment. Hardcoded data is appropriate.

---

## Executive Summary

The prototype demonstrates a **solid foundation for the core interaction patterns** (role-based filtering, status override, manual flags), but **lacks critical data displays** needed to validate JTBD #2 (Post-Secondary Readiness).

**Cannot currently validate:**
- Can counselors assess college list balance? (no data shown)
- Can counselors track applications & decisions? (no data shown)
- Can counselors verify artifact quality issues? (no quality data shown)
- Can counselors spot stale GPA needing update? (no data age shown)

**Can validate:**
- Ghost student detection works
- Flag system structure is clear
- Role-based filtering patterns are intuitive
- Override/manual flag workflows are usable

**Design Prototype Grade: B-**
- ✅ Core UI patterns work well
- ✅ Interaction flows are clear
- 🟡 Missing post-secondary data displays
- 🟡 Missing artifact quality feedback
- 🟡 Missing curriculum timeline context

---

## Part 1: JTBD Coverage Assessment

### JTBD 1: Graduation Compliance ✅ CORRECTLY OMITTED
**Status:** Not shown (as intended)

The prototype correctly does NOT show graduation compliance. GPA is contextual data only. ✅

---

### JTBD 2: Post-Secondary Readiness 🔴 MISSING DATA DISPLAYS

#### What's Currently Shown:
- Binary status (On/Off Track)
- 6 flags with descriptions
- Status reason text

#### What's Missing (Can't Validate Design):

**For 11th/12th Grade:**
- ❌ College list display (schools, acceptance rates, balance)
- ❌ Application tracking (submitted, pending, decided)
- ❌ FAFSA status
- ❌ Scholarship data
- ❌ Financial aid award comparison
- ❌ Enrollment decision

**Example Problem:**
```
Current: Sarah Johnson (Grade 12, Off Track, Flag: strategy)
Cannot answer:
- What colleges is she considering?
- Has she applied?
- Is her list balanced?
- Why is the strategy risk?

Need to show: College list view with schools, acceptance rates, fit balance
```

**For 9th/10th Grade:**
- ❌ Unit-by-unit curriculum status (only shows overall %)
- ❌ Individual artifact quality (no artifact display)
- ❌ Reflection completion status
- ❌ Specific feedback on what needs revision

**Example Problem:**
```
Current: Casey Miller (Grade 9, 12% curriculum, Flag: revision)
Cannot answer:
- Which specific unit is overdue?
- What artifact needs revision?
- What was the feedback?
- What should student do next?

Need to show: Unit breakdown with due dates, artifact status, feedback
```

#### Impact on Design Validation:
- **Cannot validate** whether college list UI makes imbalance obvious
- **Cannot validate** whether application status helps prioritize
- **Cannot validate** whether artifact feedback is actionable
- **Cannot validate** post-secondary readiness assessment workflow

---

### JTBD 3: Implementation Fidelity (Admin View) 🟢 GOOD

#### What's Shown:
- ✅ Overall curriculum progress (175/234 lessons = 75%)
- ✅ Timeline showing progress over time
- ✅ By-grade breakdown with color coding
- ✅ Key insights about Grade 12 needing support

#### Design Validation:
- ✅ Can see if by-grade breakdown helps identify outliers
- ✅ Can see if timeline visualization is clear
- ✅ Can see if insights are actionable

#### Minor Gap (Nice to Have, Not Blocking):
- Could show by-teacher breakdown to validate "which teachers are compliant" pattern

---

### JTBD 4: Student Curriculum Engagement (Quality Control) 🟡 PARTIAL

#### What's Shown:
- ✅ Curriculum completion % with color coding
- ✅ Lessons completed / total lessons
- ✅ Ghost student detection with insight card
- ✅ Curriculum filter (ghost/behind/on-track)

#### What's Missing (Needed for Validation):

**Unit-Level View:**
- ❌ Which specific units are complete vs. incomplete?
- ❌ Due dates for each unit
- ❌ Which units are overdue

**Artifact Quality:**
- ❌ What artifacts were submitted?
- ❌ Quality scores (0-100) or pass/fail status
- ❌ Specific feedback ("too short", "wrong file", "coherence issue")
- ❌ Whether artifact is submitted, in review, or needs revision

**Reflection Status:**
- ❌ Was reflection completed?
- ❌ Reflection quality tier (Experience/Synthesis/etc)
- ❌ Sentiment analysis (neutral, positive, concerning)

#### Example Problem:
```
Current: Tyler Bennett (Grade 10, 0% curriculum, GPA 3.8)
Insight: "High-performing student with zero curriculum engagement"
Cannot answer:
- Unit 1 is past due. How many days?
- Were any artifacts submitted?
- Or is student truly 0% (not enrolled)?
- Should counselor call or email?

Need to show:
- Unit 1 status: "Not started, due Nov 15, OVERDUE 13 days"
- No artifacts submitted
- No reflections submitted
```

#### Impact on Design Validation:
- **Cannot validate** whether unit breakdown helps prioritize
- **Cannot validate** whether artifact feedback pattern is clear
- **Cannot validate** whether severity is obvious (stalled vs. just behind)

---

### JTBD 5: Student Intervention (The "Flagging" System) 🟡 TESTABLE BUT INCOMPLETE

#### What's Shown:
- ✅ 6 flag types with icons and descriptions
- ✅ Flag count in table view
- ✅ Ability to add manual "Staff Follow-up" flag with note
- ✅ Flag filtering (Sentiment, Academic, Deadline, Revision, Strategy)
- ✅ Status override capability

#### What's Missing (Needed for Validation):

**Flag Trigger Clarity:**
- ❌ How obvious is it *why* a student has a flag?
- ❌ Can you distinguish between different Needs Revision reasons? (wrong file vs. too short vs. low quality)
- ❌ Is Academic Warning only for stale GPA or other things?

**Flag as Action Item:**
- ❌ Does flag look like something that needs action today?
- ❌ Or does it look like a label/metadata?
- ❌ Can you "mark flag as acknowledged" or "resolved"?

**Sentiment Alert Special Handling:**
- ❌ When flag is Sentiment Alert, can you see the concerning content?
- ❌ Is there a "refer to counselor" action or just a flag?

**Manual Override Context:**
- ❌ When status is overridden (green but should be red), is the reason visible?
- ❌ Can other staff see why?

#### Example Scenarios to Test:

**Scenario A: Multiple flags**
```
Emma Rodriguez: [Sentiment Alert] [Academic Warning]
Questions for design validation:
- Is it obvious which flag needs immediate action?
- Does counselor know to check sentiment first (safety)?
- Or does academic warning (stale GPA) take priority?
```

**Scenario B: Low quality artifact**
```
Casey Miller: [Needs Revision]
Questions:
- Can you see what needs revision? (too short? wrong file? low quality?)
- What should student do?
- Can student see the feedback?
```

**Scenario C: Override reason**
```
Shows: Status is ON TRACK (green)
But should be: OFF TRACK (red)
Questions:
- Is the override reason visible?
- Do other counselors see "Exempt until Nov 1 due to work schedule"?
- Or is it hidden?
```

#### Impact on Design Validation:
- **Partially validates** flag structure
- **Cannot validate** clarity of flag reasons
- **Cannot validate** whether flags feel actionable vs. passive
- **Cannot validate** sentiment alert special handling

---

### JTBD 6: Insights About Students 🔴 COMPLETELY MISSING

Not addressed in prototype. This is okay for Phase 1—focus on individual student workflows first.

---

## Part 2: Design Pattern Validation

### What Works Well ✅

#### 1. Role-Based View Switching
**Pattern:** RoleSwitcher in header, different analytics per role

**Validation:** ✅ Works
- Counselor sees: "My Students", "Off Track", "Urgent Today", "Next Meeting"
- Admin sees: "Off Track", "Urgent Flags", "Curriculum Progress", "Curriculum Pacing"
- Teacher sees: "Caseload", "Missing Work", "Concerns", "Submitted"

**Feedback:** Clear and easy to understand which KPIs matter to each role.

---

#### 2. Ghost Student Detection & Highlighting
**Pattern:** Amber background + insight card explaining contradiction

**Validation:** ✅ Works
- Tyler Bennett: GPA 3.8 but 0% curriculum
- Insight card shows the two metrics side-by-side
- Suggests specific next steps

**Feedback:** Excellent. Makes problem obvious. Suggests actions.

**Suggestion:** Could extend this pattern to other scenarios:
- All-reach college list (for 11th/12th)
- Stale GPA (for any grade)
- Sentiment alert (separate color/treatment)

---

#### 3. Filtering & Sorting
**Pattern:** Grade filter, Status filter, Curriculum filter, Flag filter, Search

**Validation:** ✅ Works
- Ghost Students filter is particularly useful
- Can isolate "Off Track" to see priority list
- Search works smoothly

**Feedback:** Powerful and intuitive. Good taxonomy.

---

#### 4. Status Override Button
**Pattern:** Click button → prompt for reason → adds Staff Follow-up flag

**Validation:** 🟡 Partially testable
- UI works
- But can't test if reason persists
- Can't test if other counselors see the reason

**Suggestion:** Show override reason in DetailPanel even when status is green, so other staff understand the exception.

---

#### 5. Manual Flag with Note
**Pattern:** Add Staff Follow-up with custom text

**Validation:** ✅ Works
- Button is clear
- Textarea accepts note
- Alert confirms action

**Feedback:** Good. Manual override path is usable.

---

### What Needs Validation Design Work 🟡

#### 1. College List Display (CRITICAL)
**Current:** No UI exists
**Need to design:**
- How do you show school, acceptance rate, and "fit" type?
- How obvious is an imbalanced list? (all reach schools)
- How does counselor quickly assess if strategy is sound?

**Suggested mockup test:**
```
Student: Alex Kim (Grade 11)
Show 4 schools:
- Harvard (4% acceptance) - REACH
- MIT (3% acceptance) - REACH
- Stanford (4% acceptance) - REACH
- Yale (5% acceptance) - REACH

Question: Is it IMMEDIATELY OBVIOUS this is risky?
Should show: "All 4 schools are reach (< 10% acceptance rate)"
Visual: Red warning or amber highlight
Action: "Suggest adding 2 target schools (25-50% acceptance)"
```

**Suggested mockup test 2:**
```
Student: Maria Santos (Grade 11)
Show 4 schools:
- UC Berkeley (15% acceptance) - REACH
- Cal State LA (65% acceptance) - TARGET
- San Diego State (62% acceptance) - TARGET
- City College (100% acceptance) - SAFETY

Question: Is it IMMEDIATELY OBVIOUS this is balanced?
Should show: "Good balance: 1 reach, 2 target, 1 safety"
Visual: Green checkmark
Action: None needed
```

---

#### 2. Artifact Quality Feedback Display (CRITICAL)
**Current:** Artifact flagged as "Needs Revision" but no detail shown
**Need to design:**
- Can student see what's wrong?
- Can counselor see what feedback was given?
- Is it specific enough to act on?

**Suggested mockup test:**
```
Unit: 1 - Career Vision
Artifact: Who I Am Statement
Status: NEEDS REVISION
Submitted: Nov 15, 2024

Feedback from system:
❌ QUALITY ISSUE DETECTED
- Content: Too short (1 sentence, need 2-3 paragraphs)
- Missing: Personal background/context
- Missing: Connection to career interests
- Suggestion: Add paragraph about your background and why career matters

Action buttons:
[Resubmit] [View Sample] [Contact Student]
```

**Question:** Is this feedback actionable? Can student understand what to fix?

---

#### 3. Unit-by-Unit Curriculum Timeline (CRITICAL)
**Current:** Shows overall % only
**Need to design:**
- Can counselor see which units are overdue?
- Can counselor see pattern (student submitted Unit 1, hasn't started Unit 2)?
- Is due date obvious?

**Suggested mockup test:**
```
Unit Completion Timeline:

Unit 1: Career Vision
📅 Due: Nov 15, 2024
Status: ⚠️ OVERDUE (13 days)
Artifacts: Career Vision Statement (submitted ✅), Career Exploration Matrix (❌)
Action: [Contact about overdue unit]

Unit 2: Impact Project
📅 Due: Dec 15, 2024
Status: ⏳ IN PROGRESS (due in 16 days)
Artifacts: Impact Proposal (in review), Reflection (not started)
Action: [Check on progress]

Unit 3: Career Pathways
📅 Due: Jan 15, 2025
Status: ⏸️ NOT STARTED (due in 47 days)
Action: None yet
```

**Question:** Is it obvious what student should focus on? Is priority clear?

---

#### 4. Application & Financial Aid Status (HIGH)
**Current:** Not shown
**Need to design:**
- How do you show application timeline (submitted → decision → accept/reject)?
- How do you show scholarship awards?
- How do you indicate "award comparison deadline May 1" as urgent?

**Suggested mockup test:**
```
Applications:
[Submitted: 5] [Decisions: 3] [Accepted: 2] [Rejected: 1] [Waitlisted: 0]

By School:
UC Davis .............. Submitted Nov 1 → Decision Pending
UC Santa Barbara ...... Submitted Nov 5 → ACCEPTED Dec 1
Cal Poly .............. Submitted Nov 10 → Pending (expected Jan)

Financial Aid:
FAFSA Status: Submitted ✅
Scholarships Awarded:
- UCSB Merit Scholarship: $15,000/year
- State Grant: $5,500/year
Total: $20,500

⏰ ACTION REQUIRED:
Award Comparison Due: May 1, 2025 (due in 153 days)
Enrollment Deposit Due: May 15, 2025
```

**Question:** Can counselor see if student is on track? What stands out as urgent?

---

#### 5. GPA Data Age Indicator (MEDIUM)
**Current:** Shows "GPA: X, Entered: [date]"
**Need to design:**
- How obvious is it when GPA is stale (> 1 year old)?
- Should there be a warning?

**Suggested mockup test:**
```
Academic Data:
GPA: 1.6
Last Updated: Feb 1, 2024
⚠️ DATA IS STALE (272 days old)

Suggestion: Update GPA to reflect current term

[Update GPA] [Mark as Verified]
```

**Question:** Does counselor know GPA needs updating? Or might they miss it?

---

## Part 3: Scenario Validation Test Cases

Use these scenarios to **walk through with stakeholders** and validate design decisions:

### Scenario 1: High Achiever Not Engaging (Ghost) ✅ CAN VALIDATE

**Setup:**
```
Tyler Bennett: Grade 10
GPA: 3.8 (Fresh - Nov 25)
Curriculum: 0% (Expected 31%)
Status: OFF TRACK
Flag: Missed Deadline
```

**Questions:**
1. Is the contradiction obvious? (high GPA + zero curriculum)
2. Does insight card suggest right next step? (outreach, not tutoring)
3. How many days overdue is Unit 1?

**Currently in prototype:** ✅ Can see some of this
**Missing:** Specific due date and days overdue for Unit 1

---

### Scenario 2: Low Quality Artifact (Needs Revision) 🟡 PARTIAL

**Setup:**
```
Casey Miller: Grade 9, 12% curriculum
Unit 1 artifact: "I am a student at this school" (1 sentence, too short)
Status: OFF TRACK
Flag: Needs Revision, Deadline
```

**Questions:**
1. Can you see what was submitted?
2. Can you see the specific quality issue? (too short? wrong file? low quality?)
3. Can you see feedback for student?
4. What action should counselor/student take?

**Currently in prototype:** ❌ Cannot see artifact detail
**Missing:** Artifact review UI with quality feedback

---

### Scenario 3: Imbalanced College List (Strategy Risk) ❌ CANNOT VALIDATE

**Setup:**
```
Alex Kim: Grade 11
All 4 schools are "reach" (< 10% acceptance)
Status: OFF TRACK
Flag: Strategy Risk
```

**Questions:**
1. Is it OBVIOUS the list is imbalanced?
2. Does it look like "risky" vs. just "ambitious"?
3. What would you recommend?

**Currently in prototype:** ❌ No college list shown
**Missing:** College list UI with balance indicator

---

### Scenario 4: Stale GPA (Academic Warning) 🟡 PARTIAL

**Setup:**
```
Alex Chen: Grade 10
GPA: 3.5, Entered: Feb 1, 2024 (9 months old)
Curriculum: Excellent (90%+)
Status: Depending on how you set it
Flag: Academic Warning
```

**Questions:**
1. Is it obvious the GPA is old?
2. Should this trigger a flag?
3. Does counselor know to update it?

**Currently in prototype:** 🟡 Can see date, but no age indicator
**Missing:** Visual indicator when GPA > 12 months old

---

### Scenario 5: Alternative Post-Secondary Path (Apprenticeship) ❌ CANNOT VALIDATE

**Setup:**
```
Jordan Brooks: Grade 12
Has no college applications
Has resume and apprenticeship info in journal
Status: Should be OFF TRACK (0 apps) OR ON TRACK (alternative path logged)
Flag: Strategy Risk? Or resolved?
```

**Questions:**
1. How does system know if 0 apps is a problem or intentional?
2. Where does apprenticeship get logged?
3. Does that change the status?

**Currently in prototype:** ❌ No apprenticeship tracking
**Missing:** Way to log alternative paths (trade school, gap year, work, military, etc)

---

### Scenario 6: Sentiment/Safety Concern ⚠️ NEEDS CAREFUL DESIGN

**Setup:**
```
Emma (or new student): Grade 9
Submitted reflection: "I feel unsafe at home"
Content quality: Good
Status: Should be ON TRACK (work is good)
Flag: Sentiment Alert (separate action, not status-based)
```

**Questions:**
1. Can counselor see the concerning content?
2. Is there a special action (refer to counselor, not just flag)?
3. Does this bypass other quality checks?
4. Who should be notified?

**Currently in prototype:** 🟡 Flag exists, but special handling unclear
**Missing:** Sentiment alert workflow (showing content, escalation path)

---

### Scenario 7: Manual Override (Exemption) 🟡 PARTIAL

**Setup:**
```
Student: Grade 11, GPA 1.2
Status Shown: ON TRACK (manually overridden)
Reason: "Exempt from Resume Unit until Nov 1 due to work schedule"
Flag: Staff Follow-up
```

**Questions:**
1. Is it clear this is an override, not genuine On Track?
2. Can other counselors see the reason?
3. Does the override expire Nov 1?
4. Can anyone see who set the override?

**Currently in prototype:** 🟡 UI exists but persistence unclear
**Missing:** Display of override reason, who set it, when it expires

---

### Scenario 8: Binge Submitter (No Activity Spike Flag) ✅ CAN VALIDATE

**Setup:**
```
Riley Chen: Grade 11
Inactive Oct 1-30
Oct 31 11 PM: Submitted 2 units, quality passes
Status: ON TRACK
Flags: NONE (no "activity spike" noise)
```

**Questions:**
1. Does no-flag decision feel right? (framework says: met deadline + quality = green, no noise)
2. Is there any indication of the last-minute submission pattern?
3. Or should there be?

**Currently in prototype:** ✅ Can see and validate this
**Observation:** Framework intent is correct—no false alarm flags

---

## Part 4: Design Validation Checklist

Before moving to development, stakeholders should walk through and sign off on:

### Post-Secondary Readiness (11th/12th Grade)

- [ ] **College List Display**
  - [ ] Schools, acceptance rates visible?
  - [ ] Balance (reach/target/safety) obvious?
  - [ ] Imbalanced list looks risky?
  - [ ] Balanced list looks good?

- [ ] **Application Tracking**
  - [ ] Submitted count visible?
  - [ ] Decision status clear?
  - [ ] Timeline makes sense?

- [ ] **Financial Aid**
  - [ ] FAFSA status clear?
  - [ ] Scholarships awarded shown?
  - [ ] Award comparison deadline prominent?
  - [ ] Feels urgent when appropriate?

- [ ] **Readiness Assessment**
  - [ ] Can counselor quickly assess: is this student on track?
  - [ ] What's the next action?

### Curriculum Engagement (9th-12th Grade)

- [ ] **Unit Timeline**
  - [ ] Due dates visible?
  - [ ] Overdue clearly marked?
  - [ ] Days overdue shown?
  - [ ] Clear which unit is priority?

- [ ] **Artifact Quality**
  - [ ] What was submitted visible?
  - [ ] Quality feedback specific?
  - [ ] Actionable for student?
  - [ ] Visible to counselor?

- [ ] **Reflection Status**
  - [ ] Completion status visible?
  - [ ] Quality assessment visible? (Alma tier, sentiment)

- [ ] **Quality Assessment**
  - [ ] Can distinguish reasons for "Needs Revision"?
  - [ ] (too short vs wrong file vs low quality)

### Flags & Intervention

- [ ] **Flag Clarity**
  - [ ] Why does each student have their flags?
  - [ ] Is reason obvious?

- [ ] **Flag as Action**
  - [ ] Do flags feel like "action needed"?
  - [ ] Or do they feel like metadata/labels?

- [ ] **Sentiment Alert Special Case**
  - [ ] Can see concerning content?
  - [ ] Clear escalation path?
  - [ ] Appropriate urgency?

- [ ] **Manual Override**
  - [ ] Override reason visible?
  - [ ] Visible to other staff?
  - [ ] Clear when set and by whom?

### Ghost Student Pattern

- [ ] **Detection**
  - [ ] Amber highlighting obvious?
  - [ ] Insight card helpful?

- [ ] **Suggested Actions**
  - [ ] Do suggested next steps make sense?
  - [ ] Clear what counselor should do?

---

## Part 5: Missing Data Displays (Priority Order)

### CRITICAL - Blocks JTBD #2 Validation

**1. College List View (11th/12th)**
```typescript
// Add to student data:
collegeList: [
  {
    name: 'School Name',
    acceptanceRate: 15, // 0-100
    type: 'reach' | 'target' | 'safety', // or calculated from rate
    appliedStatus: 'interested' | 'applied' | 'accepted' | 'rejected',
  }
]

// Design to show:
// School Name ........... Acceptance Rate ... Status
// Harvard ............... 4% (Reach) ........ Interested
// Cal State LA ........... 65% (Target) ..... Applied → ACCEPTED
// City College ........... 100% (Safety) .... Applied

// Plus: "Balance: 1 Reach, 2 Target, 1 Safety ✅" or "⚠️ All Reach"
```

**2. Unit-by-Unit Curriculum (All Grades)**
```typescript
// Extend CurriculumStatus:
units: [
  {
    unitNumber: 1,
    title: 'Career Vision',
    dueDate: '2024-11-15',
    status: 'overdue', // or 'submitted', 'in-progress', 'not-started'
    daysSinceOverdue: 13,
    artifacts: [
      {
        type: 'artifact',
        title: 'Career Vision Statement',
        status: 'submitted' | 'needed' | 'in-review',
        submittedDate?: '2024-11-14',
      }
    ]
  }
]

// Display as timeline:
// [Unit 1 - OVERDUE 13 days] [Unit 2 - IN PROGRESS] [Unit 3 - Coming Soon]
```

**3. Artifact Quality Feedback (All Grades)**
```typescript
// Add to artifact:
quality: {
  score: 75, // 0-100
  status: 'needs-revision' | 'acceptable' | 'excellent',
  feedback: 'Too short. Expand to 2-3 paragraphs.',
  submittedDate: '2024-11-14',
  submittedFile: 'who-i-am-statement.pdf',
}

// Display:
// Who I Am Statement
// Status: ❌ Needs Revision (Submitted Nov 14)
// Issue: Too short (1 sentence, need 2-3 paragraphs)
// Action: [Resubmit] [View Feedback] [Contact Student]
```

### HIGH - Blocks Full JTBD #2 Validation

**4. Application Status (12th Grade)**
```typescript
applications: [
  {
    school: 'UC Davis',
    submittedDate: '2024-11-01',
    status: 'submitted' | 'pending' | 'accepted' | 'rejected' | 'waitlisted',
    decisionDate?: '2024-12-01',
  }
]

// Display:
// [5 submitted] [3 decisions] [2 accepted] [1 rejected] [0 waitlisted]
// UC Santa Barbara ........ Applied Nov 5 → ACCEPTED Dec 1
```

**5. Financial Aid (12th Grade)**
```typescript
fafsaStatus: 'not-started' | 'in-progress' | 'submitted' | 'processed',
scholarships: [
  {
    name: 'UCSB Merit',
    amount: 15000,
    source: 'university' | 'external' | 'grant',
  }
]

// Display:
// FAFSA: Submitted ✅
// Total Scholarships: $20,500
// Last action: Award Comparison (due May 1)
```

### MEDIUM - Nice to Have, Doesn't Block Validation

**6. GPA Age Indicator**
```typescript
// Extend academic data display:
gpaAge: number, // days since last entry
dataDate: string,

// Show warning if > 365 days:
// "⚠️ GPA is 9 months old. Consider updating."
```

**7. Alternative Path Tracking**
```typescript
// Add to student:
postSecondaryPath: {
  type: 'college' | 'trade-school' | 'apprenticeship' | 'gap-year' | 'work' | 'military',
  program?: string,
  status: 'interested' | 'applied' | 'accepted' | 'enrolled',
  notes?: string,
}

// Use to override "0 apps = off track" rule for apprenticeship case
```

---

## Part 6: Design Refinement Recommendations

### 1. Differentiate "Needs Revision" Reasons

**Current:** Single "Needs Revision" flag
**Problem:** Can't tell if it's wrong file, too short, low quality, or missing reflection

**Suggestion for Design:**
- Keep single flag type (good for filtering)
- But show reason in DetailPanel
- Examples:
  - "Needs Revision: File validation (uploaded .docx instead of .pdf)"
  - "Needs Revision: Content too short (1 sentence, need 2-3 paragraphs)"
  - "Needs Revision: AI quality (score 35/100, needs more detail)"
  - "Needs Revision: Missing reflection (artifact submitted, reflection skipped)"

---

### 2. Make Overdue Obvious

**Current:** "Status is Off Track because of: Curriculum Stagnation"
**Problem:** Not obvious how many days overdue or which unit

**Suggested Design:**
```
🚨 OVERDUE
Unit 1: Career Vision (due Nov 15)
⏰ 13 days overdue
0 artifacts submitted

Next Step: Contact student about Unit 1
```

---

### 3. Sentiment Alert Special Treatment

**Current:** Same badge as other flags
**Problem:** Doesn't feel like safety issue

**Suggested Design:**
```
🚨 SENTIMENT ALERT - Requires Immediate Review

Content: [Show relevant excerpt]
Detected Issue: References feeling unsafe at home
Recommended Action:
[ Contact Counselor Now ] [ Escalate to Admin ] [ Document & Monitor ]
```

---

### 4. Flag Status Progression

**Current:** Flags are permanent once added
**Problem:** No way to know if action was taken or issue resolved

**Suggested for Next Phase:**
- When user acknowledges flag: "🟡 ACKNOWLEDGED (by Sarah Smith, Nov 28)"
- When resolved: "✅ RESOLVED (by Sarah Smith, Nov 28, action: contacted student)"
- Keeps audit trail without removing flag

---

### 5. Better Priority Indication

**Current:** Flags shown in arbitrary order
**Problem:** When student has multiple flags, not clear which to address first

**Suggested Design:**
```
Priority 1 (Safety):
  🚨 Sentiment Alert

Priority 2 (Urgent Timeline):
  ⏰ Missed Deadline (13 days overdue)

Priority 3 (Action Needed):
  ❌ Needs Revision (artifact quality)
```

---

## Part 7: Next Steps for Team Alignment

### This Week:
- [ ] Walk through each JTBD with team
- [ ] Discuss: "For JTBD #2, what data must be visible?"
- [ ] Get agreement on college list design
- [ ] Get agreement on artifact quality feedback design

### Next Week:
- [ ] Add mock data (college list, applications, scholarships)
- [ ] Add mock data (artifact quality, unit timeline)
- [ ] Prototype college list UI component
- [ ] Prototype artifact feedback UI component
- [ ] Prototype unit timeline UI

### Week 3:
- [ ] Have team walk through Scenarios 1-8
- [ ] Collect feedback: "Is it obvious what action to take?"
- [ ] Iterate on UI clarity
- [ ] Test with sample stakeholders (teacher, counselor, admin)

### Week 4:
- [ ] Finalize design direction
- [ ] Document data requirements for development phase
- [ ] Prepare hand-off to dev team

---

## Summary: What's Working vs. What Needs Design Work

### ✅ Working Well (Can Validate Now)
1. Ghost student detection pattern
2. Role-based filtering and analytics
3. Overall curriculum % display
4. Flag structure (6 types)
5. Status override/manual flag workflow
6. Fidelity modal for JTBD #3

### 🟡 Partially Working (Need Data to Complete)
1. Status reason text (hardcoded, not dynamic)
2. Flag trigger clarity (why does student have this flag?)
3. Curriculum engagement (only shows %, need units)

### ❌ Not Yet Designed (Critical for Validation)
1. College list balance visualization (CRITICAL)
2. Artifact quality feedback display (CRITICAL)
3. Unit timeline with due dates (CRITICAL)
4. Application status tracking (HIGH)
5. Financial aid tracking (HIGH)
6. Sentiment alert special handling (HIGH)
7. Override reason persistence display (MEDIUM)

---

## Conclusion

The prototype demonstrates **strong foundational interaction patterns**. It successfully validates:
- ✅ Role-based filtering makes sense
- ✅ Ghost student detection is useful
- ✅ Flag structure is clear
- ✅ Manual intervention workflows are usable

To move forward with stakeholder alignment on JTBD #2 (Post-Secondary Readiness), the team needs to **add and validate**:
- College list display with balance indicator
- Artifact quality feedback patterns
- Unit-by-unit curriculum timeline
- Application & financial aid tracking

These are **design decisions**, not implementation tasks. Once the team agrees on how these should be displayed and prioritized, the data model for development will be obvious.

**Recommendation:** Spend next 2 weeks on design mockups for college list and artifact quality. Once team agrees on these two critical pieces, the rest follows naturally.

