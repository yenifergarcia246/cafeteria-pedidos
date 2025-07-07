let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(seccion => seccion.style.display = "none");
  document.getElementById(id).style.display = "block";
  if (id === "pedidos") mostrarPedidos();
}

function guardarPedido() {
  const nombre = document.getElementById("nombreCliente").value.trim();
  const productos = document.getElementById("listaProductos").value.trim();
  const hora = new Date().toLocaleTimeString();

  if (!nombre || !productos) {
    alert("Completa todos los campos.");
    return;
  }

  pedidos.push({ nombre, productos, hora, estado: "pendiente" });
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  document.getElementById("nombreCliente").value = "";
  document.getElementById("listaProductos").value = "";
  alert("Pedido guardado.");
}

function mostrarPedidos(filtro = "todos") {
  const lista = document.getElementById("pedidosLista");
  lista.innerHTML = "";

  let pedidosFiltrados = pedidos;
  if (filtro === "pendiente") pedidosFiltrados = pedidos.filter(p => p.estado === "pendiente");
  if (filtro === "entregado") pedidosFiltrados = pedidos.filter(p => p.estado === "entregado");

  pedidosFiltrados.forEach((pedido, indice) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <b>${pedido.nombre}</b> - ${pedido.productos} (${pedido.hora}) 
      [${pedido.estado.toUpperCase()}]
      ${pedido.estado === "pendiente" ? <button onclick="marcarEntregado(${indice})">Entregar</button> : ""}
    `;
    lista.appendChild(item);
  });
}

function filtrarPedidos() {
  const estado = document.getElementById("estadoFiltro").value;
  mostrarPedidos(estado);
}

function marcarEntregado(indice) {
  pedidos[indice].estado = "entregado";
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  mostrarPedidos();
}

function mostrarResumen() {
    const resumen = pedidos.reduce((acum, pedido) => {
      pedido.productos.split(",").forEach(prod => {
        const p = prod.trim();
        if (p) acum[p] = (acum[p] || 0) + 1;
      });
      return acum;
    }, {});
  
    // ← Aquí faltaban los backticks:
    const texto = Object.entries(resumen)
      .map(([producto, cantidad]) => `${producto}: ${cantidad}`)
      .join("\n");
  
    document.getElementById("textoResumen").innerText =
      texto || "No hay datos para mostrar.";
  }

mostrarSeccion("nuevopedido");