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
