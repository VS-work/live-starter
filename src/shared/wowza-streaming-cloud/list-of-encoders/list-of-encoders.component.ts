import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device, Encoder } from './encoders.interface';
import { devices, encoders } from './encoders.model';

@Component({
  selector: 'app-list-of-encoders',
  templateUrl: './list-of-encoders.component.html',
  styleUrls: ['./list-of-encoders.component.scss']
})
export class ListOfEncodersComponent {
  @Input()
  set encoder(encoder: string) {
    if (!encoder) {
      return;
    }

    this.activeEncoders = {
      activeDevice: this.setActiveDevice(encoder),
      default: encoder,
      active: encoder
    };
    this.isNewEvent = false;
  };

  @Output() setEncoder: EventEmitter<string> = new EventEmitter();
  isNewEvent = true;
  encoders: Encoder[] = [...encoders];

  activeEncoders = {
    activeDevice: this.setActiveDevice('wowza_gocoder'),
    default: 'wowza_gocoder',
    active: 'wowza_gocoder'
  };
  devicess = devices;

  changeActiveDevice(device: Device) {
    this.activeEncoders.activeDevice = device;
    this.activeEncoders.active = encoders.filter((item: Encoder) => item.type === device.type)[0].value;
  }

  setActiveDevice(encoder: string): Device {
    const encoderType = encoders.filter((item: Encoder) => item.value === encoder)[0].type;
    return devices.filter((device: Device) => device.type === encoderType)[0];
  }

  setActiveEncoder(encoder: Encoder): void {
    this.activeEncoders.active = encoder.value;

    if (this.isNewEvent && this.activeEncoders.active !== this.activeEncoders.default) {
      this.activeEncoders.default = encoder.value;
      this.setEncoder.emit(this.activeEncoders.active);
    }
  }

  cancelChanges() {
    if (this.activeEncoders.active !== this.activeEncoders.default) {
      this.activeEncoders.active = this.activeEncoders.default;
      this.activeEncoders.activeDevice = this.setActiveDevice(this.activeEncoders.active);
    }
  }

  saveChanges(): void {
    if (this.activeEncoders.active !== this.activeEncoders.default) {
      this.setEncoder.emit(this.activeEncoders.active);
    }
  }
}
