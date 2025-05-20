import { useState, type ChangeEvent } from 'react';

/**
 * @function handleValues
 * @description Sets values store with input values
 */
export const useFormValues = <T extends Record<string, string>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleValues = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { values, setValues, handleValues };
};
