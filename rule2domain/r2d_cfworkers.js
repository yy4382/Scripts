addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function convert(url, type) {
    try {
        const response = await fetch(url);
        const rawContents = await response.text();
        const lines = rawContents.split('\n');
        let domains = [];
        let rules = [];
        domains.push('# ' + url);
        domains.push('# converted domain/rule-set by https://github.com/yy4382/Scripts/blob/main/rule2domain/README.md');
        domains.push('');
        rules.push('# ' + url);
        rules.push('# converted domain/rule-set by https://github.com/yy4382/Scripts/blob/main/rule2domain/README.md');
        rules.push('');
        for (let line of lines) {
            line = line.replace(/\s/g, '');
            if (line.startsWith('DOMAIN,')) {
                domains.push(line.substring(7));
            } else if (line.startsWith('DOMAIN-SUFFIX,')) {
                domains.push('.' + line.substring(14));
            } else {
                rules.push(line);
            }
        }
        if (type === 'domain') {
            return domains.join('\n');
        } else if (type === 'rule') {
            return rules.join('\n');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function handleRequest(request) {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/get_urls')) {
        const { searchParams } = new URL(request.url)
        const parsedUrl = searchParams.get('url')
        const ruleSetUrl = `${url.origin}/rule/${encodeURIComponent(parsedUrl)}`
        const domainSetUrl = `${url.origin}/domain/${encodeURIComponent(parsedUrl)}`
        return new Response(`<a href="${ruleSetUrl}">rule-set url</a><br><a href="${domainSetUrl}">domain-set url</a><br>`,
            { headers: { 'content-type': 'text/html' } })
    }

    if (url.pathname.startsWith('/rule')) {
        const ruleUrl = decodeURIComponent(url.pathname.split("/")[2])
        const rules = await convert(ruleUrl, 'rule')
        return new Response(rules, { headers: { 'content-type': 'text/plain' } })
    }

    if (url.pathname.startsWith('/domain')) {
        const domainUrl = decodeURIComponent(url.pathname.split("/")[2])
        const domains = await convert(domainUrl, 'domain')
        return new Response(domains || '', { headers: { 'content-type': 'text/plain' } })
    }

    // Root path
    if (url.pathname === '/') {
        return new Response(`
        <form action="/get_urls" method="get">
          <input type="text" name="url" placeholder="url">
          <input type="submit" value="Get URLs">
        </form>
      `, { headers: { 'content-type': 'text/html' } })
    }

    return new Response('404 Not Found', { status: 404 })
}