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
      {
        name: "global",
        label: "全局配置",
        path: "global",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "announcement",
            label: "公告栏",
            fields: [
              {
                type: "string",
                name: "title",
                label: "公告标题（留空使用默认文案）",
              },
              {
                type: "string",
                name: "content",
                label: "公告内容",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "icon",
                label: "图标",
                description: "可选的 iconify 图标名",
              },
              {
                type: "string",
                name: "type",
                label: "公告类型",
                options: ["info", "warning", "success", "error"],
                ui: { component: "select" },
              },
              {
                type: "boolean",
                name: "closable",
                label: "允许用户关闭公告",
              },
              {
                type: "object",
                name: "link",
                label: "链接",
                fields: [
                  {
                    type: "boolean",
                    name: "enable",
                    label: "启用链接",
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "链接文字",
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "链接地址",
                  },
                  {
                    type: "boolean",
                    name: "external",
                    label: "外部链接",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "site",
            label: "站点信息",
            fields: [
              {
                type: "string",
                name: "title",
                label: "站点标题",
              },
              {
                type: "string",
                name: "subtitle",
                label: "站点副标题",
              },
              {
                type: "string",
                name: "siteURL",
                label: "站点 URL",
                description: "末尾以 / 结尾",
              },
              {
                type: "string",
                name: "siteStartDate",
                label: "站点开始日期",
                description: "格式 YYYY-MM-DD，用于计算运行天数",
              },
              {
                type: "string",
                name: "timeZone",
                label: "时区",
                description: "IANA 时区，如 Asia/Shanghai",
              },
            ],
          },
          {
            type: "object",
            name: "profile",
            label: "个人资料",
            fields: [
              {
                type: "string",
                name: "name",
                label: "昵称",
              },
              {
                type: "string",
                name: "bio",
                label: "个人简介",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "avatar",
                label: "头像",
              },
            ],
          },
        ],
      },
    ],
  },
});
