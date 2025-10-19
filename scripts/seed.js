import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const dbPath = path.join(__dirname, "..", "db.json");
  const current = JSON.parse(fs.readFileSync(dbPath, "utf8"));

  if (current.products?.length) {
    console.log("Seed atlandı: products zaten dolu.");
    return;
  }

  const res = await fetch("https://fakestoreapi.com/products");
  const list = await res.json();

  const products = list.map((p) => ({
    id: p.id,
    name: p.title,
    price: p.price,
    image: p.image,
    description: p.description,
    category: p.category,
    featured: p.id <= 6
  }));

  const nextDb = {
    ...current,
    products,
    users: current.users?.length
      ? current.users
      : [{ id: 1, email: "demo@shop.com", name: "Demo User" }],
    carts: current.carts?.length
      ? current.carts
      : [{ id: 1, userId: 1, items: [] }],
    wishlists: current.wishlists?.length
      ? current.wishlists
      : [{ id: 1, userId: 1, items: [] }],
    orders: current.orders || []
  };

  fs.writeFileSync(dbPath, JSON.stringify(nextDb, null, 2));
  console.log(`Seed tamam. Ürün sayısı: ${products.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
