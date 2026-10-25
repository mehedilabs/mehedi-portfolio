"use client";

import * as React from "react";

export function MacbookKeyboard() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Function Row */}
      <div className="flex gap-1 justify-between w-full">
        <Key text="esc" className="w-[8%] text-[6px] sm:text-[8px]" />
        <Key text="F1" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F2" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F3" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F4" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F5" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F6" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F7" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F8" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F9" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F10" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F11" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <Key text="F12" className="w-[5.8%] text-[6px] sm:text-[7px]" />
        <div className="w-[7%] h-4 sm:h-5 rounded-full bg-[#171822] border border-[#2b2d3d] flex items-center justify-center shadow-inner">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-slate-600/60" />
        </div>
      </div>

      {/* Number Row */}
      <div className="flex gap-1 justify-between w-full">
        <Key text="~" className="w-[6%]" />
        <Key text="1" className="w-[6%]" />
        <Key text="2" className="w-[6%]" />
        <Key text="3" className="w-[6%]" />
        <Key text="4" className="w-[6%]" />
        <Key text="5" className="w-[6%]" />
        <Key text="6" className="w-[6%]" />
        <Key text="7" className="w-[6%]" />
        <Key text="8" className="w-[6%]" />
        <Key text="9" className="w-[6%]" />
        <Key text="0" className="w-[6%]" />
        <Key text="-" className="w-[6%]" />
        <Key text="=" className="w-[6%]" />
        <Key text="delete" className="w-[12%] text-[6px] sm:text-[7px]" />
      </div>

      {/* QWERTY Row */}
      <div className="flex gap-1 justify-between w-full">
        <Key text="tab" className="w-[10%] text-[6px] sm:text-[7px]" />
        <Key text="Q" className="w-[6%]" />
        <Key text="W" className="w-[6%]" />
        <Key text="E" className="w-[6%]" />
        <Key text="R" className="w-[6%]" />
        <Key text="T" className="w-[6%]" />
        <Key text="Y" className="w-[6%]" />
        <Key text="U" className="w-[6%]" />
        <Key text="I" className="w-[6%]" />
        <Key text="O" className="w-[6%]" />
        <Key text="P" className="w-[6%]" />
        <Key text="[" className="w-[6%]" />
        <Key text="]" className="w-[6%]" />
        <Key text="\" className="w-[7%]" />
      </div>

      {/* Home Row */}
      <div className="flex gap-1 justify-between w-full">
        <Key text="caps" className="w-[12%] text-[6px] sm:text-[7px]" />
        <Key text="A" className="w-[6%]" />
        <Key text="S" className="w-[6%]" />
        <Key text="D" className="w-[6%]" />
        <Key text="F" className="w-[6%]" />
        <Key text="G" className="w-[6%]" />
        <Key text="H" className="w-[6%]" />
        <Key text="J" className="w-[6%]" />
        <Key text="K" className="w-[6%]" />
        <Key text="L" className="w-[6%]" />
        <Key text=";" className="w-[6%]" />
        <Key text="'" className="w-[6%]" />
        <Key text="return" className="w-[13%] text-[6px] sm:text-[7px]" />
      </div>

      {/* Shift Row */}
      <div className="flex gap-1 justify-between w-full">
        <Key text="shift" className="w-[15%] text-[6px] sm:text-[7px]" />
        <Key text="Z" className="w-[6%]" />
        <Key text="X" className="w-[6%]" />
        <Key text="C" className="w-[6%]" />
        <Key text="V" className="w-[6%]" />
        <Key text="B" className="w-[6%]" />
        <Key text="N" className="w-[6%]" />
        <Key text="M" className="w-[6%]" />
        <Key text="," className="w-[6%]" />
        <Key text="." className="w-[6%]" />
        <Key text="/" className="w-[6%]" />
        <Key text="shift" className="w-[15%] text-[6px] sm:text-[7px]" />
      </div>

      {/* Bottom Row */}
      <div className="flex gap-1 justify-between w-full">
        <Key text="fn" className="w-[7%] text-[6px] sm:text-[7px]" />
        <Key text="ctrl" className="w-[7%] text-[6px] sm:text-[7px]" />
        <Key text="opt" className="w-[7%] text-[6px] sm:text-[7px]" />
        <Key text="cmd" className="w-[9%] text-[6px] sm:text-[7px]" />
        <div className="flex-1 h-5 sm:h-6 rounded bg-[#13141b] border border-[#232535] shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
        <Key text="cmd" className="w-[9%] text-[6px] sm:text-[7px]" />
        <Key text="opt" className="w-[7%] text-[6px] sm:text-[7px]" />
        <div className="w-[11%] flex gap-0.5">
          <Key text="◀" className="w-1/3 text-[5px]" />
          <div className="w-1/3 flex flex-col gap-0.5 h-5 sm:h-6">
            <Key text="▲" className="h-[48%] text-[4px]" />
            <Key text="▼" className="h-[48%] text-[4px]" />
          </div>
          <Key text="▶" className="w-1/3 text-[5px]" />
        </div>
      </div>
    </div>
  );
}

function Key({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`h-4 sm:h-5 md:h-6 rounded-[3px] sm:rounded bg-[#13141c] border border-[#222433] text-[#8e91a6] font-mono flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none text-[7px] sm:text-[9px] md:text-[10px] ${className}`}
    >
      <span>{text}</span>
    </div>
  );
}

