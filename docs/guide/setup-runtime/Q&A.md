# Q & A

> 如需新增, 请新建 `docs/guide/setup-runtime/Q&A-detail/{新问题}.md`
>
> 内容参考模板 `docs/guide/setup-runtime/Q&A-detail/template.md.tpl`

## 常见问题

<script setup lang="ts">
import { data } from './Q&A-detail/list.data.ts'

</script>

<div>
    <details v-for="d of data" class="qa-list">
        <summary class="title">
            <h4 class="link" target="_blank" > {{ d.frontmatter.title }}</h4>
            <span class="author">by {{ d.frontmatter.author }}</span>
        </summary>
        <div class="detail" v-html="d.html"></div>
    </details>
</div>

<style lang="sass">
.qa-list
    .title
        display: flex
        &::before
            content: '>'
            margin-right: 10px
        .link
            flex: 1
            cursor: pointer
        .author
            font-size: 12px
    .detail
        margin-left: 20px
        background: aliceblue
        padding: 5px 10px
        border-bottom-left-radius: 10px
        border-bottom-right-radius: 10px
</style>
