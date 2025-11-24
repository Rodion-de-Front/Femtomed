import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Eye, AlertTriangle } from "lucide-react";

interface AmslerTestProps {
  onComplete: (result: {
    hasDistortions: boolean;
    hasBlurredAreas: boolean;
    hasDarkSpots: boolean;
    hasWavyLines: boolean;
    notes: string;
  }) => void;
  onBack: () => void;
  onRestart?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

type TestState = "instructions" | "testing" | "result";

export default function AmslerTest({
  onComplete,
  onBack,
  onRestart,
  onProgressUpdate,
}: AmslerTestProps) {
  const [testState, setTestState] = useState<TestState>("instructions");
  const [hasDistortions, setHasDistortions] = useState(false);
  const [hasBlurredAreas, setHasBlurredAreas] = useState(false);
  const [hasDarkSpots, setHasDarkSpots] = useState(false);
  const [hasWavyLines, setHasWavyLines] = useState(false);
  const [notes, setNotes] = useState("");
  const [testResult, setTestResult] = useState<{
    hasDistortions: boolean;
    hasBlurredAreas: boolean;
    hasDarkSpots: boolean;
    hasWavyLines: boolean;
    notes: string;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStartTest = () => {
    setTestState("testing");
    setHasDistortions(false);
    setHasBlurredAreas(false);
    setHasDarkSpots(false);
    setHasWavyLines(false);
    setNotes("");
    onRestart?.();
    onProgressUpdate?.(50); // Прогресс при начале теста
  };

  // Рисуем сетку Амслера
  useEffect(() => {
    if (testState === "testing" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const size = Math.min(canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gridSize = size * 0.8;
      const cellSize = gridSize / 20; // 20x20 сетка

      // Очищаем canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Рисуем сетку
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;

      const startX = centerX - gridSize / 2;
      const startY = centerY - gridSize / 2;

      // Вертикальные линии
      for (let i = 0; i <= 20; i++) {
        const x = startX + i * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY + gridSize);
        ctx.stroke();
      }

      // Горизонтальные линии
      for (let i = 0; i <= 20; i++) {
        const y = startY + i * cellSize;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + gridSize, y);
        ctx.stroke();
      }

      // Рисуем центральную точку
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [testState]);

  // Обновляем размер canvas при изменении размера окна
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || testState !== "testing") return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth - 32, 600);
        canvas.width = size;
        canvas.height = size;
        // Перерисовываем сетку после изменения размера
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const gridSize = size * 0.8;
          const cellSize = gridSize / 20;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;

          const startX = centerX - gridSize / 2;
          const startY = centerY - gridSize / 2;

          for (let i = 0; i <= 20; i++) {
            const x = startX + i * cellSize;
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, startY + gridSize);
            ctx.stroke();
          }

          for (let i = 0; i <= 20; i++) {
            const y = startY + i * cellSize;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(startX + gridSize, y);
            ctx.stroke();
          }

          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [testState]);

  const handleCompleteTest = () => {
    const result = {
      hasDistortions,
      hasBlurredAreas,
      hasDarkSpots,
      hasWavyLines,
      notes,
    };
    setTestResult(result);
    setTestState("result");
    onComplete(result);
    onProgressUpdate?.(100);
  };

  // Обновляем прогресс при заполнении формы
  useEffect(() => {
    if (testState === "testing") {
      const filledCount = [
        hasDistortions,
        hasBlurredAreas,
        hasDarkSpots,
        hasWavyLines,
        notes.length > 0,
      ].filter(Boolean).length;
      // Прогресс от 50% (начало теста) до 90% (заполнение формы)
      const progress = 50 + (filledCount / 5) * 40;
      onProgressUpdate?.(Math.round(progress));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasDistortions,
    hasBlurredAreas,
    hasDarkSpots,
    hasWavyLines,
    notes,
    testState,
  ]);

  const handleRestart = () => {
    setTestState("instructions");
    setHasDistortions(false);
    setHasBlurredAreas(false);
    setHasDarkSpots(false);
    setHasWavyLines(false);
    setNotes("");
    setTestResult(null);
    onRestart?.();
  };

  if (testState === "instructions") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Тест Амслера</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Диагностика макулярной дегенерации с помощью сетки линий
          </p>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Инструкция:</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>Сядьте на расстоянии 30-40 см от экрана</li>
              <li>Закройте один глаз рукой или повязкой</li>
              <li>
                Смотрите только на центральную черную точку в течение 10-15
                секунд
              </li>
              <li>Не отводите взгляд от центральной точки во время теста</li>
              <li>
                Обратите внимание на линии сетки: они должны быть прямыми,
                ровными и одинаковыми
              </li>
              <li>
                Отметьте, если вы видите искажения, размытые участки, темные
                пятна или волнистые линии
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
    const hasAnyIssues =
      testResult.hasDistortions ||
      testResult.hasBlurredAreas ||
      testResult.hasDarkSpots ||
      testResult.hasWavyLines;

    const getResultDescription = () => {
      if (!hasAnyIssues) {
        return "Норма: сетка видна без искажений";
      }
      return "Обнаружены отклонения: рекомендуется консультация офтальмолога";
    };

    const getResultColor = () => {
      return hasAnyIssues ? "text-orange-600" : "text-green-600";
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
              <div className={`text-2xl font-bold ${getResultColor()}`}>
                {getResultDescription()}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Искажения линий</div>
                  <div className="text-lg">
                    {testResult.hasDistortions ? (
                      <span className="text-red-600">Да</span>
                    ) : (
                      <span className="text-green-600">Нет</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Размытые участки</div>
                  <div className="text-lg">
                    {testResult.hasBlurredAreas ? (
                      <span className="text-red-600">Да</span>
                    ) : (
                      <span className="text-green-600">Нет</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Темные пятна</div>
                  <div className="text-lg">
                    {testResult.hasDarkSpots ? (
                      <span className="text-red-600">Да</span>
                    ) : (
                      <span className="text-green-600">Нет</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Волнистые линии</div>
                  <div className="text-lg">
                    {testResult.hasWavyLines ? (
                      <span className="text-red-600">Да</span>
                    ) : (
                      <span className="text-green-600">Нет</span>
                    )}
                  </div>
                </div>
              </div>

              {testResult.notes && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Дополнительные заметки
                  </div>
                  <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded">
                    {testResult.notes}
                  </div>
                </div>
              )}

              {hasAnyIssues && (
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-orange-900">
                        Рекомендуется консультация офтальмолога
                      </p>
                      <p className="text-orange-700">
                        Обнаруженные отклонения могут указывать на проблемы с
                        макулой. Обратитесь к специалисту для профессиональной
                        диагностики.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

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
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          Смотрите на центральную точку, не отводя взгляд
        </div>
      </div>

      <Card className="p-8 bg-gradient-to-br from-background to-muted/30">
        <div className="space-y-8">
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              className="border-2 border-foreground/20 rounded-lg max-w-full"
              style={{ maxWidth: "600px", width: "100%" }}
            />
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">
                Что вы видите на сетке?
              </h3>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasDistortions}
                    onChange={(e) => setHasDistortions(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>
                    Искажения линий (линии кажутся изогнутыми или неровными)
                  </span>
                </label>

                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasBlurredAreas}
                    onChange={(e) => setHasBlurredAreas(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>Размытые или нечеткие участки</span>
                </label>

                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasDarkSpots}
                    onChange={(e) => setHasDarkSpots(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>Темные пятна или пустые области</span>
                </label>

                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasWavyLines}
                    onChange={(e) => setHasWavyLines(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>Волнистые или зигзагообразные линии</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Дополнительные заметки (необязательно)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Опишите, что именно вы видите..."
                  className="w-full min-h-[100px] p-3 border rounded-lg resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={handleCompleteTest}
                className="flex-1 max-w-xs"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Завершить тест
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
