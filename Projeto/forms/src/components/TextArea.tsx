import React, { useState, useRef, useEffect } from 'react';

interface AutoTextAreaProps {
  placehoder: string;
  onBlur: (value: string) => void;
  className?: string;
  value?: string;
}

const AutoTextArea: React.FC<AutoTextAreaProps> = ({ placehoder, onBlur, className, value }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState('auto');

  const [val, setValue] = useState('');

  useEffect(() => {
    const initValue = async () => {
      setValue(value!);
    };

    initValue();
  }, [value]);

  const handleBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onBlur(event.target.value)
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`);

    }
  };


  return (
    <div className={className}>
      <textarea
        ref={textareaRef}
        placeholder={placehoder}
        className="w-full p-2 bg-transparent border-2 border-black resize-none focus:outline-none"
        style={{ height }}
        value={val}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default AutoTextArea
