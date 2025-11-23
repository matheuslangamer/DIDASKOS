import { useState, useEffect } from "react";

export function useNotas() {
  const [notas, setNotas] = useState([]);

  // Carregar notas ao iniciar
  useEffect(() => {
    const armazenadas = localStorage.getItem("didasko-notas");
    if (armazenadas) {
      setNotas(JSON.parse(armazenadas));
    } else {
      // Dados iniciais de exemplo (caso o localStorage esteja vazio)
      const notasIniciais = [
        {
          id: 1,
          titulo: "Anotações sobre a Doutrina da Trindade",
          conteudo: "Pontos importantes: - Um Deus em três pessoas distintas - Unidade de essência, distinção de pessoas - Co-igualdade e co-eternidade - Base bíblica: Mt 28:19, 2 Co 13:13 - Diferença entre subordinação funcional e ontológica.",
          tags: ["trindade", "doutrina", "teologia"],
          disciplina: "Teologia Sistemática I",
          cor: "#FFE8E8",
          fixada: true,
          data: new Date().toISOString().split('T')[0], // Data de hoje
          criadaEm: new Date().toISOString()
        },
        {
          id: 2,
          titulo: "Métodos de Interpretação Bíblica",
          conteudo: "1. Método Histórico-Gramatical\n2. Método Alegórico (cuidado!)\n3. Análise Contextual\n4. Comparação de Textos\n5. Aplicação Contemporânea\n\nLembrar: O texto não pode significar o que nunca significou!",
          tags: ["hermenêutica", "métodos", "interpretação"],
          disciplina: "Hermenêutica Bíblica",
          cor: "#E8F4FF",
          fixada: false,
          data: new Date().toISOString().split('T')[0],
          criadaEm: new Date().toISOString()
        }
      ];
      setNotas(notasIniciais);
      localStorage.setItem("didasko-notas", JSON.stringify(notasIniciais));
    }
  }, []);

  // Salvar no LocalStorage sempre que a lista de notas mudar
  useEffect(() => {
    if (notas.length > 0) {
      localStorage.setItem("didasko-notas", JSON.stringify(notas));
    }
  }, [notas]);

  const adicionarNota = (nota) => {
    const nova = {
      id: Date.now(),
      titulo: nota.titulo || "Sem título",
      conteudo: nota.conteudo || "",
      tags: nota.tags || [],
      disciplina: nota.disciplina || "",
      cor: nota.cor || "#ffffff",
      fixada: nota.fixada || false,
      // IMPORTANTE: Salva a data escolhida no input, ou usa a data atual como fallback
      data: nota.data || new Date().toISOString(),
      criadaEm: new Date().toISOString()
    };
    // Adiciona a nova nota no início da lista
    setNotas((prev) => [nova, ...prev]);
  };

  const editarNota = (id, dadosAtualizados) => {
    setNotas((prev) =>
      prev.map((nota) =>
        nota.id === id ? { ...nota, ...dadosAtualizados } : nota
      )
    );
  };

  const excluirNota = (id) => {
    setNotas((prev) => prev.filter((nota) => nota.id !== id));
  };

  return {
    notas,
    adicionarNota,
    editarNota,
    excluirNota
  };
}