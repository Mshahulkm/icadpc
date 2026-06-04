import { Medal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SectionHeader from '../components/SectionHeader';

const leaderboardData = [
  { rank: 1, name: 'Mohammed Ali', points: 245 },
  { rank: 2, name: 'Ahmed Hassan', points: 238 },
  { rank: 3, name: 'Omar Farooq', points: 231 },
  { rank: 4, name: 'Khalid Ibrahim', points: 225 },
  { rank: 5, name: 'Youssef Nasser', points: 219 },
  { rank: 6, name: 'Tariq Mahmoud', points: 212 },
  { rank: 7, name: 'Fahad Al-Rashid', points: 205 },
  { rank: 8, name: 'Samir Khaled', points: 198 },
  { rank: 9, name: 'Nasser Abdullah', points: 192 },
  { rank: 10, name: 'Hisham Saeed', points: 185 },
];

function getRankDisplay(rank: number) {
  if (rank === 1) return <div className="flex items-center gap-2"><Medal className="w-5 h-5" style={{ color: '#FFD700' }} /><span className="font-bold" style={{ color: '#FFD700' }}>1st</span></div>;
  if (rank === 2) return <div className="flex items-center gap-2"><Medal className="w-5 h-5" style={{ color: '#C0C0C0' }} /><span className="font-bold" style={{ color: '#C0C0C0' }}>2nd</span></div>;
  if (rank === 3) return <div className="flex items-center gap-2"><Medal className="w-5 h-5" style={{ color: '#CD7F32' }} /><span className="font-bold" style={{ color: '#CD7F32' }}>3rd</span></div>;
  return <span style={{ color: 'var(--muted-white)' }}>{rank}</span>;
}

export default function LeaderboardSection() {
  return (
    <section id="leaderboard" className="py-24 md:py-32 px-6" style={{ background: 'linear-gradient(to bottom, var(--charcoal), var(--deep-black))' }}>
      <div className="max-w-[800px] mx-auto">
        <SectionHeader eyebrow="COMPETITION STANDINGS" title="Live Leaderboard" subtitle="Points updated after each matchday" />
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--glass-border)' }} data-aos="fade-up">
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: 'var(--brand-green)' }}>
                <TableHead className="w-24 text-[var(--white)] font-['Montserrat'] font-semibold text-xs uppercase tracking-wider">Rank</TableHead>
                <TableHead className="text-[var(--white)] font-['Montserrat'] font-semibold text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="text-right w-32 text-[var(--white)] font-['Montserrat'] font-semibold text-xs uppercase tracking-wider">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry, index) => (
                <TableRow key={entry.rank} className="transition-colors duration-200" style={{ backgroundColor: index % 2 === 0 ? 'var(--charcoal)' : 'rgba(26, 26, 26, 0.5)' }} data-aos="fade-down" data-aos-delay={index * 50}>
                  <TableCell className="py-4">{getRankDisplay(entry.rank)}</TableCell>
                  <TableCell className="py-4 font-medium" style={{ color: 'var(--white)' }}>{entry.name}</TableCell>
                  <TableCell className="py-4 text-right font-bold text-xl" style={{ color: 'var(--gold)', fontFamily: "'Oswald', sans-serif" }}>{entry.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
