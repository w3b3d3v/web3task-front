import { LuLoader2 } from 'react-icons/lu';

function Loader() {
  return (
    <div className="inset-0 w-full h-full flex justify-center items-center fixed">
      <LuLoader2 className="w-16 h-16 animate-spin" />
    </div>
  );
}

export default Loader;
