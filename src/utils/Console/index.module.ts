/**
 * 输出项
 * @property {string} text - 输出文本
 * @property {CSSStyleDeclaration} style - 文本样式
 */
export interface Print {
  /**
   * 输出文本
   */
  text: string;

  /**
   * 文本样式
   */
  style?: Partial<CSSStyleDeclaration>;
}
