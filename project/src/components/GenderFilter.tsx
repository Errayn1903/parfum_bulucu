import { User, Users, Sparkles } from 'lucide-react';

interface GenderFilterProps {
  selectedGenders: string[];
  onGenderChange: (genders: string[]) => void;
}

export default function GenderFilter({ selectedGenders, onGenderChange }: GenderFilterProps) {
  const genders = [
    { value: 'Erkek', label: 'Erkek', icon: User },
    { value: 'Kadın', label: 'Kadın', icon: Sparkles },
    { value: 'Unisex', label: 'Unisex', icon: Users }
  ];

  const toggleGender = (gender: string) => {
    if (selectedGenders.includes(gender)) {
      onGenderChange(selectedGenders.filter(g => g !== gender));
    } else {
      onGenderChange([...selectedGenders, gender]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Cinsiyet Seçimi <span className="text-sm font-normal italic text-gray-500">(çoklu seçim yapabilirsiniz)</span>
      </h2>
      <div className="flex flex-wrap gap-3">
        {genders.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => toggleGender(value)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              selectedGenders.includes(value)
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-105'
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
