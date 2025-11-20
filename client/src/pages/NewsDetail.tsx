import { useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, ArrowLeft, Play, Clock } from "lucide-react";
import conferenceImage from "@assets/generated_images/Medical_conference_event_8d1ad6c9.png";

// Данные новостей (в реальном приложении это будет из API)
const newsData: Record<
  string,
  {
    title: string;
    date: string;
    location?: string;
    image?: string;
    video?: string;
    category?: string;
    content: string[];
    author?: string;
    readingTime?: number;
  }
> = {
  "tri-portreta-miopii-krasnoyarsk": {
    title: "Три портрета миопии в Красноярске",
    date: "27 июня 2025",
    location: "Красноярск",
    image: conferenceImage,
    category: "Конференция",
    author: "Администрация",
    readingTime: 5,
    content: [
      "Конференция в рамках познавательного проекта для офтальмологов и неврологов прошла с большим успехом. Мероприятие собрало ведущих специалистов в области диагностики и лечения миопии.",
      "В рамках конференции были представлены три основных подхода к пониманию и лечению миопии: клинический, диагностический и терапевтический. Каждый подход раскрывает уникальные аспекты этого распространенного заболевания.",
      "Клинический портрет миопии включает в себя детальный анализ симптоматики, факторов риска и особенностей течения заболевания у различных возрастных групп. Специалисты подчеркнули важность ранней диагностики и профилактики.",
      "Диагностический портрет охватывает современные методы исследования, включая оптическую когерентную томографию, топографию роговицы и другие передовые технологии, позволяющие точно оценить состояние глаза.",
      "Терапевтический портрет представляет комплексный подход к лечению, включая консервативные методы, хирургические вмешательства и инновационные технологии, такие как фемтосекундные лазеры.",
    ],
  },
  "tri-portreta-miopii-kaliningrad": {
    title: "Три портрета миопии в Калининграде",
    date: "20 июня 2025",
    location: "Калининград",
    image: conferenceImage,
    category: "Конференция",
    author: "Администрация",
    readingTime: 4,
    content: [
      "Познавательный проект о современных подходах к диагностике и лечению миопии продолжает свое путешествие по городам России. В Калининграде мероприятие вызвало особый интерес среди местных специалистов.",
      "Особое внимание было уделено инновационным методам лечения, включая технологию CLEAR и использование фемтосекундных лазеров нового поколения.",
    ],
  },
  "erosh-evskie-chteniya-2025": {
    title: "Ерошевские чтения 2025",
    date: "19-21 июня 2025",
    location: "Самара",
    image: conferenceImage,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Пример видео
    category: "Конференция",
    author: "Оргкомитет",
    readingTime: 8,
    content: [
      "Международная офтальмологическая конференция с участием ведущих специалистов из России и зарубежных стран прошла в Самаре. Мероприятие было посвящено памяти выдающегося офтальмолога Тихона Ивановича Ерошевского.",
      "В течение трех дней участники обсуждали актуальные вопросы современной офтальмологии, делились опытом и знакомились с новейшими технологиями в области диагностики и лечения заболеваний глаз.",
      "Особый интерес вызвали доклады о применении искусственного интеллекта в диагностике, новых методах лечения глаукомы и катаракты, а также инновационных хирургических техниках.",
      "Конференция включала практические мастер-классы, где специалисты могли на практике ознакомиться с работой современного оборудования, включая системы GALILEI G6 и FEMTO LDV Z8.",
    ],
  },
  "konferentsiya-vostok-zapad": {
    title: "Конференция ВОСТОК-ЗАПАД",
    date: "29-30 мая 2025",
    location: "Москва",
    image: conferenceImage,
    category: "Конференция",
    author: "Оргкомитет",
    readingTime: 6,
    content: [
      "Международная конференция по офтальмологии в гибридном формате объединила специалистов из разных стран мира. Мероприятие проходило как очно, так и в онлайн-формате, что позволило значительно расширить аудиторию.",
      "Основными темами конференции стали: современные подходы к лечению рефракционных нарушений, инновации в диагностике заболеваний сетчатки, новые технологии в хирургии катаракты.",
    ],
  },
  "orenburgskaya-konferentsiya": {
    title: "Оренбургская конференция офтальмологов",
    date: "23 мая 2025",
    location: "Оренбург",
    image: conferenceImage,
    category: "Конференция",
    author: "Оренбургский филиал МНТК",
    readingTime: 5,
    content: [
      "Юбилейная конференция, посвященная 35-летию Оренбургского филиала МНТК, стала знаковым событием в региональной офтальмологии. Мероприятие собрало более 200 специалистов из различных регионов России.",
      "В рамках конференции были представлены достижения филиала за 35 лет работы, обсуждены перспективы развития офтальмологической помощи в регионе.",
    ],
  },
  oftalmogerontologiya: {
    title: "Офтальмогеронтология",
    date: "15-16 мая 2025",
    location: "Москва",
    image: conferenceImage,
    category: "Конференция",
    author: "Оргкомитет",
    readingTime: 7,
    content: [
      "V Международный научно-образовательный форум - инновационные решения проблем офтальмогеронтологии прошел в Москве. Форум был посвящен особенностям диагностики и лечения глазных заболеваний у пациентов пожилого возраста.",
      "Участники обсудили современные подходы к лечению возрастной макулярной дегенерации, глаукомы, катаракты и других заболеваний, характерных для пожилых пациентов.",
    ],
  },
};

export default function NewsDetail() {
  const [match, params] = useRoute<{ id: string }>("/news/:id");
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  const newsId = match && params ? params.id : "";
  const news = newsId ? newsData[newsId] : undefined;

  useEffect(() => {
    // Анимация для hero секции
    if (heroRef.current) {
      heroRef.current.classList.add(
        "animate-in",
        "fade-in",
        "slide-in-from-bottom-4",
        "duration-700"
      );
    }

    // Анимация для контента при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate-in",
              "fade-in",
              "slide-in-from-bottom-4",
              "duration-700"
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    contentRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [newsId]);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Новость не найдена</h1>
            <Link href="/news">
              <Button>Вернуться к новостям</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero секция */}
        <div
          ref={heroRef}
          className="relative py-20 bg-gradient-to-b from-primary/5 to-background overflow-hidden"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/news">
              <Button
                variant="ghost"
                className="mb-8 hover-elevate transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к новостям
              </Button>
            </Link>

            <div className="space-y-6">
              {news.category && (
                <div className="inline-block animate-in fade-in slide-in-from-left duration-500">
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                    {news.category}
                  </div>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                {news.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{news.date}</span>
                </div>
                {news.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{news.location}</span>
                  </div>
                )}
                {news.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{news.readingTime} мин чтения</span>
                  </div>
                )}
                {news.author && (
                  <div className="text-sm">
                    Автор:{" "}
                    <span className="font-medium text-foreground">
                      {news.author}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Медиа секция (изображение или видео) */}
        {(news.image || news.video) && (
          <div
            ref={(el) => (contentRefs.current[0] = el)}
            className="py-12 bg-background"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="overflow-hidden border-0 shadow-xl">
                {news.video ? (
                  <div className="relative w-full aspect-video bg-muted">
                    <iframe
                      src={news.video}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={news.title}
                    />
                  </div>
                ) : news.image ? (
                  <div className="relative w-full aspect-video overflow-hidden bg-muted">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
              </Card>
            </div>
          </div>
        )}

        {/* Контент */}
        <div className="py-12 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              {news.content.map((paragraph, index) => (
                <div
                  key={index}
                  ref={(el) => (contentRefs.current[index + 1] = el)}
                  className="mb-6 text-lg leading-relaxed text-foreground"
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </article>
          </div>
        </div>

        {/* Дополнительные материалы */}
        <div
          ref={(el) => (contentRefs.current[contentRefs.current.length] = el)}
          className="py-12 bg-muted/30"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Интересно узнать больше?</h2>
                <p className="text-muted-foreground">
                  Изучите наше оборудование и технологии для современной
                  офтальмологии
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/products">
                    <Button size="lg" className="hover-elevate transition-all">
                      Наше оборудование
                    </Button>
                  </Link>
                  <Link href="/news">
                    <Button
                      size="lg"
                      variant="outline"
                      className="hover-elevate transition-all"
                    >
                      Все новости
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
