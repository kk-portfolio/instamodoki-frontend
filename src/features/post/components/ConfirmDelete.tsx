import { Button, Modal } from '@/components/Elements';
import React, { ReactNode, useState } from 'react';

type ConfirmDeleteProps = {
  children: ReactNode;
  deleteFn: () => void;
};

export const ConfirmDelete = ({ children, deleteFn }: ConfirmDeleteProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </div>
      <Modal open={open} title="投稿削除">
        <p>投稿を削除します。</p>
        <p>
          この操作は取り消すことができません。
          <br />
          実行してもよろしいですか？
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="inverse"
            onClick={() => {
              setOpen(false);
            }}
          >
            いいえ
          </Button>
          <Button variant="primary" onClick={deleteFn}>
            はい
          </Button>
        </div>
      </Modal>
    </>
  );
};
