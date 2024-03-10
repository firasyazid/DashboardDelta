import { Component, OnInit } from '@angular/core';
 import { Code, CodeService } from '@eshop/orders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-codep-form',
  templateUrl: './codeform.component.html',
  styles: [],
})
export class CodeformComponent implements OnInit {


  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  code: Code[] = [];
  currentCodeId!: string;

  constructor( private messageService: MessageService,
    private formBuilder: FormBuilder,
    private codeService :CodeService,
    private location: Location,
    private route: ActivatedRoute
) { }

  ngOnInit(): void {

    this._initCodeForm();
    this._checkEditMode();


  }

  private _initCodeForm() {
    this.form = this.formBuilder.group({
      codep: ['', Validators.required],
      isSubmitt: ['',Validators.required],
      pourcentage: ['', Validators.required],
       
    });
  }
  onCancle() {
    this.location.back();
  }


  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editmode = true;
        this.currentCodeId = params['id'];
        this.codeService.getcodee(params['id']).subscribe((codee) => {
          this.CodeForm['codep'].setValue(codee.codep);
          this.CodeForm['isSubmitt'].setValue(codee.isSubmitt);
          this.CodeForm['pourcentage'].setValue(codee.pourcentage);
         });
      }
    });
  }

  get CodeForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const codep: Code = {
      id: this.currentCodeId,
      codep: this.CodeForm['codep'].value,
      isSubmitt: this.CodeForm['isSubmitt'].value,
      pourcentage: this.CodeForm['pourcentage'].value,

    };
    if (this.editmode) {
      this._updateCode(codep);
    } else {
      this._addCode(codep);
    }
  }

  private _addCode(code: Code) {
    this.codeService.createCode(code).subscribe(
      (code: Code) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Code ${code.codep} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Code is not created!'
        });
      }
    );
  }

   _updateCode(code:Code){ 

    this.codeService.updateCode(code).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'code is updated!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'code is not updated!'
        });
      }
    );   }
}
