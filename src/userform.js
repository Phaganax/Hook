// src/useForm.js
import { useState } from "react";

function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Lida com mudanças nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Se validateOnChange estiver ativo, valida o campo após a alteração
    if (validateOnChange) validate({ [name]: value });
  };

  // Função para resetar o formulário
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

export default useForm;