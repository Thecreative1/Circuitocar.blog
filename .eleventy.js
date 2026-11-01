const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Copy static assets as-is
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  // Collection of all blog articles (tagged "article"), newest first
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByTag("article")
      .sort((a, b) => b.date - a.date);
  });

  // Featured article for homepage hero (featured: true, or newest)
  eleventyConfig.addCollection("featuredArticle", function(collectionApi) {
    const all = collectionApi.getFilteredByTag("article")
      .sort((a, b) => b.date - a.date);
    return [all.find(a => a.data.featured === true) || all[0]].filter(Boolean);
  });

  // Up to 4 side articles for homepage (all except featured)
  eleventyConfig.addCollection("homeArticles", function(collectionApi) {
    const all = collectionApi.getFilteredByTag("article")
      .sort((a, b) => b.date - a.date);
    const featured = all.find(a => a.data.featured === true) || all[0];
    if (!featured) return all.slice(0, 4);
    return all.filter(a => a.fileSlug !== featured.fileSlug).slice(0, 4);
  });

  // Filter articles by category for artigos.njk
  eleventyConfig.addFilter("filterByCategory", function(articles, category) {
    return (articles || []).filter(a => a.data && a.data.category === category);
  });

  // Only hand-written articles (.md), without the generated city pages
  eleventyConfig.addFilter("onlyGuides", function(articles) {
    return (articles || []).filter(a => a.inputPath.endsWith(".md"));
  });

  // Questions from the FAQPage JSON-LD, shown on the page too (Google requires FAQ markup to be visible).
  // Articles that already wrote their own "Perguntas frequentes" section keep it instead.
  eleventyConfig.addFilter("faqItems", function(schemaOrg, content) {
    if (!schemaOrg || /Perguntas frequentes/i.test(content || "")) return [];
    for (const m of String(schemaOrg).matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) {
      const data = JSON.parse(m[1]);
      if (data["@type"] === "FAQPage") {
        return data.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text }));
      }
    }
    return [];
  });

  // Table of contents: one id per <h2>, in order. Only long articles get an index.
  function headingId(text, used) {
    const base = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/&[a-z]+;/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let id = base, n = 2;
    while (used.has(id)) id = base + "-" + n++;
    used.add(id);
    return id;
  }
  const stripTags = html => html.replace(/<[^>]+>/g, "").trim();

  eleventyConfig.addFilter("tocItems", function(html) {
    const text = String(html || "");
    const words = stripTags(text).split(/\s+/).length;
    const used = new Set();
    const items = [...text.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => {
      const label = stripTags(m[1]);
      return { id: headingId(label, used), text: label };
    });
    return words >= 700 && items.length >= 4 ? items : [];
  });

  eleventyConfig.addFilter("withHeadingIds", function(html) {
    const used = new Set();
    return String(html || "").replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (all, attrs, inner) =>
      `<h2${attrs} id="${headingId(stripTags(inner), used)}">${inner}</h2>`);
  });

  // Absolute URL filter (used by RSS)
  eleventyConfig.addFilter("absoluteUrl", function(url, base) {
    return new URL(url, base).href;
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateIso", function(date) {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("dateReadable", function(date) {
    return new Date(date).toLocaleDateString("pt-PT", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
