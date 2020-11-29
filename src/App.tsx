import { useEffect, useState } from 'react';
import './App.scss';
import QuizTaker, { QuizType } from './components/QuizTaker';
import SuperInput from './components/SuperInput';

function App() {
  const [rawData, setRawData] = useState<string>('');
  const [quizData, setQuizData] = useState<QuizType>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    let newQuizData = [];
    try {
      newQuizData = JSON.parse(rawData);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }

    setQuizData(newQuizData);
  }, [rawData, setQuizData]);

  return (
    <div className="App">
      <h1>Gnomework</h1>
      <SuperInput data={rawData} setData={setRawData} />
      {rawData && errorMessage && (
        <div className="ErrorSection">
          {errorMessage.replaceAll('\n', '\\n')}
          <br />
          {errorMessage.includes('at position') && <pre>{getLineFromStringIndex(rawData, +(errorMessage.match(/\d+/g)?.[0] || 0))}</pre>}
        </div>
      )}
      <QuizTaker quizData={quizData} />
    </div>
  );
}

function getLineFromStringIndex(str: string, ind: number): string {
  const lineNumber = str.slice(0, ind).split('\n').length;
  const lineIndex = str.split('\n').slice(0, lineNumber).join('\n').length;
  const [preline, line, postline] = str.split('\n').slice(lineNumber - 1, lineNumber + 2);
  const arrow = '^'.padStart(ind - lineIndex, ' ');

  return [preline, line, `${arrow} Unexpected ${str[ind].replaceAll('\n', '\\n')} at line ${lineNumber} and character ${ind - lineIndex}`, postline].join('\n');
}

export default App;
