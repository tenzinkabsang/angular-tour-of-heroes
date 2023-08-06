import { Component } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages: string[] = [];

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
    this.messageService.getAll().subscribe(m => this.messages = m);
  }

  clearMessages(): void {
   // this.messages = [];
    this.messageService.clear();
  }
}
