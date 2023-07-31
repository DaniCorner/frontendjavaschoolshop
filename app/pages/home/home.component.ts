import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movieImages: string[] = [];
  randomImage: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovieImages();
  }

  loadMovieImages() {
    this.http.get('assets/galery/imageList.json').subscribe((data: { images: string[] }) => {
      this.movieImages = data.images;
      this.randomImage = this.getRandomImage();
    });
  }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.movieImages.length);
    return this.movieImages[randomIndex];
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 1420) + 1;
  }
}