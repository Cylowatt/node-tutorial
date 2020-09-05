import { EventEmitter } from 'events';

export class MyLogger extends EventEmitter {
  public log(message: string) {
    this.emit('message', { id: new Date().toISOString(), message });
  }
}
