import { Flower2, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { translateNote } from '../utils/noteTranslations';

interface NoteFilterProps {
  allNotes: string[];
  selectedNotes: string[];
  onNoteChange: (notes: string[]) => void;
}

export default function NoteFilter({ allNotes, selectedNotes, onNoteChange }: NoteFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNote = (note: string) => {
    if (selectedNotes.includes(note)) {
      onNoteChange(selectedNotes.filter(n => n !== note));
    } else {
      onNoteChange([...selectedNotes, note]);
    }
  };

  const clearSelection = () => {
    onNoteChange([]);
  };

  const filteredNotes = allNotes.filter(note => {
    const translatedNote = translateNote(note).toLowerCase();
    const originalNote = note.toLowerCase();
    const search = searchTerm.toLowerCase();
    return translatedNote.includes(search) || originalNote.includes(search);
  });

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      if (filteredNotes.length > 0) {
        setIsExpanded(true);
      }
    } else {
      setIsExpanded(false);
    }
  }, [searchTerm, filteredNotes.length]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Flower2 className="text-amber-600" size={24} />
          Nota Seçimi
        </h2>
        {selectedNotes.length > 0 && (
          <button
            onClick={clearSelection}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
          >
            <X size={16} />
            Seçimi Temizle ({selectedNotes.length})
          </button>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Nota ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all font-medium shadow-sm hover:shadow-md"
      >
        {isExpanded ? (
          <>
            Notaları Gizle <ChevronUp size={20} />
          </>
        ) : (
          <>
            Tüm Notaları Göster <ChevronDown size={20} />
          </>
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-wrap gap-2">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <button
                  key={note}
                  onClick={() => toggleNote(note)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedNotes.includes(note)
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {translateNote(note)}
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-sm py-4">Aradığınız nota bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
