'use client';

import { useState, useMemo, useEffect } from 'react';
import { Student, FlagType, CurriculumStatus } from '@/lib/types';
import { useRole } from '@/lib/context/RoleContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TriageListProps {
  students: Student[];
  curriculumStats: Record<number, CurriculumStatus>;
  onSelectStudent: (student: Student) => void;
  title: string;
}

export function TriageList({ students, curriculumStats, onSelectStudent, title }: TriageListProps) {
  const { role } = useRole();
  const [gradeFilter, setGradeFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [flagFilter, setFlagFilter] = useState('all');
  const [curriculumFilter, setCurriculumFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Only render dates after client mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get unique classes from students
  const uniqueClasses = Array.from(new Set(students.map(s => s.class))).sort();

  const filteredStudents = useMemo(() => {
    let filtered = students;

    // Grade filter (counselor/admin only)
    if (gradeFilter !== 'all') {
      filtered = filtered.filter(s => s.grade.toString() === gradeFilter);
    }

    // Class filter (teacher only)
    if (role === 'teacher' && classFilter !== 'all') {
      filtered = filtered.filter(s => s.class === classFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    // Flag filter (counselor/admin only)
    if (flagFilter !== 'all') {
      filtered = filtered.filter(s => s.flags.includes(flagFilter as FlagType));
    }

    // Curriculum filter
    if (curriculumFilter !== 'all') {
      filtered = filtered.filter(s => {
        const stats = curriculumStats[s.id];
        if (!stats) return false;
        if (curriculumFilter === 'ghost') return stats.isGhost;
        if (curriculumFilter === 'behind') return stats.completionPercentage < stats.expectedCompletionPercentage;
        if (curriculumFilter === 'on-track') return stats.completionPercentage >= stats.expectedCompletionPercentage;
        return true;
      });
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by flag count (or teacher concern for teacher role)
    if (role === 'teacher') {
      filtered.sort((a, b) => {
        if (a.teacherConcern !== b.teacherConcern) {
          return b.teacherConcern ? 1 : -1;
        }
        return a.name.localeCompare(b.name);
      });
    } else {
      // Sort by Ghost status first, then by flag count
      filtered.sort((a, b) => {
        const aGhost = curriculumStats[a.id]?.isGhost ? 1 : 0;
        const bGhost = curriculumStats[b.id]?.isGhost ? 1 : 0;
        if (aGhost !== bGhost) return bGhost - aGhost;
        return b.flags.length - a.flags.length;
      });
    }

    return filtered;
  }, [students, gradeFilter, classFilter, statusFilter, flagFilter, curriculumFilter, searchTerm, role, curriculumStats]);

  const isCounselorOrAdmin = role === 'counselor' || role === 'admin';
  const flagsHeader = role === 'teacher' ? 'Assignment Status' : 'Flags';
  const activityHeader = role === 'teacher' ? 'Submitted' : 'Last Activity';

  return (
    <Card className="bg-white">
      <div className="border-b border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-lg font-bold text-gray-900">
          {title}
        </h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
          {isCounselorOrAdmin && (
            <div>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {role === 'teacher' && (
            <div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {uniqueClasses.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="on-track">On Track</SelectItem>
                <SelectItem value="off-track">Off Track</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={curriculumFilter} onValueChange={setCurriculumFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Curriculum</SelectItem>
                <SelectItem value="ghost">Ghost Students</SelectItem>
                <SelectItem value="on-track">On Track</SelectItem>
                <SelectItem value="behind">Behind</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isCounselorOrAdmin && (
            <div>
              <Select value={flagFilter} onValueChange={setFlagFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Flags</SelectItem>
                  <SelectItem value="sentiment">Sentiment Alert</SelectItem>
                  <SelectItem value="academic">Academic Warning</SelectItem>
                  <SelectItem value="deadline">Missed Deadline</SelectItem>
                  <SelectItem value="revision">Needs Revision</SelectItem>
                  <SelectItem value="strategy">Strategy Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Input
              placeholder="Student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50">
            <TableRow>
              <TableHead>Student Info</TableHead>
              {role === 'teacher' && <TableHead>Class</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead>Curriculum</TableHead>
              <TableHead>{flagsHeader}</TableHead>
              <TableHead>{activityHeader}</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={role === 'teacher' ? 7 : 6} className="py-12 text-center text-gray-500">
                  <p className="text-lg font-medium">No students found</p>
                  <p className="text-sm">Adjust your filters to see results</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => {
                const isGhost = curriculumStats[student.id]?.isGhost;
                return (
                <TableRow key={student.id} className={`hover:bg-gray-50 ${isGhost ? 'bg-amber-50' : ''}`}>
                  <TableCell>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-600">Grade {student.grade}</div>
                  </TableCell>
                  {role === 'teacher' && (
                    <TableCell>
                      <span className="text-sm text-gray-700">{student.class}</span>
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block h-3 w-3 rounded-full ${
                          student.status === 'on-track' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      />
                      <span className="font-semibold">
                        {student.status === 'on-track' ? 'On Track' : 'Off Track'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const stats = curriculumStats[student.id];
                      if (!stats) return null;
                      const percentage = stats.completionPercentage;
                      const isGhost = stats.isGhost;
                      let barColor = 'bg-emerald-500';
                      let textColor = 'text-emerald-700';
                      if (percentage < 30) {
                        barColor = 'bg-red-500';
                        textColor = 'text-red-700';
                      } else if (percentage < 75) {
                        barColor = 'bg-amber-500';
                        textColor = 'text-amber-700';
                      }
                      return (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div className={`h-full ${barColor}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
                            </div>
                            <span className={`text-xs font-semibold ${textColor}`}>{percentage}%</span>
                            {isGhost && <span className="text-sm">⚠️</span>}
                          </div>
                          <div className="text-xs text-gray-600">{stats.lessonsCompleted}/{stats.totalLessonsForGrade}</div>
                        </div>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    {role === 'teacher' ? (
                      student.teacherConcern ? (
                        <Badge variant="secondary" className="bg-red-100 text-red-900">
                          Concern
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-500">On track</span>
                      )
                    ) : student.flags.length > 0 ? (
                      <Badge variant="secondary" className="bg-red-100 text-red-900">
                        {student.flags.length} flag{student.flags.length > 1 ? 's' : ''}
                      </Badge>
                    ) : (
                      <span className="text-xs text-gray-500">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600" suppressHydrationWarning>
                    {role === 'teacher' ? student.assignmentStatus : (isMounted ? formatDate(student.lastActivity) : '-')}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onSelectStudent(student)}
                      size="sm"
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      {role === 'teacher' ? 'Assess Artifact' : 'Review'}
                    </Button>
                  </TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

  return date.toLocaleDateString();
}
