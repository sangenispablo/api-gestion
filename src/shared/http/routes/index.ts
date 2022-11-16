import { Router, Response, Request } from "express";

import productsRouter from "../../../modules/products/routes/products.routes";
import sessionsRouter from "../../../modules/users/routes/sessions.routes";
import usersRouter from "../../../modules/users/routes/users.routes";

const routes = Router();

// Rutas de Productos
routes.use("/products", productsRouter);

// Rutas de Users
routes.use("/users", usersRouter);

// Rutas de Sessiones
routes.use("/sessions", sessionsRouter);

export default routes;
