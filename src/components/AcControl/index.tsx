import "./index.css";

import { Button, Flex, Slider, Switch, type SliderSingleProps } from "antd";
import { AcProvider, useAc, useAcDispatch } from "./context";

export type AcControl = {
    isOn: boolean;
    temp: number;
};
// type AcControlPartial = Partial<AcControl>;
// type AcReducerAction = AcControlPartial & { type: "power" | "temp" };

function Temp() {
    const ac = useAc();
    const dispatch = useAcDispatch();
    const maxTemp = 28;
    const minTemp = 16;
    const marks: SliderSingleProps["marks"] = {
        16: "16°C",
        22: "22°C",
        26: "26°C",
        28: "28°C",
    };
    const tempDisplayStyle = {
        color: "rgba(255, 102, 0, 1)",
        fontSize: "3rem",
        fontWeight: 700,
        textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
    };
    function onChange(updater: React.SetStateAction<number>) {
        dispatch({
            type: "temp",
            temp: updater,
        });
    }
    return (
        <>
            <div>
                <h1 style={{ ...tempDisplayStyle }}>{ac.temp} °C</h1>
            </div>
            <Flex wrap gap="middle" align="" justify="space-evenly">
                <Button
                    type="primary"
                    onClick={() =>
                        onChange((temp) =>
                            temp - 1 < minTemp ? minTemp : temp - 1
                        )
                    }
                >
                    -
                </Button>
                <Slider
                    marks={marks}
                    step={1}
                    defaultValue={26}
                    value={ac.temp}
                    min={16}
                    max={28}
                    style={{ flex: 3 }}
                    onChange={(v) => onChange(v)}
                    // Todo: 只有滑动结束后才触发请求
                    onChangeComplete={(v) => onChange(v)}
                />
                <Button
                    type="primary"
                    onClick={() =>
                        onChange((temp) =>
                            temp + 1 > maxTemp ? maxTemp : temp + 1
                        )
                    }
                >
                    +
                </Button>
            </Flex>
        </>
    );
}
// function Power() {
//     const ac = useAc();
//     const dispatch = useAcDispatch();

//     return (
//         <>
//             <Button
//                 variant="solid"
//                 style={{ inlineSize: "50%" }}
//                 color={ac.isOn ? "green" : "red"}
//                 onClick={() => dispatch({ type: "power", isOn: !ac.isOn })}
//             >
//                 {ac.isOn ? "开" : "关"}
//             </Button>
//         </>
//     );
// }
function Power2() {
    const ac = useAc();
    const dispatch = useAcDispatch();

    return (
        <>
            <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                className="big-switch"
                checked={ac.isOn}
                onChange={(checked) =>
                    dispatch({ type: "power", isOn: checked })
                }
            />
        </>
    );
}

export default function AcControl() {
    return (
        <>
            <AcProvider>
                <Flex
                    vertical
                    gap="middle"
                    // align="center"
                    // justify="space-evenly"
                    // wrap
                >
                    <Temp></Temp>
                    {/* <div> */}
                    {/* <Power></Power> */}
                    {/* </div> */}
                    <div>
                        <Power2></Power2>
                    </div>
                </Flex>
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
