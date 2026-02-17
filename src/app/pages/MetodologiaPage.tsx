import { useState, useEffect } from "react";
import {
  Shield,
  CheckCircle,
  Users,
  Newspaper,
  GraduationCap,
  Building2,
  Bot,
  Target,
  Lightbulb,
  TrendingUp,
  Award,
  Eye,
  Heart,
  Zap,
  Globe,
  BarChart3,
  FileText,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from '../i18n/LanguageContext';
import { sobreElProyectoTranslations } from '../i18n/MetodlogiaTranslations';

export function SobreElProyectoPage() {
  const { language } = useLanguage();
  const t = sobreElProyectoTranslations[language];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Shield, Eye, CheckCircle, Globe, Heart, Zap, Users, Bot, Newspaper,
      GraduationCap, Building2
    };
    const IconComponent = icons[iconName] || Shield;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-white">
      
     
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="../images/5.webp" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-900/95"></div>
        </div>

        <div 
          className="absolute inset-0 opacity-10 z-0"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div 
          className="container mx-auto px-4 md:px-8 relative z-10"
          style={{
            transform: `translateY(${scrollY * -0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 600)
          }}
        >
          <div className="max-w-5xl mx-auto text-center">
        
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              {t.header.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-6 leading-relaxed">
              {t.header.subtitle}
            </p>
            
                      </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,40 L1200,0 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

   
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.problem.title}
              </h2>
              <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-700 leading-relaxed">
                {t.problem.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.problem.challenges.map((challenge, index) => (
                <div key={index} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

   
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.solution.title}
              </h2>
              <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-700 leading-relaxed">
                {t.solution.intro}
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                {t.solution.howItWorks.title}
              </h3>
              
              <div className="relative">
              
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 transform -translate-x-1/2"></div>
                
                <div className="space-y-12">
                  {t.solution.howItWorks.steps.map((step, index) => (
                    <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                     
                      <div className="flex-1">
                        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                              {step.number}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-slate-700 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      
                   
                      <div className="hidden md:block w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg flex-shrink-0 relative z-10"></div>
                      
                     
                      <div className="hidden md:block flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.impact.title}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-700 leading-relaxed">
                {t.impact.intro}
              </p>
            </div>

            <div className="space-y-8 mb-16">
              {t.impact.goals.map((goal, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      {getIcon(goal.icon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {goal.title}
                      </h3>
                      <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                        {goal.description}
                      </p>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                          <p className="text-slate-700 leading-relaxed">
                            <strong className="text-slate-900">Caso de uso: </strong>
                            {goal.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.uses.title}
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-700 leading-relaxed">
                {t.uses.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.uses.profiles.map((profile, index) => {
                const colors = [
                  { from: 'blue-500', to: 'blue-600', bg: 'blue-50', border: 'blue-500' },
                  { from: 'green-500', to: 'green-600', bg: 'green-50', border: 'green-500' },
                  { from: 'purple-500', to: 'purple-600', bg: 'purple-50', border: 'purple-500' },
                  { from: 'orange-500', to: 'orange-600', bg: 'orange-50', border: 'orange-500' },
                  { from: 'pink-500', to: 'pink-600', bg: 'pink-50', border: 'pink-500' }
                ];
                const color = colors[index % colors.length];
                
                return (
                  <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-${color.border}`}>
                    <div className={`w-14 h-14 bg-gradient-to-br from-${color.from} to-${color.to} rounded-xl flex items-center justify-center mb-4`}>
                      {getIcon(profile.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {profile.title}
                    </h3>
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {profile.description}
                    </p>
                    <ul className="space-y-2">
                      {profile.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className={`w-4 h-4 text-${color.border} flex-shrink-0 mt-0.5`} />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

   
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.quality.title}
              </h2>
              <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-700 leading-relaxed">
                {t.quality.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.quality.principles.map((principle, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    {getIcon(principle.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.data.title}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-700 leading-relaxed">
                {t.data.intro}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border-l-4 border-blue-500">
              <div className="grid md:grid-cols-2 gap-4">
                {t.data.fields.map((field, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-slate-900">{field.name}</div>
                      <div className="text-sm text-slate-600">{field.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t.values.title}
              </h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-700 leading-relaxed">
                {t.values.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.values.list.map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getIcon(value.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

<section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">

  <div className="absolute inset-0 z-0">
    <img
      src="../images/5.webp"
      alt="Barcelona background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-900/70"></div>
  </div>


  <div className="relative z-10 container mx-auto px-4 md:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        {t.cta.title}
      </h2>
      <p className="text-xl text-blue-100 mb-10 leading-relaxed">
        {t.cta.description}
      </p>
    </div>
  </div>
</section>

    </div>
  );
}