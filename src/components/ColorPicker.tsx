import React, {useEffect, useState} from 'react'
import reactCSS from "reactcss"
import { SketchPicker } from 'react-color'

interface ColorType {
  r: string,
  g: string,
  b: string,
  a: string
}

interface ColorPickerProps {
  defaultColor?: ColorType
  onChange?: (color: ColorType) => void
}

export const ColorPicker = ({defaultColor = {r: '0', g: '0', b: '0', a: '1'}, onChange = (color) => {}}: ColorPickerProps) => {

  const [displayColorPicker, setDCP] = useState(false)
  const [color, setColor] = useState(defaultColor)

  const handleClick = () => {
    setDCP(prev => (!prev))
  }

  const handleClose = () => {
    setDCP(false)
  }

  const handleChange = (color: {rgb: ColorType}) => {
    setColor(color.rgb)
    onChange(color.rgb)
  }

  useEffect(() => {
    handleChange({rgb: defaultColor})
  }, [defaultColor])

  return (
    <div>
      <div onClick={handleClick}>
        <div className="w-[42px] h-[32px] rounded-[10px] cursor-pointer" style={ {
          background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
          border: "1px solid rgba(0, 0, 0, 0.2)"
        } } />
      </div>
      { displayColorPicker ? <div style={{
        position: 'absolute',
        zIndex: 2,
      }}>
        <div style={ {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        } } onClick={handleClose}/>
        {/* @ts-ignore */ }
        <SketchPicker color={ color } onChange={handleChange} />
      </div> : null }

    </div>
  )
}
