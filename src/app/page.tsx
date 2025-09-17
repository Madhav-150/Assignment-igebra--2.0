import Overview from '@/components/Overview';
import Charts from '@/components/Charts';
import StudentsTable from '@/components/StudentsTable';
import Insights from '@/components/Insights';
import { computeOverviewStats } from '@/lib/data';
import type { Student } from '@/types/student';
import studentsData from '../../public/data/students.json';

export default function Page() {
  const students = studentsData as Student[];
  const stats = computeOverviewStats(students);
  return (
    <div className="space-y-4">
      <Overview stats={stats} />
      <Charts students={students} />
      <StudentsTable students={students} />
      <Insights students={students} />
    </div>
  );
}

