import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";
import { Button, Divider } from "antd";
import useSWR, { SWRConfig, useSWRConfig, type SWRConfiguration } from "swr";
import { responsiveArray } from "antd/es/_util/responsiveObserver";
import { useImmerReducer } from "use-immer";

import { FaBeer } from "react-icons/fa";
import AcControl from "./components/AcControl";

function MyComponent() {
  return (
    <Button type="primary" icon={<FaBeer />}>
      喝一杯 🍺
    </Button>
  );
}



const fetcher = (url: RequestInfo | URL) => {
    console.log("请求 ", url);

    return fetch(url).then((res) => res.json());
};
function App() {
 
    const swrConfig: SWRConfiguration = {
        refreshInterval: 3000,
        fetcher: fetcher,
    };
    //    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`); //免费api接口 可以直接使用

    const [uid, setUid] = useState(1);
    const { data, error, isLoading } = useSWR(
        `https://jsonplaceholder.typicode.com/users/${uid}`,
        fetcher
    );
    const swrcc = useSWRConfig();

    return (
        <>
            <SWRConfig value={swrConfig}>
                <div>
                    <AcControl>
                    </AcControl>
                      <Divider style={{ borderColor: '#7cb305' }}>Solid</Divider>

                    <MyComponent></MyComponent>
                    <Button type="primary">Button</Button>
                    <Card></Card>
                
                    <button
                        onClick={() => {
                            setUid((i) => i + 1);
                        }}
                    >
                        获取json:{uid}
                    </button>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    <p>出错了: {error}</p>
                    <p>加载中...{isLoading}</p>
                    <pre>
                        <pre>{JSON.stringify(swrcc, null, 2)}</pre>
                    </pre>
                </div>
            </SWRConfig>
        </>
    );
}

export default App;
