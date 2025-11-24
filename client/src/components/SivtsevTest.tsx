import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Eye } from "lucide-react";

// Таблица Сивцева: строки с буквами и соответствующая острота зрения
const SIVTSEV_ROWS = [
  { letters: ["Ш", "Б"], acuity: 0.1 },
  { letters: ["М", "Н", "К"], acuity: 0.2 },
  { letters: ["Ы", "И", "Б"], acuity: 0.3 },
  { letters: ["З", "К", "Х"], acuity: 0.4 },
  { letters: ["Б", "Ы", "М"], acuity: 0.5 },
  { letters: ["И", "Н", "Ш"], acuity: 0.6 },
  { letters: ["Б", "Ш", "Ы"], acuity: 0.7 },
  { letters: ["К", "Ш", "М"], acuity: 0.8 },
  { letters: ["Н", "Ы", "И"], acuity: 0.9 },
  { letters: ["Б", "М", "Ш"], acuity: 1.0 },
  { letters: ["Х", "Н", "Ы"], acuity: 1.2 },
  { letters: ["К", "М", "Б"], acuity: 1.5 },
];

interface SivtsevTestProps {
  onComplete: (result: {
    acuity: number;
    lastCorrectRow: number;
    totalRows: number;
  }) => void;
  onBack: () => void;
  onRestart?: () => void;
  onProgressUpdate?: (progress: number) => void;
}

type TestState = "instructions" | "testing" | "result";

export default function SivtsevTest({
  onComplete,
  onBack,
  onRestart,
  onProgressUpdate,
}: SivtsevTestProps) {
  const [testState, setTestState] = useState<TestState>("instructions");
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [correctRows, setCorrectRows] = useState<number[]>([]);
  const [errors, setErrors] = useState<number[]>([]);
  const [showError, setShowError] = useState(false);
  const [testResult, setTestResult] = useState<{
    acuity: number;
    lastCorrectRow: number;
    totalRows: number;
  } | null>(null);

  // Размеры букв для разных строк (в rem)
  const getFontSize = (rowIndex: number) => {
    const sizes = [8, 6, 4.5, 3.5, 2.8, 2.2, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6];
    return sizes[rowIndex] || 0.6;
  };

  const handleStartTest = () => {
    setTestState("testing");
    setCurrentRowIndex(0);
    setUserInput("");
    setCorrectRows([]);
    setErrors([]);
    setShowError(false);
    onRestart?.();
    // Устанавливаем начальный прогресс
    onProgressUpdate?.(0);
  };

  // Обновляем прогресс при изменении текущей строки
  useEffect(() => {
    if (testState === "testing") {
      const progress = Math.round(
        ((currentRowIndex + 1) / SIVTSEV_ROWS.length) * 100
      );
      onProgressUpdate?.(progress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRowIndex, testState]);

  const handleSubmitRow = () => {
    const currentRow = SIVTSEV_ROWS[currentRowIndex];
    const userLetters = userInput
      .toUpperCase()
      .replace(/\s/g, "")
      .split("")
      .filter((l) => l.length > 0);

    // Проверяем, все ли буквы правильные (порядок не важен)
    const correctLetters = currentRow.letters.map((l) => l.toUpperCase());
    const isCorrect =
      userLetters.length === correctLetters.length &&
      userLetters.every((letter) => correctLetters.includes(letter)) &&
      correctLetters.every((letter) => userLetters.includes(letter));

    if (isCorrect) {
      setCorrectRows([...correctRows, currentRowIndex]);
      setShowError(false);
      // Переходим к следующей строке
      if (currentRowIndex < SIVTSEV_ROWS.length - 1) {
        setCurrentRowIndex(currentRowIndex + 1);
        setUserInput("");
      } else {
        // Дошли до конца - завершаем тест
        onProgressUpdate?.(100);
        finishTest(currentRowIndex);
      }
    } else {
      // Ошибка - показываем сообщение, но не завершаем тест
      setShowError(true);
      setErrors([...errors, currentRowIndex]);
    }
  };

  const finishTest = (lastCorrectIndex: number) => {
    const result = {
      acuity:
        lastCorrectIndex >= 0 ? SIVTSEV_ROWS[lastCorrectIndex].acuity : 0.1,
      lastCorrectRow: lastCorrectIndex + 1,
      totalRows: SIVTSEV_ROWS.length,
    };
    setTestResult(result);
    setTestState("result");
    onComplete(result);
  };

  const handleSkipRow = () => {
    // Пропуск строки означает, что пользователь не может её прочитать
    // Завершаем тест на предыдущей правильно прочитанной строке
    const lastCorrectIndex =
      correctRows.length > 0 ? correctRows[correctRows.length - 1] : -1;
    finishTest(lastCorrectIndex);
  };

  const handleRestart = () => {
    setTestState("instructions");
    setCurrentRowIndex(0);
    setUserInput("");
    setCorrectRows([]);
    setErrors([]);
    setShowError(false);
    setTestResult(null);
    onRestart?.();
  };

  if (testState === "instructions") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Таблица Сивцева</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Проверка остроты зрения с помощью классической таблицы с буквами
            кириллицы
          </p>
        </div>

        <Card className="p-6 bg-muted/50">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Инструкция:</h3>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>Сядьте на расстоянии 50-70 см от экрана</li>
              <li>Закройте один глаз рукой или повязкой</li>
              <li>
                Вводите буквы, которые вы видите в строке, через пробел или
                подряд
              </li>
              <li>
                Если вы допустили ошибку, вы можете попробовать ввести буквы
                снова
              </li>
              <li>
                Если вы не можете прочитать строку, нажмите "Не вижу эту строку"
                - тест завершится на предыдущей правильно прочитанной строке
              </li>
              <li>
                Тест завершится автоматически, когда вы пройдете все строки
              </li>
              <li>
                После завершения теста для одного глаза, протестируйте второй
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
    const getAcuityDescription = (acuity: number) => {
      if (acuity >= 1.0) return "Отличное зрение";
      if (acuity >= 0.8) return "Хорошее зрение";
      if (acuity >= 0.6) return "Удовлетворительное зрение";
      if (acuity >= 0.4) return "Сниженное зрение";
      return "Значительное снижение зрения";
    };

    const getAcuityColor = (acuity: number) => {
      if (acuity >= 1.0) return "text-green-600";
      if (acuity >= 0.8) return "text-blue-600";
      if (acuity >= 0.6) return "text-yellow-600";
      if (acuity >= 0.4) return "text-orange-600";
      return "text-red-600";
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
                Острота зрения
              </div>
              <div
                className={`text-5xl font-bold ${getAcuityColor(
                  testResult.acuity
                )}`}
              >
                {testResult.acuity.toFixed(1)}
              </div>
              <div className="text-lg font-semibold">
                {getAcuityDescription(testResult.acuity)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Правильно прочитано строк
                </div>
                <div
                  className={`text-2xl font-bold ${
                    testResult.lastCorrectRow > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {testResult.lastCorrectRow > 0
                    ? testResult.lastCorrectRow
                    : "0"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Всего строк</div>
                <div className="text-2xl font-bold">{testResult.totalRows}</div>
              </div>
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
  const currentRow = SIVTSEV_ROWS[currentRowIndex];
  const fontSize = getFontSize(currentRowIndex);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          Строка {currentRowIndex + 1} из {SIVTSEV_ROWS.length}
        </div>
      </div>

      <Card className="p-12 bg-gradient-to-br from-background to-muted/30">
        <div className="space-y-8">
          <div
            className="text-center font-bold tracking-wider text-foreground select-none"
            style={{
              fontSize: `${fontSize}rem`,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            {currentRow.letters.join("   ")}
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Введите буквы, которые вы видите:
              </label>
              <Input
                type="text"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  setShowError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitRow();
                  }
                }}
                placeholder="Например: Ш Б"
                className={`text-center text-lg ${
                  showError ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                autoFocus
              />
              {showError && (
                <p className="text-xs text-red-600 text-center font-medium">
                  Неверный ответ. Попробуйте еще раз или нажмите "Не вижу эту
                  строку"
                </p>
              )}
              {!showError && (
                <p className="text-xs text-muted-foreground text-center">
                  Введите буквы через пробел или подряд
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleSubmitRow}
                className="flex-1"
                disabled={!userInput.trim()}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Проверить
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSkipRow}
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Не вижу эту строку
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
