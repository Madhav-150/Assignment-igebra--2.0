"use client";
import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import type { Student } from '@/types/student';
import { pearsonCorrelation, toRadarData } from '@/lib/data';

export default function Charts({ students }: { students: Student[] }) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(students[0]?.student_id ?? null);

  const skillVsScore = useMemo(() => {
    const skills = ['comprehension', 'attention', 'focus', 'retention'] as const;
    return skills.map((k) => ({
      skill: k,
      avg: students.reduce((a, s) => a + (s as any)[k], 0) / (students.length || 1),
      corr: pearsonCorrelation(
        students.map((s) => (s as any)[k] as number),
        students.map((s) => s.assessment_score)
      ),
    }));
  }, [students]);

  const attentionVsPerformance = useMemo(() => students.map((s) => ({ x: s.attention, y: s.assessment_score })), [students]);
  const selectedStudent = useMemo(() => students.find((s) => s.student_id === selectedStudentId) ?? students[0], [students, selectedStudentId]);

  return (
    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <div className="card">
        <div className="title flex items-center justify-between">
          <span>Skill vs Assessment</span>
          <span className="subtitle">corr with score shown</span>
        </div>
        <div className="h-64 mt-2">
          <ResponsiveContainer>
            <BarChart data={skillVsScore.map(d => ({ skill: d.skill, avg: +d.avg.toFixed(1), corr: d.corr }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="skill" stroke="#9ca3af" />
              <YAxis yAxisId="left" stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
              <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid #1f2937' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="avg" fill="#3b82f6" name="Avg Skill" />
              <Bar yAxisId="right" dataKey="corr" fill="#22c55e" name="Correlation" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="title">Attention vs Performance</div>
        <div className="h-64 mt-2">
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis type="number" dataKey="x" name="Attention" stroke="#9ca3af" domain={[0, 100]} />
              <YAxis type="number" dataKey="y" name="Score" stroke="#9ca3af" domain={[0, 100]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: '#0b1220', border: '1px solid #1f2937' }} />
              <Scatter data={attentionVsPerformance} fill="#f59e0b" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card lg:col-span-2">
        <div className="title flex items-center gap-3">
          <span>Student Profile</span>
          <select
            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm"
            value={selectedStudentId ?? ''}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.name} ({s.class})
              </option>
            ))}
          </select>
        </div>
        <div className="h-72 mt-2">
          <ResponsiveContainer>
            <RadarChart data={toRadarData(selectedStudent)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" />
              <Radar name="Skill" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              <Legend />
              <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid #1f2937' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

