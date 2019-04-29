import * as React from 'react'

type indexProps = {
  isMobile: boolean
}

export default class App extends React.Component<indexProps> {
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <p>It is {this.props.isMobile ? '' : 'not'} mobile.</p>
      </div>
    )
  }
}
