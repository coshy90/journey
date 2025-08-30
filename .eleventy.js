const yaml = require("js-yaml");
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = function(eleventyConfig) {

  // -------------------------------
  // Passthrough copy
  // -------------------------------
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("README.md");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // -------------------------------
  // YAML data support
  // -------------------------------
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  // -------------------------------
  // SVG contents plugin
  // -------------------------------
  eleventyConfig.addPlugin(svgContents);

  // -------------------------------
  // Nunjucks filters for array processing
  // -------------------------------
  eleventyConfig.addNunjucksFilter("unique", function(arr) {
    if (!Array.isArray(arr)) return arr;
    return [...new Set(arr)];
  });

  eleventyConfig.addNunjucksFilter("flatten", function(arrays) {
    return [].concat.apply([], arrays);
  });

  eleventyConfig.addNunjucksFilter("map", function(arr, attr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(item => item[attr]);
  });

  // -------------------------------
  // Add relative_url filter (Liquid-like)
  // -------------------------------
  eleventyConfig.addNunjucksFilter("relative_url", function(url) {
    // Use Eleventy's pathPrefix if available
    const pathPrefix = this.ctx.pathPrefix || "/";
    // Ensure no double slashes
    return pathPrefix.replace(/\/$/, "") + url;
  });

  // -------------------------------
  // Return config
  // -------------------------------
  return {
    dir: {
      input: ".",
      output: "_site",
      layouts: "_layouts"
    },
    pathPrefix: "/"
  };
};
