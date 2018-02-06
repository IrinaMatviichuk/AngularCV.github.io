export class Messange {
  constructor(public id_sender: number,
              public id_addressee: number,
              public date: string,
              public text: string,
              public status: string,
              public id?: number) {
  }
}
