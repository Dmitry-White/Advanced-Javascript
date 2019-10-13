const productSchema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "http://example.com/schemas/products.json",
  "title": "H+ sport products",
  "description": "Schema for H+ sport product data",

  "type:": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "image": {
            "type": "string"
          },
          "alt": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "image",
          "alt"
        ]
      }
    },
    "required": [
      "products"
    ]
  }
};