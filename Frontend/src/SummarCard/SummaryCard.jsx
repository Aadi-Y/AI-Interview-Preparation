import React from "react";
import { giveInitial } from "../Helper/Initial";
import { LuTrash } from "react-icons/lu";

function SummaryCard({
  role,
  description,
  experience,
  topicToFocus,
  lastUpdate,
  questionLength,
  onDelete,
  onSelect,
}) {
  return (
    <section className="px-4">
      <div
        className="bg-white border border-gray-300 mt-10 p-5 rounded-xl w-full sm:max-w-xl mx-auto 
        grid gap-4 relative group cursor-pointer 
        shadow-sm hover:shadow-md hover:border-sky-400 transition-all duration-300"
        onClick={onSelect}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-sky-100 rounded-lg p-3">
          <div className="p-5 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <h1 className="font-semibold text-gray-700 text-lg">
              {giveInitial(role)}
            </h1>
          </div>

          <div className="flex-grow">
            <h1 className="text-lg font-semibold text-gray-900">{role}</h1>
            <p className="text-xs text-gray-600 font-medium">{topicToFocus}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center text-center">
          <div className="rounded-full border border-gray-400 py-1 px-3 text-[11px] font-medium text-gray-700">
            Experience: {experience} {experience > 1 ? "years" : "year"}
          </div>
          <div className="rounded-full border border-gray-400 py-1 px-3 text-[11px] font-medium text-gray-700">
            {questionLength} Q&A
          </div>
          <div className="rounded-full border border-gray-400 py-1 px-3 text-[11px] font-medium text-gray-700">
            Updated {lastUpdate}
          </div>
        </div>

        {/* Summary */}
        <div>
          <p className="text-[0.95rem] text-gray-700 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Delete Button */}
        <button
          className="absolute top-5 right-5 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer
          p-2 rounded-lg opacity-0 group-hover:opacity-100 
          transition-all duration-300 shadow-sm"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash size={18} />
        </button>
      </div>
    </section>
  );
}

export default SummaryCard;
