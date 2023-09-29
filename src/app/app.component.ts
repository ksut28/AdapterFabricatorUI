import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  fileToUpload: File | null = null;
  zipFile: Blob | null = null;

  constructor(private http: HttpClient) {
  }

  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  uploadSwagger() {
    if (this.fileToUpload) {
      const formData = new FormData();
      formData.append('swaggerFile', this.fileToUpload);

      this.downloadFile(formData).subscribe(response  => {
        const link = response.link;
        window.open(link, '_blank'); // Open the link in a new tab
      });
    }
  }

  downloadFile(formData: any) {
    const url = 'https://adapter-production.up.railway.app/api/generate'; // Replace with your server URL
    return this.http.post<ApiResponse>(url, formData);
  }
}
interface ApiResponse {
  code: string;
  link: string;
}
