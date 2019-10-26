import produce, {Draft} from 'immer';

const closestTick = (stepHeight: number) => (height: number) => Math.round(height / stepHeight);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface DragDataState {
  readonly maxHeight: number;
  readonly height: number;
  readonly top: number;
  readonly value: number;
  readonly stepHeight: number;
  readonly isReadOnly: boolean;
  readonly isMouseDown: boolean;
  readonly closestTickAtHeight: (height: number) => number;
}

enum ActionTypes {
  SET_MOUSE_DOWN_STATUS = 'SET_MOUSE_DOWN_STATUS',
  INITIALISE_DRAG_DATA = 'INITIALISE_DRAG_DATA',
  UPDATE_DRAG_DATA = 'UPDATE_DRAG_DATA',
  SNAP_TO_CLOSEST_TICK = 'SNAP_TO_CLOSEST_TICK'
}

const Actions = {
  setMouseDownStatus: produce((draft: Draft<DragDataState>, isMouseDown: boolean) => {
    // Only enable mouse down if not read only
    draft.isMouseDown = isMouseDown && !draft.isReadOnly
  }),
  // initialiseDragData: (state, maxTicks) => {
  //   const stepHeight = state.maxHeight / maxTicks;
  //   const height = stepHeight * state.value;

  //   return produce(state, draft => {
  //     draft.height = height;
  //     draft.top = draft.maxHeight - height;
  //     draft.stepHeight = stepHeight;
  //     draft.closestTickAtHeight = closestTick(stepHeight);
  //   });

  //   return {
  //     ...state,
  //     height,
  //     top: state.maxHeight - height,
  //     stepHeight,
  //     closestTickAtHeight: closestTick(stepHeight)
  //   };
  // },
  initialiseDragData: produce((draft: Draft<DragDataState>, maxTicks: number) => {
    const stepHeight = draft.maxHeight / maxTicks;
    const height = stepHeight * draft.value;

    draft.height = height;
    draft.top = draft.maxHeight - height;
    draft.stepHeight = stepHeight;
    draft.closestTickAtHeight = closestTick(stepHeight);
  }),
  updateDragData: produce((draft: Draft<DragDataState>, movementY: number) => {
    const height = clamp(draft.height - movementY, 0, draft.maxHeight);

    draft.height = height;
    draft.top = draft.maxHeight - height;
    draft.value = draft.closestTickAtHeight(height);
  }),
  snapToClosestTick: produce((draft: Draft<DragDataState>) => {
    const height = draft.stepHeight * draft.value;

    draft.height = height;
    draft.top = draft.maxHeight - height;
  })
};

export const ActionCreators = {
  setMouseDownStatus: (payload: boolean)=> ({
    type: ActionTypes.SET_MOUSE_DOWN_STATUS,
    payload
  }),
  initialiseDragData: (payload: number) => ({
    type: ActionTypes.INITIALISE_DRAG_DATA,
    payload
  }),
  updateDragData: (payload: number) => ({
    type: ActionTypes.UPDATE_DRAG_DATA,
    payload
  }),
  snapToClosestTick: () => ({
    type: ActionTypes.SNAP_TO_CLOSEST_TICK
  })
};

export const reducer = (state: DragDataState, {type, payload}: {type?: string, payload?: boolean | number} = {}) => {
  switch (type) {
    case ActionTypes.SET_MOUSE_DOWN_STATUS:
      return Actions.setMouseDownStatus(state, payload as boolean);
    case ActionTypes.INITIALISE_DRAG_DATA:
      return Actions.initialiseDragData(state, payload as number);
    case ActionTypes.UPDATE_DRAG_DATA:
      return Actions.updateDragData(state, payload as number);
    case ActionTypes.SNAP_TO_CLOSEST_TICK:
      return Actions.snapToClosestTick(state);
    default:
      return state;
  }
};
