// Número que se ingresó
let valorActual = ''; 

// Operación matemática activa 
let operacionActual = '';

// Resultado parcial o total de la operación
let resultado = null;

// Referencia al display donde se muestra todo
let pantalla = document.getElementById('pantalla');

// Guardamos la operación completa como se verá en pantalla
let expresionVisible = '';

// Indica si se acaba de mostrar un resultado
let resultadoMostrado = false; 


function ingresarNumero(numero) {

  // Si se acaba de mostrar un resultado y no hay operador, empezar nueva operación
  if (resultadoMostrado && operacionActual === '') {
    valorActual = '';
    resultado = null;
    expresionVisible = '';
    pantalla.value = '';
    resultadoMostrado = false;
  }

  valorActual += numero; // Añadir el nuevo dígito al número actual

  // Si el operador es raíz, construimos la pantalla como "√ número"
  if (operacionActual === '√') {
    expresionVisible = '√ ' + valorActual;
    pantalla.value = expresionVisible;
  }

  // Si hay un resultado previo y un operador binario (+, -, etc.)
  else if (resultado !== null && operacionActual !== '') {
    pantalla.value = resultado + ' ' + operacionActual + ' ' + valorActual;
    expresionVisible = pantalla.value;
  }

  // Si no hay operador aún, simplemente mostrar el número
  else {
    pantalla.value = valorActual;
    expresionVisible = valorActual;
  }

}



function establecerOperacion(operador) {
  // Si es una raíz, permitimos seleccionar el operador antes de ingresar número

  if (operador === '√') {

    operacionActual = operador;

    // Se muestra en pantalla solo el operador (esperando el número)
    expresionVisible = operador;
    pantalla.value = expresionVisible;

    valorActual = ''; // Se asegura que el número inicie desde vacío
    return;

  }

  //  Evitar continuar si no hay número ingresado ni resultado previo
  if (valorActual === '' && resultado === null) return;

  // Si es la primera vez que se presiona un operador, guardar valorActual como resultado base
  if (resultado === null) {

      resultado = parseFloat(valorActual);

    } else if (valorActual !== '') {

      aplicarOperacion(); // Ejecutar operación anterior antes de continuar

  }

  // Guardar el nuevo operador (como +, -, ×, ÷)
  operacionActual = operador;

  // Mostrar la operación actual en pantalla
  expresionVisible = resultado + ' ' + operacionActual;
  pantalla.value = expresionVisible;

  // Limpiar el valor actual para ingresar el siguiente número
  valorActual = '';
  resultadoMostrado = false;

}



function aplicarOperacion() {

  const valor = parseFloat(valorActual);  // Convertir entrada a número

  switch (operacionActual) {

    case '+':
      resultado += valor;
      break;
    
    case '-':
      resultado -= valor;
      break;
    
    case '×':
      resultado *= valor;
      break;
    
    case '÷':
      resultado = valor !== 0 ? resultado / valor : 'Syntax Error';
      break;
    
    case '^':
      resultado = Math.pow(resultado, valor);
      break;
    
    case '√':
      resultado = Math.sqrt(valor);  // Solo se usa el valorActual (número ingresado después del operador)
      break;
  
  }

}



function calcular() {

  // Si no hay número actual ni operación, no hacemos nada
  if (valorActual === '' || operacionActual === '') return;

  // Aplicamos la operación seleccionada
  aplicarOperacion();

  pantalla.value = resultado;  // Mostrar resultado final
  valorActual = '';
  operacionActual = '';
  expresionVisible = '';
  resultadoMostrado = true;
}



function limpiarPantalla() {
  // Reinicia todo
  valorActual = '';
  operacionActual = '';
  resultado = null;
  pantalla.value = '';
  expresionVisible = '';
  resultadoMostrado = false;
}
