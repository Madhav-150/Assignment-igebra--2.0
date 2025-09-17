import type { OverviewStats } from '@/types/student';

export default function Overview({ stats }: { stats: OverviewStats }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card">
        <div className="title">Average Assessment</div>
        <div className="text-3xl font-bold mt-2">{stats.avgAssessment}</div>
        <div className="subtitle">Across all students</div>
      </div>
      <div className="card">
        <div className="title">Average Cognitive Skills</div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <span>Comprehension</span>
          <span className="text-right font-semibold">{stats.avgComprehension}</span>
          <span>Attention</span>
          <span className="text-right font-semibold">{stats.avgAttention}</span>
          <span>Focus</span>
          <span className="text-right font-semibold">{stats.avgFocus}</span>
          <span>Retention</span>
          <span className="text-right font-semibold">{stats.avgRetention}</span>
        </div>
      </div>
      <div className="card">
        <div className="title">Avg Engagement (min/day)</div>
        <div className="text-3xl font-bold mt-2">{stats.avgEngagementTime}</div>
        <div className="subtitle">Learning platform usage</div>
      </div>
    </div>
  );
}

