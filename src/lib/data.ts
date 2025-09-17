import type { Student, OverviewStats } from '@/types/student';

export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch('/data/students.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load students data');
  return res.json();
}

export function computeOverviewStats(students: Student[]): OverviewStats {
  const count = students.length || 1;
  const sum = students.reduce(
    (acc, s) => {
      acc.assessment += s.assessment_score;
      acc.comp += s.comprehension;
      acc.attn += s.attention;
      acc.focus += s.focus;
      acc.retent += s.retention;
      acc.eng += s.engagement_time;
      return acc;
    },
    { assessment: 0, comp: 0, attn: 0, focus: 0, retent: 0, eng: 0 }
  );
  return {
    avgAssessment: +(sum.assessment / count).toFixed(2),
    avgComprehension: +(sum.comp / count).toFixed(2),
    avgAttention: +(sum.attn / count).toFixed(2),
    avgFocus: +(sum.focus / count).toFixed(2),
    avgRetention: +(sum.retent / count).toFixed(2),
    avgEngagementTime: +(sum.eng / count).toFixed(2),
  };
}

export function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
  const mx = mean(x);
  const my = mean(y);
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i++) {
    const vx = x[i] - mx;
    const vy = y[i] - my;
    num += vx * vy;
    dx += vx * vx;
    dy += vy * vy;
  }
  const den = Math.sqrt(dx * dy) || 1;
  return +(num / den).toFixed(3);
}

export function toRadarData(student: Student) {
  return [
    { metric: 'Comprehension', value: student.comprehension },
    { metric: 'Attention', value: student.attention },
    { metric: 'Focus', value: student.focus },
    { metric: 'Retention', value: student.retention },
  ];
}

