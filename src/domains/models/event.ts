export interface eventDefaultInterface {
  default: {
    name: string,
    once: boolean,
    execute: Function
  }
}

export interface eventInterface {
  name: string,
  once: boolean,
  execute: any
}