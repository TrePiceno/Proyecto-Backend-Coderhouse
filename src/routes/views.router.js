import { Router } from 'express';
import productsHandlebars from "./product.router.js";

const router = Router();

router.get('/', (req, res)  => {
    res.render('index', { productsHandlebars, title: "Proyecto Back I", style: "home.css" });
});

// Punto de acceso entrega 2
router.get('/realTimeProducts', (req, res)  => {
    res.render('realTimeProducts', { title: "Proyecto Back I", style: "index.css" });
});



export default router;