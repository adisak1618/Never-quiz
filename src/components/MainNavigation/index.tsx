"use client";

import { AddTodoForm } from "components/AddTodoForm";
import { Modal } from "components/Modal";
import { AnimatePresence } from "framer-motion";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AddTodoButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="fixed w-20 h-20 bg-teal-700 rounded-full bottom-4 left-1/2 -ml-10 shadow-xl flex items-center justify-center"
      >
        <PlusIcon className="w-10 h-10 text-white" />
      </div>
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
        {isOpen && (
          <Modal title="Add New Todo" handleClose={() => setIsOpen(false)}>
            <AddTodoForm onSuccess={() => setIsOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
