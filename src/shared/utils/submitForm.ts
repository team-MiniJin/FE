const submitForm = (
  formValues: { [key: string]: string },
  errors: { [key: string]: string }
) => {
  const isFormEmpty = Object.values(formValues).some((value) => value === '');
  if (isFormEmpty) {
    const newErrors: { [key: string]: string } = {};
    Object.entries(formValues).forEach(([name, value]) => {
      if (value === '') {
        newErrors[name] = '필수 입력칸 입니다.';
      }
    });
    return { isFormValid: false, newErrors };
  }

  if (Object.values(errors).every((error) => !error)) {
    return { isFormValid: true, newErrors: {} };
  }

  return { isFormValid: false, newErrors: errors };
};

export default submitForm;
