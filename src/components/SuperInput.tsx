import { ChangeEvent, DragEvent } from 'react';
import './SuperInput.scss';

interface SuperInputProps {
  data: string;
  setData: (newData: string) => void;
}

function SuperInput({ data, setData }: SuperInputProps) {
  const onDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    // Based off of:
    // https://stackoverflow.com/a/58677161/12101554
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    // Find the last period and all the characters after it
    const filetype = file.name.match(/\.[^.]+$/)?.[0];
    if (filetype !== '.json' && filetype !== '.txt') {
      alert(`A filetype of "${filetype}" is not allowed.\nPlease use a .json or a .txt file.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      setData(e.target?.result as string);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
  };

  return (
    <div className="SuperInput">
      <textarea onDrop={onDrop} onChange={onChange} value={data} placeholder="Drag and drop the quiz JSON file here, or type it out..."></textarea>
    </div>
  );
}

export default SuperInput;
