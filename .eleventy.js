const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Copy static assets as-is
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Collection of all blog articles (tagged "article"), newest first
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByTag("article")
      .sort((a, b) => b.date - a.date);
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
