### Angular2 Electron Integration

First pass at integrating Angular2 as an Electron Application using Angular's split-rendering architecture.

Core application runs in Node (todo: child process?) and uses Electron's IPC module to communicate with the render layer.

Super alpha. Really.

Todos: 
- fix zone.js integration
- figure out why UI isn't updating (related?)
- investigate perf implications
- figure out a cool name.

Try it out:
```
npm install
npm start
```

