import { Injectable } from '@angular/core';

@Injectable()
export class KeyService {


  constructor() { }

  generateId(index: number): string {
    const keys: string[] =  defaultKeys;
    const customLib: string[] = keys
      .map((a) => lib[a])
      .reduce((a, b) => a.concat(b));
    const n: number = customLib.length;

    let generatedId: string[] = [];

    while (index > 0) {
      generatedId.push(customLib[Math.round(Math.random() * n)]);
      index -= 1;
    }

    return generatedId.join('');
  }

}

const lib = {
  alpha: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ],
  number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
};

const defaultKeys = ['alpha', 'number'];