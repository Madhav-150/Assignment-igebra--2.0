"use client";
import { useMemo, useState } from 'react';
import type { Student } from '@/types/student';

export default function StudentsTable({ students }: { students: Student[] }) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof Student>('assessment_score');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const data = students.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q) ||
      s.student_id.toLowerCase().includes(q)
    );
    const sorted = [...data].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      return String(va).localeCompare(String(vb)) * (sortDir === 'asc' ? 1 : -1);
    });
    return sorted;
  }, [students, query, sortKey, sortDir]);

  function setSort(key: keyof Student) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const headers: { key: keyof Student; label: string }[] = [
    { key: 'student_id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'class', label: 'Class' },
    { key: 'comprehension', label: 'Compr.' },
    { key: 'attention', label: 'Attention' },
    { key: 'focus', label: 'Focus' },
    { key: 'retention', label: 'Retention' },
    { key: 'engagement_time', label: 'Eng. (min)' },
    { key: 'assessment_score', label: 'Score' },
  ];

  return (
    <div className="card mt-4">
      <div className="flex items-center justify-between">
        <div className="title">Students</div>
        <input
          className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
          placeholder="Search by name, class, or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-300">
              {headers.map((h) => (
                <th key={h.key as string} className="px-3 py-2 cursor-pointer select-none" onClick={() => setSort(h.key)}>
                  <div className="flex items-center gap-1">
                    <span>{h.label}</span>
                    {sortKey === h.key && <span className="text-xs">{sortDir === 'asc' ? '▲' : '▼'}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.student_id} className="border-t border-slate-800 hover:bg-slate-800/40">
                <td className="px-3 py-2">{s.student_id}</td>
                <td className="px-3 py-2">{s.name}</td>
                <td className="px-3 py-2">{s.class}</td>
                <td className="px-3 py-2">{s.comprehension}</td>
                <td className="px-3 py-2">{s.attention}</td>
                <td className="px-3 py-2">{s.focus}</td>
                <td className="px-3 py-2">{s.retention}</td>
                <td className="px-3 py-2">{s.engagement_time}</td>
                <td className="px-3 py-2 font-semibold">{s.assessment_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

