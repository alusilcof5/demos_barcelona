import { useState, useEffect } from "react";
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Globe,
  CheckCircle,
  AlertCircle,
  User,
  Building2,
  FileText,
} from "lucide-react";
import { useLanguage } from '../i18n/LanguageContext';
import { contactoTranslations } from '../i18n/contactoTranslations';

export function ContactoPage() {
  const { language } = useLanguage();
  const t = contactoTranslations[language];
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    organization: ""
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulación de envío (aquí irá tu lógica real de envío)
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        organization: ""
      });
      
      // Reset status después de 5 segundos
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="../images/2.webp" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20">
              <MessageSquare className="w-5 h-5 text-white" />
              <span className="text-white font-medium">{t.header.badge}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.header.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {t.contactInfo.email.title}
                </h3>
                <p className="text-slate-700 mb-3">
                  {t.contactInfo.email.description}
                </p>
                <a 
                  href={`mailto:${t.contactInfo.email.address}`}
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group"
                >
                  {t.contactInfo.email.address}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

             
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500 hover:shadow-lg transition-all">
  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
    <Globe className="w-7 h-7 text-white" />
  </div>
  <h3 className="text-xl font-bold text-slate-900 mb-2">
    {t.contactInfo.social.title}
  </h3>
  <p className="text-slate-700 mb-4">
    {t.contactInfo.social.description}
  </p>
  <div className="flex gap-3">
    {/* GitHub */}
    <a 
      href="https://github.com/alusilcof5"  
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all"
      aria-label="GitHub"
    >
      <Github className="w-5 h-5 text-white" />
    </a>

    {/* LinkedIn */}
    <a 
      href="https://www.linkedin.com/in/ana-lucia-silva-cordoba" 
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all"
      aria-label="LinkedIn"
    >
      <Linkedin className="w-5 h-5 text-white" />
    </a>
  </div>
</div>


              {/* Location Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {t.contactInfo.location.title}
                </h3>
                <p className="text-slate-700 mb-2">
                  {t.contactInfo.location.description}
                </p>
                <p className="text-slate-600 text-sm">
                  {t.contactInfo.location.address}
                </p>
              </div>
            </div>

            {/* Two Column Layout: Form + Info */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-xl p-8 border-l-4 border-blue-500">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    {t.form.title}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.form.fields.name.label} *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder={t.form.fields.name.placeholder}
                          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.form.fields.email.label} *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder={t.form.fields.email.placeholder}
                          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Organization Field */}
                    <div>
                      <label htmlFor="organization" className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.form.fields.organization.label}
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder={t.form.fields.organization.placeholder}
                          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.form.fields.subject.label} *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all appearance-none bg-white"
                        >
                          <option value="">{t.form.fields.subject.placeholder}</option>
                          {t.form.fields.subject.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.form.fields.message.label} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder={t.form.fields.message.placeholder}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 ${
                          formStatus === 'sending'
                            ? 'bg-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                        } text-white`}
                      >
                        {formStatus === 'sending' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t.form.sending}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t.form.submit}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Success/Error Messages */}
                    {formStatus === 'success' && (
                      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-900">{t.form.success.title}</p>
                          <p className="text-sm text-green-700">{t.form.success.message}</p>
                        </div>
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-900">{t.form.error.title}</p>
                          <p className="text-sm text-red-700">{t.form.error.message}</p>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="space-y-6">
                
                {/* FAQ Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {t.sidebar.faq.title}
                  </h3>
                  <ul className="space-y-3">
                    {t.sidebar.faq.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Response Time Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {t.sidebar.responseTime.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {t.sidebar.responseTime.description}
                  </p>
                </div>

                {/* Privacy Notice */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {t.sidebar.privacy.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {t.sidebar.privacy.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* CTA Section */}
<section className="relative py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
  {/* Imagen de fondo */}
  <div className="absolute inset-0 z-0">
    <img
      src="../images/2.webp"
      alt="Barcelona background"
      className="w-full h-full object-cover"
    />
    {/* Overlay para mejorar legibilidad */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
  </div>

  <div className="container relative z-10 mx-auto px-4 md:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        {t.cta.title}
      </h2>
      <p className="text-xl text-blue-100 mb-8 leading-relaxed">
        {t.cta.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="/sobre-el-proyecto"
          className="px-8 py-4 bg-white hover:bg-blue-50 text-blue-900 rounded-lg font-semibold transition-all shadow-lg"
        >
          {t.cta.buttons.explore}
        </a>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}