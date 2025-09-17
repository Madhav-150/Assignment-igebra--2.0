import fs from 'node:fs';
import path from 'node:path';

function randomNormal(mean = 0, stdDev = 1) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdDev + mean;
}

function clamp(n, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Math.round(n)));
}

function generateStudents(count = 200) {
  const classes = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
  const students = [];
  for (let i = 1; i <= count; i++) {
    const baseAbility = clamp(60 + randomNormal(0, 15));
    const attention = clamp(baseAbility + randomNormal(-5, 15));
    const focus = clamp(baseAbility + randomNormal(0, 12));
    const comprehension = clamp(baseAbility + randomNormal(5, 12));
    const retention = clamp(baseAbility + randomNormal(-3, 10));

    // engagement time: minutes per day, positively related to attention/focus
    const engagement_time = Math.max(5, Math.round(20 + 0.4 * attention + 0.3 * focus + randomNormal(0, 15)));

    // assessment score: weighted combination with noise
    const scoreRaw = 0.30 * comprehension + 0.25 * attention + 0.25 * focus + 0.15 * retention + 0.05 * (engagement_time / 1.5) + randomNormal(0, 5);
    const assessment_score = clamp(scoreRaw);

    const student = {
      student_id: `S${String(i).padStart(4, '0')}`,
      name: `Student ${i}`,
      class: classes[i % classes.length],
      comprehension,
      attention,
      focus,
      retention,
      engagement_time,
      assessment_score,
    };
    students.push(student);
  }
  return students;
}

function toCSV(students) {
  const headers = ['student_id','name','class','comprehension','attention','focus','retention','engagement_time','assessment_score'];
  const rows = students.map(s => headers.map(h => s[h]).join(','));
  return [headers.join(','), ...rows].join('\n');
}

const root = path.resolve(process.cwd());
const outDir = path.join(root, 'public', 'data');
fs.mkdirSync(outDir, { recursive: true });

const students = generateStudents(250);
fs.writeFileSync(path.join(outDir, 'students.json'), JSON.stringify(students, null, 2));
fs.writeFileSync(path.join(outDir, 'students.csv'), toCSV(students));

console.log(`Generated ${students.length} students -> ${outDir}`);

