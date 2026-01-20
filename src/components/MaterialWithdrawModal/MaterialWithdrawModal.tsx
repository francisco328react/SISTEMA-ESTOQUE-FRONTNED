import { Minus, X } from "lucide-react";
import React, { useState } from "react";
import type { Material } from "../../interfaces/material";

interface MaterialWithdrawModalProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (materialId: string, quantity: number) => void;
}

export const MaterialWithdrawModal: React.FC<MaterialWithdrawModalProps> = ({
  material,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !material) return null;

  const handleConfirm = () => {
    if (quantity <= 0) {
      alert("A quantidade deve ser maior que zero!");
      return;
    }

    if (quantity > material.quantity) {
      alert("Quantidade indisponível em estoque!");
      return;
    }

    onConfirm(material.id, quantity);
    setQuantity(1);
    onClose();
  };

  const handleIncrement = () => {
    if (quantity < material.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const newQuantity = material.quantity - quantity;
  const isLowStock = newQuantity <= (material.minimumStock || 5);
  const isOutOfStock = newQuantity === 0;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-400 to-primary-500 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Minus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Retirar do Estoque</h3>
                <p className="text-white/80 text-sm">
                  {material.reference || "Sem REF"}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Material Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {material.name}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Estoque atual:</div>
                <div className="font-semibold text-gray-900">
                  {material.quantity} un.
                </div>
                <div className="text-gray-600">Localização:</div>
                <div className="font-semibold text-gray-900">
                  {material.shelf || "N/A"}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantidade a retirar
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                  <Minus className="w-5 h-5 text-gray-700" />
                </button>

                <input
                  type="number"
                  min="1"
                  max={material.quantity}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    if (val <= material.quantity) {
                      setQuantity(val);
                    }
                  }}
                  className="flex-1 text-center text-3xl font-bold text-gray-900 border-2 border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />

                <button
                  onClick={handleIncrement}
                  disabled={quantity >= material.quantity}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center"
                >
                  <span className="text-xl font-bold text-gray-700">+</span>
                </button>
              </div>
            </div>

            {/* Result Preview */}
            <div
              className={`p-4 rounded-lg ${
                isOutOfStock
                  ? "bg-red-50 border border-red-200"
                  : isLowStock
                    ? "bg-yellow-50 border border-yellow-200"
                    : "bg-green-50 border border-green-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Estoque após retirada:
                </span>
                <span
                  className={`text-2xl font-bold ${
                    isOutOfStock
                      ? "text-red-600"
                      : isLowStock
                        ? "text-yellow-600"
                        : "text-green-600"
                  }`}
                >
                  {newQuantity} un.
                </span>
              </div>
              {isOutOfStock && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  ⚠️ Estoque ficará zerado!
                </p>
              )}
              {isLowStock && !isOutOfStock && (
                <p className="text-xs text-yellow-600 mt-2 font-medium">
                  ⚠️ Estoque baixo! Abaixo do mínimo.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition shadow-lg"
            >
              Confirmar Retirada
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
