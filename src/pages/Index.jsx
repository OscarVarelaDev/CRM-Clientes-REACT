import { useLoaderData } from 'react-router-dom'
import Cliente from '../components/Cliente';
import {obtenerClientes}  from '../components/data/clientes';

export  function  loader() {

    const clientes= obtenerClientes();
    return clientes;
}

const Index = () => {
    const clientes = useLoaderData()

    
    return (
        <>
            <h1 className='font-black text-4xl text-blue-700'>Clientes
            </h1>
            <p className='m-3'>Administra tus clientes</p>
            {clientes.length ? (
                <table className='w-full bg-white shadow mt-5 table-auto'>
                    <thead className='bg-blue-800 text-white '>
                        <tr>
                            <th className='p-2'>
                                Clientes
                            </th>
                            <th className='p-2'>
                                Contactos
                            </th>
                         
                           
                            <th className='p-2'>
                                Acciones
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <Cliente key={cliente.id} cliente={cliente} />
                        ))}
                    </tbody>

                </table>

            ) : (
                <p className='text-center mt-10'>No hay clientes</p>
            )}

        </>
    )
}

export default Index