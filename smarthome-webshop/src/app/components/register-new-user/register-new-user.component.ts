import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators, EmailValidator } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.scss']
})
export class RegisterNewUserComponent implements OnInit {

  FormGroup: any;
  isEditable = false;

  srcResult: string = ""
  url: any

  imageChangedEvent: any = '';
  croppedImage: any = '';
  username: string = "no username"
  email: string = "no email"
  password: string = "no password"
  default_avatar_path: string = "/assets/default_avatar.png"


  @ViewChild('stepper') stepper: any;


  constructor(
    private accountService: AccountService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    this.FormGroup = new UntypedFormGroup({
      standartCtrl: new UntypedFormControl('', Validators.required),
      emailCtrl: new UntypedFormControl('', [Validators.required, Validators.email]),
      passwordCtrl: new UntypedFormControl('', [Validators.required]),
      // profilePictureCtrl: new FormControl('', Validators.required),
    })
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: any) {
    this.croppedImage = event.base64;
    this.username = this.FormGroup.get('standartCtrl').value
    this.email = this.FormGroup.get('emailCtrl').value

  }

  loadImageFailed() {
    // show message
  }

  readDefaultPhoto(event: any) {
    var reader = new FileReader();
    reader.onload = (_event) => {
      this.url = reader.result;
      this.srcResult = event.target.files[0];
    }
  }

  onNext(){
    this.username = this.FormGroup.get('standartCtrl').value
    this.email = this.FormGroup.get('emailCtrl').value
  }

  onSubmitRegistration() {
    const username = this.FormGroup.get('standartCtrl').value
    const password = this.FormGroup.get('passwordCtrl').value
    const email = this.FormGroup.get('emailCtrl').value
    const uploadData = new FormData()
    uploadData.append('username', username)
    uploadData.append('password', password)
    uploadData.append('email', email)
    this.accountService.registerNewUser(uploadData)
      .subscribe(
        () => {
          this.accountService.login(username, password).subscribe(
            () => {
              this.router.navigateByUrl('/webshop/product-list')
              this.sharedService.customerMessage.next(`Willkommen ${username}, Ihr Account wurde erfolgreich angelegt`)
            }

          )
        },
        err => {
          this.sharedService.customerMessage.next(Object.values(err.error).join(" "))
        }
      )
  }
}


