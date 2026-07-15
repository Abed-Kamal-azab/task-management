import { Component, input, output } from '@angular/core';

@Component({
  selector: 'tm-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input.required<string>();
  isDisabled = input<boolean>(false);
  imgSrc = input<string | null>();
  btnWidth = input<string>();

  btnClick = output<MouseEvent>();

  doClick(event: MouseEvent) {
    this.btnClick.emit(event);
  }
}
