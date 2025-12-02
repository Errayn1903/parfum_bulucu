import { Parfume } from '../types/Parfume';
import { User, Users, Sparkles, Droplet, Sun, Snowflake, Cloud } from 'lucide-react';

interface ParfumeCardProps {
  parfume: Parfume;
}

export default function ParfumeCard({ parfume }: ParfumeCardProps) {
  const getGenderIcon = () => {
    switch (parfume.cinsiyet) {
      case 'Erkek':
        return <User size={18} />;
      case 'Kadın':
        return <Sparkles size={18} />;
      case 'Unisex':
        return <Users size={18} />;
    }
  };

  const getGenderColor = () => {
    switch (parfume.cinsiyet) {
      case 'Erkek':
        return 'bg-blue-100 text-blue-700';
      case 'Kadın':
        return 'bg-pink-100 text-pink-700';
      case 'Unisex':
        return 'bg-purple-100 text-purple-700';
    }
  };

  const getSeasonIcon = () => {
    switch (parfume.idealSezon) {
      case 'Yazlık':
        return <Sun size={16} />;
      case 'Kışlık':
        return <Snowflake size={16} />;
      case '4 Mevsim':
        return <Cloud size={16} />;
    }
  };

  const getSeasonColor = () => {
    switch (parfume.idealSezon) {
      case 'Yazlık':
        return 'bg-yellow-100 text-yellow-700';
      case 'Kışlık':
        return 'bg-cyan-100 text-cyan-700';
      case '4 Mevsim':
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{parfume.adi}</h3>
            <p className="text-sm text-gray-600 font-medium">{parfume.marka}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getGenderColor()}`}>
              {getGenderIcon()}
              {parfume.cinsiyet}
            </span>
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getSeasonColor()}`}>
              {getSeasonIcon()}
              {parfume.idealSezon}
            </span>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{parfume.kisaAciklama}</p>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Droplet className="text-amber-600" size={18} />
          <h4 className="text-sm font-semibold text-gray-700">Notalar</h4>
        </div>

        {parfume.ustNota && parfume.ustNota.length > 0 ? (
          <div className="space-y-4">
            {parfume.ustNota.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Üst Notalar</h5>
                <div className="flex flex-wrap gap-2">
                  {parfume.ustNota.map((nota, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200"
                    >
                      {nota}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {parfume.ortaNota && parfume.ortaNota.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Orta Notalar</h5>
                <div className="flex flex-wrap gap-2">
                  {parfume.ortaNota.map((nota, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 rounded-full text-xs font-medium border border-rose-200"
                    >
                      {nota}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {parfume.altNota && parfume.altNota.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Alt Notalar</h5>
                <div className="flex flex-wrap gap-2">
                  {parfume.altNota.map((nota, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-full text-xs font-medium border border-emerald-200"
                    >
                      {nota}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {parfume.notalar.map((nota, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200"
              >
                {nota}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
