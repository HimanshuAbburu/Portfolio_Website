/**
 * Lightweight DOM helpers used across all modules.
 */

/** querySelector shorthand */
const $ = (selector, root = document) => root.querySelector(selector);

/** querySelectorAll shorthand — returns a real array */
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/**
 * Create a DOM element with props and children in one call.
 * Handles aria-* and role attributes correctly via setAttribute.
 */
const el = (tag, props = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === "className") node.className = value;
    else if (key.startsWith("aria-") || key === "role") node.setAttribute(key, value);
    else node[key] = value;
  }
  children
    .flat()
    .forEach((child) =>
      node.append(child?.nodeType ? child : document.createTextNode(child))
    );
  return node;
};

/**
 * WordPress mshot screenshot service URL for a given page URL and width.
 * Returns a 2× srcset-ready image URL.
 */
const mshot = (url, width = 900) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&scale=2`;
