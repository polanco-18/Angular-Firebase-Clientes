import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore) {}
   agregarCliente(cliente:any){
      return this.firestore.collection('clientes').add(cliente);
  }
  getClientes(): Observable<any>{
    return this.firestore.collection('clientes', ref=>ref.orderBy('FechaCreacion','asc')).snapshotChanges();
  }
}
