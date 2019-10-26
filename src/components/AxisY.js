import React, {Fragment} from 'react';
import classNames from 'classnames';

export const AxisY = ({maxTicks, step = 1}) =>
  <div className="axis-y">
    {
      Array.from({length: maxTicks})
        .map((_, index) => maxTicks - index)
        .map(tick => (
          <Fragment key={tick}>
            <div
              className={
                classNames(
                  "axis-y__item",
                  {"axis-y__item--highlight": tick % step === 0}
                )
              }
            >
              <div className="axis-y__item__value">{tick}</div>
            </div>
            <div className="axis-y__item-tick">&nbsp;</div>
          </Fragment>
        ))
    }
  </div>;
