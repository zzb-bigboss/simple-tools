import { Print } from "./index.module";

export class Console {
  /**
   * 输出项集合
   * @type {Array}
   */
  collection: Print[] = [];

  /**
   * 输出info信息
   * @param title 输出标题
   * @param content 输出内容
   */
  static info(content: string, title = "info"): void {
    this.customLog(title, content, "#909399");
  }

  /**
   * 输出warning信息
   * @param title 输出标题
   * @param content 输出内容
   */
  static warning(content: string, title = "info"): void {
    this.customLog(title, content, "#E6A23C");
  }

  /**
   * 输出error信息
   * @param content 输出内容
   * @param {string} [title="error"]   输出标题
   */
  static error(content: string, title = "error"): void {
    this.customLog(title, content, "#F56C6C");
  }

  /**
   * 输出success信息
   *  @param {string} content 输出内容
   * @param {string} [title='success']  输出标题
   */
  static success(content: string, title = "success"): void {
    this.customLog(title, content, "#67C23A");
  }

  /**
   * 追加输入文本
   * @param text 文本内容
   * @param style 文本样式
   * @returns
   */
  append(text: string, style?: Partial<CSSStyleDeclaration>): this {
    this.collection.push({ text, style });
    return this;
  }

  /**
   * 构建输出文本
   */
  build(prints = this.collection): string {
    let content: string = "";
    const style: string[] = [];
    prints.forEach((print) => {
      if (print.style) {
        content = content + "%c";
        style.push(`"${this.#cssObjectToInlineCss(print.style)}"`);
      } else {
        style.push("");
      }
      content = content + print.text;
    });
    console.log("style格式化：", `${style.toString()}`);
    return `"${content}", ${style.toString()}`;
  }

  /**
   * 输入当前文本
   */
  print(content = this.build(this.collection)) {
    console.log(content);
  }

  /**
   * 私有方法 css转行内样式
   * @param { object } cssObject - css对象
   * @returns { string } css字符串
   */
  #cssObjectToInlineCss(cssObject: Partial<CSSStyleDeclaration>): string {
    return Object.keys(cssObject)
      .filter((key) => {
        const value = cssObject[key as keyof CSSStyleDeclaration];
        return typeof value === "string" || typeof value === "number";
      })
      .map((key) => {
        // 将驼峰命名转换为短横线命名
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        const cssValue = cssObject[key as keyof CSSStyleDeclaration];
        return `${cssKey}: ${cssValue};`;
      })
      .join(" ");
  }

  /**
   * 自定义样式输出
   * @param {string} title - 输出标题
   * @param {string} content - 输出内容
   * @param {string} themeColor - 主题色
   */
  static customLog(title: string, content: string, themeColor: string) {
    const consoleInstance = new Console();
    const printContent: Print[] = [
      {
        text: title,
        style: {
          background: themeColor,
          border: "1px solid " + themeColor,
          padding: "1px",
          borderRadius: "2px 0 0 2px",
          color: "#fff",
        },
      },
      {
        text: content,
        style: {
          border: "1px solid " + themeColor,
          padding: "1px",
          borderRadius: "0 2px 2px 0",
          color: themeColor,
        },
      },
      {
        text: "",
        style: {
          background: "transparent",
        },
      },
    ];
    consoleInstance.print(consoleInstance.build(printContent));
  }
}
