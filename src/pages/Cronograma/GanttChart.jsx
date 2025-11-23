import React, { useState } from "react";
import "./GanttChart.css";

import { tasksData, CHART_START_DATE } from "./cronogramaData.js";

import {
  chartDays,
  totalChartDays,
  monthsData,
  getGridColumnStart,
  getGridColumnSpan,
  dateDiffInDays,
} from "./dateUtils";

// --- componente Gantt ---
export default function GanttChart({
  leftColumnWidth = 140,
  dayMinWidth = 32,
  height = "420px",
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const groupedTasks = tasksData.reduce((acc, task) => {
    if (!acc[task.subject]) {
      acc[task.subject] = [];
    }
    acc[task.subject].push(task);
    return acc;
  }, {});

  const subjects = Object.keys(groupedTasks);
  const totalRows = subjects.reduce(
    (total, subject) => total + groupedTasks[subject].length,
    0
  );

  const gridColumns = `${leftColumnWidth}px repeat(${totalChartDays}, minmax(${dayMinWidth}px, auto))`;
  const gridRows = `auto auto repeat(${totalRows}, 48px)`;
  const minWidthPx = leftColumnWidth + totalChartDays * dayMinWidth;

  let cumul = 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="gantt-container widget" style={{ padding: 12 }}>
      <div className="gantt-header">
        {/* ... (código do header do gantt) ... */}
        <h3>Gerenciamento de Tarefas</h3>
        <button className="expand-btn" onClick={toggleExpand}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isExpanded ? (
              <path d="M6 9l6 6 6-6" />
            ) : (
              <path d="M6 15l6-6 6 6" />
            )}
          </svg>
          {isExpanded ? "Contrair" : "Expandir"}
        </button>
      </div>

      <div
        className={`gantt-chart-wrapper ${isExpanded ? "expanded" : ""}`}
        style={{ maxHeight: isExpanded ? "600px" : height }}
      >
        <div
          className="gantt-grid"
          style={{
            gridTemplateColumns: gridColumns,
            gridTemplateRows: gridRows,
            minWidth: `${minWidthPx}px`,
          }}
        >
          {/* Cabeçalho de Disciplinas */}
          <div
            className="gantt-header-cell subjects-header"
            style={{
              gridColumn: 1,
              gridRow: "1 / span 2",
              width: leftColumnWidth,
            }}
          >
            Disciplinas
          </div>

          {/* Cabeçalho de Meses */}
          {monthsData.map((month, i) => {
            const startCol = 2 + cumul;
            cumul += month.dayCount;
            return (
              <div
                key={month.key}
                className="gantt-header-cell month-header"
                style={{
                  gridColumn: `${startCol} / span ${month.dayCount}`,
                  gridRow: 1,
                  padding: "6px 8px",
                }}
              >
                {month.name}
              </div>
            );
          })}

          {/* Filler (canto superior esquerdo) */}
          <div
            className="gantt-header-cell date-header-filler"
            style={{ gridColumn: 1, gridRow: 2 }}
          ></div>

          {/* Cabeçalho de Dias */}
          {chartDays.map((d, idx) => {
            const col = 2 + idx;
            return (
              <div
                key={d.toISOString()}
                className="gantt-header-cell date-header"
                style={{ gridColumn: col, gridRow: 2, padding: "4px 6px" }}
              >
                {d.getDate()}
              </div>
            );
          })}

          {/* Renderização das Tarefas */}
          {(() => {
            let currentRow = 3;
            const elements = [];

            // ================================================
            // LÓGICA DE ZEBRA CORRIGIDA
            // ================================================

            // 1. Adicionamos 'subjectIndex' ao loop de Disciplinas
            subjects.forEach((subject, subjectIndex) => {
              // 2. Definimos a classe AQUI, baseada no índice da DISCIPLINA
              // (Hermenêutica será 0 (par), Português 1 (ímpar), etc.)
              const rowClass =
                subjectIndex % 2 !== 0 ? "gantt-row-odd" : "gantt-row-even";

              const subjectTasks = groupedTasks[subject];

              subjectTasks.forEach((task, taskIndex) => {
                // Célula da Disciplina (ocupa várias linhas)
                if (taskIndex === 0) {
                  const rowSpan = subjectTasks.length;
                  elements.push(
                    <div
                      key={`subject-${task.id}`}
                      className="gantt-row-header"
                      style={{
                        gridColumn: 1,
                        gridRow: `${currentRow} / span ${rowSpan}`,
                        minWidth: leftColumnWidth,
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {subject}
                    </div>
                  );
                }

                // 3. Aplicamos o DIV de fundo usando a 'rowClass' da disciplina
                elements.push(
                  <div
                    key={`bg-${task.id}`}
                    className={`gantt-row-background ${rowClass}`}
                    style={{ gridRow: currentRow }}
                  />
                );

                // Barra da Tarefa
                const colStart = getGridColumnStart(
                  task.start,
                  CHART_START_DATE
                );
                const span = getGridColumnSpan(task.start, task.end);

                elements.push(
                  <div
                    key={`bar-${task.id}`}
                    className="gantt-task-bar-wrapper"
                    style={{
                      gridColumn: `${colStart} / span ${span}`,
                      gridRow: currentRow,
                      padding: "6px 8px",
                    }}
                  >
                    <div
                      className="gantt-task-bar-light"
                      style={{
                        backgroundColor: `${task.color}22`,
                        height: "36px",
                        borderRadius: 8,
                      }}
                    >
                      <div
                        className="gantt-task-bar-dark"
                        style={{
                          backgroundColor: task.color,
                          width: "60%",
                          height: "100%",
                          borderRadius: 8,
                        }}
                      />
                      <div className="gantt-task-info">
                        <span style={{ fontWeight: 700 }}>{task.title}</span>
                        <span className="task-days-left">
                          {dateDiffInDays(
                            new Date().toISOString().split("T")[0],
                            task.end
                          )}{" "}
                          dias
                        </span>
                      </div>
                    </div>
                  </div>
                );

                // Incrementa a linha para a próxima tarefa
                currentRow++;
              });
            });

            return elements;
          })()}
        </div>
      </div>
    </div>
  );
}
