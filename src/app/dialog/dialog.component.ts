import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public dialogTitle: string;
  public dialogMessage: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

}