
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Home, Crown, Phone, MapPin, Star, Eye, Telescope, Sparkles } from 'lucide-react';

export const ContentSections = () => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(sectionIndex);
            } else {
              newSet.delete(sectionIndex);
            }
            return newSet;
          });
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      id: 'hero',
      icon: Building2,
      title: 'Skyline Tower',
      subtitle: 'Redefining luxury living in the heart of the city',
      content: 'Welcome to the most prestigious address in the metropolitan district. As you explore our architectural masterpiece, discover how each floor tells a unique story of luxury and innovation.',
      position: 'center',
      viewDescription: 'Your journey begins here'
    },
    {
      id: 'entrance-view',
      icon: Eye,
      title: 'Ground Level Perspective',
      subtitle: 'The foundation of luxury',
      content: 'From street level, witness the impressive entrance plaza with its landscaped gardens and curved architectural lines. The building\'s organic wave design creates a stunning first impression that sets it apart from traditional towers.',
      position: 'left',
      viewDescription: 'Currently viewing: Entrance & Ground Floor'
    },
    {
      id: 'residential-floors',
      icon: Home,
      title: 'Mid-Level Residences',
      subtitle: 'Where comfort meets design',
      content: 'As we ascend, observe the residential floors with their flowing balconies and expansive windows. Each unit features floor-to-ceiling glass that maximizes natural light and offers unobstructed city views.',
      position: 'right',
      viewDescription: 'Currently viewing: Floors 2-3'
    },
    {
      id: 'upper-residences',
      icon: Telescope,
      title: 'Upper Level Luxury',
      subtitle: 'Elevated living experience',
      content: 'The upper residential floors showcase premium amenities and enhanced privacy. Notice how the building\'s curved design creates unique living spaces with panoramic views that change throughout the day.',
      position: 'left',
      viewDescription: 'Currently viewing: Floor 4'
    },
    {
      id: 'penthouse-clouds',
      icon: Crown,
      title: 'Penthouse in the Clouds',
      subtitle: 'Above the city, beyond expectations',
      content: 'The crowning achievement - our penthouse level emerges from the clouds like a floating palace. This exclusive residence offers 360-degree views and private terraces that feel like you\'re living in the sky itself.',
      position: 'right',
      viewDescription: 'Currently viewing: Floor 5 - Penthouse Level'
    },
    {
      id: 'rooftop-garden',
      icon: Sparkles,
      title: 'Sky Gardens & Amenities',
      subtitle: 'Your private oasis above the clouds',
      content: 'The rooftop features lush gardens, premium amenities, and entertainment spaces. This is where residents gather to enjoy sunset cocktails while floating above the metropolitan skyline.',
      position: 'left',
      viewDescription: 'Currently viewing: Rooftop Terrace'
    },
    {
      id: 'contact',
      icon: Phone,
      title: 'Schedule Your Private Tour',
      subtitle: 'Experience this architectural marvel',
      content: 'Ready to call Skyline Tower home? Our exclusive sales team is waiting to guide you through this one-of-a-kind living experience. Book your private tour today.',
      position: 'center',
      viewDescription: 'Complete your journey with us'
    }
  ];

  return (
    <div className="min-h-[700vh]">
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isVisible = visibleSections.has(index);
        
        // First and last sections are centered
        if (section.position === 'center') {
          return (
            <section
              key={section.id}
              id={section.id}
              data-section={index}
              className="h-screen flex items-center justify-center px-6"
            >
              <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
                <Card className={`h-auto max-w-2xl bg-black/70 backdrop-blur-lg border-gray-600 text-white transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <CardContent className="p-10">
                    <div className="text-center">
                      <Icon className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                      <h1 className={`${index === 0 ? 'text-5xl md:text-6xl' : 'text-3xl'} font-bold mb-4`}>
                        {section.title}
                      </h1>
                      <p className="text-xl text-blue-300 mb-6">{section.subtitle}</p>
                      <p className="text-lg leading-relaxed text-gray-300 mb-6">
                        {section.content}
                      </p>
                      {index === 0 && (
                        <Badge className="text-lg px-6 py-2 bg-blue-600/20 text-blue-300 border-blue-600/30">
                          Now Selling
                        </Badge>
                      )}
                      {section.id === 'contact' && (
                        <div className="mt-8 space-y-4">
                          <div className="flex items-center justify-center gap-3 text-gray-300">
                            <MapPin className="h-5 w-5" />
                            <span>123 Skyline Avenue, Metropolitan District</span>
                          </div>
                          <div className="flex items-center justify-center gap-3 text-gray-300">
                            <Phone className="h-5 w-5" />
                            <span>+1 (555) 123-4567</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          );
        }

        // Left and right positioned sections with more extreme positioning
        return (
          <section
            key={section.id}
            id={section.id}
            data-section={index}
            className="h-screen flex items-center px-6"
          >
            <div className={`w-full max-w-none mx-auto flex items-center ${
              section.position === 'left' 
                ? 'justify-start pl-12 md:pl-24' 
                : 'justify-end pr-12 md:pr-24'
            }`}>
              <Card className={`h-auto max-w-md bg-black/70 backdrop-blur-lg border-gray-600 text-white transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : section.position === 'left' 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}>
                <CardContent className="p-8">
                  <div className="mb-4">
                    <Badge className="text-xs px-3 py-1 bg-blue-600/30 text-blue-200 border-blue-500/40 mb-4">
                      {section.viewDescription}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <Icon className="h-10 w-10 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                      <p className="text-blue-300 text-sm">{section.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-gray-300">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        );
      })}
    </div>
  );
};
