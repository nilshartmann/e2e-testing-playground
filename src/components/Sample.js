import React from "react";

export class Sample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showLabel: false };
  }
  render() {
    const { showLabel } = this.state;

    return (
      <div>
        <h1>Sample Page</h1>

        <label>
          Toggle:
          <input
            name="toggleLabelCheckbox"
            type="checkbox"
            checked={showLabel}
            onChange={() => this.setState({ showLabel: !showLabel })}
          />
        </label>

        {showLabel && <p data-test-id="hello-world-label">Hello World</p>}
      </div>
    );
  }
}

export default Sample;
