import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export default function FLOWSUITESection() {
  const doctorBenefits = [
    "Комплексное управление рабочими процессами",
    "Автоматизация рутинных операций",
    "Централизованное управление данными",
    "Интеграция с различными устройствами",
    "Расширенная отчетность и аналитика",
    "Безопасное хранение информации",
    "Масштабируемая архитектура",
  ];

  const patientBenefits = [
    "Быстрая обработка данных пациента",
    "Точное ведение медицинской документации",
    "Удобная запись на прием",
    "Безопасное хранение медицинских данных",
    "Эффективное планирование лечения",
    "Интеграция всех данных в одном месте",
    "Повышение качества обслуживания",
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-background to-muted/30"
      data-testid="section-flow-suite"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="p-8 space-y-6">
            <h3 className="text-2xl font-bold">Преимущества для врачей</h3>
            <div className="space-y-3">
              {doctorBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-all duration-500 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-left"
                  data-testid={`item-benefit-doctor-${idx}`}
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

          <Card className="p-8 space-y-6">
            <h3 className="text-2xl font-bold">Преимущества для пациентов</h3>
            <div className="space-y-3">
              {patientBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-all duration-500 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-left"
                  data-testid={`item-benefit-patient-${idx}`}
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
        </div>

        <div className="mt-12 flex justify-center">
          <div className="space-y-6 max-w-2xl w-full">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-center">
                  Универсальная система управления
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  FLOW SUITE - это комплексная платформа для управления всеми
                  аспектами работы офтальмологической клиники, от планирования
                  до отчетности
                </p>
                <div className="pt-4 flex justify-center">
                  <Button
                    className="group"
                    data-testid="button-flow-suite-details"
                    onClick={() => window.open("#", "_blank")}
                  >
                    Подробнее о FLOW SUITE
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Круглосуточная доступность
                </div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">
                  Надежность системы
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
