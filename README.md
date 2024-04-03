# `@nodecfdi/rfc`

[![Source Code][badge-source]][source]
[![Npm Node Version Support][badge-node-version]][node-version]
[![Discord][badge-discord]][discord]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]
[![Build Status][badge-build]][build]
[![Reliability][badge-reliability]][reliability]
[![Maintainability][badge-maintainability]][maintainability]
[![Code Coverage][badge-coverage]][coverage]
[![Violations][badge-violations]][violations]
[![Total Downloads][badge-downloads]][downloads]

> Library to deal with Mexican RFC

:us: The documentation of this project is in spanish as this is the natural language for intended audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

## Acerca de `@nodecfdi/rfc`

En México, toda persona física o moral para realizar cualquier actividad económica requiere de un registro
ante la Secretaría de Hacienda y Crédito Público (SHCP) llamado Registro Federal de Contribuyentes (RFC).

Esta librería permite trabajar con esta clave desde el aplicativo de Node o Browser.

Librería inspirada por la versión para php <https://github.com/phpcfdi/rfc>

## Instalación

NPM

```bash
npm i @nodecfdi/rfc --save
```

YARN

```bash
yarn add @nodecfdi/rfc
```

PNPM

```bash
pnpm add @nodecfdi/rfc
```

CDN - Browser

Usa la versión mas reciente publicada cambiando `<latest-version>` por la última version. Ex. ...rfc@2.0.2/dist...

```html
<script src="https://unpkg.com/@nodecfdi/rfc@<latest-version>/dist/index.global.js"></script>
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

## Soporte

Puedes obtener soporte abriendo un ticket en Github.

Adicionalmente, esta librería pertenece a la comunidad [OcelotlStudio](https://ocelotlstudio.com), así que puedes usar los mismos canales de comunicación para obtener ayuda de algún miembro de la comunidad.

## Compatibilidad

Esta librería se mantendrá compatible con al menos la versión con
[soporte activo de Node](https://nodejs.org/es/about/releases/) más reciente.

También utilizamos [Versionado Semántico 2.0.0](https://semver.org/lang/es/) por lo que puedes usar esta librería sin temor a romper tu aplicación.

## Contribuciones

Las contribuciones con bienvenidas. Por favor lee [CONTRIBUTING][] para más detalles y recuerda revisar el archivo [CHANGELOG][].

## Copyright and License

The `@nodecfdi/rfc` library is copyright © [NodeCfdi](https://github.com/nodecfdi) - [OcelotlStudio](https://ocelotlstudio.com) and licensed for use under the MIT License (MIT). Please see [LICENSE][] for more information.

[contributing]: https://github.com/nodecfdi/rfc/blob/main/CONTRIBUTING.md
[changelog]: https://github.com/nodecfdi/rfc/blob/main/CHANGELOG.md

[source]: https://github.com/nodecfdi/rfc
[node-version]: https://www.npmjs.com/package/@nodecfdi/rfc
[discord]: https://discord.gg/AsqX8fkW2k
[release]: https://www.npmjs.com/package/@nodecfdi/rfc
[license]: https://github.com/nodecfdi/rfc/blob/main/LICENSE
[build]: https://github.com/nodecfdi/rfc/actions/workflows/build.yml?query=branch:main
[reliability]:https://sonarcloud.io/component_measures?id=nodecfdi_rfc&metric=Reliability
[maintainability]: https://sonarcloud.io/component_measures?id=nodecfdi_rfc&metric=Maintainability
[coverage]: https://sonarcloud.io/component_measures?id=nodecfdi_rfc&metric=Coverage
[violations]: https://sonarcloud.io/project/issues?id=nodecfdi_rfc&resolved=false
[downloads]: https://www.npmjs.com/package/@nodecfdi/rfc

[badge-source]: https://img.shields.io/badge/source-nodecfdi/rfc-blue.svg?logo=github
[badge-node-version]: https://img.shields.io/node/v/@nodecfdi/rfc.svg?logo=nodedotjs
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/rfc.svg?logo=npm
[badge-license]: https://img.shields.io/github/license/nodecfdi/rfc.svg?logo=open-source-initiative
[badge-build]: https://img.shields.io/github/actions/workflow/status/nodecfdi/rfc/build.yml?branch=main
[badge-reliability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_rfc&metric=reliability_rating
[badge-maintainability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_rfc&metric=sqale_rating
[badge-coverage]: https://img.shields.io/sonar/coverage/nodecfdi_rfc/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-violations]: https://img.shields.io/sonar/violations/nodecfdi_rfc/main?format=long&logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-downloads]: https://img.shields.io/npm/dm/@nodecfdi/rfc.svg?logo=npm
