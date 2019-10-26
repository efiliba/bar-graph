import {ActionCreators, reducer} from './barDragStateReducer';

describe('barDragStateReducer', () => {
  const initialState = {
    maxHeight: 100,
    value: 10,
    isMouseDown: false,
    isReadOnly: false,
    height: 0,
    top: 0,
    stepHeight: 0,
    closestTickAtHeight: jest.fn()
  };

  describe('initialiseDragData', () => {
    const maxTicks = 20;
    const nextState = reducer(initialState, ActionCreators.initialiseDragData(maxTicks));

    it('added calculated data based on maxTicks to the state', () => {
      expect(nextState).toEqual({
        ...initialState,
        height: 50,
        stepHeight: 5,
        top: 50,
        closestTickAtHeight: nextState.closestTickAtHeight
      });
    });

    it("didn't modify the original state", () => {
      expect(initialState).toEqual({
        maxHeight: 100,
        value: 10,
        isMouseDown: false,
        isReadOnly: false,
        height: 0,
        top: 0,
        stepHeight: 0,
        closestTickAtHeight: initialState.closestTickAtHeight
      });
    });

    it("can't modify the original state", () => {
      expect(() => {
        // @ts-ignore
        nextState.top = undefined;  // Mutation prevented by TS readonly
      }).toThrow();
    });
  });

  describe('updateDragData', () => {
    const maxTicks = 20;
    const movementY = 10;
    const initialisedState = reducer(initialState, ActionCreators.initialiseDragData(maxTicks));
    const nextState = reducer(initialisedState, ActionCreators.updateDragData(movementY));

    it('added calculated data based on maxTicks to the state', () => {
      expect(nextState).toMatchObject({
        maxHeight: 100,
        height: 40,
        top: 60,
        stepHeight: 5,
        value: 8,
      });
    });

    it("didn't modify the previous state", () => {
      expect(initialisedState).toMatchObject({
        maxHeight: 100,
        height: 50,
        top: 50,
        stepHeight: 5,
        value: 10,
      });
    });
  });
});
