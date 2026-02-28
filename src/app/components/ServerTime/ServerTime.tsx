import { type QueryFunctionContext, useQuery } from "@tanstack/react-query";
import Button from "../Button";

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

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    return time;
}

export default function ServerTime() {
    const query = useQuery({
        queryKey: ["app"],
        queryFn: getTime,
        // staleTime: 2000,
        // refetchInterval: 2000,
    });

    if (query.isPending) {
        return <p>Pending...</p>;
    }

    if (query.isLoading) {
        return <p>Loading...</p>;
    }

    if (query.isError) {
        return <p>Error: {query.error.message}</p>;
    }

    return (
        <p>
            {query.data.toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "full",
            })}{" "}
            [ Server time ]{" "}
            <Button disabled={query.isFetching || query.isRefetching} onClick={() => query.refetch()}>
                Reload
            </Button>
        </p>
    );
}
