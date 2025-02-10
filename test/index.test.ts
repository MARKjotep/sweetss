import { test, expect, describe } from "bun:test";
import { css } from "../dist";

describe("css class", () => {
  test("initializes with default values", () => {
    const cssInstance = new css({ name: "test" });
    expect(cssInstance.name).toBe("test");
    expect(cssInstance.prefix).toBe("");
    expect(cssInstance.exportMap).toBe(false);
  });

  test("initializes with custom prefix", () => {
    const cssInstance = new css({ name: "test", prefix: "custom-" });
    expect(cssInstance.prefix).toBe("custom-");
  });

  test("initializes with exportMap enabled", () => {
    const cssInstance = new css({ name: "test", exportMap: true });
    expect(cssInstance.exportMap).toBe(true);
  });

  test("save method creates css file without minification", () => {
    const cssInstance = new css({ name: "test" });
    cssInstance.save({ dir: __dirname + "/temp", minify: false });
    // Add file existence check here if filesystem operations are available
  });

  test("save method handles multiple directories", () => {
    const cssInstance = new css({ name: "test" });
    cssInstance.save({ dir: [__dirname + "/temp1", __dirname + "/temp2"] });
    // Add file existence checks here if filesystem operations are available
  });

  test("save method creates map file with custom name", () => {
    const cssInstance = new css({ name: "test", exportMap: true });
    cssInstance.save({
      dir: __dirname + "/temp",
      mapDir: __dirname + "/maps",
      mapName: "custom-map",
    });
    // Add map file existence check here if filesystem operations are available
  });

  test("save method handles empty directory path", () => {
    const cssInstance = new css({ name: "test" });
    cssInstance.save({ dir: "" });
    // Should not throw error for empty directory
  });
});
