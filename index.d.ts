import { Component, CSSProperties, ReactNode } from "react"

type NavigationUIType = "auto" | "show" | "hide"

interface FullscreenProps {
  enabled: boolean
  onChange?: (enabled: boolean) => any
  children?: ReactNode,
  navigationUI?: NavigationUIType
}

declare class FullScreen extends Component<FullscreenProps> {}

export default FullScreen
