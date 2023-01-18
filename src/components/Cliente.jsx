import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from "./data/clientes";


export async function action({params}){
  await eliminarCliente(params.id)
  return redirect('/')

}


const Cliente = ({ cliente }) => {
  const Navigate = useNavigate();
  const { nombre, empresa, email, telefono, id } = cliente
  return (
    <tr className="border-b">
      <td className=' p-6 space-y-2  text-center'>
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p >{empresa}</p>
      </td>

      <td className='p-6 text-center' >
        <p className="text-gray-600"> <span className="text-gray-800 uppercase font-fold ">
        </span>Email: {email}</p>
        Telefono: {telefono}
      </td>
      <td className="p-6 flex gap-3">

        <button className='bg-blue-800 p-5 rounded-md text-white font-bold uppercase hover:bg-blue-400 py-1'
          onClick={(() => Navigate(`/clientes/${id}/editar`))}>Editar</button>
        <Form 
        method="POST"
        action={`/clientes/${id}/eliminar`}
        onSubmit={(e)=>{
          if(!confirm("¿Desear eliminar este cliente?")){
            e.preventDefault();
          }

        }}>
          <button type="submit"
            className='bg-red-800 p-5 rounded-md text-white font-bold uppercase hover:bg-red-400 py-1'>Eliminar</button>
        </Form>
      </td>

    </tr>
  )
}

export default Cliente