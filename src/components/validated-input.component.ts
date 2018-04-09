import {Component, forwardRef, Input} from "@angular/core";
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'validated-input',
  template: `
    <div class="form-group has-feedback" [ngClass]="{'has-error':!control.valid}">
      <label for="inputField" class="col-sm-2 control-label">{{label}}</label>
      <div class="col-sm-3">
        <input type="text" class="form-control" [value]="inputValue" (keyup)="onInputChange($event.target.value)" id="inputField" placeholder="Enter Server IP">
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

  providers: [
    // allow NgControl injection to let FormControl manage this component
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValidatedInputComponent),
      multi: true}
    ]
})
// create a custom FormControl
export class ValidatedInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() errorMessage;
  @Input() control: AbstractControl; // the owning form control

  inputValue: string; // input field data

  // fill the input with model data
  writeValue(value: string) {
    this.inputValue = value;
  }

  // return changed data
  onInputChange(value: string) {
    this.onChange(value)
  }

  onChange = (fn) => { this.onChange = fn};
  onTouched = () => {};

  // register for touch/change handling
  registerOnChange(fn): void { this.onChange = fn; }
  registerOnTouched(fn): void { this.onTouched = fn; }
}