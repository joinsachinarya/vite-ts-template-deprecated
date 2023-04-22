import React, {
  FC,
  PropsWithChildren,
  Ref,
  RefObject,
  useEffect,
  useState,
} from "react";

interface MenuProps {
  open: boolean;
  anchor: HTMLButtonElement;
  disableAnchorBasedPositioning?: boolean;
}

const Menu: FC<PropsWithChildren<MenuProps>> = ({
  children,
  open,
  anchor,
  disableAnchorBasedPositioning,
}) => {
  const [menuState, setMenuState] = useState<
    undefined | { x: number; y: number }
  >(undefined);

  useEffect(() => {
    const newState = {
      x: disableAnchorBasedPositioning
        ? 0
        : anchor?.getBoundingClientRect?.()?.x ??
          0 + (anchor?.getBoundingClientRect?.()?.width ?? 0) / 2,
      y: disableAnchorBasedPositioning
        ? 0
        : anchor?.getBoundingClientRect?.().y ??
          0 + anchor?.getBoundingClientRect().height ??
          0,
    };

    setMenuState(!open ? undefined : newState);

    // return () => {};
  }, [open]);
  return (
    <div
      className={`absolute bg-white
         ${menuState ? "block" : "hidden"}`}
      style={{
        left: menuState?.x,
        top: menuState?.y,
      }}
    >
      {children}
    </div>
  );
};

export default Menu;
