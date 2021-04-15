import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {Client} from './../../model/client';
import {ClientService} from './../../Services/client-service.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {
  clients : Client[] = []
  displayedColumns: string[] = ['select', 'eMail', 'Nom', 'TelPortable'];
  dataSource: MatTableDataSource<Client>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Client>(true, []);
  CheckboxSelected : number = 0

  constructor(private clientService : ClientService, private router : Router) {

    this.clientService.getClientList().subscribe(response =>{
      this.clients = (response as Client[])
      this.initializeTable();
    },error =>{
      console.log(error)
    });  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  initializeTable(){
    this.dataSource = new MatTableDataSource(this.clients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      if(this.dataSource?.data != null){
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.dataSource.data != undefined){
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
      }
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Client): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    SelectCheckbox(event: any) {
      if (event.checked) {
        this.CheckboxSelected++; 
      }
      else {
        this.CheckboxSelected--;
      }
    }
    getElementsSelected() {
      return this.selection.selected;
    }
    Edit() {
      let client = this.getElementsSelected(); // Should retrieve only 1 element
      this.router.navigate(['Client/'+client[0].UUIDClient]);
    }
    Delete(){
      let clientList = [];
      let clientListToDel = [];
      let error = "";

    this.selection.selected.forEach(element => {
      clientList.push(element.UUIDClient);
    });

    clientList.forEach(elem => {
      this.clientService.deleteClient(elem).subscribe(response =>{
        clientListToDel.push(elem);
      },error=>{
        console.log(error)
        error += "Impossible de supprimer le client portant l'identifiant : " + elem;
    });

      this.selection.selected.forEach(item => {
        let index: number = this.clients.findIndex(d => d === item);
        this.clients.splice(index, 1)
        this.dataSource = new MatTableDataSource<Client>(this.clients);
      });
      this.selection = new SelectionModel<Client>(true, []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
    this.CheckboxSelected = 0;
  }

  getCivilite(civ : number){
    if(civ === 1){
      return "Mr.";
    }
    else{
      return "M."
    }
  }
}
