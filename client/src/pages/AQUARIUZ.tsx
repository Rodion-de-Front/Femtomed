import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AQUARIUZSection from "@/components/AQUARIUZSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, FileText, Video } from "lucide-react";

export default function AQUARIUZ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="pt-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Технология{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                AQUARIUZ
              </span>
            </h2>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground">
                Передовая диагностическая платформа для офтальмологии
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Инновационная система визуализации и анализа с использованием
                искусственного интеллекта
              </p>
            </div>
          </div>
        </div>

        <AQUARIUZSection />

        <section className="py-24" data-testid="section-resources">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Дополнительные материалы
              </h2>
              <p className="text-muted-foreground">
                Видео, документация и ресурсы о технологии AQUARIUZ
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card
                className="p-6 hover-elevate transition-all cursor-pointer"
                data-testid="card-video"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Видеозаписи</h3>
                  <p className="text-sm text-muted-foreground">
                    Посмотреть видеоматериалы о системе AQUARIUZ
                  </p>
                  <Button variant="ghost" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Смотреть
                  </Button>
                </div>
              </Card>

              <Card
                className="p-6 hover-elevate transition-all cursor-pointer"
                data-testid="card-docs"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Документация</h3>
                  <p className="text-sm text-muted-foreground">
                    Техническая документация и руководства
                  </p>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Читать
                  </Button>
                </div>
              </Card>

              <Card
                className="p-6 hover-elevate transition-all cursor-pointer"
                data-testid="card-locations"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-semibold">
                    Где используется AQUARIUZ
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Список клиник, использующих технологию
                  </p>
                  <Button variant="ghost" className="w-full justify-start">
                    Найти клинику
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
