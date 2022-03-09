import { useEffect } from 'react';
import arePassiveEventsSupported from 'are-passive-events-supported';

import { useLatestRef } from './useLatestRef';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

const getOptions = (event: HandledEventsType) => {
  if (event !== TOUCHSTART) {
    return;
  }

  if (arePassiveEventsSupported()) {
    return { passive: true };
  }
};

const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: Handler | null) => {
  const handlerRef = useLatestRef(handler);

  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      if (!ref.current || !handlerRef.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handlerRef.current(event);
    };

    events.forEach((event) => {
      document.addEventListener(event, listener, getOptions(event));
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener, getOptions(event) as EventListenerOptions);
      });
    };
  }, [!handler]);
};

export { useOnClickOutside };
