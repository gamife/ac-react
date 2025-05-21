import "./index.css";

import { useImmerReducer } from "use-immer";
import {
    Button,
    Divider,
    Flex,
    Grid,
    Slider,
    type SliderSingleProps,
} from "antd";
import { createContext, useContext } from "react";

type AcControl = {
    isOn: boolean;
    temp: number;
};
type AcControlPartial = Partial<AcControl>;

type AcReducerAction = AcControlPartial & { type: "power" | "temp" };
function AcReducer(draft: AcControl, action: AcReducerAction) {
    // 更新AcControl
    (Object.keys(draft) as (keyof AcControl)[]).forEach((key) => {
        const value = action[key];
        if (value !== undefined) {
            (draft[key] as AcControl[typeof key]) = value;
        }
    });
    switch (action.type) {
        case "power":

        case "temp":
    }
}

function Temp({ temp }: { temp: number }) {
    const marks: SliderSingleProps["marks"] = {
        16: "16°C",
        22: "22°C",
        26: "26°C",
        28: "28°C",
    };

    return (
        <>
            <div>
                <h1
                    style={{
                        textAlign: "center",
                        color: "rgba(255, 102, 0, 1)",
                        fontSize: "3rem",
                        fontWeight: 700,
                        textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                    }}
                >
                    {temp} °C
                </h1>
            </div>
            <Flex wrap gap="middle" align="start" justify="space-evenly">
                <Button type="primary">-</Button>
                <Slider
                    marks={marks}
                    step={1}
                    defaultValue={temp}
                    min={16}
                    max={28}
                    style={{ flex: 3 }}
                />
                <Button type="primary">+</Button>
            </Flex>
        </>
    );
}
function Power() {
    const ac = useAc();
    const dispatch = useAcDispatch();

    return (
        <>
            <Button
                // type="primary"
                variant="solid"
                style={{ inlineSize: "50%" }}
                color={!ac.isOn ? "green" : "red"}
                onClick={() => dispatch({ type: "power", isOn: !ac.isOn })}
            >
                {ac.isOn ? "开" : "关"}
            </Button>
        </>
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

export function AcProvider({ children }: { children: React.ReactNode }) {
    // todo: 默认配置从浏览器storage中读取
    const [ac, dispatch] = useImmerReducer(AcReducer, {
        isOn: false,
        temp: 20,
    });
    return (
        <AcContext.Provider value={ac}>
            <AcDispatchContext.Provider value={dispatch}>
                {children}
            </AcDispatchContext.Provider>
        </AcContext.Provider>
    );
}

export default function AcControl() {
    return (
        <>
            <AcProvider>
                <Power></Power>
            </AcProvider>
            {/* <Temp temp={ac.temp}></Temp>
                    <Power isOn={ac.isOn}></Power>
                    <Divider>Solid</Divider>
                    <button
                        onClick={() => {
                            dispatch({
                                isOn: !ac.isOn,
                                type: "power",
                            });
                        }}
                    >
                        ac: swith
                    </button>
                    <div>
                        <h1>ac</h1>
                        {JSON.stringify(ac, null, 2)}
                    </div>
                    <button
                        onClick={() => {
                            dispatch({
                                temp: ac.temp + 1,
                                type: "power",
                            });
                        }}
                    >
                        ac: temp
                    </button>
                    <div>
                        <h1>ac</h1>
                        {JSON.stringify(ac, null, 2)}
                    </div> */}
        </>
    );
}
