const server = Bun.serve({
    port: 8080,
    routes: {
        "/api": {
            GET: () => {
                return new Response(new Date().getTime().toString(), {
                    status: 200,
                    headers: {
                        "content-type": "text/plain",
                    },
                });
            },
        },
    },
});

console.log(`Server running on port ${server.port}`);
