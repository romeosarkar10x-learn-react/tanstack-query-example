import { type QueryFunctionContext, useQuery } from "@tanstack/react-query";

async function getTime(context: QueryFunctionContext<["app"]>) {
    console.log("getTime:", context);
    const response = await fetch("http://localhost:8080/api");

    if (response.status !== 200) {
        console.error("Response status !== 200");
        throw new Error(`Request failed with status ${response.status}`);
    }

    let timeText: string;

    try {
        timeText = await response.text();
    } catch (err) {
        if (err instanceof DOMException) {
            throw new Error(`Request was aborted`);
        } else if (err instanceof TypeError) {
            throw new Error(
                `Either response body was locked or there was an error decoding the body content (for example, because the 'Content-Encoding' header was incorrect)`,
            );
        } else {
            throw new Error(`Unknown error`);
        }
    }

    const timeInt = parseInt(timeText);

    if (isNaN(timeInt)) {
        throw new Error(`Failed to parse response body as int`);
    }

    const time = new Date(timeInt);
    return time;
}

export default function ServerTime() {
    const q = useQuery({
        queryKey: ["app"],
        queryFn: getTime,
    });

    if (q.isPending) {
        return <p>Loading...</p>;
    }

    if (q.isError) {
        return <p>Error: {q.error.message}</p>;
    }

    return (
        <p>
            {q.data.toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "full",
            })}{" "}
            [ Server time ]
        </p>
    );
}
