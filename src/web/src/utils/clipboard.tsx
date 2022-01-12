const CopyTextToClipboard = (
  text: string,
  onSuccess: () => void,
  onFailure: () => void
) => {
  if (!navigator.clipboard) {
    onSuccess();
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      onSuccess();
    },
    function (err) {
      onFailure();
    }
  );
};
export default CopyTextToClipboard;
