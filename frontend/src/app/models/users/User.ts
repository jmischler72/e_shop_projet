export class User {
  constructor(
    public id: number,
    public email: string,
    public role: string,
    public firstname: string,
    public lastname: string,
    public pictureUrl: string,
    public description: string,
  ) {
  }
}
