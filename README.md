# GDD - Underground Shooter

## Cabecera del Proyecto
- Nombre del juego: Urderground Shooter
- Descripción de la temática: Shooter táctico 1v1 en 2D con vista cenital. Dos jugadores se enfrentan en una arena reducida donde las paredes bloquean el movimiento y los disparos permitiendo un combate puramente basado en los reflejos, la precisión mecánica y la anticipación.
- Integrantes del equipo de desarrollo: 
  * Pablo García-Luzón Revilla | p.garcialuzon.2024@alumnos.urjc.es | GitHub: @ThePol87
  * Marcos Gacituaga Rodríguez | m.gacituaga.2024@alumnos.urjc.es | GitHub: @Marcos832-gif
  * Adrián Llorente Ibarra | a.llorentei.2024@alumnos.urjc.es | GitHub: @Usuario3

---

## Índice
1. Especificaciones Básicas
2. Jugabilidad
3. Narrativa
4. Imagen y Diseño Visual
5. Sonido
6. Comunicación y Marketing
7. Diagrama de Flujo
8. Referencias

---

## 1. Especificaciones Básicas
- Género: Shooter Táctico de Arena 1v1.
- Público objetivo: Jugadores de perfil competitivo, amantes de los shooters tácticos y mecánicas de precisión. Edad recomendada: +12 años (Violencia arcade abstracta).
- Plataforma: PC (Navegador Web). Optimizado para uso intensivo de teclado para movimiento y ratón para apuntar.

## 2. Jugabilidad

### Objetivo del Juego
El objetivo principal es eliminar al oponente disparando con el arma designada. El juego se estructura en un enfrentamiento directo (1v1) sin interrupciones, donde ganará el jugador con mejores reflejos y capacidad de predicción de movimientos.

### Controles
- Movimiento: Teclas W, A, S, D para desplazamiento.
- Apuntado: Rotación libre de 360 grados siguiendo la posición del cursor del ratón.
- Disparo: Clic izquierdo del ratón.

### Mecánicas
- Combate Simétrico de Arma Única: Los dos jugadores tienen el mismo arma en todo momento, aparte de granadas de fragmentación. No hay armas mejores ni ventajas externas.
- Balística de Proyectiles (No-Hitscan): Los disparos no impactan de forma instantánea, cada disparo genera un proyectil que viaja a una velocidad predefinida, obligando al jugador a leer la trayectoria del enemigo y calcular el timing del disparo.
- Visión de Rayos X: El escenario es reducido, las paredes sirven como cobertura física bloqueando el movimiento de los personajes y destruyendo los proyectiles al impactar, pero no interrumpen la línea de visión. Los jugadores siempre saben dónde está el rival, eliminando el factor sorpresa y premiando únicamente la habilidad mecánica.

### Físicas y Calidad del Escenario
- Colisiones: Las hitboxes de los personajes serán ajustadas al tamaño del personaje. 
- Dinámica de movimiento: Los personajes tendrán una velocidad de desplazamiento constante y aceleración instantánea para permitir movimientos bruscos y esquivos reactivos.
- El Escenario: Una arena cerrada de dimensiones reducidas, diseñada con simetría perfecta para garantizar el equilibrio competitivo. 

## 3. Narrativa

### Historia del Juego
Después de una gran guerra mundial, el mundo se ha destruido completamente y solamente quedan mercenarios luchando por sobrevivir y por conseguir recursos básicos. Como el exterior es peligroso debido a la guerra, estos mercenarios se buscan la vida en el subsuelo, teniendo encontronazos con otros de los suyos múltiples veces, siendo obligados a matar a los demás con tal de poder seguir vivo.

### Desarrollo de Personajes
- Mercenario: Humano que ha sobrevivido a la guerra y se va adentrando en el subsuelo para poder sobrevivir, nunca ha sido un experto en armas en su vida pasada pero se las arregla para usarlas.

## 4. Imagen y Diseño Visual

### Aspectos Técnicos:
- Cámara: El juego será representado mediante vista en 2D mediante perspectiva cenital "Top-Down".
- Resolución: Adaptada a formato panorámico (16:9).

### Estilo Visual y Colores
El juego utilizará elementos en formato .svg, con bordes suaves y colores planos, tendrá un estilo simple con estética "underground". 
- El fondo de la arena estará ambientado en una estación de metro abandonada, donde la decoración del entorno permitirá a los jugadores ocultarse o protegerse del otro.
- Los proyectiles de los personajes utilizarán colores brillantes para resaltar estos elementos sobre el resto de la arena.

### Inspiración
Inspirado por el contraste visual y la perspectiva de "Hotline Miami" y mezclado con la estética visual y mecánicas de "ZombsRoyale.io"

### Recursos Visuales
1) Logotipo del juego:

   <img width="715" height="517" alt="logo" src="https://github.com/user-attachments/assets/4d99ff15-d315-42d3-9c0e-76132e51c1b0" />

2) Bocetos de Interfaz (Menú):

   <img width="892" height="627" alt="menu" src="https://github.com/user-attachments/assets/46578178-9abf-4551-b332-b32935424d5f" />

3) Bocetos de Pantallas / Personajes:

   - [IMAGEN: boceto_arena.jpg] (Ejemplo de la ambientación y estilo de la arena del juego).


## 5. Sonido

### Música
* Menú Principal: Una pista de "Synthwave" lenta y atmosférica para generar tensión antes del combate.
* Durante el juego: Una pista de "Dark Darksynth/Techno" que mantenga un estado de inmersión alto y un ritmo constante.

### Efectos Sonoros (SFX)
Efectos de sonido descargados de bibliotecas gratuitas de internet, contará con sonidos para ambientación y elementos del juego.
* Disparo de proyectil, sonido con eco dinámico dentro de la arena.
* Impacto de proyectil, contra elementos de la arena.
* Impacto contra el jugador, al dañarlo.
* Movimientos o pasos del personaje.


## 6. Comunicación y Marketing
Al ser un juego enfocado en la habilidad del jugador, la estrategia de marketing se basaría en la competitividad entre jugadores. 
* Publicar el juego en páginas como itch.io o steam y ofrecerlo como una experiencia competitiva nueva y tematizada. 
* Daríamos visibilidad al juego mediante plataformas de "streaming" como Twitch o Youtube para que la gente puediese conocer el juego con mayor detalle.


## 7. Diagrama de Flujo

<img width="1125" height="704" alt="diagrama_flujo" src="https://github.com/user-attachments/assets/8f9b0d04-c256-452d-b774-d240fa6bc1d0" />

- Esquema en texto de la estructura del juego:
1. Arranque del ejecutable-> Menú Principal (Comprueba conexión con el servidor).
2. Menú Principal -> Opciones: (A) Buscar Partida,  (B) Controles, (C) Ajustes, (D) Créditos.
3. Al seleccionar Opción (A) "Buscar Partida" -> Sala de Espera / Matchmaking.
4. Conexión establecida con rival -> Escena introductoria del Juego -> (Arena 1v1).
5. Bucle de Juego: Movimiento, Disparo, Cálculo de Colisiones.
6. Jugador gana o pierde-> Pantalla de Victoria/Derrota.
7. Desde Victoria/Derrota -> Volver al Menú Principal.
8. Error de conexión: Si en cualquier momento se pierde la conexión -> Escena "Reconectando..." bloqueando los controles.


## 8. Referencias
* "ZombsRoyale.io" - Referencia para el movimiento WASD fluido y control de proyectiles  en entorno web.
* "Valorant" - Inspiración conceptual para la simulación táctica y la importancia del "crosshair placement".
* "Hotline Miami" - Referencia para la cámara cenital estricta y el sensación de juego dinámico.
