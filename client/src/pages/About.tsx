import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  ShoppingCart,
  Globe,
  LaptopMinimal,
  CheckCircle,
  Target,
  Users,
  Phone,
  Mail,
  MapPin,
  Eye,
  ArrowRight,
} from "lucide-react";

export default function About() {
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

  const stats = [
    {
      icon: LaptopMinimal,
      value: "10млн+",
      label: "Проведённых процедур",
      delay: "0ms",
    },
    { icon: Award, value: "20+", label: "Лет на рынке", delay: "100ms" },
    {
      icon: Globe,
      value: "ХХХ+",
      label: "Клиник в мире с ZIEMER ",
      delay: "200ms",
    },
    {
      icon: ShoppingCart,
      value: "1700+",
      label: "Продано лазеров ZIEMER",
      delay: "200ms",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Инновации",
      description:
        "Мы внедряем передовые технологии в офтальмологию, работая с лучшими мировыми производителями",
    },
    {
      icon: CheckCircle,
      title: "Качество",
      description:
        "Строгий контроль качества на всех этапах поставки и обслуживания оборудования",
    },
    {
      icon: Users,
      title: "Поддержка",
      description:
        "Комплексное обучение специалистов и техническая поддержка 24/7",
    },
    {
      icon: Award,
      title: "Надежность",
      description:
        "Официальный дистрибьютор ведущих производителей медицинского оборудования",
    },
  ];

  const milestones = [
    { year: "2005", event: "Начало продаж оборудования ZIEMER в России" },
    { year: "2020", event: "Начало внедрения технологии CLEAR SUPRA в России" },
    {
      year: "2025",
      event: "Продан 100 фемтосекундный лазер FEMTO LDV Z в России",
    },
    {
      year: "2025",
      event: "Завезен в Россию лазер AQUARIUZ ",
    },
    { year: "2026", event: "Запуск FLOW SUITЕ в России" },
    { year: "2026", event: "Старт продаж лазера AQUARIUZ в России" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-20 bg-gradient-to-b from-primary/10 via-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <Badge className="animate-in fade-in slide-in-from-top duration-500">
              О компании
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold animate-in fade-in slide-in-from-bottom duration-700">
              Мы делаем зрение{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                совершенным
              </span>
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "200ms" }}
            >
              Femtomed — ведущий российский поставщик передового
              офтальмологического оборудования. С 2009 года мы помогаем клиникам
              внедрять инновационные решения для диагностики и лечения глазных
              заболеваний.
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
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
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
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <Badge>Наша миссия</Badge>
                <h2 className="text-4xl font-bold leading-tight">FEMTOMED</h2>
                <p className="text-xl text-primary font-semibold">
                  Инновационные медицинские технологии
                </p>
              </div>

              <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-background border-primary/20">
                <div className="space-y-8 text-muted-foreground leading-relaxed">
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      <span className="font-semibold text-foreground">
                        ООО «ФЕМТОМЕД»
                      </span>{" "}
                      — эксклюзивный дистрибьютор швейцарской компании ZIEMER в
                      России и СНГ предлагает уникальное офтальмологическое
                      оборудование, а также инновационные медицинские технологии
                      в области диагностики и офтальмохирургии, рассчитанные,
                      прежде всего, на тех, для кого создание и использование
                      новшеств стало частью профессиональной деятельности.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-primary/10">
                    <p className="leading-relaxed">
                      Диагностическая, лазерная и хирургическая уникальная
                      продукция компании Ziemer: многофункциональный
                      диагностический аппарат{" "}
                      <span className="font-semibold text-foreground">
                        GALILEI G6 ColorZ
                      </span>
                      , фемтосекундный лазер{" "}
                      <span className="font-semibold text-foreground">
                        FEMTO LDV Z8
                      </span>
                      , твердотельный абляционный лазер{" "}
                      <span className="font-semibold text-foreground">
                        AQUARIUZ
                      </span>
                      , которую мы представляем на отечественном рынке,
                      отличается исключительными, всеобъемлющими
                      характеристиками и отвечает высоким стандартам качества.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-primary/10">
                    <p className="leading-relaxed">
                      Много лет мы бесперебойно поставляем оборудование и
                      расходные материалы ZIEMER. Нашими клиентами являются
                      такие институты и клиники, как:
                    </p>
                    <ul className="space-y-3 pl-6 list-disc list-outside marker:text-primary">
                      <li>
                        Федеральное государственное бюджетное учреждение
                        "Национальный медицинский исследовательский центр
                        глазных болезней имени Гельмгольца" Министерства
                        здравоохранения Российской Федерации
                      </li>
                      <li>
                        ФГАУ «НМИЦ «МНТК «Микрохирургия глаза» им. акад. С.Н.
                        Федорова» Минздрава РФ
                      </li>
                      <li>
                        Уфимский научно-исследовательский институт глазных
                        болезней БГМУ Минздрава России
                      </li>
                      <li>Центр микрохирургии глаза ОКДЦ ПАО "Газпром"</li>
                      <li>Сеть офтальмологических клиник «ЭКСИМЕР»</li>
                      <li>Офтальмологическая клиника Доктора Куренкова</li>
                      <li>Сеть клиник «3Z»</li>
                      <li>и многие другие</li>
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-primary/10">
                    <p className="leading-relaxed">
                      <span className="font-semibold text-foreground">
                        FEMTOMED
                      </span>{" "}
                      обеспечивает монтаж и запуск оборудования, гарантийное и
                      постгарантийное обслуживание, настройку и ремонт, обучение
                      специалистов навыкам и тонкостям работы на новом
                      приобретенном оборудовании, а также предоставляет все виды
                      консультаций.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-primary/10">
                    <p className="text-lg font-semibold text-foreground leading-relaxed">
                      Работая с нами, Вы гарантировано получите нашу поддержку
                      на всех этапах сотрудничества.
                    </p>
                  </div>
                </div>
              </Card>

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
                      idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ${
                        idx % 2 === 0 ? "text-right" : "text-left"
                      }`}
                    >
                      <Card className="inline-block p-6 hover-elevate transition-all duration-500 group cursor-pointer hover:shadow-lg">
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary group-hover:scale-110 inline-block transition-transform duration-300">
                            {milestone.year}
                          </div>
                          <p className="text-muted-foreground">
                            {milestone.event}
                          </p>
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
                Официальный дистрибьютор ведущих мировых производителей
                офтальмологического оборудования
              </p>
            </div>

            <Card className="p-12 bg-gradient-to-br from-primary/5 to-background border-primary/20 hover-elevate transition-all duration-500">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold">Ziemer Group</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Швейцарская компания Ziemer Group — мировой лидер в
                    производстве фемтосекундных лазеров для офтальмологии.
                    Технология FEMTO LDV с низкой энергией установила новые
                    стандарты безопасности и точности в рефракционной хирургии.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {["FEMTO LDV Z8", "Технология CLEAR SUPRA", "GALILEI G6"].map(
                    (product, idx) => (
                      <Card
                        key={idx}
                        className="p-6 text-center hover-elevate transition-all duration-500 group cursor-pointer"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                          {product}
                        </div>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="py-24 bg-muted/30"
          data-testid="section-contacts"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <Badge>Контакты</Badge>
              <h2 className="text-4xl font-bold">Свяжитесь с нами</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Мы всегда готовы ответить на ваши вопросы и помочь с выбором
                оборудования
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 text-center hover-elevate transition-all duration-500 group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Телефон</h3>
                <a
                  href="tel:+79153526688"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +7 (499) 653-77-67
                </a>
              </Card>

              <Card className="p-6 text-center hover-elevate transition-all duration-500 group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a
                  href="mailto:office@femtomed.ru"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  office@femtomed.ru
                </a>
              </Card>

              <Card className="p-6 text-center hover-elevate transition-all duration-500 group cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground">
                  {" "}
                  г. Москва, ул. Вавилова, д. 69/75, Россия
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
