import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../providers/auth-service/auth-service";
import {MensajesProvider} from "../../providers/mensajes/mensajes";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginError: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private mensaje: MensajesProvider,

  ) {
    this.loginForm = this.buildLoginForm();
  }

  doLogin(event: Event) {
    event.preventDefault();

    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      //email: data.email,
      //password: data.password
      email: 'raul.tahiche.daw@gmail.com',
      password: 'secret'
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot('TabsPage'),
        (error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.loginError = 'El email introducido no es válido. Introduce un email correcto';
              break;
            case 'auth/wrong-password':
              this.loginError = 'La contraseña no es correcta o está vacía. Introduce una contraseña correcta ';
              break;
            case 'auth/user-not-found':
              this.loginError = 'El usuario no existe. Introduce un usuario que exista';
              break;
            default:
              this.loginError = error.message;
          }
          this.mensaje.crearToast(this.loginError);
        }
      );
  }

  private buildLoginForm() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }




}
