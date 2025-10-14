import { Component } from '@angular/core';
import { SinginForm } from "../../components/singin-form/singin-form";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [SinginForm, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {

}
