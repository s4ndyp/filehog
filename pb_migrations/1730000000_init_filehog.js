/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const settings = app.settings()
  settings.meta.appName = "FileHog"

  app.save(settings)

  const tags = new Collection({
    type: "base",
    name: "tags",
    listRule: "",
    viewRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: "",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        min: 1,
        max: 64,
      },
      {
        name: "color",
        type: "text",
        required: false,
        max: 7,
      },
    ],
    indexes: [
      "CREATE UNIQUE INDEX `idx_tags_name` ON `tags` (`name`)",
    ],
  })
  app.save(tags)

  const tagsCol = app.findCollectionByNameOrId("tags")

  const photos = new Collection({
    type: "base",
    name: "photos",
    listRule: "",
    viewRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: "",
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
        min: 1,
        max: 200,
      },
      {
        name: "image",
        type: "file",
        required: true,
        maxSelect: 1,
        maxSize: 52428800,
        mimeTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/heic",
          "image/heif",
        ],
        thumbs: ["200x200", "400x400", "800x0"],
      },
      {
        name: "original",
        type: "file",
        required: false,
        maxSelect: 1,
        maxSize: 104857600,
        mimeTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "image/heic",
          "image/heif",
        ],
      },
      {
        name: "tags",
        type: "relation",
        required: false,
        collectionId: tagsCol.id,
        maxSelect: 50,
        cascadeDelete: false,
      },
      {
        name: "taken_at",
        type: "date",
        required: false,
      },
      {
        name: "latitude",
        type: "number",
        required: false,
        onlyInt: false,
      },
      {
        name: "longitude",
        type: "number",
        required: false,
        onlyInt: false,
      },
      {
        name: "width",
        type: "number",
        required: false,
        onlyInt: true,
      },
      {
        name: "height",
        type: "number",
        required: false,
        onlyInt: true,
      },
      {
        name: "file_size",
        type: "number",
        required: false,
        onlyInt: true,
      },
      {
        name: "compressed",
        type: "bool",
        required: false,
      },
    ],
    indexes: [
      "CREATE INDEX `idx_photos_taken_at` ON `photos` (`taken_at`)",
      "CREATE INDEX `idx_photos_title` ON `photos` (`title`)",
    ],
  })
  app.save(photos)
}, (app) => {
  try {
    app.delete(app.findCollectionByNameOrId("photos"))
  } catch (_) {}
  try {
    app.delete(app.findCollectionByNameOrId("tags"))
  } catch (_) {}
})
