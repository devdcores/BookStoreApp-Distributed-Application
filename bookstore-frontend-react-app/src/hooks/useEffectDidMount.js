import React, { useEffect, useRef } from 'react';

// Not run effect in the first render of componnent.
const useEffectDidMount = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useEffectDidMount;