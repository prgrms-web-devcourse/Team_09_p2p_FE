function useMoveScroll(element: HTMLElement | null) {
  const onMoveToElement = () => {
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return { onMoveToElement };
}

export default useMoveScroll;
