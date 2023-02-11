import ResetTemplate from "@modules/account/templates/reset-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"

const Reset: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Entrar" description="Entre a su cuenta en La Canastilla de Carmen." />
      <ResetTemplate />
    </>
  )
}

Reset.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Reset
