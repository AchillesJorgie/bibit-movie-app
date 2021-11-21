import React, { ReactElement } from "react";
import { Dialog, DialogContent } from "@material-ui/core";

type Props = {
  isOpen: boolean;
  onDismiss: Function;
  children: ReactElement;
};

function PosterModal(props: Props) {
  let { isOpen, onDismiss, children } = props;
  return (
    <Dialog
      open={isOpen}
      onBackdropClick={() => onDismiss()}
      onClose={() => onDismiss()}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default PosterModal;
