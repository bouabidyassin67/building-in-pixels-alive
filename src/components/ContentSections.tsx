
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Home, Crown, Phone, MapPin, Star } from 'lucide-react';

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
      id: 'entrance',
      icon: Building2,
      title: 'Grand Entrance',
      subtitle: 'Where luxury begins',
      content: 'Step into a world of sophisticated design with our double-height lobby featuring marble finishes, contemporary art installations, and 24/7 concierge service.'
    },
    {
      id: 'amenities',
      icon: Star,
      title: 'World-Class Amenities',
      subtitle: 'Everything you need',
      content: 'Enjoy our rooftop infinity pool, state-of-the-art fitness center, private dining rooms, and landscaped terraces with panoramic city views.'
    },
    {
      id: 'residences',
      icon: Home,
      title: 'Luxury Residences',
      subtitle: 'Your perfect home',
      content: 'Spacious 1-4 bedroom apartments with floor-to-ceiling windows, premium finishes, smart home technology, and private balconies overlooking the city.'
    },
    {
      id: 'penthouse',
      icon: Crown,
      title: 'Penthouse Collection',
      subtitle: 'The pinnacle of luxury',
      content: 'Exclusive penthouse suites with private elevators, wraparound terraces, premium appliances, and unobstructed 360-degree city views.'
    },
    {
      id: 'contact',
      icon: Phone,
      title: 'Schedule Your Visit',
      subtitle: 'Experience luxury living',
      content: 'Contact our sales team to schedule a private tour and discover why this is the most sought-after address in the city.'
    }
  ];

  return (
    <div className="min-h-[500vh]">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            Skyline Tower
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Redefining luxury living in the heart of the city
          </p>
          <Badge className="text-lg px-6 py-2 bg-blue-600/20 text-blue-300 border-blue-600/30">
            Now Selling
          </Badge>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isVisible = visibleSections.has(index);
        
        return (
          <section
            key={section.id}
            id={section.id}
            data-section={index}
            className="h-screen flex items-center justify-center px-6"
          >
            <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
              <Card className={`w-full max-w-2xl bg-black/60 backdrop-blur-lg border-gray-700 text-white transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Icon className="h-12 w-12 text-blue-400" />
                    <div>
                      <h2 className="text-3xl font-bold">{section.title}</h2>
                      <p className="text-blue-300">{section.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    {section.content}
                  </p>
                  {section.id === 'contact' && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="h-5 w-5" />
                        <span>123 Skyline Avenue, Metropolitan District</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Phone className="h-5 w-5" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        );
      })}
    </div>
  );
};
