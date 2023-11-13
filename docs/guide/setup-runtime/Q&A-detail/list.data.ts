import { createContentLoader } from 'vitepress';
import path from 'path';
import { fileURLToPath } from 'node:url';

const files = path.join(path.dirname(fileURLToPath(import.meta.url)), './*.md');
console.log('🚀 ~ file: list.data.ts:6 ~ files:', files);

export default createContentLoader('guide/setup-runtime/Q&A-detail/*.md', {
    includeSrc: true, // include raw markdown source?
    render: true, // include rendered full page HTML?
    excerpt: true, // include excerpt?
});
