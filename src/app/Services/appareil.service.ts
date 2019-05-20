import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Injectable()
export class AppareilService {

  appareilsSubject = new Subject<any[]>(); 

    private appareils = [];

      constructor(private httpClient : HttpClient) {}

      getAppareilById(id: number) {
        const appareil = this.appareils.find(
          (appareilObject) => {
            return appareilObject.id === id; 
          }
        );
          return appareil; 
      }

      emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
      }

      switchOnAll() {
          for(let appareil of this.appareils) {
              appareil.status = 'allumé';
          }
          this.emitAppareilSubject(); 
      }

      switchOffAll() {
          for(let appareil of this.appareils) {
              appareil.status = 'éteint';
              this.emitAppareilSubject(); 
          }
      }

      switchOnOne(i: number) {
          this.appareils[i].status = 'allumé';
          this.emitAppareilSubject(); 
      }

      switchOffOne(i: number) {
          this.appareils[i].status = 'éteint';
          this.emitAppareilSubject(); 
      }

      addAppareil(name: string, status: string) {
        // On instancie un nouvel appareil
        const appareilObject = {
          id: 0,
          name: '',
          status: ''
        }; 
        // Récupère le nom et status de l'appareil 
        appareilObject.name = name;
        appareilObject.status = status; 
        // Prend le dernier id de la liste et ajoute + 1
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id +1; 

        // ajoute le nouvel appareil à la liste
        this.appareils.push(appareilObject); 
        // Emet le subject
        this.emitAppareilSubject(); 
      }

      saveAppareilsToServeur() {
        this.httpClient
        .put('https://http-client-demo-c4a11.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
          () => {
            console.log('Enregistrement terminé !');
          },
          (error) => {
            console.log('Erreur de sauvegarde ! ' + error); 
          }
        ) 
      }

      getAppareilsFromServeur() {
        this.httpClient
        .get<any[]>('https://http-client-demo-c4a11.firebaseio.com/appareils.json')
        .subscribe(
          (response) => {
            this.appareils = response; 
            this.emitAppareilSubject(); 
          },
          (error) => {
            console.log('Erreur de chargement ! ' + error); 
          }
        );
      }
  
}