import { useCallback } from "react";
import { useToast } from "./use-toast";

export function useClipboard() {
  const { toast } = useToast();
  const copy = useCallback((text: string) => {
    if (!text) {
      return;
    }
    if (navigator.clipboard === undefined) {
      toast({
        title: "您的浏览器不支持复制",
        variant: "destructive",
      });
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "已复制到剪贴板",
      });
    }).catch(() => {
      toast({
        title: "复制失败",
        variant: "destructive",
      });
    });
  }, [toast])
  return { copy };
}