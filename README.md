# Frontend Test Task 2019 Solution by Eli Filiba

## Included Libraries / Utilities

- The only library I included was *classnames*
-- This is a very small library/utility to merge classNames and conditionally include them.
-- I like using this library to keep the code clean and there is no need to build this functionality myself.

- I did not use TypeScript/Flow nor even PropTypes as I would expect proper typing to be added. (ToDo) 

## Design Choices

- I started off thinking I would need to use *canvas* for all the interactivity.
-- I hadn't really used canvas before (only as a document viewer), so I built a proof of concept with draggable boxes.
-- But I could not separate each 'draggable box' into it's own component.

- I then created a Bar component and tried to give it the same functionality I had achieved with the canvas version.
-- This led to creating a custom hook to manage the dragging state.

- I then developed the parent Chart component to hold multiple Bar components.

- I experimented with an Axes component containing the Chart as a child, but the CSS became unruly.

- I developed the other components, refactoring as needed.

## Assumptions / Problems

- The absolute minimum the Y-axis can be set to is 5
-- I wanted to show at least 1 tick value (there was also an error when setting it to 0).

- The absolute maximum the Y-axis can be set to is 30
-- I had trouble keeping the spacing consistent when this was not restrained.
-- I will need to find another solution to show more tick marks, if this is not sufficient.

- I left grid lines on the graph at all ticks, not just the numbered ones.
-- I think this makes the graph look more like it's on a 'text' book.
