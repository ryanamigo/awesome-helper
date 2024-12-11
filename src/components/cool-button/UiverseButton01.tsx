import React from 'react';
import { Key } from 'lucide-react';

const UiverseButton01 = () => {
  return (
  <button className="bg-black dark:bg-white text-white dark:text-black text-center w-40 rounded-2xl h-10 relative text-xl font-semibold group" type="button">
    <div className="bg-green-400 rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 group-hover:w-[152px] z-10 duration-500">
      <Key />
    </div>
    <p className="translate-x-2">解密</p>
  </button>
  );
}

export default UiverseButton01;
