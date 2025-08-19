import { useMemo, useState } from "react";
import { Button, Card, CardBody, CardHeader, Chip, Divider, Progress, Radio, RadioGroup, Spacer } from "@heroui/react";
import { useNavigate } from "react-router";
import { data as questionnaireData } from "./data";
import { THook } from "../../utils/I18n/i18n";

interface QuestionOption {
  id: string;
  text: string;
  type: "rational" | "edgy" | "casual" | "chaotic";
}

interface QuestionItem {
  id: number;
  text: string;
  options: QuestionOption[];
}

type ResultType = "rational" | "edgy" | "casual" | "chaotic";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { t } = THook();
  const questions: QuestionItem[] = questionnaireData.questions as unknown as QuestionItem[];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIdByQuestionId, setSelectedOptionIdByQuestionId] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentIndex];

  const hasFinishedAllQuestions = useMemo(() => currentIndex >= questions.length, [currentIndex, questions.length]);

  const progressPercent = useMemo(() => {
    const answeredCount = Math.min(currentIndex, questions.length);
    return Math.round((answeredCount / questions.length) * 100);
  }, [currentIndex, questions.length]);

  const handleSelect = (questionId: number, optionId: string) => {
    setSelectedOptionIdByQuestionId((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    if (!selectedOptionIdByQuestionId[currentQuestion.id]) return;
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length));
  };

  const resetAll = () => {
    setSelectedOptionIdByQuestionId({});
    setCurrentIndex(0);
  };

  const result: { type: ResultType; title: string; description: string } | null = useMemo(() => {
    if (!hasFinishedAllQuestions) return null;

    const countByType: Record<ResultType, number> = {
      rational: 0,
      edgy: 0,
      casual: 0,
      chaotic: 0,
    };

    for (const q of questions) {
      const selectedId = selectedOptionIdByQuestionId[q.id];
      const option = q.options.find((o) => o.id === selectedId);
      if (option) {
        countByType[option.type] += 1;
      }
    }

    const sorted = (Object.keys(countByType) as ResultType[]).sort(
      (a, b) => countByType[b] - countByType[a]
    );
    const bestType: ResultType = sorted[0];

    const resultsMap = questionnaireData.results as Record<ResultType, { title: string; description: string }>;
    const target = resultsMap[bestType];
    return { type: bestType, title: target.title as string, description: target.description as string };
  }, [hasFinishedAllQuestions, questions, selectedOptionIdByQuestionId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col items-start gap-2 p-4 sm:p-6">
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-semibold">{questionnaireData.title}</h2>
            <Chip color="primary" variant="flat" size="sm">
              {hasFinishedAllQuestions ? "完成" : `第 ${currentIndex + 1} / ${questions.length} 题`}
            </Chip>
          </div>
          <div className="w-full">
            <Progress aria-label="progress" value={hasFinishedAllQuestions ? 100 : progressPercent} />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="p-4 sm:p-6">
          {!hasFinishedAllQuestions ? (
            <div>
              <div className="text-sm sm:text-base font-medium leading-6 sm:leading-7">{currentQuestion.text}</div>
              <Spacer y={4} />
              <RadioGroup
                value={selectedOptionIdByQuestionId[currentQuestion.id] || ""}
                onValueChange={(val) => handleSelect(currentQuestion.id, String(val))}
                className="gap-3"
              >
                {currentQuestion.options.map((opt) => (
                  <Radio key={opt.id} value={opt.id} description={opt.type} className="text-sm">
                    {opt.text}
                  </Radio>
                ))}
              </RadioGroup>
              <Spacer y={5} />
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Button 
                  variant="flat" 
                  onPress={goPrev} 
                  isDisabled={currentIndex === 0}
                  size="sm"
                  className="order-2 sm:order-1"
                >
                  上一题
                </Button>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 order-1 sm:order-2">
                  <Button variant="light" onPress={() => navigate("/")} size="sm">{t("go_back")}</Button>
                  <Button variant="light" onPress={resetAll} size="sm">重置</Button>
                  <Button 
                    color="primary" 
                    onPress={goNext} 
                    isDisabled={!selectedOptionIdByQuestionId[currentQuestion.id]}
                    size="sm"
                  >
                    下一题
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-base sm:text-lg font-semibold mb-3">测试结果：{result?.title}</div>
              <div className="text-default-600 leading-6 sm:leading-7 text-sm sm:text-base">{result?.description}</div>
              <Spacer y={5} />
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Button variant="flat" onPress={resetAll} size="sm" className="order-2 sm:order-1">再测一次</Button>
                <div className="flex items-center gap-3 order-1 sm:order-2">
                  <Button variant="light" onPress={() => navigate("/")} size="sm">{t("go_back")}</Button>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Questionnaire;
