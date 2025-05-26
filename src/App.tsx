import { useState } from "react";
import "./App.css";
import { Divider } from "antd";
import useSWR, { SWRConfig, useSWRConfig, type SWRConfiguration } from "swr";

import AcControl from "./components/AcControl";

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
                    <AcControl></AcControl>
                    <Divider style={{ borderColor: "#7cb305" }}></Divider>

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
