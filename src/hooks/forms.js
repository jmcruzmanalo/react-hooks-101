import { useState } from 'react';

const useFormInput = () => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const onChange = (e) => {
    const { value: v } = e.target;
    setValue(v);
    setIsValid(!!v);
  };

  return {
    value,
    onChange,
    isValid,
  };
};

export default useFormInput;
