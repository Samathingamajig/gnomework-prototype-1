interface QuizTakerInterface {
  quizData: QuizType;
}

export type QuizType = QuestionInterface[];

interface QuestionInterface {
  questionText: string;
  questionType: string;
  answerChoices: string[];
  correctAnswersIndexes?: number[];
}

function QuizTaker({ quizData }: QuizTakerInterface) {
  return (
    <div>
      <h1>QuizTaker</h1>
      <pre>{JSON.stringify(quizData)}</pre>
    </div>
  );
}

export default QuizTaker;
