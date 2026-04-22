# Fix "Waiting for preLaunchTask" dialog

Configurar la task `Start project` como background task con un `problemMatcher` que detecte cuando Vite está listo, eliminando el diálogo "Debug anyway".

---

## Causa

VS Code muestra "Waiting for preLaunchTask" cuando una task no le indica cuándo terminó de iniciar. Para servidores de desarrollo (procesos que no terminan), se necesita:

1. `isBackground: true` — indica que la task es un proceso largo que corre en background
2. `problemMatcher` con `background.beginsPattern` y `background.endsPattern` — expresiones regulares que VS Code usa para detectar el inicio y el fin del arranque

---

## Cambio en `tasks.json`

**Archivo:** `.vscode/tasks.json`

Agregar a la task `Start project`:

```json
"isBackground": true,
"problemMatcher": [
  {
    "owner": "vite",
    "pattern": [
      {
        "regexp": ".",
        "file": 1,
        "location": 2,
        "message": 3
      }
    ],
    "background": {
      "activeOnStart": true,
      "beginsPattern": "VITE",
      "endsPattern": "Local:.*http://localhost"
    }
  }
]
```

- `beginsPattern` — detecta la línea `VITE v...` que Vite imprime al arrancar
- `endsPattern` — detecta la línea `Local: http://localhost:5173` que indica que el servidor está listo
- Con esto, VS Code sabe exactamente cuándo la task terminó de arrancar y lanza el debugger sin preguntar

---

## Resultado esperado

Al presionar F5 / Run Debug:
- VS Code lanza `bun dev`
- Espera a ver `Local: http://localhost` en el output
- Abre Chrome automáticamente sin mostrar el diálogo
