import EventEmitter from "events";

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // unlimit the number of listeners

export const emitter = _emitter;
