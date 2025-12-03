import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FLOWSUITESection from "@/components/FLOWSUITESection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, FileText, Video, Download } from "lucide-react";

export default function FLOWSUITE() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="pt-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Технология{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                FLOW SUITE
              </span>
            </h2>
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground">
                Комплексная система управления клиникой
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Универсальная платформа для автоматизации рабочих процессов и
                управления данными в офтальмологии
              </p>
            </div>
          </div>
        </div>

        <FLOWSUITESection />

        <section className="py-24" data-testid="section-resources">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Дополнительные материалы
              </h2>
              <p className="text-muted-foreground">
                Видео, документация и ресурсы о технологии FLOW SUITE
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
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
                    Посмотреть видеоматериалы о системе FLOW SUITE
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => window.open("#", "_blank")}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Смотреть
                  </Button>
                </div>
              </Card>

              <Card
                className="p-6 hover-elevate transition-all cursor-pointer"
                data-testid="card-brochure"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Брошюра</h3>
                  <p className="text-sm text-muted-foreground">
                    Подробная информация о системе FLOW SUITE в формате PDF
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      window.open("/pdf/FLOWSUITE.pdf", "_blank");
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Открыть брошюру
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
