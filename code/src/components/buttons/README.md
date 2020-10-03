
# Button Component Guide
Component guide for all button files.


## File Configuration
### Functional Components (components to be used exterior to folder):
* Button.js - Basic button component.
* Bubble.js - 'Bubble' icon button for single selection / voting.
* CheckBox.js - 'CheckBox' icon for multiple selection / voting.
* SubmitButton.js - Submit button for voting.

### Partially Functional Components (probably would not use exterior to folder):
* IconButton.js - Base icon button


## File Break-Down

### Button.js
Component for styled button.

#### Parameters
##### Required
None
##### Encouraged
* `children` - text within button
* `onClick` - click handler (default: undefined)
* `backgroundColor` - color of button (default: `Colors.Blue`)
* `textColor` - color of text (default: `Colors.White`)
* `extraSmall` - text size extraSmall
* `small` - text size small
* `medium` - text size medium
* `large` - text size large
* `extraLarge` - text size extraLarge
##### Indirect Props
* button component, Body.js

#### Example Usage
  import Button from './components/buttons/Button';

  <Button backgroundColor={Colors.Green}
          onClick={() => console.log('Button click!')}
          large >
    Button Text
  </Button>


### Bubble.js
Component for styled bubble button.

#### Parameters
##### Required
None
##### Encouraged
* `clicked` - button is in clicked state (default: `false`)
* `color` - color of icon (default: `Colors.Black`)
* `extraSmall` - text size extraSmall
* `small` - text size small
* `medium` - text size medium
* `large` - text size large
* `extraLarge` - text size extraLarge
##### Not Required
##### Indirect Props
* Icon.js

#### Example Usage
  import Bubble from './components/buttons/Bubble';

  <Bubble clicked={this.state.clicked}
          color={Colors.Blue}
          medium/>


### CheckBox.js
Component for styled checkbox button.

#### Parameters
##### Required
None
##### Encouraged
* `clicked` - button is in clicked state (default: `false`)
* `color` - color of icon (default: `Colors.Black`)
* `extraSmall` - text size extraSmall
* `small` - text size small
* `medium` - text size medium
* `large` - text size large
* `extraLarge` - text size extraLarge
##### Not Required
##### Indirect Props
* Icon.js

#### Example Usage
  import CheckBox from './components/buttons/CheckBox';

  <CheckBox clicked={this.state.clicked}
            color={Colors.Blue}
            medium/>


### SubmitButton.js
Component for styled submit button.


#### Parameters
##### Required
None
##### Encouraged
* `onClick` - click handler (default: undefined)
* `unselected` - submit button type
* `submit` - submit button type
* `submitted` - submit button type
* `resubmit` - submit button type
* `small` - text size small
* `medium` - text size medium
* `large` - text size large
##### Indirect Props
* Button.js

#### Example Usage
  import SubmitButton from './components/buttons/SubmitButton';

  <SubmitButton onClick={(event) => handleSubmitEvent(event)}
                submit/>

### IconButton.js
Tangent component for styled icon buttons. Note! Behavior of these buttons is actually button like - unlike Bubble and CheckBox which are simple icon styling.

#### Parameters
##### Required
* `icon` - icon in normal state
* `clickedIcon` - icon in clicked state
##### Encouraged
* `onClick` - click handler (default: undefined)
* `color` - color of icons
* `extraSmall` - text size extraSmall
* `small` - text size small
* `medium` - text size medium
* `large` - text size large
* `extraLarge` - text size extraLarge

##### Indirect Props
* button Component, Icon.js

#### Example Usage
  import IconButton from './components/buttons/IconButton';

  <IconButton onClick={(event) => handleIconPress(event)}
              icon={'circle'}
              clickedIcon={'bubble'}/>
