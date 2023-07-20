import { useEffect, useState } from 'react';

interface CounterProps
{
    value:number
}

export function Counter(props: CounterProps) {
  const [value, setValue] = useState(props.value-100<0?0:props.value-100);

  useEffect(() => {
      const timer = setTimeout(() => {
          if(value<props.value)
          {
              setValue(value+1);
          }
      },15);

      return () => {
          clearTimeout(timer)
      }
  }, [value]);

  return <div>{value}</div>;
}
