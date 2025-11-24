import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronsDown, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "wouter";

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative h-[90vh] flex items-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0 transition-transform duration-75"
        style={{ willChange: "transform" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-9xl sm:text-[12rem] lg:text-[16rem] font-bold bg-gradient-to-r from-primary/50 via-primary/40 to-primary/40 bg-clip-text text-transparent select-none translate-x-12">
            ZIEMER
          </h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-4">
            <div
              className="inline-block animate-in fade-in slide-in-from-left duration-700"
              style={{ animationDelay: "300ms" }}
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold backdrop-blur-sm border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
                Новинка: Технология CLEAR
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span
                className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent inline-block animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "400ms" }}
              >
                Инновации в
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent inline-block animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "500ms" }}
              >
                офтальмологии
              </span>
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "600ms" }}
            >
              Эксклюзивный дистрибьютор Ziemer, предоставляющий современное
              лазерное и диагностическое оборудование для точной коррекции
              зрения
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "700ms" }}
          >
            <Link href="/about">
              <Button
                size="lg"
                className="group hover:scale-105 transition-all duration-300"
                data-testid="button-learn-more"
              >
                Узнать больше
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm hover:scale-105 transition-all duration-300"
                data-testid="button-watch-video"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Смотреть видео
              </Button>
            </Link>
          </div>

          <div
            className="flex flex-wrap gap-8 pt-8 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: "800ms" }}
          >
            <div className="space-y-1 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">
                Клиник по всему миру
              </div>
            </div>
            <div className="space-y-1 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Лет опыта</div>
            </div>
            <div className="space-y-1 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="text-3xl font-bold text-primary">100K+</div>
              <div className="text-sm text-muted-foreground">
                Успешных операций
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-10 h-10 rounded-full border-2 border-primary/50 flex items-center justify-center p-2">
          <ChevronsDown color={"rgb(207, 23, 23)"} />
        </div>
      </div>
    </section>
  );
}
