import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisionTestCard from "@/components/VisionTestCard";
import SivtsevTest from "@/components/SivtsevTest";
import AmslerTest from "@/components/AmslerTest";
import AstigmatismTest from "@/components/AstigmatismTest";
import ContrastTest from "@/components/ContrastTest";
import DuochromeTest from "@/components/DuochromeTest";
import ColorblindTest from "@/components/ColorblindTest";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award } from "lucide-react";

export default function VisionTest() {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testProgress, setTestProgress] = useState(0);

  const tests = [
    {
      id: "sivtsev",
      title: "Таблица Сивцева",
      description:
        "Проверьте остроту зрения с помощью классической таблицы с буквами кириллицы",
      icon: "eye" as const,
    },
    {
      id: "amsler",
      title: "Тест Амслера",
      description: "Диагностика макулярной дегенерации с помощью сетки линий",
      icon: "grid" as const,
    },
    {
      id: "astigmatism",
      title: "Тест на астигматизм",
      description: "Оценка астигматизма с помощью лучевой диаграммы",
      icon: "target" as const,
    },
    {
      id: "contrast",
      title: "Контрастная чувствительность",
      description:
        "Определение способности различать объекты при низком контрасте",
      icon: "contrast" as const,
    },
    {
      id: "duochrome",
      title: "Дуохромный тест",
      description: "Оценка рефракционного баланса для каждого глаза",
      icon: "scan_eye" as const,
    },
    {
      id: "colorblind",
      title: "Тест на дальтонизм",
      description: "Проверка цветовосприятия по методу Ишихары",
      icon: "palette" as const,
    },
  ];

  const handleStartTest = (testId: string) => {
    setActiveTest(testId);
    setTestProgress(0);
    console.log(`Starting test: ${testId}`);
  };

  const handleCompleteTest = () => {
    setTestProgress(100);
    setTimeout(() => {
      setActiveTest(null);
      setTestProgress(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {!activeTest ? (
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold">
                  Проверьте свое{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    зрение
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Пройдите комплексное тестирование зрения онлайн. Результаты
                  носят информационный характер и не заменяют консультацию
                  специалиста
                </p>
              </div>

              <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-background border-primary/20">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Важная информация</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Сядьте на расстоянии 50-70 см от экрана
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Обеспечьте хорошее освещение помещения
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Проходите тесты поочередно каждым глазом
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      При выявлении отклонений обратитесь к офтальмологу
                    </li>
                  </ul>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map((test) => (
                  <div key={test.id} onClick={() => handleStartTest(test.id)}>
                    <VisionTestCard {...test} testId={test.id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
            <Card className="max-w-4xl w-full p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setActiveTest(null);
                      setTestProgress(0);
                    }}
                    data-testid="button-back-to-tests"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад к тестам
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Прогресс: {Math.round(testProgress)}%
                  </div>
                </div>

                <Progress value={testProgress} className="h-2" />

                <div className="py-8">
                  {activeTest === "sivtsev" ? (
                    <SivtsevTest
                      onComplete={(result) => {
                        console.log("Test result:", result);
                        setTestProgress(100);
                        // Сбрасываем прогресс через 3 секунды после показа результата
                        setTimeout(() => {
                          setTestProgress(0);
                        }, 3000);
                      }}
                      onBack={() => {
                        setActiveTest(null);
                        setTestProgress(0);
                      }}
                      onRestart={() => {
                        setTestProgress(0);
                      }}
                      onProgressUpdate={(progress) => {
                        setTestProgress(progress);
                      }}
                    />
                  ) : activeTest === "amsler" ? (
                    <AmslerTest
                      onComplete={(result) => {
                        console.log("Test result:", result);
                        setTestProgress(100);
                        setTimeout(() => {
                          setTestProgress(0);
                        }, 3000);
                      }}
                      onBack={() => {
                        setActiveTest(null);
                        setTestProgress(0);
                      }}
                      onRestart={() => {
                        setTestProgress(0);
                      }}
                      onProgressUpdate={(progress) => {
                        setTestProgress(progress);
                      }}
                    />
                  ) : activeTest === "astigmatism" ? (
                    <AstigmatismTest
                      onComplete={(result) => {
                        console.log("Test result:", result);
                        setTestProgress(100);
                        setTimeout(() => {
                          setTestProgress(0);
                        }, 3000);
                      }}
                      onBack={() => {
                        setActiveTest(null);
                        setTestProgress(0);
                      }}
                      onRestart={() => {
                        setTestProgress(0);
                      }}
                      onProgressUpdate={(progress) => {
                        setTestProgress(progress);
                      }}
                    />
                  ) : activeTest === "contrast" ? (
                    <ContrastTest
                      onComplete={(result) => {
                        console.log("Test result:", result);
                        setTestProgress(100);
                        setTimeout(() => {
                          setTestProgress(0);
                        }, 3000);
                      }}
                      onBack={() => {
                        setActiveTest(null);
                        setTestProgress(0);
                      }}
                      onRestart={() => {
                        setTestProgress(0);
                      }}
                      onProgressUpdate={(progress) => {
                        setTestProgress(progress);
                      }}
                    />
                  ) : activeTest === "duochrome" ? (
                    <DuochromeTest
                      onComplete={(result) => {
                        console.log("Test result:", result);
                        setTestProgress(100);
                        setTimeout(() => {
                          setTestProgress(0);
                        }, 3000);
                      }}
                      onBack={() => {
                        setActiveTest(null);
                        setTestProgress(0);
                      }}
                      onRestart={() => {
                        setTestProgress(0);
                      }}
                      onProgressUpdate={(progress) => {
                        setTestProgress(progress);
                      }}
                    />
                  ) : activeTest === "colorblind" ? (
                    <ColorblindTest
                      onComplete={(result) => {
                        console.log("Test result:", result);
                        setTestProgress(100);
                        setTimeout(() => {
                          setTestProgress(0);
                        }, 3000);
                      }}
                      onBack={() => {
                        setActiveTest(null);
                        setTestProgress(0);
                      }}
                      onRestart={() => {
                        setTestProgress(0);
                      }}
                      onProgressUpdate={(progress) => {
                        setTestProgress(progress);
                      }}
                    />
                  ) : (
                    <div className="text-center py-12 space-y-6">
                      <h2 className="text-3xl font-bold">
                        {tests.find((t) => t.id === activeTest)?.title}
                      </h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        {tests.find((t) => t.id === activeTest)?.description}
                      </p>

                      <div className="py-12">
                        <Card className="p-12 bg-muted/50 max-w-2xl mx-auto">
                          <p className="text-lg text-muted-foreground">
                            Демонстрационный режим теста. В полной версии здесь
                            будет интерактивный тест зрения.
                          </p>
                        </Card>
                      </div>

                      <div className="flex gap-4 justify-center">
                        <Button
                          size="lg"
                          onClick={handleCompleteTest}
                          data-testid="button-complete-test"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          Завершить тест
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
