import { Component, OnInit } from '@angular/core';
import { RespuestaTopHeadLines } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  
  aux_art: any;

  constructor(private noticiasService: NoticiasService) {

  }

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData (event){
    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias ( event? ){
    this.noticiasService.getTopHeadLines()
    .subscribe( resp => {
      console.log('noticias', resp);

      if( resp.articles.length === 0){
        event.target.disabled = true;
        return;
      }

      this.noticias.push(...resp.articles);
      /*this.aux_art = resp;
      this.noticias.push(...this.aux_art.articles);*/

      if(event){
        event.target.complete();
      }

    });

  }

}
