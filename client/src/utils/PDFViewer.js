import { pdfjs, Document, Page } from 'react-pdf'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {  SET_PDF_PAGES } from '../redux/logic/projectManager/invoiceSlice';
import { invoiceScale } from '../redux/ui/invoiceUiSlice';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PDFViewer = ({ page, file }) =>
{
  const dispatch = useDispatch();
  const scale = useSelector(invoiceScale);
  return (
    <Document
      file={file}
      onLoadSuccess={({ numPages }) =>
      {
        dispatch(SET_PDF_PAGES({ pages: numPages }))
      }}>
      <Page renderMode='canvas' pageNumber={page} scale={scale} />
    </Document>
  )
}

export default PDFViewer