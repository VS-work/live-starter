export class DatePickerConfigModel {
  maxDate: Date;
  currentValue: Date;
  isChanged? = false;

  constructor(config: DatePickerConfigModel) {
    this.maxDate = config.maxDate;
    this.currentValue = config.currentValue;
  }
}
