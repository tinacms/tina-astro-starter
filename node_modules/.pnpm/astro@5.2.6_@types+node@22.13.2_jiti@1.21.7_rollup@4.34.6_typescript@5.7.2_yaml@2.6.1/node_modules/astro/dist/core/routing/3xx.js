function redirectTemplate({ status, location, from }) {
  const delay = status === 302 ? 2 : 0;
  return `<!doctype html>
<title>Redirecting to: ${location}</title>
<meta http-equiv="refresh" content="${delay};url=${location}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${location}">
<body>
	<a href="${location}">Redirecting ${from ? `from <code>${from}</code> ` : ""}to <code>${location}</code></a>
</body>`;
}
export {
  redirectTemplate
};
