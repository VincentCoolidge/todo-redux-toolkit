import path from "path";

module.exports = {
  resolve: {
    extensions: ["ts", "tsx"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      store: path.resolve(__dirname, "src/store"),
      hooks: path.resolve(__dirname, "src/hooks"),
      types: path.resolve(__dirname, "src/types"),
      services: path.resolve(__dirname, "src/services")
    },
  },
};
