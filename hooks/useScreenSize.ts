import { useMediaQuery } from "usehooks-ts";

export const useScreenSize = () => {
  const isMobile = useMediaQuery("(max-width: 850px)");

  return {
    isMobile,
  };
};
