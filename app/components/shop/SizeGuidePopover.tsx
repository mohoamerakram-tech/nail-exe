'use client';

import React, { useState } from 'react';

interface SizeGuidePopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuidePopover({ isOpen, onClose }: SizeGuidePopoverProps) {
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  if (!isOpen) return null;

  const measurements = [
    { size: 'S', chestCM: '116', chestIN: '45.6', lengthCM: '68', lengthIN: '26.8', shoulderCM: '52', shoulderIN: '20.5', sleeveCM: '62', sleeveIN: '24.4' },
    { size: 'M', chestCM: '122', chestIN: '48.0', lengthCM: '70', lengthIN: '27.5', shoulderCM: '54', shoulderIN: '21.2', sleeveCM: '63', sleeveIN: '24.8' },
    { size: 'L', chestCM: '128', chestIN: '50.4', lengthCM: '72', lengthIN: '28.3', shoulderCM: '56', shoulderIN: '22.0', sleeveCM: '64', sleeveIN: '25.2' },
    { size: 'XL', chestCM: '134', chestIN: '52.7', lengthCM: '74', lengthIN: '29.1', shoulderCM: '58', shoulderIN: '22.8', sleeveCM: '65', sleeveIN: '25.6' },
    { size: 'XXL', chestCM: '140', chestIN: '55.1', lengthCM: '76', lengthIN: '29.9', shoulderCM: '60', shoulderIN: '23.6', sleeveCM: '66', sleeveIN: '26.0' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#090a0d] border-[3px] border-black p-6 shadow-[8px_8px_0px_0px_#000] z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#ff2d78] text-black">
                SPECIFICATION
              </span>
              <h3 className="text-base font-mono font-black text-white uppercase">
                ARCHIVAL SIZE GUIDE // 寸法規約
              </h3>
            </div>
            <p className="text-xs font-serif text-zinc-400 mt-0.5">
              Standard Japanese drop-shoulder boxy streetwear cut
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-black text-zinc-400 hover:text-white border border-zinc-700 font-mono"
          >
            ✕
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">MEASUREMENT UNIT:</span>
          <div className="flex items-center gap-1 bg-black border border-zinc-700 p-0.5">
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-mono font-bold transition-all ${
                unit === 'cm'
                  ? 'bg-[#ff2d78] text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              CENTIMETERS (CM)
            </button>
            <button
              type="button"
              onClick={() => setUnit('inch')}
              className={`px-3 py-1 text-xs font-mono font-bold transition-all ${
                unit === 'inch'
                  ? 'bg-[#ff2d78] text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              INCHES (IN)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border-2 border-black">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-zinc-950 border-b-2 border-black text-zinc-300">
              <tr>
                <th className="p-2.5">SIZE // 規格</th>
                <th className="p-2.5">CHEST // 胸囲</th>
                <th className="p-2.5">LENGTH // 着丈</th>
                <th className="p-2.5">SHOULDER // 肩幅</th>
                <th className="p-2.5">SLEEVE // 袖丈</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 bg-black/80">
              {measurements.map((m) => (
                <tr key={m.size} className="hover:bg-zinc-900/60">
                  <td className="p-2.5 font-bold text-[#ff2d78]">{m.size}</td>
                  <td className="p-2.5 text-zinc-200">{unit === 'cm' ? `${m.chestCM} cm` : `${m.chestIN}"`}</td>
                  <td className="p-2.5 text-zinc-200">{unit === 'cm' ? `${m.lengthCM} cm` : `${m.lengthIN}"`}</td>
                  <td className="p-2.5 text-zinc-200">{unit === 'cm' ? `${m.shoulderCM} cm` : `${m.shoulderIN}"`}</td>
                  <td className="p-2.5 text-zinc-200">{unit === 'cm' ? `${m.sleeveCM} cm` : `${m.sleeveIN}"`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tailoring Note */}
        <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950 p-2.5 border border-zinc-800">
          ★ Fit Recommendation: Order true to size for a boxy streetwear drape, or size up for an oversized anime protagonist slouch fit.
        </div>
      </div>
    </div>
  );
}
