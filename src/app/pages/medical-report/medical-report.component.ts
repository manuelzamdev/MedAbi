import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-medical-report',
  templateUrl: './medical-report.component.html',
  styleUrls: ['./medical-report.component.css']
})
export class MedicalReportComponent implements OnInit {
  reportComplete = false;
  numbers;
  fecha = new Date().toLocaleDateString();
  datosPaciente: {
    nombre: string,
    cedula: number,
    genero: string,
    edad: number,
    peso: number,
    estatura: number,
  } = {
    nombre: '',
    cedula: 0,
    genero: '',
    edad: 0,
    peso: 0,
    estatura: 0,
  };
  datosDoctor: { nombre: string, especialidad: string } = { nombre: '', especialidad: '' };
  reporte = '';
  constructor() {
    this.numbers = Array(80).fill(0).map((x, i) => i);
  }

  ngOnInit(): void {
  }

  public exportToPDF() {
    const data = document.getElementById('exportToPDF');
    data.classList.remove('d-none');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('informe.pdf'); // Generar y guardar PDF
    });
    data.classList.add('d-none');
  }

}
