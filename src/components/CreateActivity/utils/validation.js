// src/components/CreateActivity/utils/validation.js
export const validateForm = (formData) => {
  const errors = [];
  
  if (!formData.turma) errors.push('Selecione uma turma');
  if (!formData.departamento) errors.push('Selecione um departamento');
  if (!formData.disciplina) errors.push('Selecione uma disciplina');
  if (!formData.titulo?.trim()) errors.push('Informe o título da atividade');
  if (!formData.dataEntrega) errors.push('Informe a data de entrega');
  if (!formData.descricao?.trim()) errors.push('Informe a descrição da atividade');
  if (!formData.valor || formData.valor <= 0) errors.push('Informe um valor válido para a atividade');
  
  return errors;
};  