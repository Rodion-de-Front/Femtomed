import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Eye, AlertTriangle } from "lucide-react";

interface ContrastTestProps {
  onComplete: (result: {
    minContrast: number;
    correctAnswers: number;
    totalQuestions: number;
  }) => void;
  onBack: () => void;
  onRestart?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

type TestState = "instructions" | "testing" | "result";

// Уровни контраста от 100% до 5%
const CONTRAST_LEVELS = [100, 50, 25, 15, 10, 7, 5];

export default function ContrastTest({
  onComplete,
  onBack,
  onRestart,
  onProgressUpdate,
}: ContrastTestProps) {
  const [testState, setTestState] = useState<TestState>("instructions");
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [testResult, setTestResult] = useState<{
    minContrast: number;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);

  const handleStartTest = () => {
    setTestState("testing");
    setCurrentLevelIndex(0);
    setCorrectAnswers(0);
    onRestart?.();
    onProgressUpdate?.(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;

    // Переходим к следующему уровню
    if (currentLevelIndex < CONTRAST_LEVELS.length - 1) {
      setCorrectAnswers(newCorrectAnswers);
      setCurrentLevelIndex(currentLevelIndex + 1);
      const progress = Math.round(
        ((currentLevelIndex + 2) / CONTRAST_LEVELS.length) * 100
      );
      onProgressUpdate?.(progress);
    } else {
      // Завершаем тест
      // minContrast = текущий уровень, если ответ правильный, иначе предыдущий
      const minContrast = isCorrect
        ? CONTRAST_LEVELS[currentLevelIndex]
        : CONTRAST_LEVELS[Math.max(0, currentLevelIndex - 1)];
      const result = {
        minContrast,
        correctAnswers: newCorrectAnswers,
        totalQuestions: CONTRAST_LEVELS.length,
      };
      setTestResult(result);
      setTestState("result");
      onComplete(result);
      onProgressUpdate?.(100);
    }
  };

  const handleRestart = () => {
    setTestState("instructions");
    setCurrentLevelIndex(0);
    setCorrectAnswers(0);
    setTestResult(null);
    onRestart?.();
  };

  const currentContrast = CONTRAST_LEVELS[currentLevelIndex];
  const contrastColor = `rgba(0, 0, 0, ${currentContrast / 100})`;

  if (testState === "instructions") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Контрастная чувствительность</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Определение способности различать объекты при низком контрасте
          </p>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Инструкция:</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>Сядьте на расстоянии 50-70 см от экрана</li>
              <li>Закройте один глаз рукой или повязкой</li>
              <li>Вам будут показаны буквы с разным уровнем контраста</li>
              <li>
                Введите буквы, которые вы видите, или нажмите "Не вижу", если не
                можете различить
              </li>
              <li>
                Тест определит минимальный уровень контраста, при котором вы
                можете различать объекты
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
    const getContrastDescription = (contrast: number, allCorrect: boolean) => {
      if (allCorrect) return "Отличная контрастная чувствительность";
      if (contrast >= 25) return "Отличная контрастная чувствительность";
      if (contrast >= 15) return "Хорошая контрастная чувствительность";
      if (contrast >= 10)
        return "Удовлетворительная контрастная чувствительность";
      return "Сниженная контрастная чувствительность";
    };

    const getContrastColor = (contrast: number, allCorrect: boolean) => {
      if (allCorrect) return "text-green-600";
      if (contrast >= 25) return "text-green-600";
      if (contrast >= 15) return "text-blue-600";
      if (contrast >= 10) return "text-yellow-600";
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
              <div className="text-sm text-muted-foreground">
                Минимальный различимый контраст
              </div>
              <div
                className={`text-5xl font-bold ${getContrastColor(
                  testResult.minContrast,
                  testResult.correctAnswers === testResult.totalQuestions
                )}`}
              >
                {testResult.minContrast}%
              </div>
              <div className="text-lg font-semibold">
                {getContrastDescription(
                  testResult.minContrast,
                  testResult.correctAnswers === testResult.totalQuestions
                )}
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
                  Всего уровней
                </div>
                <div className="text-2xl font-bold">
                  {testResult.totalQuestions}
                </div>
              </div>
            </div>

            {testResult.correctAnswers < testResult.totalQuestions && (
              <Card className="p-4 bg-orange-50 border-orange-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-orange-900">
                      Рекомендуется консультация офтальмолога
                    </p>
                    <p className="text-orange-700">
                      Сниженная контрастная чувствительность может указывать на
                      проблемы со зрением. Обратитесь к специалисту для
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
  const testLetters = ["Ш", "Б", "М"];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">
          Уровень {currentLevelIndex + 1} из {CONTRAST_LEVELS.length}
        </div>
        <div className="text-sm text-muted-foreground">
          Контраст: {currentContrast}%
        </div>
      </div>

      <Card className="p-12 bg-gradient-to-br from-background to-muted/30">
        <div className="space-y-8">
          <div className="text-center">
            <div
              className="text-6xl font-bold inline-block"
              style={{ color: contrastColor }}
            >
              {testLetters[currentLevelIndex % testLetters.length]}
            </div>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => handleAnswer(true)}
                className="flex-1"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Вижу букву
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleAnswer(false)}
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
