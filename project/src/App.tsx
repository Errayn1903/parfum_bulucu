import { useState, useMemo } from 'react';
import { parfumes } from './data/parfumes';
import GenderFilter from './components/GenderFilter';
import SeasonFilter from './components/SeasonFilter';
import NoteFilter from './components/NoteFilter';
import ParfumeCard from './components/ParfumeCard';
import { Sparkles } from 'lucide-react';

function App() {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const allNotes = useMemo(() => {
    const notesSet = new Set<string>();
    parfumes.forEach(parfume => {
      parfume.notalar.forEach(nota => notesSet.add(nota));
    });
    return Array.from(notesSet).sort((a, b) =>
      a.localeCompare(b, 'tr', { sensitivity: 'base' })
    );
  }, []);

  const shouldShowResults = useMemo(() => {
    const hasSpecificGender = selectedGenders.length > 0 && selectedGenders.length < 3;
    const hasAllGenders = selectedGenders.length === 3;
    const hasSeason = selectedSeasons.length > 0;
    const hasNotes = selectedNotes.length > 0;

    if (hasNotes) return true;
    if (hasSpecificGender && hasSeason) return true;
    if (hasAllGenders && hasSeason) return true;

    return false;
  }, [selectedGenders, selectedSeasons, selectedNotes]);

  const getEmptyMessage = useMemo(() => {
    const hasSpecificGender = selectedGenders.length > 0 && selectedGenders.length < 3;
    const hasAllGenders = selectedGenders.length === 3;
    const hasSeason = selectedSeasons.length > 0;
    const hasNotes = selectedNotes.length > 0;

    if (!hasSpecificGender && !hasAllGenders && !hasSeason && !hasNotes) {
      return "Aramaya başlamak için cinsiyet, mevsim veya nota seçebilirsiniz.";
    }

    if ((hasSpecificGender || hasAllGenders) && !hasSeason && !hasNotes) {
      return "Mevsim veya nota seçerek aramaya başlayabilirsiniz.";
    }

    if (!hasSpecificGender && !hasAllGenders && hasSeason && !hasNotes) {
      return "Cinsiyet veya nota seçerek aramaya başlayabilirsiniz.";
    }

    return "Seçtiğiniz kriterlere uygun parfüm bulunamadı. Lütfen farklı filtreler deneyin.";
  }, [selectedGenders, selectedSeasons, selectedNotes]);

  const filteredParfumes = useMemo(() => {
    if (!shouldShowResults) return [];

    return parfumes.filter(parfume => {
      const hasSpecificGender = selectedGenders.length > 0 && selectedGenders.length < 3;
      const hasSeasonSelected = selectedSeasons.length > 0;
      const hasNotesSelected = selectedNotes.length > 0;

      if (hasSpecificGender) {
        const genderMatch = selectedGenders.includes(parfume.cinsiyet);
        if (!genderMatch) return false;
      }

      if (hasSeasonSelected) {
        const seasonMatch = selectedSeasons.includes(parfume.idealSezon);
        if (!seasonMatch) return false;
      }

      if (hasNotesSelected) {
        const noteMatch = selectedNotes.some(selectedNote =>
          parfume.notalar.includes(selectedNote)
        );
        if (!noteMatch) return false;
      }

      return true;
    });
  }, [selectedGenders, selectedSeasons, selectedNotes, shouldShowResults]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="text-amber-600" size={40} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Parfüm Bulucu
            </h1>
            <Sparkles className="text-amber-600" size={40} />
          </div>
          <p className="text-gray-600 text-lg">
            Koku notaları, mevsim ve cinsiyet seçimlerinize göre size en uygun parfümleri saniyeler içinde listeleyin. Aradığınız kokuyu hızlıca keşfedin.
          </p>
        </div>

        <GenderFilter
          selectedGenders={selectedGenders}
          onGenderChange={setSelectedGenders}
        />

        <SeasonFilter
          selectedSeasons={selectedSeasons}
          onSeasonChange={setSelectedSeasons}
        />

        <NoteFilter
          allNotes={allNotes}
          selectedNotes={selectedNotes}
          onNoteChange={setSelectedNotes}
        />

        {shouldShowResults && (
          <div className="mb-4 text-center">
            <p className="text-gray-700 font-medium">
              {filteredParfumes.length} parfüm bulundu
            </p>
            {selectedNotes.length > 0 && filteredParfumes.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Seçtiğiniz nota/notalardan en az biriyle eşleşen parfümler listelenmiştir.
              </p>
            )}
          </div>
        )}

        {!shouldShowResults || filteredParfumes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">
              {getEmptyMessage}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParfumes.map((parfume, index) => (
              <ParfumeCard key={index} parfume={parfume} />
            ))}
          </div>
        )}

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © 2025 FragranceLab. Bu uygulamanın tasarımı, içerikleri ve algoritması telif hakları ile korunmaktadır. İzinsiz kopyalanamaz, çoğaltılamaz veya dağıtılamaz.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

