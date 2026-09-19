'use client';

import React, { useState } from 'react';

interface SizingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizingGuideModal({ isOpen, onClose }: SizingGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'how-to'>('chart');

  if (!isOpen) return null;

  const sizeChart = [
    { size: 'XS', thumb: '14mm (#3)', index: '11mm (#6)', middle: '12mm (#5)', ring: '10mm (#7)', pinky: '8mm (#9)' },
    { size: 'S', thumb: '15mm (#2)', index: '12mm (#5)', middle: '13mm (#4)', ring: '11mm (#6)', pinky: '8mm (#9)' },
    { size: 'M', thumb: '16mm (#1)', index: '12mm (#5)', middle: '13mm (#4)', ring: '11mm (#6)', pinky: '9mm (#8)' },
    { size: 'L', thumb: '18mm (#0)', index: '13mm (#4)', middle: '14mm (#3)', ring: '12mm (#5)', pinky: '10mm (#7)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#3b2b4e]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Retro Window Modal */}
      <div className="relative w-full max-w-xl bg-white border-[2.5px] border-[#8e7ea8] rounded-md shadow-[6px_6px_0px_0px_#a78bfa] z-10 overflow-hidden">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#d8b4fe] via-[#e9d5ff] to-[#fbcfe8] px-4 py-2 border-b-[2px] border-[#8e7ea8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#f472b6]">♡</span>
            <span className="font-mono font-bold text-xs text-[#3b2b4e]">
              nail_sizing_guide.exe
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-5 h-5 bg-white border border-[#8e7ea8] rounded-xs flex items-center justify-center text-xs font-bold text-[#6b5b82] hover:bg-[#f472b6] hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-[#e2d5f1] pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('chart')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-sm border transition-all ${
                activeTab === 'chart'
                  ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[1px_1px_0px_0px_#8e7ea8]'
                  : 'text-[#8e7ea8] border-transparent hover:bg-[#fdf2f8]'
              }`}
            >
              Preset Size Chart ♡
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('how-to')}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-sm border transition-all ${
                activeTab === 'how-to'
                  ? 'bg-[#fbcfe8] border-[#8e7ea8] text-[#3b2b4e] shadow-[1px_1px_0px_0px_#8e7ea8]'
                  : 'text-[#8e7ea8] border-transparent hover:bg-[#fdf2f8]'
              }`}
            >
              How to Measure (Tape Method)
            </button>
          </div>

          {activeTab === 'chart' ? (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-[#6b5b82] font-mono">
                Compare your natural nail bed measurements (widest point in mm):
              </p>

              <div className="overflow-x-auto border-[1.5px] border-[#8e7ea8] rounded-xs">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#f5e8ff] border-b border-[#8e7ea8] text-[#4a3856]">
                    <tr>
                      <th className="p-2">SIZE</th>
                      <th className="p-2">THUMB</th>
                      <th className="p-2">INDEX</th>
                      <th className="p-2">MIDDLE</th>
                      <th className="p-2">RING</th>
                      <th className="p-2">PINKY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0e4fc]">
                    {sizeChart.map((row) => (
                      <tr key={row.size} className="hover:bg-[#fff7fa]">
                        <td className="p-2 font-bold text-[#db2777]">{row.size}</td>
                        <td className="p-2 text-[#4a3856]">{row.thumb}</td>
                        <td className="p-2 text-[#4a3856]">{row.index}</td>
                        <td className="p-2 text-[#4a3856]">{row.middle}</td>
                        <td className="p-2 text-[#4a3856]">{row.ring}</td>
                        <td className="p-2 text-[#4a3856]">{row.pinky}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-[#fdf2f8] border border-[#fbcfe8] rounded-xs text-[11px] font-mono text-[#831843]">
                💡 In between sizes? Always size up! You can gently file down the sides of the press-on for an exact custom contour.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-xs font-mono text-[#57446d]">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#fdf4f7] border border-[#fbcfe8] rounded-xs">
                <span className="font-bold text-[#db2777]">STEP 1:</span>
                <span>Press a piece of clear scotch tape smoothly across the widest part of your natural nail.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#fdf4f7] border border-[#fbcfe8] rounded-xs">
                <span className="font-bold text-[#db2777]">STEP 2:</span>
                <span>Use a pen to mark where the nail bed meets the skin on both left and right sidewalls.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#fdf4f7] border border-[#fbcfe8] rounded-xs">
                <span className="font-bold text-[#db2777]">STEP 3:</span>
                <span>Peel the tape off and place it flat on a ruler to measure the exact millimeters between the two marks.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#fdf4f7] border border-[#fbcfe8] rounded-xs">
                <span className="font-bold text-[#db2777]">CUSTOM SIZE:</span>
                <span>Select &quot;Custom&quot; on the product page and input your 5 finger mm measurements at checkout!</span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-[#e2d5f1] flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-mono font-bold bg-[#fbcfe8] border border-[#8e7ea8] text-[#3b2b4e] rounded-xs shadow-[1.5px_1.5px_0px_0px_#8e7ea8] hover:bg-[#f472b6] hover:text-white transition-colors"
            >
              GOT IT, THANKS ♡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
