import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      setCargando(!cargando);
      try {
        const url = `${import.meta.env.VITE_API_URL}${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteAPI();
  }, []);
  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente: {cliente.nombre}
      </h1>
      <p className="mt-3">Información del cliente</p>

      {cliente.nombre && (
        <p className="text-4xl text-gray-700 mt-10">
          <span className="uppercase font-bold">Cliente: </span>
          {cliente.nombre}{" "}
        </p>
      )}
      {cliente.email && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="uppercase font-bold">Email: </span>
          {cliente.email}{" "}
        </p>
      )}
      {cliente.telefono && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="uppercase font-bold">Teléfono: </span>
          {cliente.telefono}{" "}
        </p>
      )}
      {cliente.empresa && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="uppercase font-bold">Empresa: </span>
          {cliente.empresa}{" "}
        </p>
      )}
      {cliente.notas && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="uppercase font-bold">Notas: </span>
          {cliente.notas}{" "}
        </p>
      )}
    </div>
  );
};

export default VerCliente;
