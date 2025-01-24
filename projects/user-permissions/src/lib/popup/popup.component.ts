import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnChanges {
  @Input() title = 'Title';
  @Input() id!: string;
  formattedId = ""

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.formattedId = `modal-${this.id}`;
    }
    console.log('ID Input: ngOnChanges', this.formattedId);
  }
}
