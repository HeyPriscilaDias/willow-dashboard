'use client';

import { Card } from '@/components/ui/card';
import { useRole } from '@/lib/context/RoleContext';
import { AnalyticsCard as AnalyticsCardType } from '@/lib/types';

interface AnalyticsProps {
  cards: AnalyticsCardType[];
  title: string;
  onFidelityClick?: () => void;
  onCurriculumPacingClick?: () => void;
}

export function Analytics({ cards, title, onFidelityClick, onCurriculumPacingClick }: AnalyticsProps) {
  const { role } = useRole();

  const isFidelityCard = (label: string) => label === 'Curriculum Progress' && role === 'admin';
  const isPacingCard = (label: string) => label === 'Curriculum Pacing' && role === 'admin';

  const getCardBgColor = (variant?: string) => {
    switch (variant) {
      case 'off-track':
        return 'bg-red-50';
      case 'urgent':
        return 'bg-orange-50';
      case 'fidelity':
        return 'bg-emerald-50';
      case 'pacing':
        return 'bg-emerald-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className="mb-12">
      <h2 className="mb-6 text-lg font-bold text-gray-900">
        {title}
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4">
        {cards.map((card, idx) => {
          const isFidelity = isFidelityCard(card.label);
          const isPacing = isPacingCard(card.label);
          const isClickable = isFidelity || isPacing;

          const handleClick = () => {
            if (isFidelity) {
              onFidelityClick?.();
            } else if (isPacing) {
              onCurriculumPacingClick?.();
            }
          };

          return (
            <Card
              key={idx}
              onClick={handleClick}
              className={`p-6 transition-all hover:shadow-md ${getCardBgColor(card.variant)} ${
                isClickable ? 'cursor-pointer hover:scale-102' : ''
              }`}
            >
              <p className="mb-3 text-sm font-semibold text-gray-700">
                {card.label}
              </p>
              <p className="mb-2 text-4xl font-bold text-gray-900">{card.value}</p>
              <p className={`text-sm ${card.variant === 'off-track' ? 'text-red-700 font-medium' : 'text-gray-700'}`}>
                {card.detail}
              </p>
              {isClickable && (
                <p className="mt-4 text-sm font-semibold text-emerald-700">
                  Click for details
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
