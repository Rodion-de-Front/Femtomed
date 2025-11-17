import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CLEARSection from '@/components/CLEARSection';
import ProductCard from '@/components/ProductCard';
import NewsCard from '@/components/NewsCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Zap, Award, Users } from 'lucide-react';

import femtoImage from '@assets/generated_images/FEMTO_LDV_laser_system_ef76a057.png';
import galileiImage from '@assets/generated_images/GALILEI_diagnostic_device_2aba34c6.png';
import eyeVizImage from '@assets/generated_images/Eye_diagnostic_visualization_f0bad5c6.png';
import conferenceImage from '@assets/generated_images/Medical_conference_event_8d1ad6c9.png';

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-4');
            entry.target.classList.add('duration-700');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      title: 'FEMTO LDV Z8',
      description: 'Фемтосекундный лазер нового поколения с технологией низкой энергии',
      image: femtoImage,
      features: [
        'Концепция низкой энергии',
        'Интраоперационный ОКТ',
        'Программируемые разрезы'
      ]
    },
    {
      title: 'GALILEI G6',
      description: 'Передовая диагностическая платформа для полного анализа роговицы',
      image: galileiImage,
      features: [
        'Двойная система Scheimpflug',
        'Топография роговицы',
        'Анализ переднего сегмента'
      ]
    },
    {
      title: 'AQUARIUZ',
      description: 'Инновационная система для точной и эффективной хирургии',
      image: eyeVizImage,
      features: [
        'Бесшумная работа',
        'Высокая точность',
        'Эргономичный дизайн'
      ]
    }
  ];

  const news = [
    {
      title: 'Три портрета миопии в Красноярске',
      date: '27 июня 2025',
      location: 'Красноярск',
      image: conferenceImage,
      excerpt: 'Конференция в рамках познавательного проекта для офтальмологов и неврологов',
      category: 'Конференция'
    },
    {
      title: 'Ерошевские чтения 2025',
      date: '19-21 июня 2025',
      location: 'Самара',
      image: conferenceImage,
      excerpt: 'Международная офтальмологическая конференция с участием ведущих специалистов',
      category: 'Конференция'
    },
    {
      title: 'Конференция ВОСТОК-ЗАПАД',
      date: '29-30 мая 2025',
      location: 'Москва',
      image: conferenceImage,
      excerpt: 'Международная конференция по офтальмологии в гибридном формате',
      category: 'Конференция'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-24"
        data-testid="section-trade-in"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                  Программа TRADE-IN
                </div>
                <h2 className="text-4xl font-bold">
                  Обменяйте старое оборудование на новое
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Замените старый фемтосекундный лазер на НОВЫЙ СОВРЕМЕННЫЙ фемтосекундный лазер FEMTO LDV Z-серии с гарантийным обслуживанием и обучением ваших специалистов
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" data-testid="button-trade-in-contact">
                    Связаться с нами
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" data-testid="button-trade-in-details">
                    Подробнее о программе
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center hover-elevate transition-all">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-sm font-semibold">Быстрый обмен</div>
                </Card>
                <Card className="p-6 text-center hover-elevate transition-all">
                  <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-sm font-semibold">Гарантия качества</div>
                </Card>
                <Card className="p-6 text-center hover-elevate transition-all">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-sm font-semibold">Обучение персонала</div>
                </Card>
                <Card className="p-6 text-center hover-elevate transition-all">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm font-semibold">Поддержка</div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <CLEARSection />

      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-24 bg-muted/30"
        data-testid="section-products"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">Наши продукты</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Передовое оборудование для офтальмологии от ведущих производителей
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-24"
        data-testid="section-news"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Новости и события</h2>
              <p className="text-muted-foreground">Актуальные конференции и мероприятия</p>
            </div>
            <Button variant="ghost" data-testid="button-all-news">
              Все новости
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <NewsCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
