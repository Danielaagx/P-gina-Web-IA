document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const botonMenu = document.getElementById('botonMenu');
  const menuNavegacion = document.getElementById('menuNavegacion');
  const enlaces = document.querySelectorAll('.navegacion__enlace');

  botonMenu.addEventListener('click', () => {
    // Alterna la visibilidad del menú y actualiza el estado accesible
    const estaAbierta = menuNavegacion.classList.toggle('abierta');
    botonMenu.setAttribute('aria-expanded', estaAbierta);
  });

  enlaces.forEach((enlace) => {
    enlace.addEventListener('click', () => {
      // Cierra el menú en móvil al elegir una sección
      menuNavegacion.classList.remove('abierta');
      botonMenu.setAttribute('aria-expanded', 'false');
    });
  });

  // Seleccionar producto desde el catálogo hacia el formulario
  const botonesElegir = document.querySelectorAll('.boton-elegir');
  const selectProducto = document.getElementById('productoSeleccionado');
  const seccionPedido = document.getElementById('pedido');

  botonesElegir.forEach((boton) => {
    boton.addEventListener('click', () => {
      const producto = boton.getAttribute('data-producto');
      selectProducto.value = producto;
      seccionPedido.scrollIntoView({ behavior: 'smooth' });
      selectProducto.focus();
    });
  });

  // Validación del formulario de pedido
  const formulario = document.getElementById('formularioPedido');
  const campoNombre = document.getElementById('nombreCliente');
  const campoCorreo = document.getElementById('correoCliente');
  const mensajeExito = document.getElementById('mensajeExito');

  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');
  const errorProducto = document.getElementById('errorProducto');

  function validarCorreo(valor) {
    // Revisa estructura básica de correo electrónico
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function mostrarError(campo, elementoError, mensaje) {
    if (mensaje) {
      campo.classList.add('formulario__campo--error');
      elementoError.textContent = mensaje;
      return false;
    }
    campo.classList.remove('formulario__campo--error');
    elementoError.textContent = '';
    return true;
  }

  formulario.addEventListener('submit', (evento) => {
    // Evita enviar el formulario o recargar la página
    evento.preventDefault();
    mensajeExito.hidden = true;

    const nombreOk = mostrarError(
      campoNombre,
      errorNombre,
      campoNombre.value.trim().length < 2 ? 'Escribe tu nombre.' : ''
    );

    const correoOk = mostrarError(
      campoCorreo,
      errorCorreo,
      !validarCorreo(campoCorreo.value.trim()) ? 'Escribe un correo válido.' : ''
    );

    const productoOk = mostrarError(
      selectProducto,
      errorProducto,
      selectProducto.value === '' ? 'Selecciona un producto.' : ''
    );

    if (nombreOk && correoOk && productoOk) {
      const textoProducto = selectProducto.options[selectProducto.selectedIndex].text;
      mensajeExito.textContent = `Listo, ${campoNombre.value.trim()}: registramos tu solicitud para "${textoProducto}".`;
      mensajeExito.hidden = false;
      formulario.reset();
    }
  });
});