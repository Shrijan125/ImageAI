import React from 'react';
import { Button } from './ui/button';
import Loader from './Loader';

interface PackCardProps {
  imgUrl: string;
  name: string;
  description: string;
  id: string;
  handleGenerate: (packid: string) => Promise<void>;
  loading: boolean;
}

const PackCard: React.FC<PackCardProps> = ({
  imgUrl,
  name,
  description,
  id,
  handleGenerate,
  loading,
}) => {
  return (
    <div
      className={`relative border-[1px] rounded-md sm:w-[90%] w-full h-[500px] overflow-hidden border-white/30 hover:backdrop-blur-2xl hover:shadow-2xl hover:shadow-primary/30 group transition-all duration-300`}
    >
      <img
        alt="pack_thumbnail"
        className="object-cover object-top group-hover:scale-[1.02] transition-all duration-300  h-[70%] w-full"
        src={imgUrl}
      ></img>
      <div className="flex flex-col justify-between h-[30%]">
        <div className="flex flex-col gap-1 p-4">
          <div>{name}</div>
          <p className="text-sm text-secondary-text">
            {description.length > 50
              ? description?.substring(0, 40) + '...'
              : description}
          </p>
        </div>
        <Button
          disabled={loading}
          onClick={async () => {
            await handleGenerate(id);
          }}
          className="m-4 hover:cursor-pointer"
        >
          {loading ? <Loader></Loader> : 'Generate Images'}
        </Button>
      </div>
    </div>
  );
};

export default PackCard;
