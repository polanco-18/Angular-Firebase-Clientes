import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css']
})
export class CreateClientesComponent implements OnInit {

  createCliente:FormGroup;
  submitted=false;
  loading = false;

  constructor(private fb: FormBuilder, private _clienteService:ClienteService, private router:Router,private toastr: ToastrService) {
    this.createCliente= this.fb.group({
      Nombre: ['',Validators.required],
      Apellido: ['',Validators.required],
      FechaNacimiento: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarCliente(){
    this.submitted=true;
    var f = new Date();
    var dateNow;
    if(f.getMonth() +1 < 10){
      dateNow = f.getFullYear() + "-0" + (f.getMonth() +1) + "-" +f.getDate();
    }else{
      dateNow = f.getFullYear() + "-" + (f.getMonth() +1) + "-" +f.getDate();
    }
    if(this.createCliente.invalid){
      return;
    }else if(this.createCliente.value.FechaNacimiento>dateNow){
      this.toastr.error(this.createCliente.value.FechaNacimiento+' la fecha no puede ser mayor a la de hoy','Error de fecha de nacimiento');
      return;
    }else{
      this.loading=true;
      const cliente : any = {
        Nombre:this.createCliente.value.Nombre,
        Apellido:this.createCliente.value.Apellido,
        FechaNacimiento:this.createCliente.value.FechaNacimiento,
        FechaCreacion: new Date(),
        FechaActualizacion: new Date()
      }
      this._clienteService.agregarCliente(cliente).then(()=>{
        this.toastr.success(this.createCliente.value.Nombre+' registrado con exito!','Cliente Registrado');
        this.loading=false;
        this.router.navigate(['/list-clientes']);
      }).catch(error=>{
        this.loading=false;
        this.toastr.error(error);
      })
    }
  }
}
