import express from "express";
import config from './config.js';
console.log(`Backend URL: ${config.backendUrl}`);
console.log(`JWT Secret: ${config.jwtSecret}`);
const app = express();
app.use(express.json());
app.listen(config.port, () => {
    console.log(`Servidor corriendo en https://localhost:${config.port}`);
});
//# sourceMappingURL=app.js.map