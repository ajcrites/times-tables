import * as React from 'react';

import glamorous from 'glamorous';

const AboutIndicator = glamorous.span({
  cursor: 'pointer',
  backgroundColor: '#FA4616',
  fontSize: '25px',
  color: 'white',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  display: 'inline-block',
  textAlign: 'center',
});

const AboutContainer = glamorous.div({
  position: 'absolute',
  top: '10px',
  left: '10px',
});

const Overlay = glamorous.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: 0,
  transition: 'opacity 300ms',
});

const AboutContent = glamorous.article({
  position: 'fixed',
  top: '50%',
  left: '10%',
  backgroundColor: 'white',
  borderRadius: '15px',
  width: '80%',
  maxHeight: '80%',
  padding: '25px',
  transition: 'opacity 300ms, transform 300ms',
  boxSizing: 'border-box',
  overflow: 'auto',
});

const CloseButton = glamorous.span({
  position: 'absolute',
  top: '10px',
  right: '15px',
  cursor: 'pointer',
});

/**
 * About page explaining what the app is all about
 */
export class About extends React.Component {
  state: {
    hidden: boolean;
    addAnimation: boolean;
  } = { hidden: true, addAnimation: false };

  animateIn() {
    this.setState({ hidden: false });
    setTimeout(() => {
      this.setState({
        addAnimation: true,
      });
    });
  }

  animateOut() {
    this.setState({
      addAnimation: false,
    });
    setTimeout(() => {
      this.setState({ hidden: true });
    }, 300);
  }

  render() {
    let overlayStyle;
    let contentStyle;

    if (this.state.addAnimation) {
      overlayStyle = { opacity: 0.3 };
      contentStyle = { opacity: 1, transform: 'translateY(-50%)' };
    } else {
      overlayStyle = { opacity: 0 };
      contentStyle = { opacity: 0, transform: 'translateY(-40%)' };
    }

    return (
      <AboutContainer>
        <AboutIndicator onClick={() => this.animateIn()}>?</AboutIndicator>

        <div hidden={this.state.hidden}>
          <Overlay style={overlayStyle} />
          <AboutContent style={contentStyle}>
            <p>
              This is a visualization of a <strong>times table</strong> inspired
              by&nbsp;
              <a
                href="https://www.youtube.com/watch?v=qhbuKbxJsk8"
                target="_blank">
                This YouTube video by Mathologer
              </a>.
            </p>
            <p>
              There is an equidistant arrangement of points around a circle.
              Each point is multiplied by the value in the times table and a
              line is drawn from the point to the result of this value. This
              creates some interesting visual effects, especially when the
              number of points becomes large.
            </p>
            <p>
              For example, for 10 points and the 2 times table (the default when
              you visit this page) you will have:
            </p>
            <ul>
              <li>
                <code>0 × 2</code> no line
              </li>
              <li>
                <code>1 × 2</code> line from 1 to 2
              </li>
              <li>
                <code>2 × 2</code> line from 2 to 4
              </li>
              <li>
                <code>3 × 2</code> line from 3 to 6
              </li>
              <li>
                <code>4 × 2</code> line from 4 to 8
              </li>
              <li>
                <code>5 × 2</code> line from 5 to 0 - if you run out of points,
                the <em>remainder</em> of value divided by the total points is
                taken. This is called modulo, or <code>%</code>. So{' '}
                <code>5 × 2</code> is <code>10</code> and there are 10 points,{' '}
                <code>10 % 10</code> is <code>0</code>
              </li>
              <li>
                <code>6 × 2</code> line from 6 to 2
              </li>
              <li>
                <code>7 × 2</code> line from 7 to 4
              </li>
              <li>
                <code>8 × 2</code> line from 8 to 6
              </li>
              <li>
                <code>9 × 2</code> line from 9 to 8
              </li>
            </ul>
            <p>
              Try playing around with the number of points as well as the times
              table value to see what interesting shapes you can create!
            </p>
            <p>
              Change the numbers as you wish. You can also press the play
              button,
              <button>►</button> which will increase the times table by{' '}
              <code>.1</code> every tenth of a second.
            </p>
            <CloseButton onClick={() => this.animateOut()}>×</CloseButton>
          </AboutContent>
        </div>
      </AboutContainer>
    );
  }
}
