import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export default function CLEARSection() {
  const benefits = [
    "Возможность изменения позиции лентикулы после докинга",
    "Надежный вакуум, известный в системах Ziemer",
    "Направляющие тоннели для более легкого отделения лентикулы",
    "Свободно программируемые разрезы",
    "Использование интраоперационного ОКТ (по желанию)",
    "Уникальная траектория сканирования",
    "Концепция низкой энергии FEMTO LDV",
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-background to-muted/30"
      data-testid="section-clear"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="p-8 space-y-6">
            <h3 className="text-2xl font-bold">Преимущества технологии</h3>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-all duration-500 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-left"
                  data-testid={`item-benefit-${idx}`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-125 group-hover:bg-primary/20 transition-all duration-300">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  Интегрированная платформа
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  CLEAR-SUPRA является интегрированной частью платформы FEMTO
                  LDV Z8 и может быть приобретена путем обновления программного
                  обеспечения
                </p>
                <div className="pt-4">
                  <Button
                    className="group"
                    data-testid="button-clear-details"
                    onClick={() =>
                      window.open(
                        "https://disk.yandex.ru/i/4cxsnqgVGyzYpA",
                        "_blank"
                      )
                    }
                  >
                    Подробнее о CLEAR-SUPRA
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">
                  Направляющих разреза для начинающих
                </div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <div className="text-sm text-muted-foreground">
                  Направляющий разрез для опытных
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
