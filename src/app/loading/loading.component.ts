import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../services/loading.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {interval} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s 0s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.5s 0s ease-in-out')
      ]),
    ]),
  ],
})
export class LoadingComponent implements OnInit {

  public loadingFlag: boolean = true;
  public isYellow: boolean = true;

  constructor(private _loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this._loadingService.status.subscribe((newStatus: boolean) => {
      this.loadingFlag = newStatus;
    });
    setInterval(() => {
      this.toggle()
    }, 3000);
  }

  toggle() {
    this.isYellow = !this.isYellow;
  }

}
