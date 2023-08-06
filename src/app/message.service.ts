import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  // Asynchronous call to a database to retrieve messages.
  getAll(): Observable<string[]> {
    return of(this.messages);
  }

  clear() {
    this.messages = [];
  }
}
