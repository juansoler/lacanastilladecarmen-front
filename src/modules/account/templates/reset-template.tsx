import { useAccount } from "@lib/context/account-context"
import Register from "@modules/account/components/register"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Login from "../components/login"
import Reset from "../components/reset"
import Input from "@modules/common/components/input"
import Button from "@modules/common/components/button"
import { FieldValues, useForm } from "react-hook-form"
import { medusaClient } from "@lib/config"
import { useState } from "react"


interface ResetCredentials extends FieldValues {
  email: string | string[] | undefined
  password: string
  confirmedPassword: string
  token: string

}
const ResetTemplate = () => {
  const { loginView, customer, retrievingCustomer, refetchCustomer } = useAccount()

  const [authError, setAuthError] = useState<string | undefined>(undefined)


  const [currentView, _] = loginView

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetCredentials>()

  const router = useRouter()

  useEffect(() => {
    if (!retrievingCustomer && customer) {
      router.push("/account")
    }
  }, [customer, retrievingCustomer, router])

  const onSubmit = handleSubmit(async (credentials) => {
    
  if (credentials.password == credentials.confirmedPassword){
    console.log("prueba send")
    console.log(router.query.token)
    const token = router.query.token +"";
    var email = router.query.email + ""


    console.log({
      email: email,
      password: credentials.password,
      token: token
    })
      medusaClient.customers.resetPassword({
        email: email,
        password: credentials.password,
        token: token
      })
      .then(({ customer }) => {
        medusaClient.auth
        .authenticate({
          email: email,
          password:  credentials.password
      })
        .then(() => {
          console.log("then")
          refetchCustomer()
          router.push("/")
        })
        .catch(handleError)
        router.push("/")
        console.log(customer.id);
      });
    }
  })

  return (
    <div className="w-full flex justify-center py-24">
      <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Resetear password usuario</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Password"
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
           <Input
            label="Confirmar Password"
            {...register("confirmedPassword", { required: "Password is required" })}
            type="password"
            autoComplete="current-password"
            errors={errors}
          />
        </div>
        <Button className="mt-6">Reset</Button>
      </form>
     
      <br />
     

    </div>
    </div>
    
  )
}

export default ResetTemplate
