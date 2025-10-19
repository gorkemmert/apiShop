import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

// (Opsiyonel) istekleri biraz yavaşlat (demo görünümü için)
// server.use((req, _res, next) => setTimeout(next, 200));

// /api/* → /* yönlendirme (frontend’de /api ile de kullanabil)
server.use(jsonServer.rewriter({ "/api/*": "/$1" }));

// JSON body parse
server.use(jsonServer.bodyParser);

// Varsayılan router
server.use(router);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`JSON Server running → http://localhost:${port}`);
});
