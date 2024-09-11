'use client';
import { ShareSocial } from 'react-share-social';
import { Modal } from 'flowbite-react';
import { Share2 } from 'lucide-react';

import { useState } from 'react';

export default function ProductShare({ urlToShare }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
        onClick={() => setOpenModal(true)}
      >
        <Share2 />
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
          <Modal.Header className="border-b p-4 text-lg font-semibold">
            Share this product with Others
          </Modal.Header>
          <Modal.Body className="p-4">
            <ShareSocial
              url={urlToShare}
              socialTypes={[
                'facebook',
                'twitter',
                'whatsapp',
                'linkedin',
                'email',
                'telegram',
              ]}
            />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
