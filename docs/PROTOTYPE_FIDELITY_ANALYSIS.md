# Prototype UI/UX Analysis Report
## Willow Dashboard - Design Fidelity & Scenario Support

**Analysis Date**: December 1, 2024
**Purpose**: Comprehensive evaluation of prototype implementation against JTBD Framework and Dashboard Requirements
**Context**: Design prototype for internal team alignment; focus on UI/UX fidelity, not production-readiness

---

## 📈 IMPLEMENTATION PROGRESS

### **PHASE 1: Foundation (COMPLETED ✅)**
**Commit**: `b4a7c5a` | **Date**: December 1, 2024 | **Status**: Live on dev server

#### ✅ Completed Tasks:

**1.1 Unit-by-Unit Curriculum Timeline** ✅ DONE
- Files: `lib/types/index.ts` (Unit, Artifact interfaces), `lib/data/studentUnits.ts`, `components/dashboard/UnitTimelineCard.tsx`, `components/dashboard/DetailPanel.tsx`
- Implementation: Complete unit timeline with status icons, due dates, days overdue, artifact list
- Sample Data: 6 students with varying unit statuses (overdue, in-progress, not-started, completed)
- Unblocks: Scenarios 1, 2, 10
- Status: **LIVE** - Dev server rendering correctly

**1.2 GPA Age Indicator** ✅ DONE
- Files: `lib/utils/dateUtils.ts`, `components/dashboard/DetailPanel.tsx`
- Implementation: Calculates GPA age, shows amber warning if >365 days old, displays formatted age text
- Hydration Fix: Uses `useEffect` + `suppressHydrationWarning` to render dates only on client
- Unblocks: Scenario 4
- Status: **LIVE** - Shows warning for Alex Chen's Feb 1, 2024 GPA

**1.3 Enhanced Flag Display with Reason Granularity** ✅ DONE
- Files: `lib/types/index.ts` (added reason field to Flag), `lib/data/students.ts` (emoji icons + reasons), `components/dashboard/DetailPanel.tsx` (display logic)
- Implementation: Added emoji icons (🚨✏️⏰🎯📚👤) + specific reasons for each flag type
- Unblocks: Better clarity on flag triggers
- Status: **LIVE** - All flags show icons and reasons in DetailPanel

**1.4 Sentiment Alert Special Card Component** ✅ DONE
- Files: `components/dashboard/SentimentAlertCard.tsx`, `components/dashboard/DetailPanel.tsx`
- Implementation: Red background card with "🚨 REQUIRES IMMEDIATE REVIEW", content excerpt, escalation buttons (Contact Counselor Now, Escalate to Admin, Document & Monitor)
- Positioning: Displays BEFORE other flags (highest priority)
- Unblocks: Scenario 6
- Status: **LIVE** - Emma Rodriguez shows sentiment alert with escalation path

#### 📊 Scenario Validation Progress:
- ✅ **Scenario 1** ("Ghost High Achiever"): Unit 1 shows 13 days overdue
- ✅ **Scenario 4** ("Stale Data Comeback"): GPA age warning displays
- ✅ **Scenario 6** ("Silent Crisis"): Sentiment alert card with escalation
- 🟡 **Scenario 2, 10** (Quality feedback): Needs Phase 3 (artifact feedback UI)
- ❌ **Scenario 3, 5, 7** (College list, alt paths, financial aid): Needs Phase 2

#### 🔧 Bug Fixes Applied:
- Fixed hydration mismatch in TriageList (formatDate function)
- Fixed hydration mismatch in DetailPanel (GPA age calculation)
- Used suppressHydrationWarning strategically for date-dependent content
- All components compile with zero TypeScript errors

---

### **PHASE 2: Post-Secondary Data (PENDING ⏳)**
**Target**: Week 2-3 | **Status**: Not started

#### Pending Tasks:
- [ ] 2.1 College List Data Model & Display (blocks Scenario 3)
- [ ] 2.2 Application Status Tracking (blocks Scenario 7)
- [ ] 2.3 Financial Aid Tracking with Urgency (blocks Scenario 7)
- [ ] 2.4 Alternative Path Tracking (blocks Scenario 5)

---

### **PHASE 3: Artifact Quality Feedback (PENDING ⏳)**
**Target**: Week 3 | **Status**: Not started

#### Pending Tasks:
- [ ] 3.1 Artifact Quality Data Model
- [ ] 3.2 Artifact Display Component (blocks Scenarios 2, 10)

---

### **PHASE 4: Polish & Safety (PENDING ⏳)**
**Target**: Week 4 | **Status**: Not started

#### Pending Tasks:
- [ ] 4.1 Status Override with Reason Persistence (blocks Scenario 8)
- [ ] 4.2 Flag Priority Sorting

---

### **PHASE 5: Validation (PENDING ⏳)**
**Target**: Week 4 | **Status**: Not started

#### Pending Tasks:
- [ ] 5.1 Team Scenario Walkthrough & Validation

---

## 🔍 FIDELITY GAP ANALYSIS

### **CRITICAL GAPS (Blocking JTBD #2 Validation)**

#### **Gap #1: College List Display Missing**
- **Type**: Functional/Interaction Gap
- **Severity**: CRITICAL
- **Current State**: No data field exists in Student type for college list; DetailPanel has no UI to display schools, acceptance rates, or balance
- **Requirement (JTBD #2)**: For 11th/12th graders, counselors must see schools, acceptance rates, and whether list is balanced (reach/target/safety)
- **Component Affected**: `lib/types/index.ts` (Student interface missing collegeList field), `components/dashboard/DetailPanel.tsx` (no college list rendering)
- **Impact on Scenarios**: Scenarios 3 ("Ivy League Risk" - all reach schools), 5 ("Hidden Tradesman" - alternative path) cannot be validated

---

#### **Gap #2: Unit-by-Unit Curriculum Timeline Missing**
- **Type**: Functional/Interaction Gap
- **Severity**: CRITICAL
- **Status**: ✅ **RESOLVED** (Phase 1, Commit b4a7c5a)
- **Current State**: ✅ Now shows detailed unit timeline with due dates, overdue status, and artifact submission status
- **Requirement (JTBD #4)**: Counselors must see:
  - ✅ Which specific units are overdue and by how many days (displays "⚠️ OVERDUE 13 days")
  - ✅ Artifact submission status per unit (shows needed/submitted/in-review/accepted)
  - ✅ Clear priority (overdue units highlighted in red)
- **Component Affected**: `lib/types/index.ts` (Unit, Artifact interfaces added), `lib/data/studentUnits.ts` (sample data), `components/dashboard/UnitTimelineCard.tsx` (rendering), `components/dashboard/DetailPanel.tsx` (integration)
- **Impact on Scenarios**: ✅ Scenarios 1 ("Ghost High Achiever") and 2 ("Gamer Low Quality") now partially validatable; Tyler Bennett's Unit 1 shows as "⚠️ OVERDUE 13 days"

---

#### **Gap #3: Artifact Quality Feedback Display Missing**
- **Type**: Visual Design + Functional Gap
- **Severity**: CRITICAL
- **Current State**: Flag exists ("Needs Revision") but no detail on what's wrong or what to fix
- **Requirement (JTBD #4)**: When "Needs Revision" flag present, must show:
  - Specific issue (too short, wrong file, low quality score, missing reflection)
  - Exact feedback (e.g., "Content too short: 1 sentence, need 2-3 paragraphs")
  - Actionable next steps
- **Component Affected**: `lib/types/index.ts` (no artifact quality field), `components/dashboard/DetailPanel.tsx` (no artifact feedback rendering)
- **Impact on Scenarios**: Scenario 2 ("Gamer - Low Quality") - counselor cannot see what the student needs to revise

---

#### **Gap #4: Application & Financial Aid Tracking Missing**
- **Type**: Functional Gap
- **Severity**: HIGH
- **Current State**: No fields for applications submitted, decisions, FAFSA status, or scholarships
- **Requirement (JTBD #2)**: For 12th graders, must show:
  - Applications submitted/pending/decided counts
  - FAFSA status (submitted/pending/processed)
  - Scholarships awarded and total amount
  - Award comparison deadline (May 1) as urgent action item
- **Component Affected**: `lib/types/index.ts` (no applications or fafsaStatus fields), `components/dashboard/DetailPanel.tsx` (no financial aid section)
- **Impact on Scenarios**: Scenario 7 ("Summer Melt Senior") cannot be validated; no way to show approaching May 1 deadline

---

### **SECONDARY GAPS (Needed for Full Scenario Support)**

#### **Gap #5: GPA Data Age Indicator Missing**
- **Type**: Visual Design Gap
- **Severity**: MEDIUM
- **Status**: ✅ **RESOLVED** (Phase 1, Commit b4a7c5a)
- **Current State**: ✅ Shows "Entered: Feb 1, 2024" WITH visual warning box when > 365 days old
- **Requirement (JTBD #2)**: Stale GPA (>12 months) should trigger warning icon/color to alert counselor
  - ✅ Shows amber/yellow background when stale
  - ✅ Displays "⚠️ Data is X months old"
  - ✅ Recommends updating GPA
- **Component Affected**: `lib/utils/dateUtils.ts` (date calculations), `components/dashboard/DetailPanel.tsx` (display with warning)
- **Impact on Scenarios**: ✅ Scenario 4 ("Stale Data Comeback") now validatable; Alex Chen's Feb 1, 2024 GPA shows age warning

---

#### **Gap #6: Alternative Post-Secondary Path Tracking Missing**
- **Type**: Functional Gap
- **Severity**: MEDIUM
- **Current State**: System treats "0 college applications" as always = Off Track
- **Requirement (JTBD #2)**: Must support alternative paths: apprenticeships, trade school, military, gap year, work
- **Component Affected**: `lib/types/index.ts` (no postSecondaryPath field), `components/dashboard/DetailPanel.tsx` (no alternative path input)
- **Impact on Scenarios**: Scenario 5 ("Hidden Tradesman") - student has apprenticeship but shows as Off Track incorrectly

---

#### **Gap #7: Flag Reason Granularity Missing**
- **Type**: Functional/Interaction Gap
- **Severity**: MEDIUM
- **Status**: ✅ **RESOLVED** (Phase 1, Commit b4a7c5a)
- **Current State**: ✅ Each flag now shows specific reason/detail with emoji icon
- **Requirement (JTBD #5)**: When multiple "Needs Revision" students shown, counselor must quickly understand each unique reason
  - ✅ Added emoji icons to flag types (🚨✏️⏰🎯📚👤)
  - ✅ Added optional `reason` field to Flag interface
  - ✅ FLAGS display their reasons in DetailPanel under flag name
- **Component Affected**: `lib/types/index.ts` (reason field added to Flag), `lib/data/students.ts` (emoji icons + reasons), `components/dashboard/DetailPanel.tsx` (reason rendering)
- **Impact on Scenarios**: ✅ Counselor can now quickly scan flag reasons to understand each student's unique issue

---

#### **Gap #8: Sentiment Alert Special Handling Missing**
- **Type**: Visual Design + Functional Gap
- **Severity**: MEDIUM
- **Status**: ✅ **RESOLVED** (Phase 1, Commit b4a7c5a)
- **Current State**: ✅ Sentiment Alert has special red card component with escalation actions
- **Requirement (JTBD #5 + Safety)**: Sentiment Alert must:
  - ✅ Show concerning content excerpt (displays in white box with sensitive framing)
  - ✅ Have escalation path with 3 action buttons: "Contact Counselor Now", "Escalate to Admin", "Document & Monitor"
  - ✅ Feel visually urgent/different (red background, 🚨 icon, "REQUIRES IMMEDIATE REVIEW" heading)
- **Component Affected**: `components/dashboard/SentimentAlertCard.tsx` (new special component), `components/dashboard/DetailPanel.tsx` (conditional rendering before other flags)
- **Impact on Scenarios**: ✅ Scenario 6 ("Silent Crisis") now fully validatable; Emma Rodriguez's sentiment alert shows with escalation options

---

#### **Gap #9: Override Reason Persistence/Visibility Missing**
- **Type**: Functional/Interaction Gap
- **Severity**: MEDIUM
- **Current State**: Status override uses JavaScript `prompt()`; reason stored in alert but not persisted to Student data
- **Requirement (JTBD #2)**: Override reason must:
  - Be saved and visible in Student record
  - Be visible to other staff (not hidden)
  - Show who set override and when
- **Component Affected**: `components/dashboard/DetailPanel.tsx` lines 63-68 (handleOverride uses prompt, not persistent), `components/DashboardContent.tsx` lines 110-126 (no storage of override reason)
- **Impact on Scenarios**: Scenario 8 ("Manual Override") - "Exempt until Nov 1" reason not visible next time student is reviewed

---

#### **Gap #10: Curriculum Timeline Context Missing**
- **Type**: Visual Design Gap
- **Severity**: MEDIUM
- **Current State**: Shows overall progress % and grade breakdown, but no timeline showing progression (Sep 1 → Nov 28, expected vs actual)
- **Requirement (JTBD #3)**: Fidelity Modal should show:
  - Historical progress timeline (e.g., Sep 1: 19%, Oct 1: 42%, Nov 28: 75%)
  - Expected vs actual progress curves
- **Component Affected**: `components/dashboard/FidelityModal.tsx` - appears to have timeline, so this may be partial
- **Impact on Scenarios**: Admin cannot see if progress is accelerating or stalling

---

### **VISUAL DESIGN GAPS**

#### **Gap #11: Flag Priority Indication Missing**
- **Type**: Visual Design Gap
- **Severity**: MEDIUM
- **Current State**: Flags displayed in arbitrary order; when student has [Sentiment Alert] + [Academic Warning], not clear which to address first
- **Requirement (JTBD #5)**: Flags should be sorted by priority:
  1. Safety (Sentiment Alert) - always first
  2. Urgent timeline (Missed Deadline)
  3. Action required (Needs Revision, Strategy)
  4. Informational (Academic Warning)
- **Component Affected**: `components/dashboard/DetailPanel.tsx` lines 144-162 (flag rendering uses arbitrary order from array)
- **Impact on User Experience**: When student has 2+ flags, counselor must manually reason about priority

---

#### **Gap #12: Ghost Student Detection Pattern Not Extended**
- **Type**: Visual Design Gap
- **Severity**: LOW (pattern exists, could extend)
- **Current State**: Ghost card only shows GPA vs curriculum contradiction
- **Suggestion**: Could extend pattern to:
  - "All-reach college list" (for 11th/12th)
  - "Stale GPA" (for any grade)
  - "Sentiment concern with good grades" (shows student thriving academically but unsafe)
- **Component Affected**: `components/dashboard/GhostInsightCard.tsx` (limited to one scenario type)
- **Impact on UX**: Other critical contradictions not surfaced prominently

---

---

## 🎭 SCENARIO EFFECTIVENESS REVIEW

### **SCENARIO 1: The "Ghost" High Achiever (10th Grade) - PARTIAL ✅🟡**

**Profile**: Tyler Bennett | Nov 15 | GPA 3.9 | 0% Curriculum

**JTBD Requirement**: Detect student who is academically successful but programmatically absent

**Current Implementation Status:**
- ✅ Ghost student detection card displays (GPA vs curriculum contradiction visible)
- ✅ Insight card suggests "outreach, not tutoring"
- 🟡 BUT: Cannot see that Unit 1 due Nov 15 is **13 days overdue** specifically
- 🟡 BUT: Cannot see if any artifacts were submitted (truly 0% or data missing?)
- 🟡 BUT: No clear "contact student about Unit 1" action template

**Failure Points:**
1. **Missing Detail**: "Unit 1: Career Vision, Due Nov 15, OVERDUE 13 days, 0 artifacts submitted" - instead just shows 0% overall
2. **Missing Action Path**: No button like "Draft outreach email to student about Unit 1 deadline"
3. **Data Ambiguity**: Is 0% truly no engagement, or is student enrolled in system? No clarity.

**Actionable Changes Needed**:
- Add unit timeline to DetailPanel showing due date + days overdue for Unit 1
- Add quick action: "Send outreach about Unit 1" button
- Add context: "Expected 31% by this date" so counselor knows urgency

**Components to Modify**:
- `lib/types/index.ts` - add `units` array to CurriculumStatus
- `components/dashboard/DetailPanel.tsx` - render unit timeline with overdue indicator
- `components/dashboard/GhostInsightCard.tsx` - add "Draft outreach" action suggestion

---

### **SCENARIO 2: The "Gamer" (Low Quality) (9th Grade) - CANNOT VALIDATE ❌**

**Profile**: Casey Miller | Oct 15 | 100% Submission but "I am a student at this school" (1 sentence)

**JTBD Requirement**: Detect student who submitted work but quality is too low/wrong file/incomplete

**Current Implementation Status:**
- 🟡 Flag exists: "Needs Revision"
- ❌ BUT: Cannot see what was submitted
- ❌ BUT: Cannot see the actual feedback (too short, wrong file, low quality)
- ❌ BUT: Cannot see what student should do next

**Failure Points:**
1. **No Artifact Detail**: "Needs Revision" flag is present but counselor must guess why
2. **No Feedback Display**: AI quality analysis score/feedback not shown
3. **No Action Clarity**: Student cannot see what to fix

**Actionable Changes Needed**:
- Show artifact list under unit: "Who I Am Statement: Submitted Oct 10, Status: NEEDS REVISION"
- Display quality feedback: "❌ Too Short (1 sentence, need 2-3 paragraphs). Missing personal background."
- Add action button: "View feedback details" / "Draft email to student"

**Components to Modify**:
- `lib/types/index.ts` - add artifacts array to units with quality/feedback fields
- `components/dashboard/DetailPanel.tsx` - add artifacts section under unit timeline
- Create new component: `ArtifactFeedbackCard.tsx` to display quality issues

---

### **SCENARIO 3: The "Ivy League" Risk (11th Grade) - CANNOT VALIDATE ❌**

**Profile**: Alex Kim (11th) | March 1 | 8 Reach Schools (all Ivy League, <10% acceptance)

**JTBD Requirement**: Detect imbalanced college list strategy risk

**Current Implementation Status:**
- 🟡 Flag exists: "Strategy Risk"
- ❌ BUT: No college list shown at all
- ❌ BUT: Cannot see why strategy is risky (no acceptance rates visible)
- ❌ BUT: No visualization of balance (1 reach vs 8 reach)
- ❌ Cannot validate if design makes imbalance "obviously risky"

**Failure Points:**
1. **Complete Missing Component**: No college list UI exists
2. **Cannot See Imbalance**: Without data shown, design validation impossible
3. **No Visual Warning**: Even if data existed, no visual indicator of risk (red background, warning icon, etc.)

**Actionable Changes Needed**:
- Create college list display with schools, acceptance rate %, fit type (Reach/Target/Safety)
- Show balance summary: "⚠️ All 8 schools are Reach (<10% acceptance)"
- Visual indicator: Red/amber background or warning icon on imbalanced list
- Action suggestion: "Consider adding 2 Target schools (25-50% acceptance)"

**Components to Modify**:
- `lib/types/index.ts` - add collegeList field to Student type
- `lib/data/students.ts` - add college list data for 11th/12th graders
- Create new component: `CollegeListCard.tsx` with balance visualization
- `components/dashboard/DetailPanel.tsx` - integrate college list display

---

### **SCENARIO 4: The "Stale Data" Comeback (10th Grade) - PARTIAL 🟡**

**Profile**: Alex Chen | Feb 1 | GPA 1.6 (14 months old) | High-quality engagement

**JTBD Requirement**: Detect when GPA is old and needs update, but student is actually on track

**Current Implementation Status:**
- 🟡 Shows: "GPA: 1.6, Entered: Feb 1, 2024"
- 🟡 Flag: Academic Warning correctly present
- ✅ Status: Can be On Track despite low GPA
- ❌ BUT: No visual warning that Feb 1, 2024 is 9 months old
- ❌ BUT: No "Update GPA" button or action

**Failure Points:**
1. **Data Age Not Obvious**: Counselor must manually calculate "Feb 1 was 9 months ago"
2. **No Update Path**: No UI to mark GPA as verified or update it
3. **Stale Data Not Flagged Visually**: Text only, no color/warning

**Actionable Changes Needed**:
- Add age calculation: show "⚠️ GPA is 9 months old"
- Change color for old GPA (yellow/amber instead of gray)
- Add action: "[Update GPA]" button to refresh data
- Show: "Last Updated: Feb 1, 2024 (273 days ago)"

**Components to Modify**:
- `components/dashboard/DetailPanel.tsx` lines 169-174 - add age indicator to academic data card
- Add utility: `utils/dateUtils.ts` - calculate days since data entry

---

### **SCENARIO 5: The "Hidden" Tradesman (12th Grade) - CANNOT VALIDATE ❌**

**Profile**: Jordan Brooks | Nov 1 | 0 College Apps | Apprenticeship in journal | GPA 2.4

**JTBD Requirement**: Detect when "0 apps" is strategic choice (apprenticeship) vs. at-risk behavior

**Current Implementation Status:**
- ❌ System marks Off Track due to 0 applications
- ❌ No way to log alternative path (apprenticeship)
- ❌ No way to override "0 apps" rule
- ❌ Cannot validate this scenario exists

**Failure Points:**
1. **System Treats All 0-App Students Same**: No distinction between "hasn't started" vs. "pursuing apprenticeship"
2. **No Alternative Path Tracking**: Apprenticeship, trade school, military, gap year have no fields
3. **Manual Override Only**: Would require messy status override instead of proper alternative path logging

**Actionable Changes Needed**:
- Add postSecondaryPath field to Student type with options: college, apprenticeship, trade-school, military, gap-year, work
- When apprenticeship logged: show it in detail panel, update status logic (0 apps no longer = Off Track)
- Add UI: "Log Alternative Path" button/modal in DetailPanel
- Show in analytics: "Alternative Paths: 3 apprenticeships, 1 trade school"

**Components to Modify**:
- `lib/types/index.ts` - add postSecondaryPath field and enum
- `lib/data/students.ts` - add postSecondaryPath data
- Create new component: `AlternativePathForm.tsx`
- `components/dashboard/DetailPanel.tsx` - add alternative path section for 12th graders
- `components/DashboardContent.tsx` - update status logic to account for alternative paths

---

### **SCENARIO 6: The "Silent" Crisis (9th Grade) - CANNOT VALIDATE ❌**

**Profile**: Emma | Dec 15 | Excellent work quality | Reflection mentions "feeling unsafe at home"

**JTBD Requirement**: Detect concerning content that requires immediate escalation, separate from quality/status

**Current Implementation Status:**
- 🟡 Flag exists: "Sentiment Alert"
- ❌ BUT: No way to see the concerning content
- ❌ BUT: No escalation path (refer to counselor, notify admin)
- ❌ BUT: Flag treated same as academic/revision flags (not prioritized)
- ❌ Cannot validate safety workflow

**Failure Points:**
1. **Content Not Visible**: Sentiment alert flag shown, but excerpt not displayed
2. **No Escalation Action**: No "Refer to Counselor Now" button
3. **Not Flagged Visually**: Same badge style as other flags; doesn't feel urgent
4. **Possible Miss**: Counselor might not recognize safety issue

**Actionable Changes Needed**:
- Display concerning content excerpt (with sensitivity): "Excerpt: '...feeling unsafe at home...'"
- Visual differentiation: Red background, larger icon, "🚨 REQUIRES IMMEDIATE REVIEW"
- Action buttons: "[Contact Counselor Now]" "[Escalate to Admin]" "[Document & Monitor]"
- Flag priority: Sentiment Alert always shows first, before other flags
- Create separate component: `SentimentAlertCard.tsx` - special styling and actions

**Components to Modify**:
- `lib/types/index.ts` - add content excerpts to flags or separate SentimentAlert type
- `components/dashboard/DetailPanel.tsx` - detect Sentiment Alert and render special component
- Create new component: `SentimentAlertCard.tsx` with escalation actions
- `components/dashboard/DetailPanel.tsx` - sort flags by priority (Sentiment first)

---

### **SCENARIO 7: The "Summer Melt" Senior (12th Grade) - CANNOT VALIDATE ❌**

**Profile**: Senior | May 15 | 5 apps submitted, 3 accepted | Award Comparison due May 1 (PAST DUE)

**JTBD Requirement**: Detect when student hits critical milestone deadline (May 1 award comparison)

**Current Implementation Status:**
- ❌ No applications data structure
- ❌ No FAFSA status field
- ❌ No scholarship/award data
- ❌ No deadline urgency indicator
- ❌ Cannot show that May 1 is overdue

**Failure Points:**
1. **Complete Missing Data Model**: No fields for applications, FAFSA, scholarships
2. **No Deadline Urgency**: Even if data existed, May 1 deadline not shown as critical
3. **No Financial Aid Workflow**: Award comparison process not visible

**Actionable Changes Needed**:
- Add applications data: array of {school, submittedDate, status (pending/accepted/rejected), decisionDate}
- Add FAFSA status: enum (not-started/in-progress/submitted/processed)
- Add scholarships: array of {name, amount, source}
- Create timeline view: "5 Submitted | 3 Decisions (2 Accepted, 1 Rejected)"
- Show urgent deadline: "⏰ Award Comparison Due May 1, 2025 (OVERDUE - was due X days ago)"
- Status logic: If Financial Aid milestone overdue → Missed Deadline flag

**Components to Modify**:
- `lib/types/index.ts` - add applications, fafsaStatus, scholarships fields to Student
- `lib/data/students.ts` - add financial aid data for 12th graders
- Create new component: `ApplicationStatusCard.tsx`
- Create new component: `FinancialAidCard.tsx` with urgency indicator
- `components/dashboard/DetailPanel.tsx` - integrate financial aid section for 12th graders

---

### **SCENARIO 8: The "Manual" Override (11th Grade) - PARTIAL 🟡**

**Profile**: 11th Grade | GPA 1.2 | Status: On Track (manually overridden) | Reason: "Exempt from Resume Unit until Nov 1"

**JTBD Requirement**: Support manual override with reason visible to other staff; override should be time-bound

**Current Implementation Status:**
- ✅ Override button exists in DetailPanel
- 🟡 Reason captured via prompt(), but not persisted
- ❌ Reason not stored in Student data
- ❌ Reason not visible next time student reviewed
- ❌ Override expiration (Nov 1) not tracked

**Failure Points:**
1. **Reason Not Persistent**: Using JavaScript prompt; data lost on close
2. **Reason Not Visible**: Next counselor opening student won't see "Exempt until Nov 1" reason
3. **No Expiration Tracking**: Manual override never expires; should reminder counselor on Nov 1?
4. **Audit Trail Missing**: No record of who/when override was set

**Actionable Changes Needed**:
- Store override data: {reason: string, setBy: string, setDate: date, expiresDate?: date}
- When student status is overridden, show in Detail Panel: "🔄 Status Manually Overridden (by Sarah Smith, Oct 15). Reason: Exempt from Resume Unit until Nov 1 due to work schedule. [Expires Nov 1]"
- Add button: "[Remove Override]" to revert
- Visual indicator: Different color/badge for overridden status (e.g., "On Track (Manual)")

**Components to Modify**:
- `lib/types/index.ts` - extend Student type with statusOverride field: {reason, setBy, setDate, expiresDate}
- `components/dashboard/DetailPanel.tsx` lines 63-68 - replace prompt with form; persist to Student
- `components/DashboardContent.tsx` - persist override reason to Student state
- Add new component: `StatusOverrideCard.tsx` to display reason prominently

---

### **SCENARIO 9: The "Binge" Worker (11th Grade) - CAN VALIDATE ✅**

**Profile**: Riley Chen | Oct 31 11 PM | Inactive Oct 1-30, then submitted 2 units at deadline, quality passes

**JTBD Requirement**: Do NOT flag "activity spike"; if deadline met and quality good, student is On Track with no noise

**Current Implementation Status:**
- ✅ No "activity spike" flag exists (framework correctly says: no noise)
- ✅ Status correctly On Track
- ✅ No flags present
- ✅ Design validates framework principle: met deadline + quality = green, no warning

**Validation Success**: This scenario works as intended. Last-minute submission pattern not flagged because it meets the criteria.

**Comment**: Framework principle is sound. Could optionally show last-minute submission pattern in analytics (for aggregate insight), but correctly does not flag individual student.

---

### **SCENARIO 10: The "Paper Tiger" (10th Grade) - PARTIAL 🟡**

**Profile**: Casey (10th) | April 15 | High GPA 3.8 | Uploaded "History_Homework.pdf" instead of career pathways slide

**JTBD Requirement**: Detect file mismatch/wrong artifact type as "Needs Revision"

**Current Implementation Status:**
- 🟡 Flag exists: "Needs Revision"
- ❌ BUT: Cannot see what was submitted (file name)
- ❌ BUT: Cannot see the mismatch reason ("wrong file")
- ❌ BUT: Cannot distinguish from other "Needs Revision" reasons

**Failure Points:**
1. **Artifact Not Shown**: "History_Homework.pdf" not visible; counselor doesn't see obvious mismatch
2. **Reason Not Specific**: Could be "wrong file" or "too short" or "low quality"; no distinction
3. **Actionability**: Counselor doesn't know to tell student "upload the right file" vs. "improve quality"

**Actionable Changes Needed**:
- Display submitted artifact: "Artifact: History_Homework.pdf - Status: ❌ Wrong File"
- Feedback detail: "Expected: PDF of Career Pathways Slide Deck. Received: History_Homework.pdf (wrong assignment)"
- Action: "[Resubmit Correct File]" button

**Components to Modify**:
- `lib/types/index.ts` - add artifacts with {fileName, expectedType, status, feedback} fields
- `components/dashboard/DetailPanel.tsx` - display artifact detail with file name and mismatch reason
- Create new component: `ArtifactCard.tsx` for artifact display with quality/mismatch feedback

---

---

## 🎯 IMPROVEMENT PLAN

### **PHASE 1: Foundation (Week 1-2) - High-Impact UX Fixes**
*Goal: Unblock Scenario 1, 4, 6 and establish patterns for remaining work*

#### **Task 1.1: Add Unit-by-Unit Curriculum Timeline**
- **Components**: `lib/types/index.ts`, `lib/data/students.ts`, `components/dashboard/DetailPanel.tsx`
- **Priority**: CRITICAL - blocks Scenario 1, 2, 10
- **Deliverable**:
  - Add `units[]` array to CurriculumStatus type with fields: unitNumber, title, dueDate, status (overdue/in-progress/not-started), daysSinceOverdue, artifacts[]
  - Sample data: Unit 1 (due Nov 15, overdue 13 days), Unit 2 (in progress), Unit 3 (not started Jan 15)
  - Render in DetailPanel as timeline: "[Unit 1 - ⚠️ OVERDUE 13 days] [Unit 2 - IN PROGRESS] [Unit 3 - Coming Soon]"
  - Add: "Contact student about Unit 1" quick action button

---

#### **Task 1.2: Add GPA Age Indicator**
- **Components**: `components/dashboard/DetailPanel.tsx`, `lib/utils/dateUtils.ts`
- **Priority**: HIGH - fixes Scenario 4, improves data awareness
- **Deliverable**:
  - Calculate days since GPA entry date
  - If > 365 days: show "⚠️ GPA is [X] months old" in amber/yellow color
  - Add button: "[Update GPA]" to refresh data (prototype: just shows alert "GPA updated to current date")
  - Example: "GPA: 1.6 | Last Updated: Feb 1, 2024 | ⚠️ 273 days old [Update GPA]"

---

#### **Task 1.3: Enhanced Flag Display with Reason Granularity**
- **Components**: `lib/types/index.ts`, `lib/data/students.ts`, `components/dashboard/DetailPanel.tsx`
- **Priority**: HIGH - improves clarity for Scenarios 2, 10
- **Deliverable**:
  - Extend Flag interface to include optional `reason` field (string)
  - Sample reasons for "Needs Revision": "Too short (1 sentence, need 2-3 paragraphs)", "Wrong file (uploaded History_Homework.pdf)", "AI Quality (score 35/100)"
  - Update sample data: add reasons to flags
  - Render in DetailPanel: show reason under flag name
  - Example: "Needs Revision: Too short (1 sentence, need 2-3 paragraphs)"

---

#### **Task 1.4: Sentiment Alert Special Card Component**
- **Components**: Create `components/dashboard/SentimentAlertCard.tsx`, `components/dashboard/DetailPanel.tsx`
- **Priority**: HIGH - safety critical for Scenario 6
- **Deliverable**:
  - When student has Sentiment Alert flag: render special card with red background, larger icon, "🚨 REQUIRES IMMEDIATE REVIEW"
  - Display content excerpt (with sensitivity): "Concerning content detected in reflection"
  - Add action buttons: "[Contact Counselor Now]" "[Escalate to Admin]" "[Document & Monitor]"
  - Place BEFORE other flags in detail panel (priority sorting)
  - Make visually distinct from other flags (not just an amber badge)

---

### **PHASE 2: JTBD #2 Post-Secondary Data (Week 2-3) - Design Validation Unblocked**
*Goal: Add college list and financial aid data structures so team can validate 11th/12th grade scenarios*

#### **Task 2.1: College List Data Model & Display**
- **Components**: `lib/types/index.ts`, `lib/data/students.ts`, Create `components/dashboard/CollegeListCard.tsx`, `components/dashboard/DetailPanel.tsx`
- **Priority**: CRITICAL - blocks Scenario 3
- **Deliverable**:
  - Add to Student type: `collegeList[]` with {schoolName, acceptanceRate: number, type: 'reach'|'target'|'safety', appliedStatus: 'interested'|'applied'|'accepted'|'rejected'}
  - Acceptance rate calculation: 0-10% = Reach, 10-50% = Target, 50%+ = Safety (or manual entry)
  - Sample data:
    - Alex Kim (11th): 8 schools all Reach (<10%)
    - Maria Santos (11th): balanced (1 Reach, 2 Target, 1 Safety)
  - Component `CollegeListCard.tsx`: Display schools in table, show acceptance rate %, show balance summary
  - Balance indicator: "⚠️ All 8 schools are Reach (<10% acceptance). Recommend adding 2 Target schools (25-50%)." OR "✅ Good balance: 1 Reach, 2 Target, 1 Safety"
  - In DetailPanel: render college list for 11th/12th graders only
  - Visual: red/amber background if imbalanced, green if balanced

---

#### **Task 2.2: Application Status Tracking**
- **Components**: `lib/types/index.ts`, `lib/data/students.ts`, Create `components/dashboard/ApplicationStatusCard.tsx`, `components/dashboard/DetailPanel.tsx`
- **Priority**: HIGH - blocks Scenario 7
- **Deliverable**:
  - Add to Student type: `applications[]` with {schoolName, submittedDate, status: 'submitted'|'pending'|'accepted'|'rejected'|'waitlisted', decisionDate?: date}
  - Sample data for 12th graders:
    - Student A: 5 submitted, 3 decisions (2 accepted, 1 rejected), 0 waitlisted
  - Component `ApplicationStatusCard.tsx`: Show counts: "[5 Submitted] [3 Decisions] [2 Accepted] [1 Rejected]"
  - Detailed table: "UC Davis ... Submitted Nov 1 → Pending | UCSB ... Submitted Nov 5 → ACCEPTED Dec 1"
  - In DetailPanel: render for 12th graders only

---

#### **Task 2.3: Financial Aid Tracking with Urgency**
- **Components**: `lib/types/index.ts`, `lib/data/students.ts`, Create `components/dashboard/FinancialAidCard.tsx`, `components/dashboard/DetailPanel.tsx`
- **Priority**: HIGH - blocks Scenario 7
- **Deliverable**:
  - Add to Student type: `fafsaStatus: 'not-started'|'in-progress'|'submitted'|'processed'`, `scholarships[]` with {name, amount, source: 'university'|'external'|'grant'}
  - Sample data: FAFSA: Submitted ✅, Scholarships: UCSB Merit ($15,000), State Grant ($5,500), Total: $20,500
  - Component `FinancialAidCard.tsx`: Show FAFSA status, list scholarships, show total
  - **CRITICAL**: Add urgency for milestone deadlines
    - "⏰ Award Comparison Due: May 1, 2025 (due in 153 days)" → amber/normal
    - "⏰ Award Comparison DUE: May 1, 2025 (OVERDUE - 14 days late)" → red/urgent
    - If milestone overdue: flag as "Missed Deadline" in status
  - In DetailPanel: render for 12th graders only

---

#### **Task 2.4: Alternative Path Tracking (Apprenticeship, etc.)**
- **Components**: `lib/types/index.ts`, `lib/data/students.ts`, Create `components/dashboard/AlternativePathForm.tsx`, `components/dashboard/DetailPanel.tsx`
- **Priority**: MEDIUM - unblocks Scenario 5
- **Deliverable**:
  - Add to Student type: `postSecondaryPath` with {type: 'college'|'apprenticeship'|'trade-school'|'military'|'gap-year'|'work', program?: string, status: 'interested'|'applied'|'accepted'|'enrolled'}
  - Sample data: Student A (12th): postSecondaryPath = {type: 'apprenticeship', program: 'IBEW Electrician', status: 'accepted'}
  - Component `AlternativePathForm.tsx`: Modal/form to log alternative path with dropdowns
  - In DetailPanel: show "Post-Secondary Plan" section for 12th graders with alternative path display
  - **Update Status Logic**: If alternative path is 'accepted' or 'enrolled', do NOT mark as Off Track for "0 applications"
  - Show in Student name: "Jordan Brooks - Apprenticeship (IBEW Electrician)"

---

### **PHASE 3: Artifact Quality Feedback (Week 3) - Validates JTBD #4**
*Goal: Make "Needs Revision" actionable by showing what needs fixing*

#### **Task 3.1: Artifact Quality Data Model**
- **Components**: `lib/types/index.ts`, `lib/data/students.ts`
- **Priority**: CRITICAL - blocks Scenario 2, 10
- **Deliverable**:
  - Extend units[] to include `artifacts[]` with: {title, status: 'needed'|'submitted'|'in-review'|'needs-revision'|'accepted', submittedDate?, fileName?, qualityScore: 0-100, feedback: string}
  - Sample data:
    - Unit 1 Artifact: "Who I Am Statement" - submitted Oct 10, status: needs-revision, feedback: "Too short (1 sentence, need 2-3 paragraphs). Missing personal background context."
    - Unit 1 Artifact: "Career Exploration Matrix" - status: needed
    - Unit 2 Artifact: "Impact Proposal" - submitted, status: in-review, feedback: pending
  - Map reasons to quality feedback rules

---

#### **Task 3.2: Artifact Display Component**
- **Components**: Create `components/dashboard/ArtifactCard.tsx`, Update `components/dashboard/DetailPanel.tsx`
- **Priority**: CRITICAL
- **Deliverable**:
  - Component `ArtifactCard.tsx`: Display single artifact with:
    - Title, status icon, submitted date
    - Quality feedback: "❌ Too Short: 1 sentence submitted, need 2-3 paragraphs. Add personal background context."
    - Action: "[View Full Feedback]" "[Resubmit]" "[Contact Student]" buttons
    - Visual: red/amber background if needs-revision, green if accepted
  - In DetailPanel: Under unit timeline, show artifacts list
  - Make feedback actionable and specific

---

### **PHASE 4: Status Override Persistence & Priority Sorting (Week 4) - Polish**
*Goal: Complete manual intervention workflows and ensure safety flags are prioritized*

#### **Task 4.1: Status Override with Reason Persistence**
- **Components**: `lib/types/index.ts`, `components/dashboard/DetailPanel.tsx`, `components/DashboardContent.tsx`, Create `components/dashboard/StatusOverrideCard.tsx`
- **Priority**: MEDIUM
- **Deliverable**:
  - Extend Student type: add `statusOverride?: {reason: string, setBy: string, setDate: date, expiresDate?: date}`
  - Replace prompt() with form in DetailPanel: textarea for reason + optional expiration date dropdown
  - Persist to Student state (not just alert)
  - Component `StatusOverrideCard.tsx`: Show override reason prominently when status is overridden
    - "🔄 Status Manually Overridden by Sarah Smith (Oct 15)\nReason: Exempt from Resume Unit until Nov 1 due to work schedule\nExpires: Nov 1, 2025 [Remove Override]"
  - Visual: different color badge "On Track (Manual)" vs "On Track"

---

#### **Task 4.2: Flag Priority Sorting**
- **Components**: `components/dashboard/DetailPanel.tsx`
- **Priority**: MEDIUM
- **Deliverable**:
  - Sort flags before rendering:
    1. Sentiment Alert (if present) - always first
    2. Missed Deadline
    3. Needs Revision, Strategy Risk
    4. Academic Warning, Staff Follow-up (informational)
  - Visual: Group by priority with dividers/headers
    - "🚨 SAFETY CONCERN" [Sentiment Alert]
    - "⏰ URGENT DEADLINE" [Missed Deadline]
    - "📋 ACTION NEEDED" [Needs Revision, Strategy]
    - "ℹ️ INFORMATION" [Academic Warning, Staff]

---

#### **Task 4.3: Admin Analytics for Alternative Paths**
- **Components**: `components/dashboard/Analytics.tsx`, `components/DashboardContent.tsx`
- **Priority**: LOW
- **Deliverable**:
  - Add admin insight card: "Alternative Paths: 3 apprenticeships, 1 trade school, 2 gap years"
  - Helps admin track diversity of post-secondary outcomes

---

### **PHASE 5: Design Validation Walkthrough (Week 4) - Internal Alignment**
*Goal: Collect team feedback on new scenarios*

#### **Task 5.1: Scenario Walkthrough Checklist**
- **Purpose**: Have team review each scenario to validate design works as intended
- **Deliverable**: Checklist document with questions:
  - Scenario 1 (Ghost): "Is it obvious Unit 1 is 13 days overdue? Would counselor contact student?"
  - Scenario 3 (Ivy League): "Is it IMMEDIATELY OBVIOUS all schools are Reach? Should they add targets?"
  - Scenario 6 (Silent Crisis): "Does sentiment alert feel like a safety emergency? Would counselor escalate?"
  - Scenario 7 (Summer Melt): "Is May 1 deadline obviously past due? Would counselor treat as urgent?"

#### **Task 5.2: Collect Feedback on Visual Design**
- **Purpose**: Validate that visual design makes status/urgency obvious
- **Questions**:
  - Color usage: Does red/amber make sense for overdue units?
  - Spacing: Is information scannable or overwhelming?
  - Action buttons: Are next steps clear?

---

---

## SUMMARY TABLE: Gaps, Scenarios, & Implementation Priority

| **Gap** | **Blocks Scenarios** | **Phase** | **Status** | **Component(s)** | **Effort** |
|---------|---------------------|----------|-----------|-----------------|----------|
| 1. College List | 3 | 2.1 | ⏳ Pending | DetailPanel, new CollegeListCard | Medium |
| 2. Unit Timeline | 1, 2, 10 | 1.1 | ✅ DONE | DetailPanel, types, UnitTimelineCard | High |
| 3. Artifact Feedback | 2, 10 | 3.1-3.2 | ⏳ Pending | new ArtifactCard | High |
| 4. Applications | 7 | 2.2 | ⏳ Pending | new ApplicationStatusCard | Medium |
| 5. Financial Aid | 7 | 2.3 | ⏳ Pending | new FinancialAidCard | High |
| 6. GPA Age | 4 | 1.2 | ✅ DONE | DetailPanel, dateUtils | Low |
| 7. Flag Reasons | All | 1.3 | ✅ DONE | types, data, DetailPanel | Low |
| 8. Sentiment Alert | 6 | 1.4 | ✅ DONE | new SentimentAlertCard | Medium |
| 9. Override Reason | 8 | 4.1 | ⏳ Pending | DetailPanel, StatusOverrideCard | Medium |
| 10. Timeline Context | 3 | 2.1 | ⏳ Pending | FidelityModal | Low |
| 11. Flag Priority | All | 4.2 | ⏳ Pending | DetailPanel | Low |
| 12. Alt. Paths | 5 | 2.4 | ⏳ Pending | new AlternativePathForm | Medium |

---

## EXECUTION ROADMAP

### **Week 1 (COMPLETED ✅):**
- [x] Complete Phase 1 tasks (1.1, 1.2, 1.3, 1.4) - DONE Dec 1
- [x] Sample data for units, GPA age, flag reasons, sentiment alert - DONE
- [x] Unit timeline rendering in DetailPanel - DONE
- [x] GPA age indicator styling - DONE
- [x] Sentiment Alert card with escalation - DONE
- [x] Fix hydration mismatch issues - DONE
- [x] Commit Phase 1 (b4a7c5a) - DONE

### **Week 2 (IN PROGRESS ⏳):**
- [ ] Complete Phase 2.1 (College list) - CRITICAL for Scenario 3 validation
- [ ] Complete Phase 2.2 (Applications)
- [ ] Update sample data for 11th/12th grade students

### **Week 3:**
- [ ] Complete Phase 2.3 (Financial Aid with deadline urgency)
- [ ] Complete Phase 2.4 (Alternative paths)
- [ ] Complete Phase 3 (Artifact quality)

### **Week 4:**
- [ ] Complete Phase 4 (Polish: overrides, flag sorting)
- [ ] Team walkthrough of Scenarios 1-10
- [ ] Collect feedback, iterate

---

## CRITICAL SUCCESS FACTORS

1. **College List Display**: This is THE blocker for validating Scenario 3 (Strategy Risk) and JTBD #2
2. **Unit Timeline**: Essential for Scenarios 1, 2, 10 - counselors must see which units are overdue
3. **Artifact Feedback**: Makes "Needs Revision" flag actionable - without it, counselors can't help students
4. **Financial Aid Deadline Urgency**: If May 1 doesn't look urgent, Summer Melt scenario won't validate
5. **Sentiment Alert Escalation**: Safety concern - must feel different from academic flags

---

## CURRENT STATUS & NEXT STEPS

### 📊 Overall Progress
- **Phase 1**: ✅ **COMPLETED** (4/4 tasks)
- **Scenarios Validatable**: 3/10 (Scenarios 1, 4, 6)
- **Gaps Resolved**: 4/12 (Unit Timeline, GPA Age, Flag Reasons, Sentiment Alert)
- **Dev Server**: ✅ Live and working (http://localhost:3000)
- **Commits**: 1 (b4a7c5a)

### 🎯 Next Priority (Phase 2)
College list and application tracking are CRITICAL blockers for validating core JTBD #2 (Post-Secondary Readiness). Recommend starting Phase 2.1 immediately:

**Phase 2.1: College List Display**
- Add `collegeList[]` field to Student type
- Create CollegeListCard component showing schools + acceptance rates
- Visualize balance (reach/target/safety)
- Unblocks: Scenario 3 ("Ivy League Risk"), JTBD #2 validation

### 📝 How to Continue
1. **Dev environment is ready**: All Phase 1 code builds with zero errors
2. **Sample data patterns established**: Unit timeline data structure works; ready to extend for college data
3. **Type extensions in place**: Student type ready for college list, applications, financial aid fields
4. **Component patterns clear**: UnitTimelineCard shows pattern for other card components (CollegeListCard, ApplicationStatusCard, etc.)

**Recommendation**: Build Phase 2.1 (College List) next - this will unblock Scenario 3 and give team first complete validation of post-secondary readiness pathway. By end of Week 2, you'll have 4-5 scenarios validatable.
