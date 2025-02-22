const socket = io();

const productos = document.getElementById("productos");

socket.on('productos', productsHandlebars => {
        productos.innerHTML = productsHandlebars.map(producto => `
                    <div class="product-card">
                        <div class="product-header">
                            <h3 class="product-title">${producto.title}</h3>
                            <span class="product-category">${producto.category}</span>
                        </div>
                        <p class="product-description">Descripción: ${producto.description}</p>
                        <div class="product-details">
                            <div>
                                <div class="detail-label">Código:</div>
                                <div class="detail-value">ABC123</div>
                            </div>
                            <div>
                                <div class="detail-label">Precio:</div>
                                <div class="detail-value">$${producto.price}</div>
                            </div>
                            <div>
                                <div class="detail-label">Stock:</div>
                                <div class="detail-value">${producto.stock} unidades</div>
                            </div>
                        </div>
                        <button onClick="eliminarProducto(${producto.id})">Eliminar</button>
                    </div>
        `).join("");
    });

const formularioProductos = document.getElementById("formularioProductos");
formularioProductos.addEventListener("submit", (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let productoNuevo = Object.fromEntries(formData.entries());
    socket.emit("nuevoProducto", productoNuevo);

    event.target.reset();
});

function eliminarProducto(id) {
    socket.emit("eliminarProducto", id);
};

