import { CHART_START_DATE, CHART_END_DATE } from "./cronogramaData.js"; // <-- 'C' MAIÚSCULO AQUI!

// --- Funções do Gantt Chart ---

export function dateDiffInDays(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

export function getGridColumnStart(dateStr, chartStartDate) {
  const diff = Math.ceil(
    (new Date(dateStr).getTime() - new Date(chartStartDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return diff + 2; // +2 porque coluna 1 = disciplinas, col 2 = primeiro dia
}

export function getGridColumnSpan(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return diff;
}

// --- Funções de geração de calendário (Gantt) ---

function getChartDays() {
  const days = [];
  let current = new Date(CHART_START_DATE);
  const last = new Date(CHART_END_DATE);
  while (current <= last) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
}

export const chartDays = getChartDays();
export const totalChartDays = chartDays.length;

export const monthsData = chartDays.reduce((acc, day) => {
  const monthFormat = new Intl.DateTimeFormat("pt-BR", { month: "long" });
  const monthName = monthFormat
    .format(day)
    .replace(/^\w/, (c) => c.toUpperCase());
  const year = day.getFullYear();
  const key = `${monthName}-${year}`;

  const existing = acc.find((m) => m.key === key);
  if (existing) {
    existing.dayCount++;
  } else {
    acc.push({ key, name: monthName, dayCount: 1 });
  }
  return acc;
}, []);

// --- Funções do Widget de Atividades ---

export const formatarData = (dataString) => {
  const data = new Date(dataString);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
};

export const getClasseData = (dataEntrega) => {
  const hoje = new Date();
  const entrega = new Date(dataEntrega);
  // Normaliza para meia-noite para comparações de dia
  hoje.setHours(0, 0, 0, 0);
  entrega.setHours(0, 0, 0, 0);

  const diffTime = entrega.getTime() - hoje.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "hoje";
  if (diffDays === 1) return "amanha";
  if (diffDays > 1 && diffDays <= 3) return "proximo";
  if (diffDays < 0) return "atrasado"; // Classe para datas passadas
  return "";
};

export const getStatus = (dataEntrega) => {
  const hoje = new Date();
  const entrega = new Date(dataEntrega);
  hoje.setHours(0, 0, 0, 0);
  entrega.setHours(0, 0, 0, 0);

  if (entrega < hoje) return "atrasado";
  // Se a data de entrega for hoje ou no futuro
  return "pendente";
};
