'use client';

import { Modal } from 'flowbite-react';
import {
  CornerDownLeft,
  Headphones,
  HelpCircle,
  MessageSquare,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HelpModal() {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <button
        className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
        onClick={() => setOpenModal(true)}
      >
        <HelpCircle />
      </button>
      <Modal
        show={openModal}
        onClose={handleCloseModal}
        className="px-[30%] bg-black bg-opacity-50"
      >
        <Modal.Header>
          Need Help with Shopping, Talk to our Help Desk{' '}
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="tel:256783363"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100 font-semibold"
              onClick={handleCloseModal}
            >
              <div className="flex items-center w-10 h-10 bg-green-100 dark:bg-slate-800 justify-center rounded-full">
                <Headphones className="w-6 h-6 text-green-600 dark:text-slate-100" />
              </div>
              <span className="text-green-500 dark:text-slate-100 ">
                Call : 002 01144031576
              </span>
            </Link>
            <Link
              href="/orders"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100 font-semibold"
              onClick={handleCloseModal}
            >
              <div className="flex items-center w-10 h-10 bg-green-100 dark:bg-slate-800 justify-center rounded-full">
                <Truck className="w-6 h-6 text-green-600 dark:text-slate-100" />
              </div>
              <span className="text-green-500 dark:text-slate-100 ">
                Track Your Orders
              </span>
            </Link>
            <Link
              href="tel:256783363"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100 font-semibold"
              onClick={handleCloseModal}
            >
              <div className="flex items-center w-10 h-10 bg-green-100 dark:bg-slate-800 justify-center rounded-full">
                <CornerDownLeft className="w-6 h-6 text-green-600 dark:text-slate-100" />
              </div>
              <span className="text-green-500 dark:text-slate-100 ">
                Returns and Refunds
              </span>
            </Link>
            <Link
              href="tel:256783363"
              className="flex items-center space-x-2 text-green-950 dark:text-slate-100 font-semibold"
              onClick={handleCloseModal}
            >
              <div className="flex items-center w-10 h-10 bg-green-100 dark:bg-slate-800 justify-center rounded-full">
                <MessageSquare className="w-6 h-6 text-green-600 dark:text-slate-100" />
              </div>
              <span className="text-green-500 dark:text-slate-100 ">
                Chat with us
              </span>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
