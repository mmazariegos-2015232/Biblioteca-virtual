export class History {
  constructor (
    public _id:               string,
    public userId:            string,
    public action:            string,
    public bookOrMagazineId:  string,
    public actionDate:        Date,
    public isMagazine:        boolean,
    public isBook:            boolean,
  ) {}
}