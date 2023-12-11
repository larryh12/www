import * as fs from "fs/promises";
import { join as pathJoin } from "path";
import { BUNDLED_LANGUAGES, renderToHtml, getHighlighter } from "shiki";

let highlighter;

const touched = { current: false };

const getShikiPath = (): string => {
  return pathJoin(process.cwd(), "src/lib/shiki");
};

const touchShikiPath = (): void => {
  if (touched.current) return;
  fs.readdir(getShikiPath());
  touched.current = true;
};

export async function highlight(code, lang) {
  touchShikiPath();
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: ["html", "css", "javascript", "python"],
      themes: ["dark-plus", "light-plus"],
      paths: {
        languages: `${getShikiPath()}/languages/`,
        themes: `${getShikiPath()}/themes/`,
      },
    });
  }

  // Check for the loaded languages, and load the language if it's not loaded yet.
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    // Check if the language is supported by Shiki
    const bundles = BUNDLED_LANGUAGES.filter((bundle) => {
      // Languages are specified by their id, they can also have aliases (i. e. "js" and "javascript")
      return bundle.id === lang || bundle.aliases?.includes(lang);
    });
    if (bundles.length > 0) {
      await highlighter.loadLanguage(lang);
    } else {
      // Do some error handling or default to another language or...
    }
  }

  const tokensDark = highlighter.codeToThemedTokens(code, lang, "dark-plus");
  const tokensLight = highlighter.codeToThemedTokens(code, lang, "light-plus");

  const htmlDark = renderToHtml(tokensDark, {
    bg: "transparent",
    elements: {
      pre({ className, style, children }) {
        return `<pre class="${className} shiki-dark" style="${style}" tabindex="0">${children}</pre>`;
      },
    },
  });

  const htmlLight = renderToHtml(tokensLight, {
    bg: "transparent",
    elements: {
      pre({ className, style, children }) {
        return `<pre class="${className} shiki-light" style="${style}" tabindex="0">${children}</pre>`;
      },
    },
  });

  return htmlDark + htmlLight;
}
