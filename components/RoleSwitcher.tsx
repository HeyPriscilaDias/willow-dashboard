'use client';

import { useRole } from '@/lib/context/RoleContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-semibold text-gray-700">
        View as:
      </label>
      <Select value={role} onValueChange={(value) => setRole(value as any)}>
        <SelectTrigger className="w-[180px] border border-gray-300 font-medium text-gray-900 bg-white hover:bg-gray-50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="counselor">Counselor</SelectItem>
          <SelectItem value="admin">Administrator</SelectItem>
          <SelectItem value="teacher">Teacher</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
