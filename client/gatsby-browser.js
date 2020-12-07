import React from "react"
import RootWrapper from "./src/context"

export const wrapRootElement = ({ element }) => (
  <RootWrapper>{element}</RootWrapper>
)
