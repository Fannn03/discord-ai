export interface commandDefaultInterface {
  default: {
    name: string,
    aliases: string[] | [],
    run: any
  }
}

export interface commandInterface {
  name: string,
  aliases: string[],
  run: any
}