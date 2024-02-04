import clsx from "clsx";

import { BaseProps } from "../../global";

interface CriteriaProps extends BaseProps {
  label: string;
  onRemove?: (index) => void;
  index?: number;
}

const Criteria = ({ label, onRemove, index, className, ...restProps }: CriteriaProps) => {

  return (
    <div {...restProps}
      className="mr-2 relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold text-white">
      <span className={onRemove ? 'mr-3' : ''}>{label}</span>
      {
        onRemove && (
          <button
            onClick={() => onRemove(index)}
            className={clsx(['ml-3 !absolute  top-2/4 right-1 mx-px h-5 max-h-[32px] w-5 max-w-[32px] -translate-y-2/4 select-none rounded-md text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none', className || ''])}
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
          </button>
        )
      }
    </div>
  );
}

export default Criteria;
