export class DatosForm {
  constructor(
    public name?: string,
    public verb?: string,// el ? indica que es un parametro opcional, puede estar en el constructor o no
    public date1?: string,
    public date2?: string
  ) {  }
    toString(): string{
        return "Nombre: \n\t name:  "
                +this.name +"\n\t"
                +"Verbo:   " +this.verb +"\n\t"
                +"Fecha inicial: " +this.date1 + "\n\t"
                +"Fecha final: " +this.date2;
    }
}
