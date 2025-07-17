# Guía para Agregar o Editar Ejercicios de Starklings

Esta guía te ayudará a agregar nuevos ejercicios o editar los existentes en el proyecto Starklings, una plataforma interactiva para aprender Cairo y Starknet.

## 📁 Estructura del Proyecto

El sistema de ejercicios de Starklings está organizado de la siguiente manera:

```
starklings/
├── exercises/                 # 📂 Directorio principal de ejercicios
│   ├── arrays/               # 📂 Ejercicios sobre arrays
│   ├── variables/            # 📂 Ejercicios sobre variables
│   ├── functions/            # 📂 Ejercicios sobre funciones
│   ├── starknet/            # 📂 Ejercicios específicos de Starknet
│   └── ...                   # 📂 Otras categorías
├── info.toml                 # ⚙️ Configuración de ejercicios y hints
```

## 🔧 Componentes de un Ejercicio

Cada ejercicio en Starklings tiene **3 componentes principales**:

### 1. 📄 Archivo del Ejercicio (`.cairo`)
- **Ubicación**: `exercises/<categoría>/<nombre_ejercicio>.cairo`
- **Contiene**: Código Cairo con comentarios descriptivos y marcador `// I AM NOT DONE`

### 2. 📝 Configuración en `info.toml`
- **Ubicación**: `info.toml` (raíz del proyecto)
- **Contiene**: Metadatos del ejercicio, modo de ejecución y hints


## ✏️ Editar un Ejercicio Existente

### 🚀 **Centro de Edición Unificado**

En la barra de acciones de cada ejercicio encontrarás un **botón de edición** (✏️) que abre un popup con todas las opciones:

**✨ Flujo de trabajo mejorado:**
1. Encuentras un error o mejora en un ejercicio
2. **Haces clic en el botón ✏️** (Opciones de edición)
3. **Se abre un popup** con todas las opciones disponibles
4. **Ves los requisitos** (fork y sincronización) claramente explicados
5. **Seleccionas la acción** que necesitas
6. **Se abre directamente** tu fork en GitHub en la ubicación correcta

### 🎯 **Opciones Disponibles en el Popup:**

| Opción | Función | Requisitos |
|--------|---------|------------|
| **📚 Ver Guía** | Abre esta documentación | Ninguno |
| **✏️ Editar Ejercicio** | Modifica código y descripción | GitHub conectado |
| **💡 Editar Hint** | Mejora las pistas (línea exacta) | GitHub conectado |

### 📋 **Requisitos Mostrados Claramente:**
- ✅ **Fork del proyecto** en tu cuenta de GitHub
- ✅ **Sincronización** con el repositorio principal  
- ✅ **Conexión a GitHub** en Starklings

**🎯 Navegación Inteligente para Hints:**
- Consulta automáticamente tu fork de GitHub
- Busca la línea exacta que contiene `name = "ejercicio"`
- Te lleva directamente usando `#L{numero}`
- ¡Completamente automático, sin búsqueda manual!

---

### Editar la Descripción del Ejercicio

Para modificar la descripción de un ejercicio (por ejemplo, `arrays1.cairo`):

#### 🎯 **Método Rápido (Recomendado)**
Si estás conectado a GitHub en Starklings:

1. **Haz clic en el botón ✏️** (Opciones de edición) en la barra de acciones
2. **Selecciona "✏️ Editar Código del Ejercicio"** en el popup
3. Se abrirá automáticamente el archivo del ejercicio en tu fork de GitHub
4. Edita los comentarios al inicio del archivo
5. Guarda y crea un pull request

#### 📝 **Método Manual**
1. **Abre el archivo del ejercicio**:
   ```bash
   exercises/arrays/arrays1.cairo
   ```

2. **Modifica los comentarios al inicio del archivo**:
   ```cairo
   // Tu nueva descripción del ejercicio aquí
   // Explica qué debe hacer el estudiante
   // Puedes usar múltiples líneas de comentarios
   
   // I AM NOT DONE  ← Este marcador debe permanecer
   
   fn create_array() -> Array<felt252> {
       // ... código del ejercicio
   }
   ```

**⚠️ Importante**: 
- Solo edita los comentarios al principio del archivo
- **NO elimines** la línea `// I AM NOT DONE` (es necesaria para el funcionamiento del sistema)
- Usa comentarios `//` para todas las descripciones

### Editar el Hint del Ejercicio

Para modificar el hint (pista) que se muestra a los estudiantes:

#### 🎯 **Método Rápido (Recomendado)**
Si estás conectado a GitHub en Starklings:

1. **Haz clic en el botón ✏️** (Opciones de edición) en la barra de acciones
2. **Selecciona "💡 Editar Hint del Ejercicio"** en el popup
3. Se abrirá automáticamente el archivo `info.toml` en tu fork de GitHub
4. **¡Te lleva directamente a la línea exacta del ejercicio!** (ej: línea 287 para `options3`)
5. Edita el hint en la sección correspondiente
6. Guarda y crea un pull request

#### 📝 **Método Manual**
1. **Abre el archivo de configuración**:
   ```bash
   info.toml
   ```

2. **Busca la sección del ejercicio**:
   ```toml
   [[exercises]]
   name = "arrays1"
   path = "exercises/arrays/arrays1.cairo"
   mode = "test"
   hint = """
   Aquí va tu nuevo hint.
   Puedes usar múltiples líneas.
   Explica conceptos clave o da pistas sutiles.
   """
   ```

## ➕ Agregar un Nuevo Ejercicio

### Paso 1: Crear el Archivo del Ejercicio

1. **Navega a la categoría apropiada** (o crea una nueva):
   ```bash
   cd exercises/<categoría>/
   ```

2. **Crea el archivo `.cairo`**:
   ```cairo
   // Descripción clara y concisa del ejercicio
   // Explica qué concepto enseña
   // Da instrucciones específicas sobre qué hacer
   
   // I AM NOT DONE
   
   fn ejercicio_ejemplo() {
       // Código inicial con huecos o errores
       // que el estudiante debe completar
   }
   
   // Tests o código de verificación
   #[test]
   fn test_ejercicio() {
       // Tests que validen la solución
   }
   ```

### Paso 2: Configurar en `info.toml`

1. **Abre `info.toml`** y encuentra la sección de tu categoría

2. **Agrega la configuración del ejercicio**:
   ```toml
   [[exercises]]
   name = "nuevo_ejercicio"                    # Nombre único del ejercicio
   path = "exercises/categoria/nuevo_ejercicio.cairo"  # Ruta al archivo
   mode = "test"                               # "test", "run", o "build"
   hint = """
   Hint útil para el estudiante.
   Puede incluir:
   - Enlaces a documentación: https://book.cairo-lang.org/...
   - Conceptos clave a recordar
   - Pistas sobre la solución sin dar la respuesta completa
   """
   ```

3. **Replica la configuración en `app/api/info.toml`**

### Paso 3: Crear Documentación (Opcional)

Si es una nueva categoría, crea `exercises/<categoría>/README.md`:

```markdown
# Nombre de la Categoría

Explicación general del concepto que cubre esta categoría de ejercicios.

## Información Adicional

- [Documentación oficial](enlace)
- [Recursos útiles](enlace)
```

## 🔄 Modos de Ejercicio

En `info.toml`, cada ejercicio tiene un campo `mode` que determina cómo se ejecuta:

- **`"test"`**: Ejecuta los tests del ejercicio (`cargo test`)
- **`"run"`**: Ejecuta el programa principal (`cargo run`)

## ✅ Buenas Prácticas

### Para Descripciones de Ejercicios:
- 📝 Sé claro y conciso
- 🎯 Enfócate en un concepto por ejercicio
- 📚 Menciona conceptos previos si es necesario
- 🔍 Da suficiente contexto sin revelar la solución

### Para Hints:
- 💡 Proporciona pistas, no soluciones completas
- 🔗 Incluye enlaces a documentación relevante
- 📖 Explica conceptos clave si es necesario
- 🎯 Sé específico sobre qué buscar

### Para Código:
- 🏗️ Incluye código de esqueleto útil
- ✅ Agrega tests que validen la solución
- 🚫 Mantén el marcador `// I AM NOT DONE`
- 📦 Importa las dependencias necesarias

## 🎯 **Resumen del Centro de Edición**

### Para Todos los Usuarios:
- **Un solo botón ✏️**: Acceso unificado a todas las opciones
- **Popup informativo**: Requisitos y opciones claramente explicados
- **Guía siempre disponible**: Sin necesidad de conexión a GitHub

### Para Usuarios Conectados a GitHub:
- **Edición directa**: Código y hints desde la interfaz
- **Navegación inteligente**: Va directamente a la línea correcta
- **Contexto claro**: Nombre del ejercicio en el título del popup

### Ventajas del Nuevo Sistema:
- 🎨 **UX mejorada**: Un solo botón en lugar de múltiples iconos
- 📋 **Requisitos claros**: Información sobre fork y sincronización
- 🚀 **Edición directa**: Sin necesidad de clonar el repositorio
- 🔄 **Fork automático**: GitHub crea tu fork si no existe
- 📝 **Pull requests fáciles**: De edición a contribución en minutos
- 🎯 **Contextual**: Editas exactamente lo que estás viendo
- 🎯 **Navegación automática**: Va directamente a la línea exacta del ejercicio

¡Con esta guía y los botones de edición rápida ya puedes crear y editar ejercicios de Starklings de manera efectiva! 🚀
