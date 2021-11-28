import { useState, useEffect } from 'react';

const useForm = (callback:any, validate:any) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (JSON.stringify(errors) !== '{}') { setErrors(validate(values)); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (event:any) => {
    event.persist();
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
