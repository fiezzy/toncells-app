import { message } from "antd";
import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

const useCopyToClipboard = (): CopyFn => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      message.success("You have successfully copied the wallet address!");

      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);

      return false;
    }
  };

  return copy;
};

export default useCopyToClipboard;
