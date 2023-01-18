
import { useNavigate, Form, useActionData,redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import {agregarCliente} from "../components/data/clientes"

export async function action({ request }) {
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

     await agregarCliente(datos);
     return  redirect("/");
     
    }

const NuevoCliente = () => {
  const navigate = useNavigate()
  const errores = useActionData();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-700'>Nuevo Cliente
      </h1>
      <p className='m-3'>Llena todos los campos para registrar un nuevo cliente</p>
      <div className='flex  '>
        <button className='bg-blue-800 p-5 rounded-md text-white font-bold uppercase hover:bg-blue-400 py-1' onClick={() => { navigate("/") }}>Regresar</button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 max-auto px-5 py-10">
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}


        <Form
          method="post"
          noValidate >

          <Formulario />

          <input type="submit" className="mt-5 w-full bg-blue-800 p-2 uppercase font-bold rounded-md text-center text-white hover:bg-blue-400"
            value="Registrar cliente" />
        </Form>
      </div>

    </>
  )
}

export default NuevoCliente