import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Eye, AlertTriangle } from "lucide-react";

interface DuochromeTestProps {
  onComplete: (result: {
    redClearer: boolean;
    greenClearer: boolean;
    equal: boolean;
    notes: string;
  }) => void;
  onBack: () => void;
  onRestart?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

type TestState = "instructions" | "testing" | "result";

export default function DuochromeTest({
  onComplete,
  onBack,
  onRestart,
  onProgressUpdate,
}: DuochromeTestProps) {
  const [testState, setTestState] = useState<TestState>("instructions");
  const [redClearer, setRedClearer] = useState(false);
  const [greenClearer, setGreenClearer] = useState(false);
  const [equal, setEqual] = useState(false);
  const [notes, setNotes] = useState("");
  const [testResult, setTestResult] = useState<{
    redClearer: boolean;
    greenClearer: boolean;
    equal: boolean;
    notes: string;
  } | null>(null);

  const handleStartTest = () => {
    setTestState("testing");
    setRedClearer(false);
    setGreenClearer(false);
    setEqual(false);
    setNotes("");
    onRestart?.();
    onProgressUpdate?.(50);
  };

  const handleSelect = (value: "red" | "green" | "equal") => {
    setRedClearer(value === "red");
    setGreenClearer(value === "green");
    setEqual(value === "equal");
  };

  const handleCompleteTest = () => {
    const result = {
      redClearer,
      greenClearer,
      equal,
      notes,
    };
    setTestResult(result);
    setTestState("result");
    onComplete(result);
    onProgressUpdate?.(100);
  };

  const handleRestart = () => {
    setTestState("instructions");
    setRedClearer(false);
    setGreenClearer(false);
    setEqual(false);
    setNotes("");
    setTestResult(null);
    onRestart?.();
  };

  // Обновляем прогресс при заполнении формы
  useEffect(() => {
    if (testState === "testing") {
      const hasSelection = redClearer || greenClearer || equal;
      const progress = hasSelection ? 90 : 50;
      onProgressUpdate?.(progress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redClearer, greenClearer, equal, testState]);

  if (testState === "instructions") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Дуохромный тест</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оценка рефракционного баланса для каждого глаза
          </p>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Инструкция:</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>Сядьте на расстоянии 50-70 см от экрана</li>
              <li>Закройте один глаз рукой или повязкой</li>
              <li>Посмотрите на буквы на красном и зеленом фоне</li>
              <li>
                Определите, на каком фоне буквы выглядят четче: на красном,
                зеленом или одинаково
              </li>
              <li>
                Этот тест помогает определить правильность коррекции зрения
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
      if (testResult.equal) {
        return "Рефракционный баланс в норме";
      }
      if (testResult.redClearer) {
        return "Буквы на красном фоне четче - возможна недостаточная коррекция";
      }
      if (testResult.greenClearer) {
        return "Буквы на зеленом фоне четче - возможна избыточная коррекция";
      }
      return "Результат не определен";
    };

    const getResultColor = () => {
      if (testResult.equal) return "text-green-600";
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
              <div className={`text-2xl font-bold ${getResultColor()}`}>
                {getResultDescription()}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium">Красный четче</div>
                  <div className="text-lg">
                    {testResult.redClearer ? (
                      <span className="text-red-600">Да</span>
                    ) : (
                      <span className="text-muted-foreground">Нет</span>
                    )}
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium">Одинаково</div>
                  <div className="text-lg">
                    {testResult.equal ? (
                      <span className="text-green-600">Да</span>
                    ) : (
                      <span className="text-muted-foreground">Нет</span>
                    )}
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium">Зеленый четче</div>
                  <div className="text-lg">
                    {testResult.greenClearer ? (
                      <span className="text-green-600">Да</span>
                    ) : (
                      <span className="text-muted-foreground">Нет</span>
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

              {!testResult.equal && (
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold text-orange-900">
                        Рекомендуется консультация офтальмолога
                      </p>
                      <p className="text-orange-700">
                        Результат может указывать на необходимость корректировки
                        рефракции. Обратитесь к специалисту для проверки
                        коррекции зрения.
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
          На каком фоне буквы выглядят четче?
        </div>
      </div>

      <Card className="p-8 bg-gradient-to-br from-background to-muted/30">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div
              className={`p-8 rounded-lg border-2 transition-all cursor-pointer ${
                redClearer
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-red-300"
              }`}
              onClick={() => handleSelect("red")}
            >
              <div className="bg-red-600 rounded-lg p-6 mb-4">
                <div className="text-4xl font-bold text-black text-center">
                  Ш Б
                </div>
              </div>
              <div className="text-center font-medium">Красный фон</div>
            </div>

            <div
              className={`p-8 rounded-lg border-2 transition-all cursor-pointer ${
                greenClearer
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-300"
              }`}
              onClick={() => handleSelect("green")}
            >
              <div className="bg-green-600 rounded-lg p-6 mb-4">
                <div className="text-4xl font-bold text-black text-center">
                  Ш Б
                </div>
              </div>
              <div className="text-center font-medium">Зеленый фон</div>
            </div>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="duochrome"
                  checked={equal}
                  onChange={() => handleSelect("equal")}
                  className="w-5 h-5"
                />
                <span>Буквы выглядят одинаково четко на обоих фонах</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Дополнительные заметки (необязательно)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Опишите различия, если они есть..."
                className="w-full min-h-[100px] p-3 border rounded-lg resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              size="lg"
              onClick={handleCompleteTest}
              className="flex-1 max-w-xs"
              disabled={!redClearer && !greenClearer && !equal}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Завершить тест
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
