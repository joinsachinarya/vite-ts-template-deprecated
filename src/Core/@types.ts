interface ViewModel<H> {
  Hook: () => H;
  CtxProvider: React.Provider<H>;
}

export default ViewModel;
