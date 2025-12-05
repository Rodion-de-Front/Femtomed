import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import conferenceImage from "@assets/generated_images/Medical_conference_event_8d1ad6c9.png";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["Новости", "Обзоры", "Видео", "Статьи"];

  const allNews = [
    {
      id: "clear-cornea-club-2024",
      title: "CLEAR CORNEA CLUB 2024",
      date: "20 июня 2024",
      location: "Москва",
      image: "/images/clearCorneaBanner.png",
      excerpt: "Обзор на XIII съезд офтальмологов России",
      category: "Обзоры",
      url: "https://femtomed.ru/wp-content/uploads/2024/10/%D0%98%D0%A2%D0%9E%D0%93%D0%9E%D0%92%D0%AB%D0%99-%D0%9E%D0%91%D0%97%D0%9E%D0%A0-CLEAR-CORNEA-CLUB-2024.pdf",
    },
    {
      id: "lazer-technologi-zimer",
      title: "Лазерные технологии Ziemer в офтальмологии",
      date: "30 июня 2023",
      location: "Махачкала",
      image: conferenceImage,
      excerpt:
        "Обзор на Северо-Кавказский офтальмологический саммит при поддержке компаний Ziemer и Фемтомед",
      category: "Обзоры",
      url: "https://femtomed.ru/wp-content/uploads/2023/09/%D0%9B%D0%B0%D0%B7%D0%B5%D1%80%D0%BD%D1%8B%D0%B5-%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D0%B8-Ziemer.pdf",
    },
    {
      id: "inovation-tech-zimer",
      title: "Инновационные технологии швейцарской компании ZIEMER",
      date: "28 сентября 2023",
      location: "Москва",
      image: "/images/inovationsZiemreBanner.png",
      excerpt:
        "Международная офтальмологическая конференция с участием ведущих специалистов",
      category: "Обзоры",
      url: "https://femtomed.ru/wp-content/uploads/2024/01/%D0%98%D0%BD%D0%BD%D0%BE%D0%B2%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5-%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D0%B8-%D1%88%D0%B2%D0%B5%D0%B9%D1%86%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B8-ZIEMER.pdf",
    },
    {
      id: "sravnenya-results-extra",
      title: "Cравнительные результаты экстракции лентикулы роговицы",
      date: "-",
      location: "Тамбов",
      image: conferenceImage,
      excerpt:
        "Ссравнительные результаты экстракции лентикулы роговицы на установке ziemer ldv z8 для коррекции миопии средней и высокой степени сиспользованием технологии FAST FLAP",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2024/09/%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F-%D0%9A%D0%BE%D0%BF%D1%8B%D0%BB%D0%BE%D0%B2-%D0%9D%D0%B5%D0%BD%D0%B0%D1%88%D0%B5%D0%B2%D0%B0.pdf",
    },
    {
      id: "konferentsiya-vostok-zapad",
      title: "Экстракция лентикулы по методике CLEAR SUPRA",
      date: "январь 2023",
      location: "Германия",
      image: conferenceImage,
      excerpt: "Клинический опыт, отзывы и зрительные функции после операции",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2023/04/CLEAR_Femto_LDV_Z8.pdf",
    },
    {
      id: "konferentsiya-vostok-zapad",
      title: "Экстракция лентикулы по методике CLEAR SUPRA (II часть)",
      date: "январь 2023",
      location: "Германия",
      image: conferenceImage,
      excerpt: "Клинический опыт, отзывы и зрительные функции после операции",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2023/04/CLEAR_Femto_LDV_Z8.pdf",
    },
    {
      id: "FEMTO-LDV-LASIK",
      title: "FEMTO LDV LASIK (EN)",
      date: "-",
      location: "Швейцария",
      image: conferenceImage,
      excerpt:
        "Low pulse energy flap creation results in significantly less post-op DLK",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Z-Models_LASIK.pdf",
    },
    {
      id: "FEMTO-LDV-LASIK",
      title: "FEMTO LDV LASIK (RU)",
      date: "-",
      location: "Швейцария",
      image: conferenceImage,
      excerpt:
        "Результатом создания лоскута при низком импульсе является существенно меньший послеоперационный диффузный ламеллярный кератит",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Z-Models_LASIK_ru.pdf",
    },
    {
      id: "FEMTO-LDV-Z6",
      title: "FEMTO LDV Z6 Pulse energy (EN)",
      date: "-",
      location: "Швейцария",
      image: conferenceImage,
      excerpt:
        "Corneal cuts with a nJ-energy femto laser results in less cell death and reduced profibrotic markers",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Z6_Pulse-Energy.pdf",
    },
    {
      id: "FEMTO-LDV-Z6",
      title: "FEMTO LDV Z6 Pulse energy (RU)",
      date: "-",
      location: "Швейцария",
      image: conferenceImage,
      excerpt:
        "Результатом разреза роговицы фемтолазером с энергией в нДж стала меньшая гибель клеток и меньшее количество профибротических маркеров",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Z6_Pulse-Energy_ru.pdf",
    },
    {
      id: "sravnenie-ruchnogo-i-femtolazernogo-formirovania-intra-stomalnogo-tunneley",
      title:
        "Сравнение ручного и фемтолазерного формирования интрастромального туннеля",
      date: "-",
      location: "Москва",
      image: conferenceImage,
      excerpt:
        "Сравнение ручного и фемтолазерного формирования интрастромального туннеля для введения воздуха при глубокой передней послойной кератопластике с фемтолазерным сопровождением",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2023/09/DALK.pdf",
    },
    {
      id: "femtosek-support",
      title: "Фемтосекундное сопровождение",
      date: "-",
      location: "Калуга",
      image: conferenceImage,
      excerpt:
        "Фемтосекундное сопровождение в комбинированном хирургическом лечении пролиферативной диабетической ретинопатии",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/st-100.pdf",
    },
    {
      id: "optimisation-energo-parametrs",
      title:
        "Оптимизация энергетических параметров фемтолазерного сопровождения",
      date: "-",
      location: "Калуга",
      image: conferenceImage,
      excerpt:
        "Оптимизация энергетических параметров фемтолазерного сопровождения хирургии катаракты на приборе Ziemer FEMTO LDV Z8 Калужский филиал ФГБУ «МНТК «Микрохирургия глаза» им. акад. С.Н. Федорова» Минздрава России",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/st-200.pdf",
    },
    {
      id: "FEMTO-LDV-Z8",
      title: "FEMTO LDV Z8 Cataract (EN)",
      date: "-",
      location: "Швейцария",
      image: conferenceImage,
      excerpt:
        "Efficient workflow and short learning curve for cataract surgery with FEMTO LDV Z8",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Z8_Cataract.pdf",
    },
    {
      id: "FEMTO-LDV-Z8",
      title: "FEMTO LDV Z8 Cataract (RU)",
      date: "-",
      location: "Швейцария",
      image: conferenceImage,
      excerpt:
        "Эффективный рабочий процесс и короткая кривая обучения для хирургических операций катаракты при помощи FEMTO LDV Z8",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Z8_Cataract_ru.pdf",
    },
    {
      id: "GALILEI-two-channel-scheimpflug-camera",
      title: "GALILEI двухканальная шаймпфлюг-камера",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "Показатели KPI и KProb могут помочь в диагностике кератоконуса",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Galilei_rus.pdf",
    },
    {
      id: "GALILEI-two-channel-scheimpflug-camera",
      title: "Преломляющая сила задней поверхности роговицы при расчетах ИОЛ",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt:
        "Анализатор оптической системы глаза GALILEI позволяет рассчитать силу ИОЛ также точно, как и ИОЛ-мастер.",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Galilei_IOL.pdf",
    },
    {
      id: "users-advises",
      title: "Советы пользователю",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt:
        "Улучшайте качество своих исследований на анализаторе оптических сред глаза Galilei",
      category: "Статьи",
      url: "https://femtomed.ru/wp-content/uploads/2018/06/Galilei_tips.pdf",
    },
    {
      id: "satellite-symposium",
      title: "Сателлитный симпозиум компании ФЕМТОМЕД на «РООФ 2025»",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt:
        "Инновационные технологии в рефракционной хирургии с твердотельным абляционным лазером AQUARIUZ",
      category: "Видео",
      url: "https://disk.yandex.ru/i/3jutR0G70MPUKg",
    },
    {
      id: "plenarnoe-zasedanie",
      title: "РООФ 2025, Пленарное заседание",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt:
        "Твердотельный абляционный лазер AquariuZ: будущее с новыми технологиями",
      category: "Видео",
      url: "https://disk.yandex.ru/i/IDDBqVd8lBswZA",
    },
    {
      id: "Ziemer-Aquariuz",
      title: "Ziemer Aquariuz",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/iGPykPSCsBD_9g",
    },
    {
      id: "Ziemer-FlowSuite",
      title: "Ziemer FlowSuite",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/S1C5ituvZGKYmg",
    },
    {
      id: "microsurgery-center",
      title: "Антонюк В.Д. Центр микрохирургии глаза ОКДЦ ПАО «Газпром»",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/CrOF7QqL6i0hUA",
    },
    {
      id: "GALILEI-CZ-FlowSuite",
      title: "GALILEI G6 CZ & FlowSuite. Хирург Кузнецова Татьяна Сергеевна",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/FMnc-51OLNIU9Q",
    },
    {
      id: "CLEAR-CORNEA-CLUB– 2024-VIDEO",
      title: "CLEAR CORNEA CLUB – 2024",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/d/4AQJ9M57TFCEJA",
    },
    {
      id: "satellite-symposium-video",
      title: "Сателлитный симпозиум компании ФЕМТОМЕД",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt:
        "Инновационные технологии швейцарской компании ZIEMER в клинической практике офтальмолога",
      category: "Видео",
      url: "https://disk.yandex.ru/i/UQiEo4e4975f4w",
    },
    {
      id: "clear-technology",
      title: "Технология CLEAR SUPRA",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/4cxsnqgVGyzYpA",
    },
    {
      id: "clear-technology",
      title: "Фемтоассистированная хирургия катаракты с лазером FEMTO LDV Z8",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/OXTFejywZ2jw7Q",
    },
    {
      id: "femtoassisted-cataract-surgery",
      title: "Фемтоассистированная хирургия катаракты с лазером FEMTO LDV Z8",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/OXTFejywZ2jw7Q",
    },
    {
      id: "new-technology-extraction-corneal-lenticule",
      title: "Новая технология экстракции роговичной лентикулы — CLEAR SUPRA",
      date: "-",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/i/AcehQw8AmTPwKA",
    },
    {
      id: "ziemer-user-meeting",
      title: "ZIEMER USER MEETING",
      date: "5 октября 2022",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/d/PwieuBo9IGqObw",
    },
    {
      id: "femto-technologies-ziemer",
      title: "Фемтолазерные технологии ZIEMER — достижения и перспективы",
      date: "5 октября 2022",
      location: "-",
      image: conferenceImage,
      excerpt: "",
      category: "Видео",
      url: "https://disk.yandex.ru/d/tC6FiUe7GfY_Rw",
    },
    {
      id: "yuzhnorossiyskiy-oftalmologicheskiy-kongress",
      title: "Южнороссийский офтальмологический конгресс",
      date: "30 января 2026",
      location: "Краснодар",
      image: "/images/mntk.png",
      excerpt:
        "30 января 2026 года в Краснодаре наша компания примет участие в Южнороссийском офтальмологическом конгрессе",
      category: "Новости",
    },
    {
      id: "stukalovskie-chteniya-2025",
      title:
        "Межрегиональная научно-практическая конференция «Стукаловские чтения 2025. Современная офтальмология – единство науки и практики»",
      date: "15-16 декабря 2025",
      location: "Воронеж",
      image: "/images/voroneg.jpg",
      excerpt:
        "15-16 декабря в Воронеже состоится Межрегиональная научно-практическая конференция «Стукаловские чтения 2025. Современная офтальмология – единство науки и практики»",
      category: "Новости",
    },
    {
      id: "tri-portreta-miopii-krasnyy-yar-2025",
      title: "«Три портрета миопии: Красный Яр 2025»",
      date: "27 июня 2025",
      location: "Красноярск",
      image: conferenceImage,
      excerpt:
        "27 июня 2025 года в 15.30 состоится конференция в рамках познавательного проекта «Три портрета миопии» в Красноярске",
      category: "Новости",
    },
    {
      id: "tri-portreta-miopii-kaliningrad-2025",
      title: "«Три портрета миопии: Калининград 2025»",
      date: "20 июня 2025",
      location: "Калининград",
      image: conferenceImage,
      excerpt:
        "20 июня 2025 года в 13.00 состоится конференция в рамках познавательного проекта «Три портрета миопии»",
      category: "Новости",
    },
    {
      id: "eroshovskie-chteniya-2025",
      title: "Международная конференция «Ерошевские чтения»",
      date: "19-21 июня 2025",
      location: "Самара",
      image: "/images/Eroshevskie.png",
      excerpt:
        "19-21 июня 2025 года состоится международная офтальмологическая конференция «Ерошевские чтения»",
      category: "Новости",
    },
    {
      id: "vostok-zapad-2025",
      title: "Международная конференция по офтальмологии «Восток-Запад»",
      date: "29-30 мая 2025",
      location: "Уфа",
      image: conferenceImage,
      excerpt:
        "29-30 мая 2025 года состоится Международная конференция по офтальмологии «Восток-Запад» в гибридном формате",
      category: "Новости",
    },
    {
      id: "orenburgskaya-konferentsiya-oftalmologov-2025",
      title: "«Оренбургская Конференция Офтальмологов»",
      date: "23 мая 2025",
      location: "Оренбург",
      image: conferenceImage,
      excerpt:
        "23 мая 2025 года состоится Юбилейная конференция «Оренбургская Конференция Офтальмологов», посвященная 35-летию Оренбургского филиала МНТК",
      category: "Новости",
    },
    {
      id: "sovremennye-podhody-k-diagnostike-i-lecheniyu-2025",
      title:
        "«Современные подходы к диагностике и лечению социально значимых заболеваний глаз»",
      date: "16 мая 2025",
      location: "Калининград",
      image: conferenceImage,
      excerpt:
        "16 мая 2025 года состоится научно-практическая конференция «Современные подходы к диагностике и лечению социально значимых заболеваний глаз», в рамках Межрегиональной образовательной программы Общероссийской общественной организации «Ассоциация врачей офтальмологов» в офлайн формате",
      category: "Новости",
    },
    {
      id: "tri-portreta-miopii-primorie-2025",
      title: "«Три портрета миопии: миопия в Приморье 2025»",
      date: "16 мая 2025",
      location: "Владивосток",
      image: conferenceImage,
      excerpt:
        "16 мая 2025 года состоится конференция офтальмологов и неврологов: «Три портрета миопии: миопия в Приморье 2025»",
      category: "Новости",
    },
    {
      id: "oftalmogerontologiya-2025",
      title:
        "V Международный Научно-образовательный форум «Офтальмогеронтология — инновационные решения проблем»",
      date: "15-16 мая 2025",
      location: "Москва",
      image: conferenceImage,
      excerpt:
        "15-16 мая состоится V Международный Научно-образовательный форум «Офтальмогеронтология — инновационные решения проблем»",
      category: "Новости",
    },
  ];

  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || news.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-5xl sm:text-6xl font-bold">Блог</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Актуальные конференции, семинары и мероприятия в области
                офтальмологии
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
              <div className="w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Поиск по блогу..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-news"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full"
                >
                  Все
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredNews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((news, idx) => (
                  <NewsCard key={idx} {...news} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
