import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      <h1 className="text-large-semi uppercase mb-6">Hazte cliente de La Canastilla!r</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
        Crea un perfil y consigue una experiencia mejorada en la compra y guarda los datos de tu compra para futuros pedidos.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Nombre"
            {...register("first_name", { required: "Nombre es obligaotiro" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Apellidos"
            {...register("last_name", { required: "Apellidos son obligatorios" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Teléfono"
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Password"
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              Las credenciales no son correctas, prueba de nuevo.
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          Al crear la cuenta, aceptas la política de privacidad de La Canastilla de Carmen{" "}
          <Link href="/content/privacy-policy">
            <a className="underline">Privacy Policy</a>
          </Link>{" "}
          y{" "}
          <Link href="/content/terms-of-use">
            <a className="underline">Terminos de Uso</a>
          </Link>
          .
        </span>
        <Button className="mt-6">Únete!</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Ya eres miembre?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Logueate
        </button>
        .
      </span>
    </div>
  )
}

export default Register
