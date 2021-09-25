import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<t>( query: string ) {

    query = apiUrl + query;

    return this.http.get<t>( query, { headers } );

  } 

  getTopHeadLines (){

    this.headLinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${ this.headLinesPage }`);
    //return this.http.get<RespuestaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=us&apiKey=2e2deee5e71e4e2792dc3ab4a488d51f');
  }

  getTopHeadCategoria (categoria: string){

    if(this.categoriaActual === categoria){
      this.categoriaPage++
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
    //return this.http.get<RespuestaTopHeadLines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2e2deee5e71e4e2792dc3ab4a488d51f');
  }

}
