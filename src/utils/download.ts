/**
 * 下载音频
 * @param blob 音频Blob对象
 */
export const downloadAudio = (blob: Blob): void => {
  try {
    const link = document.createElement("a");
    const href = URL.createObjectURL(blob);
    const time = Date.now();
    const fileName = `小笨音频_${time}.mp3`;

    link.href = href;
    link.download = fileName;

    // 添加到DOM并触发点击
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error("下载音频失败:", error);
    throw new Error(`下载音频失败: ${error instanceof Error ? error.message : "未知错误"}`);
  }
};
