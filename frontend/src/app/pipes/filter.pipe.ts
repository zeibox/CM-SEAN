import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arreglo: any, texto: string, columna: string): any {
    if (texto === '') {
      return arreglo;
    }

    texto = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // ignora case y tildes

    return arreglo.filter( item => {
      return item[columna].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') // ignora case y tildes
      .includes( texto );
    });
  }

}
