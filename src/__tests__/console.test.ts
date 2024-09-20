import { Console } from "../index";

describe("Console class", () => {
  it("should log a message", () => {
    const log = new Console();

    log.append("测试内容：", {
      color: "blue",
      fontWeight: "bold",
      fontSize: "14px",
      background: "yellow",
    });

    log.print();
  });
});
