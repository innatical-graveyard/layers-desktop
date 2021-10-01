import useMarkdown from "@innatical/markdown";

export const useMarkdownPresets = (content: string) => {
  return useMarkdown(content, {
    bold: (content, key) => <b key={key}>{content}</b>,
    italic: (content, key) => <em key={key}>{content}</em>,
    underlined: (content, key) => <u key={key}>{content}</u>,
    strikethough: (content, key) => <del key={key}>{content}</del>,
    link: (content, key) => (
      <a
        key={key}
        href={content}
        className="text-inndigo"
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    ),
    codeblock: (content, key) => <code key={key}>{content}</code>,
    custom: [],
  });
};
