import { Component } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file-converter',
  templateUrl: './file-converter.component.html',
  styleUrl: './file-converter.component.scss',
})
export class FileConverterComponent {
  file: File | null = null;

  constructor(private fileService: FileService) {}

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
    }
  }

  convertFile() {
    if (this.file) {
      this.fileService
        .convertTxtToExcel(this.file)
        .then(() => {
          alert('Conversion successful!');
        })
        .catch((err) => {
          console.error('Error during conversion:', err);
          alert('Conversion failed!');
        });
    } else {
      alert('Please select a file first.');
    }
  }
}
