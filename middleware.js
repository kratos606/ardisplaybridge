export const config = { matcher: "/:id*" };

export default async function middleware(req) {
  // Check if the user-agent is one of the known social media crawlers
  const userAgent = req.headers.get("user-agent") || "";
  const crawlerRegex =
    /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator/i;
  const isSocialCrawler = crawlerRegex.test(userAgent);

  // If it isn't a crawler, continue with the default response (the SPA)
  if (!isSocialCrawler) {
    return;
  }

  // Extract the model id from the URL path
  // For instance, if the URL is https://example.com/123 then id === "123".
  const { pathname, origin } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const id = segments[0];
  if (!id) {
    // If no id is present, return the unmodified response.
    return;
  }

  // Define your API endpoint (update this URL as needed).
  // This assumes your API expects a query parameter "id".
  const apiEndpoint = `https://ardisplayboilerplate.vercel.app/api/3d-model?id=${id}`;

  // Fetch the data from your API using the native fetch.
  let modelData;
  try {
    const apiRes = await fetch(apiEndpoint);
    if (!apiRes.ok) {
      console.error("Error fetching model data:", apiRes.statusText);
      return;
    }
    modelData = await apiRes.json();
  } catch (err) {
    console.error("Error during fetch:", err);
    return;
  }

  // Extract the necessary fields from the data.
  const posterImage = modelData?.options?.[0]?.posterFileUrl || "";
  const logoImage = modelData?.logo || "";
  const title = modelData?.title || "View Our Model";
  const description = `Check out the model: ${title}`;

  // Create an HTML response with the meta tags for social crawlers.
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${posterImage}" />
    <meta property="og:url" content="${origin}${pathname}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${posterImage}" />
  </head>
  <body>
    <!-- Optionally, you can include a visual element as a fallback -->
    <img src="${posterImage}" alt="Model Poster" style="max-width:100%;"/>
  </body>
  </html>`;

  // Return the custom HTML response to the crawler
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
