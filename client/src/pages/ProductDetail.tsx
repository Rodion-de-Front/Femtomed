import { useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Check,
  FileText,
  Video,
  Phone,
  Mail,
  Download,
} from "lucide-react";
import femtoImage from "@assets/generated_images/FEMTO_LDV_laser_system_ef76a057.png";
import galileiImage from "@assets/generated_images/GALILEI_diagnostic_device_2aba34c6.png";
import eyeVizImage from "@assets/generated_images/Eye_diagnostic_visualization_f0bad5c6.png";

// Данные о продуктах (в реальном приложении это будет из API)
const productData: Record<
  string,
  {
    title: string;
    category: string;
    image: string;
    brochure: string;
    description: string;
    features: string[];
    specifications?: {
      label: string;
      value: string;
    }[];
    applications: string[];
    content: string[];
  }
> = {
  "femto-ldv-z8": {
    title: "FEMTO LDV Z8",
    category: "Фемтосекундный лазер",
    image: "/images/products/FEMTO.png",
    brochure: "/pdf/FEMTO.pdf",
    description:
      "Фемтосекундный лазер нового поколения с технологией низкой энергии для рефракционной хирургии и катаракты",
    features: [
      "Концепция низкой энергии",
      "Интраоперационный ОКТ",
      "Программируемые разрезы",
      "Поддержка CLEAR SUPRA технологии",
      "Высокая точность позиционирования",
      "Быстрая процедура",
      "Минимальная инвазивность",
    ],
    specifications: [
      { label: "Длина волны", value: "1043 нм" },
      { label: "Частота повторения", value: "До 1 МГц" },
      { label: "Энергия импульса", value: "Низкая энергия" },
      { label: "Точность", value: "±5 мкм" },
      { label: "Время процедуры", value: "2-5 минут" },
    ],
    applications: [
      "LASIK",
      "SMILE",
      "CLEAR SUPRA",
      "Катаракта",
      "Кератопластика",
      "Интракорнеальные кольца",
    ],
    content: [
      "FEMTO LDV Z8 представляет собой передовую систему фемтосекундного лазера, разработанную специально для офтальмологических процедур. Система использует инновационную концепцию низкой энергии, что обеспечивает максимальную безопасность и комфорт для пациента.",
      "Одной из ключевых особенностей системы является встроенный интраоперационный ОКТ (оптическая когерентная томография), который позволяет хирургу видеть структуру роговицы в реальном времени во время процедуры. Это значительно повышает точность и безопасность операций.",
      "Система поддерживает широкий спектр процедур, включая LASIK, SMILE, CLEAR SUPRA, операции по удалению катаракты и кератопластику. Программируемые разрезы позволяют хирургу создавать индивидуальные параметры для каждого пациента.",
      "Технология низкой энергии обеспечивает минимальное воздействие на окружающие ткани, что способствует более быстрому заживлению и снижению риска осложнений. Система также отличается высокой скоростью работы, что сокращает время процедуры и повышает комфорт пациента.",
    ],
  },
  "galilei-g6": {
    title: "GALILEI G6",
    category: "Диагностическое оборудование",
    image: "/images/products/GALILEI.png",
    brochure: "/pdf/GALILEI.pdf",
    description:
      "Передовая диагностическая платформа для полного анализа роговицы и переднего сегмента глаза",
    features: [
      "Двойная система Scheimpflug",
      "Топография роговицы",
      "Пахиметрия",
      "Анализ переднего сегмента",
      "3D визуализация",
      "Автоматическое сканирование",
      "Высокая точность измерений",
    ],
    specifications: [
      { label: "Тип сканирования", value: "Scheimpflug камеры" },
      { label: "Разрешение", value: "Высокое разрешение" },
      { label: "Время сканирования", value: "Менее 2 секунд" },
      { label: "Диапазон измерений", value: "360°" },
      { label: "Точность пахиметрии", value: "±2 мкм" },
    ],
    applications: [
      "Диагностика кератоконуса",
      "Планирование рефракционной хирургии",
      "Мониторинг после операции",
      "Подбор контактных линз",
      "Анализ переднего сегмента",
      "ИКЛ планирование",
    ],
    content: [
      "GALILEI G6 - это новейшая версия диагностической платформы, которая объединяет в себе двойную систему Scheimpflug камер для получения трехмерных изображений роговицы и переднего сегмента глаза. Система обеспечивает комплексный анализ всех параметров, необходимых для точной диагностики и планирования лечения.",
      "Двойная система Scheimpflug позволяет получать изображения под разными углами, что обеспечивает высокую точность измерений и исключает артефакты. Система автоматически сканирует глаз и создает детальную трехмерную модель роговицы.",
      "GALILEI G6 предоставляет полный спектр диагностических возможностей: топографию роговицы, пахиметрию (измерение толщины), анализ переднего сегмента, оценку кривизны и астигматизма. Все данные обрабатываются в режиме реального времени и отображаются в интуитивно понятном интерфейсе.",
      "Система особенно эффективна для диагностики кератоконуса на ранних стадиях, планирования рефракционной хирургии и мониторинга результатов лечения. Высокая точность измерений делает GALILEI G6 незаменимым инструментом в современной офтальмологии.",
    ],
  },
  aquariuz: {
    title: "AQUARIUZ",
    category: "Рефракционная хирургия",
    image: "/images/products/AQUARIUZ.png",
    brochure: "/pdf/AQUARIUZ.pdf",
    description:
      "Инновационная система для точной и эффективной рефракционной хирургии",
    features: [
      "Бесшумная работа",
      "Высокая точность",
      "Эргономичный дизайн",
      "Быстрая процедура",
      "Минимальная инвазивность",
      "Быстрое восстановление",
      "Стабильные результаты",
    ],
    specifications: [
      { label: "Тип системы", value: "Рефракционная хирургия" },
      { label: "Точность", value: "Высокая" },
      { label: "Время процедуры", value: "5-10 минут" },
      { label: "Восстановление", value: "Быстрое" },
      { label: "Результаты", value: "Стабильные" },
    ],
    applications: [
      "Коррекция близорукости",
      "Коррекция дальнозоркости",
      "Коррекция астигматизма",
      "Комбинированные коррекции",
    ],
    content: [
      "AQUARIUZ представляет собой инновационную систему для рефракционной хирургии, которая сочетает в себе передовые технологии и эргономичный дизайн. Система разработана для обеспечения максимальной точности и комфорта как для хирурга, так и для пациента.",
      "Одной из отличительных особенностей AQUARIUZ является бесшумная работа, что создает более комфортную атмосферу во время процедуры. Система обеспечивает высокую точность коррекции зрения при минимальной инвазивности вмешательства.",
      "AQUARIUZ поддерживает широкий спектр рефракционных коррекций, включая близорукость, дальнозоркость и астигматизм. Система позволяет выполнять комбинированные коррекции для достижения оптимальных результатов.",
      "Быстрое время процедуры и минимальная инвазивность способствуют быстрому восстановлению зрения и снижению риска осложнений. Стабильные долгосрочные результаты делают AQUARIUZ надежным выбором для рефракционной хирургии.",
    ],
  },
  flowsuite: {
    title: "FLOWSUITE",
    category: "Программное обеспечение",
    image: eyeVizImage,
    brochure: "/pdf/FLOWSUITE.pdf",
    description:
      "Программное обеспечение для планирования и управления офтальмологическими процедурами",
    features: [
      "Интуитивный интерфейс",
      "Интеграция с оборудованием",
      "Планирование процедур",
      "Анализ данных",
      "Централизованное управление",
      "Безопасное хранение",
      "Расширенная отчетность",
    ],
    specifications: [
      { label: "Тип", value: "Программное обеспечение" },
      { label: "Интеграция", value: "Множество устройств" },
      { label: "Безопасность", value: "Высокая" },
      { label: "Масштабируемость", value: "Неограниченная" },
      { label: "Доступность", value: "24/7" },
    ],
    applications: [
      "Планирование процедур",
      "Управление данными пациентов",
      "Интеграция оборудования",
      "Аналитика и отчетность",
      "Управление клиникой",
    ],
    content: [
      "FLOWSUITE - это комплексная платформа для управления всеми аспектами работы офтальмологической клиники. Система объединяет планирование процедур, управление данными пациентов, интеграцию с диагностическим и хирургическим оборудованием в единую экосистему.",
      "Интуитивный интерфейс FLOWSUITE позволяет медицинскому персоналу быстро освоить систему и эффективно работать с ней. Платформа автоматизирует рутинные операции, освобождая время для более важных задач.",
      "Система обеспечивает централизованное управление данными, что позволяет легко получать доступ к информации о пациентах, истории лечения и результатах процедур. Интеграция с различными устройствами обеспечивает автоматический сбор и обработку данных.",
      "FLOWSUITE предоставляет расширенные возможности аналитики и отчетности, что помогает клинике оптимизировать рабочие процессы, улучшить качество обслуживания и принимать обоснованные решения на основе данных.",
    ],
  },
  "ferrara-ring": {
    title: "FERRARA RING",
    category: "Интракорнеальные сегменты",
    image: eyeVizImage,
    brochure: "/pdf/FERRARA_RING.pdf",
    description:
      "Интракорнеальные кольцевые сегменты для коррекции кератоконуса",
    features: [
      "Биосовместимый материал",
      "Различные размеры",
      "Обратимая процедура",
      "Стабильные результаты",
      "Минимальная инвазивность",
      "Быстрое восстановление",
      "Доказанная эффективность",
    ],
    specifications: [
      { label: "Материал", value: "PMMA (полиметилметакрилат)" },
      { label: "Размеры", value: "Различные варианты" },
      { label: "Толщина", value: "150-350 мкм" },
      { label: "Дуга", value: "90-210°" },
      { label: "Биосовместимость", value: "Высокая" },
    ],
    applications: [
      "Коррекция кератоконуса",
      "Коррекция миопии",
      "Коррекция астигматизма",
      "Стабилизация роговицы",
    ],
    content: [
      "FERRARA RING - это интракорнеальные кольцевые сегменты, разработанные специально для коррекции кератоконуса и других нарушений формы роговицы. Сегменты изготовлены из биосовместимого материала PMMA, который безопасно взаимодействует с тканями глаза.",
      "Процедура установки FERRARA RING является минимально инвазивной и обратимой. Сегменты имплантируются в периферическую часть роговицы, изменяя её форму и улучшая оптические свойства. Это позволяет значительно улучшить зрение у пациентов с кератоконусом.",
      "Система FERRARA RING предлагает широкий выбор размеров и конфигураций, что позволяет хирургу подобрать оптимальный вариант для каждого пациента. Индивидуальный подход обеспечивает максимальную эффективность лечения.",
      "Клинические исследования показали высокую эффективность FERRARA RING в стабилизации прогрессирования кератоконуса и улучшении зрения. Обратимость процедуры позволяет при необходимости удалить сегменты, что делает этот метод лечения безопасным и гибким.",
    ],
  },
  "x-link": {
    title: "X-LINK",
    category: "Кросслинкинг",
    image: eyeVizImage,
    brochure: "/pdf/X-LINK.pdf",
    description:
      "Система для корнеального кросслинкинга при лечении кератоконуса",
    features: [
      "Укрепление роговицы",
      "Остановка прогрессирования",
      "Безопасная процедура",
      "Доказанная эффективность",
      "Минимальная инвазивность",
      "Стабильные результаты",
      "Быстрое восстановление",
    ],
    specifications: [
      { label: "Тип", value: "Кросслинкинг роговицы" },
      { label: "Длина волны УФ", value: "370 нм" },
      { label: "Время облучения", value: "30 минут" },
      { label: "Энергия", value: "3 мВт/см²" },
      { label: "Эффективность", value: "Высокая" },
    ],
    applications: [
      "Лечение кератоконуса",
      "Стабилизация роговицы",
      "Профилактика прогрессирования",
      "Комбинированное лечение",
    ],
    content: [
      "X-LINK - это система для корнеального кросслинкинга, которая является золотым стандартом лечения прогрессирующего кератоконуса. Процедура заключается в укреплении роговицы путем создания дополнительных связей между коллагеновыми волокнами под воздействием ультрафиолетового излучения и рибофлавина.",
      "Процедура X-LINK доказала свою эффективность в остановке прогрессирования кератоконуса и стабилизации состояния роговицы. Клинические исследования показывают, что в большинстве случаев процедура останавливает прогрессирование заболевания и даже может привести к некоторому улучшению зрения.",
      "Система X-LINK обеспечивает безопасное и контролируемое проведение процедуры кросслинкинга. Точная дозировка ультрафиолетового излучения и равномерное распределение рибофлавина гарантируют оптимальные результаты при минимальном риске осложнений.",
      "X-LINK может использоваться как самостоятельный метод лечения, так и в комбинации с другими процедурами, такими как установка интракорнеальных сегментов. Комбинированный подход позволяет достичь максимальной эффективности в лечении кератоконуса.",
    ],
  },
};

// Функция для создания slug из названия
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function ProductDetail() {
  const [match, params] = useRoute<{ slug: string }>("/products/:slug");
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  const productSlug = match && params ? params.slug : "";
  const product = productSlug ? productData[productSlug] : undefined;

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
  }, [productSlug]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Оборудование не найдено</h1>
            <Link href="/products">
              <Button>Вернуться к оборудованию</Button>
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
            <Button
              variant="ghost"
              className="mb-8 hover-elevate transition-all"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>

            <div className="space-y-6">
              {product.category && (
                <div className="inline-block animate-in fade-in slide-in-from-left duration-500">
                  <Badge className="px-4 py-2 text-sm font-semibold">
                    {product.category}
                  </Badge>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                {product.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Изображение продукта */}
        <div
          ref={(el) => (contentRefs.current[0] = el)}
          className="py-12 bg-background"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Основные характеристики */}
        <div
          ref={(el) => (contentRefs.current[1] = el)}
          className="py-12 bg-muted/30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Особенности */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Основные особенности
                </h2>
                <div className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg hover-elevate transition-all"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Технические характеристики */}
              {product.specifications && (
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Технические характеристики
                  </h2>
                  <div className="space-y-4">
                    {product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                      >
                        <span className="text-sm font-medium text-muted-foreground">
                          {spec.label}
                        </span>
                        <span className="text-sm font-semibold">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Применение */}
        {product.applications && (
          <div
            ref={(el) => (contentRefs.current[2] = el)}
            className="py-12 bg-background"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Области применения
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.applications.map((application, idx) => (
                  <Card
                    key={idx}
                    className="p-6 text-center hover-elevate transition-all"
                  >
                    <div className="text-lg font-semibold">{application}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Подробное описание */}
        <div className="py-12 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Подробное описание</h2>
            <article className="prose prose-lg max-w-none">
              {product.content.map((paragraph, index) => (
                <div
                  key={index}
                  ref={(el) => (contentRefs.current[index + 3] = el)}
                  className="mb-6 text-lg leading-relaxed text-foreground"
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </article>
          </div>
        </div>

        {/* Контакты */}
        <div
          ref={(el) => (contentRefs.current[contentRefs.current.length] = el)}
          className="py-12 bg-muted/30"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold">
                  Заинтересованы в этом оборудовании?
                </h2>
                <p className="text-muted-foreground">
                  Свяжитесь с нами для получения дополнительной информации,
                  консультации или демонстрации оборудования
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/contacts">
                    <Button size="lg" className="hover-elevate transition-all">
                      <Phone className="w-4 h-4 mr-2" />
                      Связаться с нами
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover-elevate transition-all"
                    onClick={() => {
                      if (product.brochure) {
                        window.open(product.brochure, "_blank");
                      }
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Скачать брошюру
                  </Button>
                  <Link href="/products">
                    <Button
                      size="lg"
                      variant="outline"
                      className="hover-elevate transition-all"
                    >
                      Все оборудование
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

// Экспортируем функцию для создания slug
export { createSlug };
