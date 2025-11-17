import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Globe, TrendingUp, CheckCircle, Target } from 'lucide-react';

export default function About() {
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

  const stats = [
    { icon: Globe, value: '500+', label: 'Клиник по всему миру', delay: '0ms' },
    { icon: Award, value: '15+', label: 'Лет на рынке', delay: '100ms' },
    { icon: Users, value: '100K+', label: 'Успешных операций', delay: '200ms' },
    { icon: TrendingUp, value: '98%', label: 'Удовлетворенность клиентов', delay: '300ms' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Инновации',
      description: 'Мы внедряем передовые технологии в офтальмологию, работая с лучшими мировыми производителями'
    },
    {
      icon: CheckCircle,
      title: 'Качество',
      description: 'Строгий контроль качества на всех этапах поставки и обслуживания оборудования'
    },
    {
      icon: Users,
      title: 'Поддержка',
      description: 'Комплексное обучение специалистов и техническая поддержка 24/7'
    },
    {
      icon: Award,
      title: 'Надежность',
      description: 'Официальный дистрибьютор ведущих производителей медицинского оборудования'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Основание компании Femtomed' },
    { year: '2012', event: 'Начало сотрудничества с Ziemer Group' },
    { year: '2015', event: 'Внедрение технологии FEMTO LDV в России' },
    { year: '2018', event: 'Запуск программы TRADE-IN' },
    { year: '2020', event: 'Первая установка CLEAR в СНГ' },
    { year: '2025', event: 'Более 500 клиник-партнеров' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-20 bg-gradient-to-b from-primary/10 via-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <Badge className="animate-in fade-in slide-in-from-top duration-500">О компании</Badge>
            <h1 className="text-5xl sm:text-6xl font-bold animate-in fade-in slide-in-from-bottom duration-700">
              Мы делаем зрение{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                совершенным
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '200ms' }}>
              Femtomed — ведущий российский поставщик передового офтальмологического оборудования. 
              С 2009 года мы помогаем клиникам внедрять инновационные решения для диагностики и лечения глазных заболеваний.
            </p>
          </div>
        </div>

        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="py-16 bg-muted/30"
          data-testid="section-stats"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={idx}
                    className="p-8 text-center hover-elevate transition-all duration-500 group cursor-pointer"
                    style={{ animationDelay: stat.delay }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="py-24"
          data-testid="section-mission"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge>Наша миссия</Badge>
                <h2 className="text-4xl font-bold leading-tight">
                  Доступность передовых технологий для каждой клиники
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Мы стремимся сделать инновационное офтальмологическое оборудование доступным 
                    для клиник по всей России и странам СНГ. Наша цель — повысить качество 
                    медицинской помощи и улучшить результаты лечения пациентов.
                  </p>
                  <p>
                    Работая с ведущими мировыми производителями, такими как Ziemer Group, 
                    мы обеспечиваем российский рынок самыми современными решениями в области 
                    рефракционной хирургии и диагностики.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {values.map((value, idx) => {
                  const Icon = value.icon;
                  return (
                    <Card
                      key={idx}
                      className="p-6 hover-elevate transition-all duration-500 hover:shadow-lg group cursor-pointer"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:rotate-6">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{value.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="py-24 bg-muted/30"
          data-testid="section-timeline"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <Badge>История развития</Badge>
              <h2 className="text-4xl font-bold">Наш путь к успеху</h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />
              
              <div className="space-y-12">
                {milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-8 ${
                      idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <Card className="inline-block p-6 hover-elevate transition-all duration-500 group cursor-pointer hover:shadow-lg">
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary group-hover:scale-110 inline-block transition-transform duration-300">
                            {milestone.year}
                          </div>
                          <p className="text-muted-foreground">{milestone.event}</p>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background group-hover:scale-150 transition-transform duration-300" />
                    </div>
                    
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="py-24"
          data-testid="section-partners"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <Badge>Партнерство</Badge>
              <h2 className="text-4xl font-bold">Работаем с лучшими</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Официальный дистрибьютор ведущих мировых производителей офтальмологического оборудования
              </p>
            </div>

            <Card className="p-12 bg-gradient-to-br from-primary/5 to-background border-primary/20 hover-elevate transition-all duration-500">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold">Ziemer Group</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Швейцарская компания Ziemer Group — мировой лидер в производстве фемтосекундных 
                    лазеров для офтальмологии. Технология FEMTO LDV с низкой энергией установила 
                    новые стандарты безопасности и точности в рефракционной хирургии.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {['FEMTO LDV Z8', 'Технология CLEAR', 'GALILEI G6'].map((product, idx) => (
                    <Card
                      key={idx}
                      className="p-6 text-center hover-elevate transition-all duration-500 group cursor-pointer"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {product}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
