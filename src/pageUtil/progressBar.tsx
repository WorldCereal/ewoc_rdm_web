import { useEffect, useState } from 'react';

export function ProgressBar() {
  const [small, setSmall] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      small <= 100 ? setSmall(small + 1) : setSmall(100);
      if (small >= 100) {
        setSmall(0);
      }
    }, 10);
    return () => {
      clearTimeout(timer);
    };
  }, [small]);
  return (
    <div className="relative">
      <div className="overflow-hidden h-1 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: small + '%' }}
          className="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        bg-blue-500
      "
        />
        <div
          style={{ width: (100-small) + '%' }}
          className="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        bg-blue-300
      "
        />
      </div>
    </div>
  );
}
