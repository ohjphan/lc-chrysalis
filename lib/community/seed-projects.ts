/**
 * Community example copy: edtech product engineers integrating our APIs.
 * - Lead with what their app ships (scores, graph queries, dashboards).
 * - Avoid learning-science jargon in display strings; spell out acronyms or use plain product terms.
 * - Metrics: what you’d watch in production, not research notation alone.
 */
import { SUPPORT_DOCS_URL } from "@/lib/support-links";
import type { CommunityProject } from "@/lib/community/types";

const D = (p: string) => `${SUPPORT_DOCS_URL}${p}`;

export const seedCommunityProjects: CommunityProject[] = [
  {
    slug: "student-writing-feedback",
    title: "Student Writing Insight Engine",
    shortDescription:
      "Rubric-backed feedback on student writing: dimension scores, strengths, growth areas, and summary JSON you can plug into an LMS, writing product, or assessment flow.",
    problem:
      "Collecting writing is straightforward. Getting comparable rubric-level scores and stable JSON at scale is not: ad-hoc prompts drift, and most teams end up rebuilding the same glue code.",
    solution:
      "Send student text and optional context to a Learning Commons Evaluator. It returns versioned rubric scores, strengths, growth areas, a short summary, and a confidence value as plain JSON, the same way you’d handle any other API response.",
    type: "evaluator",
    tags: ["student-assessment", "teacher-insights"],
    metrics: [
      "Agreement between Evaluator dimensions and your human rubric baseline",
      "Evaluate latency (p95) for your max payload size",
      "Parse and schema success rate for downstream jobs",
    ],
    inputsOutputs: {
      inputs:
        "Student response text + optional prompt/context and grade level; rubric scale (e.g. 1–4) configured on the Evaluator",
      outputs:
        "JSON: scores (per trait), strengths[], areas_for_growth[], feedback_summary, confidence. Same shape in Playground or wired from your service.",
    },
    featured: true,
    trendingScore: 96,
    remixCount: 142,
    author: { name: "LC Curriculum Lab", initials: "LC" },
    remixPayload: JSON.stringify(
      {
        name: "student-writing-insight-v1",
        dimensions: [
          "argument_strength",
          "evidence_usage",
          "organization",
          "tone_voice",
        ],
        scale: "1-4",
        outputFields: [
          "scores",
          "strengths",
          "areas_for_growth",
          "feedback_summary",
          "confidence",
        ],
      },
      null,
      2,
    ),
    remixTarget: "playground",
    docsLinks: [
      { label: "Evaluators overview", href: D("/evaluators") },
      { label: "API reference", href: D("/api/evaluators") },
    ],
  },
  {
    slug: "classroom-observation-coaching",
    title: "Classroom Observation Insight Engine",
    shortDescription:
      "Normalize observation notes into JSON: engagement, instructional moves, learner behaviors, missed opportunities, and a coaching focus line for dashboards and leadership views.",
    problem:
      "Notes read differently depending on who wrote them, so rollups get messy. Coaching products still need comparable signals for workflows, reports, and year-over-year views.",
    solution:
      "A Learning Commons Evaluator maps notes to consistent JSON fields (engagement, instructional moves, behaviors, focus). Start with a default coaching frame and point config at Danielson or your district playbook when you are ready.",
    type: "evaluator",
    tags: ["teacher-insights", "curriculum-alignment"],
    metrics: [
      "Share of submitted notes that complete processing successfully",
      "Coach engagement with surfaced insights (views, saves, follow-ups)",
      "Consistency of extracted signals across observers on held-out notes",
    ],
    inputsOutputs: {
      inputs:
        "Observation notes (plain text); optional framework id for alignment (default, Danielson, custom)",
      outputs:
        "JSON: engagement_level (low | moderate | high), instructional_practices[], student_behaviors[], missed_opportunities[], recommended_focus",
    },
    featured: true,
    trendingScore: 89,
    remixCount: 98,
    author: { name: "Partner: Northfield Ed", initials: "NE" },
    remixPayload: JSON.stringify(
      {
        name: "classroom-observation-insight-v1",
        evaluatorCall: "analyze_observation",
        inputs: ["notes"],
        outputFields: [
          "engagement_level",
          "instructional_practices",
          "student_behaviors",
          "missed_opportunities",
          "recommended_focus",
        ],
        framework: {
          default: "instructional-coaching-v1",
          optionalAlignments: ["danielson", "custom"],
        },
      },
      null,
      2,
    ),
    remixTarget: "playground",
    docsLinks: [
      { label: "Evaluators overview", href: D("/evaluators") },
      { label: "Evaluator inputs", href: D("/evaluators/inputs") },
    ],
  },
  {
    slug: "formative-short-answer-insight",
    title: "Formative Short-Answer Insight",
    shortDescription:
      "Short answers scored to stable JSON: alignment, reasoning, precision, plus misconception signals for exit tickets, banks, and formative analytics (no separate one-off pipeline).",
    problem:
      "Multiple choice is easy to score at volume. Short answers are not: teachers repeat rubric passes by hand, exports rarely line up with your attempt model, and dashboards still need structured misconception and trend fields.",
    solution:
      "Post the item stem, learner response, and optional subject track to an Evaluator. You receive compact rubric scores, strengths, growth areas, misconception signals, and confidence in one JSON package, the same pattern you use for any scored item.",
    type: "evaluator",
    tags: ["student-assessment", "teacher-insights"],
    metrics: [
      "Human–rubric agreement on held-out short-answer sets",
      "Evaluate latency (p95) for typical exit-ticket length",
      "Rate of non-empty misconception_signals when items are tagged for diagnostics",
    ],
    inputsOutputs: {
      inputs:
        "Item stem + student response text; subject track (science, math, ELA, social studies); rubric scale (1–4 or 1–5)",
      outputs:
        "JSON: scores (alignment_to_prompt, reasoning_quality, precision), strengths[], areas_for_growth[], misconception_signals[], feedback_summary, confidence",
    },
    featured: true,
    trendingScore: 87,
    remixCount: 76,
    author: { name: "LC Curriculum Lab", initials: "LC" },
    remixPayload: JSON.stringify(
      {
        name: "formative-short-answer-v1",
        rubricId: "constructed_response_v1",
        dimensions: [
          "alignment_to_prompt",
          "reasoning_quality",
          "precision",
        ],
        scale: "1-4 | 1-5",
        outputFields: [
          "scores",
          "strengths",
          "areas_for_growth",
          "misconception_signals",
          "feedback_summary",
          "confidence",
        ],
      },
      null,
      2,
    ),
    remixTarget: "playground",
    docsLinks: [
      { label: "Evaluators overview", href: D("/evaluators") },
      { label: "API reference", href: D("/api/evaluators") },
    ],
  },
  {
    slug: "curriculum-skills-assessment-graph",
    title: "Curriculum Intelligence Graph",
    shortDescription:
      "Hold skills, lessons, assessments, and learners in one graph. Spot who needs help on what and which published materials cover those skills, without a bespoke pipeline per course.",
    problem:
      "Lessons, assessments, and skills usually live in separate products. That makes it tough to answer simple skill-level questions: where a learner is weak, or which lessons actually teach a given skill.",
    solution:
      "Treat skills, lessons, assessments, and learners as nodes with teaches, assesses, and mastered_by relationships. Your apps walk the graph for struggle lists, lesson matches, and simple mastery-style rollups.",
    type: "knowledge-graph",
    tags: ["curriculum-alignment", "student-assessment", "personalized-learning"],
    metrics: [
      "Nodes and edges ingested (coverage of skills linked to content)",
      "Query volume for skill- and learner-scoped traversals",
      "Insight generation rate (gaps, lesson match, overlap reports)",
    ],
    inputsOutputs: {
      inputs: "Import bundle (nodes/edges) + org or course scope + learner result events",
      outputs: "Graph-backed API responses (skill struggle lists, lesson targets, mastery rollups)",
    },
    featured: true,
    trendingScore: 93,
    remixCount: 121,
    author: { name: "LC Curriculum Lab", initials: "LC" },
    remixPayload: JSON.stringify(
      {
        graph: "curriculum-skills-assessment-v1",
        nodes: ["Skill", "Lesson", "Assessment", "Student"],
        edges: ["teaches", "assesses", "mastered_by"],
      },
      null,
      2,
    ),
    remixTarget: "explorer",
    docsLinks: [
      { label: "Knowledge Graph intro", href: D("/knowledge-graph") },
      { label: "Query patterns", href: D("/knowledge-graph/query") },
    ],
    aboutDemoDescription:
      "Mock roster: pick a learner to see struggling skills, related lessons, and a small lesson and skill strip. Remix JSON and docs sit under Integrate.",
  },
  {
    slug: "personalized-learning-pathway-graph",
    title: "Personalized learning pathway",
    shortDescription:
      "Connect prerequisites, related concepts, and next resources in a graph so “what’s next” comes from the data, not a hardcoded playlist for every program.",
    problem:
      "Static playlists ignore prerequisites. Most teams want ranked next steps computed from learner and content data instead of hand-maintained branches for each course.",
    solution:
      "Store skills, concepts, and resources with prerequisite, related, and next-step links. From a learner’s current state, walk the graph to order the next best step.",
    type: "knowledge-graph",
    tags: ["personalized-learning", "curriculum-alignment"],
    metrics: [
      "Time to compute a ranked next-step list",
      "Rate of empty recommendations (graph gaps)",
      "Engagement on suggested steps vs baseline ordering",
    ],
    inputsOutputs: {
      inputs: "Graph slice + per-learner mastery or completion flags",
      outputs: "Ordered next steps (resource or skill ids) for your client",
    },
    featured: true,
    trendingScore: 86,
    remixCount: 102,
    author: { name: "Partner: Summit Learning Tools", initials: "SL" },
    remixPayload: JSON.stringify(
      {
        graph: "learning-pathway-v1",
        nodes: ["Skill", "Concept", "LearningResource"],
        edges: ["prerequisite_of", "related_to", "next_best_step"],
      },
      null,
      2,
    ),
    remixTarget: "explorer",
    docsLinks: [
      { label: "Pathfinding examples", href: D("/knowledge-graph/paths") },
      { label: "Graph schemas", href: D("/knowledge-graph/schema") },
    ],
    aboutDemoDescription:
      "Mock roster: pick a learner for prerequisites, next resources, and pathway hints. Remix JSON and docs are under Integrate.",
  },
  {
    slug: "intervention-early-warning-graph",
    title: "Early Warning & Intervention Graph",
    shortDescription:
      "One graph for signals, risk, and interventions. Use it in district dashboards and MTSS flows, with paths you can explain when someone asks why a student was flagged.",
    problem:
      "Attendance, behavior, and grades still come from different places. Risk reviews often live in exports and spreadsheets, so it is hard to show one coherent story about why a student tripped a flag or which intervention actually fits.",
    solution:
      "Students, signals, risk, and interventions become nodes with typed edges. Your services query the same graph for who is at risk, what evidence ties together, and what to try next, which is enough to power district views and MTSS without redefining the model on every release.",
    type: "knowledge-graph",
    tags: ["teacher-insights", "personalized-learning"],
    metrics: ["Early detection rate", "Intervention usage"],
    inputsOutputs: {
      inputs: "Roster ids + normalized signal feed + intervention catalog",
      outputs: "Risk views, suggested interventions, audit-friendly graph paths",
    },
    featured: true,
    trendingScore: 91,
    remixCount: 115,
    author: { name: "Partner: Northfield Ed", initials: "NE" },
    remixPayload: JSON.stringify(
      {
        graph: "early-warning-v1",
        nodes: ["Student", "Signal", "Risk", "Intervention"],
        edges: ["indicates", "correlates_with", "mitigated_by"],
      },
      null,
      2,
    ),
    remixTarget: "explorer",
    docsLinks: [
      { label: "Knowledge Graph intro", href: D("/knowledge-graph") },
      { label: "Integrations", href: D("/knowledge-graph/integrations") },
    ],
    aboutDemoDescription:
      "Mock district roster: pick a student for signals, risk, and a suggested intervention. Remix JSON and docs are under Integrate.",
  },
];
