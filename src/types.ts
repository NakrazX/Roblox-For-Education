export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Category = 
  | 'luau'
  | 'networking'
  | 'physics'
  | 'ui'
  | 'datastores'
  | 'characters'
  | 'environment_audio'
  | 'security_monetization';

export type StudyStatus = 'not_started' | 'in_progress' | 'mastered';

export interface DocTopic {
  id: string;
  title: string;
  thaiTitle: string;
  category: Category;
  difficulty: Difficulty;
  officialUrl: string;
  summary: string;
  whyItMatters: string;
  keyConcepts: string[];
  visualDiagram?: string;
  codeSnippet: string;
  codeExplanation: string[];
  commonMistakes: string[];
  gameExample: string;
  prebakedDeepDive: {
    analogy: string;
    underTheHood: string;
    proTips: string[];
  };
}

export interface UserBookmarkData {
  bookmarked: boolean;
  status: StudyStatus;
  notes: string;
  lastUpdated: string;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExpandedKnowledgeData {
  simpleAnalogy: string;
  deepDiveExplanation: string;
  gameUseCases: string[];
  luauCodeSample: string;
  commonGotchas: string[];
  proTips: string[];
}

export interface ChallengeTestCase {
  id: string;
  label: string;
  hint: string;
}

export interface CodeChallenge {
  id: string;
  title: string;
  thaiTitle: string;
  difficulty: Difficulty;
  category: Category;
  docUrl: string;
  description: string;
  taskObjectives: string[];
  starterCode: string;
  solutionCode: string;
  solutionExplanation: string;
  hints: string[];
  testCriteria: {
    id: string;
    label: string;
    checkFnName: string;
    failureTip: string;
  }[];
}

export interface SecurityVulnerability {
  id: string;
  attackName: string;
  thaiAttackName: string;
  dangerLevel: 'Critical' | 'High' | 'Medium';
  category: string;
  exploitMechanism: string;
  hackerPayloadExample: string;
  vulnerableCode: string;
  vulnerableExplanation: string;
  securedCode: string;
  securedExplanation: string;
  defensePattern: string;
  officialDocUrl: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  thaiTitle: string;
  phase: string;
  description: string;
  keyDeliverables: string[];
  securityChecklist: string[];
  officialDocUrl: string;
}

export interface LearningRoadmapStage {
  id: string;
  stepNumber: number;
  stageName: string;
  thaiStageName: string;
  estimatedHours: string;
  badgeTitle: string;
  shortSummary: string;
  whyLearnFirst: string;
  prerequisites: string[];
  keyTopicsToStudy: {
    topicId?: string;
    title: string;
    description: string;
    docUrl: string;
  }[];
  handsOnPractices: {
    title: string;
    challengeId?: string;
    description: string;
    expectedCodeSnippet?: string;
  }[];
  whatYouWillAchieve: string[];
  proTipsForSuccess: string[];
  nextStageTeaser: string;
}



