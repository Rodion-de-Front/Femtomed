import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CLEARSection from "@/components/CLEARSection";
import ProductCard from "@/components/ProductCard";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Target, Spline } from "lucide-react";

import femtoImage from "@assets/generated_images/FEMTO_LDV_laser_system_ef76a057.png";
import galileiImage from "@assets/generated_images/GALILEI_diagnostic_device_2aba34c6.png";
import eyeVizImage from "@assets/generated_images/Eye_diagnostic_visualization_f0bad5c6.png";
import conferenceImage from "@assets/generated_images/Medical_conference_event_8d1ad6c9.png";
import { Link } from "wouter";

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate-in",
              "fade-in",
              "slide-in-from-bottom-4"
            );
            entry.target.classList.add("duration-700");
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
      title: "FEMTO LDV Z8",
      description:
        "Фемтосекундный лазер нового поколения с технологией низкой энергии",
      image: femtoImage,
      brochure: "/pdf/FEMTO.pdf",
      features: [
        "Концепция низкой энергии",
        "Интраоперационный ОКТ",
        "Программируемые разрезы",
      ],
    },
    {
      title: "GALILEI G6",
      description:
        "Передовая диагностическая платформа для полного анализа роговицы",
      image: galileiImage,
      brochure: "/pdf/GALILEI.pdf",
      features: [
        "Двойная система Scheimpflug",
        "Топография роговицы",
        "Анализ переднего сегмента",
      ],
    },
    {
      title: "AQUARIUZ",
      description: "Инновационная система для точной и эффективной хирургии",
      image: eyeVizImage,
      brochure: "/pdf/AQUARIUZ.pdf",
      features: ["Бесшумная работа", "Высокая точность", "Эргономичный дизайн"],
    },
  ];

  const news = [
    {
      id: "tri-portreta-miopii-krasnoyarsk",
      title: "Три портрета миопии в Красноярске",
      date: "27 июня 2025",
      location: "Красноярск",
      image: conferenceImage,
      excerpt:
        "Конференция в рамках познавательного проекта для офтальмологов и неврологов",
      category: "Конференция",
    },
    {
      id: "erosh-evskie-chteniya-2025",
      title: "Ерошевские чтения 2025",
      date: "19-21 июня 2025",
      location: "Самара",
      image: conferenceImage,
      excerpt:
        "Международная офтальмологическая конференция с участием ведущих специалистов",
      category: "Конференция",
    },
    {
      id: "konferentsiya-vostok-zapad",
      title: "Конференция ВОСТОК-ЗАПАД",
      date: "29-30 мая 2025",
      location: "Москва",
      image: conferenceImage,
      excerpt: "Международная конференция по офтальмологии в гибридном формате",
      category: "Конференция",
    },
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
                  Новейшие технологии
                </div>
                <h2 className="text-4xl font-bold">
                  Передовые инновации в офтальмологии
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Откройте для себя новое поколение медицинских технологий:
                  фемтосекундные лазеры с концепцией низкой энергии,
                  интеллектуальные диагностические системы и точные
                  хирургические решения будущего
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/about">
                    <Button size="lg" data-testid="button-trade-in-contact">
                      Узнать больше
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      size="lg"
                      variant="outline"
                      data-testid="button-trade-in-details"
                    >
                      Смотреть оборудование
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/clear-supra">
                  <Card className="p-6 text-center hover-elevate transition-all">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-sm font-semibold">CLEAR SUPRA</div>
                  </Card>
                </Link>
                <Link href="/clear">
                  <Card className="p-6 text-center hover-elevate transition-all">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-sm font-semibold">CLEAR</div>
                  </Card>
                </Link>
                <Link href="/flow-suite">
                  <Card className="p-6 text-center hover-elevate transition-all">
                    <Spline className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-sm font-semibold">FLOW SUITE</div>
                  </Card>
                </Link>
                <Link href="/aquariuz">
                  <Card className="p-6 text-center hover-elevate transition-all">
                    <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-sm font-semibold">AQUARIUZ</div>
                  </Card>
                </Link>
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
            <h2 className="text-4xl sm:text-5xl font-bold">
              Наше оборудование
            </h2>
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
              <h2 className="text-4xl font-bold">Блог</h2>
              <p className="text-muted-foreground">
                Актуальные конференции и мероприятия
              </p>
            </div>
            <Link href="/blog">
              <Button variant="ghost" data-testid="button-all-news">
                Все записи
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
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
