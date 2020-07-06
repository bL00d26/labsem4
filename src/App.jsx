import React, { useState, useEffect } from "react";
import {
  dispositivosDeEntrada,
  dispositivosDeSalida,
  dispositivosEspeciales,
  cpuProduct,
} from "./productos";

function App() {
  const [orden, setOrden] = useState([]);
  const [costo, setCosto] = useState(0);
  const [entrada, setEntrada] = useState(false);
  const [salida, setSalida] = useState(false);
  const [cpu, setCpu] = useState(false);
  const agregarProducto = (e, producto) => {
    e.preventDefault();
    let costoTemp = 0;
    if (orden.length === 0) {
      setCosto(producto.precioUnitario);
    } else {
      costoTemp = costo;
      setCosto(costoTemp + producto.precioUnitario);
    }
    switch (producto.tipo) {
      case "cpu":
        setCpu(true);
        break;
      case "entrada":
        setEntrada(true);
        break;
      case "salida":
        setSalida(true);
        break;
      case "especial":
        setSalida(true);
        setEntrada(true);
        break;
    }

    setOrden([...orden, producto]);
  };
  const reiniciar = (e) => {
    setCpu(false);
    setEntrada(false);
    setSalida(false);
    setOrden([]);
    setCosto(0);
  };
  const quitarProducto = (e, producto) => {
    e.preventDefault();
   
    const arrayFiltrado = orden.filter(
      (prod) => prod.nombre !== producto.nombre
    );
    switch (producto.tipo) {
      case "cpu":
        setCpu(false);
        break;
      case "entrada":
        setEntrada(false);
        break;
      case "salida":
        setSalida(false);
        break;
      case "especial":
        setSalida(false);
        setEntrada(false);
        break;
    }
    setOrden(arrayFiltrado);
   setCosto(costo-producto.precioUnitario);
  };
  const validarOrden = (e) => {
    e.preventDefault();
    if (entrada && salida && cpu) {
      alert("Orden valida, precio total: "+costo);
    } else {
      alert("Orden inválida");
    }
  };
  return (
    <div className="container">
      <h1>Venta de Computadora</h1>
      <div className="row">
        <div className="col-6">
          <h2>Orden</h2>
          <ul className="list-group">
            {orden.map((producto, index) => (
              <li className="list-group-item" key={index}>
                <span className="lead">{producto.nombre}</span>
                <button
                  className="btn btn-danger float-right"
                  onClick={(e) => quitarProducto(e, producto)}
                >
                  QUITAR
                </button>
              </li>
            ))}
          </ul>
          {orden.length === 0 ? null : (
            <div>
              <button
                className="btn btn-danger float-right mt-3"
                onClick={(e) => validarOrden(e)}
              >
                COMPRAR
              </button>
              <button
                className="btn btn-danger float-right mt-3 mr-2"
                onClick={(e) => reiniciar(e)}
              >
                REINICIAR
              </button>
              <span>Costo de la orden: {costo}</span>
            </div>
          )}
        </div>
        <div className="col-6">
          <h2>Productos</h2>
          <h4>CPU</h4>
          <ul className="list-group">
            <li className="list-group-item" key={1}>
              <span className="lead">CPU</span>
              <button
                className="btn btn-danger float-right"
                onClick={(e) => agregarProducto(e, cpuProduct)}
              >
                AGREGAR
              </button>
            </li>
          </ul>
          <h4>Dispositivos de entrada</h4>
          <ul className="list-group">
            {dispositivosDeEntrada.map((producto, index) => (
              <li className="list-group-item" key={index}>
                <span className="lead">{producto.nombre}</span>
                <button
                  className="btn btn-danger float-right"
                  onClick={(e) => agregarProducto(e, producto)}
                >
                  AGREGAR
                </button>
              </li>
            ))}
          </ul>
          <h4>Dispositivos de salida</h4>
          <ul className="list-group">
            {dispositivosDeSalida.map((producto, index) => (
              <li className="list-group-item" key={index}>
                <span className="lead">{producto.nombre}</span>
                <button
                  className="btn btn-danger float-right"
                  onClick={(e) => agregarProducto(e, producto)}
                >
                  AGREGAR
                </button>
              </li>
            ))}
          </ul>
          <h4>Dispositivos especiales</h4>
          <ul className="list-group">
            {dispositivosEspeciales.map((producto, index) => (
              <li className="list-group-item" key={index}>
                <span className="lead">{producto.nombre}</span>
                <button
                  className="btn btn-danger float-right"
                  onClick={(e) => agregarProducto(e, producto)}
                >
                  AGREGAR
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
