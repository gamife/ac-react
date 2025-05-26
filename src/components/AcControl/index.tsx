import "./index.css";

import {
    Button,
    ConfigProvider,
    Flex,
    Radio,
    Slider,
    Switch,
    Tooltip,
    type SliderSingleProps,
} from "antd";
import { AcProvider, useAc, useAcDispatch } from "./context";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import {
    WiWindBeaufort1,
    WiWindBeaufort2,
    WiWindBeaufort3,
} from "react-icons/wi";

export type AcControl = {
    isOn: boolean;
    temp: number;
};
// type AcControlPartial = Partial<AcControl>;
// type AcReducerAction = AcControlPartial & { type: "power" | "temp" };

function WindSpeed() {
    const buttonStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const iconStyle = { fontSize: "2rem", verticalAlign: "middle" };

    return (
        <>
            <Radio.Group
                block
                defaultValue="auto"
                optionType="button"
                buttonStyle="solid"
            >
                <Radio.Button value="auto">自动风</Radio.Button>
                <Radio.Button value="1" style={buttonStyle}>
                    <WiWindBeaufort1 style={iconStyle} />
                </Radio.Button>
                <Radio.Button value="2" style={buttonStyle}>
                    <WiWindBeaufort2 style={iconStyle} />
                </Radio.Button>
                <Radio.Button value="3" style={buttonStyle}>
                    <WiWindBeaufort3 style={iconStyle} />
                </Radio.Button>
            </Radio.Group>
        </>
    );
}
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
        color: "rgb(5, 180, 90)",
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
            <Flex wrap gap="middle" align="center" justify="space-evenly">
                <Button
                    type="primary"
                    onClick={() =>
                        onChange((temp) =>
                            temp - 1 < minTemp ? minTemp : temp - 1
                        )
                    }
                >
                    <AiOutlineCaretDown />
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
                    <AiOutlineCaretUp />
                </Button>
            </Flex>
        </>
    );
}

function Power() {
    const ac = useAc();
    const dispatch = useAcDispatch();

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        lineWidthFocus: 0,
                        colorPrimary: "rgb(255, 0, 0)",
                    },
                    components: {
                        Switch: {
                            trackHeight: 36,
                            trackMinWidth: 80,
                            handleSize: 32,
                        },
                    },
                }}
            >
                <Tooltip title="电源开关">
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        className="big-switch"
                        checked={ac.isOn}
                        onChange={(checked) =>
                            dispatch({ type: "power", isOn: checked })
                        }
                    />
                </Tooltip>
            </ConfigProvider>
        </>
    );
}

export default function AcControl() {
    return (
        <>
            <AcProvider>
                <Flex vertical gap="middle">
                    <Temp></Temp>
                    <WindSpeed></WindSpeed>
                    <div>
                        <Power></Power>
                    </div>
                </Flex>
            </AcProvider>
        </>
    );
}
