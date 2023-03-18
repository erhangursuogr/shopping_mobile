import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthModel } from './models/auth-model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  email: string = "test@test.com";
  password: string = "test";

  constructor(
    private authService: AuthService,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login() {
    const authModel: AuthModel = new AuthModel();
    authModel.email = this.email;
    authModel.password = this.password;
    this.authService.login(authModel).subscribe({
      next: (res: any) => {
        console.log(res.data.token);
        localStorage.setItem('token', res.data.token);
        this.router.navigate(['/tabs/basket']);
        this.toastr.create({
          message: 'Login successful',
          duration: 2000
        }).then(toast => toast.present());
      }, error: (err: any) => console.log(err)
    });
  }

  logout() {
    this.authService.logout();
  }
}
