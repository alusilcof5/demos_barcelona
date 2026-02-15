import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useGenderStore } from './store';
import { GenderStatsCards } from './GenderStatsCards';
import { WageGapChart } from './Wage.GapCahart';
import { PopulationByDistrictChart } from './PopulationByDistrictChart';
import { IncomeByAgeChart } from './IncomeByAgeChart';
import { useLanguage } from '../../i18n/LanguageContext';
import { generoTranslations } from '../../i18n/GeneroTranslations';

export function GeneroPage() {
  const { data, isLoading, error, fetchGenderData } = useGenderStore();
  const { language } = useLanguage();
  const t = generoTranslations[language];

  useEffect(() => {
    fetchGenderData();
  }, [fetchGenderData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-8 max-w-md shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-red-900">{t.error}</h2>
          </div>
          <p className="text-red-700 mb-6 leading-relaxed">{error}</p>
          <button
            onClick={fetchGenderData}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all shadow-md"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="../images/2.webp" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t.header.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
            {t.header.subtitle}
            <br />
            <strong className="text-white">{t.header.subtitleBold}</strong>
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,40 L1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <GenderStatsCards />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.charts.sectionTitle}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.charts.sectionSubtitle}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <WageGapChart />
              <IncomeByAgeChart />
            </div>

            <div className="mt-8">
              <PopulationByDistrictChart />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl p-8 md:p-10 text-white overflow-hidden shadow-xl">
              <div className="absolute inset-0 z-0">
                <img src="../images/2.webp" alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-8">{t.conclusions.title}</h3>

                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="font-semibold text-xl mb-3">{t.conclusions.wageGap.title}</div>
                    <p className="text-blue-100 leading-relaxed">{t.conclusions.wageGap.text}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="font-semibold text-xl mb-3">{t.conclusions.distribution.title}</div>
                    <p className="text-blue-100 leading-relaxed">{t.conclusions.distribution.text}</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="font-semibold text-xl mb-3">{t.conclusions.employment.title}</div>
                    <p className="text-blue-100 leading-relaxed">{t.conclusions.employment.text}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-blue-200 leading-relaxed">
                    <strong className="text-white text-lg">{t.conclusions.sources}</strong> {t.conclusions.sourcesText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
