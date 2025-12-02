import { Sun, Snowflake, Cloud } from 'lucide-react';

interface SeasonFilterProps {
  selectedSeasons: string[];
  onSeasonChange: (seasons: string[]) => void;
}

export default function SeasonFilter({ selectedSeasons, onSeasonChange }: SeasonFilterProps) {
  const seasons = [
    { value: 'Yazlık', label: 'Yazlık', icon: Sun },
    { value: 'Kışlık', label: 'Kışlık', icon: Snowflake },
    { value: '4 Mevsim', label: '4 Mevsim', icon: Cloud }
  ];

  const toggleSeason = (season: string) => {
    if (selectedSeasons.includes(season)) {
      onSeasonChange(selectedSeasons.filter(s => s !== season));
    } else {
      onSeasonChange([...selectedSeasons, season]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Mevsim Seçimi <span className="text-sm font-normal italic text-gray-500">(çoklu seçim yapabilirsiniz)</span>
      </h2>
      <div className="flex flex-wrap gap-3">
        {seasons.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => toggleSeason(value)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              selectedSeasons.includes(value)
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
