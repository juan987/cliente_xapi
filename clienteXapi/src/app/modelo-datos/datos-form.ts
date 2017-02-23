export class DatosForm {
  constructor(
    public name?: string,
    public verb?: string,// el ? indica que es un parametro opcional, puede estar en el constructor o no
    public date1?: string,
    public date2?: string
  ) {  }

}
