import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Eye, AlertTriangle } from "lucide-react";

interface AstigmatismTestProps {
  onComplete: (result: {
    hasDistortions: boolean;
    linesAppearDifferent: boolean;
    blurryLines: boolean;
    notes: string;
  }) => void;
  onBack: () => void;
  onRestart?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

type TestState = "instructions" | "testing" | "result";

export default function AstigmatismTest({
  onComplete,
  onBack,
  onRestart,
  onProgressUpdate,
}: AstigmatismTestProps) {
  const [testState, setTestState] = useState<TestState>("instructions");
  const [hasDistortions, setHasDistortions] = useState(false);
  const [linesAppearDifferent, setLinesAppearDifferent] = useState(false);
  const [blurryLines, setBlurryLines] = useState(false);
  const [notes, setNotes] = useState("");
  const [testResult, setTestResult] = useState<{
    hasDistortions: boolean;
    linesAppearDifferent: boolean;
    blurryLines: boolean;
    notes: string;
  } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStartTest = () => {
    setTestState("testing");
    setHasDistortions(false);
    setLinesAppearDifferent(false);
    setBlurryLines(false);
    setNotes("");
    onRestart?.();
    onProgressUpdate?.(50);
  };

  // Рисуем лучевую диаграмму для теста на астигматизм
  useEffect(() => {
    if (testState === "testing" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;

      // Очищаем canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Рисуем лучи от центра
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;

      const numLines = 36; // 36 линий (по 10 градусов каждая)
      for (let i = 0; i < numLines; i++) {
        const angle = (i * 360) / numLines;
        const radians = (angle * Math.PI) / 180;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + radius * Math.cos(radians),
          centerY + radius * Math.sin(radians)
        );
        ctx.stroke();
      }

      // Рисуем центральную точку
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [testState]);

  // Обновляем размер canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || testState !== "testing") return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth - 32, 600);
        canvas.width = size;
        canvas.height = size;
        // Перерисовываем
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const radius = size * 0.4;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;

          const numLines = 36;
          for (let i = 0; i < numLines; i++) {
            const angle = (i * 360) / numLines;
            const radians = (angle * Math.PI) / 180;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
              centerX + radius * Math.cos(radians),
              centerY + radius * Math.sin(radians)
            );
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
      linesAppearDifferent,
      blurryLines,
      notes,
    };
    setTestResult(result);
    setTestState("result");
    onComplete(result);
    onProgressUpdate?.(100);
  };

  const handleRestart = () => {
    setTestState("instructions");
    setHasDistortions(false);
    setLinesAppearDifferent(false);
    setBlurryLines(false);
    setNotes("");
    setTestResult(null);
    onRestart?.();
  };

  // Обновляем прогресс при заполнении формы
  useEffect(() => {
    if (testState === "testing") {
      const filledCount = [
        hasDistortions,
        linesAppearDifferent,
        blurryLines,
        notes.length > 0,
      ].filter(Boolean).length;
      const progress = 50 + (filledCount / 4) * 40;
      onProgressUpdate?.(Math.round(progress));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasDistortions, linesAppearDifferent, blurryLines, notes, testState]);

  if (testState === "instructions") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Тест на астигматизм</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оценка астигматизма с помощью лучевой диаграммы
          </p>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Инструкция:</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>Сядьте на расстоянии 50-70 см от экрана</li>
              <li>Закройте один глаз рукой или повязкой</li>
              <li>Смотрите на центральную точку</li>
              <li>
                Обратите внимание на все линии: они должны быть одинаковой
                четкости и толщины
              </li>
              <li>
                При астигматизме некоторые линии могут казаться более темными,
                четкими или размытыми
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
      testResult.linesAppearDifferent ||
      testResult.blurryLines;

    const getResultDescription = () => {
      if (!hasAnyIssues) {
        return "Норма: все линии видны одинаково четко";
      }
      return "Обнаружены отклонения: возможен астигматизм";
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
                  <div className="text-sm font-medium">
                    Линии выглядят по-разному
                  </div>
                  <div className="text-lg">
                    {testResult.linesAppearDifferent ? (
                      <span className="text-red-600">Да</span>
                    ) : (
                      <span className="text-green-600">Нет</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Размытые линии</div>
                  <div className="text-lg">
                    {testResult.blurryLines ? (
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
                        Обнаруженные отклонения могут указывать на астигматизм.
                        Обратитесь к специалисту для профессиональной
                        диагностики и коррекции.
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          Смотрите на центральную точку и оцените все линии
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
                Что вы видите на диаграмме?
              </h3>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={hasDistortions}
                    onChange={(e) => setHasDistortions(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>Искажения линий (линии кажутся изогнутыми)</span>
                </label>

                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={linesAppearDifferent}
                    onChange={(e) => setLinesAppearDifferent(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>
                    Некоторые линии выглядят темнее, четче или иначе, чем
                    остальные
                  </span>
                </label>

                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={blurryLines}
                    onChange={(e) => setBlurryLines(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span>Некоторые линии выглядят размытыми</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Дополнительные заметки (необязательно)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Опишите, какие линии выглядят по-другому..."
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
