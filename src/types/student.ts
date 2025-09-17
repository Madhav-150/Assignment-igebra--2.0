export type Student = {
  student_id: string;
  name: string;
  class: string;
  comprehension: number; // 0-100
  attention: number; // 0-100
  focus: number; // 0-100
  retention: number; // 0-100
  engagement_time: number; // minutes per day
  assessment_score: number; // 0-100
};

export type OverviewStats = {
  avgAssessment: number;
  avgComprehension: number;
  avgAttention: number;
  avgFocus: number;
  avgRetention: number;
  avgEngagementTime: number;
};
