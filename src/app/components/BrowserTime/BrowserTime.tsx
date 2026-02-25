import { useEffect, useState } from "react";

export default function BrowserTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        (async function () {
            setInterval(() => {
                setTime(new Date());
            }, 20);
        })();
    }, []);

    return (
        <p>
            {time.toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "full",
            })}{" "}
            [ Browser time ]
        </p>
    );
}
