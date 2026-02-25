const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const server = Bun.serve({
    port: 8080,
    routes: {
        "/api": {
            GET: () => {
                return new Response(new Date().getTime().toString(), {
                    status: 200,
                    headers: {
                        "content-type": "text/plain",
                        ...corsHeaders,
                    },
                });
            },
            OPTIONS: () => {
                return new Response(null, { status: 204, headers: corsHeaders });
            },
        },
    },
});

console.log(`Server running on port ${server.port}`);
