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
        className="z-50
        mx-auto max-w-sm sm:max-w-md"
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg  w-full">
          <Modal.Header className="border-b p-4 text-lg font-semibold">
            Share this product with Others
          </Modal.Header>
          <Modal.Body>
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
