import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import type { AcControl } from ".";

export type AcReducerAction =
  | { type: 'temp'; temp: React.SetStateAction<number> }
//   | { type: 'temp'; temp: number | ((prev: number) => number) }
  | { type: "power"; isOn: boolean };

function AcReducer(draft: AcControl, action: AcReducerAction) {
  switch (action.type) {
    case "temp":
        const t = action.temp;
        draft.temp = typeof t === 'function' ? t(draft.temp) : t;
      break;
    case "power":
      draft.isOn = action.isOn;
      break;
}
}

export function AcProvider({ children }: { children: React.ReactNode }) {
    // todo: 默认配置从浏览器storage中读取
    const [ac, dispatch] = useImmerReducer(AcReducer, {
        isOn: false,
        temp: 20,
    });
    // const [a,b]: Updater<number> =useImmer(1);
    return (
        <AcContext.Provider value={ac}>
            <AcDispatchContext.Provider value={dispatch}>
                {children}
            </AcDispatchContext.Provider>
        </AcContext.Provider>
    );
}

export const AcContext = createContext<AcControl | null>(null);
export const AcDispatchContext =
    createContext<React.Dispatch<AcReducerAction> | null>(null);

export function useAc() {
    return useContext(AcContext)!;
}

export function useAcDispatch() {
    return useContext(AcDispatchContext)!;
}
