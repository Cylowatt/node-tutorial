import { EventEmitter } from 'events';
import { MyLogger } from './my-logger';

// Create emitter.
class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

// Listen to events.
emitter.on('event', () => console.log('Event fired!'));

emitter.emit('event');

const logger = new MyLogger();
logger.on('message', (data: { id: string; message: string }) => console.log('received:', data));
logger.log('yahoo!');
