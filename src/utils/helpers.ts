export const scrollToBottom = (divRef: React.RefObject<HTMLDivElement>) => {
  if (divRef.current !== null) {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }
};

export const getScreenWidth = (): number => {
  const { innerWidth } = window;
  return innerWidth;
};
