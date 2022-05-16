import {
  TODO_ADD,
  TODO_DELETE, TODO_ONCHANGE
} from '../constants/actionTypes';

export const initialState = {
  // this is a TODO item which has one "value" property
  item: {
    value: '',
  },
  // this is a list of the TODO items
  data: [],
};

export default (state = initialState, action) => {
  // receive the type and item, which is defined in the `actions/index.ts`
  const {
    type,
    item,
  } = action;

  switch (type) {
    case TODO_ONCHANGE: {
      // BE CAREFUL!!!
      // DON'T USE THE REFERENCE LIKE THIS:
      //
      //     state.item = item;
      //     return state; // this `state` is "previous" state!
      //
      // Please create a new instance because that is a "next" state
      //
      return Object.assign({}, state, {
        item,
      });
    }

    case TODO_ADD: {
      // if the `item.value` is empty, return the "previous" state (skip)
      if (item.value === '') {
        return state;
      }

      return Object.assign({}, state, {
        // clear the `item.value`
        item: {
          value: '',
        },
        // create a new array instance and push the item
        data: [
          ...(state.data),
          item,
        ],
      });
    }

    case TODO_DELETE: {
      // don't use `state.data` directly
      const { data, ...restState } = state;

      // `[...data]` means a new instance of the `data` array
      // and filter them and remove the target TODO item
      const updated = [...data].filter(_item => _item.value !== item.value);

      return Object.assign({}, restState, {
        data: updated,
      });
    }

    // do nothing
    default: {
      return state;
    }
  }
};
