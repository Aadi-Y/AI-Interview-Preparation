import React from "react";
import { giveInitial } from "../Helper/Initial";
import { LuTrash } from "react-icons/lu"; 

function SummaryCard({role,description,experience,topicToFocus,lastUpdate,questionLength,onDelete,onSelect}) {
  return (
    <>
      <section className="bg-transparent px-4 overflow-hidden shadow-gray-100 hover:shadow-gray-300"
      >
        <section className="bg-white border-none mt-10 p-4 rounded border border-gray-400 w-full sm:max-w-xl mx-auto grid grid-rows-[auto_auto_auto] gap-4 relative group h-50 transition-all duration-200 cursor-pointer"
        onClick={onSelect}
        >
          {/* Header Card */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-3 bg-sky-200/100 rounded p-3">
            <div className="p-5 bg-white rounded flex items-center justify-center">
              <h1 className="font-semibold text-gray-600 text-lg">{giveInitial(role)}</h1>
            </div>

            <div className="flex-grow">
              <h1 className="text-[17px] font-medium">{role}</h1>
              <p className="text-xs text-gray-600 font-medium">
                {topicToFocus}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-3 items-center text-center">
            <div className="rounded-full border-[0.5px] border-gray-900 py-1 px-3 text-[10px] font-medium">
              <p>Experience {experience} {experience > 1 ? "years" : "year"}</p>
            </div>
            <div className="border-[0.5px] border-gray-900 rounded-full py-1 px-3 text-[10px] font-medium">
              <p>{questionLength} Q&A</p>
            </div>
            <div className="border-[0.5px] border-gray-900 rounded-full py-1 px-3 text-[10px] font-medium">
              <p>Last Updated {lastUpdate}</p>
            </div>
          </div>

          {/* Summary */}
          <div>
            <p className="text-[.9rem] text-gray-700 line-clamp-3">
              {description}
            </p>
          </div>

          <div>
            <button className="absolute top-4 text-white transition-all duration-200 right-4 cursor-pointer rounded p-2 hover:bg-sky-500 hidden group-hover:flex bg-sky-400"
            onClick={(event)=>{
              event.stopPropagation();
              onDelete();
            }}
            ><LuTrash/></button>
          </div>
        </section>
      </section>
    </>
  );
}

export default SummaryCard;
