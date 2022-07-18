import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientes();
  }, []);
  const handleEliminar = async (id) => {
    try {
      const confirmar = confirm("¿Desea eliminar este cliente?");
      if (confirmar) {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        await respuesta.json();
      }
      const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
      setClientes(arrayClientes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
