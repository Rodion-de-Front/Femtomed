import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import galileiImage from "@assets/generated_images/GALILEI_diagnostic_device_2aba34c6.png";
import eyeVizImage from "@assets/generated_images/Eye_diagnostic_visualization_f0bad5c6.png";

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function Keratikonus() {
  const products = [
    {
      title: "GALILEI G6",
      description:
        "Диагностическая платформа для раннего выявления и мониторинга прогрессирования кератоконуса",
      image: "/images/products/GALILEI.png",
      brochure: "/pdf/GALILEI.pdf",
      features: [
        "Топография роговицы",
        "Ранняя диагностика",
        "Мониторинг прогрессирования",
        "Точные измерения",
      ],
    },
    {
      title: "FERRARA RING",
      description:
        "Интракорнеальные кольцевые сегменты для стабилизации и коррекции кератоконуса",
      image: eyeVizImage,
      brochure: "/pdf/FERRARA_RING.pdf",
      features: [
        "Стабилизация роговицы",
        "Улучшение зрения",
        "Обратимая процедура",
        "Биосовместимый материал",
      ],
    },
    {
      title: "X-LINK",
      description:
        "Система для корнеального кросслинкинга - укрепления роговицы при кератоконусе",
      image: eyeVizImage,
      brochure: "/pdf/X-LINK.pdf",
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
              Лечение{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                кератоконуса
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Современное оборудование для диагностики и лечения кератоконуса
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, idx) => (
                <ProductCard
                  key={idx}
                  {...product}
                  slug={createSlug(product.title)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
