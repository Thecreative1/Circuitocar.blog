module.exports = {
  layout: "article.njk",
  tags: "article",
  eleventyComputed: {
    // Outputs to /_site/article-slug.html (flat, matching existing article URLs)
    permalink: (data) => `${data.page.fileSlug}.html`
  }
};
