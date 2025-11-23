import { useState } from 'react';

export function useFileUpload() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        // Se for evento de input
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        
        const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');

        if (pdfFiles.length !== selectedFiles.length) {
            alert('Apenas arquivos PDF são permitidos.');
        }

        if (files.length + pdfFiles.length > 5) {
            alert('Você pode anexar no máximo 5 arquivos.');
            return;
        }

        setFiles(prev => [...prev, ...pdfFiles]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return {
        files,
        handleFileChange,
        removeFile
    };
}