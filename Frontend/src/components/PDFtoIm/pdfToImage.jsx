import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/build/pdf.worker.entry";

export const convertPdfToImages = async (file) => {
  const images = [];
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 }); // Adjust scale for quality
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport }).promise;
    images.push(canvas.toDataURL("image/png")); // Convert to data URL
  }
  
  return images;
};
