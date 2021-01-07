import React, { useState, useRef, useContext } from "react"
import { MdAccountCircle } from "react-icons/md"
import styled, { css } from "styled-components"
import AvatarDropDown from "./avatarDropDown"
import useOutsideClick from "../../../hooks/useOutsideClick"
import AuthContext from "../../../utils/authContext"
import { colors } from "../../../styles/theme"

const imageStyles = css`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${colors.gray300};
  border-radius: 9999px;
  flex-shrink: 0;
  margin-bottom: 1rem;
`

const Image = styled.img`
  ${imageStyles}
`

const StyledMdAccountCircle = styled(MdAccountCircle)`
  ${imageStyles}
`

const AvatarSidebarIcons = () => {
  const { authState } = useContext(AuthContext)
  const photo = authState.user ? authState.user.photo : null
  const [avatarMenu, toggleAvatarMenu] = useState(false)
  const avatarMenuHandler = () =>
    avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true)
  const ref = useRef()
  useOutsideClick(ref, () => toggleAvatarMenu(false))

  return (
    <div ref={ref}>
      {photo ? (
        <Image onClick={avatarMenuHandler} src={photo} alt="" />
      ) : (
        <StyledMdAccountCircle onClick={avatarMenuHandler} />
      )}
      {avatarMenu ? (
        <AvatarDropDown avatarMenuHandler={avatarMenuHandler} />
      ) : null}
    </div>
  )
}

export default AvatarSidebarIcons
