import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FieldConfig } from './fieldConfig.interface';

@Component({
  selector: 'app-multiple-inputs',
  templateUrl: 'multiple-inputs.component.html',
  styleUrls: ['multiple-inputs.component.scss']
})
export class MultipleInputsComponent {
  @Input() set defaultvalues(values: string[]) {
    const valueLength = this.values.length;

    if (!values.length || (valueLength && this.filterValues().length > 0)) {
        return;
    }

    this.values = values;
    this.inputs = this.values.map((item, i) => `name-${i}`);
  };

  @Input() config: FieldConfig = {
    label: '',
    errorMsg: '',
    embedPattern: '^(<iframe.*? src=")(.*?)(\\??)(.*?)(".*)()(<\\/iframe>)$'
  };
  @Output() changeValues: EventEmitter<string[]> = new EventEmitter();
  values = [''];
  inputs = ['name'];

  addInput(field: NgModel): void {
    if (!this.values[this.values.length - 1].trim().length && field.invalid) {
      return;
    }

    this.inputs.push(`name-${this.values.length}`);
    this.values.push('');
  }

  removeInput(index: number): void {
    this.inputs.splice(index, 1);
    this.values.splice(index, 1);
    this.changeValue();
  }

  changeValue(field?: NgModel): void {
    if (field && field.invalid) {
      return;
    }

    this.changeValues.emit(this.filterValues());
  }

  filterValues(): string[] {
    return this.values.filter(item => item.trim().length);
  }
}
