# @nodecfdi/rfc

[![Source Code][badge-source]][source]
[![Software License][badge-license]][license]
[![Latest Version][badge-release]][release]
[![Discord][badge-discord]][discord]

[source]: https://github.com/nodecfdi/rfc
[badge-source]: https://img.shields.io/badge/source-nodecfdi%2Frfc-blue?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMTIgMTIgNDAgNDAiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiwxMy40Yy0xMC41LDAtMTksOC41LTE5LDE5YzAsOC40LDUuNSwxNS41LDEzLDE4YzEsMC4yLDEuMy0wLjQsMS4zLTAuOWMwLTAuNSwwLTEuNywwLTMuMiBjLTUuMywxLjEtNi40LTIuNi02LjQtMi42QzIwLDQxLjYsMTguOCw0MSwxOC44LDQxYy0xLjctMS4yLDAuMS0xLjEsMC4xLTEuMWMxLjksMC4xLDIuOSwyLDIuOSwyYzEuNywyLjksNC41LDIuMSw1LjUsMS42IGMwLjItMS4yLDAuNy0yLjEsMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEsMC43LTMuNywyLTUuMWMtMC4yLTAuNS0wLjgtMi40LDAuMi01YzAsMCwxLjYtMC41LDUuMiwyIGMxLjUtMC40LDMuMS0wLjcsNC44LTAuN2MxLjYsMCwzLjMsMC4yLDQuNywwLjdjMy42LTIuNCw1LjItMiw1LjItMmMxLDIuNiwwLjQsNC42LDAuMiw1YzEuMiwxLjMsMiwzLDIsNS4xYzAsNy4zLTQuNSw4LjktOC43LDkuNCBjMC43LDAuNiwxLjMsMS43LDEuMywzLjVjMCwyLjYsMCw0LjYsMCw1LjJjMCwwLjUsMC40LDEuMSwxLjMsMC45YzcuNS0yLjYsMTMtOS43LDEzLTE4LjFDNTEsMjEuOSw0Mi41LDEzLjQsMzIsMTMuNHoiLz48L3N2Zz4%3D
[license]: https://github.com/nodecfdi/rfc/blob/main/LICENSE
[badge-license]: https://img.shields.io/github/license/nodecfdi/rfc?logo=open-source-initiative&style=flat-square
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/rfc
[release]: https://www.npmjs.com/package/@nodecfdi/rfc
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord&style=flat-square
[discord]: https://discord.gg/aFGYXvX

> Library to deal with Mexican RFC
:us: The documentation of this project is in spanish as this is the natural language for intended audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

## Acerca de nodecfdi/rfc

En México, toda persona física o moral para realizar cualquier actividad económica requiere de un registro
ante la Secretaría de Hacienda y Crédito Público (SHCP) llamado Registro Federal de Contribuyentes (RFC).

Esta librería permite trabajar con esta clave desde el aplicativo de Node o Browser.

Librería inspirada por la versión para php https://github.com/phpcfdi/rfc

## Instalación

### Node NPM

```shell
npm i @nodecfdi/rfc --save
```

### Yarn NPM

```shell
yarn add @nodecfdi/rfc
```

## Uso básico

```ts
import { Rfc } from '@nodecfdi/rfc';
// const form = { rfc:  'COSC8001137NA' }; // suponiendo que llega un formulario con rfc
const rfc = Rfc.parse(form.rfc);
console.log(rfc.getRfc()); // COSC8001137NA
console.log(`${rfc}`); // COSC8001137NA
console.log(JSON.stringify({ data: `${rfc}` })); // {"data": "COSC8001137NA"}
console.log(rfc.isFisica()); // true
console.log(rfc.isMoral()); // false
console.log(rfc.isGeneric()); // false
console.log(rfc.isForeign()); // false
```

## Creación de objetos

El objeto `Rfc` se puede crear a partir de cuatro formas:

- `Rfc.parse(string): Rfc`: Se validan los datos de entrada y surge una excepción si son inválidos.
- `Rfc.parseOrNull(string): <Rfc||null>`: Se validan los datos de entrada y retorna nulo si son inválidos.
- `Rfc.unparsed(string): Rfc`: No se validan los datos de entrada, se creará el objeto con la cadena de caracteres como Rfc.
- `Rfc.fromSerial(int): Rfc`: Se convierte el número de serie del RFC a su representación de cadena de caracteres.

No se puede crear un objeto a partir del constructor `new Rfc`. Use `Rfc.unparsed` en su lugar.

Se recomienda que, siempre que se crea el objeto y los datos de origen no son de confianza, se utilice `Rfc.parse`.

El único dato importante dentro del RFC es la cadena de caracteres misma. Por ello se ha implementado que la conversión
a cadena de caracteres y la exportación a JSON devuelvan específicamente este dato.

## Números de serie

La representación del _número de serie_ corresponde a un número creado con esta misma librería,
este número es un entero de 64 bits que se puede almacenar como un entero largo en una base de datos.

Para obtener el número de serie de un RFC puede usar el método `Rfc.calculateSerial()`.

Para crear un Rfc a partir de un entero puede usar `Rfc.fromSerial()`.

La clase responsable de los cálculos involucrados en esta conversión está optimizada con arreglos constantes
de conversión por lo que su ejecución es lo más veloz que puede ser.

## RFC genérico y foráneo

Es frecuente utilizar RFC que son _virtuales_, por ejemplo, para operaciones sin identificar como una
venta de mostrador u operaciones con extranjeros, en estos casos están las constantes
`Rfc.RFC_GENERIC = 'XAXX010101000'` y `Rfc.RFC_FOREIGN = 'XEXX010101000'` respectivamente.

Puede usar los métodos `Rfc.newGeneric()` y `Rfc.newForeign()` para crear instancias con estos datos.

Si se desea saber que el RFC es genérico se puede usar el método `Rfc.isGeneric()` y para RFC extranjero `Rfc.isForeign()`.

## Generador de RFC

Es común usar generadores (ficticios) de datos, esta librería provee la clase `RfcFaker` que se puede utilizar por sí sola.

Provee métodos para crear una cadena de caracteres que es una clave RFC:

- `RfcFaker.mexicanRfcFisica()` para persona física (13 posiciones).
- `RfcFaker.mexicanRfcMoral()` para persona moral (12 posiciones).
- `RfcFaker.mexicanRfc()` indistintamente una persona moral o física.
