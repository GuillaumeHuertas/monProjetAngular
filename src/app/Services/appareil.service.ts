import { Subject } from 'rxjs/Subject';

export class AppareilService {

  appareilsSubject = new Subject<any[]>(); 

    private appareils = [
        {
          id: 1, 
          name: 'Machine à laver',
          status: 'éteint'
        },
        {
          id: 2,
          name: 'Frigo',
          status: 'allumé'
        },
        {
          id: 3,
          name: 'Ordinateur',
          status: 'éteint'
        }
      ];

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
  
}