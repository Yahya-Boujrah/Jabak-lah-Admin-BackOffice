import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPenToSquare, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/app/interfaces/Client.interface';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { ClientService } from 'src/app/services/Client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faRotateLeft = faRotateLeft;
  editClient!: Client;
  deleteClient!: Client;
  resetClient!: Client;
  accountType:string ='Hssab 1 - Plafond : 200 DH';
  
  clientResponse!: CustomResponse;
  public dataSubject = new BehaviorSubject<any>(null);

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
      this.clientService.clients$.subscribe(response => {
        this.dataSubject.next(response); 
        
        this.clientResponse = response;
         this.clientResponse = { ...response , data: { clients: response.data.clients?.reverse() } } ;
      })
    }
  
    addClient(addForm: NgForm){
      this.clientService.saveClient$(addForm.value).subscribe(response => {
        this.dataSubject.next(
          {...response, data: {clients: [response.data.client, ...this.dataSubject.value.data.clients ]}}
        )
        this.clientResponse = this.dataSubject.value;
      });
      addForm.reset();
    }

    updateClient(client: Client) {
      this.clientService.updateClient$(client.id as number, client).subscribe(
        response => {
          if (response.data && response.data.client) {
            const updatedClient = response.data.client;
            const updatedClients = this.dataSubject.value.data.clients.map((c: Client) => {
              if (c.id === updatedClient.id) {
                return { ...c, ...updatedClient };
              }
              return c;
            });
    
            this.dataSubject.next({
              ...response,
              data: {
                ...this.dataSubject.value.data,
                clients: updatedClients
              }
            });
    
            this.clientResponse = this.dataSubject.value;
          } else {
            console.error('Invalid response or missing client data.');
          }
        },
        error => {
          console.error('Failed to update client:', error);
        }
      );
    }
    
  
  reset(client: Client) {
    this.clientService.resetPassword$(client.id as number).subscribe();
  }


    delete(client: Client): void {
      console.log(client.username)
      this.clientService.deleteClient$(client.id as number).subscribe(response => {
        this.dataSubject.next(
          {...response, data: 
            { clients: this.dataSubject.value.data.clients.filter( (cl: { id: number | undefined; }) => cl.id !== client.id)}
          }
        )
        this.clientResponse = this.dataSubject.value;
    })
  }

  onOpenModal(client: any, mode: string){

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode === 'add'){
      button.setAttribute('data-bs-target', '#addModal');
      console.log("add")
    }
    if(mode === 'edit'){
      this.editClient = client;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if(mode === 'reset'){
      this.resetClient = client;
      button.setAttribute('data-bs-target', '#resetModal');
    }
    if(mode === 'delete'){
      this.deleteClient = client;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
