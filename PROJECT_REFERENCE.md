# Willow Dashboard - Project Reference

## Quick Start
```bash
cd /Users/prisciladias/Desktop/willow-dashboard
npm run dev
# Open http://localhost:3000
```

## Project Status
- **Framework**: Next.js 16 + React + TypeScript
- **UI Library**: shadcn/ui components + Tailwind CSS v4
- **Location**: `/Users/prisciladias/Desktop/willow-dashboard`
- **Dev Server**: Running on http://localhost:3000
- **Latest Update**: Nov 28, 2024 - Added Curriculum Pacing Overview feature, removed all emojis

## Design System (Willow Education Brand)

### Colors
- **Sidebar**: Light gray (`bg-gray-50`) with border (`border-gray-200`)
- **Card Backgrounds**:
  - Default metrics: `bg-blue-50`
  - Off-Track: `bg-red-50`
  - Urgent: `bg-orange-50`
  - Curriculum Progress: `bg-emerald-50`
- **Text**: Gray-900 (dark), Gray-700 (medium), Gray-500 (light)
- **Accents**: Emerald-700 for clickable items

### Typography
- **Main headings**: `text-3xl font-bold`
- **Section headings**: `text-lg font-bold`
- **Card labels**: `text-sm font-semibold`
- **Body text**: `text-sm`
- **Font family**: Inter (Google Fonts)

### Spacing & Layout
- **Section margins**: `mb-8` to `mb-12`
- **Card padding**: `p-6`
- **Header padding**: `px-8 py-4`
- **Content area padding**: `p-8`
- **Grid gaps**: `gap-6`
- **Sidebar width**: `w-56`

## Sidebar Navigation
- Light gray background (`bg-gray-50`)
- Willow Education logo at top with "W" badge
- Navigation items (text only, no emoji icons):
  - Home (active: `bg-gray-200`)
  - Students
  - Careers
  - Schools
  - Letters
  - Curriculum
  - Settings
- Logout at bottom
- Hidden on mobile (`hidden md:flex`)

## Key Features

### 1. Role-Based Dashboard Views

#### Counselor View
- **Analytics Cards** (4 cards):
  - My Students: 28
  - Off Track: 6 (need intervention)
  - Urgent Today: 4 (requires follow-up)
  - Next Meeting: Today
- **Filters**: Grade, Status, Flag Type, Search
- **Detail Panel Actions**: Add staff follow-up flags, override status

#### Administrator View
- **Analytics Cards** (4 cards):
  - Off Track: 47 (Requiring Intervention)
  - Urgent Flags: 23 (Sentiment + Academic)
  - Curriculum Progress: 75% (175 of 234 lessons) - CLICKABLE
  - Curriculum Pacing: % on pace - CLICKABLE
- **Filters**: Status, Search (no grade/flag filters)
- **Curriculum Progress Modal**:
  - Overall summary with percentage display
  - Progress timeline: Sep 1 (19%) → Nov 28 (75%)
  - Grade-level breakdown: Grades 9-12 with individual percentages
  - Key insights about grade performance
- **Curriculum Pacing Modal**:
  - Overall school pacing metrics (% on pace, % behind)
  - Filter options: By grade, by behind threshold, sort order
  - Expandable grade sections showing on-pace/behind counts
  - Student-level detail table with: lessons completed, progress bar, variance, last lesson date

#### Teacher View
- **Analytics Cards** (4 cards):
  - Caseload: 28 (Total students across classes)
  - Missing Work: 5
  - Concerns: 3
  - Submitted: 23
- **Filters**: Status, Search
- **Table Columns**: Student Info, Status, Assignment Status, Submitted, Action
- **Detail Panel Actions**: Grade assignment, add feedback

### 2. Triage List (All Roles)
- Searchable, filterable student table
- **Default sort**: By flag count (descending) or teacher concern (for teachers)
- **Columns**: Student Info, Status, Flags, Last Activity, Action button
- **Status indicator**: Green (Ready) or Red (Off Track)
- **Student data**: 8 sample students with realistic info

### 3. Detail Panel (Modal Dialog)
- Opens when clicking "Review" or "Grade" button
- **Content**:
  - Student name, grade, status
  - Status logic/reason
  - Active flags list
  - Academic data (counselor only)
- **Counselor-specific actions**:
  - Add Staff Follow-up flag with note
  - Override status (auto-adds staff flag)
- **Teacher-specific actions**:
  - Grade dropdown (A-F)
  - Feedback textarea
  - Submit grade & feedback button
- **Admin-specific actions**:
  - Admin notes textarea
  - Save case note button
  - Escalate to counselor dropdown
  - Escalate case button

## Project Structure
```
willow-dashboard/
├── app/
│   ├── layout.tsx          # Root layout, RoleProvider, sidebar nav
│   ├── page.tsx            # Main page with header and content
│   └── globals.css         # Global styles
├── components/
│   ├── RoleSwitcher.tsx    # Role dropdown ("View as:")
│   ├── DashboardContent.tsx # Main orchestrator, state management
│   └── dashboard/
│       ├── Analytics.tsx           # Metric cards grid
│       ├── TriageList.tsx          # Student table with filters
│       ├── DetailPanel.tsx         # Modal for student details
│       ├── FidelityModal.tsx       # Curriculum Progress detailed modal
│       ├── CurriculumPacingModal.tsx   # Curriculum Pacing detailed modal
│       ├── CurriculumPacingCard.tsx    # Pacing snapshot card (deprecated)
│       ├── PacingGradeSection.tsx      # Collapsible grade section
│       └── PacingStudentRow.tsx        # Individual student pacing row
├── lib/
│   ├── context/
│   │   └── RoleContext.tsx # Role state (React Context)
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   ├── data/
│   │   ├── students.ts           # 8 sample students + 6 flag types
│   │   ├── fidelity.ts           # Curriculum progress timeline + grades
│   │   ├── curriculum.ts         # 120 curriculum lessons (30 per grade)
│   │   └── studentProgress.ts    # Student lesson completions
│   └── utils/
│       └── pacingCalculations.ts # Pacing metrics calculation functions
└── components/ui/          # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── dialog.tsx
    ├── input.tsx
    ├── select.tsx
    ├── table.tsx
    ├── textarea.tsx
    └── ...
```

## Sample Data

### Students (8 total)
1. Jordan Martinez (Grade 11) - Off Track, 2 flags (sentiment, deadline)
2. Alex Chen (Grade 10) - Ready, 1 flag (revision)
3. Sarah Johnson (Grade 12) - Off Track, 2 flags (academic, strategy)
4. Marcus Thompson (Grade 9) - Ready, 0 flags
5. Emma Rodriguez (Grade 11) - Off Track, 1 flag (sentiment)
6. David Park (Grade 10) - Ready, 0 flags
7. Jessica Williams (Grade 12) - Ready, 1 flag (revision)
8. Kevin Lopez (Grade 11) - Off Track, 2 flags (deadline, academic)

### Flag Types (6 total)
- Needs Revision
- Missed Deadline
- Strategy Risk
- Sentiment Alert
- Academic Warning
- Staff Follow-up

### Curriculum Fidelity Data
- **Overall**: 175 of 234 lessons unlocked (75%)
- **Timeline**: Sep 1 (19%) → Nov 28 (75%) - 7 progress points
- **By Grade**:
  - Grade 9: 48/54 (89%)
  - Grade 10: 52/58 (90%)
  - Grade 11: 42/62 (68%)
  - Grade 12: 33/60 (55%)

### Curriculum Pacing Data (Student Progress)
- **Overall Pacing**: Calculated across 8 sample students with varying lesson completion rates
- **School Year Timeline**: Sep 1 - Jun 15 (288 days), Current: Nov 28 (89 days elapsed = 31%)
- **On-Pace Formula**: Lessons Completed / 30 >= Days Elapsed / 288
- **Lesson Completion Range**: 19-29 lessons per student (out of 30 per grade)
- **Grades with Pacing Data**: All students tracked by grade level with individual variance metrics

## Important Design Notes
- No colored left borders on cards (removed for minimalist design)
- Card backgrounds use subtle colors (`bg-*-50`) instead of white
- No uppercase labels (improved readability)
- Generous spacing and padding throughout
- Role switcher labeled "View as:" for clarity
- Inter font applied globally
- Sidebar hidden on mobile (`hidden md:flex`)
- All cards have hover effects (shadow and slight scale)
- All emojis removed from UI for accessibility and clean design
- Curriculum Pacing card uses `bg-emerald-50` to match Curriculum Progress variant

## JTBD (Jobs to Be Done) Coverage

### JTBD 1: Triage & Identify At-Risk Students
- Intervention Inbox with student list
- Sorting by flag count (most urgent first)
- Color-coded status (green/red)
- Flag count badges

### JTBD 2: Status Determination
- Ready / Off Track indicators
- Status logic explanation in detail panel
- Status override capability (counselor only)

### JTBD 3: Implementation Fidelity (Admin View)
- Curriculum Progress card shows: 75% (primary) + 175/234 lessons (secondary)
- Clickable modal with:
  - Overall progress with visual percentage
  - Historical progress timeline (Sep-Nov)
  - Grade-level breakdown with individual percentages
  - Key insights about performance

### JTBD 4: Curriculum Pacing Oversight (Admin View) - NEW
- Curriculum Pacing card shows: % on pace (primary) + % behind (secondary)
- Clickable modal with:
  - Overall school pacing metrics
  - Grade-level breakdown with on-pace vs behind counts
  - Expandable student details showing:
    - Lessons completed / total for grade
    - Visual progress bar with completion percentage
    - Variance from expected pace
    - Last lesson completion date
  - Multi-level filtering: by grade, by behind threshold (5%/10%/20%), sort by most-behind/grade/name
  - School year timeline: Sep 1 - Jun 15 (288 days), 31% elapsed as of Nov 28

### JTBD 5: Intervention Management
- Detail panel for each student
- Flag management (add, remove, view)
- Role-specific actions in detail panel
- Status override with reason tracking

### JTBD 6: Urgent Interventions
- Urgent Flags metric card
- Flag sorting and filtering
- Quick access to flagged students

## API/Backend Integration Points (Future)
When connecting to real backend:
- Replace sample data in `lib/data/students.ts` with API calls
- Update fidelity data in `lib/data/fidelity.ts` with real curriculum data
- Replace curriculum lessons in `lib/data/curriculum.ts` with API calls
- Replace student progress data in `lib/data/studentProgress.ts` with API calls to fetch lesson completions
- Add API calls in `DashboardContent.tsx` for:
  - Fetching student list
  - Adding/removing flags
  - Updating status
  - Fetching progress data
  - Fetching curriculum completion status
- Update pacing calculations to work with real completion timestamps from backend

## Build & Deployment
```bash
# Build for production
npm run build

# Run production build locally
npm start

# Deploy to Vercel
# Push to GitHub, Vercel auto-deploys
```

## Useful Commands
```bash
# Start dev server
npm run dev

# Check TypeScript
npx tsc --noEmit

# Add new shadcn/ui component
npx shadcn@latest add [component-name]

# Kill background process
lsof -i :3000
kill -9 [PID]
```

---
**Last Updated**: Nov 28, 2024
**Status**: Prototype complete with all core features
