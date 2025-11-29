# Jobs to Be Done (JTBD) Framework - Willow

> 📌 **Related Document:** See `DASHBOARD_ANALYSIS_REPORT.md` for design validation roadmap and mockup suggestions

**CRITICAL INSTRUCTION:** For every design decision made in this project, read this entire document and warn the user if we're about to make changes that go against the JTBDs described here.

---

# Part 1: The Consolidation

There are 5 different Jobs to Be Done (JTBD) that we have been discussing and often conflating. To move forward, we must treat these as distinct problems with distinct data sources.

### JTBD 1: Graduation Compliance (Not Measured In Willow)

**Definition:** Tracking who is on/off track towards high school graduation requirements.
**Data Points:** Credit accumulation, attendance, transcripts, official GPA.

- **The Willow Stance:** **We are a viewer, not a source.** Since we lack SIS integration, we treat this as "Contextual Data." We allow students/staff to manually enter GPA, but we do not calculate "On Track" status based on data we cannot verify.

### JTBD 2: Post-Secondary Readiness (On/Off Track)

**Definition:** Tracking who is prepared for life *after* high school.
**Data Points:**

- **11th/12th:** List building quality (ROI/Grad Rates), FAFSA and scholarships, Application status, Decision status, curriculum artifacts and milestones (completion and quality).
- **9th/10th:** Curriculum artifacts and milestones (completion and quality).
- *Tension Point:* This usually *includes* GPA/SAT and sometimes attendance.
- **The Willow Stance:** **We own this definition.** We calculate on/off track based on the data we *do* have (Curriculum + List Quality). If GPA is available, it modifies this score; if not, the score stands on Willow data alone.

### JTBD 3: Implementation Fidelity (Admin View)

**Definition:** Tracking if the *adults* are doing their job.
**Data Points:** Which lessons have been unlocked/taught? Which classes are behind on the scope & sequence?

- **The Willow Stance:** This is an **Administrative Report.** This allows District/School Admins to see which teachers are neglecting the platform, explaining why student data might be missing.

### JTBD 4: Student Curriculum Engagement (Quality Control)

**Definition:** Tracking if the *students* are doing the work, and how well they are doing it.
**Data Points:** Unit completion status, Artifact completion, AI Quality Analysis (e.g., "Is this Personal Statement gibberish?").

- **The Willow Stance:** This is the primary driver of "On Track" status for 9th/10th graders.

### JTBD 5: Student Intervention (The "Flagging" System)

**Definition:** Identifying students who require specific, human attention *now*.
**Data Points:**

- **System Flags:** Low quality artifacts, negative sentiment in reflections (Alma AI), missing major milestones (No list by Nov 1st).
- **Manual Flags:** Staff notes ("Worried about home life").
- **The Willow Stance:** **This is a Workflow, not a Report.** This is the "Inbox" a counselor checks to see who is falling through the cracks today. It is ephemeral and action-oriented.

### JTBD 6: Insights about our students

1. Career interests of our students
2. Personality types of our students
3. College & program types students are listing/applying to / going to
4. Scholarships that students are going to, total scholarships + financial aid

---

# Part 2: Where We Stand With Each JTBD

| **JTBD** | **Status** |
| --- | --- |
| #1: Grad Req Tracking | 🔴 Can not do w/o SIS integration |
| #2: Post Secondary Readiness Tracking | 🟡 What we have to define as a team |
| #3: Admin Curriculum Tracking | 🟢 We build admin tracking, nothing complex to discuss |
| #4: Student Curriculum Engagement | 🟢 We build counselor tracking, nothing complex to discuss |
| #5: Flags | 🟡 The concept here is solid, need to flush out how it works |

### 🔴 **JTBD 1: High School Grad Requirements On / Off Track**

- We can not measure this w/o SIS integration
- To do a SIS integration, we have to integrate with at a minimum Powerschool, Infinite Campus, and Skyward.
- The cost to build the integration are:
    - ~$20,000 for the integrations
    - ~$30,000 for the compliance audits
    - ~$100,000 for a developer to build it (or blowing up our roadmap for me to build it)

### 🟡 JTBD 2: Post-Secondary Readiness (On/Off Track)

- This is where we need to focus our time aligning, and where we'll spend the bulk of today's meeting.

### 🟢 JTBD 3: Implementation Fidelity (Admin View)

- This is a high level view that combines "lesson taught" data from teachers and student completion of reflections, artifact submissions, and milestones submissions

### 🟢 JTBD 4: Student Curriculum Engagement (Quality Control)

- This is a combination of the admin data above, and drill down data into reporting on student quality, reviewing actual artifacts, and student completion data at the / student level.
- This will require a lot of design work, but conceptually won't require much more from this team.

### 🟡 JTBD 5: Student Intervention (The "Flagging" System)

- We are all aligned on manual flags
- We need to stress test when and what automated flags exist.

---

# Part 3: Evaluating JTBD 2 and 5

### The Logic Key

- **Status:** 🟢 **On Track** vs. 🔴 **Off Track** (Binary: Did they meet the minimum standard?)
- **The 6 Flags:**
    1. 🚩 **Needs Revision** (Quality/Content issue)
    2. 🚩 **Missed Deadline** (Time issue)
    3. 🚩 **Strategy Risk** (Plan issue)
    4. 🚩 **Sentiment Alert** (Safety issue)
    5. 🚩 **Academic Warning** (GPA/Data issue)
    6. 🚩 **Staff Follow-up** (Human note)

**The Algorithm Hierarchy (How the Dot is decided):**

1. **Safety Check:** GPA < 2.0 (Fresh) = **Auto Red** (regardless of curriculum).
2. **Deadline Check:** Missed Date = **Auto Red**.
3. **Quality Check:** AI "Low Quality" = **Auto Red**.
4. **Strategy Check (11th/12th):** Unbalanced List/No Plan = **Auto Red**.
5. **Everything else** = 🟢 **Green**.

---

### Scenario 1: The "Ghost" High Achiever (10th Grade)

**Profile:** 10th Grader | **Date:** Nov 15th

- **SIS Data:** GPA 3.9 (Fresh).
- **Curriculum Context:** *Unit 1: Career Vision* is due.
- **Student Behavior:** 0% Curriculum Completion.
    - *Missing Artifact:* **Career Vision Statement** & **Career Exploration Matrix**.
    - *Missing Data:* Durable Skills Quiz not taken.
- **System Assessment:**
    - **Status:** 🔴 **OFF TRACK**
    - **Flags:** 🚩 **Missed Deadline** (Unit 1).
    - **The Logic:** "Curriculum Stagnation" is just a missed deadline. The student is academically successful but programmatically absent.

### Scenario 2: The "Gamer" (Low Quality) (9th Grade)

**Profile:** 9th Grader | **Date:** Oct 15th

- **SIS Data:** No GPA.
- **Curriculum Context:** *Unit 1: Portfolio Foundation* is due.
- **Student Behavior:** 100% Completion marked.
    - *Artifact (Who I Am Statement):* "I am a student at this school." (1 sentence).
    - *Alma Reflection (Synthesis Tier):* "idk."
- **System Assessment:**
    - **Status:** 🔴 **OFF TRACK**
    - **Flags:** 🚩 **Needs Revision**.
    - **The Logic:** Whether it's gibberish, too short, or the wrong file, the action is the same: The student needs to revise the work.

### Scenario 3: The "Ivy League" Risk (11th Grade)

**Profile:** 11th Grader | **Date:** March 1st

- **SIS Data:** GPA 3.1.
- **Curriculum Context:** *Unit 2: Balanced Postsecondary List* is due.
- **Student Behavior:**
    - *Artifact (Program Comparison Matrix):* Uploaded.
    - *List Data:* 8 Schools added. All 8 are "Reach" schools (Ivy League) with <10% acceptance rates.
    - *Fit Criteria:* Student selected "Social Prestige" as the only fit driver.
- **System Assessment:**
    - **Status:** 🔴 **OFF TRACK**
    - **Flags:** 🚩 **Strategy Risk**.
    - **The Logic:** The student did the work on time, so it's not a *Deadline* or *Revision* issue. It is a strategic error. The plan itself is the problem.

### Scenario 4: The "Stale Data" Comeback (10th Grade)

**Profile:** 10th Grader | **Date:** Feb 1st

- **SIS Data:** GPA 1.6 (Entered **14 months ago** in 9th grade).
- **Curriculum Context:** *Unit 2: Impact Project Proposal* is due.
- **Student Behavior:**
    - *Artifact (Impact Proposal):* High-quality PDF uploaded detailing a local food bank project.
    - *Global Challenge:* "Food Systems" selected.
    - *Career Matrix:* Updated with "Non-Profit Manager."
- **System Assessment:**
    - **Status:** 🟢 **ON TRACK**
    - **Flags:** 🚩 **Academic Warning**.
    - **The Logic:** The student is engaging deeply (Green status). The flag alerts the counselor that the academic data is stale (>1 year old) and needs a manual update to ensure accuracy.

### Scenario 5: The "Hidden" Tradesman (12th Grade)

**Profile:** 12th Grader | **Date:** Nov 1st

- **SIS Data:** GPA 2.4 (Fresh).
- **Curriculum Context:** *Milestone: Complete Required Applications* is due.
- **Student Behavior:**
    - *Applications:* 0 College Apps tracked.
    - *Artifact (Resume):* Uploaded/Complete.
    - *Journal:* Mentions "Joined the IBEW Apprenticeship."
- **System Assessment:**
    - **Status:** 🔴 **OFF TRACK**
    - **Flags:** 🚩 **Strategy Risk**.
    - **The Logic:** The system sees a Senior with 0 applications and 0 programs on their list. That is a massive strategy risk. The counselor needs to meet them to log the apprenticeship.

### Scenario 6: The "Silent" Crisis (9th Grade)

**Profile:** 9th Grader | **Date:** Dec 15th

- **SIS Data:** No GPA.
- **Curriculum Context:** *Unit 2: Values Statements* is due.
- **Student Behavior:**
    - *Artifact (Values Statements):* "Value 1: Survival. Why: Because nothing else matters if you're gone."
    - *Alma Reflection (Experience Tier):* Mentions feeling unsafe at home.
- **System Assessment:**
    - **Status:** 🟢 **ON TRACK**
    - **Flags:** 🚩 **Sentiment Alert**.
    - **The Logic:** The student completed the work (Status Green). The content isn't "Low Quality" (so no *Needs Revision* flag). The content is dangerous, triggering the specific *Sentiment* intervention.

### Scenario 7: The "Summer Melt" Senior (12th Grade)

**Profile:** 12th Grader | **Date:** May 15th

- **SIS Data:** GPA 3.5.
- **Curriculum Context:** *Milestone: Financial Aid Award Comparison* & *Enrollment Decision* are past due.
- **Student Behavior:**
    - *Applications:* 5 Submitted, 3 Accepted.
    - *Artifact (Award Comparison):* Not started.
    - *Enrollment Decision:* Null.
- **System Assessment:**
    - **Status:** 🔴 **OFF TRACK**
    - **Flags:** 🚩 **Missed Deadline**.
    - **The Logic:** Keep it simple. They missed the May 1st deadline. It's the same logic as missing a homework assignment, just with higher stakes.

### Scenario 8: The "Manual" Override (11th Grade)

**Profile:** 11th Grader | **Date:** Oct 15th

- **SIS Data:** GPA 1.2 (Fresh).
- **Curriculum Context:** *Unit 1: Polished Resume* is due.
- **Student Behavior:** 0% Completion. No Resume Draft uploaded.
- **System Assessment:**
    - **Status:** 🟢 **ON TRACK** (Manual Override).
    - **Flags:** 🚩 **Staff Follow-up**.
    - **The Logic:** The flag simply contains the text: "Exempt from Resume Unit until Nov 1 due to work schedule." This tells any other admin why the Red student is marked Green.

### Scenario 9: The "Binge" Worker (11th Grade)

**Profile:** 11th Grade Student | **Date:** Nov 1st

- **SIS Data:** No GPA.
- **Curriculum Context:** *Unit 1: Polished Resume* & *Unit 2: Balanced List* due Oct 31st.
- **Student Behavior:**
    - *Oct 1-30:* 0 Activity.
    - *Oct 31 (11 PM):* Uploaded Resume. Added 8 Schools. Uploaded Program Comparison Matrix.
    - *Artifact Quality:* Resume passed AI check.
- **System Assessment:**
    - **Status:** 🟢 **ON TRACK**
    - **Flags:** **NONE**
    - **The Logic:** We cut the "Activity Spike" flag. The student met the deadline and the quality standard. They are on track. No noise.

### Scenario 10: The "Paper Tiger" (10th Grade)

**Profile:** 10th Grader | **Date:** April 15th

- **SIS Data:** GPA 3.8.
- **Curriculum Context:** *Unit 3: Career Pathways Analysis* is due.
- **Student Behavior:**
    - *Artifact (Pathways Slide Deck):* Uploaded "History_Homework.pdf".
    - *Alma Reflection:* Skipped.
- **System Assessment:**
    - **Status:** 🔴 **OFF TRACK**
    - **Flags:** 🚩 **Needs Revision**.
    - **The Logic:** The AI detected a mismatch (Wrong file/Keywords missing). This is treated exactly the same as "Low Quality." The action is the same: Reject and Redo.

---

# Design Review Guidelines

**When making ANY design decision, follow this checklist:**

1. ✅ **Reference the Core Algorithm** - Does this feature/change maintain the on/off track logic?
2. ✅ **Identify the JTBD** - Which of the 5 JTBDs does this support?
3. ✅ **Check Data Ownership** - Are we viewing or owning this data?
4. ✅ **Test Against Scenarios** - Would this change affect any of the 10 scenarios appropriately?
5. ✅ **Warn if Conflicts** - Explicitly flag if the proposed change contradicts any JTBD principle

**Key Principles:**
- Willow *owns* post-secondary readiness calculation, but *views* GPA/SIS data
- Status (On/Off Track) is binary and driven by the algorithm hierarchy
- Flags are action-oriented and ephemeral, not permanent reports
- Do not conflate graduation compliance (JTBD #1) with post-secondary readiness (JTBD #2)
- The system must handle manual overrides (Scenario 8) gracefully
- Sentiment alerts (Scenario 6) bypass quality checks because safety matters more
