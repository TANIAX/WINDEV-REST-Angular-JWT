import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/Services/client-service.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({
    UUIDClient : new FormControl(''),
    eMail: new FormControl(null, [Validators.required]),
    Civilite: new FormControl(null, [Validators.required]),
    Nom: new FormControl(null, [Validators.required]),
    Prenom: new FormControl(null, [Validators.required]),
    TelPortable: new FormControl(),
  });
  error: string = "";
  UUIDClient: string = "";
  client: Client;
  labelActionButton: string = "";
  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router,private toastr: ToastrService,) { }

  ngOnInit(): void {
    //Initialise form
    this.clientForm.setValue({
      'UUIDClient' : '',
      'eMail': '',
      'Civilite': "1",
      'Nom': '',
      'Prenom': '',
      'TelPortable': '',
    });
    //Prends le param si param == add alors ne pas faire de requête au backend !
    this.route.params
      .subscribe(
        (params: Params) => {
          this.UUIDClient = params['id'];
        }
      );

    // Requête au backend
    if (this.UUIDClient != "" && this.UUIDClient != "Add") {
      this.clientService.getClient(this.UUIDClient).subscribe((response: Client) => {
        this.client = response;
        console.log(this.client)
        this.clientForm.setValue({
          'UUIDClient' :this.client.UUIDClient,
          'eMail': this.client.eMail,
          'Civilite': this.client.Civilite.toString(),
          'Nom': this.client.Nom,
          'Prenom': this.client.Prenom,
          'TelPortable': this.client.TelPortable,
        });
        this.labelActionButton = "Modifier"
      }, error => {
        
      });
    } else {
      this.labelActionButton = "Ajouter"
    }
  }

  submit() {
    if (!this.clientForm.valid)
      return false;

    if (this.UUIDClient == "Add") {
      this.clientForm.controls['Civilite'].setValue(+this.clientForm.get('Civilite').value);
      this.clientService.addClient(this.clientForm.value).subscribe(response => {
        this.toastr.success("Client ajouté", "", {
          timeOut: 3000
        });
      }, error => {
        this.error = error?.error?.fault?.faultstring;
      });
    }else{
      this.clientForm.controls['Civilite'].setValue(+this.clientForm.get('Civilite').value);
      this.clientService.editClient(this.clientForm.value).subscribe(response => {
        this.toastr.success("Client modifié", "", {
          timeOut: 3000
        });
      }, error => {
        this.error = error?.error?.fault?.faultstring;
      });
    }
  }
  closeError(){
    this.error = "";
  }
}
