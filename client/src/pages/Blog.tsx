import { useState, useMemo } from "react";
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
      id: "tri-portreta-miopii-krasnoyarsk",
      title: "Три портрета миопии в Красноярске",
      date: "27 июня 2025",
      location: "Красноярск",
      image: conferenceImage,
      excerpt:
        "Конференция в рамках познавательного проекта для офтальмологов и неврологов",
      category: "Новости",
    },
    {
      id: "tri-portreta-miopii-kaliningrad",
      title: "Три портрета миопии в Калининграде",
      date: "20 июня 2025",
      location: "Калининград",
      image: conferenceImage,
      excerpt:
        "Познавательный проект о современных подходах к диагностике и лечению миопии",
      category: "Обзоры",
    },
    {
      id: "erosh-evskie-chteniya-2025",
      title: "Ерошевские чтения 2025",
      date: "19-21 июня 2025",
      location: "Самара",
      image: conferenceImage,
      excerpt:
        "Международная офтальмологическая конференция с участием ведущих специалистов",
      category: "Видео",
    },
    {
      id: "konferentsiya-vostok-zapad",
      title: "Конференция ВОСТОК-ЗАПАД",
      date: "29-30 мая 2025",
      location: "Москва",
      image: conferenceImage,
      excerpt: "Международная конференция по офтальмологии в гибридном формате",
      category: "Статьи",
    },
    {
      id: "orenburgskaya-konferentsiya",
      title: "Оренбургская конференция офтальмологов",
      date: "23 мая 2025",
      location: "Оренбург",
      image: conferenceImage,
      excerpt:
        "Юбилейная конференция, посвященная 35-летию Оренбургского филиала МНТК",
      category: "Новости",
    },
    {
      id: "oftalmogerontologiya",
      title: "Офтальмогеронтология",
      date: "15-16 мая 2025",
      location: "Москва",
      image: conferenceImage,
      excerpt:
        "V Международный научно-образовательный форум - инновационные решения проблем",
      category: "Обзоры",
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
              <div className="flex-1 w-full sm:w-auto">
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

              <div className="flex flex-wrap items-center gap-2">
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
