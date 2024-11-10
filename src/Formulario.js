// src/Formulario.js
import React from "react";
import useForm from "./useForm"; // Importa o hook personalizado

const initialValues = {
  nome: "",
  email: "",
};

function Formulario() {
  // Função de validação para verificar os campos
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("nome" in fieldValues)
      temp.nome = fieldValues.nome ? "" : "Este campo é obrigatório.";

    if ("email" in fieldValues)
      temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
        ? ""
        : "Email inválido.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  // Usa o hook `useForm` e passa os valores iniciais e a função de validação
  const {
    values,
    errors,
    handleInputChange,
    resetForm,
  } = useForm(initialValues, true, validate);

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Aqui você pode adicionar a lógica para enviar o formulário
      console.log("Formulário enviado com sucesso", values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleInputChange}
        />
        {errors.nome && <p style={{ color: "red" }}>{errors.nome}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <button type="submit">Enviar</button>
      <button type="button" onClick={resetForm}>
        Resetar
      </button>
    </form>
  );
}

export default Formulario;