import EventEmitter from 'events';

class TaskEvents extends EventEmitter {}
const taskEvents = new TaskEvents();

export default taskEvents;
