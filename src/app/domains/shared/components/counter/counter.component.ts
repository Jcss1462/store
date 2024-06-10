import { Component, Input, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  @Input({required:true}) duration: number =0
  @Input({required:true}) message: string ="";
  counter = signal(0);
  counterRef: number | undefined;

  constructor(){
    //NO ASYNC
    //before render
    console.log("Constructor");
    console.log("-".repeat(10));
  }

  ngOnChanges(change : SimpleChanges){
    //before and duringrender
    console.log("ngOnChanges");
    console.log(change);
    console.log("-".repeat(10));
  }

  ngOnInit(){
    //after render
    //se ejecuta una sola vez
    //perfecto para solicitudes asincronas
    console.log("ngOnInit");
    console.log("Duration =>",this.duration);
    console.log("Message =>",this.message);
    console.log("-".repeat(10));

    this.counterRef = window.setInterval(() => {
      console.log('run interval')
      this.counter.update(statePrev => statePrev + 1);
    }, 1000);
  }


  ngAfterViewInit(){
    //after render
    //despues de que los hijos del componente fueran renderizados
    console.log("ngAfterViewInit");
    console.log("-".repeat(10));
  }

  ngOnDestroy(){
    console.log("ngOnDestroy");
    window.clearInterval(this.counterRef);
  }

}
