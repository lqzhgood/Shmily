import { createContentLoader } from 'vitepress';

export default createContentLoader('guide/setup-runtime/Q&A-detail/*.md', {
    includeSrc: true, // include raw markdown source?
    render: true, // include rendered full page HTML?
    excerpt: true, // include excerpt?
});
