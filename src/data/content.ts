export interface CaseStudyMeta {
  id: string;
  slug: string;
  title: string;
  badge: string;
  badgeType: 'anonymized' | 'eval' | 'sample' | 'synthetic';
  summary: string;
  category: string;
  domains: string[];
}

export const profileData = {
  name: "Galih Galuh Giri Gilberto",
  displayName: "Galih Giri",
  location: "Indonesia",
  email: "galihgilberto48@gmail.com",
  linkedin: "https://www.linkedin.com/in/galihgilberto/",
  headline: "Smart Factory Project Management | Digital Training Solutions (VR/MR) | AI Training & Evaluation",
  smartFactoryExperienceYears: 6,
  projectScope: "Multiple projects across departments",
  heroSummary: "Six years coordinating Smart Factory projects across manufacturing departments, with experience in VR/MR training, digital work instructions, and project-based AI response evaluation.",
  shortProfile: "Project management and digital training solutions professional with six years of experience supporting Smart Factory initiatives across multiple departments. Experienced in project planning, coordination, implementation, monitoring and evaluation, stakeholder management, and budget/resource management. Training-solution experience includes VR and Mixed Reality (MR) training, digital work instructions, training content development, training needs analysis, and training effectiveness evaluation. Also has project-based AI task experience.",
  aboutText: [
    "My professional background combines manufacturing operations, Smart Factory project coordination, and digital training solutions. Over six years, I have handled projects across departments, supporting work from planning and coordination through implementation, monitoring, and evaluation. My training-solution experience includes VR and Mixed Reality (MR) training, digital work instructions, training content development, training needs analysis, and training effectiveness evaluation.",
    "I have also completed project-based AI data tasks, including AI response evaluation, response comparison and ranking, factual accuracy checks, prompt writing, response rewriting, data annotation and labeling, instruction-following evaluation, and translation/localization tasks.",
    "I am interested in remote opportunities where practical workplace knowledge, structured problem-solving, project delivery, and careful evaluation of AI-generated content are valuable."
  ],
  responsibilities: [
    "Project planning",
    "Coordination",
    "Implementation",
    "Monitoring and evaluation",
    "Stakeholder management",
    "Budget and resource management"
  ],
  trainingSolutions: [
    "VR training",
    "Mixed Reality (MR) training",
    "Digital work instructions",
    "Training content development",
    "Training needs analysis",
    "Training effectiveness evaluation"
  ],
  reportedImpact: [
    "Reduced training time",
    "Improved accessibility"
  ],
  aiTaskExperience: [
    "AI response evaluation",
    "Response comparison and ranking",
    "Factual accuracy checks",
    "Prompt writing",
    "Response rewriting",
    "Data annotation and labeling",
    "Instruction-following evaluation",
    "Translation / localization tasks",
    "Applying task-specific guidelines"
  ],
  experience: [
    {
      title: "Smart Factory Coordinator | Industry 4.0",
      organization: "Panasonic Industrial Devices Batam",
      period: "September 2020 – Present",
      type: "Full-time",
      details: "Handling Smart Factory project coordination and digital initiatives across manufacturing departments, encompassing planning, stakeholder alignment, workflow implementation, and evaluation."
    },
    {
      title: "VR Developer Intern",
      organization: "Panasonic Industrial Devices Batam",
      period: "August 2019 – August 2020",
      type: "Internship",
      details: "Developed immersive VR training content and simulations designed to support manufacturing floor skill acquisition and safety compliance."
    },
    {
      title: "Independent AI Task Contributor",
      organization: "Outlier AI",
      period: "Project-based",
      type: "Project-based Contributor",
      details: "Completed project-based tasks covering response evaluation, comparison & ranking, fact-checking, instruction adherence, prompt creation, and localization."
    }
  ],
  education: {
    qualification: "Bachelor’s Degree, Information Technology",
    institution: "Universitas Ibnu Sina",
    period: "2024 – 2026"
  },
  priorEducation: {
    qualification: "Associate’s Degree, Information Technology",
    institution: "Politeknik Negeri Batam",
    period: "August 2017 – August 2020"
  },
  coreSkillGroups: [
    {
      label: "AI & Evaluation",
      skills: ["AI Response Evaluation", "Technical Fact-Checking", "Rubric Design"]
    },
    {
      label: "Quality & Process",
      skills: ["Root-Cause Analysis", "Defect Analysis", "Process Improvement"]
    },
    {
      label: "Documentation & Language",
      skills: ["Technical Documentation", "Indonesian–English Technical Review"]
    }
  ],
  tools: [
    { name: "Outlier AI", domain: "AI response evaluation, comparison & ranking, factual accuracy checks, annotation & labeling, guideline-based review" },
    { name: "Google Gemini", domain: "Prompt writing, response rewriting, and evaluation benchmarking" },
    { name: "Microsoft Excel", domain: "Data organization, pivot tables, progress tracking, and reporting (self-rated intermediate)" },
    { name: "Power BI", domain: "Dashboard and reporting for operational data (self-rated intermediate)" },
    { name: "Power Platform", domain: "Workflow automation and RPA support (self-rated intermediate)" },
    { name: "Unity", domain: "VR/MR training development, interactive modules, 3D asset integration, and testing" },
    { name: "HoloLens 2 / Meta Quest", domain: "Mixed Reality training delivery and device-aware interaction design" },
    { name: "Blender", domain: "3D asset creation and optimization for VR/MR training content" },
    { name: "Microsoft Project", domain: "Project planning and schedule tracking" },
    { name: "Digital Workflow / RPA", domain: "Operational process digitization, tracking, and automation initiatives" }
  ],
  unverifiedClaimsNotice: "To ensure absolute professional transparency: no claims are made to Data Scientist titles, advanced Python/SQL programming, machine learning model architecture, PMP certification, or proprietary confidential metrics."
};

export const caseStudiesList: CaseStudyMeta[] = [
  {
    id: "sf-pm",
    slug: "smart-factory-project-management",
    title: "Smart Factory Project Management Across Manufacturing Departments",
    badge: "Experience-based case study — anonymized",
    badgeType: "anonymized",
    category: "Smart Factory & PMO",
    summary: "Cross-departmental project delivery framework covering needs analysis, scoping, multi-department coordination, resource budgeting, execution, and structured evaluation.",
    domains: ["Project Planning", "Cross-Department Delivery", "Monitoring & Evaluation", "Stakeholder Alignment"]
  },
  {
    id: "training-solutions",
    slug: "digital-training-solutions",
    title: "Digital Training Solutions: VR, MR & Digital Work Instructions",
    badge: "Experience-based case study — anonymized",
    badgeType: "anonymized",
    category: "Digital Learning, VR & MR",
    summary: "End-to-end training lifecycle from instructional needs assessment to VR/MR development and digital work instruction rollout, with reported reductions in training time and improved accessibility.",
    domains: ["VR & MR Training", "Digital Work Instructions", "Training Needs Analysis", "Effectiveness Evaluation"]
  },
  {
    id: "ai-eval",
    slug: "ai-response-evaluation",
    title: "AI Response Evaluation & Data Quality Framework",
    badge: "Independent task experience + illustrative sample",
    badgeType: "eval",
    category: "AI Training & Evaluation",
    summary: "Systematic multi-dimensional criteria evaluation comparing model candidate outputs across factual accuracy, instruction following, clarity, and safety.",
    domains: ["AI Response Evaluation", "Comparison & Ranking", "Fact Checking", "Instruction Adherence"]
  },
  {
    id: "task-creation",
    slug: "workplace-task-creation",
    title: "Professional Workplace Task Creation for AI Benchmarking",
    badge: "Illustrative portfolio sample",
    badgeType: "sample",
    category: "AI Training & Evaluation",
    summary: "Original synthetic workplace scenario designed to evaluate complex reasoning: scenario prompt, reference data, expected deliverables, and grading rubric.",
    domains: ["Prompt Writing", "Scenario Synthesis", "Task Design", "Illustrative Benchmark"]
  },
  {
    id: "quality-analysis",
    slug: "manufacturing-quality-analysis",
    title: "Manufacturing Quality & Defect Trend Analysis",
    badge: "Self-initiated demonstration — synthetic data",
    badgeType: "synthetic",
    category: "Manufacturing Domain Knowledge",
    summary: "Demonstration of structured quality data analysis using synthetic assembly line defect counts, Pareto frequency prioritization, and Fishbone root-cause exploration.",
    domains: ["Synthetic Data Demonstration", "Pareto Prioritization", "Defect Categorization", "Root-Cause Framework"]
  }
];
