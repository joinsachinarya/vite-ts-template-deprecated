import React from "react";
import ViewModel from "./@types";

/**
 * HOC
 *
 * binds A View with its ViewModel
 */
function withViewModel<P, H>(C: React.FC<P>, vm: ViewModel<H>) {
  const ComponentWithViewModel = (props: P) => {
    const state = vm.Hook();

    return (
      <vm.CtxProvider value={state}>
        <C
          {...(props as P & JSX.IntrinsicAttributes)}
          {...(state as unknown as P)}
        />
      </vm.CtxProvider>
    );
  };
  return ComponentWithViewModel;
}

export default withViewModel;
