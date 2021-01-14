import { useCallback, useEffect } from "react";

const useClickOutside = (
  current: HTMLDivElement,
  setter: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const clickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target ? e.target : "";

      const doesCurrentContainsTarget = (ref: HTMLDivElement, target: any) => {
        return ref.contains(target);
      };

      if (!current || doesCurrentContainsTarget(current, target)) return null;
      setter(false);
    },
    [current, setter],
  );

  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  }, [clickOutside]);
};

export default useClickOutside;
