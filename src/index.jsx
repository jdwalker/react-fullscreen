import React, { Component } from "react";
import PropTypes from "prop-types";
import fscreen from "fscreen";

class FullScreen extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    navigationUI: PropTypes.string.isRequired
  };

  static defaultProps = {
    enabled: false,
    navigationUI: "auto"
  };

  constructor(props) {
    super(props);

    this.detectFullScreen = this.detectFullScreen.bind(this);
  }

  componentDidMount() {
    fscreen.addEventListener("fullscreenchange", this.detectFullScreen);
  }

  componentWillUnmount() {
    fscreen.removeEventListener("fullscreenchange", this.detectFullScreen);
  }

  componentDidUpdate() {
    this.handleProps(this.props);
  }

  handleProps(props) {
    const enabled = fscreen.fullscreenElement === this.node;
    if (enabled && !props.enabled) {
      this.leaveFullScreen();
    } else if (!enabled && props.enabled) {
      this.enterFullScreen();
    }
  }

  detectFullScreen() {
    if (this.props.onChange) {
      this.props.onChange(fscreen.fullscreenElement === this.node);
    }
  }

  enterFullScreen() {
    if (fscreen.fullscreenEnabled) {
      fscreen.requestFullscreenFunction(this.node).bind(this.node)({navigationUI: this.props.navigationUI});
    }
  }

  leaveFullScreen() {
    if (fscreen.fullscreenEnabled) {
      fscreen.exitFullscreen();
    }
  }

  render() {
    const className = ["fullscreen"];
    if (this.props.enabled) {
      className.push("fullscreen-enabled");
    }

    return (
      <div
        className={className.join(" ")}
        ref={node => (this.node = node)}
        style={
          this.props.enabled ? { height: "100%", width: "100%" } : undefined
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default FullScreen;
