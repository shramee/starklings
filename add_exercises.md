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

### 🚀 **Botones de Edición Rápida**

Si estás conectado a GitHub en Starklings, verás estos botones en la barra de acciones:

| Botón | Icono | Función | Destino |
|-------|-------|---------|---------|
| **Guía** | ➕ | Abre esta guía | `add_exercises.md` |
| **Ejercicio** | ✏️ | Edita código del ejercicio | `exercises/.../ejercicio.cairo` |
| **Hint** | 💡 | Edita hint del ejercicio | `info.toml` |

**✨ Flujo de trabajo:**
1. Encuentras un error o mejora en un ejercicio
2. Haces clic en el botón correspondiente (✏️ para código o 💡 para hint)
3. Se abre automáticamente tu fork en GitHub
4. **Para hints**: GitHub abre directamente en la línea exacta del ejercicio
5. Editas directamente en el navegador
6. Guardas y creas un pull request

**🎯 Navegación Inteligente:**
- El botón 💡 consulta tu fork de GitHub automáticamente
- Busca la línea exacta que contiene `name = "ejercicio"`
- Te lleva directamente a esa línea usando `#L{numero}`
- ¡No necesitas buscar manualmente - es completamente automático!

---

### Editar la Descripción del Ejercicio

Para modificar la descripción de un ejercicio (por ejemplo, `arrays1.cairo`):

#### 🎯 **Método Rápido (Recomendado)**
Si estás conectado a GitHub en Starklings:

1. **Haz clic en el botón ✏️** en la barra de acciones del ejercicio
2. Se abrirá automáticamente el archivo del ejercicio en tu fork de GitHub
3. Edita los comentarios al inicio del archivo
4. Guarda y crea un pull request

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

1. **Haz clic en el botón 💡** en la barra de acciones del ejercicio
2. Se abrirá automáticamente el archivo `info.toml` en tu fork de GitHub
3. **¡Te lleva directamente a la línea exacta del ejercicio!** (ej: línea 287 para `options3`)
4. Edita el hint en la sección correspondiente
5. Guarda y crea un pull request

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

## 🎯 **Resumen de Edición Rápida**

### Para Usuarios Conectados a GitHub:
- **Ejercicio actual**: Usa ✏️ para editar el código
- **Hint actual**: Usa 💡 para editar el hint
- **Nueva guía**: Usa ➕ para acceder a esta documentación

### Ventajas del Sistema:
- 🚀 **Edición directa**: Sin necesidad de clonar el repositorio
- 🔄 **Fork automático**: GitHub crea tu fork si no existe
- 📝 **Pull requests fáciles**: De edición a contribución en minutos
- 🎯 **Contextual**: Editas exactamente lo que estás viendo
- 🎯 **Navegación automática**: Va directamente a la línea exacta del ejercicio

¡Con esta guía y los botones de edición rápida ya puedes crear y editar ejercicios de Starklings de manera efectiva! 🚀
