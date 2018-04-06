import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from "@angular/forms";

@Component({
  selector: 'validated-input',
  template: `
    <div class="form-group has-feedback" [formGroup]="formGroup" [ngClass]="{'has-error':!control.valid}">
      <label for="inputField" class="col-sm-2 control-label">{{label}}</label>
      <div class="col-sm-3">
        <input type="text" class="form-control" formControlName="control"
               id="inputField" placeholder="Enter Name Server">
        <span *ngIf="!control.valid" class="glyphicon glyphicon-remove form-control-feedback"></span>
        <h6 *ngIf="!control.valid" class="form-text text-danger">{{errorMessage}}</h6>
      </div>
      <div *ngIf="control.dirty && control.valid">
        <h5>
          <span class="label label-primary">Changed.</span>
        </h5>
      </div>
    </div>
  `,
  styleUrls: ['./system-global-settings.component.css']
})
export class ValidatedInputComponent implements OnInit {
  formGroup: FormGroup;
  get control(): AbstractControl { return this.formGroup.controls['control'] }

  @Input() label: string;
  @Input() data: string;
  @Input() validation: ValidatorFn[];
  @Input() errorMessage: string;
  @Output() changedData = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      'control': this.fb.control('', this.validation)
    });

    this.control.patchValue(this.data);

    this.control.valueChanges.subscribe((data) => {
      this.changedData.emit(data);
    })
  }

}