'use client'
import { IconContext } from 'react-icons'
import { useState } from 'react'
import { Wrapper } from '..'
import { colors } from '@/app/assets/styles'
import { AiOutlineMenu, AiOutlinePoweroff } from 'react-icons/ai'
import {
  PiUserCircleLight,
  PiMapPinThin,
  PiTrashLight,
  PiCarSimpleBold
} from 'react-icons/pi'
import {
  RiNotificationLine,
  RiSettings3Line,
  RiTimerLine,
  RiRouteLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiArrowUpLine,
  RiMapPin3Fill
} from 'react-icons/ri'
import { HiLanguage } from 'react-icons/hi2'
import {
  CiLogout,
  CiViewTimeline,
  CiMap,
  CiViewList,
  CiSun,
  CiMapPin
} from 'react-icons/ci'
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineArrowBackIosNew
} from 'react-icons/md'
import { FiUser, FiSearch } from 'react-icons/fi'
import { VscColorMode } from 'react-icons/vsc'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { FaSun, FaMoon, FaTruck, FaCarSide } from 'react-icons/fa'
import { FaTruckFast } from 'react-icons/fa6'
import { BsTruck } from 'react-icons/bs'
import { GoAlert } from 'react-icons/go'

const iconComponents = {
  AiOutlineMenu,
  PiUserCircleLight,
  RiNotificationLine,
  RiSettings3Line,
  HiLanguage,
  CiLogout,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  FiUser,
  CiViewTimeline,
  CiMap,
  CiViewList,
  CiSun,
  VscColorMode,
  FaSun,
  FaMoon,
  CiMapPin,
  PiMapPinThin,
  PiTrashLight,
  IoIosAddCircleOutline,
  FaTruck,
  BsTruck,
  AiOutlinePoweroff,
  FaTruckFast,
  GoAlert,
  RiMapPin3Fill,
  FiSearch,
  MdOutlineArrowBackIosNew,
  RiTimerLine,
  RiRouteLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiArrowUpLine,
  FaCarSide,
  PiCarSimpleBold
}

export default function Icon(props) {
  const { name, size, color, hover, onClick } = props

  const [hoverColor, setHoverColor] = useState()

  const mouseEnter = () => {
    setHoverColor(hover)
  }

  const mouseLeave = () => {
    setHoverColor(color)
  }

  const SelectedIcon = iconComponents[name]

  if (!SelectedIcon) {
    return null
  }

  const defaultProps = {
    color: 'gray'
  }

  return (
    <IconContext.Provider
      value={{
        size: size || '25px',
        color: hoverColor
          ? colors[hoverColor]
          : color
          ? colors[color]
          : colors[defaultProps.color]
      }}
    >
      <Wrapper
        onClick={onClick}
        onMouseEnter={() => mouseEnter()}
        onMouseLeave={() => mouseLeave()}
        flexbox
      >
        <SelectedIcon />
      </Wrapper>
    </IconContext.Provider>
  )
}
