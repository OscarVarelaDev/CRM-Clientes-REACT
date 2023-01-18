import {  obtenerCliente,actualizarCliente } from "../components/data/clientes";
import Formulario from "../components/Formulario"
import {Form, useNavigate, useLoaderData, useActionData,redirect} from "react-router-dom"
import Error from "../components/Error";


export async function loader({ params }) {
  const cliente= await obtenerCliente(params.id)
  if(Object.values(cliente).length===0){
    throw new Response ('',{
      status:404,
      statusText:'Cliente no encontrado'
    })
  
  }
return cliente;
}
export async function action({ request,params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData.entries());
  //Validar datos
  const errores = [];
  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

      const email = formData.get("email")
      if (!regex.test(email)) {
        errores.push("El email no es valido")
      }
      if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios")

      }
      if (Object.keys(errores).length) {
        return errores;
      }

     await actualizarCliente(params.id, datos);
     return  redirect("/");
     

}

const EditarCliente = () => {

  const navigate = useNavigate()
  const cliente = useLoaderData();
  const errores=useActionData()

  return (
    <>
    <h1 className='font-black text-4xl text-blue-700'>Editar Cliente
    </h1>
    <p className='m-3'>A continuacion podras modificar los datos de un cliente</p>
    <div className='flex  '>
      <button className='bg-blue-800 p-5 rounded-md text-white font-bold uppercase hover:bg-blue-400 py-1' onClick={() => { navigate("/") }}>Regresar</button>
    </div>
    <div className="bg-white shadow rounded-md w-1/4  md:w-3/4 max-auto px-5 py-10">
      {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}


      <Form
        method="post"
        noValidate >

        <Formulario  cliente={cliente}/>

        <input type="submit" className="mt-5 w-2/4  bg-blue-800 p-2 uppercase font-bold rounded-md text-center text-white hover:bg-blue-400"
          value="Guardar cambios" />
      </Form>
    </div>

  </>
  )
}

export default EditarCliente