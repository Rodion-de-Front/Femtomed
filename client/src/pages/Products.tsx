import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import femtoImage from "@assets/generated_images/FEMTO_LDV_laser_system_ef76a057.png";
import galileiImage from "@assets/generated_images/GALILEI_diagnostic_device_2aba34c6.png";
import eyeVizImage from "@assets/generated_images/Eye_diagnostic_visualization_f0bad5c6.png";

export default function Products() {
  const products = [
    {
      title: "FEMTO LDV Z8",
      description:
        "Фемтосекундный лазер нового поколения с технологией низкой энергии для рефракционной хирургии и катаракты",
      image: femtoImage,
      features: [
        "Концепция низкой энергии",
        "Интраоперационный ОКТ",
        "Программируемые разрезы",
        "Поддержка CLEAR технологии",
      ],
    },
    {
      title: "GALILEI G6",
      description:
        "Передовая диагностическая платформа для полного анализа роговицы и переднего сегмента глаза",
      image: galileiImage,
      features: [
        "Двойная система Scheimpflug",
        "Топография роговицы",
        "Пахиметрия",
        "Анализ переднего сегмента",
      ],
    },
    {
      title: "AQUARIUZ",
      description:
        "Инновационная система для точной и эффективной рефракционной хирургии",
      image: eyeVizImage,
      features: [
        "Бесшумная работа",
        "Высокая точность",
        "Эргономичный дизайн",
        "Быстрая процедура",
      ],
    },
    {
      title: "FLOWSUITE",
      description:
        "Программное обеспечение для планирования и управления офтальмологическими процедурами",
      image: eyeVizImage,
      features: [
        "Интуитивный интерфейс",
        "Интеграция с оборудованием",
        "Планирование процедур",
        "Анализ данных",
      ],
    },
    {
      title: "FERRARA RING",
      description:
        "Интракорнеальные кольцевые сегменты для коррекции кератоконуса",
      image: eyeVizImage,
      features: [
        "Биосовместимый материал",
        "Различные размеры",
        "Обратимая процедура",
        "Стабильные результаты",
      ],
    },
    {
      title: "X-LINK",
      description:
        "Система для корнеального кросслинкинга при лечении кератоконуса",
      image: eyeVizImage,
      features: [
        "Укрепление роговицы",
        "Остановка прогрессирования",
        "Безопасная процедура",
        "Доказанная эффективность",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold">
              Наше{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                оборудование
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Передовое офтальмологическое оборудование для диагностики и
              лечения
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <ProductCard key={idx} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
