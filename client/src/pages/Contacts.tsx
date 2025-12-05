import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  GraduationCap,
  CreditCard,
  RefreshCw,
  Eye,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export default function Contacts() {
  const { toast } = useToast();
  const [location] = useLocation();
  const formRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const scrollToForm = () => {
      const hash = window.location.hash;
      if (hash === "#form") {
        // Используем несколько попыток с увеличивающейся задержкой
        const attempts = [100, 300, 500, 800];

        attempts.forEach((delay, index) => {
          setTimeout(() => {
            const formElement =
              formRef.current || document.getElementById("form");
            if (formElement) {
              const headerOffset = 100;
              const elementPosition = formElement.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: index === 0 ? "auto" : "smooth",
              });
            }
          }, delay);
        });
      }
    };

    // Небольшая задержка для того, чтобы компонент успел отрендериться
    const timeoutId = setTimeout(scrollToForm, 50);

    // Также слушаем изменения hash
    window.addEventListener("hashchange", scrollToForm);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("hashchange", scrollToForm);
    };
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/contact", formData);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Спасибо за обращение!",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({
          title: "Ошибка отправки",
          description:
            result.message || "Произошла ошибка при отправке сообщения",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      toast({
        title: "Ошибка отправки",
        description:
          "Произошла ошибка при отправке сообщения. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold">Клиентам</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Все необходимое для работы с нашим оборудованием: обучение,
              финансирование и поддержка
            </p>
          </div>
        </div>

        {/* Обучение и Сертификаты */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Обучение и сертификация
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 hover-elevate transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Обучение специалистов
                    </h3>
                    <p className="text-muted-foreground">
                      Комплексная программа обучения для ваших врачей
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Теоретические курсы по работе с оборудованием
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Практические мастер-классы на реальном оборудовании
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Сертификация специалистов
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Постоянная поддержка и консультации
                    </span>
                  </li>
                </ul>
                <Button className="w-full">
                  Записаться на обучение
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              <Link href="/vision-test">
                <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 hover-elevate transition-all cursor-pointer">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        Тест на зрение
                      </h3>
                      <p className="text-muted-foreground">
                        Пройдите онлайн-тесты для проверки зрения
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Таблица Сивцева для проверки остроты зрения
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Тест Амслера для диагностики макулярной дегенерации
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Тест на астигматизм и другие проверки
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Комплексное тестирование зрения онлайн
                      </span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Пройти тесты
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Лизинг */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">
                    Лизинговые программы
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Приобретайте современное офтальмологическое оборудование с
                    гибкими условиями финансирования от нашего партнера{" "}
                    <a
                      href="https://pt-med.ru/clients/lizing/?ysclid=miq25j792j845172461"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      Physiotechnica
                    </a>
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Частные клиники */}
                <Card className="p-6 bg-background/50 border-primary/20">
                  <h4 className="text-xl font-semibold mb-4">
                    Для частных клиник
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">Аванс от 10%</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">
                          Срок лизинга от 1 года до 7 лет
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Возможность досрочного погашения
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">
                          Финансирование стартапа без лицензии
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">
                          Работаем по всей РФ
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Крым в том числе + пробные сделки по новым регионам
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">
                          Срок рассмотрения сделки от 1 дня
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card>

                {/* Гос. клиники */}
                <Card className="p-6 bg-background/50 border-primary/20">
                  <h4 className="text-xl font-semibold mb-4">
                    Для государственных клиник
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">Аванс от 0%</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">
                          Индивидуальный график платежей
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Гибкие условия под ваши потребности
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="text-xl font-semibold">
                  Дополнительные преимущества:
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Налоговые льготы</div>
                      <div className="text-sm text-muted-foreground">
                        Возможность списания расходов
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">Быстрое оформление</div>
                      <div className="text-sm text-muted-foreground">
                        Решение в течение 1 дня
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    window.open(
                      "https://pt-med.ru/clients/lizing/?ysclid=miq25j792j845172461",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Оставить заявку на лизинг
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    const formElement =
                      formRef.current || document.getElementById("form");
                    if (formElement) {
                      const headerOffset = 100;
                      const elementPosition =
                        formElement.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  Связаться с нами
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Трейд-ин */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">
                    Программа TRADE-IN
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Обменяйте старое оборудование на новое с выгодой для вашей
                    клиники
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">
                    Что вы получаете:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">
                          Новое современное оборудование
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Фемтосекундный лазер FEMTO LDV Z-серии последнего
                          поколения
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">
                          Гарантийное обслуживание
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Полная гарантия и техническая поддержка
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Обучение специалистов</div>
                        <div className="text-sm text-muted-foreground">
                          Бесплатное обучение ваших врачей работе с новым
                          оборудованием
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Расходные материалы</div>
                        <div className="text-sm text-muted-foreground">
                          Бесперебойные поставки всех необходимых материалов
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-background/50 rounded-lg border border-primary/20">
                  <p className="font-semibold text-lg mb-2">
                    Условия программы индивидуальны
                  </p>
                  <p className="text-muted-foreground">
                    Свяжитесь с нами для расчета выгодных условий обмена вашего
                    оборудования
                  </p>
                </div>
              </div>

              <Button size="lg" className="w-full sm:w-auto">
                Узнать условия обмена
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </section>

        {/* Форма обратной связи */}
        <section id="form" ref={formRef} className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Отправьте нам сообщение
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      data-testid="input-message"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-submit"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Отправка..." : "Отправить"}
                  </Button>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-background border-primary/20">
                  <h3 className="text-xl font-bold mb-4">Контакты</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Телефон
                        </div>
                        <a
                          href="tel:+79153526688"
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          +7 (499) 653-77-67
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Email
                        </div>
                        <a
                          href="mailto:office@femtomed.ru"
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          office@femtomed.ru
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Адрес
                        </div>
                        <div className="font-semibold">
                          {" "}
                          г. Москва, ул. Вавилова, д. 69/75, Россия
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
