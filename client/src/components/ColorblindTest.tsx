import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Eye, AlertTriangle } from "lucide-react";

interface ColorblindTestProps {
  onComplete: (result: {
    correctAnswers: number;
    totalQuestions: number;
    score: number;
  }) => void;
  onBack: () => void;
  onRestart?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

type TestState = "instructions" | "testing" | "result";

// Тестовые таблицы Ишихара (упрощенная версия)
const ISHIHARA_TESTS = [
  { number: "12", colors: ["red", "green"] },
  { number: "8", colors: ["red", "green"] },
  { number: "6", colors: ["red", "green"] },
  { number: "29", colors: ["red", "green"] },
  { number: "57", colors: ["red", "green"] },
  { number: "5", colors: ["red", "green"] },
  { number: "3", colors: ["red", "green"] },
  { number: "15", colors: ["red", "green"] },
];

export default function ColorblindTest({
  onComplete,
  onBack,
  onRestart,
  onProgressUpdate,
}: ColorblindTestProps) {
  const [testState, setTestState] = useState<TestState>("instructions");
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testResult, setTestResult] = useState<{
    correctAnswers: number;
    totalQuestions: number;
    score: number;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStartTest = () => {
    setTestState("testing");
    setCurrentTestIndex(0);
    setUserInput("");
    setCorrectAnswers(0);
    onRestart?.();
    onProgressUpdate?.(0);
  };

  const handleSubmitAnswer = () => {
    const currentTest = ISHIHARA_TESTS[currentTestIndex];
    const isCorrect =
      userInput.trim() === currentTest.number ||
      userInput.trim() === currentTest.number.split("").reverse().join("");

    const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;

    // Переходим к следующему тесту
    if (currentTestIndex < ISHIHARA_TESTS.length - 1) {
      setCorrectAnswers(newCorrectAnswers);
      setCurrentTestIndex(currentTestIndex + 1);
      setUserInput("");
      const progress = Math.round(
        ((currentTestIndex + 2) / ISHIHARA_TESTS.length) * 100
      );
      onProgressUpdate?.(progress);
    } else {
      // Завершаем тест
      const finalCorrectAnswers = newCorrectAnswers;
      const score = Math.round(
        (finalCorrectAnswers / ISHIHARA_TESTS.length) * 100
      );
      const result = {
        correctAnswers: finalCorrectAnswers,
        totalQuestions: ISHIHARA_TESTS.length,
        score,
      };
      setTestResult(result);
      setTestState("result");
      onComplete(result);
      onProgressUpdate?.(100);
    }
  };

  const handleRestart = () => {
    setTestState("instructions");
    setCurrentTestIndex(0);
    setUserInput("");
    setCorrectAnswers(0);
    setTestResult(null);
    onRestart?.();
  };

  // Обновляем размер canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || testState !== "testing") return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth - 32, 400);
        canvas.width = size;
        canvas.height = size;
      } else {
        // Если контейнер еще не готов, устанавливаем размер по умолчанию
        canvas.width = 400;
        canvas.height = 400;
      }
    };

    // Используем requestAnimationFrame для гарантии, что DOM готов
    requestAnimationFrame(() => {
      updateCanvasSize();
    });

    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [testState]);

  // Рисуем таблицу Ишихара на Canvas
  useEffect(() => {
    if (testState !== "testing" || !canvasRef.current) return;

    const canvas = canvasRef.current;

    // Функция для рисования
    const drawPlate = () => {
      // Проверяем, что canvas имеет размер
      if (canvas.width === 0 || canvas.height === 0) {
        const container = canvas.parentElement;
        if (container) {
          const size = Math.min(container.clientWidth - 32, 400);
          canvas.width = size;
          canvas.height = size;
        } else {
          canvas.width = 400;
          canvas.height = 400;
        }
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const currentTest = ISHIHARA_TESTS[currentTestIndex];
      const size = Math.min(canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Очищаем canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f5e6d3"; // Светло-бежевый фон как в настоящих таблицах
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Цвета для фона (красновато-оранжевые и темно-синие/черные)
      const backgroundColors = [
        "#d97757",
        "#c86b4a",
        "#b85f3d",
        "#a55330",
        "#954d2a", // Красновато-оранжевые
        "#2c3e50",
        "#34495e",
        "#1a252f",
        "#0f1419",
        "#1e293b", // Темно-синие/черные
        "#8b4513",
        "#654321",
        "#5d4037", // Коричневые оттенки
      ];

      // Цвета для цифры (желтовато-оранжевые, светло-оранжевые)
      const numberColors = [
        "#ffa500",
        "#ff8c00",
        "#ffb347",
        "#ffcc99",
        "#ffd700", // Желтовато-оранжевые
        "#ff9500",
        "#ffad33",
        "#ffc266",
        "#ffd699", // Светло-оранжевые
      ];

      // Рисуем цифру точками другого цвета
      const number = currentTest.number;
      const fontSize = size * 0.35;
      const fontX = centerX;
      const fontY = centerY + fontSize * 0.35;

      // Создаем временный canvas для определения формы цифры
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = size;
      tempCanvas.height = size;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCtx.font = `bold ${fontSize}px Arial`;
      tempCtx.fillStyle = "#000";
      tempCtx.textAlign = "center";
      tempCtx.textBaseline = "middle";
      tempCtx.fillText(number, fontX, fontY);

      // Рисуем все точки (фон + цифра) в случайном порядке
      const numDots = 3000;
      const gridSize = 5;

      // Сначала рисуем случайные точки
      for (let i = 0; i < numDots; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const dotSize = 1.5 + Math.random() * 2.5; // Разный размер точек

        // Проверяем, попадает ли точка в область цифры
        const imageData = tempCtx.getImageData(x, y, 1, 1);
        const isInNumber = imageData.data[3] > 128;

        if (isInNumber) {
          // Точка в области цифры - используем желтовато-оранжевые цвета
          const numberColor =
            numberColors[Math.floor(Math.random() * numberColors.length)];
          ctx.fillStyle = numberColor;
        } else {
          // Точка в фоне - используем красновато-оранжевые и темные цвета
          const bgColor =
            backgroundColors[
              Math.floor(Math.random() * backgroundColors.length)
            ];
          ctx.fillStyle = bgColor;
        }

        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Добавляем дополнительные точки по сетке для более плотного заполнения
      for (let y = 0; y < size; y += gridSize) {
        for (let x = 0; x < size; x += gridSize) {
          if (Math.random() > 0.4) continue; // Не все точки, для естественности

          const offsetX = (Math.random() - 0.5) * gridSize * 0.7;
          const offsetY = (Math.random() - 0.5) * gridSize * 0.7;
          const dotX = Math.max(0, Math.min(size, x + offsetX));
          const dotY = Math.max(0, Math.min(size, y + offsetY));
          const dotSize = 1.2 + Math.random() * 2;

          const imageData = tempCtx.getImageData(dotX, dotY, 1, 1);
          const isInNumber = imageData.data[3] > 128;

          if (isInNumber) {
            const numberColor =
              numberColors[Math.floor(Math.random() * numberColors.length)];
            ctx.fillStyle = numberColor;
          } else {
            const bgColor =
              backgroundColors[
                Math.floor(Math.random() * backgroundColors.length)
              ];
            ctx.fillStyle = bgColor;
          }

          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    };

    // Используем requestAnimationFrame для гарантии, что canvas готов и отрисован
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        drawPlate();
      });
    });

    return () => cancelAnimationFrame(rafId);
  }, [testState, currentTestIndex]);

  if (testState === "instructions") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Тест на дальтонизм</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Проверка цветовосприятия по методу Ишихары
          </p>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Инструкция:</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>Сядьте на расстоянии 50-70 см от экрана</li>
              <li>Обеспечьте хорошее освещение</li>
              <li>
                Вам будут показаны таблицы с цветными точками, образующими цифры
              </li>
              <li>Введите цифру, которую вы видите на каждой таблице</li>
              <li>
                Если вы не видите цифру, введите "0" или нажмите "Не вижу"
              </li>
            </ol>
          </div>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={handleStartTest}>
            <Eye className="w-4 h-4 mr-2" />
            Начать тест
          </Button>
        </div>
      </div>
    );
  }

  if (testState === "result" && testResult) {
    const getResultDescription = () => {
      if (testResult.score >= 90) {
        return "Отличное цветовосприятие";
      }
      if (testResult.score >= 70) {
        return "Хорошее цветовосприятие";
      }
      if (testResult.score >= 50) {
        return "Удовлетворительное цветовосприятие";
      }
      return "Возможны проблемы с цветовосприятием";
    };

    const getResultColor = () => {
      if (testResult.score >= 90) return "text-green-600";
      if (testResult.score >= 70) return "text-blue-600";
      if (testResult.score >= 50) return "text-yellow-600";
      return "text-orange-600";
    };

    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Результаты теста</h2>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-background">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-sm text-muted-foreground">Результат</div>
              <div className={`text-5xl font-bold ${getResultColor()}`}>
                {testResult.score}%
              </div>
              <div className="text-lg font-semibold">
                {getResultDescription()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Правильных ответов
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {testResult.correctAnswers}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Всего таблиц
                </div>
                <div className="text-2xl font-bold">
                  {testResult.totalQuestions}
                </div>
              </div>
            </div>

            {testResult.score < 70 && (
              <Card className="p-4 bg-orange-50 border-orange-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-orange-900">
                      Рекомендуется консультация офтальмолога
                    </p>
                    <p className="text-orange-700">
                      Результаты могут указывать на проблемы с цветовосприятием
                      (дальтонизм). Обратитесь к специалисту для
                      профессиональной диагностики.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-4 bg-muted/50">
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Важно:</p>
                <p className="text-muted-foreground">
                  Результаты теста носят информационный характер и не заменяют
                  профессиональную диагностику. При выявлении отклонений
                  обязательно обратитесь к офтальмологу.
                </p>
              </div>
            </Card>
          </div>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="outline" onClick={handleRestart}>
            Пройти тест заново
          </Button>
          <Button size="lg" onClick={onBack}>
            Вернуться к списку тестов
          </Button>
        </div>
      </div>
    );
  }

  // Состояние тестирования
  const currentTest = ISHIHARA_TESTS[currentTestIndex];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">
          Таблица {currentTestIndex + 1} из {ISHIHARA_TESTS.length}
        </div>
      </div>

      <Card className="p-8 bg-gradient-to-br from-background to-muted/30">
        <div className="space-y-8">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border-2 border-foreground/20 rounded-lg max-w-full"
              style={{ maxWidth: "400px", width: "100%" }}
            />
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Какую цифру вы видите?
              </label>
              <Input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitAnswer();
                  }
                }}
                placeholder="Введите цифру"
                className="text-center text-lg"
                autoFocus
              />
              <p className="text-xs text-muted-foreground text-center">
                Если не видите цифру, введите "0"
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleSubmitAnswer}
                className="flex-1"
                disabled={!userInput.trim()}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Проверить
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setUserInput("0");
                  setTimeout(() => handleSubmitAnswer(), 100);
                }}
                className="flex-1"
              >
                Не вижу
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
