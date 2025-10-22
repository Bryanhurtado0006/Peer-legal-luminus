import jsPDF from 'jspdf'

interface AnalysisData {
  caseTitle: string
  caseType: string
  summary: {
    parties: string
    facts: string[]
    legalConcepts: string[]
  }
  visualAnalysis?: {
    filename: string
    observations: string[]
    legalRelevance: string
  }
  precedents: Array<{
    id: number
    name: string
    similarity: number
    summary?: string
    relevance: string
  }>
  strategies: Array<{
    id: number
    title: string
    strengths: string[]
    weaknesses: string[]
    recommendation: string
  }>
}

export const generateAnalysisPDF = (data: AnalysisData) => {
  const doc = new jsPDF()
  
  // Colores corporativos
  const primaryBlue = [29, 78, 216] // #1d4ed8
  const darkGray = [55, 65, 81] // #374151
  const lightGray = [156, 163, 175] // #9ca3af
  const successGreen = [34, 197, 94] // #22c55e
  
  let yPos = 20
  const pageWidth = doc.internal.pageSize.getWidth()
  const marginLeft = 20
  const marginRight = 20
  const contentWidth = pageWidth - marginLeft - marginRight
  
  // =====================
  // HEADER CORPORATIVO
  // =====================
  
  // Logo cuadrado (simulado con rectángulo azul)
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.rect(marginLeft, yPos, 12, 12, 'F')
  
  // Ícono en el logo (símbolo de justicia/legal)
  doc.setFillColor(255, 255, 255)
  doc.circle(marginLeft + 6, yPos + 6, 3, 'F')
  
  // Nombre de la empresa
  doc.setFontSize(20)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'bold')
  doc.text('PEER-LEGAL', marginLeft + 16, yPos + 8)
  
  // Subtítulo
  doc.setFontSize(9)
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
  doc.setFont('helvetica', 'normal')
  doc.text('Análisis Legal Potenciado por IA', marginLeft + 16, yPos + 13)
  
  // Fecha de generación (alineada a la derecha)
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  doc.setFontSize(9)
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
  const dateText = `Generado: ${currentDate}`
  const dateWidth = doc.getTextWidth(dateText)
  doc.text(dateText, pageWidth - marginRight - dateWidth, yPos + 8)
  
  // Línea separadora
  yPos += 18
  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setLineWidth(0.5)
  doc.line(marginLeft, yPos, pageWidth - marginRight, yPos)
  
  yPos += 15
  
  // =====================
  // TÍTULO DEL REPORTE
  // =====================
  
  doc.setFontSize(16)
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFont('helvetica', 'bold')
  doc.text('REPORTE DE ANALISIS LEGAL', marginLeft, yPos)
  
  yPos += 12
  
  // =====================
  // TÍTULO DEL CASO (PROMINENTE)
  // =====================
  
  doc.setFontSize(14)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'bold')
  const caseTitleLines = doc.splitTextToSize(data.caseTitle, contentWidth)
  doc.text(caseTitleLines, marginLeft, yPos)
  yPos += caseTitleLines.length * 7 + 2
  
  // Tipo de caso con badge
  doc.setFontSize(10)
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFont('helvetica', 'normal')
  doc.text(`Tipo: ${data.caseType}`, marginLeft, yPos)
  
  yPos += 12
  
  // =====================
  // SECCIÓN 1: RESUMEN DEL CASO
  // =====================
  
  doc.setFontSize(12)
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFont('helvetica', 'bold')
  doc.text('1. RESUMEN DEL CASO', marginLeft, yPos)
  
  yPos += 10
  
  // Partes involucradas
  doc.setFontSize(10)
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'bold')
  doc.text('Partes Involucradas:', marginLeft, yPos)
  yPos += 6
  
  doc.setFont('helvetica', 'normal')
  const partiesLines = doc.splitTextToSize(data.summary.parties, contentWidth - 5)
  doc.text(partiesLines, marginLeft + 3, yPos)
  yPos += partiesLines.length * 5 + 6
  
  // Hechos relevantes
  doc.setFont('helvetica', 'bold')
  doc.text('Hechos Relevantes:', marginLeft, yPos)
  yPos += 6
  
  doc.setFont('helvetica', 'normal')
  data.summary.facts.forEach((fact, index) => {
    const factText = `${index + 1}. ${fact}`
    const factLines = doc.splitTextToSize(factText, contentWidth - 5)
    doc.text(factLines, marginLeft + 3, yPos)
    yPos += factLines.length * 5 + 3
  })
  
  yPos += 3
  
  // Conceptos legales aplicables
  doc.setFont('helvetica', 'bold')
  doc.text('Conceptos Juridicos Aplicables:', marginLeft, yPos)
  yPos += 6
  
  doc.setFont('helvetica', 'normal')
  const conceptsText = data.summary.legalConcepts.join(', ')
  const conceptsLines = doc.splitTextToSize(conceptsText, contentWidth - 5)
  doc.text(conceptsLines, marginLeft + 3, yPos)
  yPos += conceptsLines.length * 5 + 10
  
  // =====================
  // SECCIÓN 2: ANÁLISIS VISUAL (si existe)
  // =====================
  
  if (data.visualAnalysis) {
    // Verificar si necesitamos nueva página
    if (yPos > 230) {
      doc.addPage()
      yPos = 20
    }
    
    doc.setFontSize(12)
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    doc.setFont('helvetica', 'bold')
    doc.text('2. ANALISIS DE EVIDENCIA VISUAL', marginLeft, yPos)
    
    yPos += 10
    
    doc.setFontSize(10)
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFont('helvetica', 'bold')
    doc.text('Archivo Analizado:', marginLeft, yPos)
    yPos += 6
    
    doc.setFont('helvetica', 'normal')
    doc.text(data.visualAnalysis.filename, marginLeft + 3, yPos)
    
    yPos += 8
    
    doc.setFont('helvetica', 'bold')
    doc.text('Elementos Observados:', marginLeft, yPos)
    yPos += 6
    
    doc.setFont('helvetica', 'normal')
    data.visualAnalysis.observations.forEach((obs, index) => {
      const obsText = `${index + 1}. ${obs}`
      const obsLines = doc.splitTextToSize(obsText, contentWidth - 5)
      doc.text(obsLines, marginLeft + 3, yPos)
      yPos += obsLines.length * 5 + 3
    })
    
    yPos += 3
    
    doc.setFont('helvetica', 'bold')
    doc.text('Relevancia Legal:', marginLeft, yPos)
    yPos += 6
    
    doc.setFont('helvetica', 'normal')
    const relevanceLines = doc.splitTextToSize(data.visualAnalysis.legalRelevance, contentWidth - 5)
    doc.text(relevanceLines, marginLeft + 3, yPos)
    yPos += relevanceLines.length * 5 + 10
  }
  
  // =====================
  // SECCIÓN 3: PRECEDENTES JURISPRUDENCIALES
  // =====================
  
  // Nueva página si es necesario
  if (yPos > 230) {
    doc.addPage()
    yPos = 20
  }
  
  doc.setFontSize(12)
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFont('helvetica', 'bold')
  doc.text('3. PRECEDENTES JURISPRUDENCIALES RELEVANTES', marginLeft, yPos)
  
  yPos += 10
  
  data.precedents.forEach((precedent, index) => {
    // Nueva página si es necesario
    if (yPos > 240) {
      doc.addPage()
      yPos = 20
    }
    
    // Encabezado del precedente con número
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text(`Precedente ${index + 1}:`, marginLeft, yPos)
    yPos += 6
    
    // Nombre del precedente
    doc.setFontSize(10)
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    const nameLines = doc.splitTextToSize(precedent.name, contentWidth - 5)
    doc.text(nameLines, marginLeft + 3, yPos)
    yPos += nameLines.length * 5 + 4
    
    // Similitud con badge visual
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFont('helvetica', 'bold')
    doc.text('Grado de similitud:', marginLeft + 3, yPos)
    doc.setFont('helvetica', 'normal')
    doc.text(`${precedent.similarity}%`, marginLeft + 42, yPos)
    yPos += 6
    
    // Descripción (combinando summary y relevance de forma clara)
    doc.setFont('helvetica', 'bold')
    doc.text('Descripcion:', marginLeft + 3, yPos)
    yPos += 5
    
    doc.setFont('helvetica', 'normal')
    let description = ''
    
    if (precedent.summary) {
      description = precedent.summary
    }
    
    const descLines = doc.splitTextToSize(description || 'No disponible', contentWidth - 8)
    doc.text(descLines, marginLeft + 6, yPos)
    yPos += descLines.length * 5 + 4
    
    // Por qué es relevante
    doc.setFont('helvetica', 'bold')
    doc.text('Por que es relevante para este caso:', marginLeft + 3, yPos)
    yPos += 5
    
    doc.setFont('helvetica', 'normal')
    const relevanceLines = doc.splitTextToSize(precedent.relevance, contentWidth - 8)
    doc.text(relevanceLines, marginLeft + 6, yPos)
    yPos += relevanceLines.length * 5 + 8
    
    // Separador visual entre precedentes (excepto el último)
    if (index < data.precedents.length - 1) {
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
      doc.setLineWidth(0.2)
      doc.line(marginLeft, yPos, pageWidth - marginRight, yPos)
      yPos += 6
    }
  })
  
  yPos += 4
  
  // =====================
  // SECCIÓN 4: ESTRATEGIAS ARGUMENTALES
  // =====================
  
  // Nueva página
  doc.addPage()
  yPos = 20
  
  doc.setFontSize(12)
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFont('helvetica', 'bold')
  doc.text('4. ESTRATEGIAS ARGUMENTALES RECOMENDADAS', marginLeft, yPos)
  
  yPos += 10
  
  data.strategies.forEach((strategy, index) => {
    // Nueva página si es necesario
    if (yPos > 220) {
      doc.addPage()
      yPos = 20
    }
    
    // Encabezado de la estrategia
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.text(`Estrategia ${index + 1}:`, marginLeft, yPos)
    yPos += 6
    
    // Título de la estrategia
    doc.setFontSize(10)
    doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
    const titleLines = doc.splitTextToSize(strategy.title, contentWidth - 5)
    doc.text(titleLines, marginLeft + 3, yPos)
    yPos += titleLines.length * 5 + 4
    
    // Nivel de recomendación con badge
    doc.setFontSize(9)
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFont('helvetica', 'bold')
    doc.text('Nivel de recomendacion:', marginLeft + 3, yPos)
    
    const recColor = strategy.recommendation === 'Altamente recomendada' 
      ? successGreen  // Verde
      : [59, 130, 246]  // Azul
    doc.setFillColor(recColor[0], recColor[1], recColor[2])
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'normal')
    const badgeWidth = doc.getTextWidth(strategy.recommendation) + 6
    doc.rect(marginLeft + 50, yPos - 3, badgeWidth, 5, 'F')
    doc.text(strategy.recommendation, marginLeft + 53, yPos)
    
    yPos += 8
    
    // Fortalezas
    doc.setFontSize(10)
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFont('helvetica', 'bold')
    doc.text('Fortalezas:', marginLeft + 3, yPos)
    yPos += 5
    
    doc.setFont('helvetica', 'normal')
    strategy.strengths.forEach((strength) => {
      const strengthText = `+ ${strength}`
      const strengthLines = doc.splitTextToSize(strengthText, contentWidth - 8)
      doc.text(strengthLines, marginLeft + 6, yPos)
      yPos += strengthLines.length * 5 + 2
    })
    
    yPos += 3
    
    // Debilidades
    doc.setFont('helvetica', 'bold')
    doc.text('Debilidades:', marginLeft + 3, yPos)
    yPos += 5
    
    doc.setFont('helvetica', 'normal')
    strategy.weaknesses.forEach((weakness) => {
      const weaknessText = `- ${weakness}`
      const weaknessLines = doc.splitTextToSize(weaknessText, contentWidth - 8)
      doc.text(weaknessLines, marginLeft + 6, yPos)
      yPos += weaknessLines.length * 5 + 2
    })
    
    yPos += 8
    
    // Separador visual entre estrategias (excepto la última)
    if (index < data.strategies.length - 1) {
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
      doc.setLineWidth(0.2)
      doc.line(marginLeft, yPos, pageWidth - marginRight, yPos)
      yPos += 6
    }
  })
  
  // =====================
  // FOOTER EN TODAS LAS PÁGINAS
  // =====================
  
  const totalPages = doc.getNumberOfPages()
  
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    
    // Línea superior del footer
    const footerY = doc.internal.pageSize.getHeight() - 20
    doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
    doc.setLineWidth(0.3)
    doc.line(marginLeft, footerY, pageWidth - marginRight, footerY)
    
    // Texto del footer
    doc.setFontSize(8)
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
    doc.setFont('helvetica', 'normal')
    doc.text('PEER-LEGAL - Análisis Legal con IA', marginLeft, footerY + 5)
    
    // Número de página
    const pageText = `Página ${i} de ${totalPages}`
    const pageTextWidth = doc.getTextWidth(pageText)
    doc.text(pageText, pageWidth - marginRight - pageTextWidth, footerY + 5)
    
    // Disclaimer
    doc.setFontSize(7)
    const disclaimer = 'Este documento es generado automáticamente y debe ser revisado por un profesional legal.'
    const disclaimerWidth = doc.getTextWidth(disclaimer)
    doc.text(disclaimer, (pageWidth - disclaimerWidth) / 2, footerY + 10)
  }
  
  // Guardar el PDF
  const fileName = `Analisis_${data.caseTitle.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

