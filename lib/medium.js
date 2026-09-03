// Medium has no API for a profile's stories, but every profile has an RSS
// feed. Parsed with regex on purpose: the feed is a fixed shape and a full
// XML parser is a dependency for six fields.
const cdata = (xml, tag) => xml.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))?.[1] || '';

const text = html =>
  html
    .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const parseMediumFeed = xml =>
  xml
    .split('<item>')
    .slice(1)
    .map(item => ({
      title: cdata(item, 'title'),
      href: cdata(item, 'link').split('?')[0],
      date: new Date(cdata(item, 'pubDate')).toISOString().slice(0, 10),
      excerpt: text(cdata(item, 'content:encoded') || cdata(item, 'description')).slice(0, 300),
    }));

// Stories from a Medium profile, newest first. Empty when the feed is
// unreachable so the posts page still builds.
export async function mediumStories(profileUrl) {
  try {
    const handle = profileUrl.split('/@')[1];
    const res = await fetch(`https://medium.com/feed/@${handle}`);
    if (!res.ok) return [];
    return parseMediumFeed(await res.text());
  } catch {
    return [];
  }
}
