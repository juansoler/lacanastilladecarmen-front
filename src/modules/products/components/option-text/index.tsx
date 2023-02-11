import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import clsx from "clsx"
import React from "react"
// import Input from "@modules/common/components/input"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOptionText: (optionText: Record<string, string>) => void
  title: string
}



const OptionText: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOptionText,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)
  
  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-base-semi">Seleccionar {title}</span>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {filteredOptions.map((v) => {
          var text = "Texto para personalizar"

          const changeText = (e: any) => {
            console.log("option")
            console.log(option)
            console.log("current")
            console.log(current)
            console.log("prueba")
            console.log({ [option.id]: v })
           text = e.target.value
          }
          return (
            <div>
<input defaultValue={text} name="" type="text" onChange={(e) => changeText(e)} />

            <button
              onClick={() => updateOptionText({ [option.id]: v })}
              key={v}
              className={clsx(
                "border-gray-200 border text-xsmall-regular h-[50px] transition-all duration-200",
                { "border-gray-900": v === current }
              )}
            >
              {v}
            </button>
            </div>
           
          )
        })}
      </div>
    </div>
  )
}

export default OptionText
