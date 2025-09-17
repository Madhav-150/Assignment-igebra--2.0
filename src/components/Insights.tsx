import type { Student } from '@/types/student';
import { pearsonCorrelation } from '@/lib/data';

export default function Insights({ students }: { students: Student[] }) {
  const score = students.map((s) => s.assessment_score);
  const attn = students.map((s) => s.attention);
  const comp = students.map((s) => s.comprehension);
  const focus = students.map((s) => s.focus);
  const ret = students.map((s) => s.retention);

  const corr = [
    { name: 'Attention', value: pearsonCorrelation(attn, score) },
    { name: 'Comprehension', value: pearsonCorrelation(comp, score) },
    { name: 'Focus', value: pearsonCorrelation(focus, score) },
    { name: 'Retention', value: pearsonCorrelation(ret, score) },
  ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  const top = corr[0];
  const practical = top.value > 0.3 ? `${top.name} shows the strongest positive relationship to assessment.` : 'Correlations are weak; consider more data or features.';

  return (
    <div className="card mt-4">
      <div className="title">Insights</div>
      <ul className="mt-2 list-disc list-inside text-slate-300 text-sm space-y-1">
        <li>
          Strongest correlation with assessment: <span className="font-semibold">{top.name} ({top.value})</span>
        </li>
        <li>
          Actionable takeaway: <span className="font-semibold">{practical}</span>
        </li>
        <li>
          Engagement time can be used to segment student personas with clustering.
        </li>
      </ul>
    </div>
  );
}

