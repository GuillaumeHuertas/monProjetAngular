import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService} from '../Services/appareil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  appareils: any[]; 
  appareilSubscription: Subscription; 


  isAuth = false; 
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date(); 
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    ); 
  });  

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils; 
      }
    );
    this.appareilService.emitAppareilSubject(); 
    // Permet de charger automatiquement les appareils enregistrés sur le serveur
    this.appareilService.getAppareilsFromServeur(); 
  }

  onAllumer() {
    this.appareilService.switchOnAll(); 
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appreils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  onSave() {
    this.appareilService.saveAppareilsToServeur(); 
  }

  onFetch() {
    this.appareilService.getAppareilsFromServeur(); 
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe(); 
  }

}
