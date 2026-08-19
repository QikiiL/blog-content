import { defineConfig } from "tinacms";

// TinaCMS 配置：用于编辑 Mizuki 博客的独立内容仓库。
// 本地模式无需 clientId/token；使用 Tina Cloud 时再填入真实值。
export default defineConfig({
  branch: "main",
  clientId: "",
  token: "",

  build: {
    outputFolder: "admin",
    // 内容仓库没有 public/ 目录，图片直接放在根目录 images/ 下，
    // 这样上传后路径为 /images/...，与博客的 public/images 映射一致。
    publicFolder: ".",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: ".",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "博客文章",
        path: "posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "published",
            label: "发布日期",
            required: true,
          },
          {
            type: "datetime",
            name: "updated",
            label: "更新日期",
            indexed: false,
          },
          {
            type: "boolean",
            name: "draft",
            label: "草稿",
            indexed: false,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            ui: { component: "textarea" },
            indexed: false,
          },
          {
            type: "image",
            name: "image",
            label: "封面图",
            indexed: false,
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
            indexed: false,
          },
          {
            type: "string",
            name: "category",
            label: "分类",
            indexed: false,
          },
          {
            type: "string",
            name: "lang",
            label: "语言",
            indexed: false,
          },
          {
            type: "boolean",
            name: "pinned",
            label: "置顶",
            indexed: false,
          },
          {
            type: "boolean",
            name: "comment",
            label: "允许评论",
            indexed: false,
          },
          {
            type: "number",
            name: "priority",
            label: "优先级",
            indexed: false,
          },
          {
            type: "string",
            name: "author",
            label: "作者",
            indexed: false,
          },
          {
            type: "string",
            name: "sourceLink",
            label: "原文链接",
            indexed: false,
          },
          {
            type: "string",
            name: "licenseName",
            label: "许可证名称",
            indexed: false,
          },
          {
            type: "string",
            name: "licenseUrl",
            label: "许可证链接",
            indexed: false,
          },
          {
            type: "boolean",
            name: "encrypted",
            label: "加密文章",
            indexed: false,
          },
          {
            type: "string",
            name: "password",
            label: "访问密码",
            indexed: false,
          },
          {
            type: "string",
            name: "passwordHint",
            label: "密码提示",
            indexed: false,
          },
          {
            type: "boolean",
            name: "hideHomeContent",
            label: "首页隐藏正文",
            indexed: false,
          },
          {
            type: "string",
            name: "alias",
            label: "别名",
            indexed: false,
          },
          {
            type: "string",
            name: "permalink",
            label: "自定义固定链接",
            indexed: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文",
            isBody: true,
            indexed: false,
          },
        ],
      },
      {
        name: "spec",
        label: "特殊页面",
        path: "spec",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "正文",
            isBody: true,
            indexed: false,
          },
        ],
      },
    ],
  },
});
