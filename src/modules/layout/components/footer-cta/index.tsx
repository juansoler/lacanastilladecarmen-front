import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const FooterCTA = () => {
  return (
    <div className="bg-[url('/dots.svg')] w-full">
      <div className="content-container flex flex-col-reverse gap-y-6 small:flex-row small:items-center justify-between py-10 relative">
        <div>
          <h3 className="text-2xl-semi">Compra la última moda</h3>
          <div className="mt-6">
            <UnderlineLink href="/store">Ver productos</UnderlineLink>
          </div>
        </div>

        <div className="relative mr-30 w-full small:w-[35%] small:aspect-[28/28]">
          <Image
            src="/logo.png"
            alt=""
            layout="fill"
            objectFit="inherit"
            className="absolute inset-0 mr-30"
          />
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
