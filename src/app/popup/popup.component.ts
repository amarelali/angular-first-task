import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnChanges {
  @Input() title: string = 'Title';
  @Input() id!: string;
  formattedId: string = ""

  ngOnInit(): void {
    this.formattedId = `modal-${this.id}`;
    console.log('ID Input: ngOnInit', this.formattedId);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && changes['id'].currentValue) {
      this.formattedId = `modal-${this.id}`;
    }
    console.log('ID Input: ngOnChanges', this.formattedId);
  }
}
