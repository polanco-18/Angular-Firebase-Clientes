import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent implements OnInit {
  clientes:any[]=[];
  promedio : number;
  desviacion : number;
  constructor(private _clienteService : ClienteService) {
  }

  ngOnInit(): void {
    this.getClientes();
  }
  getClientes(){
    this._clienteService.getClientes().subscribe(data=>{
      this.clientes=[];
      data.forEach((element:any) => {
        this.clientes.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      var f = new Date();
      var dateNow;
      if(f.getMonth() +1 < 10){
        dateNow = f.getDate() + "-0" + (f.getMonth() +1) + "-" + f.getFullYear();
      }else{
        dateNow = f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear();
      }
      for (let i = 0; i < this.clientes.length; i ++) {
        const fechaNacimiento = this.clientes[i].FechaNacimiento;
        //restar fecha
        const convertAge = new Date(fechaNacimiento);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        var Edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        this.clientes[i].Edad = Edad;
      }
      this.getPromedio();
    })
  }

  getPromedio(){
    var promedio = 0;
    for (let i = 0; i < this.clientes.length; i ++) {
      promedio = promedio + parseInt(this.clientes[i].Edad);
    }
    this.promedio = promedio / this.clientes.length;
    this.getDesviacion();
  }
  getDesviacion(){
    var desviacion =0;
    for (let i = 0; i < this.clientes.length; i ++) {
      desviacion = ((parseInt(this.clientes[i].Edad)-this.promedio)*(parseInt(this.clientes[i].Edad)-this.promedio)) + desviacion;
    }
    this.desviacion=Math.sqrt(desviacion/(this.clientes.length-1));
  }


}
