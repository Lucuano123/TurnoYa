export class Services {

  constructor(
    public id: string,
    public name: string,
    public descipcion: string,
    public duracion: number,
    public price: number,
    public category_id: number,
    public image_url: string,
    private created_at: Date,
    private updated_at: Date,
  ) { }

}
