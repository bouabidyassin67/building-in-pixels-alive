
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Home, Crown, Phone, MapPin, Star, Eye, Telescope, Sparkles, Users, Wifi, Car, Shield, Waves } from 'lucide-react';

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
      content: 'Welcome to the most prestigious address in the metropolitan district. Rising 60 stories above the cityscape, Skyline Tower offers unparalleled views, world-class amenities, and architectural excellence. Experience a new standard of luxury living where every detail has been crafted to perfection.',
      position: 'center',
      viewDescription: 'Your journey begins here',
      features: ['60 Stories of Luxury', '180 Exclusive Residences', '24/7 Concierge Service', 'Sky Gardens & Terraces'],
      pricing: 'Starting from $2.5M'
    },
    {
      id: 'entrance-view',
      icon: Eye,
      title: 'Grand Entrance Plaza',
      subtitle: 'First impressions that last forever',
      content: 'The moment you arrive, you\'ll understand why Skyline Tower stands apart. Our grand entrance features a 30-foot waterfall cascade, imported Italian marble flooring, and custom crystal chandeliers. The curved glass facade creates a stunning visual gateway to luxury.',
      position: 'left',
      viewDescription: 'Currently viewing: Ground Level & Entrance',
      features: ['Valet Parking Service', 'Private Drop-off Zone', 'Secured Entry Systems', 'Landscaped Gardens'],
      amenity: 'Double-height lobby with 24/7 doorman'
    },
    {
      id: 'residential-floors',
      icon: Home,
      title: 'Luxury Residences',
      subtitle: 'Where comfort meets sophistication',
      content: 'Floors 5-45 house our premium residential units, each featuring floor-to-ceiling windows, premium hardwood flooring, and custom millwork. Every residence includes smart home technology, European appliances, and private balconies with breathtaking city views.',
      position: 'right',
      viewDescription: 'Currently viewing: Residential Floors 5-45',
      features: ['1-4 Bedroom Layouts', 'Smart Home Integration', 'Premium Appliances', 'City & River Views'],
      amenity: 'Residents-only elevator access'
    },
    {
      id: 'upper-residences',
      icon: Telescope,
      title: 'Sky Residences',
      subtitle: 'Elevated living, elevated views',
      content: 'Floors 46-55 offer our most exclusive residential experiences. These sky residences feature 12-foot ceilings, private terraces, and panoramic windows. Each unit includes a private wine cellar, home office space, and access to the exclusive Sky Club.',
      position: 'left',
      viewDescription: 'Currently viewing: Sky Residences 46-55',
      features: ['Private Wine Cellars', 'Home Office Spaces', 'Exclusive Sky Club Access', 'Panoramic Views'],
      amenity: 'Personal concierge service included'
    },
    {
      id: 'penthouse-clouds',
      icon: Crown,
      title: 'Penthouse Collection',
      subtitle: 'The crown jewel of urban living',
      content: 'Floors 56-58 house our ultra-exclusive penthouse collection. These magnificent homes feature private elevator access, wrap-around terraces, infinity pools, and 360-degree city views. Each penthouse is a masterpiece of design and luxury.',
      position: 'right',
      viewDescription: 'Currently viewing: Penthouse Floors 56-58',
      features: ['Private Elevator Access', 'Infinity Pools', 'Wrap-around Terraces', '360° City Views'],
      amenity: 'Dedicated penthouse concierge team'
    },
    {
      id: 'rooftop-garden',
      icon: Sparkles,
      title: 'Sky Gardens & Amenities',
      subtitle: 'Your private paradise above the clouds',
      content: 'The rooftop level features lush sky gardens, an Olympic-size pool, state-of-the-art fitness center, spa facilities, and multiple entertainment spaces. This is where residents gather to enjoy sunset cocktails while floating above the metropolitan skyline.',
      position: 'left',
      viewDescription: 'Currently viewing: Rooftop Level 59-60',
      features: ['Olympic Pool & Spa', 'Fitness Center', 'Sky Gardens', 'Event Spaces'],
      amenity: 'Rooftop helipad for private access'
    },
    {
      id: 'contact',
      icon: Phone,
      title: 'Schedule Your Private Tour',
      subtitle: 'Experience this architectural marvel',
      content: 'Ready to call Skyline Tower home? Our exclusive sales team is waiting to guide you through this one-of-a-kind living experience. Book your private helicopter tour or ground-level presentation today. Financing options available for qualified buyers.',
      position: 'center',
      viewDescription: 'Complete your journey with us',
      features: ['Private Helicopter Tours', 'Virtual Reality Previews', 'Flexible Financing', 'Move-in Ready Units']
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
                <Card className={`h-auto max-w-3xl bg-black/80 backdrop-blur-lg border-gray-600 text-white transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <CardContent className="p-12">
                    <div className="text-center">
                      <Icon className="h-20 w-20 text-blue-400 mx-auto mb-8" />
                      <h1 className={`${index === 0 ? 'text-5xl md:text-7xl' : 'text-4xl'} font-bold mb-6`}>
                        {section.title}
                      </h1>
                      <p className="text-2xl text-blue-300 mb-8">{section.subtitle}</p>
                      <p className="text-lg leading-relaxed text-gray-300 mb-8 max-w-2xl mx-auto">
                        {section.content}
                      </p>
                      
                      {section.features && (
                        <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
                          {section.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-blue-200">
                              <Star className="h-4 w-4 text-blue-400" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {index === 0 && (
                        <div className="space-y-4">
                          <Badge className="text-xl px-8 py-3 bg-blue-600/30 text-blue-300 border-blue-600/50">
                            Now Selling - Limited Availability
                          </Badge>
                          {section.pricing && (
                            <p className="text-lg text-green-400 font-semibold">{section.pricing}</p>
                          )}
                        </div>
                      )}
                      
                      {section.id === 'contact' && (
                        <div className="mt-10 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="flex items-center justify-center gap-3 text-gray-300 bg-gray-800/50 p-4 rounded-lg">
                              <MapPin className="h-6 w-6 text-blue-400" />
                              <div className="text-left">
                                <p className="font-semibold">Address</p>
                                <p className="text-sm">123 Skyline Avenue<br />Metropolitan District</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-3 text-gray-300 bg-gray-800/50 p-4 rounded-lg">
                              <Phone className="h-6 w-6 text-blue-400" />
                              <div className="text-left">
                                <p className="font-semibold">Sales Office</p>
                                <p className="text-sm">+1 (555) 123-4567<br />Open 7 Days a Week</p>
                              </div>
                            </div>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                            Schedule Private Tour
                          </button>
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
              <Card className={`h-auto max-w-lg bg-black/80 backdrop-blur-lg border-gray-600 text-white transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : section.position === 'left' 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}>
                <CardContent className="p-10">
                  <div className="mb-6">
                    <Badge className="text-xs px-4 py-2 bg-blue-600/30 text-blue-200 border-blue-500/40 mb-6">
                      {section.viewDescription}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 mb-8">
                    <Icon className="h-12 w-12 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold mb-3">{section.title}</h2>
                      <p className="text-blue-300 text-lg">{section.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-gray-300 mb-6">
                    {section.content}
                  </p>
                  
                  {section.features && (
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wide">Key Features</h4>
                      <div className="space-y-2">
                        {section.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-gray-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.amenity && (
                    <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4 mt-6">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-blue-200 font-medium">{section.amenity}</span>
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
