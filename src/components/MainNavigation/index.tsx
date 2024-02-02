"use client";

import { AddTodoForm } from "components/AddTodoForm";
import { Modal } from "components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AddTodoButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        whileTap={{
          scale: 0.9,
        }}
        onClick={() => setIsOpen(true)}
        className="fixed w-20 h-20 bg-gray-900 rounded-full bottom-4 left-1/2 -ml-10 shadow-xl flex items-center justify-center"
      >
        <PlusIcon className="w-10 h-10 text-white" />
      </motion.div>
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
