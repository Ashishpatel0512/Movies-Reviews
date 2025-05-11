// components/AlertBox.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AlertBox({ show, onClose, message = "This is an alert!" }) {
  return (
    <div className="fixed top-5 right-5 z-50">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-blue-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <span>{message}</span>
            <button onClick={onClose} className="ml-auto">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
