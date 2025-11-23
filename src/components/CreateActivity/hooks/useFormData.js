import { useState, useEffect } from 'react';
import { DISCIPLINAS_POR_DEPARTAMENTO } from '../utils/constants';
import { validateForm } from '../utils/validation';

export default function useFormData({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    turma: '', departamento: '', disciplina: '', semestre: '1', 
    ano: new Date().getFullYear(), codigo: '', titulo: '', 
    prioridade: 'media', valor: '', dataEntrega: '', 
    descricao: '', isbn_livro: ''
  });

  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState([]);
  const [linkedBook, setLinkedBook] = useState(null);
  const [files, setFiles] = useState([]);
  const [instructions, setInstructions] = useState(['']);
  const [isSearchingBook, setIsSearchingBook] = useState(false);

  // Gera código automático
  useEffect(() => {
    if (formData.disciplina && formData.ano) {
      const randomSuffix = Math.floor(Math.random() * 100);
      setFormData(prev => ({ 
        ...prev, 
        codigo: `${formData.disciplina}-${formData.ano}-${randomSuffix}` 
      }));
    }
  }, [formData.disciplina, formData.ano]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'departamento') {
      const discs = DISCIPLINAS_POR_DEPARTAMENTO[value] || [];
      setDisciplinasDisponiveis(discs);
      setFormData(prev => ({ ...prev, departamento: value, disciplina: '' }));
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const addInstruction = () => {
    if (instructions.length < 5) {
      setInstructions(prev => [...prev, '']);
    }
  };

  const removeInstruction = (index) => {
    setInstructions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSearchISBN = () => {
    if (!formData.isbn_livro) {
      alert('Digite um ISBN para buscar');
      return;
    }
    
    setIsSearchingBook(true);
    setTimeout(() => {
      setLinkedBook({ 
        title: 'Teologia Sistemática', 
        author: 'Wayne Grudem', 
        chapters: '1-15', 
        isbn: formData.isbn_livro 
      });
      setIsSearchingBook(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação
    const errors = validateForm(formData);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const discObj = disciplinasDisponiveis.find(d => d.codigo === formData.disciplina);
    const nomeDisciplina = discObj ? discObj.nome : formData.disciplina;

    const newActivity = {
      id: Date.now(),
      disciplina: nomeDisciplina,
      nome: formData.titulo,
      dataEntrega: formData.dataEntrega,
      codAtividade: formData.codigo,
      codDisciplina: formData.disciplina,
      objetivos: formData.descricao,
      bibliografia: formData.isbn_livro || "—",
      subject: nomeDisciplina,
      title: formData.titulo,
      start: new Date().toISOString().split('T')[0],
      end: formData.dataEntrega ? formData.dataEntrega.split('T')[0] : '',
      color: '#1a73e8',
      instrucoes: instructions.filter(inst => inst.trim() !== ''),
      arquivos: files.map(f => f.name),
      // Campos adicionais do formData
      turma: formData.turma,
      departamento: formData.departamento,
      semestre: formData.semestre,
      ano: formData.ano,
      prioridade: formData.prioridade,
      valor: formData.valor
    };

    console.log("Salvando atividade:", newActivity);
    onSave(newActivity);
    onClose();
  };

  return {
    formData,
    files,
    instructions,
    linkedBook,
    isSearchingBook,
    disciplinasDisponiveis,
    handleChange,
    handleFileChange,
    handleInstructionChange,
    addInstruction,
    removeInstruction,
    removeFile,
    handleSearchISBN,
    handleSubmit
  };
}