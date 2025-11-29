'use client';

import { useState, useMemo } from 'react';
import { GradePacingAggregate, PacingFilterState, PacingMetrics } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { PacingGradeSection } from './PacingGradeSection';
import { applyPacingFilters } from '@/lib/utils/pacingCalculations';

interface CurriculumPacingModalProps {
  open: boolean;
  onClose: () => void;
  gradeAggregates: GradePacingAggregate[];
  metrics: PacingMetrics;
}

export function CurriculumPacingModal({
  open,
  onClose,
  gradeAggregates,
  metrics,
}: CurriculumPacingModalProps) {
  const [filters, setFilters] = useState<PacingFilterState>({
    selectedGrades: [],
    behindThreshold: 'all',
    sortBy: 'most-behind',
  });

  // Apply filters to aggregates
  const filteredAggregates = useMemo(() => {
    let filtered = gradeAggregates;

    // Filter by selected grades
    if (filters.selectedGrades.length > 0) {
      filtered = filtered.filter(agg => filters.selectedGrades.includes(agg.grade));
    }

    // Filter by behind threshold for student details
    if (filters.behindThreshold !== 'all') {
      const threshold = parseInt(filters.behindThreshold);
      filtered = filtered.map(agg => ({
        ...agg,
        studentDetails: agg.studentDetails.filter(
          s => s.pacingStatus === 'behind' && Math.abs(s.variancePercentage) >= threshold
        ),
      }));
    }

    // Apply sorting to student details
    if (filters.sortBy === 'most-behind') {
      filtered = filtered.map(agg => ({
        ...agg,
        studentDetails: [...agg.studentDetails].sort(
          (a, b) => a.variancePercentage - b.variancePercentage
        ),
      }));
    } else if (filters.sortBy === 'name') {
      filtered = filtered.map(agg => ({
        ...agg,
        studentDetails: [...agg.studentDetails].sort(
          (a, b) => a.studentName.localeCompare(b.studentName)
        ),
      }));
    }

    // Sort grades
    if (filters.sortBy === 'most-behind') {
      filtered = [...filtered].sort((a, b) => a.onPacePercentage - b.onPacePercentage);
    }

    return filtered;
  }, [gradeAggregates, filters]);

  const handleGradeFilterChange = (value: string) => {
    if (value === 'all') {
      setFilters(prev => ({ ...prev, selectedGrades: [] }));
    } else {
      const grade = parseInt(value);
      setFilters(prev => ({
        ...prev,
        selectedGrades: prev.selectedGrades.includes(grade)
          ? prev.selectedGrades.filter(g => g !== grade)
          : [...prev.selectedGrades, grade],
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Curriculum Pacing Overview
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-600">
              2024-2025 School Year
            </p>
          </div>

          {/* Overall Metrics Card */}
          <Card className="bg-emerald-50 p-6 mb-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  On Pace
                </p>
                <p className="text-3xl font-bold text-emerald-700">{metrics.onPacePercentage}%</p>
                <p className="text-sm text-gray-700 mt-1">{metrics.totalStudents - Math.round(metrics.totalStudents * metrics.behindPercentage / 100)} students</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Behind
                </p>
                <p className="text-3xl font-bold text-red-700">{metrics.behindPercentage}%</p>
                <p className="text-sm text-gray-700 mt-1">{Math.round(metrics.totalStudents * metrics.behindPercentage / 100)} students</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-gray-900">{metrics.totalStudents}</p>
              </div>
            </div>
          </Card>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filter Section */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Grade
              </label>
              <Select value={filters.selectedGrades.length === 0 ? 'all' : filters.selectedGrades[0].toString()}>
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

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Behind Threshold
              </label>
              <Select value={filters.behindThreshold} onValueChange={(value: any) =>
                setFilters(prev => ({ ...prev, behindThreshold: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Behind</SelectItem>
                  <SelectItem value="5">&gt; 5%</SelectItem>
                  <SelectItem value="10">&gt; 10%</SelectItem>
                  <SelectItem value="20">&gt; 20%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Sort By
              </label>
              <Select value={filters.sortBy} onValueChange={(value: any) =>
                setFilters(prev => ({ ...prev, sortBy: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-behind">Most Behind</SelectItem>
                  <SelectItem value="grade">Grade</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grade Sections */}
          <div className="space-y-4">
            {filteredAggregates.length > 0 ? (
              filteredAggregates.map(gradeData => (
                <PacingGradeSection key={gradeData.grade} gradeData={gradeData} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No grades match the selected filters</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
